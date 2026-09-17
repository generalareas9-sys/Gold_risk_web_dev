import { describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Express } from 'express'
import jwt from 'jsonwebtoken'
import { createApp, type AppDependencies } from '../app.ts'
import type { UserRecord, UserRepository } from '../db/usersRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import type { GoogleProfile, GoogleProviderService } from '../auth/googleService.ts'
import { createGoogleState } from '../auth/googleService.ts'
import { config } from '../config/env.ts'

const jwtSecret: string = config.jwt.secret ?? 'test-secret'

function redirectedTo(res: request.Response): string {
  if (typeof res.headers.location !== 'string') {
    throw new Error('Expected a Location header, got none.')
  }
  return res.headers.location
}

function tokenFromRedirect(res: request.Response): string {
  const location = redirectedTo(res)
  const parts = location.split('#token=')
  const token = parts[1]
  if (parts.length !== 2 || token === undefined) {
    throw new Error(`No token found in redirect: ${location}`)
  }
  return decodeURIComponent(token)
}

class MemoryUserRepository implements UserRepository {
  private readonly usersById = new Map<string, UserRecord>()
  private nextId = 1

  async findByEmail(email: string): Promise<UserRecord | null> {
    const normalized = email.trim().toLowerCase()
    for (const user of this.usersById.values()) {
      if (user.email === normalized) return user
    }
    return null
  }

  async findById(id: string): Promise<UserRecord | null> {
    return this.usersById.get(id) ?? null
  }

  async findByGoogleId(googleId: string): Promise<UserRecord | null> {
    for (const user of this.usersById.values()) {
      if (user.googleId === googleId) return user
    }
    return null
  }

  async create(email: string, passwordHash: string, name: string | null): Promise<UserRecord> {
    const now = new Date()
    const id = String(this.nextId++)
    const user: UserRecord = {
      id,
      email: email.trim().toLowerCase(),
      passwordHash,
      name,
      googleId: null,
      createdAt: now,
      updatedAt: now,
    }
    this.usersById.set(id, user)
    return user
  }

  async createGoogleUser(
    email: string,
    name: string | null,
    googleId: string,
  ): Promise<UserRecord> {
    const now = new Date()
    const id = String(this.nextId++)
    const user: UserRecord = {
      id,
      email: email.trim().toLowerCase(),
      passwordHash: null,
      name,
      googleId,
      createdAt: now,
      updatedAt: now,
    }
    this.usersById.set(id, user)
    return user
  }

  async setGoogleId(id: string, googleId: string): Promise<UserRecord> {
    const user = this.usersById.get(id)
    if (user === undefined) throw new Error('No such user')
    const updated: UserRecord = { ...user, googleId, updatedAt: new Date() }
    this.usersById.set(id, updated)
    return updated
  }

  removeById(id: string): void {
    this.usersById.delete(id)
  }
}

class MemoryTokenStore implements TokenStore {
  private readonly revoked = new Set<string>()

  async revoke(jti: string): Promise<void> {
    this.revoked.add(jti)
  }

  async isRevoked(jti: string): Promise<boolean> {
    return this.revoked.has(jti)
  }
}

class FakeGoogleProvider implements GoogleProviderService {
  profiles: GoogleProfile[] = []
  verifyThrows = false

  buildAuthUrl(state: string): string {
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    url.searchParams.set('state', state)
    url.searchParams.set('redirect_uri', 'http://localhost:3000/api/auth/google/callback')
    return url.toString()
  }

  async verifyAndGetProfile(code: string): Promise<GoogleProfile> {
    if (this.verifyThrows) {
      throw new Error('Simulated Google token verification failure')
    }
    const idx = parseInt(code.replace('google-code-', ''), 10)
    const profile = this.profiles[idx]
    if (profile === undefined) {
      throw new Error('Simulated invalid Google authorization code')
    }
    return profile
  }
}

interface TestContext {
  app: Express
  userRepository: MemoryUserRepository
  tokenStore: MemoryTokenStore
  googleProvider: FakeGoogleProvider
}

function createTestApp(): TestContext {
  const userRepository = new MemoryUserRepository()
  const tokenStore = new MemoryTokenStore()
  const googleProvider = new FakeGoogleProvider()
  const dependencies: AppDependencies = { userRepository, tokenStore, googleProvider }
  return { app: createApp(dependencies), userRepository, tokenStore, googleProvider }
}

describe('GET /api/auth/google', () => {
  it('redirects to Google consent screen with a signed state', async () => {
    const { app } = createTestApp()
    const res = await request(app).get('/api/auth/google')
    expect(res.status).toBe(302)
    const location = redirectedTo(res)
    expect(location).toContain('accounts.google.com')
    expect(location).toContain('state=')
    expect(location).toContain('redirect_uri=')
  })

  it('returns 503 when Google is not configured', async () => {
    const app = createApp({ googleProvider: null })
    const res = await request(app).get('/api/auth/google')
    expect(res.status).toBe(503)
    expect(res.body.error.message).toContain('not configured')
  })
})

describe('GET /api/auth/google/callback', () => {
  it('creates a new user from a verified Google profile and redirects with a token', async () => {
    const { app, googleProvider, userRepository } = createTestApp()
    googleProvider.profiles.push({
      googleId: 'google-123',
      email: 'alice@example.com',
      emailVerified: true,
      name: 'Alice',
    })

    const state = createGoogleState(jwtSecret)
    const res = await request(app)
      .get('/api/auth/google/callback')
      .query({ code: 'google-code-0', state })

    expect(res.status).toBe(302)
    const location = redirectedTo(res)
    expect(location).toContain('http://localhost:5173/auth/google/callback#token=')

    // The token should be valid and the user should exist.
    const payload = jwt.verify(tokenFromRedirect(res), jwtSecret) as jwt.JwtPayload
    const user = await userRepository.findById(payload.sub as string)
    expect(user).not.toBeNull()
    expect(user?.email).toBe('alice@example.com')
    expect(user?.name).toBe('Alice')
    expect(user?.googleId).toBe('google-123')
    expect(user?.passwordHash).toBeNull()
  })

  it('links Google to an existing email/password account instead of duplicating', async () => {
    const { app, googleProvider, userRepository } = createTestApp()

    const existing = await userRepository.create(
      'alice@example.com',
      'bcrypt-hash-placeholder',
      'Alice',
    )

    googleProvider.profiles.push({
      googleId: 'google-456',
      email: 'alice@example.com',
      emailVerified: true,
      name: 'Alice Updated',
    })

    const state = createGoogleState(jwtSecret)
    await request(app)
      .get('/api/auth/google/callback')
      .query({ code: 'google-code-0', state })

    // The google_id should be set on the existing user — no new user created.
    const user = await userRepository.findById(existing.id)
    expect(user?.googleId).toBe('google-456')
    expect(user?.passwordHash).toBe('bcrypt-hash-placeholder')
  })

  it('rejects a state parameter that was not signed by this backend', async () => {
    const { app, googleProvider } = createTestApp()
    googleProvider.profiles.push({
      googleId: 'google-789',
      email: 'attacker@test.com',
      emailVerified: true,
      name: 'Attacker',
    })

    const foreignState = jwt.sign(
      { purpose: 'goldrisk-google-oauth-state', nonce: 'forged' },
      'wrong-secret-key',
      { expiresIn: '5m' },
    )

    const res = await request(app)
      .get('/api/auth/google/callback')
      .query({ code: 'google-code-0', state: foreignState })

    expect(res.status).toBe(403)
    expect(res.body.error.message).toContain('Invalid or expired')
  })

  it('rejects a missing or invalid authorization code', async () => {
    const { app } = createTestApp()
    const state = createGoogleState(jwtSecret)

    const res = await request(app).get('/api/auth/google/callback').query({ state })

    expect(res.status).toBe(400)
    expect(res.body.error.message).toContain('missing the authorization code')
  })

  it('rejects when the Google profile email is not verified', async () => {
    const { app, googleProvider } = createTestApp()
    googleProvider.profiles.push({
      googleId: 'google-unverified',
      email: 'unverified@test.com',
      emailVerified: false,
      name: 'Unverified',
    })

    const state = createGoogleState(jwtSecret)
    const res = await request(app)
      .get('/api/auth/google/callback')
      .query({ code: 'google-code-0', state })

    expect(res.status).toBe(403)
    expect(res.body.error.message).toContain('not verified')
  })

  it('allows subsequent logins via Google to return the same user', async () => {
    const { app, googleProvider } = createTestApp()
    googleProvider.profiles.push({
      googleId: 'google-repeat',
      email: 'repeat@example.com',
      emailVerified: true,
      name: 'Repeat',
    })

    const state = createGoogleState(jwtSecret)
    const res1 = await request(app)
      .get('/api/auth/google/callback')
      .query({ code: 'google-code-0', state })
    const res2 = await request(app)
      .get('/api/auth/google/callback')
      .query({ code: 'google-code-0', state })

    const t1 = jwt.verify(tokenFromRedirect(res1), jwtSecret) as jwt.JwtPayload
    const t2 = jwt.verify(tokenFromRedirect(res2), jwtSecret) as jwt.JwtPayload

    expect(t1.sub).toBe(t2.sub)
  })
})

describe('Google OAuth post-login /me', () => {
  it('the token from Google login works on /me', async () => {
    const { app, googleProvider } = createTestApp()
    googleProvider.profiles.push({
      googleId: 'google-me-test',
      email: 'me@example.com',
      emailVerified: true,
      name: 'Me',
    })

    const state = createGoogleState(jwtSecret)
    const redirectRes = await request(app)
      .get('/api/auth/google/callback')
      .query({ code: 'google-code-0', state })

    const token = tokenFromRedirect(redirectRes)
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)

    expect(meRes.status).toBe(200)
    expect(meRes.body.data.user.email).toBe('me@example.com')
    expect(meRes.body.data.user.name).toBe('Me')
  })
})

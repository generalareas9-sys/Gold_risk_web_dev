import { describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Express } from 'express'
import jwt from 'jsonwebtoken'
import { createApp, type AppDependencies } from '../app.ts'
import type { UserRecord, UserRepository } from '../db/usersRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import { signTestToken } from './jwt.ts'
import { registerUser as registerUserService } from './authService.ts'

const PASSWORD = 'Sup3rSecret!'

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

  async findByGoogleId(googleId: string): Promise<UserRecord | null> {
    for (const user of this.usersById.values()) {
      if (user.googleId === googleId) return user
    }
    return null
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

interface TestContext {
  app: Express
  userRepository: MemoryUserRepository
  tokenStore: MemoryTokenStore
}

function createTestApp(): TestContext {
  const userRepository = new MemoryUserRepository()
  const tokenStore = new MemoryTokenStore()
  const dependencies: AppDependencies = { userRepository, tokenStore }
  return { app: createApp(dependencies), userRepository, tokenStore }
}

async function registerUser(app: Express, email = 'Trader@Example.com', name = 'Trader') {
  return request(app).post('/api/auth/register').send({ email, password: PASSWORD, name })
}

async function login(app: Express, email = 'trader@example.com') {
  return request(app).post('/api/auth/login').send({ email, password: PASSWORD })
}

describe('POST /api/auth/register', () => {
  it('rejects an empty request with field errors', async () => {
    const { app } = createTestApp()
    const res = await request(app).post('/api/auth/register').send({})

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error.status).toBe(400)
    expect(res.body.error.errors.email).toContain('Email is required.')
    expect(res.body.error.errors.password).toContain('Password is required.')
  })

  it('rejects an invalid email', async () => {
    const { app } = createTestApp()
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'not-an-email', password: PASSWORD })

    expect(res.status).toBe(400)
    expect(res.body.error.errors.email).toContain('Email is not valid.')
  })

  it('rejects a password shorter than 8 characters', async () => {
    const { app } = createTestApp()
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'a@b.co', password: 'short' })

    expect(res.status).toBe(400)
    expect(res.body.error.errors.password).toContain('at least 8 characters')
  })

  it('rejects a password longer than 72 characters', async () => {
    const { app } = createTestApp()
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'a@b.co', password: 'x'.repeat(73) })

    expect(res.status).toBe(400)
    expect(res.body.error.errors.password).toContain('at most 72 characters')
  })

  it('rejects an overlong name', async () => {
    const { app } = createTestApp()
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'a@b.co', password: PASSWORD, name: 'n'.repeat(101) })

    expect(res.status).toBe(400)
    expect(res.body.error.errors.name).toContain('at most 100 characters')
  })

  it('registers a user, returns a public shape, and stores a bcrypt hash', async () => {
    const { app, userRepository } = createTestApp()
    const res = await registerUser(app)

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.user.email).toBe('trader@example.com')
    expect(res.body.data.user.name).toBe('Trader')
    expect(typeof res.body.data.user.id).toBe('string')
    expect(res.body.data.user).not.toHaveProperty('passwordHash')

    const stored = await userRepository.findByEmail('trader@example.com')
    expect(stored).not.toBeNull()
    expect(stored?.passwordHash).not.toBe(PASSWORD)
    expect(stored?.passwordHash).toMatch(/^\$2/)
  })

  it('rejects a duplicate email with 409', async () => {
    const { app } = createTestApp()
    await registerUser(app)
    const res = await registerUser(app)

    expect(res.status).toBe(409)
    expect(res.body.error.message).toContain('already exists')
  })

  it('maps a DB unique-violation on INSERT to 409 (race path)', async () => {
    // MemoryUserRepository never raises 23505, so simulate the concurrent
    // insert directly against registerUser: the findByEmail pre-check passes
    // (user not visible yet) and the database rejects the INSERT with the
    // Postgres unique_violation error code.
    class RacingUserRepository extends MemoryUserRepository {
      override async create(): Promise<UserRecord> {
        const error = new Error('duplicate key value violates unique constraint')
        ;(error as { code?: string }).code = '23505'
        throw error
      }
    }

    await expect(
      registerUserService(new RacingUserRepository(), {
        email: 'race@example.com',
        password: PASSWORD,
      }),
    ).rejects.toMatchObject({
      status: 409,
      message: 'An account with this email already exists.',
    })
  })
})

describe('POST /api/auth/login', () => {
  it('rejects missing credentials', async () => {
    const { app } = createTestApp()
    const res = await request(app).post('/api/auth/login').send({})

    expect(res.status).toBe(400)
    expect(res.body.error.errors.email).toBeDefined()
    expect(res.body.error.errors.password).toBeDefined()
  })

  it('rejects an unknown email with 401', async () => {
    const { app } = createTestApp()
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: PASSWORD })

    expect(res.status).toBe(401)
    expect(res.body.error.message).toContain('Invalid email or password.')
  })

  it('rejects a wrong password with 401', async () => {
    const { app } = createTestApp()
    await registerUser(app)
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'trader@example.com', password: 'WrongPassword!' })

    expect(res.status).toBe(401)
    expect(res.body.error.message).toContain('Invalid email or password.')
  })

  it('returns a token and the public user on success', async () => {
    const { app } = createTestApp()
    await registerUser(app)
    const res = await login(app, 'TRADER@example.com')

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(typeof res.body.data.token).toBe('string')
    expect(res.body.data.user.email).toBe('trader@example.com')
    expect(res.body.data.user).not.toHaveProperty('passwordHash')
  })
})

describe('GET /api/auth/me', () => {
  it('returns 401 without an Authorization header', async () => {
    const { app } = createTestApp()
    const res = await request(app).get('/api/auth/me')

    expect(res.status).toBe(401)
    expect(res.body.error.message).toContain('Authentication required.')
  })

  it('returns 401 for a malformed token', async () => {
    const { app } = createTestApp()
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer not-a-jwt')

    expect(res.status).toBe(401)
  })

  it('returns 401 for a token signed with a different secret', async () => {
    const { app } = createTestApp()
    const foreign = jwt.sign({ email: 'x@y.z' }, 'some-other-secret', {
      subject: '1',
      expiresIn: '15m',
    })
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${foreign}`)

    expect(res.status).toBe(401)
  })

  it('returns 401 for an expired token', async () => {
    const { app } = createTestApp()
    const now = Math.floor(Date.now() / 1000)
    const expired = signTestToken({
      id: '1',
      email: 'trader@example.com',
      jti: 'test-jti',
      iat: now - 7_200,
      exp: now - 3_600,
    })
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${expired}`)

    expect(res.status).toBe(401)
  })

  it('returns the current user for a valid token', async () => {
    const { app } = createTestApp()
    await registerUser(app)
    const loginRes = await login(app)
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${loginRes.body.data.token}`)

    expect(res.status).toBe(200)
    expect(res.body.data.user.email).toBe('trader@example.com')
    expect(res.body.data.user.name).toBe('Trader')
  })

  it("returns 401 when the token's user no longer exists", async () => {
    const { app, userRepository } = createTestApp()
    await registerUser(app)
    const loginRes = await login(app)
    userRepository.removeById(loginRes.body.data.user.id)

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${loginRes.body.data.token}`)

    expect(res.status).toBe(401)
    expect(res.body.error.message).toContain('User no longer exists.')
  })

  it('returns 401 for a revoked token', async () => {
    const { app, tokenStore } = createTestApp()
    await registerUser(app)
    const loginRes = await login(app)
    // Manually revoke the jti by extracting it from the signed token.
    const decoded = jwt.decode(loginRes.body.data.token) as { jti?: string }
    if (decoded.jti !== undefined) {
      await tokenStore.revoke(decoded.jti)
    }

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${loginRes.body.data.token}`)

    expect(res.status).toBe(401)
    expect(res.body.error.message).toContain('revoked')
  })
})

describe('POST /api/auth/logout', () => {
  it('returns 401 without a token', async () => {
    const { app } = createTestApp()
    const res = await request(app).post('/api/auth/logout')

    expect(res.status).toBe(401)
  })

  it('revokes the token so subsequent requests are rejected', async () => {
    const { app } = createTestApp()
    await registerUser(app)
    const loginRes = await login(app)
    const token = loginRes.body.data.token as string

    const logoutRes = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`)

    expect(logoutRes.status).toBe(200)
    expect(logoutRes.body.success).toBe(true)
    expect(logoutRes.body.message).toContain('Logged out')

    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)

    expect(meRes.status).toBe(401)
    expect(meRes.body.error.message).toContain('revoked')
  })
})
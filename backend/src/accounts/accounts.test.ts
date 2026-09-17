import { describe, expect, it } from 'vitest'
import request from 'supertest'
import type { Express } from 'express'
import { createApp, type AppDependencies } from '../app.ts'
import type { UserRecord, UserRepository } from '../db/usersRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import type {
  AccountRecord,
  AccountRepository,
  AccountCreateInput,
  AccountUpdateChanges,
} from '../db/accountsRepository.ts'
import type {
  SpecificationRecord,
  SpecificationRepository,
  SpecificationInput,
  SpecificationUpdateChanges,
} from '../db/specificationsRepository.ts'

const PASSWORD = 'Sup3rSecret!'

// ---------------------------------------------------------------------------
// In-memory repositories (tests-only)
// ---------------------------------------------------------------------------

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

  async create(
    email: string,
    passwordHash: string,
    name: string | null,
  ): Promise<UserRecord> {
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

class MemoryAccountsRepository implements AccountRepository {
  private readonly records = new Map<string, AccountRecord>()
  private nextId = 1

  async list(userId: string): Promise<AccountRecord[]> {
    return [...this.records.values()]
      .filter((r) => r.userId === userId)
      .sort((a, b) => {
        if (a.isDefault !== b.isDefault) return a.isDefault ? -1 : 1
        if (a.createdAt.getTime() !== b.createdAt.getTime())
          return a.createdAt.getTime() - b.createdAt.getTime()
        return a.id.localeCompare(b.id)
      })
  }

  async findById(userId: string, accountId: string): Promise<AccountRecord | null> {
    const record = this.records.get(accountId)
    return record !== undefined && record.userId === userId ? record : null
  }

  async count(userId: string): Promise<number> {
    let n = 0
    for (const r of this.records.values()) {
      if (r.userId === userId) n++
    }
    return n
  }

  async create(input: AccountCreateInput): Promise<AccountRecord> {
    const existingCount = await this.count(input.userId)
    const isDefault = existingCount === 0 ? true : input.isDefault
    if (isDefault) {
      for (const r of this.records.values()) {
        if (r.userId === input.userId && r.isDefault) r.isDefault = false
      }
    }
    const now = new Date()
    const id = String(this.nextId++)
    const record: AccountRecord = {
      id,
      userId: input.userId,
      accountName: input.accountName,
      broker: input.broker,
      accountType: input.accountType,
      currency: input.currency,
      usdConversion: input.usdConversion,
      balance: input.balance,
      isActive: input.isActive,
      isDefault,
      createdAt: now,
      updatedAt: now,
    }
    this.records.set(id, record)
    return record
  }

  async update(
    userId: string,
    accountId: string,
    changes: AccountUpdateChanges,
  ): Promise<AccountRecord | null> {
    const record = this.records.get(accountId)
    if (record === undefined || record.userId !== userId) return null
    if (changes.isDefault === true) {
      for (const r of this.records.values()) {
        if (r.userId === userId && r.isDefault && r.id !== accountId) r.isDefault = false
      }
    }
    Object.assign(record, changes)
    record.updatedAt = new Date()
    return record
  }

  async remove(userId: string, accountId: string): Promise<boolean> {
    const record = this.records.get(accountId)
    if (record === undefined || record.userId !== userId) return false
    return this.records.delete(accountId)
  }
}

class MemorySpecificationsRepository implements SpecificationRepository {
  private readonly records = new Map<string, SpecificationRecord>()
  private nextId = 1

  async list(_userId: string, accountId: string): Promise<SpecificationRecord[]> {
    return [...this.records.values()]
      .filter((r) => r.tradingAccountId === accountId)
      .sort((a, b) => a.symbol.localeCompare(b.symbol))
  }

  async findById(
    _userId: string,
    accountId: string,
    specId: string,
  ): Promise<SpecificationRecord | null> {
    const record = this.records.get(specId)
    return record !== undefined && record.tradingAccountId === accountId ? record : null
  }

  async create(
    _userId: string,
    accountId: string,
    input: SpecificationInput,
  ): Promise<SpecificationRecord | null> {
    const now = new Date()
    const id = String(this.nextId++)
    const record: SpecificationRecord = {
      id,
      tradingAccountId: accountId,
      symbol: input.symbol,
      contractSize: input.contractSize,
      minimumLot: input.minimumLot,
      maximumLot: input.maximumLot,
      lotStep: input.lotStep,
      createdAt: now,
      updatedAt: now,
    }
    this.records.set(id, record)
    return record
  }

  async update(
    _userId: string,
    accountId: string,
    specId: string,
    changes: SpecificationUpdateChanges,
  ): Promise<SpecificationRecord | null> {
    const record = this.records.get(specId)
    if (record === undefined || record.tradingAccountId !== accountId) return null
    Object.assign(record, changes)
    record.updatedAt = new Date()
    return record
  }

  async remove(_userId: string, accountId: string, specId: string): Promise<boolean> {
    const record = this.records.get(specId)
    if (record === undefined || record.tradingAccountId !== accountId) return false
    return this.records.delete(specId)
  }
}

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

interface TestContext {
  app: Express
  userRepository: MemoryUserRepository
  tokenStore: MemoryTokenStore
  accountsRepository: MemoryAccountsRepository
  specificationsRepository: MemorySpecificationsRepository
}

function createTestApp(): TestContext {
  const userRepository = new MemoryUserRepository()
  const tokenStore = new MemoryTokenStore()
  const accountsRepository = new MemoryAccountsRepository()
  const specificationsRepository = new MemorySpecificationsRepository()
  const dependencies: AppDependencies = {
    userRepository,
    tokenStore,
    accountsRepository,
    specificationsRepository,
  }
  return {
    app: createApp(dependencies),
    userRepository,
    tokenStore,
    accountsRepository,
    specificationsRepository,
  }
}

async function registerUser(
  app: Express,
  email = 'Trader@Example.com',
  name = 'Trader',
): Promise<{ id: string }> {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ email, password: PASSWORD, name })
  return { id: res.body.data.user.id as string }
}

async function login(
  app: Express,
  email = 'trader@example.com',
): Promise<{ token: string; userId: string }> {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email, password: PASSWORD })
  return {
    token: res.body.data.token as string,
    userId: res.body.data.user.id as string,
  }
}

async function registerAndLogin(
  app: Express,
  email = 'Trader@Example.com',
  name = 'Trader',
): Promise<{ token: string; userId: string }> {
  await registerUser(app, email, name)
  return login(app, email.toLowerCase())
}

function authHeader(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` }
}

const ACCOUNT_PAYLOAD = {
  accountName: 'Exness Standard Cent',
  broker: 'Exness',
  accountType: 'Standard Cent',
  currency: 'USC',
  usdConversion: 100,
  balance: 1220.3,
}

const SPEC_PAYLOAD = {
  symbol: 'XAUUSDc',
  contractSize: 1,
  minimumLot: 0.01,
  maximumLot: 200,
  lotStep: 0.01,
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Trading account management', () => {
  // ------------------------------------------------------------------
  // Authentication
  // ------------------------------------------------------------------
  describe('authentication', () => {
    it('rejects unauthenticated GET /api/accounts with 401', async () => {
      const { app } = createTestApp()
      const res = await request(app).get('/api/accounts')
      expect(res.status).toBe(401)
    })

    it('rejects unauthenticated POST /api/accounts with 401', async () => {
      const { app } = createTestApp()
      const res = await request(app).post('/api/accounts').send(ACCOUNT_PAYLOAD)
      expect(res.status).toBe(401)
    })

    it('rejects unauthenticated GET /api/accounts/:id/specifications with 401', async () => {
      const { app } = createTestApp()
      const res = await request(app).get('/api/accounts/1/specifications')
      expect(res.status).toBe(401)
    })
  })

  // ------------------------------------------------------------------
  // Create
  // ------------------------------------------------------------------
  describe('POST /api/accounts', () => {
    it('creates an account and returns 201 with correct fields', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)

      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.account.accountName).toBe('Exness Standard Cent')
      expect(res.body.data.account.broker).toBe('Exness')
      expect(res.body.data.account.accountType).toBe('Standard Cent')
      expect(res.body.data.account.currency).toBe('USC')
      expect(res.body.data.account.usdConversion).toBe(100)
      expect(res.body.data.account.balance).toBe(1220.3)
      expect(res.body.data.account.isActive).toBe(true)
      expect(res.body.data.account.isDefault).toBe(true)
    })

    it('first account becomes default automatically', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      await request(app).post('/api/accounts').set(authHeader(token)).send(ACCOUNT_PAYLOAD)
      const res = await request(app).get('/api/accounts').set(authHeader(token))
      expect(res.body.data.accounts).toHaveLength(1)
      expect(res.body.data.accounts[0].isDefault).toBe(true)
    })

    it('second account is not default unless requested', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      await request(app).post('/api/accounts').set(authHeader(token)).send(ACCOUNT_PAYLOAD)
      const res = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, accountName: 'IC Markets Standard' })
      expect(res.status).toBe(201)
      expect(res.body.data.account.isDefault).toBe(false)
    })

    it('requesting isDefault:true moves the default to the new account', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      await request(app).post('/api/accounts').set(authHeader(token)).send(ACCOUNT_PAYLOAD)
      const res = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, accountName: 'IC Markets', isDefault: true })
      expect(res.status).toBe(201)
      expect(res.body.data.account.isDefault).toBe(true)
      const list = await request(app).get('/api/accounts').set(authHeader(token))
      const defaults = list.body.data.accounts.filter((a: { isDefault: boolean }) => a.isDefault)
      expect(defaults).toHaveLength(1)
      expect(defaults[0].accountName).toBe('IC Markets')
    })

    it('rejects a request missing all required fields', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({})
      expect(res.status).toBe(400)
      expect(res.body.error.errors.accountName).toContain('required')
      expect(res.body.error.errors.broker).toContain('required')
      expect(res.body.error.errors.accountType).toContain('required')
      expect(res.body.error.errors.currency).toContain('required')
      expect(res.body.error.errors.usdConversion).toBeDefined()
    })

    it('rejects a negative balance', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, balance: -100 })
      expect(res.status).toBe(400)
      expect(res.body.error.errors.balance).toContain('non-negative')
    })

    it('rejects zero USD conversion', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, usdConversion: 0 })
      expect(res.status).toBe(400)
      expect(res.body.error.errors.usdConversion).toContain('greater than zero')
    })

    it('rejects a negative USD conversion', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, usdConversion: -1 })
      expect(res.status).toBe(400)
    })

    it('rejects a duplicate account name (case-insensitive)', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      await request(app).post('/api/accounts').set(authHeader(token)).send(ACCOUNT_PAYLOAD)
      const res = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, accountName: 'exness standard cent' })
      expect(res.status).toBe(409)
    })
  })

  // ------------------------------------------------------------------
  // Read
  // ------------------------------------------------------------------
  describe('GET /api/accounts', () => {
    it('lists only the caller\'s accounts', async () => {
      const { app } = createTestApp()
      const userA = await registerAndLogin(app, 'a@test.com', 'User A')
      const userB = await registerAndLogin(app, 'b@test.com', 'User B')
      await request(app)
        .post('/api/accounts')
        .set(authHeader(userA.token))
        .send(ACCOUNT_PAYLOAD)
      await request(app)
        .post('/api/accounts')
        .set(authHeader(userA.token))
        .send({ ...ACCOUNT_PAYLOAD, accountName: 'Second Account A' })
      await request(app)
        .post('/api/accounts')
        .set(authHeader(userB.token))
        .send(ACCOUNT_PAYLOAD)

      const resA = await request(app).get('/api/accounts').set(authHeader(userA.token))
      expect(resA.body.data.accounts).toHaveLength(2)
      const resB = await request(app).get('/api/accounts').set(authHeader(userB.token))
      expect(resB.body.data.accounts).toHaveLength(1)
    })
  })

  describe('GET /api/accounts/:id', () => {
    it('retrieves an owned account with its specifications', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string

      await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send(SPEC_PAYLOAD)

      const res = await request(app)
        .get(`/api/accounts/${accountId}`)
        .set(authHeader(token))
      expect(res.status).toBe(200)
      expect(res.body.data.account.accountName).toBe('Exness Standard Cent')
      expect(res.body.data.specifications).toHaveLength(1)
      expect(res.body.data.specifications[0].symbol).toBe('XAUUSDc')
    })

    it('returns 404 for a nonexistent account', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app).get('/api/accounts/999').set(authHeader(token))
      expect(res.status).toBe(404)
    })
  })

  // ------------------------------------------------------------------
  // Update
  // ------------------------------------------------------------------
  describe('PATCH /api/accounts/:id', () => {
    it('updates the account name', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string

      const res = await request(app)
        .patch(`/api/accounts/${accountId}`)
        .set(authHeader(token))
        .send({ accountName: 'Exness Cent Renamed' })
      expect(res.status).toBe(200)
      expect(res.body.data.account.accountName).toBe('Exness Cent Renamed')
    })

    it('updates isActive', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string

      const res = await request(app)
        .patch(`/api/accounts/${accountId}`)
        .set(authHeader(token))
        .send({ isActive: false })
      expect(res.status).toBe(200)
      expect(res.body.data.account.isActive).toBe(false)
    })

    it('allows setting isDefault:true via PATCH', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const first = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const firstId = first.body.data.account.id as string
      const second = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, accountName: 'IC Markets' })
      const secondId = second.body.data.account.id as string

      const res = await request(app)
        .patch(`/api/accounts/${secondId}`)
        .set(authHeader(token))
        .send({ isDefault: true })
      expect(res.status).toBe(200)
      expect(res.body.data.account.isDefault).toBe(true)

      const updatedFirst = await request(app)
        .get(`/api/accounts/${firstId}`)
        .set(authHeader(token))
      expect(updatedFirst.body.data.account.isDefault).toBe(false)
    })

    it('returns the current account when no changes are sent', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const res = await request(app)
        .patch(`/api/accounts/${accountId}`)
        .set(authHeader(token))
        .send({})
      expect(res.status).toBe(200)
      expect(res.body.data.account.accountName).toBe('Exness Standard Cent')
    })

    it('rejects an invalid balance in update', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const res = await request(app)
        .patch(`/api/accounts/${accountId}`)
        .set(authHeader(token))
        .send({ balance: -50 })
      expect(res.status).toBe(400)
    })

    it('rejects a duplicate name on update', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      await request(app).post('/api/accounts').set(authHeader(token)).send(ACCOUNT_PAYLOAD)
      const second = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, accountName: 'IC Markets' })
      const secondId = second.body.data.account.id as string
      const res = await request(app)
        .patch(`/api/accounts/${secondId}`)
        .set(authHeader(token))
        .send({ accountName: 'Exness Standard Cent' })
      expect(res.status).toBe(409)
    })

    it('returns 404 for a nonexistent account', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .patch('/api/accounts/999')
        .set(authHeader(token))
        .send({ accountName: 'X' })
      expect(res.status).toBe(404)
    })
  })

  // ------------------------------------------------------------------
  // Delete
  // ------------------------------------------------------------------
  describe('DELETE /api/accounts/:id', () => {
    it('deletes the account and its specifications', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send(SPEC_PAYLOAD)

      const del = await request(app)
        .delete(`/api/accounts/${accountId}`)
        .set(authHeader(token))
      expect(del.status).toBe(200)
      expect(del.body.success).toBe(true)

      const get = await request(app)
        .get(`/api/accounts/${accountId}`)
        .set(authHeader(token))
      expect(get.status).toBe(404)
    })

    it('returns 404 for a nonexistent account', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app).delete('/api/accounts/999').set(authHeader(token))
      expect(res.status).toBe(404)
    })
  })

  // ------------------------------------------------------------------
  // Ownership / cross-user security
  // ------------------------------------------------------------------
  describe('ownership', () => {
    let ctx: TestContext
    let userA: { token: string; userId: string }
    let userB: { token: string; userId: string }
    let accountAId: string
    let specAId: string

    it('sets up two users each with an account and a specification', async () => {
      ctx = createTestApp()
      userA = await registerAndLogin(ctx.app, 'a@test.com', 'User A')
      userB = await registerAndLogin(ctx.app, 'b@test.com', 'User B')

      const resA = await request(ctx.app)
        .post('/api/accounts')
        .set(authHeader(userA.token))
        .send(ACCOUNT_PAYLOAD)
      accountAId = resA.body.data.account.id as string

      const specRes = await request(ctx.app)
        .post(`/api/accounts/${accountAId}/specifications`)
        .set(authHeader(userA.token))
        .send(SPEC_PAYLOAD)
      specAId = specRes.body.data.specification.id as string
    })

    it('User A cannot GET User B\'s account (404)', async () => {
      const res = await request(ctx.app)
        .get(`/api/accounts/${accountAId}`)
        .set(authHeader(userB.token))
      expect(res.status).toBe(404)
    })

    it('User A cannot PATCH User B\'s account (404)', async () => {
      const res = await request(ctx.app)
        .patch(`/api/accounts/${accountAId}`)
        .set(authHeader(userB.token))
        .send({ accountName: 'Hacked' })
      expect(res.status).toBe(404)
    })

    it('User A cannot DELETE User B\'s account (404)', async () => {
      const res = await request(ctx.app)
        .delete(`/api/accounts/${accountAId}`)
        .set(authHeader(userB.token))
      expect(res.status).toBe(404)
    })

    it('User A cannot GET User B\'s specifications (404)', async () => {
      const res = await request(ctx.app)
        .get(`/api/accounts/${accountAId}/specifications`)
        .set(authHeader(userB.token))
      expect(res.status).toBe(404)
    })

    it('User A cannot POST a specification to User B\'s account (404)', async () => {
      const res = await request(ctx.app)
        .post(`/api/accounts/${accountAId}/specifications`)
        .set(authHeader(userB.token))
        .send(SPEC_PAYLOAD)
      expect(res.status).toBe(404)
    })

    it('User A cannot PATCH User B\'s specification (404)', async () => {
      const res = await request(ctx.app)
        .patch(`/api/accounts/${accountAId}/specifications/${specAId}`)
        .set(authHeader(userB.token))
        .send({ lotStep: 0.05 })
      expect(res.status).toBe(404)
    })

    it('User A cannot DELETE User B\'s specification (404)', async () => {
      const res = await request(ctx.app)
        .delete(`/api/accounts/${accountAId}/specifications/${specAId}`)
        .set(authHeader(userB.token))
      expect(res.status).toBe(404)
    })

    it('User B\'s own data is unaffected', async () => {
      const resB = await request(ctx.app)
        .get('/api/accounts')
        .set(authHeader(userB.token))
      expect(resB.body.data.accounts).toHaveLength(0)
    })
  })

  // ------------------------------------------------------------------
  // Specifications
  // ------------------------------------------------------------------
  describe('specifications', () => {
    it('creates a specification with correct fields', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const res = await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send(SPEC_PAYLOAD)

      expect(res.status).toBe(201)
      expect(res.body.data.specification.symbol).toBe('XAUUSDc')
      expect(res.body.data.specification.contractSize).toBe(1)
      expect(res.body.data.specification.minimumLot).toBe(0.01)
      expect(res.body.data.specification.maximumLot).toBe(200)
      expect(res.body.data.specification.lotStep).toBe(0.01)
      expect(res.body.data.specification.tradingAccountId).toBe(accountId)
    })

    it('lists specifications for an account', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send(SPEC_PAYLOAD)
      await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send({ ...SPEC_PAYLOAD, symbol: 'XAUUSD' })

      const res = await request(app)
        .get(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
      expect(res.status).toBe(200)
      expect(res.body.data.specifications).toHaveLength(2)
    })

    it('updates a specification', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const spec = await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send(SPEC_PAYLOAD)
      const specId = spec.body.data.specification.id as string

      const res = await request(app)
        .patch(`/api/accounts/${accountId}/specifications/${specId}`)
        .set(authHeader(token))
        .send({ lotStep: 0.05, minimumLot: 0.05 })
      expect(res.status).toBe(200)
      expect(res.body.data.specification.lotStep).toBe(0.05)
      expect(res.body.data.specification.minimumLot).toBe(0.05)
    })

    it('deletes a specification', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const spec = await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send(SPEC_PAYLOAD)
      const specId = spec.body.data.specification.id as string

      const del = await request(app)
        .delete(`/api/accounts/${accountId}/specifications/${specId}`)
        .set(authHeader(token))
      expect(del.status).toBe(200)

      const list = await request(app)
        .get(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
      expect(list.body.data.specifications).toHaveLength(0)
    })

    it('rejects minimumLot > maximumLot', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const res = await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send({ ...SPEC_PAYLOAD, minimumLot: 300, maximumLot: 200 })
      expect(res.status).toBe(400)
      expect(res.body.error.errors.maximumLot).toContain('minimum lot')
    })

    it('rejects lotStep > maximumLot', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const res = await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send({ ...SPEC_PAYLOAD, lotStep: 300, maximumLot: 200 })
      expect(res.status).toBe(400)
      expect(res.body.error.errors.lotStep).toContain('maximum lot')
    })

    it('rejects contractSize <= 0', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const res = await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send({ ...SPEC_PAYLOAD, contractSize: 0 })
      expect(res.status).toBe(400)
    })

    it('rejects missing symbol', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const res = await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send({ contractSize: SPEC_PAYLOAD.contractSize, minimumLot: SPEC_PAYLOAD.minimumLot, maximumLot: SPEC_PAYLOAD.maximumLot, lotStep: SPEC_PAYLOAD.lotStep })
      expect(res.status).toBe(400)
      expect(res.body.error.errors.symbol).toContain('required')
    })

    it('rejects duplicate symbol (case-insensitive)', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send(SPEC_PAYLOAD)
      const res = await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send({ ...SPEC_PAYLOAD, symbol: 'xauusdc' })
      expect(res.status).toBe(409)
    })

    it('re-validates cross-field constraints on update', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const spec = await request(app)
        .post(`/api/accounts/${accountId}/specifications`)
        .set(authHeader(token))
        .send(SPEC_PAYLOAD)
      const specId = spec.body.data.specification.id as string

      const res = await request(app)
        .patch(`/api/accounts/${accountId}/specifications/${specId}`)
        .set(authHeader(token))
        .send({ minimumLot: 300 })
      expect(res.status).toBe(400)
      expect(res.body.error.errors.maximumLot).toContain('minimum lot')
    })

    it('returns 404 when specifying a nonexistent account', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/accounts/999/specifications')
        .set(authHeader(token))
        .send(SPEC_PAYLOAD)
      expect(res.status).toBe(404)
    })

    it('returns 404 when deleting a nonexistent specification', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = created.body.data.account.id as string
      const res = await request(app)
        .delete(`/api/accounts/${accountId}/specifications/999`)
        .set(authHeader(token))
      expect(res.status).toBe(404)
    })
  })

  // ------------------------------------------------------------------
  // Default-account behaviour
  // ------------------------------------------------------------------
  describe('default account behaviour', () => {
    it('only one default exists after creating three accounts', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      await request(app).post('/api/accounts').set(authHeader(token)).send(ACCOUNT_PAYLOAD)
      await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, accountName: 'Account 2' })
      await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, accountName: 'Account 3' })

      const res = await request(app).get('/api/accounts').set(authHeader(token))
      const defaults = res.body.data.accounts.filter((a: { isDefault: boolean }) => a.isDefault)
      expect(defaults).toHaveLength(1)
    })

    it('safely changes the default without creating duplicates', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const first = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const firstId = first.body.data.account.id as string
      const second = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, accountName: 'Second' })
      const secondId = second.body.data.account.id as string

      // First is the default; promote the second.
      await request(app)
        .patch(`/api/accounts/${secondId}`)
        .set(authHeader(token))
        .send({ isDefault: true })

      const res = await request(app).get('/api/accounts').set(authHeader(token))
      const defaults = res.body.data.accounts.filter((a: { isDefault: boolean }) => a.isDefault)
      expect(defaults).toHaveLength(1)
      expect(defaults[0].id).toBe(secondId)

      // Verify the first account is no longer default.
      const updatedFirst = await request(app)
        .get(`/api/accounts/${firstId}`)
        .set(authHeader(token))
      expect(updatedFirst.body.data.account.isDefault).toBe(false)
    })

    it('accounts can be created inactive', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send({ ...ACCOUNT_PAYLOAD, isActive: false })
      expect(res.body.data.account.isActive).toBe(false)
      // An inactive account is still stored and visible.
      const list = await request(app).get('/api/accounts').set(authHeader(token))
      expect(list.body.data.accounts).toHaveLength(1)
    })
  })

  // ------------------------------------------------------------------
  // 404 handling (still works)
  // ------------------------------------------------------------------
  describe('404 handling', () => {
    it('returns a 404 JSON envelope for an unknown route', async () => {
      const { app } = createTestApp()
      const res = await request(app).get('/api/nonexistent')
      expect(res.status).toBe(404)
      expect(res.body.success).toBe(false)
      expect(res.body.error.status).toBe(404)
    })
  })
})
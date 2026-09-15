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
  CalculationRecord,
  CalculationRepository,
  CalculationCreateInput,
} from '../db/calculationsRepository.ts'

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
      createdAt: now,
      updatedAt: now,
    }
    this.usersById.set(id, user)
    return user
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

class MemoryCalculationsRepository implements CalculationRepository {
  private readonly records = new Map<string, CalculationRecord>()
  private nextId = 1

  async list(userId: string): Promise<CalculationRecord[]> {
    return [...this.records.values()]
      .filter((r) => r.userId === userId)
      .sort((a, b) => {
        if (a.createdAt.getTime() !== b.createdAt.getTime())
          return b.createdAt.getTime() - a.createdAt.getTime()
        return b.id.localeCompare(a.id)
      })
  }

  async findById(userId: string, calculationId: string): Promise<CalculationRecord | null> {
    const record = this.records.get(calculationId)
    return record !== undefined && record.userId === userId ? record : null
  }

  async create(input: CalculationCreateInput): Promise<CalculationRecord> {
    const now = new Date()
    const id = String(this.nextId++)
    const record: CalculationRecord = {
      id,
      userId: input.userId,
      tradingAccountId: input.tradingAccountId,
      symbol: input.symbol,
      position: input.position,
      entryPrice: input.entryPrice,
      inputs: input.inputs,
      outputs: input.outputs,
      createdAt: now,
    }
    this.records.set(id, record)
    return record
  }

  async remove(userId: string, calculationId: string): Promise<boolean> {
    const record = this.records.get(calculationId)
    if (record === undefined || record.userId !== userId) return false
    return this.records.delete(calculationId)
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
  calculationsRepository: MemoryCalculationsRepository
}

function createTestApp(): TestContext {
  const userRepository = new MemoryUserRepository()
  const tokenStore = new MemoryTokenStore()
  const accountsRepository = new MemoryAccountsRepository()
  const calculationsRepository = new MemoryCalculationsRepository()
  const dependencies: AppDependencies = {
    userRepository,
    tokenStore,
    accountsRepository,
    calculationsRepository,
  }
  return {
    app: createApp(dependencies),
    userRepository,
    tokenStore,
    accountsRepository,
    calculationsRepository,
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

const CALC_PAYLOAD = {
  symbol: 'XAUUSDc',
  position: 'BUY',
  entryPrice: 4014.73,
  inputs: {
    accountBalance: 1220.3,
    riskMode: 'ACCOUNT_CURRENCY',
    riskValue: 100,
    symbol: 'XAUUSDc',
    contractSize: 1,
    lotStep: 0.01,
    minimumLot: 0.01,
    maximumLot: 200,
    accountCurrency: 'USC',
    uscPerUsd: 100,
    position: 'BUY',
    entryPrice: 4014.73,
    stopLoss: 4002.69,
    takeProfit: 4052.23,
  },
  outputs: {
    slDistance: 12.04,
    riskAmount: 100,
    riskAmountUsd: 1,
    exactLot: 0.0831,
    recommendedLot: 0.08,
    actualRisk: 96.32,
    actualRiskUsd: 0.9632,
    isBelowMinLot: false,
    valid: true,
    errors: [],
    warnings: [],
    riskRewardRatio: 3.11,
    rewardDistance: 37.5,
    potentialProfit: 311.46,
    potentialProfitUsd: 3.11,
  },
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Calculation history', () => {
  // ------------------------------------------------------------------
  // Authentication
  // ------------------------------------------------------------------
  describe('authentication', () => {
    it('rejects unauthenticated GET /api/calculations with 401', async () => {
      const { app } = createTestApp()
      const res = await request(app).get('/api/calculations')
      expect(res.status).toBe(401)
    })

    it('rejects unauthenticated POST /api/calculations with 401', async () => {
      const { app } = createTestApp()
      const res = await request(app).post('/api/calculations').send(CALC_PAYLOAD)
      expect(res.status).toBe(401)
    })

    it('rejects unauthenticated GET /api/calculations/:id with 401', async () => {
      const { app } = createTestApp()
      const res = await request(app).get('/api/calculations/1')
      expect(res.status).toBe(401)
    })

    it('rejects unauthenticated DELETE /api/calculations/:id with 401', async () => {
      const { app } = createTestApp()
      const res = await request(app).delete('/api/calculations/1')
      expect(res.status).toBe(401)
    })
  })

  // ------------------------------------------------------------------
  // Create
  // ------------------------------------------------------------------
  describe('POST /api/calculations', () => {
    it('saves a calculation and returns 201 with echoed fields', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send(CALC_PAYLOAD)

      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.calculation.symbol).toBe('XAUUSDc')
      expect(res.body.data.calculation.position).toBe('BUY')
      expect(res.body.data.calculation.entryPrice).toBe(4014.73)
      expect(res.body.data.calculation.tradingAccountId).toBeNull()
      expect(res.body.data.calculation.createdAt).toBeDefined()
    })

    it('stores the inputs and outputs snapshots', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send(CALC_PAYLOAD)

      expect(res.body.data.calculation.inputs.symbol).toBe('XAUUSDc')
      expect(res.body.data.calculation.inputs.stopLoss).toBe(4002.69)
      expect(res.body.data.calculation.outputs.recommendedLot).toBe(0.08)
      expect(res.body.data.calculation.outputs.valid).toBe(true)
    })

    it('accepts a SELL calculation', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send({ ...CALC_PAYLOAD, position: 'SELL', entryPrice: 3998.55 })
      expect(res.status).toBe(201)
      expect(res.body.data.calculation.position).toBe('SELL')
    })

    it('links a calculation to an owned trading account when provided', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const account = await request(app)
        .post('/api/accounts')
        .set(authHeader(token))
        .send(ACCOUNT_PAYLOAD)
      const accountId = account.body.data.account.id as string

      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send({ ...CALC_PAYLOAD, tradingAccountId: accountId })
      expect(res.status).toBe(201)
      expect(res.body.data.calculation.tradingAccountId).toBe(accountId)
    })

    it('rejects an unowned or nonexistent trading account with 404', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send({ ...CALC_PAYLOAD, tradingAccountId: '999' })
      expect(res.status).toBe(404)
    })

    it('rejects a request missing required fields', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send({})
      expect(res.status).toBe(400)
      expect(res.body.error.errors.symbol).toContain('required')
      expect(res.body.error.errors.position).toBeDefined()
      expect(res.body.error.errors.entryPrice).toBeDefined()
      expect(res.body.error.errors.inputs).toBeDefined()
      expect(res.body.error.errors.outputs).toBeDefined()
    })

    it('rejects an invalid position', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send({ ...CALC_PAYLOAD, position: 'HOLD' })
      expect(res.status).toBe(400)
      expect(res.body.error.errors.position).toContain('BUY')
    })

    it('rejects a non-positive entry price', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send({ ...CALC_PAYLOAD, entryPrice: 0 })
      expect(res.status).toBe(400)
      expect(res.body.error.errors.entryPrice).toContain('greater than zero')
    })

    it('rejects inputs/outputs that are not JSON objects', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send({ ...CALC_PAYLOAD, inputs: [1, 2, 3] })
      expect(res.status).toBe(400)
      expect(res.body.error.errors.inputs).toContain('JSON objects')
    })

    it('ignores a client-supplied userId (ownership comes from the token)', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send({ ...CALC_PAYLOAD, userId: '999' })
      expect(res.status).toBe(201)
      const list = await request(app).get('/api/calculations').set(authHeader(token))
      expect(list.body.data.calculations).toHaveLength(1)
      expect(list.body.data.calculations[0].id).toBe(res.body.data.calculation.id)
      expect(list.body.data.calculations[0].userId).toBeUndefined()
    })
  })

  // ------------------------------------------------------------------
  // List
  // ------------------------------------------------------------------
  describe('GET /api/calculations', () => {
    it('lists only the caller\'s calculations, newest first', async () => {
      const { app } = createTestApp()
      const userA = await registerAndLogin(app, 'a@test.com', 'User A')
      const userB = await registerAndLogin(app, 'b@test.com', 'User B')

      const first = await request(app)
        .post('/api/calculations')
        .set(authHeader(userA.token))
        .send({ ...CALC_PAYLOAD, entryPrice: 4000 })
      const second = await request(app)
        .post('/api/calculations')
        .set(authHeader(userA.token))
        .send({ ...CALC_PAYLOAD, entryPrice: 4100, position: 'SELL' })
      await request(app)
        .post('/api/calculations')
        .set(authHeader(userB.token))
        .send({ ...CALC_PAYLOAD, entryPrice: 4010 })

      const resA = await request(app).get('/api/calculations').set(authHeader(userA.token))
      expect(resA.status).toBe(200)
      expect(resA.body.data.calculations).toHaveLength(2)
      // Newest (second) first.
      expect(resA.body.data.calculations[0].id).toBe(second.body.data.calculation.id)
      expect(resA.body.data.calculations[1].id).toBe(first.body.data.calculation.id)

      const resB = await request(app).get('/api/calculations').set(authHeader(userB.token))
      expect(resB.body.data.calculations).toHaveLength(1)
    })

    it('returns an empty list when nothing is saved', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app).get('/api/calculations').set(authHeader(token))
      expect(res.status).toBe(200)
      expect(res.body.data.calculations).toEqual([])
    })
  })

  // ------------------------------------------------------------------
  // Read one
  // ------------------------------------------------------------------
  describe('GET /api/calculations/:id', () => {
    it('retrieves an owned calculation', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send(CALC_PAYLOAD)
      const id = created.body.data.calculation.id as string

      const res = await request(app).get(`/api/calculations/${id}`).set(authHeader(token))
      expect(res.status).toBe(200)
      expect(res.body.data.calculation.id).toBe(id)
      expect(res.body.data.calculation.symbol).toBe('XAUUSDc')
    })

    it('returns 404 for a nonexistent calculation', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app).get('/api/calculations/999').set(authHeader(token))
      expect(res.status).toBe(404)
    })

    it('returns 404 for another user\'s calculation', async () => {
      const { app } = createTestApp()
      const userA = await registerAndLogin(app, 'a@test.com', 'User A')
      const userB = await registerAndLogin(app, 'b@test.com', 'User B')
      const created = await request(app)
        .post('/api/calculations')
        .set(authHeader(userA.token))
        .send(CALC_PAYLOAD)
      const id = created.body.data.calculation.id as string

      const res = await request(app).get(`/api/calculations/${id}`).set(authHeader(userB.token))
      expect(res.status).toBe(404)
    })
  })

  // ------------------------------------------------------------------
  // Delete
  // ------------------------------------------------------------------
  describe('DELETE /api/calculations/:id', () => {
    it('deletes an owned calculation', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const created = await request(app)
        .post('/api/calculations')
        .set(authHeader(token))
        .send(CALC_PAYLOAD)
      const id = created.body.data.calculation.id as string

      const del = await request(app)
        .delete(`/api/calculations/${id}`)
        .set(authHeader(token))
      expect(del.status).toBe(200)
      expect(del.body.success).toBe(true)

      const get = await request(app).get(`/api/calculations/${id}`).set(authHeader(token))
      expect(get.status).toBe(404)
    })

    it('returns 404 for a nonexistent calculation', async () => {
      const { app } = createTestApp()
      const { token } = await registerAndLogin(app)
      const res = await request(app).delete('/api/calculations/999').set(authHeader(token))
      expect(res.status).toBe(404)
    })

    it('returns 404 when deleting another user\'s calculation', async () => {
      const { app } = createTestApp()
      const userA = await registerAndLogin(app, 'a@test.com', 'User A')
      const userB = await registerAndLogin(app, 'b@test.com', 'User B')
      const created = await request(app)
        .post('/api/calculations')
        .set(authHeader(userA.token))
        .send(CALC_PAYLOAD)
      const id = created.body.data.calculation.id as string

      const res = await request(app)
        .delete(`/api/calculations/${id}`)
        .set(authHeader(userB.token))
      expect(res.status).toBe(404)
    })

    it('leaves the owner\'s other data untouched after a cross-user attempt', async () => {
      const { app } = createTestApp()
      const userA = await registerAndLogin(app, 'a@test.com', 'User A')
      const userB = await registerAndLogin(app, 'b@test.com', 'User B')
      await request(app)
        .post('/api/calculations')
        .set(authHeader(userA.token))
        .send(CALC_PAYLOAD)

      await request(app).delete('/api/calculations/1').set(authHeader(userB.token))

      const resA = await request(app).get('/api/calculations').set(authHeader(userA.token))
      expect(resA.body.data.calculations).toHaveLength(1)
    })
  })

  // ------------------------------------------------------------------
  // 404 handling
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
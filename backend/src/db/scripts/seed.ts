import { Client } from 'pg'
import { config } from '../../config/env.ts'
import { hashPassword } from '../../auth/password.ts'

/**
 * Seeds safe, clearly-labelled DEVELOPMENT data:
 *
 *   * a development user (password is a public, documented DEV password —
 *     never use real credentials)
 *   * the Exness Standard Cent trading account used as the reference case in
 *     `frontend/src/calculator/CalculatorEngine.test.ts`
 *   * its XAUUSDc trading specification
 *
 * The seed is idempotent: existing rows are left untouched (except that a
 * previously-seeded dev user with a NULL password hash gets one set) so
 * re-running it never clobbers local edits. Remove/recreate the database to
 * reseed from scratch (`npm run db:drop -- --yes && npm run db:create &&
 * npm run db:migrate && npm run db:seed`).
 *
 * NOTE: This seed must never contain real credentials.
 */

const TABLES_TO_CHECK = ['users', 'trading_accounts'] as const

interface DevSeed {
  email: string
  password: string
  name: string
  accountName: string
  broker: string
  accountType: string
  currency: string
  usdConversion: string
  balance: string
  symbol: string
  contractSize: string
  minimumLot: string
  maximumLot: string
  lotStep: string
}

const SEED: DevSeed = {
  email: 'dev@goldrisk.dev',
  // Development-only password, publicly documented in database.md.
  password: 'dev-password-123',
  name: 'Development User',
  accountName: 'Exness Standard Cent',
  broker: 'Exness',
  accountType: 'Standard Cent',
  currency: 'USC',
  usdConversion: '100',
  balance: '1220.30',
  symbol: 'XAUUSDc',
  contractSize: '1',
  minimumLot: '0.01',
  maximumLot: '200',
  lotStep: '0.01',
}

async function main(): Promise<void> {
  if (config.database.connectionString === null) {
    throw new Error(
      'DATABASE_URL is not configured. Set DATABASE_URL in the backend `.env` ' +
        'file (see `.env.example`).',
    )
  }

  const client = new Client({ connectionString: config.database.connectionString })
  await client.connect()
  try {
    for (const table of TABLES_TO_CHECK) {
      const exists = await client.query(
        `SELECT to_regclass($1) AS table_name`,
        [table],
      )
      if (exists.rows[0]?.table_name === null) {
        throw new Error(
          `Table "${table}" does not exist. Run "npm run db:migrate" before seeding.`,
        )
      }
    }

    const user = await ensureDevUser(client)
    await ensureDevAccount(client, user.id)
  } finally {
    await client.end()
  }
}

async function ensureDevUser(
  client: Client,
): Promise<{ id: string }> {
  const existing = await client.query(
    'SELECT id, password_hash AS "passwordHash" FROM users WHERE LOWER(email) = LOWER($1)',
    [SEED.email],
  )
  if (existing.rows[0] !== undefined) {
    const row = existing.rows[0]
    if (row.passwordHash === null) {
      // Upgrade a Phase 7 user (seeded before auth) with the dev password.
      const passwordHash = await hashPassword(SEED.password)
      await client.query('UPDATE users SET password_hash = $1 WHERE id = $2', [
        passwordHash,
        row.id,
      ])
      console.log(`[db:seed] user updated      ${SEED.email} (dev password hash set)`)
    } else {
      console.log(`[db:seed] user exists       ${SEED.email} — skipped`)
    }
    return { id: String(row.id) }
  }

  const passwordHash = await hashPassword(SEED.password)
  const inserted = await client.query<{ id: string }>(
    `INSERT INTO users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING id`,
    [SEED.email, passwordHash, SEED.name],
  )
  const id = String(inserted.rows[0]?.id)
  console.log(`[db:seed] user created      ${SEED.email} (dev password hash set)`)
  return { id }
}

async function ensureDevAccount(client: Client, userId: string): Promise<void> {
  const existing = await client.query(
    `SELECT id FROM trading_accounts
      WHERE user_id = $1 AND account_name = $2`,
    [userId, SEED.accountName],
  )
  if (existing.rows[0] !== undefined) {
    console.log(`[db:seed] account exists    ${SEED.accountName} — skipped`)
    return
  }

  const account = await client.query<{ id: string }>(
    `INSERT INTO trading_accounts
       (user_id, account_name, broker, account_type, currency, usd_conversion,
        balance, is_active, is_default)
     VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, TRUE)
     RETURNING id`,
    [
      userId,
      SEED.accountName,
      SEED.broker,
      SEED.accountType,
      SEED.currency,
      SEED.usdConversion,
      SEED.balance,
    ],
  )
  const accountId = String(account.rows[0]?.id)
  console.log(`[db:seed] account created    ${SEED.accountName}`)

  const existingSpec = await client.query(
    `SELECT id FROM account_specifications
      WHERE trading_account_id = $1 AND symbol = $2`,
    [accountId, SEED.symbol],
  )
  if (existingSpec.rows[0] !== undefined) {
    console.log(`[db:seed] spec exists        ${SEED.symbol} — skipped`)
    return
  }

  await client.query(
    `INSERT INTO account_specifications
       (trading_account_id, symbol, contract_size, minimum_lot, maximum_lot, lot_step)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      accountId,
      SEED.symbol,
      SEED.contractSize,
      SEED.minimumLot,
      SEED.maximumLot,
      SEED.lotStep,
    ],
  )
  console.log(`[db:seed] spec created       ${SEED.symbol} (contract ${SEED.contractSize}, lots ${SEED.minimumLot}–${SEED.maximumLot}, step ${SEED.lotStep})`)
}

main().catch((err: unknown) => {
  console.error(`[db:seed] failed: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
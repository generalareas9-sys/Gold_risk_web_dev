import type { Pool } from 'pg'

/**
 * Trading-account storage (Phase 9). Every read/write is scoped by the
 * authenticated `userId` so no account can ever be reached through another
 * user's id — ownership is enforced in SQL, not just in the service layer.
 */

export interface AccountRecord {
  id: string
  userId: string
  accountName: string
  broker: string
  accountType: string
  currency: string
  usdConversion: number
  balance: number
  isActive: boolean
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AccountCreateInput {
  userId: string
  accountName: string
  broker: string
  accountType: string
  currency: string
  usdConversion: number
  balance: number
  isActive: boolean
  isDefault: boolean
}

export type AccountUpdateChanges = Partial<
  Pick<
    AccountCreateInput,
    | 'accountName'
    | 'broker'
    | 'accountType'
    | 'currency'
    | 'usdConversion'
    | 'balance'
    | 'isActive'
    | 'isDefault'
  >
>

export interface AccountRepository {
  /** Lists the user's accounts, default first. */
  list(userId: string): Promise<AccountRecord[]>
  /** Finds an account the user owns, or null when it does not exist / is not theirs. */
  findById(userId: string, accountId: string): Promise<AccountRecord | null>
  /** Counts the user's accounts (used to decide first-account defaulting). */
  count(userId: string): Promise<number>
  /**
   * Inserts a trading account in one transaction. The user's very first
   * account automatically becomes the default; otherwise the requested
   * `is_default` applies, and requesting `true` clears the previous default
   * first so the partial unique index is never violated.
   */
  create(input: AccountCreateInput): Promise<AccountRecord>
  /**
   * Applies partial changes to an owned account. When `isDefault: true` is
   * requested the previous default is cleared in the same transaction.
   * Returns null when the account is not owned (or does not exist).
   */
  update(
    userId: string,
    accountId: string,
    changes: AccountUpdateChanges,
  ): Promise<AccountRecord | null>
  /** Deletes an owned account. Returns false when nothing was deleted. */
  remove(userId: string, accountId: string): Promise<boolean>
}

interface AccountRow {
  id: string
  userId: string
  accountName: string
  broker: string
  accountType: string
  currency: string
  usdConversion: string
  balance: string
  isActive: boolean
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

const ACCOUNT_COLUMNS = {
  accountName: 'account_name',
  broker: 'broker',
  accountType: 'account_type',
  currency: 'currency',
  usdConversion: 'usd_conversion',
  balance: 'balance',
  isActive: 'is_active',
  isDefault: 'is_default',
} as const

type AccountColumnKey = keyof typeof ACCOUNT_COLUMNS

const ACCOUNT_COLUMNS_SELECT = `
  id, user_id AS "userId", account_name AS "accountName", broker,
  account_type AS "accountType", currency,
  usd_conversion AS "usdConversion", balance,
  is_active AS "isActive", is_default AS "isDefault",
  created_at AS "createdAt", updated_at AS "updatedAt"
`

function mapAccountRow(row: AccountRow): AccountRecord {
  return {
    id: row.id,
    userId: row.userId,
    accountName: row.accountName,
    broker: row.broker,
    accountType: row.accountType,
    currency: row.currency,
    usdConversion: Number(row.usdConversion),
    balance: Number(row.balance),
    isActive: row.isActive,
    isDefault: row.isDefault,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

function buildAccountUpdateQuery(keys: AccountColumnKey[]): string {
  const assignments = keys.map((key, index) => `${ACCOUNT_COLUMNS[key]} = $${index + 3}`)
  return `
    UPDATE trading_accounts
       SET ${assignments.join(', ')}
     WHERE id = $1 AND user_id = $2
     RETURNING ${ACCOUNT_COLUMNS_SELECT.trim()}`
}

/** PostgreSQL-backed trading-account repository using the shared pool. */
export class PostgresAccountsRepository implements AccountRepository {
  constructor(private readonly pool: Pool | null) {}

  private getPool(): Pool {
    if (this.pool === null) {
      throw new Error(
        'DATABASE_URL is not configured. Set DATABASE_URL in the backend `.env` ' +
          'file (see `.env.example`).',
      )
    }
    return this.pool
  }

  async list(userId: string): Promise<AccountRecord[]> {
    const pool = this.getPool()
    const result = await pool.query<AccountRow>(
      `SELECT ${ACCOUNT_COLUMNS_SELECT.trim()}
         FROM trading_accounts
        WHERE user_id = $1
        ORDER BY is_default DESC, created_at ASC, id ASC`,
      [userId],
    )
    return result.rows.map(mapAccountRow)
  }

  async findById(userId: string, accountId: string): Promise<AccountRecord | null> {
    const pool = this.getPool()
    const result = await pool.query<AccountRow>(
      `SELECT ${ACCOUNT_COLUMNS_SELECT.trim()}
         FROM trading_accounts
        WHERE id = $1 AND user_id = $2`,
      [accountId, userId],
    )
    const row = result.rows[0]
    return row === undefined ? null : mapAccountRow(row)
  }

  async count(userId: string): Promise<number> {
    const pool = this.getPool()
    const result = await pool.query<{ count: string }>(
      'SELECT COUNT(*) AS count FROM trading_accounts WHERE user_id = $1',
      [userId],
    )
    return Number(result.rows[0]?.count ?? 0)
  }

  async create(input: AccountCreateInput): Promise<AccountRecord> {
    const pool = this.getPool()
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const countResult = await client.query<{ count: string }>(
        'SELECT COUNT(*) AS count FROM trading_accounts WHERE user_id = $1',
        [input.userId],
      )
      const existingCount = Number(countResult.rows[0]?.count ?? 0)
      // The user's first account always becomes the default; otherwise honour
      // the requested value, promoting it only when explicitly asked.
      const isDefault = existingCount === 0 ? true : input.isDefault
      if (isDefault) {
        await client.query(
          'UPDATE trading_accounts SET is_default = FALSE WHERE user_id = $1 AND is_default',
          [input.userId],
        )
      }

      const result = await client.query<AccountRow>(
        `INSERT INTO trading_accounts
           (user_id, account_name, broker, account_type, currency,
            usd_conversion, balance, is_active, is_default)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING ${ACCOUNT_COLUMNS_SELECT.trim()}`,
        [
          input.userId,
          input.accountName,
          input.broker,
          input.accountType,
          input.currency,
          input.usdConversion,
          input.balance,
          input.isActive,
          isDefault,
        ],
      )
      await client.query('COMMIT')

      const row = result.rows[0]
      if (row === undefined) {
        throw new Error('Creating a trading account returned no row.')
      }
      return mapAccountRow(row)
    } catch (err: unknown) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  }

  async update(
    userId: string,
    accountId: string,
    changes: AccountUpdateChanges,
  ): Promise<AccountRecord | null> {
    const pool = this.getPool()
    const keys = Object.keys(changes) as AccountColumnKey[]
    const changeKeys = keys.filter((key) => changes[key] !== undefined)
    if (changeKeys.length === 0) {
      return this.findById(userId, accountId)
    }

    if (changes.isDefault === true) {
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        await client.query(
          'UPDATE trading_accounts SET is_default = FALSE WHERE user_id = $1 AND is_default',
          [userId],
        )
        const result = await client.query<AccountRow>(
          buildAccountUpdateQuery(changeKeys),
          [accountId, userId, ...changeKeys.map((key) => changes[key])],
        )
        await client.query('COMMIT')
        const row = result.rows[0]
        return row === undefined ? null : mapAccountRow(row)
      } catch (err: unknown) {
        await client.query('ROLLBACK')
        throw err
      } finally {
        client.release()
      }
    }

    const result = await pool.query<AccountRow>(
      buildAccountUpdateQuery(changeKeys),
      [accountId, userId, ...changeKeys.map((key) => changes[key])],
    )
    const row = result.rows[0]
    return row === undefined ? null : mapAccountRow(row)
  }

  async remove(userId: string, accountId: string): Promise<boolean> {
    const pool = this.getPool()
    const result = await pool.query(
      'DELETE FROM trading_accounts WHERE id = $1 AND user_id = $2',
      [accountId, userId],
    )
    return (result.rowCount ?? 0) > 0
  }
}
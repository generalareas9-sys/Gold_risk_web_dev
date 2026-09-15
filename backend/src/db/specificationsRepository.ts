import type { Pool } from 'pg'

/**
 * Per-account trading specifications (Phase 9). Each specification belongs to
 * exactly one trading account and describes a single instrument symbol's
 * contract size and lot grid. Every query joins through `trading_accounts` on
 * the authenticated `userId` so ownership is enforced in SQL.
 */

export interface SpecificationRecord {
  id: string
  tradingAccountId: string
  symbol: string
  contractSize: number
  minimumLot: number
  maximumLot: number
  lotStep: number
  createdAt: Date
  updatedAt: Date
}

export interface SpecificationInput {
  symbol: string
  contractSize: number
  minimumLot: number
  maximumLot: number
  lotStep: number
}

export type SpecificationUpdateChanges = Partial<SpecificationInput>

export interface SpecificationRepository {
  /** Lists specifications for an account the user owns. */
  list(userId: string, accountId: string): Promise<SpecificationRecord[]>
  /** Finds a specification in an account the user owns. */
  findById(
    userId: string,
    accountId: string,
    specId: string,
  ): Promise<SpecificationRecord | null>
  /** Creates a specification inside an owned account. Null when the account is not owned. */
  create(
    userId: string,
    accountId: string,
    input: SpecificationInput,
  ): Promise<SpecificationRecord | null>
  /** Updates a specification in an owned account. Null when it is not owned / missing. */
  update(
    userId: string,
    accountId: string,
    specId: string,
    changes: SpecificationUpdateChanges,
  ): Promise<SpecificationRecord | null>
  /** Deletes a specification from an owned account. False when nothing was deleted. */
  remove(userId: string, accountId: string, specId: string): Promise<boolean>
}

interface SpecificationRow {
  id: string
  tradingAccountId: string
  symbol: string
  contractSize: string
  minimumLot: string
  maximumLot: string
  lotStep: string
  createdAt: Date
  updatedAt: Date
}

const SPECIFICATION_COLUMNS = {
  symbol: 'symbol',
  contractSize: 'contract_size',
  minimumLot: 'minimum_lot',
  maximumLot: 'maximum_lot',
  lotStep: 'lot_step',
} as const

type SpecificationColumnKey = keyof typeof SPECIFICATION_COLUMNS

// Qualified aliases for SELECT statements that join (or wrap) the table.
const SPECIFICATION_COLUMNS_SELECT = `
  s.id, s.trading_account_id AS "tradingAccountId", s.symbol,
  s.contract_size AS "contractSize", s.minimum_lot AS "minimumLot",
  s.maximum_lot AS "maximumLot", s.lot_step AS "lotStep",
  s.created_at AS "createdAt", s.updated_at AS "updatedAt"
`

// Unqualified aliases for INSERT/UPDATE RETURNING on the bare table.
const SPECIFICATION_COLUMNS_RETURNING = `
  id, trading_account_id AS "tradingAccountId", symbol,
  contract_size AS "contractSize", minimum_lot AS "minimumLot",
  maximum_lot AS "maximumLot", lot_step AS "lotStep",
  created_at AS "createdAt", updated_at AS "updatedAt"
`

function mapSpecificationRow(row: SpecificationRow): SpecificationRecord {
  return {
    id: row.id,
    tradingAccountId: row.tradingAccountId,
    symbol: row.symbol,
    contractSize: Number(row.contractSize),
    minimumLot: Number(row.minimumLot),
    maximumLot: Number(row.maximumLot),
    lotStep: Number(row.lotStep),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

function buildSpecificationUpdateQuery(keys: SpecificationColumnKey[]): string {
  // $1 = specId, $2 = accountId, $3 = userId, values start at $4.
  const assignments = keys.map((key, index) => `${SPECIFICATION_COLUMNS[key]} = $${index + 4}`)
  return `
    UPDATE account_specifications s
       SET ${assignments.join(', ')}
     WHERE s.id = $1
       AND s.trading_account_id = $2
       AND EXISTS (SELECT 1 FROM trading_accounts ta
                     WHERE ta.id = $2 AND ta.user_id = $3)
     RETURNING ${SPECIFICATION_COLUMNS_RETURNING.trim()}`
}

/** PostgreSQL-backed specifications repository using the shared pool. */
export class PostgresSpecificationsRepository implements SpecificationRepository {
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

  async list(userId: string, accountId: string): Promise<SpecificationRecord[]> {
    const pool = this.getPool()
    const result = await pool.query<SpecificationRow>(
      `SELECT ${SPECIFICATION_COLUMNS_SELECT.trim()}
         FROM account_specifications s
         JOIN trading_accounts ta ON ta.id = s.trading_account_id
        WHERE ta.user_id = $1 AND ta.id = $2
        ORDER BY s.symbol ASC`,
      [userId, accountId],
    )
    return result.rows.map(mapSpecificationRow)
  }

  async findById(
    userId: string,
    accountId: string,
    specId: string,
  ): Promise<SpecificationRecord | null> {
    const pool = this.getPool()
    const result = await pool.query<SpecificationRow>(
      `SELECT ${SPECIFICATION_COLUMNS_SELECT.trim()}
         FROM account_specifications s
         JOIN trading_accounts ta ON ta.id = s.trading_account_id
        WHERE ta.user_id = $1 AND ta.id = $2 AND s.id = $3`,
      [userId, accountId, specId],
    )
    const row = result.rows[0]
    return row === undefined ? null : mapSpecificationRow(row)
  }

  async create(
    userId: string,
    accountId: string,
    input: SpecificationInput,
  ): Promise<SpecificationRecord | null> {
    const pool = this.getPool()
    const result = await pool.query<SpecificationRow>(
      `INSERT INTO account_specifications
         (trading_account_id, symbol, contract_size, minimum_lot, maximum_lot, lot_step)
       SELECT $1, $2, $3, $4, $5, $6
        WHERE EXISTS (SELECT 1 FROM trading_accounts WHERE id = $1 AND user_id = $7)
        RETURNING ${SPECIFICATION_COLUMNS_RETURNING.trim()}`,
      [
        accountId,
        input.symbol,
        input.contractSize,
        input.minimumLot,
        input.maximumLot,
        input.lotStep,
        userId,
      ],
    )
    const row = result.rows[0]
    return row === undefined ? null : mapSpecificationRow(row)
  }

  async update(
    userId: string,
    accountId: string,
    specId: string,
    changes: SpecificationUpdateChanges,
  ): Promise<SpecificationRecord | null> {
    const pool = this.getPool()
    const keys = Object.keys(changes) as SpecificationColumnKey[]
    const changeKeys = keys.filter((key) => changes[key] !== undefined)
    if (changeKeys.length === 0) {
      return this.findById(userId, accountId, specId)
    }
    const result = await pool.query<SpecificationRow>(
      buildSpecificationUpdateQuery(changeKeys),
      [specId, accountId, userId, ...changeKeys.map((key) => changes[key])],
    )
    const row = result.rows[0]
    return row === undefined ? null : mapSpecificationRow(row)
  }

  async remove(userId: string, accountId: string, specId: string): Promise<boolean> {
    const pool = this.getPool()
    const result = await pool.query(
      `DELETE FROM account_specifications s
        WHERE s.id = $1
          AND s.trading_account_id = $2
          AND EXISTS (SELECT 1 FROM trading_accounts ta
                       WHERE ta.id = $2 AND ta.user_id = $3)`,
      [specId, accountId, userId],
    )
    return (result.rowCount ?? 0) > 0
  }
}
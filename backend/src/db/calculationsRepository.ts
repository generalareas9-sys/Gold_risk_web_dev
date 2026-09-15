import type { Pool } from 'pg'

/**
 * Calculation-history storage (Phase 10). Every read/write is scoped by the
 * authenticated `userId` so no saved calculation can ever be reached through
 * another user's id — ownership is enforced in SQL, not just in the service
 * layer. The optional `tradingAccountId` reference is verified by the service
 * layer before an insert (the account must belong to the same user) and is
 * stored `SET NULL` when the account is later deleted so history survives.
 */

export interface CalculationRecord {
  id: string
  userId: string
  tradingAccountId: string | null
  symbol: string
  position: 'BUY' | 'SELL'
  entryPrice: number
  /** JSONB snapshot of exactly what the calculator received. */
  inputs: unknown
  /** JSONB snapshot of exactly what the calculator produced. */
  outputs: unknown
  createdAt: Date
}

export interface CalculationCreateInput {
  userId: string
  tradingAccountId: string | null
  symbol: string
  position: 'BUY' | 'SELL'
  entryPrice: number
  inputs: unknown
  outputs: unknown
}

export interface CalculationRepository {
  /** Lists the user's saved calculations, newest first. */
  list(userId: string): Promise<CalculationRecord[]>
  /** Finds a calculation the user owns, or null when it does not exist / is not theirs. */
  findById(userId: string, calculationId: string): Promise<CalculationRecord | null>
  /** Inserts a saved calculation. The tradingAccountId ownership is validated by the service. */
  create(input: CalculationCreateInput): Promise<CalculationRecord>
  /** Deletes an owned calculation. Returns false when nothing was deleted. */
  remove(userId: string, calculationId: string): Promise<boolean>
}

interface CalculationRow {
  id: string
  userId: string
  tradingAccountId: string | null
  symbol: string
  position: 'BUY' | 'SELL'
  entryPrice: string
  inputs: unknown
  outputs: unknown
  createdAt: Date
}

const CALCULATION_COLUMNS_SELECT = `
  id, user_id AS "userId", trading_account_id AS "tradingAccountId",
  symbol, position, entry_price AS "entryPrice",
  inputs, outputs, created_at AS "createdAt"
`

function mapCalculationRow(row: CalculationRow): CalculationRecord {
  return {
    id: row.id,
    userId: row.userId,
    tradingAccountId: row.tradingAccountId,
    symbol: row.symbol,
    position: row.position,
    entryPrice: Number(row.entryPrice),
    inputs: row.inputs,
    outputs: row.outputs,
    createdAt: row.createdAt,
  }
}

/** PostgreSQL-backed calculation-history repository using the shared pool. */
export class PostgresCalculationsRepository implements CalculationRepository {
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

  async list(userId: string): Promise<CalculationRecord[]> {
    const pool = this.getPool()
    const result = await pool.query<CalculationRow>(
      `SELECT ${CALCULATION_COLUMNS_SELECT.trim()}
         FROM calculation_history
        WHERE user_id = $1
        ORDER BY created_at DESC, id DESC`,
      [userId],
    )
    return result.rows.map(mapCalculationRow)
  }

  async findById(userId: string, calculationId: string): Promise<CalculationRecord | null> {
    const pool = this.getPool()
    const result = await pool.query<CalculationRow>(
      `SELECT ${CALCULATION_COLUMNS_SELECT.trim()}
         FROM calculation_history
        WHERE id = $1 AND user_id = $2`,
      [calculationId, userId],
    )
    const row = result.rows[0]
    return row === undefined ? null : mapCalculationRow(row)
  }

  async create(input: CalculationCreateInput): Promise<CalculationRecord> {
    const pool = this.getPool()
    const result = await pool.query<CalculationRow>(
      `INSERT INTO calculation_history
         (user_id, trading_account_id, symbol, position, entry_price, inputs, outputs)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb)
       RETURNING ${CALCULATION_COLUMNS_SELECT.trim()}`,
      [
        input.userId,
        input.tradingAccountId,
        input.symbol,
        input.position,
        input.entryPrice,
        JSON.stringify(input.inputs),
        JSON.stringify(input.outputs),
      ],
    )
    const row = result.rows[0]
    if (row === undefined) {
      throw new Error('Saving a calculation returned no row.')
    }
    return mapCalculationRow(row)
  }

  async remove(userId: string, calculationId: string): Promise<boolean> {
    const pool = this.getPool()
    const result = await pool.query(
      'DELETE FROM calculation_history WHERE id = $1 AND user_id = $2',
      [calculationId, userId],
    )
    return (result.rowCount ?? 0) > 0
  }
}
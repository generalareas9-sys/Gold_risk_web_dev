import { Pool } from 'pg'
import { config } from '../config/env.ts'

/**
 * The app-wide PostgreSQL pool.
 *
 * `DATABASE_URL` is optional at boot time (the health probe stays
 * DB-independent), so `pool` may be `null` until a database is configured.
 * Database-backed commands must call `getRequiredPool()` and will fail fast
 * with a readable message if no connection string is configured.
 */
export const pool: Pool | null = config.database.connectionString
  ? new Pool({
      connectionString: config.database.connectionString,
      ssl: config.database.ssl,
    })
  : null

export function getRequiredPool(): Pool {
  if (pool === null) {
    throw new Error(
      'DATABASE_URL is not configured. Set DATABASE_URL in the backend `.env` ' +
        'file (see `.env.example`).',
    )
  }
  return pool
}
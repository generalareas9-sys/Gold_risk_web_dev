import type { Pool } from 'pg'

export interface DatabaseStatus {
  connected: boolean
  databaseName?: string
  currentUser?: string
  serverVersion?: string
  error?: string
}

/**
 * Probes the database without exposing credentials. Returns a plain status
 * object safe to log or return to a developer-only health command.
 */
export async function checkDatabaseConnection(pool: Pool): Promise<DatabaseStatus> {
  try {
    const result = await pool.query<{ db: string; usr: string; ver: string }>(
      'SELECT current_database() AS db, current_user AS usr, version() AS ver',
    )
    const row = result.rows[0]
    if (row === undefined) {
      return { connected: false, error: 'Query returned no rows.' }
    }
    return {
      connected: true,
      databaseName: row.db,
      currentUser: row.usr,
      serverVersion: row.ver,
    }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown error'
    return { connected: false, error: message }
  }
}
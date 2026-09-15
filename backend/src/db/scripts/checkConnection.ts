import { getRequiredPool } from '../../db/pool.ts'
import { checkDatabaseConnection } from '../../db/status.ts'

/**
 * Development convenience: `npm run db:check`.
 *
 * Verifies Node.js → PostgreSQL connectivity and prints a safe summary that
 * never includes the connection string or credentials. Exits non-zero when
 * the database is unreachable.
 */

async function main(): Promise<void> {
  const pool = getRequiredPool()
  const status = await checkDatabaseConnection(pool)
  await pool.end()

  if (!status.connected) {
    throw new Error(
      `Could not connect to PostgreSQL: ${status.error ?? 'unknown error'}`,
    )
  }

  console.log('[db:check] PostgreSQL connection OK')
  console.log(`[db:check] database    ${status.databaseName ?? '(unknown)'}`)
  console.log(`[db:check] user        ${status.currentUser ?? '(unknown)'}`)
  console.log(`[db:check] server      ${status.serverVersion ?? '(unknown)'}`)
}

main().catch((err: unknown) => {
  console.error(`[db:check] failed: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
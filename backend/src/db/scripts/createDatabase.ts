import { Client } from 'pg'
import { config } from '../../config/env.ts'
import { parseDatabaseUrl, quoteIdentifier } from '../../db/admin.ts'

/**
 * Development convenience: `npm run db:create`.
 *
 * Connects to the `postgres` maintenance database and creates the database
 * named in DATABASE_URL (defaults to `goldrisk_dev`). Idempotent: an existing
 * database is reported and left alone.
 *
 * Refuses to run against NODE_ENV=production.
 */

async function main(): Promise<void> {
  if (config.isProduction) {
    throw new Error('db:create is a development command and refuses to run in production.')
  }
  if (config.database.connectionString === null) {
    throw new Error(
      'DATABASE_URL is not configured. Set DATABASE_URL in the backend `.env` ' +
        'file (see `.env.example`).',
    )
  }

  const { adminConnectionString, databaseName } = parseDatabaseUrl(
    config.database.connectionString,
  )

  const client = new Client({ connectionString: adminConnectionString })
  await client.connect()
  try {
    await client.query(`CREATE DATABASE ${quoteIdentifier(databaseName)}`)
    console.log(`[db:create] created "${databaseName}"`)
  } catch (err: unknown) {
    if (isAlreadyExistsError(err)) {
      console.log(`[db:create] database "${databaseName}" already exists — nothing to do.`)
    } else {
      throw err
    }
  } finally {
    await client.end()
  }
}

function isAlreadyExistsError(err: unknown): boolean {
  return (
    err instanceof Error &&
    'code' in err &&
    (err as { code?: string }).code === '42P04'
  )
}

main().catch((err: unknown) => {
  console.error(`[db:create] failed: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
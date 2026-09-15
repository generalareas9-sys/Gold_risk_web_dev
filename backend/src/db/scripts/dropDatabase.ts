import { Client } from 'pg'
import { config } from '../../config/env.ts'
import { parseDatabaseUrl, quoteIdentifier } from '../../db/admin.ts'

/**
 * Development convenience: `npm run db:drop -- --yes`.
 *
 * Destructive: drops the database named in DATABASE_URL (defaults to
 * `goldrisk_dev`) with FORCE (terminating active connections on PostgreSQL 13+).
 *
 * Safety guards:
 *   * refuses to run against NODE_ENV=production
 *   * requires an explicit `--yes` argument
 */

const REQUIRED_FLAG = '--yes'

async function main(): Promise<void> {
  if (config.isProduction) {
    throw new Error('db:drop is a development command and refuses to run in production.')
  }
  if (!process.argv.includes(REQUIRED_FLAG)) {
    throw new Error(
      'Refusing to drop a database without explicit confirmation. Run "npm run db:drop -- --yes".',
    )
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
    await client.query(
      `DROP DATABASE IF EXISTS ${quoteIdentifier(databaseName)} WITH (FORCE)`,
    )
    console.log(`[db:drop] dropped "${databaseName}"`)
  } finally {
    await client.end()
  }
}

main().catch((err: unknown) => {
  console.error(`[db:drop] failed: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
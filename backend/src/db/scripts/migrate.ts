import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client } from 'pg'
import { config } from '../../config/env.ts'

/**
 * Development/database-migration runner.
 *
 * Applies pending `<N>_<name>.sql` files from `../migrations` in filename
 * order, recording each applied version in the `schema_migrations` table.
 * Each migration runs inside its own transaction, so a failed migration is
 * rolled back cleanly. An advisory lock prevents two runners racing.
 *
 * Migration files must NOT contain transaction control statements.
 */

const MIGRATIONS_LOCK_KEY = 700_001_001
const MIGRATIONS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'migrations',
)

const STEP = /^(\d+)_.+\.sql$/

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
    await client.query('SELECT pg_advisory_lock($1)', [MIGRATIONS_LOCK_KEY])

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version    TEXT        PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    const migrationFiles = (await readdir(MIGRATIONS_DIR))
      .filter((file) => STEP.test(file))
      .sort()

    const { rows } = await client.query<{ version: string }>(
      'SELECT version FROM schema_migrations',
    )
    const appliedVersions = new Set(rows.map((row) => row.version))

    let applied = 0
    for (const file of migrationFiles) {
      const version = file.replace(/\.sql$/, '')
      if (appliedVersions.has(version)) {
        console.log(`[db:migrate] skip            ${file} (already applied)`)
        continue
      }
      const sql = await readFile(path.join(MIGRATIONS_DIR, file), 'utf8')
      await client.query('BEGIN')
      try {
        await client.query(sql)
        await client.query('INSERT INTO schema_migrations (version) VALUES ($1)', [version])
        await client.query('COMMIT')
      } catch (err: unknown) {
        await client.query('ROLLBACK')
        throw new Error(
          `Migration "${file}" failed: ${err instanceof Error ? err.message : String(err)}`,
          { cause: err },
        )
      }
      applied += 1
      console.log(`[db:migrate] applied        ${file}`)
    }

    console.log(
      `[db:migrate] done — ${applied} applied, ${migrationFiles.length - applied} already applied, ${migrationFiles.length} total`,
    )
  } finally {
    try {
      await client.query('SELECT pg_advisory_unlock($1)', [MIGRATIONS_LOCK_KEY])
    } catch {
      // Lock is released automatically when the session ends.
    }
    await client.end()
  }
}

main().catch((err: unknown) => {
  console.error(`[db:migrate] failed: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
/**
 * Helpers for admin operations (CREATE/DROP DATABASE) that must connect to a
 * database that always exists (the `postgres` maintenance database) rather
 * than the target database.
 */

const DATABASE_NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/

export class InvalidDatabaseNameError extends Error {
  constructor(name: string) {
    super(
      `Invalid database name "${name}". Use a plain identifier (letters, digits, underscore).`,
    )
  }
}

export function parseDatabaseUrl(connectionString: string): {
  adminConnectionString: string
  databaseName: string
} {
  const url = new URL(connectionString)
  const requested = decodeURIComponent(url.pathname.replace(/^\//, ''))
  const databaseName = requested === '' ? 'goldrisk_dev' : requested
  validateDatabaseName(databaseName)

  url.pathname = '/postgres'
  return { adminConnectionString: url.toString(), databaseName }
}

export function validateDatabaseName(name: string): void {
  if (!DATABASE_NAME_PATTERN.test(name) || name.length > 63) {
    throw new InvalidDatabaseNameError(name)
  }
}

/** Quotes an identifier that has already passed validateDatabaseName(). */
export function quoteIdentifier(name: string): string {
  return `"${name.replace(/"/g, '""')}"`
}
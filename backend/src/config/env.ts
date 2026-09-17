import 'dotenv/config'

export type NodeEnv = 'development' | 'test' | 'production'

/** JWT durations the signer accepts: "30s", "15m", "4h", "1d". */
export type JwtExpiresIn = `${number}s` | `${number}m` | `${number}h` | `${number}d`

const NODE_ENV_VALUES: readonly NodeEnv[] = ['development', 'test', 'production']

function parseNodeEnv(value: string | undefined): NodeEnv {
  if (value === undefined || value.trim() === '') {
    return 'development'
  }
  if ((NODE_ENV_VALUES as readonly string[]).includes(value)) {
    return value as NodeEnv
  }
  throw new Error(
    `NODE_ENV must be one of: ${NODE_ENV_VALUES.join(', ')}. Received: "${String(value)}".`,
  )
}

/**
 * Parses PORT strictly. A non-integer, negative, or out-of-range value is a
 * hard startup failure — better to fail fast than to bind an unsound port.
 */
function parsePort(value: string | undefined): number {
  if (value === undefined || value.trim() === '') {
    return 3000
  }
  const port = Number(value)
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`PORT must be an integer between 1 and 65535. Received: "${String(value)}".`)
  }
  return port
}

/**
 * Parses the comma-separated CORS_ORIGIN list. A blank value falls back to
 * the Vite dev server origin so `npm run dev` (backend) and `npm run dev`
 * (frontend) can talk out of the box. Origins are trimmed and empty entries
 * dropped so "a, , b" still works.
 */
function parseCorsOrigins(value: string | undefined): string[] {
  if (value === undefined || value.trim() === '') {
    return ['http://localhost:5173']
  }
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0)
}

/**
 * Parses DATABASE_URL. A blank value yields `null` so the API can still boot
 * without a database (the health probe is intentionally DB-independent);
 * database-backed commands fail fast with a clear message instead.
 */
function parseDatabaseUrl(value: string | undefined): string | null {
  if (value === undefined || value.trim() === '') {
    return null
  }
  const trimmed = value.trim()
  if (!/^postgres(ql)?:\/\//.test(trimmed)) {
    throw new Error('DATABASE_URL must start with "postgres://" or "postgresql://".')
  }
  return trimmed
}

/**
 * Parses JWT_SECRET. Blank is allowed in development/test so the API can boot
 * without auth (auth endpoints then fail with a clear configuration error);
 * production requires a secret so auth can never silently misconfigure.
 */
function parseJwtSecret(value: string | undefined): string | null {
  if (value === undefined || value.trim() === '') {
    return null
  }
  return value.trim()
}

/**
 * Parses JWT_EXPIRES_IN as a "1d", "4h", "15m", "30s" style duration. Falls
 * back to 15 minutes so short-lived access tokens are the default.
 */
/**
 * Parses an optional Google OAuth value. Blank values yield `null` so the API
 * can boot without Google auth configured; the Google endpoints then fail
 * fast with a clear configuration error instead of misbehaving silently.
 */
function parseOptional(value: string | undefined): string | null {
  if (value === undefined || value.trim() === '') {
    return null
  }
  return value.trim()
}

/**
 * Parses FRONTEND_URL. The app redirects the browser here after a successful
 * Google OAuth exchange, so it must be the actual frontend origin — the Vite
 * dev server by default, overridden in production (e.g. https://goldrisk.vercel.app).
 */
function parseFrontendUrl(value: string | undefined): string {
  if (value === undefined || value.trim() === '') {
    return 'http://localhost:5173'
  }
  return value.trim().replace(/\/+$/, '')
}

function parseJwtExpiresIn(value: string | undefined): JwtExpiresIn {
  if (value === undefined || value.trim() === '') {
    return '15m'
  }
  const trimmed = value.trim()
  if (!/^\d+(s|m|h|d)$/.test(trimmed)) {
    throw new Error(
      'JWT_EXPIRES_IN must be a duration like "30s", "15m", "4h" or "1d". ' +
        `Received: "${String(value)}".`,
    )
  }
  return trimmed as JwtExpiresIn
}

const nodeEnv = parseNodeEnv(process.env.NODE_ENV)
const port = parsePort(process.env.PORT)
const corsOrigins = parseCorsOrigins(process.env.CORS_ORIGIN)
const databaseConnectionString = parseDatabaseUrl(process.env.DATABASE_URL)
const jwtSecret = parseJwtSecret(process.env.JWT_SECRET)
const jwtExpiresIn = parseJwtExpiresIn(process.env.JWT_EXPIRES_IN)
const googleClientId = parseOptional(process.env.GOOGLE_CLIENT_ID)
const googleClientSecret = parseOptional(process.env.GOOGLE_CLIENT_SECRET)
const googleCallbackUrl = parseOptional(process.env.GOOGLE_CALLBACK_URL)
const frontendUrl = parseFrontendUrl(process.env.FRONTEND_URL)

if (nodeEnv === 'production' && jwtSecret === null) {
  throw new Error(
    'JWT_SECRET must be configured in production. Refusing to boot without it.',
  )
}

export const config = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  isDevelopment: nodeEnv === 'development',
  port,
  corsOrigins,
  frontendUrl,
  database: {
    connectionString: databaseConnectionString,
  },
  jwt: {
    secret: jwtSecret,
    expiresIn: jwtExpiresIn,
  },
  google: {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
    callbackUrl: googleCallbackUrl,
  },
} as const

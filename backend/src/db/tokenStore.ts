import type { Pool } from 'pg'

/**
 * Revocation store for access tokens. Access tokens are short-lived JWTs; a
 * revoked token id (`jti`) is kept until the token would have expired.
 */
export interface TokenStore {
  revoke(jti: string, expiresAt: Date): Promise<void>
  isRevoked(jti: string): Promise<boolean>
}

/** PostgreSQL-backed token store backed by the `revoked_tokens` table. */
export class PostgresTokenStore implements TokenStore {
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

  async revoke(jti: string, expiresAt: Date): Promise<void> {
    const pool = this.getPool()
    await pool.query('DELETE FROM revoked_tokens WHERE expires_at <= NOW()')
    await pool.query(
      `INSERT INTO revoked_tokens (jti, expires_at)
       VALUES ($1, $2)
       ON CONFLICT (jti) DO NOTHING`,
      [jti, expiresAt],
    )
  }

  async isRevoked(jti: string): Promise<boolean> {
    const pool = this.getPool()
    const result = await pool.query('SELECT 1 FROM revoked_tokens WHERE jti = $1', [jti])
    return (result.rowCount ?? 0) > 0
  }
}
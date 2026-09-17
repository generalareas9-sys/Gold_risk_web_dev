import type { Pool } from 'pg'

export interface UserRecord {
  id: string
  email: string
  passwordHash: string | null
  name: string | null
  /** Google OAuth provider subject identifier, or null for email/password users. */
  googleId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserRepository {
  findByEmail(email: string): Promise<UserRecord | null>
  findById(id: string): Promise<UserRecord | null>
  findByGoogleId(googleId: string): Promise<UserRecord | null>
  create(email: string, passwordHash: string, name: string | null): Promise<UserRecord>
  /** Creates a Google-authenticated user with no password hash. */
  createGoogleUser(email: string, name: string | null, googleId: string): Promise<UserRecord>
  /** Links a verified Google identity to an existing account (account linking). */
  setGoogleId(id: string, googleId: string): Promise<UserRecord>
}

interface UserRow {
  id: string
  email: string
  passwordHash: string | null
  name: string | null
  googleId: string | null
  createdAt: Date
  updatedAt: Date
}

const USER_COLUMNS = `
  id, email, password_hash AS "passwordHash", name,
  google_id AS "googleId", created_at AS "createdAt", updated_at AS "updatedAt"
`

/** PostgreSQL-backed users repository using the shared pool. */
export class PostgresUserRepository implements UserRepository {
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

  async findByEmail(email: string): Promise<UserRecord | null> {
    const pool = this.getPool()
    const result = await pool.query<UserRow>(
      `SELECT ${USER_COLUMNS}
         FROM users
        WHERE LOWER(email) = LOWER($1)`,
      [email],
    )
    const row = result.rows[0]
    return row === undefined ? null : (row satisfies UserRecord)
  }

  async findById(id: string): Promise<UserRecord | null> {
    const pool = this.getPool()
    const result = await pool.query<UserRow>(
      `SELECT ${USER_COLUMNS}
         FROM users
        WHERE id = $1`,
      [id],
    )
    const row = result.rows[0]
    return row === undefined ? null : (row satisfies UserRecord)
  }

  async findByGoogleId(googleId: string): Promise<UserRecord | null> {
    const pool = this.getPool()
    const result = await pool.query<UserRow>(
      `SELECT ${USER_COLUMNS}
         FROM users
        WHERE google_id = $1`,
      [googleId],
    )
    const row = result.rows[0]
    return row === undefined ? null : (row satisfies UserRecord)
  }

  async create(email: string, passwordHash: string, name: string | null): Promise<UserRecord> {
    const pool = this.getPool()
    const result = await pool.query<UserRow>(
      `INSERT INTO users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING ${USER_COLUMNS}`,
      [email, passwordHash, name],
    )
    const row = result.rows[0]
    if (row === undefined) {
      throw new Error('Creating a user returned no row.')
    }
    return row satisfies UserRecord
  }

  async createGoogleUser(
    email: string,
    name: string | null,
    googleId: string,
  ): Promise<UserRecord> {
    const pool = this.getPool()
    const result = await pool.query<UserRow>(
      `INSERT INTO users (email, password_hash, name, google_id)
       VALUES ($1, NULL, $2, $3)
       RETURNING ${USER_COLUMNS}`,
      [email, name, googleId],
    )
    const row = result.rows[0]
    if (row === undefined) {
      throw new Error('Creating a Google user returned no row.')
    }
    return row satisfies UserRecord
  }

  async setGoogleId(id: string, googleId: string): Promise<UserRecord> {
    const pool = this.getPool()
    const result = await pool.query<UserRow>(
      `UPDATE users
          SET google_id = $2
        WHERE id = $1
        RETURNING ${USER_COLUMNS}`,
      [id, googleId],
    )
    const row = result.rows[0]
    if (row === undefined) {
      throw new Error('Updating a user returned no row.')
    }
    return row satisfies UserRecord
  }
}
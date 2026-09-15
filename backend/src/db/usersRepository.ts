import type { Pool } from 'pg'

export interface UserRecord {
  id: string
  email: string
  passwordHash: string | null
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserRepository {
  findByEmail(email: string): Promise<UserRecord | null>
  findById(id: string): Promise<UserRecord | null>
  create(email: string, passwordHash: string, name: string | null): Promise<UserRecord>
}

interface UserRow {
  id: string
  email: string
  passwordHash: string | null
  name: string | null
  createdAt: Date
  updatedAt: Date
}

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
      `SELECT id, email, password_hash AS "passwordHash", name,
              created_at AS "createdAt", updated_at AS "updatedAt"
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
      `SELECT id, email, password_hash AS "passwordHash", name,
              created_at AS "createdAt", updated_at AS "updatedAt"
         FROM users
        WHERE id = $1`,
      [id],
    )
    const row = result.rows[0]
    return row === undefined ? null : (row satisfies UserRecord)
  }

  async create(email: string, passwordHash: string, name: string | null): Promise<UserRecord> {
    const pool = this.getPool()
    const result = await pool.query<UserRow>(
      `INSERT INTO users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING id, email, password_hash AS "passwordHash", name,
                 created_at AS "createdAt", updated_at AS "updatedAt"`,
      [email, passwordHash, name],
    )
    const row = result.rows[0]
    if (row === undefined) {
      throw new Error('Creating a user returned no row.')
    }
    return row satisfies UserRecord
  }
}
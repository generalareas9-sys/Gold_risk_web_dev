# GoldRisk Database

This is the Phase 7 PostgreSQL database foundation for the GoldRisk backend.
It deliberately provides **plumbing only** — no authentication, no calculation
history API yet.

> **Phase 9:** the `trading_accounts` and `account_specifications` tables now
> back the authenticated account-management API. See
> [accounts.md](./accounts.md) for the API, ownership rules, and the reference
> Exness Standard Cent configuration.
>
> **Phase 10:** the `calculation_history` table now backs the authenticated
> calculation-history API. See [calculations.md](./calculations.md).

## Requirements

* PostgreSQL 13+ (developed and verified against PostgreSQL 18)
* Node.js >= 22.12
* The backend `DATABASE_URL` (below)

The project uses **`pg` (node-postgres)** with a plain connection `Pool`.
There is **no ORM** — the schema is owned by SQL migration files, and the
application talks to PostgreSQL with parameterized queries. This keeps the
dependency surface small and the SQL explicit.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | for all DB commands | `postgres://user:password@host:5432/goldrisk_dev` |

`DATABASE_URL` is **optional** at API boot — the `/api/health` probe stays
database-independent. Database commands
(`npm run db:check`, `db:create`, `db:migrate`, `db:seed`) fail fast with a
clear message when it is missing.

Copy `backend/.env.example` to `backend/.env` and fill in your local value:

```
DATABASE_URL=postgres://goldrisk:YOUR_LOCAL_PASSWORD@localhost:5432/goldrisk_dev
```

Never commit real credentials. `backend/.env` is git-ignored; only
`.env.example` (placeholders) is committed.

## Quick start

```bash
# 1. Create the development database (uses the database name from DATABASE_URL,
#    defaulting to `goldrisk_dev` when the URL has no path segment).
npm run db:create

# 2. Apply all pending migrations.
npm run db:migrate

# 3. Load the safe development seed (dev user + Exness Standard Cent account).
npm run db:seed

# 4. Smoke-test Node.js → PostgreSQL connectivity.
npm run db:check
```

Or run all in one step:

```bash
npm run db:setup   # db:create → db:migrate → db:seed
```

To start from scratch:

```bash
npm run db:drop -- --yes && npm run db:setup
```

`db:drop` is destructive, requires an explicit `--yes`, and refuses to run in
`NODE_ENV=production`. `db:create` and `db:drop` connect to the always-present
`postgres` maintenance database using the credentials from `DATABASE_URL`.

## Schema / migrations

Migrations are plain SQL files in `backend/src/db/migrations/`:

```
001_initial_schema.sql
002_auth_revoked_tokens.sql
```

The runner (`npm run db:migrate`, `backend/src/db/scripts/migrate.ts`):

* applies files in filename order (`<N>_<name>.sql`),
* records each applied version in the `schema_migrations` table,
* wraps every migration in its own transaction (a failed migration rolls back),
* takes a `pg_advisory_lock` so two runners cannot race.

Rules for writing a new migration:

1. Name it `NNN_short_description.sql` with a monotonically increasing `NNN`.
2. Use only DDL/DML that can run inside a transaction (no transaction-control
   statements, no `CREATE INDEX CONCURRENTLY`).

### Tables

| Table | Purpose |
| --- | --- |
| `users` | Future authentication accounts. `email` (case-insensitive unique), `password_hash` placeholder, display `name`, timestamps. |
| `trading_accounts` | Trading accounts a user owns. Broker, account type, base `currency`, `usd_conversion` (units of account currency per 1 USD), `balance`, `is_active`/`is_default`. |
| `account_specifications` | Per-account, per-symbol calculator settings: `contract_size`, `minimum_lot`, `maximum_lot`, `lot_step`. |
| `calculation_history` | Saved calculations. `inputs`/`outputs` JSONB snapshots reproduce any saved calculation exactly. |
| `revoked_tokens` | Server-side logout: access-token `jti` values stay listed until the token's `exp` passes. |
| `schema_migrations` | Migration bookkeeping (created by the runner). |

### Relationships

```
users ──┬── trading_accounts ── account_specifications
        └── calculation_history
```

| Foreign key | On delete |
| --- | --- |
| `trading_accounts.user_id → users.id` | `CASCADE` |
| `account_specifications.trading_account_id → trading_accounts.id` | `CASCADE` |
| `calculation_history.user_id → users.id` | `CASCADE` |
| `calculation_history.trading_account_id → trading_accounts.id` | `SET NULL` |

### Data integrity highlights

* `BIGINT` identity primary keys everywhere.
* `NUMERIC(20, 8)` for money/price/lot values.
* `TIMESTAMPTZ` timestamps; `updated_at` maintained by the `set_updated_at()`
  trigger.
* Checks: `balance >= 0`, `usd_conversion > 0`, lot `minimum > 0`,
  `maximum >= minimum`, `lot_step > 0`, `position IN ('BUY','SELL')`,
  `entry_price > 0`, plausible `email`.
* Partial unique index enforces **at most one default account per user**.
* Store values are **data, not schema**: the Exness Standard Cent numbers below
  live in the seed, so any broker/account/symbol can be added later without a
  schema change.

## Seed data

`npm run db:seed` (`backend/src/db/scripts/seed.ts`) inserts **development-only
data** marked clearly as such — no real credentials are ever used:

* **User** — `dev@goldrisk.dev` / `Development User`, with the documented
  **development-only** password `dev-password-123` (bcrypt-hashed). This is a
  public dev credential, never a real one; existing pre-auth users get the
  hash backfilled.
* **Trading account** — Exness Standard Cent, currency `USC`,
  `usd_conversion = 100`, starting balance `1220.30` (the reference case from
  the calculator tests).
* **Specification** — `XAUUSDc`, contract size `1`, min lot `0.01`,
  max lot `200`, lot step `0.01`.

The seed is idempotent (existing rows are skipped), so re-running it is safe.
Recreate the database to reseed from scratch.

## Connection check

`npm run db:check` runs `SELECT current_database(), current_user, version()`
through the shared `Pool` and prints a safe summary. It never prints the
connection string or credentials, and it exits non-zero when PostgreSQL is
unreachable. The shared probe lives in `backend/src/db/status.ts`
(`checkDatabaseConnection`) and can later back an authenticated/developer-only
readiness endpoint.

## Key files

```
backend/src/config/env.ts                  DATABASE_URL parsing
backend/src/db/pool.ts                     shared pg.Pool (+ getRequiredPool)
backend/src/db/status.ts                   safe connectivity probe
backend/src/db/admin.ts                    db:create/db:drop helpers
backend/src/db/usersRepository.ts          Phase 8 authentication users (see accounts.md)
backend/src/db/accountsRepository.ts       Phase 9 trading-account CRUD (ownership-aware)
backend/src/db/specificationsRepository.ts Phase 9 per-account specifications (ownership-aware)
backend/src/db/calculationsRepository.ts   Phase 10 calculation-history CRUD (ownership-aware)
backend/src/db/migrations/001_initial_schema.sql
backend/src/db/scripts/migrate.ts          npm run db:migrate
backend/src/db/scripts/seed.ts             npm run db:seed
backend/src/db/scripts/checkConnection.ts  npm run db:check
backend/src/db/scripts/createDatabase.ts   npm run db:create
backend/src/db/scripts/dropDatabase.ts     npm run db:drop -- --yes
```
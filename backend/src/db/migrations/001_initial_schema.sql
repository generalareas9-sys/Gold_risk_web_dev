-- 001_initial_schema.sql
-- GoldRisk database foundation (Phase 7).
--
-- Extensible baseline for:
--   * users
--   * multiple trading accounts per user
--   * account-specific trading specifications (one or more symbols per account)
--   * future calculation history
--
-- Conventions:
--   * Surrogate keys are BIGINT IDENTITY columns.
--   * Money/price/lot values are NUMERIC(20,8) — 12 integer digits, 8 decimals.
--   * Timestamps are TIMESTAMPTZ and default to NOW(); `updated_at` is kept
--     current by the set_updated_at() trigger.
--   * Enumerations are TEXT columns with CHECK constraints (easy to extend).
--
-- NOTE: migration files must NOT contain transaction control; the runner
-- wraps each file in BEGIN/COMMIT automatically.

-- ---------------------------------------------------------------------------
-- Shared trigger: keep updated_at in sync on UPDATE.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- users
-- ---------------------------------------------------------------------------

CREATE TABLE users (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         TEXT        NOT NULL,
  -- Placeholder for future authentication (e.g. bcrypt hash). Nullable until
  -- an auth phase defines a production hashing scheme.
  password_hash TEXT,
  name          TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT users_email_not_blank CHECK (email <> ''),
  CONSTRAINT users_email_looks_like_email CHECK (email LIKE '%_@_%')
);

-- Case-insensitive uniqueness: "User@ex.com" and "user@ex.com" are the same.
CREATE UNIQUE INDEX users_email_lower_uidx ON users (LOWER(email));

CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------------
-- trading_accounts
-- ---------------------------------------------------------------------------

CREATE TABLE trading_accounts (
  id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id        BIGINT         NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  account_name   TEXT           NOT NULL,
  broker         TEXT           NOT NULL,
  -- e.g. 'Standard Cent', 'Standard', 'Raw Spread'. Free text so future
  -- brokers are not constrained by an enum.
  account_type   TEXT           NOT NULL,
  -- Account base currency, e.g. 'USD' or 'USC' (Exness cent accounts).
  -- Free text: a CHECK for ISO codes would exclude broker-specific codes.
  currency       TEXT           NOT NULL,
  -- Units of account currency equal to 1 USD. Used to display dollar values
  -- (100 for USC on the reference Exness Standard Cent account, 1 for USD).
  usd_conversion NUMERIC(20, 8) NOT NULL,
  -- Live (or seeded) account balance in the account currency.
  balance        NUMERIC(20, 8) NOT NULL DEFAULT 0,
  is_active      BOOLEAN        NOT NULL DEFAULT TRUE,
  is_default     BOOLEAN        NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  CONSTRAINT trading_accounts_user_name_unique UNIQUE (user_id, account_name),
  CONSTRAINT trading_accounts_balance_nonnegative CHECK (balance >= 0),
  CONSTRAINT trading_accounts_usd_conversion_positive CHECK (usd_conversion > 0)
);

-- At most one default account per user.
CREATE UNIQUE INDEX trading_accounts_one_default_per_user_uidx
  ON trading_accounts (user_id)
  WHERE is_default;

CREATE TRIGGER trading_accounts_set_updated_at
  BEFORE UPDATE ON trading_accounts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------------
-- account_specifications
-- ---------------------------------------------------------------------------

-- Trading specifications scoped to one account + instrument symbol. An account
-- may carry several symbols (XAUUSD, XAUUSDc, …), each with its own contract
-- size, lot grid, and so on.
CREATE TABLE account_specifications (
  id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  trading_account_id BIGINT         NOT NULL REFERENCES trading_accounts (id) ON DELETE CASCADE,
  symbol             TEXT           NOT NULL,
  contract_size      NUMERIC(20, 8) NOT NULL,
  minimum_lot        NUMERIC(20, 8) NOT NULL,
  maximum_lot        NUMERIC(20, 8) NOT NULL,
  lot_step           NUMERIC(20, 8) NOT NULL,
  created_at         TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  CONSTRAINT account_specifications_account_symbol_unique
    UNIQUE (trading_account_id, symbol),
  CONSTRAINT account_specifications_contract_size_positive CHECK (contract_size > 0),
  CONSTRAINT account_specifications_minimum_lot_positive CHECK (minimum_lot > 0),
  CONSTRAINT account_specifications_maximum_lot_positive CHECK (maximum_lot > 0),
  CONSTRAINT account_specifications_min_le_max
    CHECK (minimum_lot <= maximum_lot),
  CONSTRAINT account_specifications_lot_step_positive CHECK (lot_step > 0),
  CONSTRAINT account_specifications_lot_step_consistent
    CHECK (lot_step <= maximum_lot)
);

CREATE TRIGGER account_specifications_set_updated_at
  BEFORE UPDATE ON account_specifications
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------------------------
-- calculation_history
-- ---------------------------------------------------------------------------

-- Stored calculations for future history/reporting (no API in Phase 7).
-- `inputs`/`outputs` are JSONB snapshots of exactly what the calculator
-- received and produced, so a saved calculation can always be reproduced.
-- Scalar columns (symbol, position, entry_price) exist for cheap list/filter
-- queries; the trading account is referenced with a soft delete so history
-- survives account removal.
CREATE TABLE calculation_history (
  id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id             BIGINT         NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  trading_account_id  BIGINT         REFERENCES trading_accounts (id) ON DELETE SET NULL,
  symbol              TEXT           NOT NULL,
  position            TEXT           NOT NULL,
  entry_price         NUMERIC(20, 8) NOT NULL,
  inputs              JSONB          NOT NULL,
  outputs             JSONB          NOT NULL,
  created_at          TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  CONSTRAINT calculation_history_position_check
    CHECK (position IN ('BUY', 'SELL')),
  CONSTRAINT calculation_history_entry_price_positive CHECK (entry_price > 0)
);

CREATE INDEX calculation_history_user_created_idx
  ON calculation_history (user_id, created_at DESC);
-- 002_auth_revoked_tokens.sql
-- GoldRisk authentication foundation (Phase 8).
--
-- Server-side revocation for short-lived access tokens: logging out stores the
-- token's unique id (`jti`) until it would have expired, and the authentication
-- middleware rejects tokens present in this table.

CREATE TABLE revoked_tokens (
  jti        TEXT        PRIMARY KEY,
  -- The access token's `exp` claim (unix seconds) converted to a timestamp;
  -- rows become safe to delete once this passes.
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX revoked_tokens_expires_at_idx ON revoked_tokens (expires_at);
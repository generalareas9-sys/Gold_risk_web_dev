-- 003_google_oauth.sql
-- GoldRisk Google OAuth (Phase 12).
--
-- Adds a provider identifier so a Google-authenticated account can be
-- recognised on subsequent logins without guessing from sanitized email
-- case. Google works as an additional authentication factor *on top of* the
-- existing email/password flow:
--
--   * password accounts have google_id NULL;
--   * Google-only accounts keep password_hash NULL (login with a password is
--     impossible for them, which is enforced by the auth service);
--   * an account whose verified Google email matches an existing email/password
--     account is securely linked by setting google_id, never duplicated.
--
-- The unique index is partial so accounts without a Google identity are never
-- affected by the uniqueness constraint.

ALTER TABLE users
  ADD COLUMN google_id TEXT;

CREATE UNIQUE INDEX users_google_id_uidx ON users (google_id)
  WHERE google_id IS NOT NULL;
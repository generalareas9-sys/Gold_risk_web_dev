# GoldRisk — Deployment Guide

This repository contains **two applications** plus a legacy frontend:

| Path         | Status              | Deployed to | Notes                                                        |
| ------------ | ------------------- | ----------- | ------------------------------------------------------------ |
| `frontend/`  | **Active frontend** | Vercel      | The React + Vite SPA that users see.                         |
| `backend/`   | **Active backend**  | Render      | The Express + PostgreSQL API.                                |
| root `src/`, root `index.html`, root `vite.config.ts`, root `package.json` | **Legacy** | *not deployed* | Early "Phase 4" static preview. Do **not** deploy this. |

> **The active frontend is `frontend/`.** All Vercel configuration must use
> `frontend` as the project Root Directory. The root-level app is kept for
> history only and is never built or deployed.

No secrets belong in this repository. Set every credential in the Vercel /
Render dashboards.

---

## 1. Frontend — Vercel

1. **Import** the repository into Vercel.
2. **Project Settings:**
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (auto-detected)
   - **Install Command:** `npm ci` (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. **Environment Variables** (Production, and Preview if desired):
   - `VITE_API_BASE_URL=https://goldrisk.onrender.com/api`
4. **SPA deep links.** `frontend/vercel.json` contains the rewrite
   `"/(.*)" → "/index.html"`, so routes such as `/calculator`, `/login`,
   `/register`, `/accounts`, `/history`, and the OAuth return path
   `/auth/google/callback` resolve on a hard refresh. Keep this file in the
   `frontend` root directory.
5. **Node version.** `frontend/package.json` declares
   `engines.node >=22.12.0`; Vercel honors it. If your project overrides the
   version, set it to Node 22 in Project Settings.

### Frontend checklist

- [ ] Root Directory = `frontend`
- [ ] `VITE_API_BASE_URL=https://goldrisk.onrender.com/api`
- [ ] `frontend/vercel.json` present (SPA rewrite)
- [ ] Node 22+

---

## 2. Backend — Render

Create a **Web Service** from this repository.

1. **Settings:**
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`  (`node --enable-source-maps dist/server.js`)
   - **Health Check Path:** `/api/health`
2. **Node version.** `backend/package.json` declares
   `engines.node >=22.12.0`. Render honors `engines.node`; to be explicit you
   may also set the environment variable `NODE_VERSION=22.12.0`.
3. **Environment Variables** (set in the Render dashboard):

   | Variable            | Value                                                        |
   | ------------------- | ------------------------------------------------------------ |
   | `NODE_ENV`          | `production`                                                 |
   | `PORT`              | provided by Render (do not hardcode)                         |
   | `DATABASE_URL`      | Render PostgreSQL connection string                          |
   | `DATABASE_SSL`      | `true` (managed PostgreSQL requires TLS)                     |
   | `DATABASE_SSL_REJECT_UNAUTHORIZED` | `true` (default; leave as-is)                  |
   | `JWT_SECRET`        | long random hex, e.g. `openssl rand -hex 48` (boot fails without it) |
   | `CORS_ORIGIN`       | `https://goldrisk.vercel.app`                                |
   | `FRONTEND_URL`      | `https://goldrisk.vercel.app`                                |
   | `GOOGLE_CLIENT_ID`  | Google Cloud OAuth client ID                                 |
   | `GOOGLE_CLIENT_SECRET` | Google Cloud OAuth client secret                          |
   | `GOOGLE_CALLBACK_URL` | `https://goldrisk.onrender.com/api/auth/google/callback`   |

   `DATABASE_SSL` is opt-in so local, non-TLS PostgreSQL keeps working;
   certificate verification stays **on** unless you deliberately set
   `DATABASE_SSL_REJECT_UNAUTHORIZED=false`. See `backend/.env.example`.

### Backend checklist

- [ ] Root Directory = `backend`
- [ ] Build `npm ci && npm run build`, Start `npm start`
- [ ] Health Check Path = `/api/health`
- [ ] Node 22+ (`engines.node` / `NODE_VERSION`)
- [ ] All variables above set; no secrets committed
- [ ] Google redirect URI registered (see `GOOGLE_OAUTH.md`)

---

## 3. Database — PostgreSQL

1. Create a **Render PostgreSQL** instance (same region as the web service is
   ideal). Copy its connection string into the backend's `DATABASE_URL`.
2. **Run migrations against production** from a machine with the production
   `DATABASE_URL` (or a Render one-off shell in `backend/`):

   ```bash
   cd backend
   npm run db:migrate
   ```

   Migrations are ordered, transactional, and idempotent
   (`001_initial_schema.sql`, `002_auth_revoked_tokens.sql`,
   `003_google_oauth.sql`).

3. **NEVER run `npm run db:seed` in production.** The seed inserts a public
   development login (`dev@goldrisk.dev` / `dev-password-123`) and is guarded:
   it refuses to run when `NODE_ENV=production`. It exists for local
   development only.

### Database checklist

- [ ] `DATABASE_URL` set on Render
- [ ] `DATABASE_SSL=true`
- [ ] `npm run db:migrate` run against the production database
- [ ] `db:seed` **never** run in production

---

## 4. Post-deploy verification

1. `GET https://goldrisk.onrender.com/api/health` →
   `{"success":true,"message":"GoldRisk API is running"}`.
2. Load `https://goldrisk.vercel.app/` and hard-refresh `/calculator`
   (logged out should redirect to `/login`) to confirm the SPA rewrite.
3. Register / log in with email + password.
4. Log in with Google (see `GOOGLE_OAUTH.md`); confirm the same `users` row is
   reused and that logout revokes the token.

## 5. Google OAuth

Client IDs, redirect URIs, and the account-linking rules are documented in
[`GOOGLE_OAUTH.md`](./GOOGLE_OAUTH.md).

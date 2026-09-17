# Google OAuth — Setup & Configuration

GoldRisk authentication is Google OAuth 2.0 (Authorization Code flow),
implemented in the **backend** and initiated from the frontend's login and
register pages. The Google client secret never reaches the browser; the
backend exchanges the code, verifies the ID token with
[`google-auth-library`](https://github.com/googleapis/google-auth-library-nodejs),
and hands the browser a normal GoldRisk JWT through the URL hash.

## How the flow works

1. Visitor clicks **Continue with Google** / **Sign up with Google** on
   `/login` or `/register`.
2. Frontend navigates to `GET {API_BASE_URL}/auth/google` (full page load).
   Backend routes: `backend/src/routes/auth.ts` → `googleInitiate`.
3. Backend signs a short-lived (10 min) `state` JWT with the existing
   `JWT_SECRET` and 302-redirects to Google's consent screen
   (`prompt=select_account`, scopes `openid email profile`).
4. Google redirects back to `GET /api/auth/google/callback?code=…&state=…`.
   Backend validates the `state`, exchanges the code, and verifies the ID
   token (`email_verified` must be `true`).
5. Backend finds/links/creates the user (see below) and issues the **same**
   GoldRisk JWT used by email/password logins.
6. Backend redirects to
   `{FRONTEND_URL}/auth/google/callback#token=<jwt>`.
7. `GoogleCallbackPage` parses the hash, fetches `/auth/me`, persists the
   session, strips the token with `history.replaceState`, and navigates to
   the calculator.

Account linking (backend/src/auth/authService.ts → `googleLogin`):

- Match first by `google_id`, then by the **verified** email.
- If a password account with that email exists, the `google_id` is set on it
  (no duplicate account is ever created).
- Otherwise a new account is created with `google_id` and a `NULL`
  password hash. Google-only accounts cannot use a password and vice versa.

If the backend has no `GOOGLE_CLIENT_*` values, `/auth/google` returns
`503 Google sign-in is not configured…` instead of pretending to work.

## 1. Google Cloud Console setup

1. Go to <https://console.cloud.google.com> and create (or select) a project.
2. **APIs & Services → OAuth consent screen.**
   - User type: *External* (or *Internal* if you only need your own account).
   - Add your Google account(s) as **Test users** while the consent screen is
     in "Testing" mode.
   - Add scopes: `openid`, `email`, `profile` (all are
     non-sensitive/read-only and require no verification).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID.**
   - Application type: **Web application**.
   - **Authorized JavaScript origins** (where the frontend runs):
     - `http://localhost:5173` (local Vite dev server)
     - `https://goldrisk.vercel.app` (production)
   - **Authorized redirect URIs** (where Google sends the browser back):
     - `http://localhost:3000/api/auth/google/callback`
     - `https://goldrisk.onrender.com/api/auth/google/callback`
   - Save and copy the **Client ID** and **Client secret**.

> The "Authorized redirect URIs" must exactly match `GOOGLE_CALLBACK_URL`
> (path and trailing slash included) or Google rejects the redirect.

## 2. Environment variables (backend only)

No frontend variables are needed — the frontend reuses `VITE_API_BASE_URL`.
Copy `backend/.env.example` to `backend/.env` and fill in:

| Variable                | Local development                          | Production                               |
| ----------------------- | ------------------------------------------ | ---------------------------------------- |
| `GOOGLE_CLIENT_ID`      | your client ID (public)                    | same                                     |
| `GOOGLE_CLIENT_SECRET`  | your client secret (**never commit**)      | same                                     |
| `GOOGLE_CALLBACK_URL`   | `http://localhost:3000/api/auth/google/callback` | `https://goldrisk.onrender.com/api/auth/google/callback` |
| `FRONTEND_URL`          | `http://localhost:5173`                    | `https://goldrisk.vercel.app`            |

`JWT_SECRET` is reused to sign the OAuth `state`; it must be present in every
environment. `FRONTEND_URL` is the origin the backend redirects the browser
to after a successful exchange.

## 3. Running locally

1. Start PostgreSQL and the backend:
   `cd backend && cp .env.example .env` (fill in), then `npm run dev`.
2. Start the frontend: `cd frontend && cp .env.example .env.local` (set
   `VITE_API_BASE_URL=http://localhost:3000/api`), then `npm run dev`.
3. Open `http://localhost:5173/login`, click **Continue with Google**, and
   sign in with the test account. You should land on the calculator.

## 4. Verifying in production

1. Make sure the production backend `.env` has the four variables above and
   the matching redirect URI is registered in the Console.
2. Go to `https://goldrisk.vercel.app/login` and sign in with Google.
3. Confirm: email/password login and registration still work, the account is
   shared with Google (same row in `users`, no duplicates), and **logout**
   still revokes the JWT.

## Files

- `backend/src/auth/googleService.ts` — state JWT + `OAuth2Client` verification
- `backend/src/auth/authService.ts` — `googleLogin` (find/link/create)
- `backend/src/controllers/authController.ts` — `googleInitiate` / `googleCallback`
- `backend/src/routes/auth.ts` — `GET /auth/google`, `GET /auth/google/callback`
- `backend/src/db/migrations/003_google_oauth.sql` — `users.google_id` + partial unique index
- `backend/src/auth/google.test.ts` — OAuth flow tests (fake provider)
- `frontend/src/pages/GoogleCallbackPage.tsx` — token hash → session
- `frontend/src/services/googleAuth.ts` — `getGoogleAuthUrl()`
- `frontend/src/auth/googleCallback.ts` + `applySession.ts` — parse hash, load user
import { getCurrentUser, type AuthUser } from '../services/authApi'

/**
 * Loads the AuthUser for a freshly-issued access token (used after Google
 * OAuth, where the backend hands the token back through the URL hash).
 * Kept in its own module so the callback page stays small and the flow is
 * unit-testable.
 */

export type ApplySessionResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string }

export async function applySessionForToken(token: string): Promise<ApplySessionResult> {
  const res = await getCurrentUser(token)
  if (!res.ok) {
    return { ok: false, error: res.error.message }
  }
  return { ok: true, user: res.data.data.user }
}
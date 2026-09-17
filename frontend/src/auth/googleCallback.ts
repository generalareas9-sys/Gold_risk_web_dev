/**
 * Parses the URL hash the backend leaves on the OAuth callback page after a
 * successful Google exchange:  `/auth/google/callback#token=<jwt>`.
 *
 * Extracted as a pure function so the parsing rules are unit-testable without
 * a browser environment. The token travels in the hash (never sent to any
 * server), and the callback page strips it with `history.replaceState` after
 * persisting it.
 */

export type ParseGoogleCallbackResult =
  | { ok: true; token: string }
  | { ok: false; error: string }

export function parseGoogleCallbackHash(hash: string): ParseGoogleCallbackResult {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  if (raw === '') {
    return { ok: false, error: 'No authentication result was returned by Google sign-in.' }
  }

  const params = new URLSearchParams(raw)

  const error = params.get('error')
  if (error !== null && error !== '') {
    return { ok: false, error }
  }

  const token = params.get('token')
  if (token === null || token === '') {
    return { ok: false, error: 'Google sign-in did not return an authentication token.' }
  }

  return { ok: true, token }
}
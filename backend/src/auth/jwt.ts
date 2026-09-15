import { randomUUID } from 'node:crypto'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { config } from '../config/env.ts'

/**
 * Access-token claims attached to authenticated requests. The `sub` claim is
 * the user id, `jti` is the unique token id used for server-side revocation,
 * and `exp` (unix seconds) bounds how long a revocation must be remembered.
 */
export interface AuthUser {
  id: string
  email: string
  jti: string
  exp: number
}

function requireSecret(): string {
  if (config.jwt.secret === null) {
    throw new Error(
      'JWT_SECRET is not configured. Add JWT_SECRET to the backend `.env` file ' +
        '(see `.env.example`).',
    )
  }
  return config.jwt.secret
}

/** Signs a short-lived access token for the given user. */
export function signAccessToken(user: { id: string; email: string }): string {
  const secret = requireSecret()
  return jwt.sign(
    {
      email: user.email,
    },
    secret,
    {
      subject: user.id,
      jwtid: randomUUID(),
      expiresIn: config.jwt.expiresIn,
    },
  )
}

/**
 * Verifies and returns the access-token claims. Throws for expired, malformed
 * or improperly signed tokens (jsonwebtoken errors).
 */
export function verifyAccessToken(token: string): AuthUser {
  const secret = requireSecret()
  const payload = jwt.verify(token, secret) as JwtPayload

  if (
    typeof payload.sub !== 'string' ||
    typeof payload.email !== 'string' ||
    typeof payload.jti !== 'string' ||
    typeof payload.exp !== 'number'
  ) {
    throw new Error('Token payload is malformed.')
  }

  return {
    id: payload.sub,
    email: payload.email,
    jti: payload.jti,
    exp: payload.exp,
  }
}

/** Builds a signed token with explicit claims (used by tests for expired tokens). */
export function signTestToken(
  claims: { id: string; email: string; jti: string; iat: number; exp: number },
): string {
  return jwt.sign(claims, requireSecret())
}
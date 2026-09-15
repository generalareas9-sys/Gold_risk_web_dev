import type { NextFunction, Request, Response } from 'express'
import type { TokenStore } from '../db/tokenStore.ts'
import { verifyAccessToken, type AuthUser } from '../auth/jwt.ts'
import { HttpError } from '../utils/HttpError.ts'

const BEARER_PREFIX = 'Bearer '

/**
 * Express middleware factory. Verifies the `Authorization: Bearer <token>`
 * header, rejects revoked tokens, and attaches the verified claims to
 * `req.user`. Invalid/expired tokens get a 401; store failures bubble up to
 * the central error handler (500).
 */
export function createAuthenticate(tokenStore: TokenStore) {
  return async function authenticate(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const header = req.headers.authorization
    const token =
      header !== undefined && header.startsWith(BEARER_PREFIX)
        ? header.slice(BEARER_PREFIX.length).trim()
        : undefined

    if (token === undefined || token === '') {
      next(new HttpError(401, 'Authentication required.'))
      return
    }

    let claims: AuthUser
    try {
      claims = verifyAccessToken(token)
    } catch {
      next(new HttpError(401, 'Invalid or expired token.'))
      return
    }

    try {
      if (await tokenStore.isRevoked(claims.jti)) {
        next(new HttpError(401, 'Token has been revoked.'))
        return
      }
    } catch (err: unknown) {
      next(err instanceof Error ? err : new Error(String(err)))
      return
    }

    req.user = claims
    next()
  }
}
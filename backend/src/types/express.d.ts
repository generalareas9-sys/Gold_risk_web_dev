import type { AuthUser } from '../auth/jwt.ts'

declare global {
  namespace Express {
    interface Request {
      /** Set by the authenticate middleware from the verified access token. */
      user?: AuthUser
    }
  }
}

export {}
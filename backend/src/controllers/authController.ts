import type { Request, Response } from 'express'
import type { UserRepository } from '../db/usersRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import type { AuthUser } from '../auth/jwt.ts'
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../auth/authService.ts'
import { HttpError } from '../utils/HttpError.ts'

export interface AuthController {
  register(req: Request, res: Response): Promise<void>
  login(req: Request, res: Response): Promise<void>
  me(req: Request, res: Response): Promise<void>
  logout(req: Request, res: Response): Promise<void>
}

/** The authenticate middleware always sets req.user, but this keeps handlers honest. */
function requireAuthUser(req: Request): AuthUser {
  if (req.user === undefined) {
    throw new HttpError(401, 'Authentication required.')
  }
  return req.user
}

export function createAuthController(
  userRepository: UserRepository,
  tokenStore: TokenStore,
): AuthController {
  return {
    async register(req: Request, res: Response): Promise<void> {
      const user = await registerUser(userRepository, req.body)
      res.status(201).json({ success: true, data: { user } })
    },

    async login(req: Request, res: Response): Promise<void> {
      const { token, user } = await loginUser(userRepository, req.body)
      res.json({ success: true, data: { token, user } })
    },

    async me(req: Request, res: Response): Promise<void> {
      const auth = requireAuthUser(req)
      const user = await getCurrentUser(userRepository, auth.id)
      res.json({ success: true, data: { user } })
    },

    async logout(req: Request, res: Response): Promise<void> {
      const auth = requireAuthUser(req)
      await logoutUser(tokenStore, auth)
      res.json({ success: true, message: 'Logged out successfully.' })
    },
  }
}
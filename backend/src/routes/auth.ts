import { Router } from 'express'
import type { UserRepository } from '../db/usersRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import { createAuthController } from '../controllers/authController.ts'
import { createAuthenticate } from '../middleware/auth.ts'

export function createAuthRouter(
  userRepository: UserRepository,
  tokenStore: TokenStore,
): Router {
  const router = Router()
  const controller = createAuthController(userRepository, tokenStore)
  const authenticate = createAuthenticate(tokenStore)

  router.post('/register', controller.register)
  router.post('/login', controller.login)
  router.get('/me', authenticate, controller.me)
  router.post('/logout', authenticate, controller.logout)

  return router
}
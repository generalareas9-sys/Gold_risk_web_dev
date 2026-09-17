import { Router } from 'express'
import type { UserRepository } from '../db/usersRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import type { GoogleProviderService } from '../auth/googleService.ts'
import { createAuthController } from '../controllers/authController.ts'
import { createAuthenticate } from '../middleware/auth.ts'

export interface AuthRouterDependencies {
  userRepository: UserRepository
  tokenStore: TokenStore
  googleProvider: GoogleProviderService | null
  jwtSecret: string
  frontendUrl: string
}

export function createAuthRouter(dependencies: AuthRouterDependencies): Router {
  const { userRepository, tokenStore } = dependencies
  const router = Router()
  const controller = createAuthController(userRepository, tokenStore, dependencies)
  const authenticate = createAuthenticate(tokenStore)

  router.post('/register', controller.register)
  router.post('/login', controller.login)
  router.get('/google', controller.googleInitiate)
  router.get('/google/callback', controller.googleCallback)
  router.get('/me', authenticate, controller.me)
  router.post('/logout', authenticate, controller.logout)

  return router
}
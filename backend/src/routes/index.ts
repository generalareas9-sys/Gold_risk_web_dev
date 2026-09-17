import { Router } from 'express'
import { healthRouter } from './health.ts'
import { createAuthRouter, type AuthRouterDependencies } from './auth.ts'
import { createAccountsRouter } from './accounts.ts'
import { createCalculationsRouter } from './calculations.ts'
import type { UserRepository } from '../db/usersRepository.ts'
import type { AccountRepository } from '../db/accountsRepository.ts'
import type { SpecificationRepository } from '../db/specificationsRepository.ts'
import type { CalculationRepository } from '../db/calculationsRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import type { GoogleProviderService } from '../auth/googleService.ts'

export interface ApiRouterDependencies {
  userRepository: UserRepository
  tokenStore: TokenStore
  accountsRepository: AccountRepository
  specificationsRepository: SpecificationRepository
  calculationsRepository: CalculationRepository
  googleProvider: GoogleProviderService | null
  jwtSecret: string
  frontendUrl: string
}

export function createApiRouter(dependencies: ApiRouterDependencies): Router {
  const apiRouter = Router()
  const authDependencies: AuthRouterDependencies = {
    userRepository: dependencies.userRepository,
    tokenStore: dependencies.tokenStore,
    googleProvider: dependencies.googleProvider,
    jwtSecret: dependencies.jwtSecret,
    frontendUrl: dependencies.frontendUrl,
  }

  apiRouter.use('/health', healthRouter)
  apiRouter.use('/auth', createAuthRouter(authDependencies))
  apiRouter.use(
    '/accounts',
    createAccountsRouter(
      dependencies.accountsRepository,
      dependencies.specificationsRepository,
      dependencies.tokenStore,
    ),
  )
  apiRouter.use(
    '/calculations',
    createCalculationsRouter(
      dependencies.calculationsRepository,
      dependencies.accountsRepository,
      dependencies.tokenStore,
    ),
  )

  return apiRouter
}
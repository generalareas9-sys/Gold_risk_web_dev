import { Router } from 'express'
import { healthRouter } from './health.ts'
import { createAuthRouter } from './auth.ts'
import { createAccountsRouter } from './accounts.ts'
import { createCalculationsRouter } from './calculations.ts'
import type { UserRepository } from '../db/usersRepository.ts'
import type { AccountRepository } from '../db/accountsRepository.ts'
import type { SpecificationRepository } from '../db/specificationsRepository.ts'
import type { CalculationRepository } from '../db/calculationsRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'

export function createApiRouter(
  userRepository: UserRepository,
  tokenStore: TokenStore,
  accountsRepository: AccountRepository,
  specificationsRepository: SpecificationRepository,
  calculationsRepository: CalculationRepository,
): Router {
  const apiRouter = Router()

  apiRouter.use('/health', healthRouter)
  apiRouter.use('/auth', createAuthRouter(userRepository, tokenStore))
  apiRouter.use(
    '/accounts',
    createAccountsRouter(accountsRepository, specificationsRepository, tokenStore),
  )
  apiRouter.use(
    '/calculations',
    createCalculationsRouter(calculationsRepository, accountsRepository, tokenStore),
  )

  return apiRouter
}

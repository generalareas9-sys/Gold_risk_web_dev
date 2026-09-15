import { Router } from 'express'
import type { CalculationRepository } from '../db/calculationsRepository.ts'
import type { AccountRepository } from '../db/accountsRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import { createAuthenticate } from '../middleware/auth.ts'
import { createCalculationsController } from '../controllers/calculationsController.ts'

export function createCalculationsRouter(
  calculationsRepository: CalculationRepository,
  accountsRepository: AccountRepository,
  tokenStore: TokenStore,
): Router {
  const router = Router()
  const authenticate = createAuthenticate(tokenStore)
  const controller = createCalculationsController(calculationsRepository, accountsRepository)

  // Every calculation endpoint requires authentication; per-user data is
  // scoped by the claims in the token, never by anything the client sends.
  router.use(authenticate)

  router.get('/', controller.listCalculations)
  router.post('/', controller.createCalculation)
  router.get('/:id', controller.getCalculation)
  router.delete('/:id', controller.deleteCalculation)

  return router
}
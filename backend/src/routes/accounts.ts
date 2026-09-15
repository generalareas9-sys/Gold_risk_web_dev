import { Router } from 'express'
import type { AccountRepository } from '../db/accountsRepository.ts'
import type { SpecificationRepository } from '../db/specificationsRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import { createAuthenticate } from '../middleware/auth.ts'
import { createAccountsController } from '../controllers/accountsController.ts'

export function createAccountsRouter(
  accountsRepository: AccountRepository,
  specificationsRepository: SpecificationRepository,
  tokenStore: TokenStore,
): Router {
  const router = Router()
  const authenticate = createAuthenticate(tokenStore)
  const controller = createAccountsController(accountsRepository, specificationsRepository)

  // Every account endpoint requires authentication; per-user data is scoped
  // by the claims in the token, never by anything the client sends.
  router.use(authenticate)

  router.get('/', controller.listAccounts)
  router.post('/', controller.createAccount)
  router.get('/:id', controller.getAccount)
  router.patch('/:id', controller.updateAccount)
  router.delete('/:id', controller.deleteAccount)
  router.post('/:id/specifications', controller.createSpecification)
  router.get('/:id/specifications', controller.listSpecifications)
  router.patch('/:id/specifications/:specId', controller.updateSpecification)
  router.delete('/:id/specifications/:specId', controller.deleteSpecification)

  return router
}
import type { Request, Response } from 'express'
import type { AccountRepository } from '../db/accountsRepository.ts'
import type { SpecificationRepository } from '../db/specificationsRepository.ts'
import type { AuthUser } from '../auth/jwt.ts'
import { HttpError } from '../utils/HttpError.ts'
import * as accountService from '../accounts/accountService.ts'

export interface AccountsController {
  listAccounts(req: Request, res: Response): Promise<void>
  createAccount(req: Request, res: Response): Promise<void>
  getAccount(req: Request, res: Response): Promise<void>
  updateAccount(req: Request, res: Response): Promise<void>
  deleteAccount(req: Request, res: Response): Promise<void>
  createSpecification(req: Request, res: Response): Promise<void>
  listSpecifications(req: Request, res: Response): Promise<void>
  updateSpecification(req: Request, res: Response): Promise<void>
  deleteSpecification(req: Request, res: Response): Promise<void>
}

/** The authenticate middleware always sets req.user, but this keeps handlers honest. */
function requireAuthUser(req: Request): AuthUser {
  if (req.user === undefined) {
    throw new HttpError(401, 'Authentication required.')
  }
  return req.user
}

/**
 * Extracts a single string value from the Express 5 params object, which
 * types each value as `string | string[] | undefined`.  Route definitions
 * guarantee single-segment values, so we return the first element of an array
 * when needed.  Returns an empty string when the param is missing entirely
 * (an impossible case in the matched routes, but it satisfies strict TS).
 */
function param(req: Request, key: string): string {
  const value = req.params[key]
  return Array.isArray(value) ? value[0] ?? '' : (value ?? '')
}

export function createAccountsController(
  accountsRepository: AccountRepository,
  specificationsRepository: SpecificationRepository,
): AccountsController {
  return {
    async listAccounts(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const accounts = await accountService.listAccounts(accountsRepository, user.id)
      res.json({ success: true, data: { accounts } })
    },

    async createAccount(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const account = await accountService.createAccount(
        accountsRepository,
        specificationsRepository,
        user.id,
        req.body,
      )
      res.status(201).json({ success: true, data: { account } })
    },

    async getAccount(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const { account, specifications } = await accountService.getAccountDetail(
        accountsRepository,
        specificationsRepository,
        user.id,
        param(req, 'id'),
      )
      res.json({ success: true, data: { account, specifications } })
    },

    async updateAccount(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const account = await accountService.updateAccount(
        accountsRepository,
        user.id,
        param(req, 'id'),
        req.body,
      )
      res.json({ success: true, data: { account } })
    },

    async deleteAccount(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      await accountService.deleteAccount(accountsRepository, user.id, param(req, 'id'))
      res.json({ success: true, message: 'Account deleted successfully.' })
    },

    async createSpecification(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const specification = await accountService.createSpecification(
        accountsRepository,
        specificationsRepository,
        user.id,
        param(req, 'id'),
        req.body,
      )
      res.status(201).json({ success: true, data: { specification } })
    },

    async listSpecifications(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const specifications = await accountService.listSpecifications(
        accountsRepository,
        specificationsRepository,
        user.id,
        param(req, 'id'),
      )
      res.json({ success: true, data: { specifications } })
    },

    async updateSpecification(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const specification = await accountService.updateSpecification(
        accountsRepository,
        specificationsRepository,
        user.id,
        param(req, 'id'),
        param(req, 'specId'),
        req.body,
      )
      res.json({ success: true, data: { specification } })
    },

    async deleteSpecification(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      await accountService.deleteSpecification(
        accountsRepository,
        specificationsRepository,
        user.id,
        param(req, 'id'),
        param(req, 'specId'),
      )
      res.json({ success: true, message: 'Specification deleted successfully.' })
    },
  }
}
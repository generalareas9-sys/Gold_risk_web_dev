import type { Request, Response } from 'express'
import type { CalculationRepository } from '../db/calculationsRepository.ts'
import type { AccountRepository } from '../db/accountsRepository.ts'
import type { AuthUser } from '../auth/jwt.ts'
import { HttpError } from '../utils/HttpError.ts'
import * as calculationService from '../calculations/calculationService.ts'

export interface CalculationsController {
  listCalculations(req: Request, res: Response): Promise<void>
  createCalculation(req: Request, res: Response): Promise<void>
  getCalculation(req: Request, res: Response): Promise<void>
  deleteCalculation(req: Request, res: Response): Promise<void>
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

export function createCalculationsController(
  calculationsRepository: CalculationRepository,
  accountsRepository: AccountRepository,
): CalculationsController {
  return {
    async listCalculations(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const calculations = await calculationService.listCalculations(
        calculationsRepository,
        user.id,
      )
      res.json({ success: true, data: { calculations } })
    },

    async createCalculation(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const calculation = await calculationService.createCalculation(
        calculationsRepository,
        accountsRepository,
        user.id,
        req.body,
      )
      res.status(201).json({ success: true, data: { calculation } })
    },

    async getCalculation(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      const calculation = await calculationService.getCalculation(
        calculationsRepository,
        user.id,
        param(req, 'id'),
      )
      res.json({ success: true, data: { calculation } })
    },

    async deleteCalculation(req: Request, res: Response): Promise<void> {
      const user = requireAuthUser(req)
      await calculationService.deleteCalculation(
        calculationsRepository,
        user.id,
        param(req, 'id'),
      )
      res.json({ success: true, message: 'Calculation deleted successfully.' })
    },
  }
}
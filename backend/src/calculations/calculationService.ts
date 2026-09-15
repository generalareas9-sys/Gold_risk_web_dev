import type {
  CalculationRecord,
  CalculationRepository,
} from '../db/calculationsRepository.ts'
import type { AccountRepository } from '../db/accountsRepository.ts'
import { HttpError } from '../utils/HttpError.ts'
import { hasFieldErrors } from '../utils/validation.ts'
import { asRecord } from '../utils/validation.ts'
import { validateCalculationCreate } from './calculationValidation.ts'

/**
 * Calculation-history domain logic (Phase 10). Functions are plain services
 * that take repositories, matching `auth/authService.ts` and the Phase 9
 * `accountService.ts`. Ownership derives from the authenticated `userId`
 * (never the body); the optional `tradingAccountId` is verified against the
 * same user's accounts before the calculation is stored.
 */

export interface PublicCalculation {
  id: string
  symbol: string
  position: 'BUY' | 'SELL'
  entryPrice: number
  tradingAccountId: string | null
  inputs: unknown
  outputs: unknown
  createdAt: string
}

export function toPublicCalculation(record: CalculationRecord): PublicCalculation {
  return {
    id: record.id,
    symbol: record.symbol,
    position: record.position,
    entryPrice: record.entryPrice,
    tradingAccountId: record.tradingAccountId,
    inputs: record.inputs,
    outputs: record.outputs,
    createdAt: record.createdAt.toISOString(),
  }
}

function throwValidationError(errors: Record<string, string>): never {
  throw new HttpError(400, 'Validation failed.', errors)
}

/** Saves a calculation for the authenticated user. */
export async function createCalculation(
  calculationsRepository: CalculationRepository,
  accountsRepository: AccountRepository,
  userId: string,
  body: unknown,
): Promise<PublicCalculation> {
  const errors = validateCalculationCreate(body)
  if (hasFieldErrors(errors)) {
    throwValidationError(errors)
  }

  const record = asRecord(body)
  const tradingAccountId = record.tradingAccountId

  if (tradingAccountId !== undefined && tradingAccountId !== null) {
    const account = await accountsRepository.findById(userId, String(tradingAccountId))
    if (account === null) {
      // Same response for "never existed" and "belongs to someone else" so the
      // API does not leak whether another user's account exists.
      throw new HttpError(404, 'Account not found.')
    }
  }

  const position = record.position === 'SELL' ? ('SELL' as const) : ('BUY' as const)
  const created = await calculationsRepository.create({
    userId,
    tradingAccountId:
      typeof tradingAccountId === 'string' ? tradingAccountId.trim() : null,
    symbol: String(record.symbol).trim(),
    position,
    entryPrice: Number(record.entryPrice),
    inputs: record.inputs,
    outputs: record.outputs,
  })
  return toPublicCalculation(created)
}

/** Lists the authenticated user's saved calculations, newest first. */
export async function listCalculations(
  calculationsRepository: CalculationRepository,
  userId: string,
): Promise<PublicCalculation[]> {
  const records = await calculationsRepository.list(userId)
  return records.map(toPublicCalculation)
}

/** Returns one owned calculation, or 404 when it does not exist / is not theirs. */
export async function getCalculation(
  calculationsRepository: CalculationRepository,
  userId: string,
  calculationId: string,
): Promise<PublicCalculation> {
  const record = await calculationsRepository.findById(userId, calculationId)
  if (record === null) {
    throw new HttpError(404, 'Calculation not found.')
  }
  return toPublicCalculation(record)
}

/** Deletes an owned calculation. Throws 404 when nothing was deleted. */
export async function deleteCalculation(
  calculationsRepository: CalculationRepository,
  userId: string,
  calculationId: string,
): Promise<void> {
  const removed = await calculationsRepository.remove(userId, calculationId)
  if (!removed) {
    throw new HttpError(404, 'Calculation not found.')
  }
}
import type { AccountRepository, AccountRecord, AccountUpdateChanges } from '../db/accountsRepository.ts'
import type {
  SpecificationRecord,
  SpecificationRepository,
  SpecificationUpdateChanges,
} from '../db/specificationsRepository.ts'
import { HttpError } from '../utils/HttpError.ts'
import { hasFieldErrors } from '../utils/validation.ts'
import { asRecord } from '../utils/validation.ts'
import {
  validateAccountCreate,
  validateAccountUpdate,
  validateSpecificationCreate,
  validateSpecificationUpdate,
} from '../utils/accountValidation.ts'

/**
 * Trading-account domain logic (Phase 9). Functions are plain services that
 * take repositories — the same shape as `auth/authService.ts`. All ownership
 * checks derive the `userId` from the authenticated request (never the body),
 * so no caller can reach another user's account or specification.
 */

export interface PublicAccount {
  id: string
  accountName: string
  broker: string
  accountType: string
  currency: string
  usdConversion: number
  balance: number
  isActive: boolean
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface PublicSpecification {
  id: string
  tradingAccountId: string
  symbol: string
  contractSize: number
  minimumLot: number
  maximumLot: number
  lotStep: number
  createdAt: string
  updatedAt: string
}

/** The account response for the reference Exness Standard Cent account. */
export interface AccountDetail {
  account: PublicAccount
  specifications: PublicSpecification[]
}

export function toPublicAccount(record: AccountRecord): PublicAccount {
  return {
    id: record.id,
    accountName: record.accountName,
    broker: record.broker,
    accountType: record.accountType,
    currency: record.currency,
    usdConversion: record.usdConversion,
    balance: record.balance,
    isActive: record.isActive,
    isDefault: record.isDefault,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  }
}

export function toPublicSpecification(record: SpecificationRecord): PublicSpecification {
  return {
    id: record.id,
    tradingAccountId: record.tradingAccountId,
    symbol: record.symbol,
    contractSize: record.contractSize,
    minimumLot: record.minimumLot,
    maximumLot: record.maximumLot,
    lotStep: record.lotStep,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  }
}

/** Converts an already-validated numeric field (number or numeric string) to a number. */
function toNumber(record: Record<string, unknown>, field: string): number {
  const value = record[field]
  return typeof value === 'number' ? value : Number(value)
}

function throwValidationError(errors: Record<string, string>): never {
  throw new HttpError(400, 'Validation failed.', errors)
}

async function assertAccountOwned(
  accountsRepository: AccountRepository,
  userId: string,
  accountId: string,
): Promise<void> {
  const account = await accountsRepository.findById(userId, accountId)
  if (account === null) {
    // Same response for "never existed" and "belongs to someone else" so the
    // API does not leak whether another user's account exists.
    throw new HttpError(404, 'Account not found.')
  }
}

/** Creates a trading account for the authenticated user. */
export async function createAccount(
  accountsRepository: AccountRepository,
  userId: string,
  body: unknown,
): Promise<PublicAccount> {
  const errors = validateAccountCreate(body)
  if (hasFieldErrors(errors)) {
    throwValidationError(errors)
  }

  const record = asRecord(body)
  const accountName = String(record.accountName).trim()

  const existing = await accountsRepository.list(userId)
  if (existing.some((a) => a.accountName.toLowerCase() === accountName.toLowerCase())) {
    throw new HttpError(409, 'An account with this name already exists.')
  }

  const recordCreated = await accountsRepository.create({
    userId,
    accountName,
    broker: String(record.broker).trim(),
    accountType: String(record.accountType).trim(),
    currency: String(record.currency).trim(),
    usdConversion: toNumber(record, 'usdConversion'),
    balance: toNumber(record, 'balance') || 0,
    isActive: record.isActive === undefined ? true : Boolean(record.isActive),
    isDefault: record.isDefault === undefined ? false : Boolean(record.isDefault),
  })
  return toPublicAccount(recordCreated)
}

/** Lists the authenticated user's trading accounts. */
export async function listAccounts(
  accountsRepository: AccountRepository,
  userId: string,
): Promise<PublicAccount[]> {
  const records = await accountsRepository.list(userId)
  return records.map(toPublicAccount)
}

/** Returns one owned account with its specifications. */
export async function getAccountDetail(
  accountsRepository: AccountRepository,
  specificationsRepository: SpecificationRepository,
  userId: string,
  accountId: string,
): Promise<AccountDetail> {
  const record = await accountsRepository.findById(userId, accountId)
  if (record === null) {
    throw new HttpError(404, 'Account not found.')
  }
  const specifications = await specificationsRepository.list(userId, accountId)
  return {
    account: toPublicAccount(record),
    specifications: specifications.map(toPublicSpecification),
  }
}

/** Updates an owned account. Supports changing the default account safely. */
export async function updateAccount(
  accountsRepository: AccountRepository,
  userId: string,
  accountId: string,
  body: unknown,
): Promise<PublicAccount> {
  const errors = validateAccountUpdate(body)
  if (hasFieldErrors(errors)) {
    throwValidationError(errors)
  }

  const record = asRecord(body)
  const changes: AccountUpdateChanges = {}
  if (record.accountName !== undefined) {
    changes.accountName = String(record.accountName).trim()
  }
  if (record.broker !== undefined) {
    changes.broker = String(record.broker).trim()
  }
  if (record.accountType !== undefined) {
    changes.accountType = String(record.accountType).trim()
  }
  if (record.currency !== undefined) {
    changes.currency = String(record.currency).trim()
  }
  if (record.usdConversion !== undefined) {
    changes.usdConversion = toNumber(record, 'usdConversion')
  }
  if (record.balance !== undefined) {
    changes.balance = toNumber(record, 'balance')
  }
  if (record.isActive !== undefined) {
    changes.isActive = Boolean(record.isActive)
  }
  if (record.isDefault !== undefined) {
    changes.isDefault = Boolean(record.isDefault)
  }

  if (Object.keys(changes).length === 0) {
    // Nothing to change but still require ownership to return the account.
    const current = await accountsRepository.findById(userId, accountId)
    if (current === null) {
      throw new HttpError(404, 'Account not found.')
    }
    return toPublicAccount(current)
  }

  if (changes.accountName !== undefined) {
    const owned = await accountsRepository.list(userId)
    if (
      owned.some(
        (a) => a.id !== accountId && a.accountName.toLowerCase() === changes.accountName!.toLowerCase(),
      )
    ) {
      throw new HttpError(409, 'An account with this name already exists.')
    }
  }

  const updated = await accountsRepository.update(userId, accountId, changes)
  if (updated === null) {
    throw new HttpError(404, 'Account not found.')
  }
  return toPublicAccount(updated)
}

/** Deletes an owned trading account (cascades to its specifications). */
export async function deleteAccount(
  accountsRepository: AccountRepository,
  userId: string,
  accountId: string,
): Promise<void> {
  const removed = await accountsRepository.remove(userId, accountId)
  if (!removed) {
    throw new HttpError(404, 'Account not found.')
  }
}

/** Adds a specification to an owned account. */
export async function createSpecification(
  accountsRepository: AccountRepository,
  specificationsRepository: SpecificationRepository,
  userId: string,
  accountId: string,
  body: unknown,
): Promise<PublicSpecification> {
  const errors = validateSpecificationCreate(body)
  if (hasFieldErrors(errors)) {
    throwValidationError(errors)
  }
  await assertAccountOwned(accountsRepository, userId, accountId)

  const record = asRecord(body)
  const input = {
    symbol: String(record.symbol).trim(),
    contractSize: toNumber(record, 'contractSize'),
    minimumLot: toNumber(record, 'minimumLot'),
    maximumLot: toNumber(record, 'maximumLot'),
    lotStep: toNumber(record, 'lotStep'),
  }

  const existing = await specificationsRepository.list(userId, accountId)
  if (existing.some((s) => s.symbol.toLowerCase() === input.symbol.toLowerCase())) {
    throw new HttpError(409, 'An account with this symbol already exists.')
  }

  const created = await specificationsRepository.create(userId, accountId, input)
  if (created === null) {
    throw new HttpError(404, 'Account not found.')
  }
  return toPublicSpecification(created)
}

/** Lists the specifications of an owned account (404 when the account is not owned). */
export async function listSpecifications(
  accountsRepository: AccountRepository,
  specificationsRepository: SpecificationRepository,
  userId: string,
  accountId: string,
): Promise<PublicSpecification[]> {
  await assertAccountOwned(accountsRepository, userId, accountId)
  const records = await specificationsRepository.list(userId, accountId)
  return records.map(toPublicSpecification)
}

/** Updates a specification in an owned account, re-checking cross-field lot rules. */
export async function updateSpecification(
  accountsRepository: AccountRepository,
  specificationsRepository: SpecificationRepository,
  userId: string,
  accountId: string,
  specId: string,
  body: unknown,
): Promise<PublicSpecification> {
  const errors = validateSpecificationUpdate(body)
  if (hasFieldErrors(errors)) {
    throwValidationError(errors)
  }
  await assertAccountOwned(accountsRepository, userId, accountId)

  const current = await specificationsRepository.findById(userId, accountId, specId)
  if (current === null) {
    throw new HttpError(404, 'Specification not found.')
  }

  const record = asRecord(body)
  const changes: SpecificationUpdateChanges = {}
  if (record.symbol !== undefined) {
    changes.symbol = String(record.symbol).trim()
  }
  if (record.contractSize !== undefined) {
    changes.contractSize = toNumber(record, 'contractSize')
  }
  if (record.minimumLot !== undefined) {
    changes.minimumLot = toNumber(record, 'minimumLot')
  }
  if (record.maximumLot !== undefined) {
    changes.maximumLot = toNumber(record, 'maximumLot')
  }
  if (record.lotStep !== undefined) {
    changes.lotStep = toNumber(record, 'lotStep')
  }

  if (Object.keys(changes).length === 0) {
    return toPublicSpecification(current)
  }

  // Re-validate the merged specification so cross-field constraints (min lot
  // vs max lot, lot step vs max lot) still hold after the change.
  const merged = { ...current, ...changes }
  const mergedErrors = validateSpecificationCreate(merged)
  if (hasFieldErrors(mergedErrors)) {
    throwValidationError(mergedErrors)
  }

  if (changes.symbol !== undefined) {
    const existing = await specificationsRepository.list(userId, accountId)
    if (
      existing.some(
        (s) => s.id !== specId && s.symbol.toLowerCase() === changes.symbol!.toLowerCase(),
      )
    ) {
      throw new HttpError(409, 'An account with this symbol already exists.')
    }
  }

  const updated = await specificationsRepository.update(userId, accountId, specId, changes)
  if (updated === null) {
    throw new HttpError(404, 'Specification not found.')
  }
  return toPublicSpecification(updated)
}

/** Deletes a specification from an owned account. */
export async function deleteSpecification(
  accountsRepository: AccountRepository,
  specificationsRepository: SpecificationRepository,
  userId: string,
  accountId: string,
  specId: string,
): Promise<void> {
  await assertAccountOwned(accountsRepository, userId, accountId)
  const removed = await specificationsRepository.remove(userId, accountId, specId)
  if (!removed) {
    throw new HttpError(404, 'Specification not found.')
  }
}
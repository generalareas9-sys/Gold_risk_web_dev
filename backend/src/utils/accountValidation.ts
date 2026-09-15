import type { FieldErrors } from './validation.ts'
import { asRecord } from './validation.ts'

/**
 * Trading-account and specification validation (Phase 9). Each validator
 * returns a `{ field: message }` map that is empty when the value is valid,
 * following the same convention as `utils/validation.ts`. Field errors are
 * keyed by the camelCase request-body name so the client can render them
 * per field. When a field is `null` or the wrong type it is treated as an
 * error, never silently skipped.
 */

const MAX_ACCOUNT_NAME_LENGTH = 100
const MAX_BROKER_LENGTH = 100
const MAX_ACCOUNT_TYPE_LENGTH = 100
const MAX_CURRENCY_LENGTH = 10
const MAX_SYMBOL_LENGTH = 20

/**
 * Accepts a JSON number or a numeric string and returns it as a finite JS
 * number. Rejects anything else (including NaN/Infinity) with null.
 */
function parseFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }
  return null
}

function validateRequiredString(
  record: Record<string, unknown>,
  field: string,
  label: string,
  maxLength: number,
  errors: FieldErrors,
): void {
  const value = record[field]
  if (typeof value !== 'string' || value.trim() === '') {
    errors[field] = `${label} is required.`
    return
  }
  const trimmed = value.trim()
  if (trimmed.length > maxLength) {
    errors[field] = `${label} must be at most ${maxLength} characters.`
  }
}

function validateOptionalString(
  record: Record<string, unknown>,
  field: string,
  label: string,
  maxLength: number,
  errors: FieldErrors,
): void {
  const value = record[field]
  if (value === undefined) {
    return
  }
  if (typeof value !== 'string' || value.trim() === '') {
    errors[field] = `${label} must be a non-empty string.`
    return
  }
  const trimmed = value.trim()
  if (trimmed.length > maxLength) {
    errors[field] = `${label} must be at most ${maxLength} characters.`
  }
}

function validateOptionalBoolean(
  record: Record<string, unknown>,
  field: string,
  label: string,
  errors: FieldErrors,
): void {
  const value = record[field]
  if (value !== undefined && typeof value !== 'boolean') {
    errors[field] = `${label} must be a boolean.`
  }
}

function validatePositiveNumber(
  record: Record<string, unknown>,
  field: string,
  label: string,
  errors: FieldErrors,
): void {
  const value = parseFiniteNumber(record[field])
  if (value === null) {
    errors[field] = `${label} must be a number.`
    return
  }
  if (value <= 0) {
    errors[field] = `${label} must be greater than zero.`
  }
}

function validateUsdConversion(record: Record<string, unknown>, errors: FieldErrors): void {
  const value = parseFiniteNumber(record.usdConversion)
  if (value === null) {
    errors.usdConversion = 'USD conversion must be a number.'
    return
  }
  if (value <= 0) {
    errors.usdConversion = 'USD conversion must be greater than zero.'
  }
}

function validateBalance(record: Record<string, unknown>, errors: FieldErrors): void {
  const value = parseFiniteNumber(record.balance)
  if (value === null) {
    errors.balance = 'Balance must be a number.'
    return
  }
  if (value < 0) {
    errors.balance = 'Balance must be a non-negative number.'
  }
}

/** Validates the full account-shape (all required fields must be present). */
export function validateAccountCreate(body: unknown): FieldErrors {
  const record = asRecord(body)
  const errors: FieldErrors = {}

  validateRequiredString(record, 'accountName', 'Account name', MAX_ACCOUNT_NAME_LENGTH, errors)
  validateRequiredString(record, 'broker', 'Broker', MAX_BROKER_LENGTH, errors)
  validateRequiredString(record, 'accountType', 'Account type', MAX_ACCOUNT_TYPE_LENGTH, errors)
  validateRequiredString(record, 'currency', 'Currency', MAX_CURRENCY_LENGTH, errors)
  validateUsdConversion(record, errors)
  validateBalance(record, errors)
  validateOptionalBoolean(record, 'isActive', 'Active status', errors)
  validateOptionalBoolean(record, 'isDefault', 'Default status', errors)

  return errors
}

/** Validates a partial account update — only the fields present in the body. */
export function validateAccountUpdate(body: unknown): FieldErrors {
  const record = asRecord(body)
  const errors: FieldErrors = {}

  if (record.accountName !== undefined) {
    validateRequiredString(record, 'accountName', 'Account name', MAX_ACCOUNT_NAME_LENGTH, errors)
  }
  if (record.broker !== undefined) {
    validateRequiredString(record, 'broker', 'Broker', MAX_BROKER_LENGTH, errors)
  }
  if (record.accountType !== undefined) {
    validateRequiredString(record, 'accountType', 'Account type', MAX_ACCOUNT_TYPE_LENGTH, errors)
  }
  if (record.currency !== undefined) {
    validateOptionalString(record, 'currency', 'Currency', MAX_CURRENCY_LENGTH, errors)
  }
  if (record.usdConversion !== undefined) {
    validateUsdConversion(record, errors)
  }
  if (record.balance !== undefined) {
    validateBalance(record, errors)
  }
  if (record.isActive !== undefined) {
    validateOptionalBoolean(record, 'isActive', 'Active status', errors)
  }
  if (record.isDefault !== undefined) {
    validateOptionalBoolean(record, 'isDefault', 'Default status', errors)
  }

  return errors
}

function validateCrossFieldLotConstraints(record: Record<string, unknown>, errors: FieldErrors): void {
  const minimum = parseFiniteNumber(record.minimumLot)
  const maximum = parseFiniteNumber(record.maximumLot)
  if (minimum !== null && maximum !== null) {
    if (errors.minimumLot === undefined && errors.maximumLot === undefined && minimum > maximum) {
      errors.maximumLot = 'Maximum lot must be at least the minimum lot.'
    }
  }
  const step = parseFiniteNumber(record.lotStep)
  if (step !== null && maximum !== null) {
    if (errors.lotStep === undefined && errors.maximumLot === undefined && step > maximum) {
      errors.lotStep = 'Lot step must not exceed the maximum lot.'
    }
  }
}

/** Validates the full specification shape, including cross-field lot rules. */
export function validateSpecificationCreate(body: unknown): FieldErrors {
  const record = asRecord(body)
  const errors: FieldErrors = {}

  validateRequiredString(record, 'symbol', 'Symbol', MAX_SYMBOL_LENGTH, errors)
  validatePositiveNumber(record, 'contractSize', 'Contract size', errors)
  validatePositiveNumber(record, 'minimumLot', 'Minimum lot', errors)
  validatePositiveNumber(record, 'maximumLot', 'Maximum lot', errors)
  validatePositiveNumber(record, 'lotStep', 'Lot step', errors)
  validateCrossFieldLotConstraints(record, errors)

  return errors
}

/** Validates a partial specification update — only the fields present in the body. */
export function validateSpecificationUpdate(body: unknown): FieldErrors {
  const record = asRecord(body)
  const errors: FieldErrors = {}

  if (record.symbol !== undefined) {
    validateRequiredString(record, 'symbol', 'Symbol', MAX_SYMBOL_LENGTH, errors)
  }
  if (record.contractSize !== undefined) {
    validatePositiveNumber(record, 'contractSize', 'Contract size', errors)
  }
  if (record.minimumLot !== undefined) {
    validatePositiveNumber(record, 'minimumLot', 'Minimum lot', errors)
  }
  if (record.maximumLot !== undefined) {
    validatePositiveNumber(record, 'maximumLot', 'Maximum lot', errors)
  }
  if (record.lotStep !== undefined) {
    validatePositiveNumber(record, 'lotStep', 'Lot step', errors)
  }

  return errors
}
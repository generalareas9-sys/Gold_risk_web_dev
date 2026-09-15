import { asRecord } from '../utils/validation.ts'

/**
 * Calculation-history validation (Phase 10). Each validator returns a
 * `{ field: message }` map that is empty when the value is valid, following
 * the same convention as `utils/validation.ts`. `inputs`/`outputs` are opaque
 * JSONB snapshots of the calculator request/response — they only have to be
 * JSON objects (or null), never re-explained by the API. The `symbol`,
 * `position`, and `entryPrice` scalars cover the cheap list/filter columns
 * copied from the calculator request.
 */

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

/** True for a JSON object that is not an array and not null. */
function isJsonObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function validateSymbol(record: Record<string, unknown>, errors: Record<string, string>): void {
  const value = record.symbol
  if (typeof value !== 'string' || value.trim() === '') {
    errors.symbol = 'Symbol is required.'
    return
  }
  const trimmed = value.trim()
  if (trimmed.length > MAX_SYMBOL_LENGTH) {
    errors.symbol = `Symbol must be at most ${MAX_SYMBOL_LENGTH} characters.`
  }
}

function validatePosition(record: Record<string, unknown>, errors: Record<string, string>): void {
  const value = record.position
  if (value !== 'BUY' && value !== 'SELL') {
    errors.position = 'Position must be either "BUY" or "SELL".'
  }
}

function validateEntryPrice(record: Record<string, unknown>, errors: Record<string, string>): void {
  const value = parseFiniteNumber(record.entryPrice)
  if (value === null) {
    errors.entryPrice = 'Entry price must be a number.'
    return
  }
  if (value <= 0) {
    errors.entryPrice = 'Entry price must be greater than zero.'
  }
}

function validateTradingAccountId(
  record: Record<string, unknown>,
  errors: Record<string, string>,
): void {
  const value = record.tradingAccountId
  if (value !== undefined && value !== null && (typeof value !== 'string' || value.trim() === '')) {
    errors.tradingAccountId = 'Trading account id must be a non-empty string.'
  }
}

function validateSnapshot(
  record: Record<string, unknown>,
  field: 'inputs' | 'outputs',
  errors: Record<string, string>,
): void {
  const value = record[field]
  if (value === null || value === undefined) {
    errors[field] = 'Inputs and outputs must be provided.'
    return
  }
  if (!isJsonObject(value)) {
    errors[field] = 'Inputs and outputs must be JSON objects.'
  }
}

/** Validates a calculation save request body. Returns {} when valid. */
export function validateCalculationCreate(body: unknown): Record<string, string> {
  const record = asRecord(body)
  const errors: Record<string, string> = {}

  validateSymbol(record, errors)
  validatePosition(record, errors)
  validateEntryPrice(record, errors)
  validateTradingAccountId(record, errors)
  validateSnapshot(record, 'inputs', errors)
  validateSnapshot(record, 'outputs', errors)

  return errors
}
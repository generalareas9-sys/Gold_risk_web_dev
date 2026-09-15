/**
 * Small, dependency-free request-validation helpers. Each validator returns
 * a map of `{ field: human-readable message }` (empty when valid) so the
 * error handler can surface precise problems to the client.
 */

export type FieldErrors = Record<string, string>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LENGTH = 254
const MIN_PASSWORD_LENGTH = 8
// bcrypt truncates past 72 bytes — reject early for a clear message.
const MAX_PASSWORD_LENGTH = 72
const MAX_NAME_LENGTH = 100

export function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null
    ? (value as Record<string, unknown>)
    : {}
}

function readStringField(body: Record<string, unknown>, field: string): unknown {
  return body[field]
}

function validateEmailField(value: unknown, errors: FieldErrors): void {
  if (typeof value !== 'string' || value.trim() === '') {
    errors.email = 'Email is required.'
    return
  }
  const email = value.trim()
  if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email must be at most ${MAX_EMAIL_LENGTH} characters.`
    return
  }
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Email is not valid.'
  }
}

function validatePasswordField(value: unknown, errors: FieldErrors): void {
  if (value === undefined || value === null || value === '') {
    errors.password = 'Password is required.'
    return
  }
  if (typeof value !== 'string') {
    errors.password = 'Password must be a string.'
    return
  }
  if (value.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    return
  }
  if (value.length > MAX_PASSWORD_LENGTH) {
    errors.password = `Password must be at most ${MAX_PASSWORD_LENGTH} characters.`
  }
}

function validateNameField(value: unknown, errors: FieldErrors): void {
  if (value === undefined || value === null || value === '') {
    return
  }
  if (typeof value !== 'string') {
    errors.name = 'Name must be a string.'
    return
  }
  if (value.length > MAX_NAME_LENGTH) {
    errors.name = `Name must be at most ${MAX_NAME_LENGTH} characters.`
  }
}

/** Validates a registration request body. Returns {} when valid. */
export function validateRegistration(body: unknown): FieldErrors {
  const record = asRecord(body)
  const errors: FieldErrors = {}

  validateEmailField(readStringField(record, 'email'), errors)
  validatePasswordField(readStringField(record, 'password'), errors)
  validateNameField(readStringField(record, 'name'), errors)

  return errors
}

/** Validates a login request body. Returns {} when valid. */
export function validateLogin(body: unknown): FieldErrors {
  const record = asRecord(body)
  const errors: FieldErrors = {}

  validateEmailField(readStringField(record, 'email'), errors)
  validatePasswordField(readStringField(record, 'password'), errors)

  return errors
}

export function hasFieldErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0
}
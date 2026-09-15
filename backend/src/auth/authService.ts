import type { UserRepository, UserRecord } from '../db/usersRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import { signAccessToken } from './jwt.ts'
import { hashPassword, verifyPassword } from './password.ts'
import { HttpError } from '../utils/HttpError.ts'
import {
  hasFieldErrors,
  validateLogin,
  validateRegistration,
  type FieldErrors,
} from '../utils/validation.ts'

/** User shape safe to expose over the API (never includes passwordHash). */
export interface PublicUser {
  id: string
  email: string
  name: string | null
  createdAt: string
}

export interface LoginResult {
  token: string
  user: PublicUser
}

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt.toISOString(),
  }
}

function throwValidationError(errors: FieldErrors): never {
  throw new HttpError(400, 'Validation failed.', errors)
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/** Registers a new user. Throws HttpError on invalid input (400) or duplicate email (409). */
export async function registerUser(
  userRepository: UserRepository,
  body: unknown,
): Promise<PublicUser> {
  const errors = validateRegistration(body)
  if (hasFieldErrors(errors)) {
    throwValidationError(errors)
  }

  const { email, password, name } = body as {
    email: string
    password: string
    name?: string | null
  }
  const normalizedEmail = normalizeEmail(email)
  const displayName = typeof name === 'string' && name.trim() !== '' ? name.trim() : null

  const existing = await userRepository.findByEmail(normalizedEmail)
  if (existing !== null) {
    throw new HttpError(409, 'An account with this email already exists.')
  }

  const passwordHash = await hashPassword(password)
  const user = await userRepository.create(normalizedEmail, passwordHash, displayName)
  return toPublicUser(user)
}

/** Authenticates a user and returns an access token. Throws HttpError 401 on failure. */
export async function loginUser(
  userRepository: UserRepository,
  body: unknown,
): Promise<LoginResult> {
  const errors = validateLogin(body)
  if (hasFieldErrors(errors)) {
    throwValidationError(errors)
  }

  const { email, password } = body as { email: string; password: string }
  const normalizedEmail = normalizeEmail(email)

  const user = await userRepository.findByEmail(normalizedEmail)
  if (user === null) {
    throw new HttpError(401, 'Invalid email or password.')
  }
  if (user.passwordHash === null) {
    throw new HttpError(401, 'Invalid email or password.')
  }

  const passwordMatches = await verifyPassword(password, user.passwordHash)
  if (!passwordMatches) {
    throw new HttpError(401, 'Invalid email or password.')
  }

  const token = signAccessToken({ id: user.id, email: user.email })
  return { token, user: toPublicUser(user) }
}

/** Loads the current user for GET /api/auth/me. Throws HttpError 401 if missing. */
export async function getCurrentUser(
  userRepository: UserRepository,
  userId: string,
): Promise<PublicUser> {
  const user = await userRepository.findById(userId)
  if (user === null) {
    throw new HttpError(401, 'User no longer exists.')
  }
  return toPublicUser(user)
}

/** Revokes an access token so it can no longer authenticate. */
export async function logoutUser(
  tokenStore: TokenStore,
  claims: { jti: string; exp: number },
): Promise<void> {
  await tokenStore.revoke(claims.jti, new Date(claims.exp * 1000))
}
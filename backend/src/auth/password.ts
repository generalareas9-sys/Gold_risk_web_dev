import bcrypt from 'bcryptjs'

/**
 * Sandbox of password hashing for the auth phase. bcrypt (cost 12) is used so
 * hashing/verification is portable and needs no native compilation.
 */

const BCRYPT_COST = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
/**
 * Shared shapes for the future API layer. Nothing here is wired up to a
 * real backend yet — nothing in this project is.
 */

export interface ApiError {
  status: number
  message: string
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError }

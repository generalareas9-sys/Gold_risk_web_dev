/**
 * Persists the Calculator's selected trading account so the choice survives
 * navigation between pages and full reloads. The stored value is the
 * `AccountSpec.id` ('exness-standard-cent' for the built-in account, or
 * 'saved-<accountId>' for a saved trading account). On the Calculator the
 * provider falls back to the built-in account whenever the stored id no
 * longer resolves, so a stale value is always safe.
 */

export const SELECTED_ACCOUNT_STORAGE_KEY = 'goldrisk_selected_account_id'

export interface SelectedAccountStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

function defaultStorage(): SelectedAccountStorage | null {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return window.localStorage
  }
  return null
}

export function readSelectedAccountId(
  storage: SelectedAccountStorage | null = defaultStorage(),
): string | null {
  if (storage === null) return null
  try {
    return storage.getItem(SELECTED_ACCOUNT_STORAGE_KEY)
  } catch {
    return null
  }
}

export function saveSelectedAccountId(
  id: string,
  storage: SelectedAccountStorage | null = defaultStorage(),
): void {
  if (storage === null) return
  try {
    storage.setItem(SELECTED_ACCOUNT_STORAGE_KEY, id)
  } catch {
    // Best-effort persistence only.
  }
}

export function clearSelectedAccountId(
  storage: SelectedAccountStorage | null = defaultStorage(),
): void {
  if (storage === null) return
  try {
    storage.removeItem(SELECTED_ACCOUNT_STORAGE_KEY)
  } catch {
    // Best-effort.
  }
}
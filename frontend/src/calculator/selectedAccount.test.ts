import { describe, expect, it } from 'vitest'
import {
  clearSelectedAccountId,
  readSelectedAccountId,
  saveSelectedAccountId,
  SELECTED_ACCOUNT_STORAGE_KEY,
  type SelectedAccountStorage,
} from './selectedAccount'

function memoryStorage(): SelectedAccountStorage & { values: Map<string, string> } {
  const values = new Map<string, string>()
  return {
    values,
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value)
    },
    removeItem: (key) => {
      values.delete(key)
    },
  }
}

describe('selectedAccount persistence', () => {
  it('returns null when nothing is stored', () => {
    const storage = memoryStorage()
    expect(readSelectedAccountId(storage)).toBeNull()
  })

  it('saves and reads a saved-account selection', () => {
    const storage = memoryStorage()
    saveSelectedAccountId('saved-42', storage)
    expect(storage.values.get(SELECTED_ACCOUNT_STORAGE_KEY)).toBe('saved-42')
    expect(readSelectedAccountId(storage)).toBe('saved-42')
  })

  it('saves the built-in account selection too', () => {
    const storage = memoryStorage()
    saveSelectedAccountId('exness-standard-cent', storage)
    expect(readSelectedAccountId(storage)).toBe('exness-standard-cent')
  })

  it('clears a stored selection', () => {
    const storage = memoryStorage()
    saveSelectedAccountId('saved-42', storage)
    clearSelectedAccountId(storage)
    expect(readSelectedAccountId(storage)).toBeNull()
  })

  it('degrades gracefully when no storage is available', () => {
    saveSelectedAccountId('saved-42', null)
    expect(readSelectedAccountId(null)).toBeNull()
    clearSelectedAccountId(null)
    expect(readSelectedAccountId(null)).toBeNull()
  })
})
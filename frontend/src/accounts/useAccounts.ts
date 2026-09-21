import { useContext } from 'react'
import { AccountsContext, type AccountsContextValue } from './accountsContext.ts'

export function useAccounts(): AccountsContextValue {
  const ctx = useContext(AccountsContext)
  if (ctx === null) {
    throw new Error('useAccounts must be used within an AccountsProvider.')
  }
  return ctx
}
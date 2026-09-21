import { createContext } from 'react'
import type { Account, Specification } from '../services/accountsApi'

export interface AccountWithSpecs {
  account: Account
  specifications: Specification[]
}

export type AccountsStatus = 'loading' | 'ready' | 'error'

export interface AccountsContextValue {
  accounts: AccountWithSpecs[]
  status: AccountsStatus
  errorMessage: string | null
  refresh: () => void
}

export const AccountsContext = createContext<AccountsContextValue | null>(null)
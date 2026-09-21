import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useAuth } from '../auth/useAuth'
import { getAccount, listAccounts } from '../services/accountsApi'
import {
  AccountsContext,
  type AccountWithSpecs,
  type AccountsContextValue,
  type AccountsStatus,
} from './accountsContext'

type LoadResult =
  | { kind: 'unauthorized' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; accounts: AccountWithSpecs[] }

/** Pure fetcher: account list + each account's specifications, no state writes. */
async function loadAccounts(token: string): Promise<LoadResult> {
  const res = await listAccounts(token)
  if (!res.ok) {
    if (res.error.status === 401) return { kind: 'unauthorized' }
    return { kind: 'error', message: res.error.message }
  }

  const withSpecs: AccountWithSpecs[] = []
  for (const account of res.data.data.accounts) {
    const detailRes = await getAccount(token, account.id)
    if (!detailRes.ok) {
      if (detailRes.error.status === 401) return { kind: 'unauthorized' }
      withSpecs.push({ account, specifications: [] })
      continue
    }
    withSpecs.push({ account, specifications: detailRes.data.data.specifications })
  }
  return { kind: 'ready', accounts: withSpecs }
}

/**
 * Single source of truth for the authenticated user's trading accounts.
 *
 * The provider loads each account together with its specifications once per
 * authenticated session and exposes them (plus a `refresh`) to every consumer
 * — the Accounts page, the Calculator and anything else — so no page keeps a
 * second copy of the data.
 *
 * Failures are classified so consumers can show an honest state:
 *  - a 401 from the backend means the session (JWT) is expired or revoked and
 *    the user must authenticate again — never that the accounts are gone, so
 *    the provider signs the user out and the app's auth guard redirects to
 *    the login screen instead of implying accounts were lost;
 *  - any other error is surfaced as a retryable message while previously
 *    loaded accounts remain usable.
 */
export function AccountsProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, token, logout } = useAuth()
  const [accounts, setAccounts] = useState<AccountWithSpecs[]>([])
  const [status, setStatus] = useState<AccountsStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  // The session token the current data was loaded for. Until the first load
  // for the active session completes, consumers see a loading state so stale
  // data from a previous session can never leak to a newly logged-in user.
  const [loadedForToken, setLoadedForToken] = useState<string | null>(null)

  const applyLoadResult = useCallback(
    async (result: LoadResult, loadToken: string) => {
      if (result.kind === 'unauthorized') {
        await logout()
        return
      }
      if (result.kind === 'error') {
        setErrorMessage(result.message)
        setStatus('error')
        setLoadedForToken(loadToken)
        return
      }
      setAccounts(result.accounts)
      setErrorMessage(null)
      setStatus('ready')
      setLoadedForToken(loadToken)
    },
    [logout],
  )

  useEffect(() => {
    if (!isAuthenticated || token === null) return
    let cancelled = false
    void (async () => {
      const result = await loadAccounts(token)
      if (cancelled) return
      await applyLoadResult(result, token)
    })()
    return () => {
      cancelled = true
    }
  }, [isAuthenticated, token, applyLoadResult])

  const refresh = useCallback(() => {
    if (!isAuthenticated || token === null) return
    void (async () => {
      const result = await loadAccounts(token)
      await applyLoadResult(result, token)
    })()
  }, [isAuthenticated, token, applyLoadResult])

  const value = useMemo<AccountsContextValue>(() => {
    const isCurrentSession = token !== null && loadedForToken === token
    const visibleAccounts = isAuthenticated && isCurrentSession ? accounts : []
    const visibleStatus: AccountsStatus =
      !isAuthenticated || !isCurrentSession ? 'loading' : status
    const visibleError = isAuthenticated && isCurrentSession ? errorMessage : null
    return {
      accounts: visibleAccounts,
      status: visibleStatus,
      errorMessage: visibleError,
      refresh,
    }
  }, [isAuthenticated, token, loadedForToken, accounts, status, errorMessage, refresh])

  return <AccountsContext value={value}>{children}</AccountsContext>
}
/**
 * Predefined trading-account configurations.
 *
 * Each entry captures the broker/account-level specifications the
 * calculator engine needs.  The `accounts` array is the built-in
 * fallback used before any saved accounts exist; saved accounts from
 * the Phase 9 API are mapped into the same shape at runtime and merged
 * by the calculator screen, so the engine only ever sees one structure.
 */

import type { AccountCurrency, RiskMode } from '../types/calculator'
import type { AccountWithSpecs } from '../accounts/accountsContext'

export interface AccountSpec {
  id: string
  name: string
  broker: string
  accountType: string
  symbol: string
  contractSize: number
  minimumLot: number
  lotStep: number
  maximumLot: number
  currency: AccountCurrency
  /** Units of the account currency per 1 USD. For cent accounts this is 100. */
  uscPerUsd: number
  defaultBalance: number
  defaultRiskMode: RiskMode
  defaultRiskValue: number
  /** Set when this spec comes from a saved trading account so history can link it. */
  tradingAccountId?: string
}

export const defaultAccountId = 'exness-standard-cent'

export const accounts: AccountSpec[] = [
  {
    id: 'exness-standard-cent',
    name: 'Exness Standard Cent',
    broker: 'Exness',
    accountType: 'Standard Cent',
    symbol: 'XAUUSDc',
    contractSize: 1,
    minimumLot: 0.01,
    lotStep: 0.01,
    maximumLot: 200,
    currency: 'USC',
    uscPerUsd: 100,
    defaultBalance: 1220.3,
    defaultRiskMode: 'ACCOUNT_CURRENCY',
    defaultRiskValue: 100,
  },
]

export function getAccountById(id: string): AccountSpec | undefined {
  return accounts.find((a) => a.id === id)
}

/**
 * Maps saved trading accounts (with their specifications) into calculator
 * account configurations. Each saved account yields exactly one entry built
 * from its first specification (the specifications list is ordered by symbol),
 * so the selector shows each saved account once. Accounts the calculator
 * cannot model — non-USD/USC currencies or accounts without a specification —
 * are skipped instead of being misrepresented.
 */
export function toCalculatorAccountSpecs(accountsWithSpecs: AccountWithSpecs[]): AccountSpec[] {
  const specs: AccountSpec[] = []
  for (const { account, specifications } of accountsWithSpecs) {
    if (account.currency !== 'USD' && account.currency !== 'USC') continue
    const first = specifications[0]
    if (first === undefined) continue
    specs.push({
      id: `saved-${account.id}`,
      name: account.accountName,
      broker: account.broker,
      accountType: account.accountType,
      symbol: first.symbol,
      contractSize: first.contractSize,
      minimumLot: first.minimumLot,
      lotStep: first.lotStep,
      maximumLot: first.maximumLot,
      currency: account.currency,
      uscPerUsd: account.usdConversion,
      defaultBalance: account.balance,
      defaultRiskMode: 'ACCOUNT_CURRENCY',
      defaultRiskValue: 100,
      tradingAccountId: account.id,
    })
  }
  return specs
}
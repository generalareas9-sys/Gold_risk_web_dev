import { describe, expect, it } from 'vitest'
import { toCalculatorAccountSpecs } from './accounts'
import type { AccountWithSpecs } from '../accounts/accountsContext'

type Account = AccountWithSpecs['account']
type Spec = AccountWithSpecs['specifications'][number]

function account(overrides: Partial<Account> = {}): Account {
  return {
    id: '1',
    accountName: 'Exness Standard Cent',
    broker: 'Exness',
    accountType: 'Standard Cent',
    currency: 'USC',
    usdConversion: 100,
    balance: 1220.3,
    isActive: true,
    isDefault: true,
    createdAt: '2026-09-15T08:30:00.000Z',
    updatedAt: '2026-09-15T08:30:00.000Z',
    ...overrides,
  }
}

function spec(overrides: Partial<Spec> = {}): Spec {
  return {
    id: '10',
    tradingAccountId: '1',
    symbol: 'XAUUSDc',
    contractSize: 1,
    minimumLot: 0.01,
    maximumLot: 200,
    lotStep: 0.01,
    createdAt: '2026-09-15T08:30:00.000Z',
    updatedAt: '2026-09-15T08:30:00.000Z',
    ...overrides,
  }
}

describe('toCalculatorAccountSpecs', () => {
  it('maps a saved account to one AccountSpec using its specification', () => {
    const specs = toCalculatorAccountSpecs([
      { account: account(), specifications: [spec()] },
    ])
    expect(specs).toHaveLength(1)
    const mapped = specs[0]
    expect(mapped.id).toBe('saved-1')
    expect(mapped.name).toBe('Exness Standard Cent')
    expect(mapped.broker).toBe('Exness')
    expect(mapped.symbol).toBe('XAUUSDc')
    expect(mapped.contractSize).toBe(1)
    expect(mapped.minimumLot).toBe(0.01)
    expect(mapped.maximumLot).toBe(200)
    expect(mapped.lotStep).toBe(0.01)
    expect(mapped.currency).toBe('USC')
    expect(mapped.uscPerUsd).toBe(100)
    expect(mapped.defaultBalance).toBe(1220.3)
    expect(mapped.tradingAccountId).toBe('1')
  })

  it('produces exactly one entry per account even with many specifications', () => {
    const specs = toCalculatorAccountSpecs([
      {
        account: account(),
        specifications: [spec(), spec({ id: '11', symbol: 'US30' })],
      },
    ])
    expect(specs).toHaveLength(1)
    expect(specs[0].symbol).toBe('XAUUSDc')
  })

  it('skips accounts with a currency the calculator cannot model', () => {
    const specs = toCalculatorAccountSpecs([
      {
        account: account({ currency: 'EUR', usdConversion: 1.1 }),
        specifications: [spec()],
      },
    ])
    expect(specs).toHaveLength(0)
  })

  it('skips accounts without any specification', () => {
    const specs = toCalculatorAccountSpecs([
      { account: account(), specifications: [] },
    ])
    expect(specs).toHaveLength(0)
  })

  it('maps every supported account, keeping an entry per account', () => {
    const specs = toCalculatorAccountSpecs([
      { account: account(), specifications: [spec()] },
      {
        account: account({ id: '2', accountName: 'USD Account', currency: 'USD', usdConversion: 1 }),
        specifications: [spec({ id: '20', symbol: 'XAUUSD' })],
      },
    ])
    expect(specs.map((s) => s.id)).toEqual(['saved-1', 'saved-2'])
  })
})
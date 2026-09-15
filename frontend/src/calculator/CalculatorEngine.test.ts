import { describe, expect, it } from 'vitest'
import { calculate } from './CalculatorEngine'
import type { CalculatorInput } from '../types/calculator'

const centAccountReference = {
  accountBalance: 1220.3,
  riskMode: 'ACCOUNT_CURRENCY' as const,
  riskValue: 100,
  symbol: 'XAUUSDc',
  contractSize: 1,
  minimumLot: 0.01,
  maximumLot: 200,
  lotStep: 0.01,
  accountCurrency: 'USC' as const,
  uscPerUsd: 100,
  position: 'BUY' as const,
  entryPrice: 4014.73,
  stopLoss: 4002.69,
  takeProfit: 4052.23,
}

function buildInput(overrides: Partial<CalculatorInput> = {}): CalculatorInput {
  return { ...centAccountReference, ...overrides }
}

describe('reference calculation (Exness Standard Cent)', () => {
  it('produces the documented reference case from the project brief', () => {
    const result = calculate(buildInput())

    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
    expect(result.warnings).toEqual([])

    expect(result.slDistance).toBeCloseTo(12.04, 2)
    expect(result.riskAmount).toBeCloseTo(100, 4) // USC
    expect(result.riskAmountUsd).toBeCloseTo(1, 4) // $1

    expect(result.exactLot).toBeCloseTo(0.0831, 4)
    expect(result.recommendedLot).toBeCloseTo(0.08, 4)
    expect(result.isBelowMinLot).toBe(false)

    expect(result.riskRewardRatio).toBeCloseTo(3.11, 2)
    expect(result.potentialProfitUsd).toBeCloseTo(3.11, 2)
    expect(result.potentialProfit).toBeCloseTo(311.46, 1) // USC
  })

  it('never rounds the recommended lot upward', () => {
    const result = calculate(buildInput())
    expect(result.recommendedLot).toBeLessThanOrEqual(result.exactLot)
  })

  it('computes the actual risk from the rounded lot (safety check)', () => {
    const result = calculate(buildInput())
    // 0.08 × 12.04 × 1 = 0.9632 USD = 96.32 USC
    expect(result.actualRiskUsd).toBeCloseTo(0.9632, 4)
    expect(result.actualRisk).toBeCloseTo(96.32, 4)
  })
})

describe('risk modes', () => {
  it('treats FIXED_AMOUNT in USD identically for a USC account', () => {
    const result = calculate(buildInput({ riskMode: 'FIXED_AMOUNT', riskValue: 1 }))
    expect(result.riskAmount).toBeCloseTo(100, 4) // 1 USD = 100 USC
    expect(result.riskAmountUsd).toBeCloseTo(1, 4)
    expect(result.recommendedLot).toBeCloseTo(0.08, 4)
  })

  it('treats ACCOUNT_CURRENCY as the raw account-currency amount', () => {
    const result = calculate(buildInput({ riskValue: 200 }))
    expect(result.riskAmount).toBeCloseTo(200, 4)
    expect(result.riskAmountUsd).toBeCloseTo(2, 4)
  })

  it('converts a percentage of the balance to account currency', () => {
    const result = calculate(
      buildInput({
        accountBalance: 1000,
        riskMode: 'PERCENTAGE',
        riskValue: 1, // 1% = $10 on a $1,000 USD account
        accountCurrency: 'USD',
        uscPerUsd: 1,
        entryPrice: 2000,
        stopLoss: 1990,
        takeProfit: 2010,
      }),
    )
    expect(result.riskAmount).toBeCloseTo(10, 4)
    expect(result.exactLot).toBeCloseTo(1, 4) // 10 / (10 × 1)
    expect(result.recommendedLot).toBeCloseTo(1, 4)
  })
})

describe('direction validation', () => {
  it('rejects a BUY with stop loss above entry', () => {
    const result = calculate(buildInput({ stopLoss: 4020 }))
    expect(result.valid).toBe(false)
    expect(result.errors.join()).toContain('BUY')
  })

  it('rejects a BUY with take profit at or below entry', () => {
    const result = calculate(buildInput({ takeProfit: 4010 }))
    expect(result.valid).toBe(false)
    expect(result.errors.join()).toContain('BUY')
  })

  it('rejects a SELL with stop loss below entry', () => {
    const result = calculate(buildInput({ position: 'SELL', stopLoss: 4000 }))
    expect(result.valid).toBe(false)
    expect(result.errors.join()).toContain('SELL')
  })

  it('rejects a SELL with take profit at or above entry', () => {
    const result = calculate(buildInput({ position: 'SELL', stopLoss: 4020, takeProfit: 4015 }))
    expect(result.valid).toBe(false)
    expect(result.errors.join()).toContain('SELL')
  })

  it('rejects identical entry and stop loss', () => {
    const result = calculate(buildInput({ stopLoss: 4014.73 }))
    expect(result.valid).toBe(false)
    expect(result.errors.join()).toContain('identical')
  })

  it('accepts a valid SELL setup', () => {
    const result = calculate(
      buildInput({
        position: 'SELL',
        entryPrice: 2000,
        stopLoss: 2010,
        takeProfit: 1960,
        riskMode: 'FIXED_AMOUNT',
        riskValue: 10,
        accountCurrency: 'USD',
      }),
    )
    expect(result.valid).toBe(true)
    expect(result.slDistance).toBeCloseTo(10, 4)
    expect(result.exactLot).toBeCloseTo(1, 4) // 10 / (10 × 1)
    expect(result.riskRewardRatio).toBeCloseTo(4, 4) // 40 / 10
    expect(result.potentialProfitUsd).toBeCloseTo(40, 4)
  })
})

describe('safety limits', () => {
  it('flags a lot below the broker minimum instead of rounding up', () => {
    const result = calculate(
      buildInput({
        riskMode: 'FIXED_AMOUNT',
        riskValue: 1, // $1 vs a very large distance
        entryPrice: 5000,
        stopLoss: 2000,
        takeProfit: undefined,
      }),
    )
    expect(result.valid).toBe(true)
    expect(result.isBelowMinLot).toBe(true)
    expect(result.recommendedLot).toBe(0)
    expect(result.warnings.join()).toContain('minimum')
  })

  it('caps the recommended lot at the broker maximum with a warning', () => {
    const result = calculate(
      buildInput({
        riskMode: 'FIXED_AMOUNT',
        riskValue: 1_000_000,
        entryPrice: 2000,
        stopLoss: 1999,
      }),
    )
    expect(result.valid).toBe(true)
    expect(result.recommendedLot).toBe(200)
    expect(result.warnings.join()).toContain('maximum')
  })
})

describe('take profit optionality', () => {
  it('returns null reward fields when take profit is omitted', () => {
    const result = calculate(buildInput({ takeProfit: undefined }))
    expect(result.valid).toBe(true)
    expect(result.riskRewardRatio).toBeNull()
    expect(result.rewardDistance).toBeNull()
    expect(result.potentialProfit).toBeNull()
    expect(result.potentialProfitUsd).toBeNull()
    expect(result.recommendedLot).toBeCloseTo(0.08, 4)
  })
})
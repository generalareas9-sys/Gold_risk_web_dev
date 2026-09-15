/**
 * GoldRisk position-size calculation engine.
 *
 * This module is a pure, deterministic port of the Android app's
 * `CalculatorEngine`. It contains no UI code and no network calls so it can
 * be unit-tested in isolation.
 *
 * Core formula (XAUUSD quoted in USD):
 *   exactLot = riskAmountUsd / (slDistance × contractSize)
 *
 * The exact lot is then rounded DOWN to the broker's lot step, so the
 * recommended lot never increases the trader's intended risk.
 */

import type { CalculatorInput, CalculatorResult } from '../types/calculator'

/** Prevent division-by-zero when the caller supplies an unset spec value. */
function sanitizedContractSize(value: number): number {
  return value > 0 ? value : 1
}

function sanitizedLotStep(value: number): number {
  return value > 0 ? value : 0.01
}

function sanitizedMinimumLot(value: number): number {
  return value > 0 ? value : 0.01
}

/** No maximum-lot cap when the account does not declare one. */
function sanitizedMaximumLot(value: number): number {
  return value > 0 ? value : Number.POSITIVE_INFINITY
}

function sanitizedUscPerUsd(value: number): number {
  return value > 0 ? value : 1
}

function getDecimalPlaces(value: number): number {
  const str = String(value)
  const index = str.indexOf('.')
  return index < 0 ? 0 : str.length - index - 1
}

function roundToDecimals(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

export function calculate(input: CalculatorInput): CalculatorResult {
  const errors: string[] = []

  const entry = input.entryPrice
  const stopLoss = input.stopLoss
  const takeProfit = input.takeProfit
  const position = input.position

  const contractSize = sanitizedContractSize(input.contractSize)
  const lotStep = sanitizedLotStep(input.lotStep)
  const minimumLot = sanitizedMinimumLot(input.minimumLot)
  const maximumLot = sanitizedMaximumLot(input.maximumLot)
  const uscPerUsd = sanitizedUscPerUsd(input.uscPerUsd)
  const isUsc = input.accountCurrency === 'USC'

  if (!(entry > 0)) {
    errors.push('Entry price must be greater than zero.')
  }
  if (!(stopLoss > 0)) {
    errors.push('Stop Loss must be greater than zero.')
  }
  if (!(input.riskValue > 0)) {
    errors.push('Risk amount must be greater than zero.')
  }
  if (input.riskMode === 'PERCENTAGE' && !(input.accountBalance > 0)) {
    errors.push('Account balance must be greater than zero when using a percentage risk.')
  }

  const slDistance = Math.abs(entry - stopLoss)
  if (errors.length === 0 && slDistance <= 0.000001) {
    errors.push('Entry and Stop Loss cannot be identical.')
  }

  if (errors.length === 0) {
    if (position === 'BUY') {
      if (stopLoss >= entry) {
        errors.push('For BUY, Stop Loss must be below Entry price.')
      } else if (takeProfit != null && takeProfit > 0 && takeProfit <= entry) {
        errors.push('For BUY, Take Profit must be above Entry price.')
      }
    } else {
      if (stopLoss <= entry) {
        errors.push('For SELL, Stop Loss must be above Entry price.')
      } else if (takeProfit != null && takeProfit > 0 && takeProfit >= entry) {
        errors.push('For SELL, Take Profit must be below Entry price.')
      }
    }
  }

  // Risk amount in account-currency units (e.g. USC).
  // - PERCENTAGE:          value is a percentage of the balance.
  // - FIXED_AMOUNT:        value is a fixed amount in USD.
  // - ACCOUNT_CURRENCY:    value is directly the account-currency amount.
  const riskAmount = (() => {
    switch (input.riskMode) {
      case 'PERCENTAGE':
        return input.accountBalance * (input.riskValue / 100)
      case 'FIXED_AMOUNT':
        return isUsc ? input.riskValue * uscPerUsd : input.riskValue
      case 'ACCOUNT_CURRENCY':
        return input.riskValue
    }
  })()

  // 100 USC = 1 USD for the Exness Standard Cent account.
  const riskAmountUsd = isUsc ? riskAmount / uscPerUsd : riskAmount

  if (errors.length > 0) {
    return {
      slDistance: Number.isFinite(slDistance) ? slDistance : 0,
      riskAmount,
      riskAmountUsd,
      exactLot: 0,
      recommendedLot: 0,
      actualRisk: 0,
      actualRiskUsd: 0,
      isBelowMinLot: false,
      valid: false,
      errors,
      warnings: [],
      riskRewardRatio: null,
      rewardDistance: null,
      potentialProfit: null,
      potentialProfitUsd: null,
    }
  }

  const warnings: string[] = []

  // Exact lot before any broker rounding constraints.
  const exactLot = riskAmountUsd / (slDistance * contractSize)

  const isBelowMinLot = exactLot < minimumLot

  const stepDecimals = getDecimalPlaces(lotStep)
  const steps = Math.floor(exactLot / lotStep + 1e-9)
  const roundedDown = steps > 0 ? roundToDecimals(steps * lotStep, stepDecimals) : 0

  let recommendedLot: number
  if (isBelowMinLot) {
    recommendedLot = 0
    warnings.push(
      `The required lot (${exactLot.toFixed(4)}) is below the broker's minimum of ${minimumLot}. ` +
        'Using the minimum lot could exceed your selected risk.',
    )
  } else if (roundedDown > maximumLot) {
    recommendedLot = maximumLot
    warnings.push(
      `The required lot exceeds the broker's maximum of ${maximumLot}. ` +
        `Risk is capped at the maximum lot and actual risk will be lower than intended.`,
    )
  } else {
    recommendedLot = roundedDown
  }

  const actualRiskUsd = recommendedLot * slDistance * contractSize
  const actualRisk = isUsc ? actualRiskUsd * uscPerUsd : actualRiskUsd

  let rewardDistance: number | null = null
  let riskRewardRatio: number | null = null
  let potentialProfit: number | null = null
  let potentialProfitUsd: number | null = null

  if (takeProfit != null && takeProfit > 0) {
    rewardDistance = Math.abs(takeProfit - entry)
    riskRewardRatio = rewardDistance / slDistance
    potentialProfit = riskAmount * riskRewardRatio
    potentialProfitUsd = isUsc ? potentialProfit / uscPerUsd : potentialProfit
  }

  return {
    slDistance,
    riskAmount,
    riskAmountUsd,
    exactLot,
    recommendedLot,
    actualRisk,
    actualRiskUsd,
    isBelowMinLot,
    valid: true,
    errors,
    warnings,
    riskRewardRatio,
    rewardDistance,
    potentialProfit,
    potentialProfitUsd,
  }
}
/**
 * Display-layer mapping of engine + validator messages to i18n keys.
 *
 * CalculatorEngine.ts and useCalculator.ts are business logic that must NOT
 * change: their tests assert on the English substrings they emit. All
 * translation therefore happens here, at render time:
 *   - exact-string matches for the validation/engine errors;
 *   - regex matches (plus number extraction) for the two lot warnings
 *     that embed the computed values.
 * Any message we cannot map is passed through verbatim so nothing is lost.
 */

import type { TranslationKey, TranslationParams } from './types'

type Translate = (key: TranslationKey, params?: TranslationParams) => string

const EXACT_ERROR_KEYS: Readonly<Record<string, TranslationKey>> = {
  'Enter a valid entry price.': 'engine.entryValid',
  'Entry price is required.': 'engine.entryRequired',
  'Enter a valid stop loss.': 'engine.stopLossValid',
  'Stop Loss is required.': 'engine.stopLossRequired',
  'Enter a valid risk amount.': 'engine.riskValid',
  'Risk amount is required.': 'engine.riskRequired',
  'Enter a valid account balance.': 'engine.balanceValid',
  'Account balance is required when using a percentage risk.': 'engine.balanceRequiredForPercent',
  'Entry price must be greater than zero.': 'engine.entryGreaterThanZero',
  'Stop Loss must be greater than zero.': 'engine.stopLossGreaterThanZero',
  'Risk amount must be greater than zero.': 'engine.riskGreaterThanZero',
  'Account balance must be greater than zero when using a percentage risk.': 'engine.balanceGreaterThanZeroPercent',
  'Entry and Stop Loss cannot be identical.': 'engine.identical',
  'For BUY, Stop Loss must be below Entry price.': 'engine.buySlBelow',
  'For BUY, Take Profit must be above Entry price.': 'engine.buyTpAbove',
  'For SELL, Stop Loss must be above Entry price.': 'engine.sellSlAbove',
  'For SELL, Take Profit must be below Entry price.': 'engine.sellTpBelow',
}

const BELOW_MIN_RE = /^The required lot \(([\d.]+)\) is below the broker's minimum of ([\d.]+)\./
const EXCEEDS_MAX_RE = /^The required lot exceeds the broker's maximum of ([\d.]+)\./

/**
 * Translate a single engine/validator message using the active locale.
 * Falls back to the English source string for anything unrecognised.
 */
export function translateEngineMessage(message: string, t: Translate): string {
  const exactKey = EXACT_ERROR_KEYS[message]
  if (exactKey) return t(exactKey)

  if (BELOW_MIN_RE.test(message)) {
    const [, exact, min] = message.match(BELOW_MIN_RE) as RegExpMatchArray
    return t('engine.lotBelowMin', { exact, min })
  }

  if (EXCEEDS_MAX_RE.test(message)) {
    const [, max] = message.match(EXCEEDS_MAX_RE) as RegExpMatchArray
    return t('engine.lotExceedsMax', { max })
  }

  return message
}

/** Translate a list of engine messages in order. */
export function translateEngineMessages(messages: readonly string[], t: Translate): string[] {
  return messages.map((message) => translateEngineMessage(message, t))
}
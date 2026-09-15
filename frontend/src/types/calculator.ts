/**
 * Shape of the calculator's inputs and result for the GoldRisk V1
 * calculation engine. These types describe data only — no calculation
 * logic lives here. The engine itself is implemented separately in
 * `src/calculator/`.
 */

/** Trade direction. */
export type PositionType = 'BUY' | 'SELL'

/** How the trader expresses the amount they're willing to risk. */
export type RiskMode = 'PERCENTAGE' | 'FIXED_AMOUNT' | 'ACCOUNT_CURRENCY'

/** Currency the account is denominated in. For the Exness Standard Cent account this is USC. */
export type AccountCurrency = 'USD' | 'USC'

export interface CalculatorInput {
  /** Total account balance, in account-currency units (e.g. USC). */
  accountBalance: number
  /** Which unit `riskValue` is expressed in. */
  riskMode: RiskMode
  /**
   * The risk amount itself:
   * - `PERCENTAGE`: a percentage of the balance (e.g. 1 for 1%).
   * - `FIXED_AMOUNT`: a fixed amount in USD.
   * - `ACCOUNT_CURRENCY`: a fixed amount in the account currency (e.g. 100 USC).
   */
  riskValue: number
  /** Instrument symbol, e.g. "XAUUSDc". */
  symbol: string
  /** Contract size for one standard lot of `symbol`. */
  contractSize: number
  /** Smallest increment the lot size can be adjusted by. */
  lotStep: number
  /** Minimum lot size the broker allows. */
  minimumLot: number
  /** Maximum lot size the broker allows. */
  maximumLot: number
  /** Currency the account is denominated in. Used for USD/USC conversion. */
  accountCurrency: AccountCurrency
  /** Units of the account currency per 1 USD. 100 for cent (USC) accounts. */
  uscPerUsd: number
  /** Trade direction. */
  position: PositionType
  entryPrice: number
  stopLoss: number
  /** Optional — reward-based fields in `CalculatorResult` are null when this is omitted. */
  takeProfit?: number
}

export interface CalculatorResult {
  /** Absolute price distance between entry and stop-loss. */
  slDistance: number
  /** Amount at risk, in account-currency terms. */
  riskAmount: number
  /** Amount at risk, converted to USD. */
  riskAmountUsd: number
  /** Precisely computed lot size, before broker step/min/max constraints are applied. */
  exactLot: number
  /** Final lot size after applying `lotStep`, `minimumLot`, and `maximumLot`. */
  recommendedLot: number
  /** Estimated risk using the recommended lot after rounding, in account-currency terms. */
  actualRisk: number
  /** Estimated risk using the recommended lot after rounding, converted to USD. */
  actualRiskUsd: number
  /** True when the exact lot is below the broker's minimum lot. */
  isBelowMinLot: boolean
  /**
   * True when the inputs produce a meaningful calculation. `false` for
   * blocking validation errors such as identical entry/stop-loss or a
   * stop-loss on the wrong side of entry.
   */
  valid: boolean
  /** Blocking validation errors. When non-empty, `valid` is `false`. */
  errors: string[]
  /** Non-blocking safety warnings, e.g. lot capped by the broker maximum. */
  warnings: string[]
  /** Reward-to-risk ratio. Null when `takeProfit` was not provided. */
  riskRewardRatio: number | null
  /** Absolute price distance between entry and take-profit. Null when `takeProfit` was not provided. */
  rewardDistance: number | null
  /** Potential profit, in account-currency terms. Null when `takeProfit` was not provided. */
  potentialProfit: number | null
  /** Potential profit, converted to USD. Null when `takeProfit` was not provided. */
  potentialProfitUsd: number | null
}
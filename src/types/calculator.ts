/**
 * Shape of the future calculator's inputs and result. These types describe
 * data only — no calculation logic lives here or anywhere in this phase.
 * The actual engine will be implemented later in `src/calculator/`.
 */

export type TradeDirection = 'long' | 'short'

export interface TradeInputs {
  accountBalance: number | null
  riskPercent: number | null
  symbol: string
  direction: TradeDirection
  entryPrice: number | null
  stopLoss: number | null
  takeProfit: number | null
}

export interface PositionSizeResult {
  lotSize: number
  riskAmount: number
  rewardToRisk: number | null
}

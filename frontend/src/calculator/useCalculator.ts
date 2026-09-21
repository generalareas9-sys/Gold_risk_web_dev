/**
 * State and actions for the calculator screen.
 *
 * Trade inputs are kept as raw strings until Calculate is pressed, so the
 * trader can type freely and nothing is recalculated on every keystroke.
 * All numeric parsing and validation happens in one place: `calculate()`.
 */

import { useCallback, useMemo, useState } from 'react'
import { calculate as runCalculation } from './CalculatorEngine'
import type { CalculatorInput, CalculatorResult, PositionType, RiskMode } from '../types/calculator'
import { accounts as defaultAccounts, type AccountSpec } from './accounts'
import { saveSelectedAccountId } from './selectedAccount'

function toValidNumber(raw: string): number | null {
  const trimmed = raw.trim().replace(/,/g, '')
  if (trimmed === '') return null
  const value = Number(trimmed)
  return Number.isFinite(value) ? value : null
}

export interface UseCalculatorReturn {
  account: AccountSpec
  balance: string
  riskMode: RiskMode
  riskValue: string
  position: PositionType
  entryPrice: string
  stopLoss: string
  takeProfit: string
  result: CalculatorResult | null
  lastInput: CalculatorInput | null
  formErrors: string[]
  errorPaths: Record<string, string>
  onSelectAccount: (id: string) => void
  onBalanceChange: (value: string) => void
  onRiskModeChange: (mode: RiskMode) => void
  onRiskValueChange: (value: string) => void
  onPositionChange: (position: PositionType) => void
  onEntryPriceChange: (value: string) => void
  onStopLossChange: (value: string) => void
  onTakeProfitChange: (value: string) => void
  calculate: () => void
  clear: () => void
  copyLot: () => Promise<boolean>
}

export function useCalculator(
  accountsList: AccountSpec[] = defaultAccounts,
  initialAccountId: string | null = null,
): UseCalculatorReturn {
  const firstAccount = accountsList[0] ?? defaultAccounts[0]

  const [accountId, setAccountId] = useState<string>(() => {
    if (
      initialAccountId !== null &&
      (accountsList.some((a) => a.id === initialAccountId) ||
        defaultAccounts.some((a) => a.id === initialAccountId))
    ) {
      return initialAccountId
    }
    return firstAccount.id
  })

  const account = useMemo(() => {
    const found =
      accountsList.find((a) => a.id === accountId) ??
      defaultAccounts.find((a) => a.id === accountId)
    return found ?? firstAccount
  }, [accountsList, accountId, firstAccount])

  const [balance, setBalance] = useState(String(firstAccount.defaultBalance))
  const [riskMode, setRiskMode] = useState<RiskMode>(firstAccount.defaultRiskMode)
  const [riskValue, setRiskValue] = useState(String(firstAccount.defaultRiskValue))
  const [position, setPosition] = useState<PositionType>('BUY')
  const [entryPrice, setEntryPrice] = useState('')
  const [stopLoss, setStopLoss] = useState('')
  const [takeProfit, setTakeProfit] = useState('')
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [lastInput, setLastInput] = useState<CalculatorInput | null>(null)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [errorPaths, setErrorPaths] = useState<Record<string, string>>({})

  const onSelectAccount = useCallback(
    (id: string) => {
      const next =
        accountsList.find((a) => a.id === id) ??
        defaultAccounts.find((a) => a.id === id)
      if (!next) return
      setAccountId(next.id)
      saveSelectedAccountId(next.id)
      setBalance(String(next.defaultBalance))
      setRiskMode(next.defaultRiskMode)
      setRiskValue(String(next.defaultRiskValue))
      setResult(null)
      setFormErrors([])
      setErrorPaths({})
    },
    [accountsList],
  )

  const onBalanceChange = useCallback((value: string) => setBalance(value), [])
  const onRiskModeChange = useCallback((mode: RiskMode) => setRiskMode(mode), [])
  const onRiskValueChange = useCallback((value: string) => setRiskValue(value), [])
  const onPositionChange = useCallback((value: PositionType) => setPosition(value), [])
  const onEntryPriceChange = useCallback((value: string) => setEntryPrice(value), [])
  const onStopLossChange = useCallback((value: string) => setStopLoss(value), [])
  const onTakeProfitChange = useCallback((value: string) => setTakeProfit(value), [])

  const calculate = useCallback(() => {
    const entryNum = toValidNumber(entryPrice)
    const stopLossNum = toValidNumber(stopLoss)
    const takeProfitNum = toValidNumber(takeProfit)
    const riskNum = toValidNumber(riskValue)
    const balanceNum = toValidNumber(balance)

    const paths: Record<string, string> = {}
    const messages: string[] = []

    if (entryNum === null) {
      paths.entryPrice = 'Enter a valid entry price.'
      messages.push('Entry price is required.')
    }
    if (stopLossNum === null) {
      paths.stopLoss = 'Enter a valid stop loss.'
      messages.push('Stop Loss is required.')
    }
    if (riskNum === null) {
      paths.riskValue = 'Enter a valid risk amount.'
      messages.push('Risk amount is required.')
    }
    if (riskMode === 'PERCENTAGE' && balanceNum === null) {
      paths.balance = 'Enter a valid account balance.'
      messages.push('Account balance is required when using a percentage risk.')
    }

    if (messages.length > 0) {
      setErrorPaths(paths)
      setFormErrors(messages)
      setResult(null)
      setLastInput(null)
      return
    }

    const input: CalculatorInput = {
      accountBalance: balanceNum as number,
      riskMode,
      riskValue: riskNum as number,
      symbol: account.symbol,
      contractSize: account.contractSize,
      lotStep: account.lotStep,
      minimumLot: account.minimumLot,
      maximumLot: account.maximumLot,
      accountCurrency: account.currency,
      uscPerUsd: account.uscPerUsd,
      position,
      entryPrice: entryNum as number,
      stopLoss: stopLossNum as number,
      takeProfit: takeProfitNum ?? undefined,
    }

    const computed = runCalculation(input)

    setErrorPaths(paths)
    setFormErrors([])
    setResult(computed)
    setLastInput(input)
  }, [account, balance, entryPrice, position, riskMode, riskValue, stopLoss, takeProfit])

  const clear = useCallback(() => {
    setEntryPrice('')
    setStopLoss('')
    setTakeProfit('')
    setResult(null)
    setLastInput(null)
    setFormErrors([])
    setErrorPaths({})
  }, [])

  const copyLot = useCallback(async (): Promise<boolean> => {
    if (!result || result.valid === false || result.recommendedLot <= 0) return false
    try {
      await navigator.clipboard.writeText(String(result.recommendedLot))
      return true
    } catch {
      return false
    }
  }, [result])

  return useMemo(
    () => ({
      account,
      balance,
      riskMode,
      riskValue,
      position,
      entryPrice,
      stopLoss,
      takeProfit,
      result,
      lastInput,
      formErrors,
      errorPaths,
      onSelectAccount,
      onBalanceChange,
      onRiskModeChange,
      onRiskValueChange,
      onPositionChange,
      onEntryPriceChange,
      onStopLossChange,
      onTakeProfitChange,
      calculate,
      clear,
      copyLot,
    }),
    [
      account, balance, riskMode, riskValue, position, entryPrice, stopLoss, takeProfit,
      result, lastInput, formErrors, errorPaths,
      onSelectAccount, onBalanceChange, onRiskModeChange, onRiskValueChange,
      onPositionChange, onEntryPriceChange, onStopLossChange, onTakeProfitChange,
      calculate, clear, copyLot,
    ],
  )
}
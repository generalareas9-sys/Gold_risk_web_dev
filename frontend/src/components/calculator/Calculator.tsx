import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCalculator } from '../../calculator/useCalculator'
import { accounts as builtInAccounts, type AccountSpec } from '../../calculator/accounts'
import type { Account, Specification } from '../../services/accountsApi'
import { listAccounts, getAccount } from '../../services/accountsApi'
import type { RiskMode } from '../../types/calculator'
import { Card } from '../common/Card'
import { Input } from '../common/Input'
import { Select } from '../common/Select'
import { Button } from '../common/Button'
import { PositionToggle } from './PositionToggle'
import { ResultPanel } from './ResultPanel'
import { IconLayers, IconWallet, IconPercent, IconChart, IconStop, IconTarget } from '../common/Icons'
import { useAuth } from '../../auth/useAuth'
import { createCalculation } from '../../services/calculationsApi'
import { paths } from '../../routes/paths'
import { cn } from '../../utils/cn'
import { useLanguage } from '../../i18n/useLanguage'
import { translateEngineMessage } from '../../i18n/engineMessages'

function toAccountSpec(account: Account, spec: Specification): AccountSpec | null {
  if (account.currency !== 'USD' && account.currency !== 'USC') return null
  return {
    id: `saved-${account.id}`,
    name: account.accountName,
    broker: account.broker,
    accountType: account.accountType,
    symbol: spec.symbol,
    contractSize: spec.contractSize,
    minimumLot: spec.minimumLot,
    lotStep: spec.lotStep,
    maximumLot: spec.maximumLot,
    currency: account.currency,
    uscPerUsd: account.usdConversion,
    defaultBalance: account.balance,
    defaultRiskMode: 'ACCOUNT_CURRENCY',
    defaultRiskValue: 100,
    tradingAccountId: account.id,
  }
}

export function Calculator() {
  const { isAuthenticated, token } = useAuth()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [savedAccounts, setSavedAccounts] = useState<AccountSpec[] | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || token === null) return
    let cancelled = false
    void (async () => {
      const listRes = await listAccounts(token)
      if (cancelled) return
      if (!listRes.ok) {
        setSavedAccounts([])
        return
      }
      const specs: AccountSpec[] = []
      for (const account of listRes.data.data.accounts) {
        if (cancelled) break
        const detailRes = await getAccount(token, account.id)
        if (cancelled) break
        if (!detailRes.ok) continue
        for (const spec of detailRes.data.data.specifications) {
          const mapped = toAccountSpec(account, spec)
          if (mapped !== null) specs.push(mapped)
        }
      }
      if (cancelled) return
      setSavedAccounts(specs)
    })()
    return () => {
      cancelled = true
    }
  }, [isAuthenticated, token])

  const accountsLoading = isAuthenticated && savedAccounts === null

  const accountOptions = useMemo(
    () => [
      ...builtInAccounts,
      ...(isAuthenticated && savedAccounts !== null ? savedAccounts : []),
    ],
    [isAuthenticated, savedAccounts],
  )

  const calc = useCalculator(accountOptions)
  const { account } = calc

  const inputErrors = useMemo(() => {
    const next: Record<string, string> = {}
    for (const field of Object.keys(calc.errorPaths)) {
      next[field] = translateEngineMessage(calc.errorPaths[field], t)
    }
    return next
  }, [calc.errorPaths, t])

  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'error' | null>(null)

  const riskModeOptions: Array<{ value: RiskMode; label: string }> = [
    { value: 'PERCENTAGE', label: t('calc.riskModePercentage') },
    { value: 'FIXED_AMOUNT', label: t('calc.riskModeFixed') },
    { value: 'ACCOUNT_CURRENCY', label: t('calc.riskModeAccountCurrency') },
  ]

  function onRiskModeChange(value: string) {
    calc.onRiskModeChange(value as RiskMode)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    calc.calculate()
  }

  async function handleSave() {
    if (!isAuthenticated || token === null || calc.lastInput === null || calc.result === null) return
    setSaving(true)
    setSaveStatus(null)
    const res = await createCalculation(token, {
      symbol: account.symbol,
      position: calc.position,
      entryPrice: Number(calc.entryPrice) || 0,
      tradingAccountId: account.tradingAccountId ?? null,
      inputs: calc.lastInput,
      outputs: calc.result,
    })
    setSaving(false)
    if (res.ok) {
      setSaveStatus('saved')
    } else {
      setSaveStatus('error')
    }
  }

  const canSave = isAuthenticated && calc.result != null && calc.result.valid

  const riskHint =
    calc.riskMode === 'PERCENTAGE'
      ? t('calc.riskModePercentage')
      : calc.riskMode === 'FIXED_AMOUNT'
        ? t('calc.riskModeFixed')
        : account.currency

  return (
    <Card className="lift overflow-hidden">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <form
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-5 px-6 py-8 sm:px-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
            <div className="flex items-center gap-2.5">
              <IconLayers className="h-4.5 w-4.5 text-gold" aria-hidden="true" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text">
                {t('calc.tradeSetup')}
              </h2>
            </div>
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-xs text-gold">
              {account.currency === 'USC'
                ? t('calc.currencyChipUsc', { value: account.uscPerUsd, currency: account.currency })
                : t('calc.currencyChipUsd')}
            </span>
          </div>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Select
                label={accountsLoading ? t('calc.loadingAccounts') : t('calc.tradingAccount')}
                value={calc.account.id}
                onChange={(event) => calc.onSelectAccount(event.target.value)}
                disabled={accountsLoading}
              >
                {accountsLoading && <option value="">{t('calc.loadingOptions')}</option>}
                {accountOptions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.tradingAccountId ? a.name : t('calc.builtIn', { name: a.name })}
                  </option>
                ))}
              </Select>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="mb-0.5 whitespace-nowrap rounded border border-border-strong px-3 py-2 text-xs font-medium text-text-muted transition-colors duration-150 hover:border-gold hover:text-gold"
              aria-expanded={showAdvanced}
            >
              {showAdvanced ? t('calc.basic') : t('calc.advanced')}
            </button>
          </div>

          {showAdvanced && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 rounded-xl border border-border bg-bg px-4 py-3 text-xs text-text-muted sm:grid-cols-4">
              <div>
                <dt className="text-text-faint">{t('calc.symbol')}</dt>
                <dd className="mt-0.5 font-mono text-text">{account.symbol}</dd>
              </div>
              <div>
                <dt className="text-text-faint">{t('calc.contractSize')}</dt>
                <dd className="mt-0.5 font-mono text-text">{account.contractSize}</dd>
              </div>
              <div>
                <dt className="text-text-faint">{t('calc.minMaxLot')}</dt>
                <dd className="mt-0.5 font-mono text-text">
                  {account.minimumLot} / {account.maximumLot}
                </dd>
              </div>
              <div>
                <dt className="text-text-faint">{t('calc.lotStep')}</dt>
                <dd className="mt-0.5 font-mono text-text">{account.lotStep}</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-text-faint">{t('calc.accountCurrency')}</dt>
                <dd className="mt-0.5 font-mono text-text">{account.currency}</dd>
              </div>
              <div>
                <dt className="text-text-faint">{t('calc.usdConversion')}</dt>
                <dd className="mt-0.5 font-mono text-text">
                  {t('calc.usdConversionValue', { value: account.uscPerUsd })}
                </dd>
              </div>
              <div>
                <dt className="text-text-faint">{t('calc.broker')}</dt>
                <dd className="mt-0.5 text-text">{account.broker}</dd>
              </div>
            </dl>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label={t('accounts.balanceLabel')}
              value={calc.balance}
              onChange={(event) => calc.onBalanceChange(event.target.value)}
              placeholder="1,220.30"
              inputMode="decimal"
              hint={account.currency}
              errorMessage={inputErrors.balance}
              startSlot={<IconWallet className="h-4 w-4" />}
            />
            <Select
              label={t('calc.riskMode')}
              value={calc.riskMode}
              onChange={(event) => onRiskModeChange(event.target.value)}
            >
              {riskModeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <Input
            label={t('calc.riskAmount')}
            value={calc.riskValue}
            onChange={(event) => calc.onRiskValueChange(event.target.value)}
            placeholder={calc.riskMode === 'PERCENTAGE' ? '1.00' : '100.00'}
            inputMode="decimal"
            hint={riskHint}
            errorMessage={inputErrors.riskValue}
            startSlot={<IconPercent className="h-4 w-4" />}
          />

          <PositionToggle value={calc.position} onChange={calc.onPositionChange} />

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label={t('calc.entryPrice')}
              value={calc.entryPrice}
              onChange={(event) => calc.onEntryPriceChange(event.target.value)}
              placeholder="4,014.73"
              inputMode="decimal"
              errorMessage={inputErrors.entryPrice}
              startSlot={<IconChart className="h-4 w-4" />}
            />
            <Input
              label={t('calc.stopLoss')}
              value={calc.stopLoss}
              onChange={(event) => calc.onStopLossChange(event.target.value)}
              placeholder="4,002.69"
              inputMode="decimal"
              errorMessage={inputErrors.stopLoss}
              startSlot={<IconStop className="h-4 w-4" />}
            />
          </div>

          <Input
            label={t('calc.takeProfit')}
            value={calc.takeProfit}
            onChange={(event) => calc.onTakeProfitChange(event.target.value)}
            placeholder="4,052.23"
            inputMode="decimal"
            hint={t('calc.tpHint')}
            startSlot={<IconTarget className="h-4 w-4" />}
          />

          {calc.formErrors.length > 0 && (
            <div role="alert" className="rounded-xl border border-error bg-error-muted px-4 py-3">
              <p className="text-sm font-medium text-text">{t('calc.checkInputs')}</p>
              <ul className="mt-1 list-inside list-disc text-sm text-text-muted">
                {calc.formErrors.map((message) => (
                  <li key={message}>{translateEngineMessage(message, t)}</li>
                ))}
              </ul>
            </div>
          )}

          {calc.result != null && !calc.result.valid && (
            <div role="alert" className="rounded-xl border border-error bg-error-muted px-4 py-3">
              <p className="text-sm font-medium text-text">{t('calc.fixSetup')}</p>
              <ul className="mt-1 list-inside list-disc text-sm text-text-muted">
                {calc.result.errors.map((message) => (
                  <li key={message}>{translateEngineMessage(message, t)}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            <Button type="submit" size="lg" className="flex-1 sm:flex-none">
              {t('calc.calculate')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={calc.clear}
              className="flex-1 sm:flex-none"
            >
              {t('calc.clear')}
            </Button>
          </div>

          {canSave && (
            <div className="flex flex-col gap-2 pt-1">
              <Button
                type="button"
                size="md"
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? t('calc.saving') : t('calc.saveCalculation')}
              </Button>
              {saveStatus === 'saved' && (
                <p
                  role="status"
                  className={cn('text-xs', 'text-success')}
                >
                  {t('calc.saved')}
                </p>
              )}
              {saveStatus === 'error' && (
                <p role="alert" className="text-xs text-error">
                  {t('calc.saveFailed')}
                </p>
              )}
            </div>
          )}

          {!isAuthenticated && calc.result != null && calc.result.valid && (
            <p className="text-xs text-text-faint pt-1">
              <button
                type="button"
                onClick={() => navigate(paths.login, { state: { from: '/' } })}
                className="text-gold hover:text-gold-strong"
              >
                {t('navigation.login')}
              </button>
              {' '}{t('calc.loginToSave')}
            </p>
          )}
        </form>

        <div className="border-t border-border bg-bg/40 px-6 py-8 sm:px-8 lg:border-s lg:border-t-0">
          <ResultPanel account={account} result={calc.result} onCopyLot={calc.copyLot} />
        </div>
      </div>
    </Card>
  )
}
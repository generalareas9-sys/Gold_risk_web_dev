import { useState } from 'react'
import type { CalculatorResult } from '../../types/calculator'
import type { AccountSpec } from '../../calculator/accounts'
import { Button } from '../common/Button'
import { IconCalculator } from '../common/Icons'
import { cn } from '../../utils/cn'
import { useLanguage } from '../../i18n/useLanguage'
import { translateEngineMessages } from '../../i18n/engineMessages'

interface ResultPanelProps {
  account: AccountSpec
  result: CalculatorResult | null
  onCopyLot: () => Promise<boolean>
}

function getLotDecimals(lotStep: number): number {
  const str = String(lotStep)
  const index = str.indexOf('.')
  return Math.max(2, index < 0 ? 0 : str.length - index - 1)
}

function formatLot(lot: number, lotStep: number): string {
  const decimals = getLotDecimals(lotStep)
  return lot.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** "100 USC ($1.00 — USD)" style display for amounts. */
function formatDual(amount: number, usdAmount: number, currency: string): string {
  const sign = amount < 0 ? '-' : ''
  const abs = Math.abs(amount)
  return `${sign}${formatNumber(abs, 2)} ${currency} = $${formatNumber(Math.abs(usdAmount), 2)}`
}

type MetricTone = 'default' | 'gold' | 'success'

interface MetricTileProps {
  label: string
  value: string
  tone?: MetricTone
  className?: string
}

function MetricTile({ label, value, tone = 'default', className }: MetricTileProps) {
  const toneClasses: Record<MetricTone, string> = {
    default: 'border-border bg-surface',
    gold: 'border-gold/25 bg-gold/5',
    success: 'border-success/25 bg-success/5',
  }
  const accent: Record<MetricTone, string> = {
    default: 'bg-border-strong',
    gold: 'bg-gold/50',
    success: 'bg-success/50',
  }
  return (
    <div
      className={cn(
        'relative flex min-w-0 flex-col gap-1 overflow-hidden rounded-xl border px-4 py-3',
        toneClasses[tone],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('absolute inset-x-0 top-0 h-px', accent[tone])}
      />
      <dt className="truncate text-[0.6875rem] uppercase tracking-wider text-text-faint">{label}</dt>
      <dd
        className={cn(
          'truncate font-mono text-sm',
          tone === 'gold' && 'font-semibold text-gold',
          tone === 'success' && 'font-medium text-success',
          tone === 'default' && 'text-text',
        )}
      >
        {value}
      </dd>
    </div>
  )
}

export function ResultPanel({ account, result, onCopyLot }: ResultPanelProps) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const recommendedShown = result != null && result.valid && result.recommendedLot > 0

  async function handleCopy() {
    const ok = await onCopyLot()
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const warnings = result != null ? translateEngineMessages(result.warnings, t) : []

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-border-strong bg-surface-raised p-6 shadow-md shadow-card-shadow sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-44 w-80 max-w-full -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative flex items-center justify-between gap-3 border-b border-border pb-4">
        <h2 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-text">
          <IconCalculator className="h-4.5 w-4.5 text-gold" aria-hidden="true" />
          {t('result.positionResult')}
        </h2>
      </div>

      <div className="relative">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
          {t('result.recommendedLot')}
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <p
            aria-live="polite"
            className={cn(
              'font-mono text-6xl font-semibold leading-none tracking-tight sm:text-7xl',
              recommendedShown
                ? 'text-gold [text-shadow:0_0_28px_rgba(201,162,39,0.28)]'
                : 'text-text-faint',
            )}
          >
            {recommendedShown ? formatLot(result.recommendedLot, account.lotStep) : '—'}
          </p>
          <Button
            type="button"
            variant={recommendedShown ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleCopy}
            disabled={!recommendedShown}
          >
            {copied ? `✓ ${t('result.copied')}` : t('result.copyLot')}
          </Button>
        </div>
        <p role="status" aria-live="polite" className="mt-1 min-h-4 text-right text-xs font-medium text-success">
          {copied ? t('result.copied') : ''}
        </p>
        {recommendedShown && <p className="mt-1 text-xs text-text-faint">{t('result.lotNote')}</p>}
      </div>

      {result != null && result.valid && (
        <dl className="relative grid grid-cols-2 gap-3">
          <MetricTile
            label={t('result.exactLot')}
            value={`${formatNumber(result.exactLot, 4)} ${t('result.lots')}`}
          />
          <MetricTile label={t('result.slDistance')} value={formatNumber(result.slDistance, 2)} />
          <MetricTile
            label={t('result.actualRisk')}
            value={formatDual(result.actualRisk, result.actualRiskUsd, account.currency)}
          />
          {result.riskRewardRatio != null ? (
            <MetricTile
              label={t('result.riskReward')}
              value={`1 : ${formatNumber(result.riskRewardRatio, 2)}`}
              tone="gold"
            />
          ) : (
            <MetricTile label={t('result.riskReward')} value="—" />
          )}
          {result.potentialProfit != null && result.potentialProfitUsd != null && (
            <MetricTile
              label={t('result.potentialProfit')}
              value={formatDual(result.potentialProfit, result.potentialProfitUsd, account.currency)}
              tone="success"
              className="col-span-2"
            />
          )}
        </dl>
      )}

      {result != null && result.warnings.length > 0 && (
        <div className="relative flex flex-col gap-2 rounded-xl border border-warning bg-warning-muted px-4 py-3">
          {warnings.map((warning) => (
            <p key={warning} className="text-xs leading-relaxed text-text-muted">
              {warning}
            </p>
          ))}
        </div>
      )}

      {result == null && (
        <p className="relative border-t border-border pt-5 text-xs leading-relaxed text-text-faint">
          {t('result.empty')}
        </p>
      )}

      {result != null && !result.valid && (
        <p className="relative border-t border-border pt-5 text-xs leading-relaxed text-text-faint">
          {t('result.invalid')}
        </p>
      )}
    </div>
  )
}
import { useEffect, useState } from 'react'
import type { CalculationSummary } from '../../services/calculationsApi'
import { getCalculation } from '../../services/calculationsApi'
import type { Account } from '../../services/accountsApi'
import { Button } from '../common/Button'
import { formatDate, formatNumber, formatTime } from '../../utils/format'
import { useLanguage } from '../../i18n/useLanguage'
import { translateEngineMessage } from '../../i18n/engineMessages'

interface CalculationDetailModalProps {
  token: string
  calculationId: string
  summary: CalculationSummary
  accounts: Account[]
  onClose: () => void
}

interface DetailRowProps {
  label: string
  value: string
  emphasis?: boolean
}

function DetailRow({ label, value, emphasis }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2 text-sm">
      <dt className={emphasis ? 'text-text' : 'text-text-muted'}>{label}</dt>
      <dd className={`font-mono ${emphasis ? 'font-semibold text-gold' : 'text-text'}`}>
        {value}
      </dd>
    </div>
  )
}

function readable(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function num(value: unknown, decimals: number): string {
  const parsed = readable(value)
  return parsed === null ? '—' : formatNumber(parsed, decimals)
}

export function CalculationDetailModal({
  token,
  calculationId,
  summary,
  accounts,
  onClose,
}: CalculationDetailModalProps) {
  const { t } = useLanguage()
  const [detail, setDetail] = useState<CalculationSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      const res = await getCalculation(token, calculationId)
      if (cancelled) return
      if (res.ok) {
        setDetail(res.data.data.calculation)
      } else {
        setError(res.error.message)
      }
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [token, calculationId])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const account = summary.tradingAccountId !== null
    ? accounts.find((a) => a.id === summary.tradingAccountId) ?? null
    : null

  const inputs = detail?.inputs as Record<string, unknown> | undefined
  const outputs = detail?.outputs as Record<string, unknown> | undefined

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('modal.ariaLabel', { position: summary.position, symbol: summary.symbol })}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="animate-modal-in max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-md border border-border bg-surface p-6 shadow-lg shadow-card-shadow sm:rounded-md sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t('modal.detailLabel')}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-text">
              {summary.position} · {summary.symbol}
            </h2>
            <p className="mt-0.5 text-xs text-text-faint">
              {t('modal.savedAt', {
                date: formatDate(summary.createdAt),
                time: formatTime(summary.createdAt),
              })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-border-strong px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-gold hover:text-gold"
            aria-label={t('modal.closeDetails')}
          >
            {t('modal.close')}
          </button>
        </div>

        {loading && (
          <div role="status" className="mt-8 flex items-center gap-3 text-text-muted">
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-border-strong border-t-gold"
            />
            <span className="text-sm">{t('modal.loading')}</span>
          </div>
        )}

        {error !== null && (
          <div role="alert" className="mt-6 rounded-md border border-error bg-error-muted px-4 py-3">
            <p className="text-sm font-medium text-text">{t('modal.unableToLoad')}</p>
            <p className="mt-1 text-sm text-text-muted">{error}</p>
          </div>
        )}

        {detail !== null && inputs !== undefined && outputs !== undefined && (
          <>
            {account !== null && (
              <div className="mt-6 rounded-md border border-border bg-surface-raised px-4 py-3">
                <p className="text-xs text-text-faint">{t('modal.accountBroker')}</p>
                <p className="mt-0.5 font-mono text-sm font-medium text-text">
                  {account.accountName} · {account.broker}
                </p>
                <p className="text-xs text-text-muted">
                  {account.accountType} · {account.currency}
                </p>
              </div>
            )}

            <dl className="mt-5">
              <DetailRow label={t('modal.calculationId')} value={detail.id} />
              <DetailRow label={t('modal.instrument')} value={detail.symbol} />
              <DetailRow label={t('modal.direction')} value={detail.position} />
              <DetailRow label={t('modal.entryPrice')} value={num(detail.entryPrice, 2)} />
              <DetailRow label={t('modal.balance')} value={num(inputs.accountBalance, 2)} />
              <DetailRow label={t('modal.riskMode')} value={String(inputs.riskMode ?? '—')} />
              <DetailRow label={t('modal.riskAmount')} value={num(inputs.riskValue, 2)} />
              <DetailRow label={t('modal.stopLoss')} value={num(inputs.stopLoss, 2)} />
              {inputs.takeProfit != null && (
                <DetailRow label={t('modal.takeProfit')} value={num(inputs.takeProfit, 2)} />
              )}
              <DetailRow label={t('modal.contractSize')} value={num(inputs.contractSize, 2)} />
            </dl>

            <h3 className="mt-6 text-xs font-medium uppercase tracking-wider text-text-muted">
              {t('modal.results')}
            </h3>
            <dl className="mt-2">
              <DetailRow label={t('modal.slDistance')} value={num(outputs.slDistance, 2)} />
              <DetailRow label={t('modal.exactLot')} value={num(outputs.exactLot, 4)} />
              <DetailRow label={t('modal.recommendedLot')} value={num(outputs.recommendedLot, 2)} emphasis />
              <DetailRow
                label={t('modal.actualRisk')}
                value={`${num(outputs.actualRisk, 2)} ${readable(outputs.actualRiskUsd) !== null ? `/ $${num(outputs.actualRiskUsd, 2)}` : ''}`}
              />
              {outputs.riskRewardRatio != null && (
                <DetailRow
                  label={t('modal.riskReward')}
                  value={`1 : ${num(outputs.riskRewardRatio, 2)}`}
                />
              )}
              {outputs.potentialProfit != null && (
                <DetailRow
                  label={t('modal.potentialProfit')}
                  value={`${num(outputs.potentialProfit, 2)} / $${num(outputs.potentialProfitUsd, 2)}`}
                />
              )}
            </dl>

            {(outputs.warnings as string[] | undefined)?.map((warning) => (
              <p
                key={warning}
                className="mt-3 rounded-md border border-warning bg-warning-muted px-3 py-2 text-xs text-text-muted"
              >
                {translateEngineMessage(warning, t)}
              </p>
            ))}
          </>
        )}

        <Button type="button" variant="secondary" className="mt-6 w-full" onClick={onClose}>
          {t('modal.close')}
        </Button>
      </div>
    </div>
  )
}
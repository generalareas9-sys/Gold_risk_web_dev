import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { PageContainer } from '../components/layout/PageContainer'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { WorkspaceHeader } from '../components/common/WorkspaceHeader'
import { StatePanel } from '../components/common/StatePanel'
import { useAuth } from '../auth/useAuth'
import { formatDate, formatNumber, formatTime } from '../utils/format'
import { cn } from '../utils/cn'
import {
  listCalculations,
  deleteCalculation,
  type CalculationSummary,
} from '../services/calculationsApi'
import { listAccounts, type Account } from '../services/accountsApi'
import { CalculationDetailModal } from '../components/history/CalculationDetailModal'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

function positionBadge(position: 'BUY' | 'SELL') {
  return cn(
    'inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-wider',
    position === 'BUY' ? 'bg-success/15 text-success' : 'bg-error/15 text-error',
  )
}

function CalculationCard({
  item,
  accountName,
  onDelete,
  onDetails,
}: {
  item: CalculationSummary
  accountName: string | null
  onDelete: (id: string) => void
  onDetails: () => void
}) {
  const [deleting, setDeleting] = useState(false)
  const { t } = useLanguage()

  const outputs = item.outputs as Record<string, unknown>
  const recommendedLot = outputs.recommendedLot as number | undefined
  const valid = outputs.valid as boolean | undefined

  async function handleDelete() {
    setDeleting(true)
    await onDelete(item.id)
    setDeleting(false)
  }

  return (
    <Card className="lift overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className={positionBadge(item.position)}>{item.position}</span>
          <span className="font-mono text-sm font-medium text-text">{item.symbol}</span>
          <span className="text-sm text-text-muted">
            {t('history.entry')}{' '}
            <span className="font-mono text-text">{formatNumber(item.entryPrice, 2)}</span>
          </span>
          {accountName !== null && (
            <span className="text-sm text-text-muted">· {accountName}</span>
          )}
          {valid && recommendedLot != null && recommendedLot > 0 && (
            <span className="rounded-full border border-gold/40 bg-gold-muted/20 px-2.5 py-0.5 font-mono text-sm font-semibold text-gold">
              {t('history.lot')} {formatNumber(recommendedLot, 2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-text-faint sm:inline">
            {formatDate(item.createdAt)}
          </span>
          <button
            type="button"
            onClick={onDetails}
            className="rounded border border-border-strong px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-gold hover:text-gold"
          >
            {t('history.details')}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-error hover:text-error disabled:opacity-50"
          >
            {deleting ? '…' : t('history.delete')}
          </button>
        </div>
      </div>

      <div className="border-t border-border px-5 py-3 text-xs text-text-faint sm:hidden">
        {t('history.savedAt', {
          date: formatDate(item.createdAt),
          time: formatTime(item.createdAt),
        })}
      </div>
    </Card>
  )
}

export function HistoryPage() {
  const { token } = useAuth()
  const { t } = useLanguage()
  const [calculations, setCalculations] = useState<CalculationSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selected, setSelected] = useState<CalculationSummary | null>(null)

  const load = useCallback(() => {
    if (token === null) return
    setLoading(true)
    setError(null)
    void (async () => {
      const res = await listCalculations(token)
      if (res.ok) {
        setCalculations(res.data.data.calculations)
      } else {
        setError(res.error.message)
      }
      setLoading(false)
    })()
  }, [token])

  useEffect(() => {
    if (token === null) return
    let cancelled = false
    void (async () => {
      const res = await listCalculations(token)
      if (cancelled) return
      if (res.ok) {
        setCalculations(res.data.data.calculations)
      } else {
        setError(res.error.message)
      }
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [token])

  useEffect(() => {
    if (token === null) return
    let cancelled = false
    void (async () => {
      const res = await listAccounts(token)
      if (cancelled) return
      if (res.ok) {
        setAccounts(res.data.data.accounts)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token])

  const accountNames = useMemo(() => {
    const map = new Map<string, string>()
    for (const account of accounts) {
      map.set(account.id, account.accountName)
    }
    return map
  }, [accounts])

  const handleDelete = useCallback(
    async (id: string) => {
      if (token === null) return
      const res = await deleteCalculation(token, id)
      if (res.ok) {
        setCalculations((prev) => prev.filter((c) => c.id !== id))
        setSelected((current) => (current !== null && current.id === id ? null : current))
      }
    },
    [token],
  )

  const subtitle =
    calculations.length === 0
      ? t('history.subtitleEmpty')
      : t(
          calculations.length === 1 ? 'history.subtitleCount' : 'history.subtitleCountOther',
          { count: calculations.length },
        )

  return (
    <Section className="pt-10 sm:pt-12">
      <PageContainer>
        <WorkspaceHeader
          eyebrow={t('navigation.history')}
          title={t('history.title')}
          subtitle={subtitle}
        />

        {error !== null && (
          <StatePanel
            variant="error"
            className="mt-6"
            title={t('history.unableToLoad')}
            body={
              error === 'No API base URL is configured for this environment.'
                ? t('history.apiUnreachable')
                : t('history.tryAgain')
            }
            action={
              <Button type="button" variant="secondary" size="sm" onClick={load}>
                {t('history.retry')}
              </Button>
            }
          />
        )}

        {loading ? (
          <StatePanel variant="loading" className="mt-8" title={t('history.loading')} />
        ) : (
          <>
            {calculations.length === 0 && !error && (
              <StatePanel
                variant="empty"
                className="mt-8"
                title={t('history.emptyTitle')}
                body={t('history.emptyBody')}
                action={
                  <Link to={paths.calculator}>
                    <Button type="button">{t('history.goToCalculator')}</Button>
                  </Link>
                }
              />
            )}

            {calculations.length > 0 && (
              <div className="mt-8 flex flex-col gap-4">
                {calculations.map((item) => (
                  <CalculationCard
                    key={item.id}
                    item={item}
                    accountName={
                      item.tradingAccountId !== null
                        ? (accountNames.get(item.tradingAccountId) ?? null)
                        : null
                    }
                    onDelete={handleDelete}
                    onDetails={() => setSelected(item)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </PageContainer>

      {selected !== null && token !== null && (
        <CalculationDetailModal
          token={token}
          calculationId={selected.id}
          summary={selected}
          accounts={accounts}
          onClose={() => setSelected(null)}
        />
      )}
    </Section>
  )
}
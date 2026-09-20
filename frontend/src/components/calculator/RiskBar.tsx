import type { CalculatorResult } from '../../types/calculator'
import { IconStop, IconTarget, IconChart } from '../common/Icons'
import { useLanguage } from '../../i18n/useLanguage'
import { cn } from '../../utils/cn'

interface RiskBarProps {
  result: CalculatorResult
}

/**
 * A pure presentation of the already-computed `slDistance` / `rewardDistance`
 * from `CalculatorResult` as a horizontal risk/reward map:
 *
 *   [ ── loss zone ── ] ENTRY [ ── profit zone ── ]
 *
 * No prices or ratios are computed here — the two segment widths are
 * proportional to the engine's own `slDistance` and `rewardDistance`, and the
 * entry marker always sits at the boundary between them. When no take-profit
 * was supplied, the reward side renders as a muted placeholder.
 */
export function RiskBar({ result }: RiskBarProps) {
  const { t } = useLanguage()

  const hasReward = result.rewardDistance != null && result.rewardDistance > 0
  const lossSpan = result.slDistance > 0 ? result.slDistance : 1
  const rewardSpan = hasReward ? (result.rewardDistance as number) : lossSpan
  const total = lossSpan + rewardSpan
  const lossPercent = Math.max(8, Math.min(92, (lossSpan / total) * 100))
  const rewardPercent = 100 - lossPercent

  return (
    <div className="relative flex flex-col gap-3 rounded-xl border border-border bg-bg/40 px-4 py-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-faint">
        <IconChart className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
        {t('result.riskMapTitle')}
      </div>

      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface" role="img" aria-label={t('result.riskMapTitle')}>
        <div
          className="h-full bg-gradient-to-r from-error/40 to-error"
          style={{ width: `${lossPercent}%` }}
        />
        <div
          className={cn('h-full bg-gradient-to-r', hasReward ? 'from-success to-success/40' : 'bg-border-strong opacity-40')}
          style={{ width: `${rewardPercent}%` }}
        />
      </div>

      <div className="relative h-11 text-[0.6875rem] leading-tight">
        <div className="absolute start-0 top-0 flex flex-col items-start gap-1 text-error">
          <IconStop className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="whitespace-nowrap font-medium uppercase tracking-wide">{t('result.riskMapLoss')}</span>
        </div>
        <div
          className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1 text-gold"
          style={{ insetInlineStart: `${lossPercent}%` }}
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-gold shadow-[0_0_0_3px_var(--color-gold-glow)]"
          />
          <span className="whitespace-nowrap font-medium uppercase tracking-wide">{t('result.riskMapEntry')}</span>
        </div>
        <div
          className={cn(
            'absolute end-0 top-0 flex flex-col items-end gap-1',
            hasReward ? 'text-success' : 'text-text-faint',
          )}
        >
          <IconTarget className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="whitespace-nowrap font-medium uppercase tracking-wide">{t('result.riskMapProfit')}</span>
        </div>
      </div>

      {!hasReward && (
        <p className="text-center text-[0.6875rem] text-text-faint">{t('result.riskMapNoTp')}</p>
      )}
    </div>
  )
}

import { useLanguage } from '../../i18n/useLanguage'
import { Sparkline } from '../common/Decor'

interface RowProps {
  label: string
  value: string
  hint?: string
}

function FieldRow({ label, value, hint }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-text-muted">{label}</span>
      <span className="font-mono text-sm text-text">
        {value}
        {hint && <span className="ms-1.5 text-xs text-text-faint">{hint}</span>}
      </span>
    </div>
  )
}

export function WorkspacePreview() {
  const { dict } = useLanguage()
  const p = dict.home.preview

  return (
    <div
      aria-hidden="true"
      className="surface-panel relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-card-shadow"
    >
      <div className="pointer-events-none absolute inset-0 pattern-grid opacity-40" />

      <div className="relative flex items-center justify-between border-b border-border bg-surface-raised/60 px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
        </div>
        <span className="truncate font-mono text-xs uppercase tracking-wider text-text-muted">
          {p.account}
          <span className="ms-2 text-gold">{p.symbol}</span>
        </span>
        <span className="h-2.5 w-2.5 rounded-sm border border-border-strong" />
      </div>

      <div className="relative grid sm:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col gap-4 border-b border-border p-6 sm:border-b-0 sm:border-e">
          <div className="flex items-center justify-between gap-2">
            <span className="flex-1 rounded-lg border border-border-strong bg-surface-raised px-3 py-2 font-mono text-xs text-text">
              {p.account}
            </span>
            <span className="rounded border border-border-strong px-2.5 py-2 font-mono text-xs text-text-muted">
              ADV
            </span>
          </div>

          <FieldRow label={p.balance} value="1,220.30" hint="USC" />
          <FieldRow label={p.risk} value="100" hint="USC" />

          <div className="flex rounded-lg border border-border-strong p-1">
            <span className="flex-1 rounded-md bg-gold py-1.5 text-center font-mono text-xs font-medium text-on-gold shadow-sm shadow-gold-glow/40">
              BUY
            </span>
            <span className="flex-1 rounded-md py-1.5 text-center font-mono text-xs text-text-muted">
              SELL
            </span>
          </div>

          <FieldRow label={p.entry} value="4,014.730" />
          <FieldRow label={p.stopLoss} value="4,002.690" />
          <FieldRow label={p.takeProfit} value="4,052.230" />

          <div className="mt-1 rounded-xl bg-gold py-3 text-center text-sm font-medium text-on-gold shadow-lg shadow-gold-glow/40">
            CALCULATE
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center overflow-hidden border-t border-border bg-surface-raised/40 p-6 sm:border-t-0">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70">
            <Sparkline variant="gold" />
          </div>

          <span className="relative text-xs font-medium uppercase tracking-wider text-text-muted">
            {p.recommendedLot}
          </span>
          <span className="text-gradient-gold relative mt-2 font-mono text-5xl font-semibold tracking-tight">
            0.08
          </span>

          <div className="relative mt-6 flex w-full max-w-[16rem] flex-col gap-3">
            <FieldRow label={p.slDistance} value="12.040" />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-text-muted">{p.riskReward}</span>
              <span className="rounded bg-teal/15 px-2 py-0.5 font-mono text-xs text-teal">
                1 : 3.11
              </span>
            </div>
          </div>
          <div className="relative mt-6 h-1 w-full max-w-[16rem] overflow-hidden rounded-full bg-border">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-gold-muted to-gold-strong" />
          </div>
        </div>
      </div>
    </div>
  )
}

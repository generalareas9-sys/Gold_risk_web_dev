import { Card } from '../common/Card'
import { Input } from '../common/Input'
import { Select } from '../common/Select'

/**
 * Establishes the future calculator's layout only. No calculation logic
 * exists here or anywhere in this phase — every control is disabled and no
 * result is ever computed or hard-coded.
 */
export function CalculatorPlaceholder() {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-8">
        <h2 className="text-base font-semibold text-text">Trade Inputs</h2>
        <span className="rounded-full border border-border-strong px-2.5 py-1 text-xs text-text-faint">
          Coming soon
        </span>
      </div>

      <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Account balance"
            placeholder="10,000.00"
            disabled
            inputMode="decimal"
          />
          <Input label="Risk" placeholder="1.00" disabled inputMode="decimal" hint="% of balance" />

          <Select label="Symbol" disabled defaultValue="XAUUSD">
            <option value="XAUUSD">XAUUSD</option>
          </Select>
          <Select label="Position" disabled defaultValue="long">
            <option value="long">Long</option>
            <option value="short">Short</option>
          </Select>

          <Input label="Entry price" placeholder="2,350.00" disabled inputMode="decimal" />
          <Input label="Stop loss" placeholder="2,340.00" disabled inputMode="decimal" />

          <Input
            label="Take profit"
            placeholder="2,370.00"
            disabled
            inputMode="decimal"
            className="sm:col-span-2"
          />
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-md border border-border bg-surface-raised p-6">
          <div>
            <p className="text-sm text-text-muted">Recommended lot size</p>
            <p className="mt-2 font-mono text-4xl font-semibold text-text-faint">—</p>
          </div>

          <dl className="flex flex-col gap-3 border-t border-border pt-5">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-text-muted">Amount at risk</dt>
              <dd className="font-mono text-text-faint">—</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-text-muted">Reward : risk</dt>
              <dd className="font-mono text-text-faint">—</dd>
            </div>
          </dl>

          <p className="text-xs text-text-faint">
            The calculation engine is not yet available. This panel shows where your results
            will appear.
          </p>
        </div>
      </div>
    </Card>
  )
}

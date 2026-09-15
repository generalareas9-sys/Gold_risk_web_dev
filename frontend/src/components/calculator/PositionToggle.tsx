import type { PositionType } from '../../types/calculator'
import { cn } from '../../utils/cn'
import { useLanguage } from '../../i18n/useLanguage'
import { IconTrendUp, IconTrendDown } from '../common/Icons'

interface PositionToggleProps {
  value: PositionType
  onChange: (value: PositionType) => void
}

export function PositionToggle({ value, onChange }: PositionToggleProps) {
  const { t } = useLanguage()
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-text-muted">{t('calc.position')}</span>
        <span aria-hidden="true" className="text-xs text-text-faint">
          {t('calc.buy')} / {t('calc.sell')}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1 rounded-md border border-border-strong bg-surface p-1">
        <button
          type="button"
          role="radio"
          aria-checked={value === 'BUY'}
          aria-label={t('calc.buy')}
          onClick={() => onChange('BUY')}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded px-3 py-2 text-sm font-semibold transition-colors duration-150',
            value === 'BUY'
              ? 'bg-success text-bg'
              : 'text-text-muted hover:text-text',
          )}
        >
          <IconTrendUp className="h-4 w-4 rtl:scale-x-[-1]" />
          {t('calc.buy')}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={value === 'SELL'}
          aria-label={t('calc.sell')}
          onClick={() => onChange('SELL')}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded px-3 py-2 text-sm font-semibold transition-colors duration-150',
            value === 'SELL'
              ? 'bg-error text-bg'
              : 'text-text-muted hover:text-text',
          )}
        >
          <IconTrendDown className="h-4 w-4 rtl:scale-x-[-1]" />
          {t('calc.sell')}
        </button>
      </div>
    </div>
  )
}
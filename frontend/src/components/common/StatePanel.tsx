import type { ComponentType, ReactNode, SVGProps } from 'react'
import { cn } from '../../utils/cn'
import { IconAlert, IconHistory } from './Icons'

type StatePanelVariant = 'loading' | 'empty' | 'error'

interface StatePanelProps {
  variant: StatePanelVariant
  title?: string
  body?: string
  action?: ReactNode
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  className?: string
}

export function StatePanel({
  variant,
  title,
  body,
  action,
  icon,
  className,
}: StatePanelProps) {
  if (variant === 'loading') {
    return (
      <div
        role="status"
        className={cn(
          'flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4 text-text-muted',
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-border-strong border-t-gold"
        />
        <span className="text-sm">{title}</span>
      </div>
    )
  }

  const Icon = icon ?? (variant === 'error' ? IconAlert : IconHistory)

  return (
    <div
      role={variant === 'error' ? 'alert' : undefined}
      className={cn(
        'surface-panel relative overflow-hidden rounded-3xl border border-border px-6 py-12 text-center',
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-grid opacity-40" />
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <span
          className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-2xl border',
            variant === 'error'
              ? 'border-error/30 bg-error/10 text-error'
              : 'border-gold/30 bg-gold/10 text-gold',
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        {title && <h2 className="mt-5 text-base font-semibold text-text">{title}</h2>}
        {body && <p className="mt-2 text-sm leading-relaxed text-text-muted">{body}</p>}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  )
}

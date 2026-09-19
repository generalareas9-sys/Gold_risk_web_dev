import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type CalloutTone = 'info' | 'warning' | 'success' | 'danger'

interface CalloutProps {
  tone?: CalloutTone
  title?: string
  children: ReactNode
  className?: string
}

const toneClasses: Record<CalloutTone, string> = {
  info: 'border-info/30 bg-info/5 text-info',
  warning: 'border-warning/35 bg-warning/5 text-warning',
  success: 'border-success/35 bg-success/5 text-success',
  danger: 'border-error/35 bg-error/5 text-error',
}

const iconPaths: Record<CalloutTone, ReactNode> = {
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16.5" />
      <line x1="12" y1="7.8" x2="12" y2="8" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3.5 21 19.5H3L12 3.5z" />
      <line x1="12" y1="9.5" x2="12" y2="14" />
      <line x1="12" y1="16.5" x2="12" y2="16.7" />
    </>
  ),
  success: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.6 2.6L16 9.5" />
    </>
  ),
  danger: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="7.5" x2="12" y2="13" />
      <line x1="12" y1="16.2" x2="12" y2="16.4" />
    </>
  ),
}

export function Callout({ tone = 'info', title, children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        'flex gap-3.5 rounded-2xl border p-4 sm:p-5',
        toneClasses[tone],
        className,
      )}
    >
      <svg
        className="mt-0.5 h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {iconPaths[tone]}
      </svg>
      <div className="min-w-0 text-text">
        {title && <p className="text-sm font-semibold text-text">{title}</p>}
        <div className={cn('text-sm leading-relaxed text-text-muted', title && 'mt-1')}>
          {children}
        </div>
      </div>
    </div>
  )
}

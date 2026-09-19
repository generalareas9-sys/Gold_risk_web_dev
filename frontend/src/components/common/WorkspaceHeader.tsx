import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Eyebrow } from './Eyebrow'

interface WorkspaceHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
  action?: ReactNode
  className?: string
}

export function WorkspaceHeader({
  eyebrow,
  title,
  subtitle,
  action,
  className,
}: WorkspaceHeaderProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border px-6 py-7 sm:px-8',
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="surface-panel absolute inset-0" />
        <div className="absolute inset-0 pattern-grid opacity-[0.35]" />
        <div className="absolute -top-24 end-[-6%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,var(--color-hero-glow),transparent)] blur-2xl" />
      </div>

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-base text-text-muted">{subtitle}</p>
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>
    </div>
  )
}

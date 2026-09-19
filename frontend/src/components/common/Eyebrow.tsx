import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface EyebrowProps {
  children: ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-gold',
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </p>
  )
}

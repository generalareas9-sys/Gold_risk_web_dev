import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface shadow-sm shadow-card-shadow transition-shadow duration-300 hover:shadow-lg hover:shadow-card-shadow',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

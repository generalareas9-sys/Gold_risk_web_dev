import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}

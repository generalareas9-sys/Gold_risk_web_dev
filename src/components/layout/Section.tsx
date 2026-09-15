import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { PageContainer } from './PageContainer'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  containerClassName?: string
}

export function Section({ children, className, containerClassName, ...props }: SectionProps) {
  return (
    <section className={cn('py-16 sm:py-20', className)} {...props}>
      <PageContainer className={containerClassName}>{children}</PageContainer>
    </section>
  )
}

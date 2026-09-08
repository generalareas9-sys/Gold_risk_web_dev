import type { ReactNode } from 'react'
import { Section } from '../components/layout/Section'

interface PlaceholderPageProps {
  title: string
  description: string
  children?: ReactNode
}

/**
 * Consistent shell for the informational pages defined in this phase.
 * Pages pass their own copy; this only standardizes spacing and heading
 * structure so content pages don't each reinvent the layout.
 */
export function PlaceholderPage({ title, description, children }: PlaceholderPageProps) {
  return (
    <Section className="pt-14 sm:pt-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold text-text sm:text-4xl">{title}</h1>
        <p className="mt-4 text-base text-text-muted">{description}</p>
      </div>
      {children && <div className="mt-10 max-w-2xl">{children}</div>}
    </Section>
  )
}

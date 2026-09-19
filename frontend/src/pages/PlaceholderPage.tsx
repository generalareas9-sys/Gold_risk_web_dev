import type { ReactNode } from 'react'
import { PageHero } from '../components/common/PageHero'

interface PlaceholderPageProps {
  eyebrow?: string
  title: string
  description: string
  children?: ReactNode
}

export function PlaceholderPage({ eyebrow, title, description, children }: PlaceholderPageProps) {
  return (
    <PageHero eyebrow={eyebrow} title={title} intro={description}>
      {children && (
        <div className="surface-panel max-w-3xl rounded-2xl border border-border p-6 shadow-lg shadow-card-shadow">
          {children}
        </div>
      )}
    </PageHero>
  )
}
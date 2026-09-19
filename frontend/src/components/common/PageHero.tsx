import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Eyebrow } from './Eyebrow'

interface PageHeroProps {
  eyebrow?: string
  title: string
  intro?: string
  actions?: ReactNode
  aside?: ReactNode
  children?: ReactNode
  className?: string
}

export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  aside,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-border',
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 pattern-grid-fade opacity-70" />
        <div className="absolute -top-32 end-[-10%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,var(--color-hero-glow),transparent)] blur-2xl" />
        <div className="absolute -bottom-40 start-[-12%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(closest-side,var(--color-glow-soft),transparent)] blur-2xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div
          className={cn(
            'grid gap-10',
            aside ? 'lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16' : undefined,
          )}
        >
          <div className={cn(aside ? 'max-w-2xl' : 'max-w-3xl')}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-text sm:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
                {intro}
              </p>
            )}
            {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
          </div>

          {aside && <div className="max-w-xl justify-self-center lg:justify-self-end">{aside}</div>}
        </div>

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  )
}

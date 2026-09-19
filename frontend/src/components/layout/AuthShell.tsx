import type { ReactNode } from 'react'
import { Logo } from '../common/Logo'
import { PageContainer } from './PageContainer'
import { Sparkline } from '../common/Decor'
import { useLanguage } from '../../i18n/useLanguage'

interface AuthShellProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

function CheckBullet() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold"
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  )
}

function AuthBranding() {
  const { dict } = useLanguage()
  const points = [
    { title: dict.home.features.cards[0].title, body: dict.home.features.cards[0].body },
    { title: dict.home.security.cards[0].title, body: dict.home.security.cards[0].body },
    { title: dict.home.workflow.steps[0].title, body: dict.home.workflow.steps[0].body },
  ]

  return (
    <div className="hidden max-w-xl lg:block">
      <Logo className="h-10" />
      <p className="mt-5 max-w-md text-lg leading-relaxed text-text-muted">
        {dict.footer.tagline}
      </p>

      <div className="surface-panel relative mt-8 max-w-md overflow-hidden rounded-2xl border border-border p-6 shadow-xl shadow-card-shadow">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-grid opacity-40" />
        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal" />
              XAUUSDc
            </span>
            <span className="font-mono text-xs text-text-faint">EXNESS</span>
          </div>
          <div className="mt-4 h-20">
            <Sparkline variant="gold" />
          </div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-text-faint">
                {dict.home.preview.recommendedLot}
              </p>
              <p className="text-gradient-gold font-mono text-3xl font-semibold">0.08</p>
            </div>
            <span className="rounded-lg border border-teal/30 bg-teal/10 px-3 py-1.5 font-mono text-xs text-teal">
              1 : 3.11
            </span>
          </div>
        </div>
      </div>

      <ul className="mt-9 space-y-5">
        {points.map((point) => (
          <li key={point.title} className="flex gap-3.5">
            <CheckBullet />
            <div>
              <h3 className="text-[15px] font-semibold text-text">{point.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">{point.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  const { dict } = useLanguage()

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 pattern-grid-fade opacity-60" />
        <div className="absolute -top-28 end-[14%] h-96 w-96 rounded-full bg-[radial-gradient(closest-side,var(--color-hero-glow),transparent)] blur-2xl" />
        <div className="absolute -bottom-16 start-[-8%] h-80 w-80 rounded-full bg-[radial-gradient(closest-side,var(--color-glow-soft),transparent)] blur-2xl" />
      </div>

      <PageContainer className="relative grid min-h-[calc(100vh-6rem)] items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-20">
        <AuthBranding />

        <div className="w-full max-w-md justify-self-center lg:mx-0 lg:justify-self-end">
          <div className="mb-6 flex flex-col items-center gap-3 text-center lg:hidden">
            <Logo className="h-8" />
            <p className="text-sm text-text-muted">{dict.footer.tagline}</p>
          </div>

          <div className="surface-panel relative overflow-hidden rounded-3xl border border-border p-8 shadow-2xl shadow-card-shadow">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
            />
            <div className="relative text-center">
              <h1 className="text-xl font-semibold text-text">{title}</h1>
              <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
            </div>
            <div className="relative mt-6 flex flex-col">{children}</div>
          </div>

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </PageContainer>
    </div>
  )
}

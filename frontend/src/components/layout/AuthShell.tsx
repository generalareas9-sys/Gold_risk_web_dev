import type { ReactNode } from 'react'
import { Logo } from '../common/Logo'
import { Card } from '../common/Card'
import { PageContainer } from './PageContainer'
import { useLanguage } from '../../i18n/useLanguage'

interface AuthShellProps {
  /** Card heading, e.g. auth.welcomeBack. */
  title: string
  /** Card subheading, e.g. auth.loginSubtitle. */
  subtitle: string
  /** Content inside the card: form fields, actions, and the OAuth split. */
  children: ReactNode
  /** Content rendered below the card (e.g. the account-switch link). */
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

/**
 * Premium auth-page shell: a calm gold-lit background, a compact brand
 * header on mobile, and on desktop a branding column beside a focused,
 * centered panel. Values map between RTL and LTR via logical utilities.
 */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  const { dict } = useLanguage()

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 end-[14%] h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-16 start-[-8%] h-80 w-80 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <PageContainer className="relative grid min-h-[calc(100vh-6rem)] items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-20">
        <AuthBranding />

        <div className="w-full max-w-md justify-self-center lg:mx-0 lg:justify-self-end">
          <div className="mb-6 flex flex-col items-center gap-3 text-center lg:hidden">
            <Logo className="h-8" />
            <p className="text-sm text-text-muted">{dict.footer.tagline}</p>
          </div>

          <Card className="p-8">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-text">{title}</h1>
              <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
            </div>
            <div className="mt-6 flex flex-col">{children}</div>
          </Card>

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </PageContainer>
    </div>
  )
}
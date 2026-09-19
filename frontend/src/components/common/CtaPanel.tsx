import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { GlowOrb } from './Decor'

interface CtaLink {
  to: string
  label: string
}

interface CtaPanelProps {
  title: string
  body?: string
  primary: CtaLink
  secondary?: CtaLink
  className?: string
}

export function CtaPanel({ title, body, primary, secondary, className }: CtaPanelProps) {
  return (
    <div
      className={cn(
        'surface-panel relative overflow-hidden rounded-3xl border border-border px-6 py-10 text-center shadow-2xl shadow-card-shadow sm:px-12',
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 pattern-grid opacity-40" />
        <GlowOrb className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2" />
      </div>
      <div className="relative">
        <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">{title}</h2>
        {body && <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted">{body}</p>}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={primary.to}
            className="inline-flex items-center justify-center rounded-xl bg-gold px-7 py-3.5 text-base font-medium text-on-gold shadow-lg shadow-gold-glow/40 transition-all duration-200 hover:bg-gold-strong hover:shadow-gold-glow/60"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              to={secondary.to}
              className="inline-flex items-center justify-center rounded-xl border border-border-strong px-7 py-3.5 text-base font-medium text-text-muted transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

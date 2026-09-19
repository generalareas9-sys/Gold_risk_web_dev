import { NavLink } from 'react-router-dom'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'
import { GlowOrb } from '../components/common/Decor'

export function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 pattern-grid-fade opacity-70" />
        <GlowOrb className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2" />
      </div>
      <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:py-32">
        <span aria-hidden="true" className="text-gradient-gold font-mono text-6xl font-semibold tracking-tight">
          404
        </span>
        <h1 className="mt-5 text-2xl font-semibold text-text">{t('notFound.title')}</h1>
        <p className="mt-2 text-sm text-text-muted">{t('notFound.body')}</p>
        <NavLink
          to={paths.home}
          className="mt-8 inline-flex items-center justify-center rounded-xl border border-border-strong px-6 py-3 text-sm font-medium text-text-muted transition-colors duration-200 hover:border-gold hover:text-gold"
        >
          {t('notFound.back')}
        </NavLink>
      </div>
    </section>
  )
}

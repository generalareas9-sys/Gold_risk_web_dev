import { NavLink } from 'react-router-dom'
import { Logo } from '../common/Logo'
import { PageContainer } from './PageContainer'
import { footerNavLinks, legalNavLinks } from '../../routes/paths'
import { useLanguage } from '../../i18n/useLanguage'

const brandChips = ['Exness Standard Cent', 'XAUUSDc', 'USC']

export function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="app-footer relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-grid opacity-[0.18]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[34rem] max-w-full -translate-x-1/2 rounded-full bg-gold/5 blur-3xl"
      />

      <PageContainer className="relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo className="h-9" />
          <p className="footer-muted text-sm">{t('footer.tagline')}</p>
          <ul className="flex flex-wrap gap-2">
            {brandChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-footer-muted"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t('footer.navigation')} className="flex flex-col gap-2.5">
          <h2 className="text-sm font-medium text-footer-text">{t('footer.navigation')}</h2>
          {footerNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-150"
            >
              <span className="h-px w-0 bg-gold transition-all duration-200 group-hover:w-3" />
              {t(link.labelKey)}
            </NavLink>
          ))}
        </nav>

        <nav aria-label={t('footer.legal')} className="flex flex-col gap-2.5">
          <h2 className="text-sm font-medium text-footer-text">{t('footer.legal')}</h2>
          {legalNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-150"
            >
              <span className="h-px w-0 bg-gold transition-all duration-200 group-hover:w-3" />
              {t(link.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-sm font-medium text-footer-text">{t('footer.disclaimer')}</h2>
          <p className="footer-muted text-sm">{t('footer.disclaimerText')}</p>
        </div>
      </PageContainer>

      <div className="border-footer relative border-t py-6">
        <PageContainer className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="footer-faint text-xs">{t('footer.copyright', { year: String(year) })}</p>
          <p className="footer-faint inline-flex items-center gap-2 text-xs">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
            {t('footer.tagline')}
          </p>
        </PageContainer>
      </div>
    </footer>
  )
}

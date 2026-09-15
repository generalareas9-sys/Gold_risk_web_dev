import { NavLink } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

export function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <Section className="pt-20 text-center">
      <p className="font-mono text-sm text-text-faint">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-text">{t('notFound.title')}</h1>
      <p className="mt-2 text-sm text-text-muted">{t('notFound.body')}</p>
      <NavLink
        to={paths.home}
        className="mt-6 inline-block text-sm text-gold transition-colors duration-200 hover:text-gold-strong"
      >
        {t('notFound.back')}
      </NavLink>
    </Section>
  )
}
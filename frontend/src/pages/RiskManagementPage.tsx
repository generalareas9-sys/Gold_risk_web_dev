import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { Card } from '../components/common/Card'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

export function RiskManagementPage() {
  const { t, dict } = useLanguage()

  return (
    <>
      <Section className="border-b border-border pb-10 pt-14 sm:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-gold">
            {t('risk.eyebrow')}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text sm:text-4xl">{t('risk.title')}</h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('risk.intro')}</p>
        </div>
      </Section>

      <Section className="pt-10">
        <div className="max-w-3xl">
          <ul className="grid gap-4 sm:grid-cols-2">
            {dict.risk.principles.map((principle) => (
              <li key={principle.title}>
                <Card className="h-full px-5 py-4">
                  <h2 className="text-base font-semibold text-text">{principle.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{principle.body}</p>
                </Card>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-md border border-warning bg-warning-muted px-5 py-4">
            <p className="text-sm leading-relaxed text-text-muted">{t('risk.disclaimer')}</p>
          </div>

          <Card className="bg-surface-raised mt-10 flex flex-col gap-3 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-4 sm:text-start">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-text">{t('risk.ctaTitle')}</h2>
              <p className="mt-1 text-sm text-text-muted">{t('risk.ctaBody')}</p>
            </div>
            <Link
              to={paths.login}
              className="inline-flex items-center justify-center rounded bg-gold px-6 py-3 text-sm font-medium text-on-gold transition-colors duration-200 hover:bg-gold-strong"
            >
              {t('risk.ctaButton')}
            </Link>
          </Card>
        </div>
      </Section>
    </>
  )
}
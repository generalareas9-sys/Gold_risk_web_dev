import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { Card } from '../components/common/Card'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

export function SupportedInstrumentsPage() {
  const { t } = useLanguage()

  return (
    <>
      <Section className="border-b border-border pb-10 pt-14 sm:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-gold">
            {t('inst.eyebrow')}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text sm:text-4xl">{t('inst.title')}</h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('inst.intro')}</p>
        </div>
      </Section>

      <Section className="pt-10">
        <div className="max-w-3xl">
          <Card className="border-gold bg-surface-raised px-6 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-mono text-2xl font-semibold text-gold">XAUUSDc</h2>
                <p className="mt-1 text-sm text-text-muted">{t('inst.cardSubtitle')}</p>
              </div>
              <span className="rounded-full border border-gold px-2.5 py-0.5 text-xs text-gold">
                {t('inst.currentlyConfigured')}
              </span>
            </div>
          </Card>

          <h2 className="mt-8 text-xl font-semibold text-text">{t('inst.whatTitle')}</h2>
          <p className="mt-3 text-base leading-relaxed text-text-muted">{t('inst.whatBody')}</p>

          <h2 className="mt-8 text-xl font-semibold text-text">{t('inst.contractTitle')}</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 rounded-md border border-border bg-surface px-5 py-5 sm:grid-cols-4">
            <div>
              <dt className="text-xs text-text-faint">{t('inst.contractSize')}</dt>
              <dd className="mt-0.5 font-mono text-sm text-text">1</dd>
            </div>
            <div>
              <dt className="text-xs text-text-faint">{t('inst.minimumLot')}</dt>
              <dd className="mt-0.5 font-mono text-sm text-text">0.01</dd>
            </div>
            <div>
              <dt className="text-xs text-text-faint">{t('inst.maximumLot')}</dt>
              <dd className="mt-0.5 font-mono text-sm text-text">200</dd>
            </div>
            <div>
              <dt className="text-xs text-text-faint">{t('inst.lotStep')}</dt>
              <dd className="mt-0.5 font-mono text-sm text-text">0.01</dd>
            </div>
          </dl>

          <p className="mt-8 text-sm leading-relaxed text-text-muted">{t('inst.note')}</p>
          <p className="mt-4 text-sm text-text-muted">
            {t('inst.seeBrokers')}{' '}
            <Link
              to={paths.supportedBrokers}
              className="font-medium text-gold transition-colors duration-200 hover:text-gold-strong"
            >
              {t('inst.linkBrokers')}
              <span aria-hidden="true" className="ms-1 arrow-flip">
                →
              </span>
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}
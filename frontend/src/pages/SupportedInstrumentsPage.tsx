import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { PageHero } from '../components/common/PageHero'
import { IconBadge } from '../components/common/IconBadge'
import { Sparkline } from '../components/common/Decor'
import { Callout } from '../components/common/Callout'
import { IconCoins } from '../components/common/Icons'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

export function SupportedInstrumentsPage() {
  const { t } = useLanguage()

  const specs = [
    { label: t('inst.contractSize'), value: '1' },
    { label: t('inst.minimumLot'), value: '0.01' },
    { label: t('inst.maximumLot'), value: '200' },
    { label: t('inst.lotStep'), value: '0.01' },
  ]

  const aside = (
    <div className="surface-panel relative overflow-hidden rounded-2xl border border-border p-6 shadow-2xl shadow-card-shadow">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-grid opacity-40" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-mono text-2xl font-semibold text-gold">XAUUSDc</h2>
            <p className="mt-1 text-sm text-text-muted">{t('inst.cardSubtitle')}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
            {t('inst.currentlyConfigured')}
          </span>
        </div>
        <div className="mt-6 h-24">
          <Sparkline variant="gold" />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageHero
        eyebrow={t('inst.eyebrow')}
        title={t('inst.title')}
        intro={t('inst.intro')}
        aside={aside}
      />

      <Section className="band border-b border-border">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <IconBadge icon={IconCoins} tone="gold" />
            <h2 className="mt-5 text-xl font-semibold text-text">{t('inst.whatTitle')}</h2>
            <p className="mt-3 text-base leading-relaxed text-text-muted">{t('inst.whatBody')}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-text">{t('inst.contractTitle')}</h2>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-2xl border border-border bg-surface p-4"
                >
                  <dt className="text-xs uppercase tracking-wider text-text-faint">{spec.label}</dt>
                  <dd className="stat-value mt-1 text-lg font-semibold text-text">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
          <Callout tone="info">{t('inst.note')}</Callout>
          <p className="mt-6 text-sm text-text-muted">
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

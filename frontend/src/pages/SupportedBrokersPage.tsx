import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { PageHero } from '../components/common/PageHero'
import { IconBadge } from '../components/common/IconBadge'
import { IconGlobe, IconCheck } from '../components/common/Icons'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

interface BrokerReference {
  name: string
  account: string
  website: string
}

const brokers: BrokerReference[] = [
  { name: 'HFM', account: 'Cent Account', website: 'https://www.hfm.com' },
  { name: 'Altum Brokers', account: 'Cent Account', website: 'https://altumbrokers.com' },
  { name: 'Exness', account: 'Standard Cent', website: 'https://www.exness.com' },
  { name: 'RoboForex', account: 'ProCent', website: 'https://roboforex.com' },
  { name: 'InstaForex', account: 'Cent Account', website: 'https://www.instaforex.com' },
  { name: 'FBS', account: 'Cent Account', website: 'https://fbs.com' },
  { name: 'XM', account: 'Micro Account', website: 'https://www.xm.com' },
  { name: 'JustMarkets', account: 'Standard Cent', website: 'https://justmarkets.com' },
  { name: 'Octa', account: 'Standard', website: 'https://octa.markets' },
  { name: 'IC Markets', account: 'Raw Spread', website: 'https://icmarkets.com' },
]

function BrokerCard({ broker, index }: { broker: BrokerReference; index: number }) {
  const { t, dict } = useLanguage()
  const configured =
    broker.name === 'Exness' && broker.account.toLowerCase().includes('standard cent')

  return (
    <li
      className={`lift group relative flex flex-col overflow-hidden rounded-2xl border p-5 ${
        configured
          ? 'border-gold/40 bg-surface'
          : 'border-border bg-surface hover:border-border-strong'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          configured ? 'via-gold/60' : 'via-border-strong opacity-0 group-hover:opacity-100'
        }`}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={configured ? IconCheck : IconGlobe} tone={configured ? 'gold' : 'neutral'} size="sm" />
          <div>
            <h3 className="text-base font-semibold text-text">{broker.name}</h3>
            <p className="mt-0.5 font-mono text-sm text-gold">{broker.account}</p>
          </div>
        </div>
        <span
          className={
            configured
              ? 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold'
              : 'whitespace-nowrap rounded-full border border-border-strong px-2.5 py-1 text-xs text-text-faint'
          }
        >
          {configured && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />}
          {configured ? t('brokers.currentlyConfigured') : t('brokers.reference')}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
        {dict.brokers.list[index]}
      </p>
      <a
        href={broker.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm font-medium text-gold transition-colors duration-200 hover:text-gold-strong"
      >
        {broker.website.replace('https://www.', '').replace('https://', '')}
        <span aria-hidden="true"> ↗</span>
      </a>
    </li>
  )
}

export function SupportedBrokersPage() {
  const { t } = useLanguage()

  return (
    <>
      <PageHero
        eyebrow={t('brokers.eyebrow')}
        title={t('brokers.title')}
        intro={t('brokers.intro')}
      />

      <Section className="band border-b border-border">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-text">{t('brokers.configuredTitle')}</h2>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            {t('brokers.configuredBody')}
          </p>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {brokers.map((broker, index) => (
            <BrokerCard key={`${broker.name}-${broker.account}`} broker={broker} index={index} />
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-text-muted">
          {t('brokers.note')}
        </p>
        <p className="mt-4 text-sm text-text-muted">
          {t('brokers.seeInstruments')}{' '}
          <Link
            to={paths.supportedInstruments}
            className="font-medium text-gold transition-colors duration-200 hover:text-gold-strong"
          >
            {t('brokers.linkInstruments')}
            <span aria-hidden="true" className="ms-1 arrow-flip">
              →
            </span>
          </Link>
        </p>
      </Section>
    </>
  )
}

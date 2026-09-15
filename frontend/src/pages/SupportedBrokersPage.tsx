import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

interface BrokerReference {
  name: string
  account: string
  website: string
}

/** Reference list. Only the marked broker is configured in the calculator engine. */
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
    <li className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-colors duration-200 hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-text">{broker.name}</h3>
          <p className="mt-0.5 font-mono text-sm text-gold">{broker.account}</p>
        </div>
        <span
          className={
            configured
              ? 'whitespace-nowrap rounded-full border border-gold px-2.5 py-0.5 text-xs text-gold'
              : 'whitespace-nowrap rounded-full border border-border-strong px-2.5 py-0.5 text-xs text-text-faint'
          }
        >
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
      <Section className="border-b border-border pb-10 pt-14 sm:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-gold">
            {t('brokers.eyebrow')}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text sm:text-4xl">
            {t('brokers.title')}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('brokers.intro')}</p>
        </div>
      </Section>

      <Section className="pt-10">
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
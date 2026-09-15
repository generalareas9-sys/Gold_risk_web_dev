import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { Card } from '../components/common/Card'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

export function PositionSizeCalculatorPage() {
  const { t, dict } = useLanguage()

  return (
    <>
      <Section className="border-b border-border pb-10 pt-14 sm:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-gold">
            {t('psc.eyebrow')}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text sm:text-4xl">
            {t('psc.title')}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('psc.intro')}</p>
        </div>
      </Section>

      <Section className="border-b border-border py-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-text">{t('psc.whatIsTitle')}</h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('psc.whatIsBody')}</p>
          <h2 className="mt-10 text-2xl font-semibold text-text">{t('psc.whyTitle')}</h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('psc.whyBody')}</p>
        </div>
      </Section>

      <Section className="border-b border-border py-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-text">{t('psc.requiredTitle')}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {dict.psc.required.map((item) => (
              <li key={item.title}>
                <Card className="h-full px-5 py-4">
                  <h3 className="text-sm font-semibold text-text">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-b border-border py-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-text">{t('psc.howTitle')}</h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('psc.howBody')}</p>
          <ol className="mt-8 flex flex-col gap-3">
            {dict.psc.flow.map((label, index) => (
              <li key={label} className="flex items-center gap-4">
                <span className="w-6 font-mono text-sm text-gold">{index + 1}</span>
                <span className="flex-1 rounded-md border border-border bg-surface-raised px-4 py-2.5 font-mono text-sm text-text">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="border-b border-border py-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-text">{t('psc.exampleTitle')}</h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('psc.exampleIntro')}</p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <Card className="px-5 py-4">
              <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">
                {t('psc.example.account')}
              </h3>
              <p className="mt-1 font-mono text-sm text-text">Exness Standard Cent</p>
              <p className="mt-1 text-xs text-text-muted">
                {t('psc.example.balanceLine', { amount: '1,220.30' })}
              </p>
            </Card>
            <Card className="px-5 py-4">
              <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">
                {t('psc.example.risk')}
              </h3>
              <p className="mt-1 font-mono text-sm text-text">100 USC</p>
              <p className="mt-1 text-xs text-text-muted">
                {t('psc.example.riskLine', {
                  position: 'BUY',
                  entry: '4014.73',
                  sl: '4002.69',
                  tp: '4052.23',
                })}
              </p>
            </Card>
            <Card className="border-gold bg-surface-raised px-5 py-4">
              <h3 className="text-xs font-medium uppercase tracking-wider text-gold">
                {t('psc.example.result')}
              </h3>
              <p className="mt-1 font-mono text-sm text-text">
                {t('psc.example.recommendedLot')}{' '}
                <span className="font-semibold text-gold">0.08</span>
              </p>
            </Card>
          </div>

          <dl className="mt-6 grid gap-3 rounded-md border border-border bg-surface px-5 py-5 sm:grid-cols-2">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-text-muted">{t('psc.exampleSlDistance')}</dt>
              <dd className="font-mono text-text">12.04</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-text-muted">{t('psc.exampleExactLot')}</dt>
              <dd className="font-mono text-text">≈ 0.0831</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-text-muted">{t('psc.exampleRecommendedLot')}</dt>
              <dd className="font-mono font-semibold text-gold">0.08</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-text-muted">{t('psc.exampleRisk')}</dt>
              <dd className="font-mono text-text">≈ $1.00</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-text-muted">{t('psc.exampleRiskReward')}</dt>
              <dd className="font-mono text-text">≈ 1 : 3.11</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-text-muted">{t('psc.examplePotentialProfit')}</dt>
              <dd className="font-mono text-text">≈ $3.11</dd>
            </div>
          </dl>

          <p className="mt-4 text-xs text-text-faint">{t('psc.note')}</p>
        </div>
      </Section>

      <Section className="border-b border-border py-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-text">{t('psc.howToUseTitle')}</h2>
          <ol className="mt-6 flex flex-col gap-3">
            {dict.psc.howToUse.map((step, index) => (
              <li key={step} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong font-mono text-xs text-gold">
                  {index + 1}
                </span>
                <span className="text-sm text-text-muted">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-md border border-warning bg-warning-muted px-5 py-4">
            <p className="text-sm leading-relaxed text-text-muted">{t('psc.disclaimer')}</p>
          </div>
        </div>
      </Section>

      <Section className="py-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-text">{t('psc.mistakesTitle')}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {dict.psc.mistakes.map((item) => (
              <li key={item.title}>
                <Card className="h-full px-5 py-4">
                  <h3 className="text-sm font-semibold text-text">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
                </Card>
              </li>
            ))}
          </ul>

          <Card className="bg-surface-raised mt-10 px-6 py-10 text-center sm:px-10">
            <h2 className="text-2xl font-semibold text-text">{t('psc.ctaTitle')}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted">
              {t('psc.ctaBody')}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Link
                to={paths.login}
                className="inline-flex items-center justify-center rounded bg-gold px-7 py-3.5 text-base font-medium text-on-gold transition-colors duration-200 hover:bg-gold-strong"
              >
                {t('psc.ctaButton')}
              </Link>
              <Link
                to={paths.howItWorks}
                className="inline-flex items-center justify-center rounded border border-border-strong px-7 py-3.5 text-base font-medium text-text-muted transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                {t('psc.ctaGuide')}
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    </>
  )
}
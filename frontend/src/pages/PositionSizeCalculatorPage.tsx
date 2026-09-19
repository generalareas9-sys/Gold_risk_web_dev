import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Section } from '../components/layout/Section'
import { PageHero } from '../components/common/PageHero'
import { IconBadge } from '../components/common/IconBadge'
import { Callout } from '../components/common/Callout'
import { CtaPanel } from '../components/common/CtaPanel'
import { ChartFrame } from '../components/common/Decor'
import {
  IconWallet,
  IconPercent,
  IconTrendUp,
  IconTarget,
  IconStop,
  IconChart,
  IconSliders,
  IconAlert,
} from '../components/common/Icons'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-text">
      <span aria-hidden="true" className="h-6 w-1 rounded-full bg-gradient-to-b from-gold to-gold-muted" />
      {children}
    </h2>
  )
}

export function PositionSizeCalculatorPage() {
  const { t, dict } = useLanguage()

  const requiredIcons = [
    IconWallet,
    IconPercent,
    IconTrendUp,
    IconTarget,
    IconStop,
    IconChart,
    IconSliders,
  ]
  const requiredTones = ['gold', 'info', 'teal', 'gold', 'info', 'teal', 'neutral'] as const

  const aside = (
    <ChartFrame variant="gold" caption="XAUUSD" className="lift">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-text-muted">{t('psc.exampleRecommendedLot')}</span>
        <span className="stat-value text-lg font-semibold text-gold">0.08</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-xs text-text-muted">{t('psc.exampleRiskReward')}</span>
        <span className="font-mono text-sm text-teal">≈ 1 : 3.11</span>
      </div>
    </ChartFrame>
  )

  return (
    <>
      <PageHero
        eyebrow={t('psc.eyebrow')}
        title={t('psc.title')}
        intro={t('psc.intro')}
        aside={aside}
        actions={
          <>
            <Link
              to={paths.login}
              className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-medium text-on-gold shadow-lg shadow-gold-glow/40 transition-all duration-200 hover:bg-gold-strong"
            >
              {t('psc.ctaButton')}
            </Link>
            <Link
              to={paths.howItWorks}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-strong px-6 py-3 text-sm font-medium text-text-muted transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              {t('psc.ctaGuide')}
            </Link>
          </>
        }
      />

      {/* What / why */}
      <Section className="band border-b border-border">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SubHeading>{t('psc.whatIsTitle')}</SubHeading>
            <p className="mt-4 text-base leading-relaxed text-text-muted">{t('psc.whatIsBody')}</p>
          </div>
          <div>
            <SubHeading>{t('psc.whyTitle')}</SubHeading>
            <p className="mt-4 text-base leading-relaxed text-text-muted">{t('psc.whyBody')}</p>
          </div>
        </div>
      </Section>

      {/* Required */}
      <Section className="border-b border-border">
        <SubHeading>{t('psc.requiredTitle')}</SubHeading>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.psc.required.map((item, index) => (
            <li
              key={item.title}
              className="lift flex h-full flex-col rounded-2xl border border-border bg-surface p-6"
            >
              <IconBadge icon={requiredIcons[index]} tone={requiredTones[index]} />
              <h3 className="mt-5 text-sm font-semibold text-text">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Flow */}
      <Section className="band-raised band-glow border-b border-border">
        <SubHeading>{t('psc.howTitle')}</SubHeading>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted">{t('psc.howBody')}</p>
        <ol className="mt-8 flex flex-wrap items-center gap-2.5">
          {dict.psc.flow.map((label, index) => (
            <li key={label} className="flex items-center gap-2.5">
              <span className="rounded-xl border border-border bg-bg px-4 py-2.5 font-mono text-sm text-text shadow-sm shadow-card-shadow">
                {label}
              </span>
              {index < dict.psc.flow.length - 1 && (
                <span aria-hidden="true" className="arrow-flip text-gold">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* Example */}
      <Section className="border-b border-border">
        <SubHeading>{t('psc.exampleTitle')}</SubHeading>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted">
          {t('psc.exampleIntro')}
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t('psc.example.account')}
            </h3>
            <p className="mt-2 font-mono text-sm text-text">Exness Standard Cent</p>
            <p className="mt-1 text-xs text-text-muted">
              {t('psc.example.balanceLine', { amount: '1,220.30' })}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t('psc.example.risk')}
            </h3>
            <p className="mt-2 font-mono text-sm text-text">100 USC</p>
            <p className="mt-1 text-xs text-text-muted">
              {t('psc.example.riskLine', {
                position: 'BUY',
                entry: '4014.73',
                sl: '4002.69',
                tp: '4052.23',
              })}
            </p>
          </div>
          <div className="surface-panel rounded-2xl border border-gold/40 p-6 shadow-lg shadow-gold-glow/20">
            <h3 className="text-xs font-medium uppercase tracking-wider text-gold">
              {t('psc.example.result')}
            </h3>
            <p className="mt-2 font-mono text-sm text-text">
              {t('psc.example.recommendedLot')}{' '}
              <span className="text-gradient-gold font-semibold">0.08</span>
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface px-5 py-5 sm:grid-cols-2">
          {[
            { label: t('psc.exampleSlDistance'), value: '12.04' },
            { label: t('psc.exampleExactLot'), value: '≈ 0.0831' },
            { label: t('psc.exampleRecommendedLot'), value: '0.08', strong: true },
            { label: t('psc.exampleRisk'), value: '≈ $1.00' },
            { label: t('psc.exampleRiskReward'), value: '≈ 1 : 3.11' },
            { label: t('psc.examplePotentialProfit'), value: '≈ $3.11' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm">
              <dt className="text-text-muted">{row.label}</dt>
              <dd className={`font-mono ${row.strong ? 'font-semibold text-gold' : 'text-text'}`}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-xs text-text-faint">{t('psc.note')}</p>
      </Section>

      {/* How to use */}
      <Section className="band border-b border-border">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <SubHeading>{t('psc.howToUseTitle')}</SubHeading>
            <ol className="mt-6 flex flex-col gap-3">
              {dict.psc.howToUse.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-mono text-xs text-gold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="self-start">
            <Callout tone="warning">{t('psc.disclaimer')}</Callout>
          </div>
        </div>
      </Section>

      {/* Mistakes */}
      <Section className="border-b border-border">
        <SubHeading>{t('psc.mistakesTitle')}</SubHeading>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {dict.psc.mistakes.map((item) => (
            <li
              key={item.title}
              className="lift flex h-full gap-4 rounded-2xl border border-border bg-surface p-6"
            >
              <IconBadge icon={IconAlert} tone="neutral" />
              <div>
                <h3 className="text-sm font-semibold text-text">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Final CTA */}
      <Section className="band-raised band-glow">
        <div className="mx-auto max-w-3xl">
          <CtaPanel
            title={t('psc.ctaTitle')}
            body={t('psc.ctaBody')}
            primary={{ to: paths.login, label: t('psc.ctaButton') }}
            secondary={{ to: paths.howItWorks, label: t('psc.ctaGuide') }}
          />
        </div>
      </Section>
    </>
  )
}

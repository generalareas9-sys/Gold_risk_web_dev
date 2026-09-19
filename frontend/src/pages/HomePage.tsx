import { Link } from 'react-router-dom'
import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Section } from '../components/layout/Section'
import { PageContainer } from '../components/layout/PageContainer'
import { WorkspacePreview } from '../components/home/WorkspacePreview'
import { SectionHeading } from '../components/common/SectionHeading'
import { IconBadge } from '../components/common/IconBadge'
import { Eyebrow } from '../components/common/Eyebrow'
import { Button } from '../components/common/Button'
import { Candles, ChartFrame, GlowOrb, Sparkline } from '../components/common/Decor'
import { Callout } from '../components/common/Callout'
import {
  IconTarget,
  IconShield,
  IconBolt,
  IconHistory,
  IconPercent,
  IconStop,
  IconRuler,
  IconScale,
  IconLayers,
  IconLock,
  IconKey,
  IconWallet,
  IconCandles,
  IconGauge,
  IconDatabase,
  IconGlobe,
  IconArrowRight,
} from '../components/common/Icons'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

type CardTone = 'gold' | 'info' | 'teal' | 'neutral'

interface FeatureCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  tone: CardTone
  title: string
  body: string
}

function FeatureCard({ icon, tone, title, body }: FeatureCardProps) {
  return (
    <div className="lift group relative overflow-hidden rounded-2xl border border-border bg-bg/70 p-7">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <IconBadge icon={icon} tone={tone} />
      <h3 className="mt-5 text-base font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{body}</p>
    </div>
  )
}

function PrimaryCTA({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex">
      <Button variant="primary" size="lg">
        <span className="inline-flex items-center gap-2">
          {children}
          <IconArrowRight
            aria-hidden="true"
            className="h-4 w-4 arrow-flip transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </span>
      </Button>
    </Link>
  )
}

function SecondaryCTA({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex">
      <Button variant="secondary" size="lg">
        {children}
      </Button>
    </Link>
  )
}

export function HomePage() {
  const { t, dict } = useLanguage()
  const home = dict.home

  const heroStats = [
    { label: t('calc.contractSize'), value: '1' },
    { label: t('calc.minMaxLot'), value: '0.01 / 200' },
    { label: t('calc.lotStep'), value: '0.01' },
  ]

  const features = [
    { icon: IconTarget, tone: 'gold' as const, card: home.features.cards[0] },
    { icon: IconShield, tone: 'info' as const, card: home.features.cards[1] },
    { icon: IconBolt, tone: 'teal' as const, card: home.features.cards[2] },
    { icon: IconHistory, tone: 'neutral' as const, card: home.features.cards[3] },
  ]

  const education = [
    { icon: IconPercent, tone: 'gold' as const, item: home.education.items[0] },
    { icon: IconStop, tone: 'info' as const, item: home.education.items[1] },
    { icon: IconRuler, tone: 'teal' as const, item: home.education.items[2] },
    { icon: IconScale, tone: 'gold' as const, item: home.education.items[3] },
    { icon: IconLayers, tone: 'info' as const, item: home.education.items[4] },
  ]

  const security = [
    { icon: IconLock, tone: 'gold' as const, card: home.security.cards[0] },
    { icon: IconKey, tone: 'info' as const, card: home.security.cards[1] },
    { icon: IconWallet, tone: 'teal' as const, card: home.security.cards[2] },
    { icon: IconHistory, tone: 'neutral' as const, card: home.security.cards[3] },
  ]

  return (
    <>
      {/* 1 — Hero + product preview */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 pattern-grid opacity-[0.55]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,var(--color-bg))]" />
          <GlowOrb className="absolute -top-40 end-[-8%] h-[32rem] w-[32rem]" />
          <GlowOrb className="absolute -bottom-48 start-[-12%] h-[26rem] w-[26rem]" />
        </div>

        <PageContainer className="relative py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl reveal">
              <div className="flex flex-wrap items-center gap-2.5">
                <Eyebrow>{home.hero.badge}</Eyebrow>
                <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-wider text-text-muted">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal" />
                  XAUUSDc
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-6xl">
                {home.hero.title}
              </h1>

              <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" aria-hidden="true" />

              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                {home.hero.body}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PrimaryCTA to={paths.login}>{home.hero.primaryCta}</PrimaryCTA>
                <SecondaryCTA to={paths.howItWorks}>{home.hero.secondaryCta}</SecondaryCTA>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="stat-tile">
                    <dt className="truncate text-[0.6875rem] uppercase tracking-wider text-text-faint">
                      {stat.label}
                    </dt>
                    <dd className="stat-value mt-1 text-sm font-semibold text-text sm:text-base">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative max-w-xl justify-self-center lg:justify-self-end">
              <GlowOrb className="absolute -inset-10 -z-10" />
              <div className="reveal" style={{ animationDelay: '120ms' }}>
                <WorkspacePreview />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 2 — Problem */}
      <Section className="band relative overflow-hidden border-b border-border">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              align="start"
              eyebrow={home.problem.eyebrow}
              title={home.problem.title}
              body={home.problem.body}
            />
            <div className="mt-8">
              <Callout tone="warning" title={t('navigation.riskManagement')}>
                {dict.risk.disclaimer}
              </Callout>
            </div>
          </div>

          <ChartFrame className="lift" caption="XAUUSD" variant="gold">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-text-muted">{home.preview.slDistance}</span>
              <span className="font-mono text-sm text-text">12.040</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-xs text-text-muted">{home.preview.recommendedLot}</span>
              <span className="font-mono text-sm font-semibold text-gold">0.08</span>
            </div>
          </ChartFrame>
        </div>
      </Section>

      {/* 3 — Workflow */}
      <Section className="relative border-b border-border">
        <SectionHeading eyebrow={home.workflow.eyebrow} title={home.workflow.title} />
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-[16%] top-8 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent sm:block"
          />
          <ol className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {home.workflow.steps.map((step, index) => (
              <li key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 bg-surface font-mono text-lg font-semibold text-gold shadow-lg shadow-card-shadow surface-glow-top">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-5 text-base font-semibold text-text">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 4 — Features */}
      <Section className="band-raised band-glow border-b border-border">
        <SectionHeading eyebrow={home.features.eyebrow} title={home.features.title} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {features.map(({ icon, tone, card }) => (
            <FeatureCard
              key={card.title}
              icon={icon}
              tone={tone}
              title={card.title}
              body={card.body}
            />
          ))}
        </div>
      </Section>

      {/* 5 — Risk education */}
      <Section className="border-b border-border">
        <SectionHeading eyebrow={home.education.eyebrow} title={home.education.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {education.map(({ icon, tone, item }, index) => (
            <div
              key={item.title}
              className={`lift flex gap-5 rounded-2xl border border-border bg-surface p-6 ${
                index === education.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <IconBadge icon={icon} tone={tone} />
              <div>
                <h3 className="text-base font-semibold text-text">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6 — Trading environment */}
      <Section className="band relative overflow-hidden border-b border-border">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="start"
              eyebrow={home.environment.eyebrow}
              title={home.environment.title}
              body={home.environment.body}
            />
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {[
                { to: paths.supportedBrokers, label: dict.navigation.supportedBrokers },
                { to: paths.supportedInstruments, label: dict.navigation.supportedInstruments },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group inline-flex items-center text-sm font-medium text-gold transition-colors duration-200 hover:text-gold-strong"
                >
                  {link.label}
                  <span aria-hidden="true" className="ms-1.5 arrow-flip transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="lift rounded-2xl border border-border bg-surface p-5">
                <IconBadge icon={IconGlobe} tone="info" size="sm" />
                <p className="mt-4 text-sm font-semibold text-text">Exness</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted">
                  Standard Cent
                </p>
              </div>
              <div className="lift rounded-2xl border border-border bg-surface p-5">
                <IconBadge icon={IconDatabase} tone="teal" size="sm" />
                <p className="mt-4 text-sm font-semibold text-text">XAUUSDc</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted">
                  1 USC = $0.01
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <dl className="grid gap-5">
              <div className="surface-panel rounded-2xl border border-border p-6 shadow-xl shadow-card-shadow">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-base font-semibold text-text">XAUUSDc</dt>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal" />
                    {home.environment.currentlyConfigured}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { label: t('calc.contractSize'), value: '1' },
                    { label: t('calc.minMaxLot'), value: '0.01 / 200' },
                    { label: t('calc.lotStep'), value: '0.01' },
                  ].map((spec) => (
                    <div key={spec.label} className="rounded-xl border border-border bg-surface/60 p-3">
                      <p className="truncate text-[0.6875rem] uppercase tracking-wider text-text-faint">
                        {spec.label}
                      </p>
                      <p className="stat-value mt-1 text-sm font-semibold text-text">{spec.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 h-20">
                  <Sparkline variant="gold" />
                </div>
              </div>
            </dl>

            <div className="surface-panel overflow-hidden rounded-2xl border border-border p-6 shadow-xl shadow-card-shadow">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-faint">
                  <IconCandles className="h-4 w-4 text-gold" />
                  {t('calc.tradeSetup')}
                </span>
                <IconGauge className="h-4 w-4 text-info" />
              </div>
              <div className="mt-4 h-32">
                <Candles />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7 — Security & accounts */}
      <Section className="band-raised band-glow border-b border-border">
        <SectionHeading eyebrow={home.security.eyebrow} title={home.security.title} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {security.map(({ icon, tone, card }) => (
            <FeatureCard
              key={card.title}
              icon={icon}
              tone={tone}
              title={card.title}
              body={card.body}
            />
          ))}
        </div>
      </Section>

      {/* 8 — Final CTA */}
      <section className="band-cta relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 pattern-lines opacity-[0.35]" />
          <GlowOrb className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2" />
        </div>
        <PageContainer className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {home.finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-text-muted">{home.finalCta.body}</p>
            <div className="mt-8 flex justify-center">
              <PrimaryCTA to={paths.login}>{home.finalCta.button}</PrimaryCTA>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  )
}
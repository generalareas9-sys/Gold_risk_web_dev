import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { PageContainer } from '../components/layout/PageContainer'
import { WorkspacePreview } from '../components/home/WorkspacePreview'
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
} from '../components/common/Icons'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'
import type { ReactNode } from 'react'

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-gold">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </p>
  )
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'center',
}: {
  eyebrow: string
  title: string
  body?: string
  align?: 'center' | 'start'
}) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {body && (
        <p className={centered ? 'mt-4 text-base text-text-muted sm:text-lg' : 'mt-4 text-base text-text-muted'}>
          {body}
        </p>
      )}
    </div>
  )
}

export function HomePage() {
  const { t, dict } = useLanguage()
  const home = dict.home

  return (
    <>
      {/* 1 — Hero + product preview */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-backdrop" aria-hidden="true" />
        <PageContainer className="relative py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <Eyebrow>{home.hero.badge}</Eyebrow>
              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-text sm:text-5xl">
                {home.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                {home.hero.body}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to={paths.positionSizeCalculator}
                  className="inline-flex items-center justify-center rounded-xl bg-gold px-7 py-3.5 text-base font-medium text-on-gold shadow-lg shadow-gold-glow/40 transition-all duration-200 hover:bg-gold-strong hover:shadow-gold-glow/60"
                >
                  {home.hero.primaryCta}
                </Link>
                <Link
                  to={paths.howItWorks}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-strong px-7 py-3.5 text-base font-medium text-text-muted transition-colors duration-200 hover:border-gold hover:text-gold"
                >
                  {home.hero.secondaryCta}
                  <span aria-hidden="true" className="arrow-flip">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="max-w-xl justify-self-center lg:justify-self-end">
              <WorkspacePreview />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 2 — Problem */}
      <Section className="band border-b border-border">
        <SectionHeading
          eyebrow={home.problem.eyebrow}
          title={home.problem.title}
          body={home.problem.body}
        />
      </Section>

      {/* 3 — Workflow */}
      <Section className="border-b border-border">
        <SectionHeading eyebrow={home.workflow.eyebrow} title={home.workflow.title} />
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-16 top-8 hidden h-px bg-border-strong sm:block"
          />
          <ol className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {home.workflow.steps.map((step, index) => (
              <li key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-border-strong bg-surface font-mono text-lg font-medium text-gold shadow-md shadow-card-shadow">
                  {index + 1}
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
          {[
            { icon: IconTarget, card: home.features.cards[0] },
            { icon: IconShield, card: home.features.cards[1] },
            { icon: IconBolt, card: home.features.cards[2] },
            { icon: IconHistory, card: home.features.cards[3] },
          ].map(({ icon: Icon, card }) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-bg p-7 transition-colors duration-200 hover:border-gold/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <Icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-text">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5 — Risk education */}
      <Section className="border-b border-border">
        <SectionHeading eyebrow={home.education.eyebrow} title={home.education.title} />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface">
          {[
            { icon: IconPercent, item: home.education.items[0] },
            { icon: IconStop, item: home.education.items[1] },
            { icon: IconRuler, item: home.education.items[2] },
            { icon: IconScale, item: home.education.items[3] },
            { icon: IconLayers, item: home.education.items[4] },
          ].map(({ icon: Icon, item }) => (
            <div key={item.title} className="flex gap-5 p-6 sm:p-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6 — Trading environment */}
      <Section className="band border-b border-border">
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
                  className="text-sm font-medium text-gold transition-colors duration-200 hover:text-gold-strong"
                >
                  {link.label}
                  <span aria-hidden="true" className="ms-1.5 arrow-flip">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <dl className="grid gap-5">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-base font-semibold text-text">Exness</dt>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {home.environment.currentlyConfigured}
                </span>
              </div>
              <p className="mt-2 font-mono text-sm uppercase tracking-wider text-text-muted">
                Standard Cent
              </p>
              <p className="mt-3 font-mono text-xs text-text-faint">1 USC = $0.01</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-base font-semibold text-text">
                  XAUUSDc
                </dt>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {home.environment.currentlyConfigured}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-xs text-text-muted">
                <span>
                  {t('calc.contractSize')}: <span className="text-text">1</span>
                </span>
                <span>
                  {t('calc.minMaxLot')}: <span className="text-text">0.01 / 200</span>
                </span>
                <span>
                  {t('calc.lotStep')}: <span className="text-text">0.01</span>
                </span>
              </div>
            </div>
          </dl>
        </div>
      </Section>

      {/* 7 — Security & accounts */}
      <Section className="band-raised band-glow border-b border-border">
        <SectionHeading eyebrow={home.security.eyebrow} title={home.security.title} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {[
            { icon: IconLock, card: home.security.cards[0] },
            { icon: IconKey, card: home.security.cards[1] },
            { icon: IconWallet, card: home.security.cards[2] },
            { icon: IconHistory, card: home.security.cards[3] },
          ].map(({ icon: Icon, card }) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-bg p-7 transition-colors duration-200 hover:border-gold/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <Icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-text">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 8 — Final CTA */}
      <section className="band-cta relative overflow-hidden">
        <div className="hero-backdrop" aria-hidden="true" />
        <PageContainer className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {home.finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-text-muted">{home.finalCta.body}</p>
            <Link
              to={paths.positionSizeCalculator}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-gold px-8 py-4 text-base font-medium text-on-gold shadow-lg shadow-gold-glow/40 transition-all duration-200 hover:bg-gold-strong hover:shadow-gold-glow/60"
            >
              {home.finalCta.button}
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  )
}
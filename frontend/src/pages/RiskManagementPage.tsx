import { Section } from '../components/layout/Section'
import { PageHero } from '../components/common/PageHero'
import { IconBadge } from '../components/common/IconBadge'
import { Callout } from '../components/common/Callout'
import { CtaPanel } from '../components/common/CtaPanel'
import {
  IconTarget,
  IconStop,
  IconScale,
  IconShield,
} from '../components/common/Icons'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

const principleIcons = [IconTarget, IconStop, IconScale, IconShield]
const principleTones = ['gold', 'info', 'teal', 'neutral'] as const

export function RiskManagementPage() {
  const { t, dict } = useLanguage()

  return (
    <>
      <PageHero eyebrow={t('risk.eyebrow')} title={t('risk.title')} intro={t('risk.intro')} />

      <Section className="band border-b border-border">
        <div className="grid gap-5 sm:grid-cols-2">
          {dict.risk.principles.map((principle, index) => (
            <div
              key={principle.title}
              className="lift rounded-2xl border border-border bg-surface p-6"
            >
              <IconBadge icon={principleIcons[index]} tone={principleTones[index]} />
              <h2 className="mt-5 text-base font-semibold text-text">{principle.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{principle.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <Callout tone="warning" title={t('risk.title')}>
            {t('risk.disclaimer')}
          </Callout>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <CtaPanel
            title={t('risk.ctaTitle')}
            body={t('risk.ctaBody')}
            primary={{ to: paths.login, label: t('risk.ctaButton') }}
            secondary={{ to: paths.positionSizeCalculator, label: dict.psc.title }}
          />
        </div>
      </Section>
    </>
  )
}

import { Section } from '../components/layout/Section'
import { PageHero } from '../components/common/PageHero'
import { IconBadge } from '../components/common/IconBadge'
import { CtaPanel } from '../components/common/CtaPanel'
import {
  IconWallet,
  IconPercent,
  IconTarget,
  IconCalculator,
  IconCheck,
} from '../components/common/Icons'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

const stepIcons = [IconWallet, IconPercent, IconTarget, IconCalculator, IconCheck]
const stepTones = ['gold', 'info', 'teal', 'gold', 'info'] as const

export function HowItWorksPage() {
  const { t, dict } = useLanguage()

  return (
    <>
      <PageHero eyebrow={t('hiw.eyebrow')} title={t('hiw.title')} intro={t('hiw.intro')} />

      <Section className="relative pt-12">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute bottom-8 start-6 top-4 w-px bg-gradient-to-b from-gold/50 via-border-strong to-transparent"
            />
            <ol className="relative flex flex-col gap-8">
              {dict.hiw.steps.map((step, index) => (
                <li key={step.title} className="relative flex gap-5">
                  <div className="relative z-10">
                    <IconBadge icon={stepIcons[index]} tone={stepTones[index]} />
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-text-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-lg font-semibold text-text">{step.title}</h2>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <CtaPanel
            className="mt-14"
            title={t('hiw.ctaTitle')}
            body={t('hiw.ctaBody')}
            primary={{ to: paths.positionSizeCalculator, label: t('hiw.ctaButton') }}
            secondary={{ to: paths.riskManagement, label: t('risk.title') }}
          />
        </div>
      </Section>
    </>
  )
}

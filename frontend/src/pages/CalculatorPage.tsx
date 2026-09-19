import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { PageContainer } from '../components/layout/PageContainer'
import { Calculator } from '../components/calculator/Calculator'
import { WorkspaceHeader } from '../components/common/WorkspaceHeader'
import { IconBadge } from '../components/common/IconBadge'
import {
  IconStop,
  IconPercent,
  IconScale,
  IconChart,
  IconWallet,
  IconRuler,
  IconLayers,
  IconCalculator,
  IconTarget,
  IconCheck,
} from '../components/common/Icons'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

const stepIcons = [IconWallet, IconPercent, IconTarget, IconLayers, IconCalculator, IconRuler, IconCheck]
const stepTones = ['gold', 'info', 'teal', 'gold', 'info', 'teal', 'neutral'] as const
const topicIcons = [IconStop, IconPercent, IconScale, IconChart]
const topicTones = ['gold', 'info', 'teal', 'neutral'] as const

export function CalculatorPage() {
  const { t, dict } = useLanguage()

  return (
    <Section className="pt-10 sm:pt-12">
      <PageContainer>
        <WorkspaceHeader
          eyebrow={t('navigation.calculator')}
          title={t('calcPage.title')}
          subtitle={t('calcPage.subtitle')}
        />

        <div className="mt-8">
          <Calculator />
        </div>

        <section aria-labelledby="calc-guide-title" className="band-raised band-glow mt-16 rounded-3xl border border-border px-6 py-12 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="calc-guide-title" className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              {dict.calcGuide.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-muted">{dict.calcGuide.intro}</p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.calcGuide.steps.map((step, index) => (
              <li
                key={step.title}
                className="lift flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5"
              >
                <IconBadge icon={stepIcons[index]} tone={stepTones[index]} size="sm" />
                <h3 className="text-sm font-semibold text-text">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {dict.calcGuide.topics.map((topic, index) => (
              <article
                key={topic.title}
                className="lift flex gap-4 rounded-2xl border border-border bg-surface-raised p-6"
              >
                <IconBadge icon={topicIcons[index % topicIcons.length]} tone={topicTones[index % topicTones.length]} />
                <div>
                  <h3 className="text-sm font-semibold text-text">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{topic.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <p className="mt-12 text-xs leading-relaxed text-text-faint">
          {t('calcPage.historyNotePre')}
          <Link to={paths.history} className="text-gold hover:text-gold-strong">
            {t('navigation.history')}
          </Link>
          {t('calcPage.historyNotePost')}
        </p>
      </PageContainer>
    </Section>
  )
}

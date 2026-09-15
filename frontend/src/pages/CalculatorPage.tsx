import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { PageContainer } from '../components/layout/PageContainer'
import { Calculator } from '../components/calculator/Calculator'
import { IconStop, IconPercent, IconScale, IconChart } from '../components/common/Icons'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

/**
 * Authenticated workspace page. The position-size calculator lives here,
 * inside the private area — visitors approaching the public site learn about
 * position sizing on the public Position Size Calculator page instead.
 */
export function CalculatorPage() {
  const { t, dict } = useLanguage()
  const topicIcons = [IconStop, IconPercent, IconScale, IconChart]

  return (
    <Section className="pt-10 sm:pt-12">
      <PageContainer>
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-text sm:text-4xl">{t('calcPage.title')}</h1>
          <p className="mt-2 max-w-2xl text-base text-text-muted">{t('calcPage.subtitle')}</p>
        </div>

        <Calculator />

        <section aria-labelledby="calc-guide-title" className="band-raised mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="calc-guide-title" className="text-2xl font-semibold text-text sm:text-3xl">
              {dict.calcGuide.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-muted">{dict.calcGuide.intro}</p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.calcGuide.steps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-gold/40"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gold/10 font-mono text-sm font-semibold text-gold">
                  {index + 1}
                </span>
                <h3 className="text-sm font-semibold text-text">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {dict.calcGuide.topics.map((topic, index) => {
              const TopicIcon = topicIcons[index % topicIcons.length]
              return (
                <article
                  key={topic.title}
                  className="rounded-2xl border border-border bg-surface-raised p-6"
                >
                  <h3 className="flex items-center gap-2.5 text-sm font-semibold text-text">
                    <TopicIcon className="h-4.5 w-4.5 text-gold" aria-hidden="true" />
                    {topic.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-muted">{topic.body}</p>
                </article>
              )
            })}
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
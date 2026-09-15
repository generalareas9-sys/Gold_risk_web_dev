import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { Card } from '../components/common/Card'
import { paths } from '../routes/paths'
import { useLanguage } from '../i18n/useLanguage'

export function HowItWorksPage() {
  const { t, dict } = useLanguage()

  return (
    <>
      <Section className="border-b border-border pb-10 pt-14 sm:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-gold">
            {t('hiw.eyebrow')}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text sm:text-4xl">{t('hiw.title')}</h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('hiw.intro')}</p>
        </div>
      </Section>

      <Section className="pt-10">
        <div className="max-w-2xl">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute bottom-6 start-5 top-3 w-px bg-gradient-to-b from-gold/40 via-border-strong to-transparent"
            />
            <ol className="relative flex flex-col gap-8">
              {dict.hiw.steps.map((step, index) => (
                <li key={step.title} className="relative flex gap-4">
                  <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg font-mono text-base text-gold">
                    {index + 1}
                  </span>
                  <div className="pt-1">
                    <h2 className="text-lg font-semibold text-text">{step.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Card className="bg-surface-raised mt-12 flex flex-col gap-3 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-4 sm:text-start">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-text">{t('hiw.ctaTitle')}</h2>
              <p className="mt-1 text-sm text-text-muted">{t('hiw.ctaBody')}</p>
            </div>
            <Link
              to={paths.positionSizeCalculator}
              className="inline-flex items-center justify-center rounded border border-border-strong px-6 py-3 text-sm font-medium text-text-muted transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              {t('hiw.ctaButton')}
            </Link>
          </Card>
        </div>
      </Section>
    </>
  )
}
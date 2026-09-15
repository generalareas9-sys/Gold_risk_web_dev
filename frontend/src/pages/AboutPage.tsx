import { Section } from '../components/layout/Section'
import { useLanguage } from '../i18n/useLanguage'

export function AboutPage() {
  const { t } = useLanguage()

  return (
    <>
      <Section className="border-b border-border pb-10 pt-14 sm:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-gold">
            {t('about.eyebrow')}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text sm:text-4xl">{t('about.title')}</h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t('about.intro')}</p>
        </div>
      </Section>

      <Section className="pt-10">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-text">{t('about.focusTitle')}</h2>
          <p className="mt-3 text-base leading-relaxed text-text-muted">{t('about.focusBody')}</p>

          <h2 className="mt-8 text-xl font-semibold text-text">{t('about.notDoTitle')}</h2>
          <p className="mt-3 text-base leading-relaxed text-text-muted">{t('about.notDoBody')}</p>

          <h2 className="mt-8 text-xl font-semibold text-text">{t('about.transparencyTitle')}</h2>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            {t('about.transparencyBody')}
          </p>
        </div>
      </Section>
    </>
  )
}
import { Section } from '../components/layout/Section'
import { PageHero } from '../components/common/PageHero'
import { IconBadge } from '../components/common/IconBadge'
import { Candles } from '../components/common/Decor'
import { IconTarget, IconAlert, IconShield } from '../components/common/Icons'
import { useLanguage } from '../i18n/useLanguage'

export function AboutPage() {
  const { t } = useLanguage()

  const aside = (
    <div className="surface-panel relative overflow-hidden rounded-2xl border border-border p-6 shadow-2xl shadow-card-shadow">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-grid opacity-40" />
      <div className="relative h-40">
        <Candles />
      </div>
      <div className="relative mt-4 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-2 font-medium uppercase tracking-wider text-text-faint">
          <span className="h-2 w-2 rounded-full bg-gold" />
          XAUUSD
        </span>
        <span className="font-mono text-text-faint">{t('about.eyebrow')}</span>
      </div>
    </div>
  )

  const blocks = [
    { icon: IconTarget, tone: 'gold' as const, title: t('about.focusTitle'), body: t('about.focusBody') },
    { icon: IconAlert, tone: 'info' as const, title: t('about.notDoTitle'), body: t('about.notDoBody') },
    { icon: IconShield, tone: 'teal' as const, title: t('about.transparencyTitle'), body: t('about.transparencyBody') },
  ]

  return (
    <>
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')} intro={t('about.intro')} aside={aside} />

      <Section className="band border-b border-border">
        <div className="grid gap-5 md:grid-cols-2">
          {blocks.map((block, index) => (
            <div
              key={block.title}
              className={`lift rounded-2xl border border-border bg-surface p-7 ${
                index === blocks.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <IconBadge icon={block.icon} tone={block.tone} />
              <h2 className="mt-5 text-lg font-semibold text-text">{block.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{block.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

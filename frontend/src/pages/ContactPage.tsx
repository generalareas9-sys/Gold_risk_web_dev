import { PlaceholderPage } from './PlaceholderPage'
import { IconMail } from '../components/common/Icons'
import { useLanguage } from '../i18n/useLanguage'

export function ContactPage() {
  const { t } = useLanguage()

  return (
    <PlaceholderPage
      eyebrow={t('navigation.contact')}
      title={t('contact.title')}
      description={t('contact.description')}
    >
      <a
        href="mailto:hello@goldrisk.app"
        className="inline-flex items-center gap-2.5 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 font-mono text-sm font-medium text-gold transition-colors duration-200 hover:bg-gold/15 hover:text-gold-strong"
      >
        <IconMail aria-hidden="true" className="h-4 w-4" />
        hello@goldrisk.app
      </a>
    </PlaceholderPage>
  )
}
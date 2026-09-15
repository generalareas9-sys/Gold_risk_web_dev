import { PlaceholderPage } from './PlaceholderPage'
import { useLanguage } from '../i18n/useLanguage'

export function ContactPage() {
  const { t } = useLanguage()

  return (
    <PlaceholderPage title={t('contact.title')} description={t('contact.description')}>
      <a
        href="mailto:hello@goldrisk.app"
        className="text-sm font-medium text-gold transition-colors duration-200 hover:text-gold-strong"
      >
        hello@goldrisk.app
      </a>
    </PlaceholderPage>
  )
}
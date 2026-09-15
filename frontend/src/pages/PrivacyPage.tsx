import { PlaceholderPage } from './PlaceholderPage'
import { useLanguage } from '../i18n/useLanguage'

export function PrivacyPage() {
  const { t } = useLanguage()

  return <PlaceholderPage title={t('privacy.title')} description={t('privacy.description')} />
}
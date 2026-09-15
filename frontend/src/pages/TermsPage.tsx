import { PlaceholderPage } from './PlaceholderPage'
import { useLanguage } from '../i18n/useLanguage'

export function TermsPage() {
  const { t } = useLanguage()

  return <PlaceholderPage title={t('terms.title')} description={t('terms.description')} />
}
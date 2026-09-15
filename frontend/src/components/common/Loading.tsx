import { useLanguage } from '../../i18n/useLanguage'

interface LoadingProps {
  label?: string
}

export function Loading({ label }: LoadingProps) {
  const { t } = useLanguage()
  const text = label ?? t('common.loading')
  return (
    <div role="status" className="flex items-center gap-3 py-6 text-text-muted">
      <span
        aria-hidden="true"
        className="h-4 w-4 animate-spin rounded-full border-2 border-border-strong border-t-gold"
      />
      <span className="text-sm">{text}…</span>
    </div>
  )
}
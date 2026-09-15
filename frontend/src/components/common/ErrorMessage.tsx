import { useLanguage } from '../../i18n/useLanguage'

interface ErrorMessageProps {
  title?: string
  message: string
}

export function ErrorMessage({ title, message }: ErrorMessageProps) {
  const { t } = useLanguage()
  const heading = title ?? t('common.somethingWentWrong')
  return (
    <div
      role="alert"
      className="flex flex-col gap-1 rounded-xl border border-error bg-error-muted px-4 py-3"
    >
      <p className="text-sm font-medium text-text">{heading}</p>
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  )
}
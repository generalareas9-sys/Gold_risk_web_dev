interface ErrorMessageProps {
  title?: string
  message: string
}

export function ErrorMessage({ title = 'Something went wrong', message }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-1 rounded-md border border-error bg-error-muted px-4 py-3"
    >
      <p className="text-sm font-medium text-text">{title}</p>
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  )
}

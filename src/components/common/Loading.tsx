interface LoadingProps {
  label?: string
}

export function Loading({ label = 'Loading' }: LoadingProps) {
  return (
    <div role="status" className="flex items-center gap-3 py-6 text-text-muted">
      <span
        aria-hidden="true"
        className="h-4 w-4 animate-spin rounded-full border-2 border-border-strong border-t-gold"
      />
      <span className="text-sm">{label}…</span>
    </div>
  )
}

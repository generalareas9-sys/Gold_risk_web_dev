import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  errorMessage?: string
}

export function Input({
  label,
  hint,
  errorMessage,
  id,
  className,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = errorMessage ? `${inputId}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-text-muted">
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={Boolean(errorMessage)}
        className={cn(
          'rounded border bg-surface px-3.5 py-2.5 font-mono text-sm text-text placeholder:text-text-faint placeholder:font-sans',
          'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
          errorMessage ? 'border-error' : 'border-border-strong',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      {hint && !errorMessage && (
        <p id={hintId} className="text-xs text-text-faint">
          {hint}
        </p>
      )}
      {errorMessage && (
        <p id={errorId} className="text-xs text-error">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

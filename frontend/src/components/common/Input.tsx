import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  errorMessage?: string
  /** Optional decorative icon rendered inside the input at the logical
   *  start (RTL-aware). Treated as aria-hidden. */
  startSlot?: ReactNode
  /** Optional action (e.g. a visibility toggle) rendered inside the input
   *  at the logical end, aligned with the field and aware of RTL direction. */
  endSlot?: ReactNode
}

export function Input({
  label,
  hint,
  errorMessage,
  startSlot,
  endSlot,
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
      <div className="relative">
        <input
          id={inputId}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={Boolean(errorMessage)}
          className={cn(
            'rounded-xl border bg-surface px-3.5 py-2.5 font-mono text-sm text-text transition-colors duration-150',
            'placeholder:text-text-faint placeholder:font-sans',
            'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
            errorMessage ? 'border-error' : 'border-border-strong hover:border-gold/40',
            'disabled:cursor-not-allowed disabled:opacity-50',
            startSlot ? 'ps-11' : undefined,
            endSlot ? 'pe-11' : undefined,
            className,
          )}
          {...props}
        />
        {startSlot && (
          <div
            aria-hidden="true"
            className="absolute start-3.5 top-1/2 -translate-y-1/2 text-text-faint"
          >
            {startSlot}
          </div>
        )}
        {endSlot && (
          <div className="absolute end-1.5 top-1/2 -translate-y-1/2">{endSlot}</div>
        )}
      </div>
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

import { useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  hint?: string
  children: ReactNode
}

export function Select({
  label,
  hint,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const hintId = hint ? `${selectId}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-text-muted">
        {label}
      </label>
      <select
        id={selectId}
        aria-describedby={hintId}
        className={cn(
          'rounded border border-border-strong bg-surface px-3.5 py-2.5 text-sm text-text',
          'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {hint && (
        <p id={hintId} className="text-xs text-text-faint">
          {hint}
        </p>
      )}
    </div>
  )
}

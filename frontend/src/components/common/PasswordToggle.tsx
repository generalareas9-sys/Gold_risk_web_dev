import { IconEye, IconEyeOff } from './Icons'

interface PasswordToggleProps {
  shown: boolean
  onToggle: () => void
  /** Accessible label describing the current action, e.g. "Show password". */
  label: string
}

/**
 * Eye / eye-off visibility toggle for password inputs. Sit position is
 * handled by the caller (see `Input.endSlot`), which uses logical
 * `end-*` utilities so it mirrors correctly under RTL.
 */
export function PasswordToggle({ shown, onToggle, label }: PasswordToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={shown}
      className="flex h-8 w-8 items-center justify-center rounded-md text-text-faint transition-colors duration-150 hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
    >
      {shown ? <IconEyeOff className="h-4.5 w-4.5" /> : <IconEye className="h-4.5 w-4.5" />}
    </button>
  )
}
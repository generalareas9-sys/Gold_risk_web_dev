import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-b from-gold-strong to-gold text-on-gold shadow-md shadow-gold-glow/40 hover:from-gold hover:to-gold-strong hover:shadow-gold-glow/60 active:from-gold-muted active:to-gold-muted disabled:from-gold-muted disabled:to-gold-muted disabled:text-text-faint',
  secondary:
    'bg-transparent text-text border border-border-strong hover:border-gold hover:text-gold hover:shadow-md hover:shadow-gold-glow/20 disabled:text-text-faint disabled:border-border',
  ghost:
    'bg-transparent text-text-muted hover:text-text disabled:text-text-faint',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-normal transition-all duration-150 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

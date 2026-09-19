import type { ComponentType, SVGProps } from 'react'
import { cn } from '../../utils/cn'

type IconBadgeTone = 'gold' | 'info' | 'teal' | 'neutral'
type IconBadgeSize = 'sm' | 'md' | 'lg'

interface IconBadgeProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  tone?: IconBadgeTone
  size?: IconBadgeSize
  className?: string
}

const toneClasses: Record<IconBadgeTone, string> = {
  gold: 'border-gold/30 bg-gold/10 text-gold',
  info: 'border-info/30 bg-info/10 text-info',
  teal: 'border-teal/30 bg-teal/10 text-teal',
  neutral: 'border-border-strong bg-surface-raised text-text-muted',
}

const sizeClasses: Record<IconBadgeSize, string> = {
  sm: 'h-9 w-9 rounded-lg',
  md: 'h-11 w-11 rounded-xl',
  lg: 'h-14 w-14 rounded-2xl',
}

const iconSizes: Record<IconBadgeSize, string> = {
  sm: 'h-4.5 w-4.5',
  md: 'h-5.5 w-5.5',
  lg: 'h-6.5 w-6.5',
}

export function IconBadge({
  icon: Icon,
  tone = 'gold',
  size = 'md',
  className,
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center border shadow-sm shadow-card-shadow',
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
    >
      <Icon className={iconSizes[size]} />
    </span>
  )
}

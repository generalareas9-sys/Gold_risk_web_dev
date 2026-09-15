import { useState } from 'react'
import { cn } from '../../utils/cn'

interface LogoProps {
  className?: string
}

/**
 * Renders the GoldRisk logo from `public/assets/logo.svg`.
 *
 * No logo asset exists yet in this phase, so this falls back to a plain
 * text wordmark. Once the real file is dropped into `public/assets/`, the
 * image will load automatically — no other change is needed.
 */
export function Logo({ className }: LogoProps) {
  const [imageFailed, setImageFailed] = useState(false)

  if (imageFailed) {
    return (
      <span className={cn('text-lg font-semibold tracking-tight text-text', className)}>
        Gold<span className="text-gold">Risk</span>
      </span>
    )
  }

  return (
    <img
      src="/assets/logo.svg"
      alt="GoldRisk"
      className={cn('h-7 w-auto', className)}
      onError={() => setImageFailed(true)}
    />
  )
}

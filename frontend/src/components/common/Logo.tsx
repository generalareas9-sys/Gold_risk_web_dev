import { useState } from 'react'
import { cn } from '../../utils/cn'

interface LogoProps {
  /** Sizing class, e.g. "h-8" or "h-10". The mark scales from it. */
  className?: string
}

const MONOGRAM_PATH =
  'M16 8a8 8 0 1 0 7.94 9.02.6.6 0 0 0-.6-.68H17a.6.6 0 0 0-.6.6v1.53a.6.6 0 0 0 .6.6h2.77A5.6 5.6 0 1 1 21.2 12.2a.6.6 0 0 0 .84.06l1.2-.98a.6.6 0 0 0 .07-.85A8 8 0 0 0 16 8Z'

/**
 * GoldRisk icon mark — `public/assets/logo.svg` (the official gold monogram
 * on a dark plate). Usage is always icon-only here; text/wordmark treatment
 * is composed by callers (e.g. `Brand` in the navbar).
 *
 * The resting state is the full-color asset, unmodified. If the file cannot
 * load, a matching inline monogram is shown so the mark is never blank. No
 * grayscale, opacity, or blur filters are ever applied. Sizing is supplied
 * by the caller via `className` (the image fills the span's height).
 */
export function Logo({ className }: LogoProps) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <span className={cn('inline-flex shrink-0 items-center', className)}>
      {imageFailed ? (
        <svg viewBox="0 0 32 32" className="h-full w-auto" aria-hidden="true">
          <path d={MONOGRAM_PATH} fill="#C6A15B" />
        </svg>
      ) : (
        <img
          src="/assets/logo.svg"
          alt="GoldRisk"
          className="h-full w-auto"
          onError={() => setImageFailed(true)}
        />
      )}
    </span>
  )
}
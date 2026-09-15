import { Logo } from './Logo'

/**
 * Navbar brand block: [logo mark] GOLDRISK.
 *
 * A deliberate split between decoration (the official monogram) and identity
 * (the prominent, letter-spaced wordmark), so the brand reads as a real
 * product identity rather than a nav link. Hover/focus treatment (the cool
 * blue light that sweeps across the brand) is driven by the parent's
 * `.brand-trigger` class in index.css and is reduced-motion safe.
 */
export function Brand() {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap sm:gap-3">
      <Logo className="h-7 sm:h-9" />
      <span className="brand-wordmark inline-block text-[15px] font-bold tracking-[0.18em] text-text sm:text-xl lg:text-[1.35rem]">
        GOLDRISK
      </span>
      <span aria-hidden="true" className="brand-sweep" />
    </span>
  )
}
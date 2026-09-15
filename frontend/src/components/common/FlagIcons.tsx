/**
 * Consistent hand-drawn SVG flags for the 7 supported languages.
 *
 * Flags are plain vector shapes on a shared 64x48 canvas so every option
 * renders at identical proportions (rendered via the `FlagBadge` frame at
 * 24x16). No emoji fonts, no external assets — works identically in dark
 * and light themes.
 */

import type { SVGProps, ReactElement } from 'react'
import type { LangCode } from '../../i18n/types'
import { cn } from '../../utils/cn'

type FlagComponent = (props: SVGProps<SVGSVGElement>) => ReactElement

function UnionJack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" {...props}>
      <rect width="64" height="48" fill="#fff" />
      <g stroke="#012169" strokeWidth="12.8">
        <line x1="0" y1="0" x2="64" y2="48" />
        <line x1="64" y1="0" x2="0" y2="48" />
      </g>
      <g stroke="#fff" strokeWidth="9.6">
        <line x1="0" y1="0" x2="64" y2="48" />
        <line x1="64" y1="0" x2="0" y2="48" />
      </g>
      <g stroke="#C8102E" strokeWidth="4.4" strokeLinecap="square">
        <line x1="6" y1="-4" x2="58" y2="52" />
        <line x1="58" y1="-4" x2="6" y2="52" />
      </g>
      <g fill="#fff">
        <rect y="19.5" width="64" height="9" />
        <rect x="27.5" width="9" height="48" />
      </g>
      <g fill="#C8102E">
        <rect y="21.75" width="64" height="4.5" />
        <rect x="29.75" width="4.5" height="48" />
      </g>
    </svg>
  )
}

function Ethiopia(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" {...props}>
      <rect width="64" height="48" fill="#078930" />
      <rect y="16" width="64" height="16" fill="#FCDD09" />
      <rect y="32" width="64" height="16" fill="#DA121A" />
    </svg>
  )
}

function Spain(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" {...props}>
      <rect width="64" height="48" fill="#F1BF00" />
      <rect width="64" height="8" fill="#AA151B" />
      <rect y="40" width="64" height="8" fill="#AA151B" />
    </svg>
  )
}

function France(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" {...props}>
      <rect width="64" height="48" fill="#fff" />
      <rect width="21.3" height="48" fill="#0055A4" />
      <rect x="42.7" width="21.3" height="48" fill="#EF4135" />
    </svg>
  )
}

function Germany(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" {...props}>
      <rect width="64" height="48" fill="#000" />
      <rect y="16" width="64" height="16" fill="#DD0000" />
      <rect y="32" width="64" height="16" fill="#FFCE00" />
    </svg>
  )
}

function Portugal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" {...props}>
      <rect width="64" height="48" fill="#DA291C" />
      <rect width="25.6" height="48" fill="#046A38" />
      <circle cx="28" cy="24" r="12" fill="none" stroke="#FFE900" strokeWidth="1.6" />
      <circle cx="28" cy="24" r="8.5" fill="#FFE900" />
    </svg>
  )
}

function SaudiArabia(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" {...props}>
      <rect width="64" height="48" fill="#00703C" />
      <g fill="#fff">
        <path d="M14 9.5h36a3.5 3.5 0 0 1 3.5 3.5v2H10.5v-2A3.5 3.5 0 0 1 14 9.5z" />
        <path d="M25 17.5h22a3 3 0 0 1 3 3v1.5H22V20.5a3 3 0 0 1 3-3z" />
        <path d="M24 34 51 18l2.2 3.2L26.2 37.2z" />
        <rect x="18" y="32.5" width="5.5" height="7.5" rx="1.2" />
        <rect x="19" y="40" width="3.5" height="4.5" rx="1" />
      </g>
    </svg>
  )
}

const FLAGS: Record<LangCode, FlagComponent> = {
  en: UnionJack,
  am: Ethiopia,
  ar: SaudiArabia,
  es: Spain,
  fr: France,
  de: Germany,
  pt: Portugal,
}

export interface FlagIconProps {
  code: LangCode
  className?: string
}

/** Renders the raw flag graphic for a language code (accessible name is the caller's job). */
export function FlagIcon({ code, className }: FlagIconProps) {
  const Component = FLAGS[code] ?? FLAGS.en
  return <Component aria-hidden="true" className={cn('h-full w-full', className)} />
}

export interface FlagBadgeProps {
  code: LangCode
  /** Accessible name, e.g. the native language name. */
  label: string
  className?: string
}

/** Framed 24x16 flag with a proper accessible name, readable in both themes. */
export function FlagBadge({ code, label, className }: FlagBadgeProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        'inline-flex h-4 w-6 shrink-0 select-none overflow-hidden rounded-[3px] ring-1 ring-black/10 dark:ring-white/20',
        className,
      )}
    >
      <FlagIcon code={code} />
    </span>
  )
}
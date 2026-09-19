import type { SVGProps } from 'react'

/**
 * Consistent 24×24 stroke icon set used across the marketing pages.
 * All icons inherit `currentColor` so they can be tinted with Tailwind
 * text utilities (text-gold, text-text-muted, …).
 */
type IconProps = SVGProps<SVGSVGElement>

function base(props: IconProps): SVGProps<SVGSVGElement> {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    ...props,
  }
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="1.5" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22.5" y2="12" />
    </svg>
  )
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.5l7.5 3v6c0 4.5-3 7.9-7.5 9.5C7.5 19.4 4.5 16 4.5 11.5v-6l7.5-3z" />
      <path d="M9 11.5l2.2 2.2L15.5 9" />
    </svg>
  )
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 2.5L4.5 13.5H10.5L9 21.5 19.5 9.5H12.5L13 2.5z" />
    </svg>
  )
}

export function IconHistory(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v4h4" />
      <path d="M12 8v4l3 2" />
    </svg>
  )
}

export function IconPercent(props: IconProps) {
  return (
    <svg {...base(props)}>
      <line x1="5.5" y1="18.5" x2="18.5" y2="5.5" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  )
}

export function IconStop(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  )
}

export function IconRuler(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="9" width="19" height="6" rx="1.5" transform="rotate(-30 12 12)" />
      <line x1="14" y1="6" x2="15" y2="4.5" transform="rotate(-30 12 12)" />
      <line x1="10" y1="8" x2="11" y2="6.5" transform="rotate(-30 12 12)" />
    </svg>
  )
}

export function IconScale(props: IconProps) {
  return (
    <svg {...base(props)}>
      <line x1="12" y1="3.5" x2="12" y2="20.5" />
      <line x1="5.5" y1="6" x2="18.5" y2="6" />
      <path d="M5.5 6a4.5 3 0 0 0 0 6 4.5 3 0 0 0 0-6z" />
      <path d="M18.5 6a4.5 3 0 0 0 0 6 4.5 3 0 0 0 0-6z" />
    </svg>
  )
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.5l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16.5l9 5 9-5" />
    </svg>
  )
}

export function IconLock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <circle cx="12" cy="15.5" r="1.6" />
    </svg>
  )
}

export function IconKey(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="8" cy="8" r="3.5" />
      <path d="M10.5 10.5L20 20" />
      <path d="M17 17l2.5-2.5" />
    </svg>
  )
}

export function IconWallet(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h13v13h-13a2 2 0 0 1-2-2v-9z" />
      <path d="M3.5 9.5h17v4h-4.5a1.5 1.5 0 0 1 0-3H20.5" />
    </svg>
  )
}

export function IconChart(props: IconProps) {
  return (
    <svg {...base(props)}>
      <line x1="4" y1="19" x2="20" y2="19" />
      <line x1="8" y1="15" x2="8" y2="19" />
      <line x1="12.5" y1="11" x2="12.5" y2="19" />
      <line x1="17" y1="7" x2="17" y2="19" />
    </svg>
  )
}

export function IconEye(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  )
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  )
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </svg>
  )
}

export function IconCalculator(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4.5" y="2.5" width="15" height="19" rx="2.5" />
      <line x1="7.8" y1="6" x2="16.2" y2="6" />
      <line x1="7.8" y1="10.5" x2="10.5" y2="10.5" />
      <line x1="13.5" y1="10.5" x2="16.2" y2="10.5" />
      <line x1="7.8" y1="14.5" x2="10.5" y2="14.5" />
      <line x1="13.5" y1="14.5" x2="16.2" y2="14.5" />
      <line x1="7.8" y1="18.5" x2="16.2" y2="18.5" />
    </svg>
  )
}

export function IconTrendUp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 18l6-6 4 4 6-7" />
      <path d="M15 9h5v5" />
    </svg>
  )
}

export function IconTrendDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6l6 6 4-4 6 7" />
      <path d="M15 15h5v-5" />
    </svg>
  )
}

export function IconEyeOff(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <path d="M9.9 9.9a2.8 2.8 0 0 0 4.2 4.2" />
      <line x1="4" y1="20" x2="20" y2="4" />
    </svg>
  )
}

export function IconCandles(props: IconProps) {
  return (
    <svg {...base(props)}>
      <line x1="7" y1="4" x2="7" y2="9" />
      <rect x="5" y="9" width="4" height="7" rx="1" />
      <line x1="7" y1="16" x2="7" y2="20" />
      <line x1="12.5" y1="3" x2="12.5" y2="7" />
      <rect x="10.5" y="7" width="4" height="5" rx="1" />
      <line x1="12.5" y1="12" x2="12.5" y2="17" />
      <line x1="18" y1="6" x2="18" y2="11" />
      <rect x="16" y="11" width="4" height="6" rx="1" />
      <line x1="18" y1="17" x2="18" y2="21" />
    </svg>
  )
}

export function IconGauge(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 18a8.5 8.5 0 1 1 17 0" />
      <line x1="12" y1="18" x2="16" y2="11.5" />
      <circle cx="12" cy="18" r="1.4" />
    </svg>
  )
}

export function IconDatabase(props: IconProps) {
  return (
    <svg {...base(props)}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
      <path d="M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
    </svg>
  )
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 3 2.6 15 0 18-2.6-3-2.6-15 0-18z" />
    </svg>
  )
}

export function IconRocket(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2" />
      <path d="M9 14l-3-3c1-5 5-9 12-9 0 7-4 11-9 12z" />
      <circle cx="14.5" cy="9.5" r="1.6" />
    </svg>
  )
}

export function IconBook(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h13v15H6a2 2 0 0 0-2 2z" />
      <path d="M4 18.5A2 2 0 0 1 6 20.5h13" />
    </svg>
  )
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function IconAlert(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 21 19.5H3L12 3.5z" />
      <line x1="12" y1="9.5" x2="12" y2="14" />
      <line x1="12" y1="16.5" x2="12" y2="16.7" />
    </svg>
  )
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  )
}

export function IconCoins(props: IconProps) {
  return (
    <svg {...base(props)}>
      <ellipse cx="9" cy="7" rx="5.5" ry="2.6" />
      <path d="M3.5 7v4c0 1.44 2.46 2.6 5.5 2.6s5.5-1.16 5.5-2.6V7" />
      <path d="M9 13.6v3.4c0 1.44 2.46 2.6 5.5 2.6s5.5-1.16 5.5-2.6v-4" />
      <ellipse cx="14.5" cy="12.8" rx="5.5" ry="2.6" />
    </svg>
  )
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6" />
      <path d="M17.5 14.2a6.5 6.5 0 0 1 4 5.8" />
    </svg>
  )
}

export function IconSliders(props: IconProps) {
  return (
    <svg {...base(props)}>
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <circle cx="9" cy="8" r="2.2" />
      <circle cx="15" cy="16" r="2.2" />
    </svg>
  )
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5z" />
      <path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </svg>
  )
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base(props)}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function IconEdit(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 20h4l10-10-4-4L4 16v4z" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  )
}

export function IconTrash(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16" />
      <path d="M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7" />
      <path d="M6.5 7l.8 12a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-12" />
    </svg>
  )
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M15 4h4v16h-4" />
      <path d="M10 12h10" />
      <path d="m14 8-4 4 4 4" />
    </svg>
  )
}
import { useId, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

type ChartVariant = 'info' | 'gold' | 'teal'

const strokeFor: Record<ChartVariant, string> = {
  info: 'stroke-chart-line',
  gold: 'stroke-chart-gold',
  teal: 'stroke-teal',
}

function buildPath(data: number[], width: number, height: number, pad = 3) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const step = data.length > 1 ? width / (data.length - 1) : width
  return data
    .map((value, index) => {
      const x = index * step
      const y = pad + (height - pad * 2) * (1 - (value - min) / span)
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

interface SparklineProps {
  data?: number[]
  variant?: ChartVariant
  fill?: boolean
  className?: string
  strokeWidth?: number
}

const DEFAULT_DATA = [12, 15, 11, 18, 16, 22, 20, 27, 24, 31, 29, 36]

export function Sparkline({
  data = DEFAULT_DATA,
  variant = 'info',
  fill = true,
  className,
  strokeWidth = 2,
}: SparklineProps) {
  const gradientId = useId()
  const width = 100
  const height = 40
  const line = buildPath(data, width, height)
  const area = `${line} L${width},${height} L0,${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      {fill && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#${gradientId})`} className="text-chart-line" />
        </>
      )}
      <path
        d={line}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className={strokeFor[variant]}
      />
    </svg>
  )
}

interface ChartFrameProps {
  className?: string
  variant?: ChartVariant
  data?: number[]
  caption?: string
  children?: ReactNode
}

export function ChartFrame({
  className,
  variant = 'info',
  data,
  caption,
  children,
}: ChartFrameProps) {
  return (
    <div
      className={cn(
        'surface-panel relative overflow-hidden rounded-2xl border border-border p-5 shadow-xl shadow-card-shadow',
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 pattern-grid opacity-60" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-faint">
            <span className="h-2 w-2 rounded-full bg-teal" />
            {caption ?? 'XAUUSD'}
          </span>
          <span className="font-mono text-xs text-text-faint">M15</span>
        </div>
        <div className="h-32">
          <Sparkline data={data} variant={variant} />
        </div>
      </div>
      {children && <div className="relative mt-4">{children}</div>}
    </div>
  )
}

interface CandlesProps {
  className?: string
}

const CANDLES: Array<[number, number, number, number]> = [
  [30, 44, 26, 40],
  [40, 50, 34, 36],
  [36, 46, 32, 44],
  [44, 56, 42, 52],
  [52, 62, 48, 50],
  [50, 58, 44, 56],
  [56, 68, 52, 64],
  [64, 74, 60, 62],
  [62, 72, 56, 70],
  [70, 80, 66, 76],
]

export function Candles({ className }: CandlesProps) {
  const width = 100
  const height = 80
  const step = width / CANDLES.length
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      {CANDLES.map(([open, high, low, close], index) => {
        const cx = index * step + step / 2
        const up = close >= open
        const top = Math.min(open, close)
        const bodyHeight = Math.max(Math.abs(close - open), 2)
        return (
          <g key={index} className={up ? 'text-success' : 'text-error'}>
            <line
              x1={cx}
              y1={100 - high}
              x2={cx}
              y2={100 - low}
              stroke="currentColor"
              strokeWidth={1.2}
              vectorEffect="non-scaling-stroke"
              opacity={0.6}
            />
            <rect
              x={cx - step * 0.26}
              y={100 - top - bodyHeight}
              width={step * 0.52}
              height={bodyHeight}
              rx={0.6}
              fill="currentColor"
            />
          </g>
        )
      })}
    </svg>
  )
}

export function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none rounded-full bg-[radial-gradient(closest-side,var(--color-hero-glow),transparent)] blur-2xl',
        className,
      )}
    />
  )
}

export function MarketGrid({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('pointer-events-none pattern-grid-fade', className)} />
}

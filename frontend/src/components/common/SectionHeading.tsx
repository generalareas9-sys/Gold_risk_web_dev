import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Eyebrow } from './Eyebrow'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  body?: string
  align?: 'center' | 'start'
  as?: 'h1' | 'h2' | 'h3'
  action?: ReactNode
  className?: string
  titleClassName?: string
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'center',
  as: Tag = 'h2',
  action,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          'text-3xl font-semibold tracking-tight text-text sm:text-4xl',
          eyebrow && 'mt-5',
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {body && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed text-text-muted',
            centered ? 'sm:text-lg' : 'sm:text-lg',
          )}
        >
          {body}
        </p>
      )}
      {action && <div className={cn('mt-7', centered && 'flex justify-center')}>{action}</div>}
    </div>
  )
}

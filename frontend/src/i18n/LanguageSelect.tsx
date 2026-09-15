/**
 * Language selector — SVG flag + native language name.
 *
 * Renders as a compact popover button (flag + name on desktop, flag only on
 * small screens) with a keyboard-accessible role="menu" dropdown. The flag
 * for the active language is always shown in the navbar. Selection is
 * persisted by the provider and re-applied to document.lang / document.dir.
 */

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

import { useLanguage } from './useLanguage'
import { FlagBadge } from '../components/common/FlagIcons'

interface LanguageSelectProps {
  /** Small, icon-first variant for acute mobile screens. */
  compact?: boolean
}

function ChevronIcon() {
  return (
    <svg
      className={`h-3.5 w-3.5 rtl:rotate-180`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function LanguageSelect({ compact = false }: LanguageSelectProps) {
  const { language, setLanguage, languages, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const current =
    languages.find((option) => option.code === language) ?? languages[0]

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  function selectOption(code: (typeof languages)[number]['code']) {
    setLanguage(code)
    setOpen(false)
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && open) {
      setOpen(false)
      buttonRef.current?.focus()
    }
  }

  return (
    <div ref={containerRef} className="relative shrink-0" onKeyDown={onKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t('navigation.language')}: ${current.label}`}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 text-sm text-text-muted transition-colors duration-200 hover:border-gold/50 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <FlagBadge code={current.code} label={current.label} />
        {!compact && (
          <span className="hidden max-w-24 truncate text-xs font-medium text-text sm:inline">
            {current.label}
          </span>
        )}
        <ChevronIcon />
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={t('navigation.language')}
          className="animate-drop-in absolute end-0 top-11 z-50 mt-1 min-w-44 overflow-hidden rounded-2xl border border-border bg-surface-raised p-1.5 shadow-2xl shadow-black/30"
        >
          {languages.map((option) => {
            const selected = option.code === language
            return (
              <li key={option.code}>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => selectOption(option.code)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors duration-150 ${
                    selected
                      ? 'bg-gold/10 font-medium text-gold'
                      : 'text-text hover:bg-surface hover:text-text'
                  }`}
                >
                  <FlagBadge code={option.code} label={option.label} />
                  <span className="flex-1 text-start">{option.label}</span>
                  {selected && (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/** Convenience slot used by the mobile navigation menu. */
export function LanguageMenuList(): ReactNode {
  const { language, setLanguage, languages, t } = useLanguage()

  return (
    <div className="mt-3 border-t border-border pt-3">
      <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wider text-text-faint">
        {t('navigation.language')}
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {languages.map((option) => {
          const selected = option.code === language
          return (
            <button
              key={option.code}
              type="button"
              aria-pressed={selected}
              onClick={() => setLanguage(option.code)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-colors duration-150 ${
                selected
                  ? 'border-gold/50 bg-gold/10 font-medium text-gold'
                  : 'border-border bg-surface text-text hover:border-border-strong'
              }`}
            >
              <FlagBadge code={option.code} label={option.label} />
              <span className="truncate">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
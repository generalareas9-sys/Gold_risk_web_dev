/**
 * Theme provider (Dark / Light).
 *
 * - Persists the choice to localStorage (`goldrisk_theme`).
 * - Applies `data-theme="light"` on <html>; Dark is the default appearance
 *   (no attribute), fully themed through tokens.css variables.
 * - The index.html inline script already seeds the attribute + theme-color
 *   before first paint, so this provider only needs to react to toggles.
 *
 * This module keeps the fast-refresh rule happy: it only exports a
 * component. The context and hook live in `themeContext.ts` and
 * `useTheme.ts` (mirroring auth/authContext.ts + auth/useAuth.ts).
 */

import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { ThemeContext, type Theme, type ThemeContextValue } from './themeContext'

const STORAGE_KEY = 'goldrisk_theme'
const DEFAULT_THEME: Theme = 'dark'

const THEME_META_COLORS: Record<Theme, string> = {
  dark: '#0d1117',
  light: '#f7f4ed',
}

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return DEFAULT_THEME
  }
}

function applyThemeToDocument(theme: Theme): void {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light')
  } else {
    root.removeAttribute('data-theme')
  }
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) meta.content = THEME_META_COLORS[theme]
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
    applyThemeToDocument(next)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setThemeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    applyThemeToDocument(next)
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, isDark: theme === 'dark', toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
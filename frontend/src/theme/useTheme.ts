/**
 * useTheme — reads the active theme from the ThemeContext.
 * Lives in its own file (mirroring auth/useAuth.ts) so the provider file
 * only exports components and stays fast-refresh clean.
 */

import { useContext } from 'react'
import { ThemeContext } from './themeContext'
import type { ThemeContextValue } from './themeContext'

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
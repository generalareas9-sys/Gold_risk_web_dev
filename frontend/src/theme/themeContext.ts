/**
 * Theme context, isolated from the provider component so the provider
 * module exports components only (fast-refresh rule). Mirrors the auth
 * architecture (auth/authContext.ts + auth/useAuth.ts).
 */

import { createContext } from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeContextValue {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
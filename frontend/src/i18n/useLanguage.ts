/**
 * useLanguage — reads the active language from the LanguageContext.
 * Lives in its own file (mirroring auth/useAuth.ts) so the provider file
 * only exports components and stays fast-refresh clean.
 */

import { useContext } from 'react'
import { LanguageContext } from './languageContext'
import type { LanguageContextValue } from './languageContext'

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
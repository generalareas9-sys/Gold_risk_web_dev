/**
 * Language context, isolated from the provider component so the provider
 * module exports components only (fast-refresh rule). Mirrors the auth
 * architecture (auth/authContext.ts + auth/useAuth.ts).
 */

import { createContext } from 'react'
import type { Dict, LangCode, TranslationKey, TranslationParams } from './types'
import type { LanguageOption } from './languages'

export interface LanguageContextValue {
  language: LangCode
  dir: 'ltr' | 'rtl'
  /** Intl locale tag used for number/date formatting (en-US, ar-EG, …). */
  locale: string
  dict: Dict
  t: <K extends TranslationKey>(key: K, params?: TranslationParams) => string
  setLanguage: (code: LangCode) => void
  languages: LanguageOption[]
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
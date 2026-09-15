/**
 * Lightweight i18n provider.
 *
 * - Persists the chosen language to localStorage (`goldrisk_lang`).
 * - Keeps `document.lang` and `document.dir` in sync (RTL for Arabic),
 *   matching what the inline anti-flash script seeds on first paint.
 * - `t(key, params)` resolves typed leaf keys and substitutes `{{param}}`.
 * - `dict` exposes the full active dictionary (arrays included) so
 *   components can map over lists without a stringly-typed API.
 *
 * This module keeps the fast-refresh rule happy: it only exports a
 * component. The context and hook live in `languageContext.ts` and
 * `useLanguage.ts` (mirroring auth/authContext.ts + auth/useAuth.ts).
 */

import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import en from './locales/en'
import am from './locales/am'
import ar from './locales/ar'
import es from './locales/es'
import fr from './locales/fr'
import de from './locales/de'
import pt from './locales/pt'

import type { Dict, LangCode, TranslationParams } from './types'
import { LanguageContext, type LanguageContextValue } from './languageContext'
import { LANGUAGES } from './languages'

export type { LangCode, TranslationKey, TranslationParams } from './types'

const STORAGE_KEY = 'goldrisk_lang'
const DEFAULT_LANG: LangCode = 'en'

const DICTS: Record<LangCode, Dict> = { en, am, ar, es, fr, de, pt }

const RTL_LANGS: ReadonlySet<LangCode> = new Set<LangCode>(['ar'])

function isLangCode(value: unknown): value is LangCode {
  return typeof value === 'string' && value in DICTS
}

function readInitialLang(): LangCode {
  if (typeof window === 'undefined') return DEFAULT_LANG
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return isLangCode(saved) ? saved : DEFAULT_LANG
}

function interpolate(text: string, params?: TranslationParams): string {
  if (!params) return text
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  )
}

function resolveKey(dict: Dict, key: string): string {
  const parts = key.split('.')
  let current: unknown = dict
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return key
    current = (current as Record<string, unknown>)[part]
  }
  return typeof current === 'string' ? current : key
}

const LOCALES: Record<LangCode, string> = {
  en: 'en',
  am: 'am',
  ar: 'ar',
  es: 'es',
  fr: 'fr',
  de: 'de',
  pt: 'pt',
}

function applyLanguageToDocument(code: LangCode): void {
  if (typeof document === 'undefined') return
  document.documentElement.lang = code
  document.documentElement.dir = RTL_LANGS.has(code) ? 'rtl' : 'ltr'
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) {
    const theme = document.documentElement.dataset.theme ?? 'dark'
    const light = theme === 'light'
    meta.content = light ? '#f6f3ed' : '#0a0a0c'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LangCode>(readInitialLang)

  const setLanguage = useCallback((code: LangCode) => {
    setLanguageState(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* storage unavailable — language still applies for this session */
    }
    applyLanguageToDocument(code)
  }, [])

  const dir: 'ltr' | 'rtl' = RTL_LANGS.has(language) ? 'rtl' : 'ltr'

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      dir,
      locale: LOCALES[language],
      dict: DICTS[language],
      t: (key, params) => interpolate(resolveKey(DICTS[language], key), params),
      setLanguage,
      languages: LANGUAGES,
    }),
    [language, dir, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
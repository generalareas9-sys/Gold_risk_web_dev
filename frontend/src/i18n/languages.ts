/**
 * Supported languages. Kept in its own non-component file so the provider
 * can be a pure component module (fast-refresh rule).
 *
 * Flags are rendered as shared SVG assets keyed by `code` (see
 * `components/common/FlagIcons.tsx`), so this data stays free of markup.
 */

import type { LangCode } from './types'

export interface LanguageOption {
  code: LangCode
  /** Native name shown next to the flag, e.g. "Deutsch". */
  label: string
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'ar', label: 'العربية' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
]
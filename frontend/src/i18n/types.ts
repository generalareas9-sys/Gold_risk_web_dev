/**
 * Shared i18n types.
 *
 * The `Dict` type is derived from the English locale so every locale is
 * guaranteed to carry exactly the same key structure — a missing key in
 * any language is a compile error, not a runtime gap.
 */

import type en from './locales/en'

/** The full structure all locales must satisfy. */
export type Dict = typeof en

export type LangCode = 'en' | 'am' | 'ar' | 'es' | 'fr' | 'de' | 'pt'

type Join<K extends string, P extends string> = P extends '' ? K : `${P}.${K}`

/**
 * Dot-notated path to a leaf string, e.g. "calculator.entryPrice".
 * Array values (lists kept for mapping) are intentionally excluded so
 * `t()` can never be pointed at non-string content.
 */
export type TranslationKey<D = Dict, P extends string = ''> = {
  [K in keyof D & string]: D[K] extends string
    ? Join<K, P>
    : D[K] extends ReadonlyArray<unknown>
      ? never
      : D[K] extends object
        ? TranslationKey<D[K], Join<K, P>>
        : never
}[keyof D & string]

/** Parameters substituted into `{{placeholder}}` tokens in a translation. */
export type TranslationParams = Record<string, string | number>
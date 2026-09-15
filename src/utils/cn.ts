/**
 * Joins conditional class names into a single string, skipping falsy values.
 * Kept intentionally tiny — no dependency on `clsx`/`tailwind-merge` for a
 * project this size.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

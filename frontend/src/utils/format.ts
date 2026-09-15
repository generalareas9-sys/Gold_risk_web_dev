/**
 * Small pure formatters shared by pages that display saved calculations.
 * Kept framework-free so they can be unit-tested in isolation.
 */

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** "100 USC / $1.00" style display for an account-currency amount + its USD value. */
export function formatMoney(amount: number, usd: number, currency = 'USC'): string {
  const sign = amount < 0 ? '-' : ''
  return `${sign}${formatNumber(Math.abs(amount), 2)} ${currency} / $${formatNumber(Math.abs(usd), 2)}`
}
import { describe, expect, it } from 'vitest'
import { formatDate, formatNumber, formatMoney, formatTime } from './format'

describe('format helpers', () => {
  describe('formatNumber', () => {
    it('pads to the requested decimal places', () => {
      expect(formatNumber(0.08, 2)).toBe('0.08')
      expect(formatNumber(1220.3, 2)).toBe('1,220.30')
    })

    it('does not truncate past the requested precision', () => {
      expect(formatNumber(0.0831, 4)).toBe('0.0831')
      expect(formatNumber(12.04, 2)).toBe('12.04')
    })

    it('applies thousands separators', () => {
      expect(formatNumber(1234567.89, 2)).toBe('1,234,567.89')
    })
  })

  describe('formatMoney', () => {
    it('renders account-currency and USD amounts', () => {
      expect(formatMoney(100, 1)).toBe('100.00 USC / $1.00')
      expect(formatMoney(96.32, 0.9632)).toBe('96.32 USC / $0.96')
    })

    it('handles negative amounts', () => {
      expect(formatMoney(-50, -0.5)).toBe('-50.00 USC / $0.50')
    })
  })

  describe('formatDate / formatTime', () => {
    it('formats a known ISO timestamp as a date', () => {
      // 2026-09-15T08:30:00Z → "Sep 15, 2026" in en-US.
      expect(formatDate('2026-09-15T08:30:00.000Z')).toBe('Sep 15, 2026')
    })

    it('formats a known ISO timestamp as a time', () => {
      expect(formatTime('2026-09-15T08:30:00.000Z')).toMatch(/^08:30 (AM|PM)$/)
    })
  })
})
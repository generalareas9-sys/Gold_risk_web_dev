import { describe, expect, it } from 'vitest'
import { parseGoogleCallbackHash } from './googleCallback'

describe('parseGoogleCallbackHash', () => {
  it('extracts the token from a success hash', () => {
    const result = parseGoogleCallbackHash('#token=eyJhbGciOiJIUzI1NiJ9.payload.signature')
    expect(result).toEqual({
      ok: true,
      token: 'eyJhbGciOiJIUzI1NiJ9.payload.signature',
    })
  })

  it('accepts a hash without the leading #', () => {
    const result = parseGoogleCallbackHash('token=abc.def')
    expect(result).toEqual({ ok: true, token: 'abc.def' })
  })

  it('ignores unrelated parameters', () => {
    const result = parseGoogleCallbackHash('#foo=bar&token=abc&tail=true')
    expect(result).toEqual({ ok: true, token: 'abc' })
  })

  it('rejects an empty hash', () => {
    const result = parseGoogleCallbackHash('')
    expect(result).toEqual({
      ok: false,
      error: 'No authentication result was returned by Google sign-in.',
    })
  })

  it('rejects a hash with only separator-like content', () => {
    const result = parseGoogleCallbackHash('#')
    expect(result.ok).toBe(false)
  })

  it('surfaces the provider error from the hash', () => {
    const result = parseGoogleCallbackHash('#error=access_denied')
    expect(result).toEqual({ ok: false, error: 'access_denied' })
  })

  it('rejects a hash without a token', () => {
    const result = parseGoogleCallbackHash('#foo=bar')
    expect(result.ok).toBe(false)
  })

  it('rejects an empty token value', () => {
    const result = parseGoogleCallbackHash('#token=')
    expect(result.ok).toBe(false)
  })
})
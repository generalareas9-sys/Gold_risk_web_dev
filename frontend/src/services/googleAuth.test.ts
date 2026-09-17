import { describe, expect, it } from 'vitest'
import { getGoogleAuthUrl, isGoogleAuthConfigured } from './googleAuth'

describe('googleAuth', () => {
  it('builds the backend OAuth initiation URL from the API base', () => {
    expect(getGoogleAuthUrl()).toBe('http://test.api.invalid/auth/google')
  })

  it('does not ship the Google client id or secret to the browser', () => {
    expect(getGoogleAuthUrl()).not.toContain('client_id')
    expect(getGoogleAuthUrl()).not.toContain('client_secret')
  })

  it('is configured when an API base URL exists', () => {
    expect(isGoogleAuthConfigured()).toBe(true)
  })
})
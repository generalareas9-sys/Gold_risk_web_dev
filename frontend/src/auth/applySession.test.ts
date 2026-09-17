import { afterEach, describe, expect, it, vi } from 'vitest'
import { applySessionForToken } from './applySession'
import type { AuthUser } from '../services/authApi'

const TOKEN = 'test-token-for-google-session'

const USER: AuthUser = {
  id: '42',
  email: 'jane@example.com',
  name: 'Jane',
  createdAt: '2026-09-15T08:30:00.000Z',
}

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 401 ? 'Unauthorized' : 'OK',
    json: async () => body,
  } as Response
}

interface FetchArgs {
  url: string
  init?: RequestInit
}

function lastFetch(): FetchArgs {
  const call = vi.mocked(fetch).mock.calls.at(-1)
  const url = String(call?.[0])
  const init = call?.[1] as RequestInit | undefined
  return { url, init }
}

function authValue(init?: RequestInit): string {
  const headers = init?.headers as Record<string, string> | undefined
  return headers?.Authorization ?? ''
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('applySessionForToken', () => {
  it('loads the user for the token handed back by Google OAuth', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(200, { success: true, data: { user: USER } }),
      ),
    )

    const res = await applySessionForToken(TOKEN)

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.user.email).toBe('jane@example.com')

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/auth/me')
    expect(authValue(init)).toBe(`Bearer ${TOKEN}`)
  })

  it('returns the backend message when the token is rejected', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(401, { success: false, error: { message: 'Invalid or expired token.', status: 401 } }),
      ),
    )

    const res = await applySessionForToken(TOKEN)

    expect(res.ok).toBe(false)
    if (res.ok) return
    expect(res.error).toBe('Invalid or expired token.')
  })

  it('reports network failures instead of throwing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('Failed to fetch')),
    )

    const res = await applySessionForToken(TOKEN)

    expect(res.ok).toBe(false)
  })
})
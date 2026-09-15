import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  listAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  listSpecifications,
  createSpecification,
  updateSpecification,
  deleteSpecification,
  type Account,
  type Specification,
} from './accountsApi'

const TOKEN = 'test-token-for-accounts'

const ACCOUNT: Account = {
  id: '1',
  accountName: 'Exness Standard Cent',
  broker: 'Exness',
  accountType: 'Standard Cent',
  currency: 'USC',
  usdConversion: 100,
  balance: 1220.3,
  isActive: true,
  isDefault: true,
  createdAt: '2026-09-15T08:30:00.000Z',
  updatedAt: '2026-09-15T08:30:00.000Z',
}

const SPECIFICATION: Specification = {
  id: '10',
  tradingAccountId: '1',
  symbol: 'XAUUSDc',
  contractSize: 1,
  minimumLot: 0.01,
  maximumLot: 200,
  lotStep: 0.01,
  createdAt: '2026-09-15T08:30:00.000Z',
  updatedAt: '2026-09-15T08:30:00.000Z',
}

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 401 ? 'Unauthorized' : status === 404 ? 'Not Found' : status === 201 ? 'Created' : 'OK',
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

describe('accountsApi', () => {
  it('lists accounts with the bearer token', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(200, { success: true, data: { accounts: [ACCOUNT] } }),
      ),
    )

    const res = await listAccounts(TOKEN)

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.data.accounts).toHaveLength(1)
    expect(res.data.data.accounts[0].accountName).toBe('Exness Standard Cent')

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/accounts')
    expect(init?.method ?? 'GET').toBe('GET')
    expect(authValue(init)).toBe(`Bearer ${TOKEN}`)
  })

  it('fetches one account with its specifications', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(200, { success: true, data: { account: ACCOUNT, specifications: [SPECIFICATION] } }),
      ),
    )

    const res = await getAccount(TOKEN, '1')

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.data.specifications[0].symbol).toBe('XAUUSDc')

    const { url } = lastFetch()
    expect(url).toBe('http://test.api.invalid/accounts/1')
  })

  it('creates an account as a JSON POST', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(201, { success: true, data: { account: ACCOUNT } }),
      ),
    )

    const payload = {
      accountName: 'Exness Standard Cent',
      broker: 'Exness',
      accountType: 'Standard Cent',
      currency: 'USC',
      usdConversion: 100,
      balance: 1220.3,
    }
    const res = await createAccount(TOKEN, payload)

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.data.account.id).toBe('1')

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/accounts')
    expect(init?.method).toBe('POST')
    expect(init?.body).toBe(JSON.stringify(payload))
    expect(authValue(init)).toBe(`Bearer ${TOKEN}`)
  })

  it('updates an account via PATCH', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(200, { success: true, data: { account: { ...ACCOUNT, balance: 1500 } } }),
      ),
    )

    const res = await updateAccount(TOKEN, '1', { balance: 1500 })

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.data.account.balance).toBe(1500)

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/accounts/1')
    expect(init?.method).toBe('PATCH')
    expect(init?.body).toBe(JSON.stringify({ balance: 1500 }))
  })

  it('deletes an account via DELETE', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(200, { success: true, message: 'Account deleted successfully.' }),
      ),
    )

    const res = await deleteAccount(TOKEN, '1')

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.message).toContain('deleted')

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/accounts/1')
    expect(init?.method).toBe('DELETE')
  })

  it('lists specifications for an account', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(200, { success: true, data: { specifications: [SPECIFICATION] } }),
      ),
    )

    const res = await listSpecifications(TOKEN, '1')

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.data.specifications).toHaveLength(1)

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/accounts/1/specifications')
    expect(authValue(init)).toBe(`Bearer ${TOKEN}`)
  })

  it('creates a specification as a JSON POST', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(201, { success: true, data: { specification: SPECIFICATION } }),
      ),
    )

    const payload = {
      symbol: 'XAUUSDc',
      contractSize: 1,
      minimumLot: 0.01,
      maximumLot: 200,
      lotStep: 0.01,
    }
    const res = await createSpecification(TOKEN, '1', payload)

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.data.specification.id).toBe('10')

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/accounts/1/specifications')
    expect(init?.method).toBe('POST')
    expect(init?.body).toBe(JSON.stringify(payload))
    expect(authValue(init)).toBe(`Bearer ${TOKEN}`)
  })

  it('updates a specification via PATCH', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(200, { success: true, data: { specification: { ...SPECIFICATION, maximumLot: 250 } } }),
      ),
    )

    const res = await updateSpecification(TOKEN, '1', '10', { maximumLot: 250 })

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.data.specification.maximumLot).toBe(250)

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/accounts/1/specifications/10')
    expect(init?.method).toBe('PATCH')
  })

  it('deletes a specification via DELETE', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(200, { success: true, message: 'Specification deleted successfully.' }),
      ),
    )

    const res = await deleteSpecification(TOKEN, '1', '10')

    expect(res.ok).toBe(true)

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/accounts/1/specifications/10')
    expect(init?.method).toBe('DELETE')
    expect(authValue(init)).toBe(`Bearer ${TOKEN}`)
  })

  it('surfaces the backend error message on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(404, { success: false, error: { message: 'Account not found.', status: 404 } }),
      ),
    )

    const res = await getAccount(TOKEN, '999')

    expect(res.ok).toBe(false)
    if (res.ok) return
    expect(res.error.status).toBe(404)
    expect(res.error.message).toBe('Account not found.')
  })
})
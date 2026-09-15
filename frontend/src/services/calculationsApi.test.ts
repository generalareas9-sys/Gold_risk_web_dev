import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createCalculation,
  deleteCalculation,
  getCalculation,
  listCalculations,
  type CalculationCreatePayload,
} from './calculationsApi'

const TOKEN = 'test-token-for-service'

const CALCULATION = {
  id: '1',
  symbol: 'XAUUSDc',
  position: 'BUY',
  entryPrice: 4014.73,
  tradingAccountId: null,
  inputs: { riskValue: 100 },
  outputs: { recommendedLot: 0.08 },
  createdAt: '2026-09-15T08:30:00.000Z',
}

const PAYLOAD: CalculationCreatePayload = {
  symbol: 'XAUUSDc',
  position: 'BUY',
  entryPrice: 4014.73,
  inputs: {
    accountBalance: 1220.3,
    riskMode: 'ACCOUNT_CURRENCY',
    riskValue: 100,
    symbol: 'XAUUSDc',
    contractSize: 1,
    lotStep: 0.01,
    minimumLot: 0.01,
    maximumLot: 200,
    accountCurrency: 'USC',
    uscPerUsd: 100,
    position: 'BUY',
    entryPrice: 4014.73,
    stopLoss: 4002.69,
    takeProfit: 4052.23,
  },
  outputs: {
    slDistance: 12.04,
    riskAmount: 100,
    riskAmountUsd: 1,
    exactLot: 0.0831,
    recommendedLot: 0.08,
    actualRisk: 96.32,
    actualRiskUsd: 0.9632,
    isBelowMinLot: false,
    valid: true,
    errors: [],
    warnings: [],
    riskRewardRatio: 3.11,
    rewardDistance: 37.5,
    potentialProfit: 311.46,
    potentialProfitUsd: 3.11,
  },
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

describe('calculationsApi', () => {
  it('lists calculations with the bearer token', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(200, { success: true, data: { calculations: [CALCULATION] } }),
      ),
    )

    const res = await listCalculations(TOKEN)

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.data.calculations).toHaveLength(1)
    expect(res.data.data.calculations[0].symbol).toBe('XAUUSDc')

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/calculations')
    expect(init?.method ?? 'GET').toBe('GET')
    expect(authValue(init)).toBe(`Bearer ${TOKEN}`)
  })

  it('creates a calculation as a JSON POST', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(201, { success: true, data: { calculation: CALCULATION } }),
      ),
    )

    const res = await createCalculation(TOKEN, PAYLOAD)

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.data.calculation.id).toBe('1')

    const { url, init } = lastFetch()
    expect(url).toBe('http://test.api.invalid/calculations')
    expect(init?.method).toBe('POST')
    expect(init?.body).toBe(JSON.stringify(PAYLOAD))
    expect(authValue(init)).toBe(`Bearer ${TOKEN}`)
  })

  it('fetches a single calculation by id', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse(200, { success: true, data: { calculation: CALCULATION } })),
    )

    const res = await getCalculation(TOKEN, '1')

    expect(res.ok).toBe(true)
    const { url } = lastFetch()
    expect(url).toBe('http://test.api.invalid/calculations/1')
  })

  it('deletes a calculation via DELETE', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse(200, { success: true, message: 'Calculation deleted successfully.' })),
    )

    const res = await deleteCalculation(TOKEN, '1')

    expect(res.ok).toBe(true)
    if (!res.ok) return
    expect(res.data.message).toContain('deleted')

    const { init } = lastFetch()
    expect(init?.method).toBe('DELETE')
    expect(authValue(init)).toBe(`Bearer ${TOKEN}`)
  })

  it('surfaces the backend error message on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(404, { success: false, error: { message: 'Calculation not found.', status: 404 } }),
      ),
    )

    const res = await getCalculation(TOKEN, '999')

    expect(res.ok).toBe(false)
    if (res.ok) return
    expect(res.error.status).toBe(404)
    expect(res.error.message).toBe('Calculation not found.')
  })
})
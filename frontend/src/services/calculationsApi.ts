import type { CalculatorInput, CalculatorResult } from '../types/calculator.ts'
import { apiRequest } from './api.ts'

export interface CalculationSummary {
  id: string
  symbol: string
  position: 'BUY' | 'SELL'
  entryPrice: number
  tradingAccountId: string | null
  inputs: Record<string, unknown>
  outputs: Record<string, unknown>
  createdAt: string
}

export interface CalculationCreatePayload {
  symbol: string
  position: 'BUY' | 'SELL'
  entryPrice: number
  tradingAccountId?: string | null
  inputs: CalculatorInput
  outputs: CalculatorResult
}

interface ListResponse {
  success: boolean
  data: { calculations: CalculationSummary[] }
}

interface DetailResponse {
  success: boolean
  data: { calculation: CalculationSummary }
}

interface DeleteResponse {
  success: boolean
  message: string
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` }
}

export async function listCalculations(token: string) {
  return apiRequest<ListResponse>('/calculations', {
    headers: authHeaders(token),
  })
}

export async function getCalculation(token: string, id: string) {
  return apiRequest<DetailResponse>(`/calculations/${id}`, {
    headers: authHeaders(token),
  })
}

export async function createCalculation(token: string, payload: CalculationCreatePayload) {
  return apiRequest<DetailResponse>('/calculations', {
    method: 'POST',
    headers: authHeaders(token),
    body: payload,
  })
}

export async function deleteCalculation(token: string, id: string) {
  return apiRequest<DeleteResponse>(`/calculations/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
}

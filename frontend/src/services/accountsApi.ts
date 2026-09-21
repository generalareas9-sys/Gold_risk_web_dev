import { apiRequest } from './api.ts'

export interface Account {
  id: string
  accountName: string
  broker: string
  accountType: string
  currency: string
  usdConversion: number
  balance: number
  isActive: boolean
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface Specification {
  id: string
  tradingAccountId: string
  symbol: string
  contractSize: number
  minimumLot: number
  maximumLot: number
  lotStep: number
  createdAt: string
  updatedAt: string
}

export interface AccountCreatePayload {
  accountName: string
  broker: string
  accountType: string
  currency: string
  usdConversion: number
  balance?: number
  isActive?: boolean
  isDefault?: boolean
  /** Optional first specification created atomically with the account. */
  specification?: SpecificationCreatePayload
}

export interface AccountUpdatePayload {
  accountName?: string
  broker?: string
  accountType?: string
  currency?: string
  usdConversion?: number
  balance?: number
  isActive?: boolean
  isDefault?: boolean
}

export interface SpecificationCreatePayload {
  symbol: string
  contractSize: number
  minimumLot: number
  maximumLot: number
  lotStep: number
}

export interface SpecificationUpdatePayload {
  symbol?: string
  contractSize?: number
  minimumLot?: number
  maximumLot?: number
  lotStep?: number
}

interface ListResponse {
  success: boolean
  data: { accounts: Account[] }
}

interface AccountDetailResponse {
  success: boolean
  data: { account: Account; specifications: Specification[] }
}

interface AccountResponse {
  success: boolean
  data: { account: Account }
}

interface SpecificationResponse {
  success: boolean
  data: { specification: Specification }
}

interface SpecificationsListResponse {
  success: boolean
  data: { specifications: Specification[] }
}

interface DeleteResponse {
  success: boolean
  message: string
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` }
}

export async function listAccounts(token: string) {
  return apiRequest<ListResponse>('/accounts', {
    headers: authHeaders(token),
  })
}

export async function getAccount(token: string, id: string) {
  return apiRequest<AccountDetailResponse>(`/accounts/${id}`, {
    headers: authHeaders(token),
  })
}

export async function createAccount(token: string, payload: AccountCreatePayload) {
  return apiRequest<AccountResponse>('/accounts', {
    method: 'POST',
    headers: authHeaders(token),
    body: payload,
  })
}

export async function updateAccount(token: string, id: string, payload: AccountUpdatePayload) {
  return apiRequest<AccountResponse>(`/accounts/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: payload,
  })
}

export async function deleteAccount(token: string, id: string) {
  return apiRequest<DeleteResponse>(`/accounts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
}

export async function listSpecifications(token: string, accountId: string) {
  return apiRequest<SpecificationsListResponse>(`/accounts/${accountId}/specifications`, {
    headers: authHeaders(token),
  })
}

export async function createSpecification(
  token: string,
  accountId: string,
  payload: SpecificationCreatePayload,
) {
  return apiRequest<SpecificationResponse>(`/accounts/${accountId}/specifications`, {
    method: 'POST',
    headers: authHeaders(token),
    body: payload,
  })
}

export async function updateSpecification(
  token: string,
  accountId: string,
  specId: string,
  payload: SpecificationUpdatePayload,
) {
  return apiRequest<SpecificationResponse>(
    `/accounts/${accountId}/specifications/${specId}`,
    {
      method: 'PATCH',
      headers: authHeaders(token),
      body: payload,
    },
  )
}

export async function deleteSpecification(token: string, accountId: string, specId: string) {
  return apiRequest<DeleteResponse>(`/accounts/${accountId}/specifications/${specId}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
}

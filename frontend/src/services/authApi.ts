import { apiRequest } from './api.ts'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  name: string | null
  createdAt: string
}

export interface RegisterResponse {
  success: boolean
  data: { user: AuthUser }
}

export interface LoginResponse {
  success: boolean
  data: { token: string; user: AuthUser }
}

export interface LogoutResponse {
  success: boolean
  message: string
}

export interface MeResponse {
  success: boolean
  data: { user: AuthUser }
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` }
}

export async function registerUser(payload: RegisterPayload) {
  return apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: payload,
  })
}

export async function loginUser(payload: LoginPayload) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  })
}

export async function logoutUser(token: string) {
  return apiRequest<LogoutResponse>('/auth/logout', {
    method: 'POST',
    headers: authHeaders(token),
  })
}

export async function getCurrentUser(token: string) {
  return apiRequest<MeResponse>('/auth/me', {
    headers: authHeaders(token),
  })
}

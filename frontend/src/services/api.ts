import type { ApiResult } from '../types/api'

/**
 * Base URL for the GoldRisk API, read from the environment so it is never
 * hard-coded into components or service modules.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

/**
 * Thin fetch wrapper used by the GoldRisk API service modules.
 * Components should not call fetch directly; they should go through
 * this function or a service module built on top of it.
 */
export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResult<T>> {
  if (!API_BASE_URL) {
    return {
      ok: false,
      error: {
        status: 0,
        message: 'No API base URL is configured for this environment.',
      },
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      let message = response.statusText
      try {
        const body = (await response.json()) as { error?: { message?: string } }
        if (typeof body?.error?.message === 'string' && body.error.message !== '') {
          message = body.error.message
        }
      } catch {
        // Non-JSON error body — fall back to the HTTP status text.
      }
      return {
        ok: false,
        error: { status: response.status, message },
      }
    }

    const data = (await response.json()) as T
    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: {
        status: 0,
        message: error instanceof Error ? error.message : 'Network error',
      },
    }
  }
}

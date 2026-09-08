import type { ApiResult } from '../types/api'

/**
 * Base URL for the GoldRisk API, read from the environment so it is never
 * hard-coded into components. There is no backend in this phase, so this
 * value is unused for now beyond establishing the pattern future services
 * should follow.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

/**
 * Thin fetch wrapper that the real services (auth, accounts, calculator
 * history, etc.) will build on once a backend exists. It intentionally does
 * not fabricate any responses — calling it today will simply hit whatever
 * VITE_API_BASE_URL points to, or fail with a network error if that is
 * unset. No component should call `fetch` directly; they should go through
 * a service module that wraps this function.
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
      return {
        ok: false,
        error: { status: response.status, message: response.statusText },
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

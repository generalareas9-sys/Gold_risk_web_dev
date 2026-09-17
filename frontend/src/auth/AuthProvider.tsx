import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/authApi.ts'
import type { AuthUser } from '../services/authApi.ts'
import { AuthContext, type AuthContextValue } from './authContext.ts'

const TOKEN_KEY = 'goldrisk_token'
const USER_KEY = 'goldrisk_user'

function readStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (raw === null) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function persistAuth(token: string, user: AuthUser): void {
  try {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    // localStorage unavailable — silently continue in-memory only.
  }
}

function clearAuthStorage(): void {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    // Best-effort.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialToken = readStoredToken()
  const [user, setUser] = useState<AuthUser | null>(readStoredUser)
  const [token, setToken] = useState<string | null>(initialToken)
  const [isLoading, setIsLoading] = useState(initialToken !== null)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = token !== null && user !== null

  // On mount: validate any stored token against the backend. All state writes
  // happen after an await, never synchronously inside the effect body.
  useEffect(() => {
    const storedToken = readStoredToken()
    if (storedToken === null) return

    let cancelled = false
    void (async () => {
      const res = await getCurrentUser(storedToken)
      if (cancelled) return
      if (res.ok) {
        setToken(storedToken)
        setUser(res.data.data.user)
      } else {
        clearAuthStorage()
        setToken(null)
        setUser(null)
      }
      setIsLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setError(null)
    const res = await loginUser({ email, password })
    if (!res.ok) {
      setError(res.error.message)
      return false
    }
    const { token: newToken, user: newUser } = res.data.data
    persistAuth(newToken, newUser)
    setToken(newToken)
    setUser(newUser)
    return true
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      setError(null)
      const regRes = await registerUser({ name, email, password })
      if (!regRes.ok) {
        setError(regRes.error.message)
        return false
      }
      // Auto-login after successful registration.
      return login(email, password)
    },
    [login],
  )

  const applySession = useCallback((newToken: string, newUser: AuthUser) => {
    persistAuth(newToken, newUser)
    setToken(newToken)
    setUser(newUser)
    setError(null)
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    if (token !== null) {
      await logoutUser(token)
    }
    clearAuthStorage()
    setToken(null)
    setUser(null)
  }, [token])

  const clearError = useCallback(() => setError(null), [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      error,
      login,
      register,
      applySession,
      logout,
      clearError,
    }),
    [user, token, isAuthenticated, isLoading, error, login, register, applySession, logout, clearError],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
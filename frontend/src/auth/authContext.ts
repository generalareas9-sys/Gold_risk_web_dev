import { createContext } from 'react'
import type { AuthUser } from '../services/authApi.ts'

export interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  /** Persists an externally-provided session (e.g. the token from Google OAuth). */
  applySession: (token: string, user: AuthUser) => void
  logout: () => Promise<void>
  clearError: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
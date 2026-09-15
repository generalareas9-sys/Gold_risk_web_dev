import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth.ts'
import { paths } from '../routes/paths.ts'

/**
 * Route guard for authenticated-only pages. Reads the current location so we
 * can redirect back after login. Renders child routes when authenticated,
 * otherwise bounces to the login page.
 */
export function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={paths.login} replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

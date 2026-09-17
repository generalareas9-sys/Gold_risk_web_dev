import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Card } from '../components/common/Card'
import { Logo } from '../components/common/Logo'
import { PageContainer } from '../components/layout/PageContainer'
import { parseGoogleCallbackHash } from '../auth/googleCallback'
import { applySessionForToken } from '../auth/applySession'
import { paths } from '../routes/paths'
import { useAuth } from '../auth/useAuth'
import { useLanguage } from '../i18n/useLanguage'

/**
 * Landing page for the backend's Google OAuth redirect (the hash carries the
 * GoldRisk JWT). Persists the session, strips the token from the URL, and
 * sends the user into the authenticated workspace. If the flow failed, shows
 * the reason and a link back to login — never a fake success.
 */
export function GoogleCallbackPage() {
  const { applySession } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [parsed] = useState(() => parseGoogleCallbackHash(window.location.hash))
  const [error, setError] = useState<string | null>(() =>
    parsed.ok ? null : parsed.error,
  )

  useEffect(() => {
    let cancelled = false

    if (!parsed.ok) {
      window.history.replaceState(null, '', paths.googleCallback)
      return
    }

    void (async () => {
      const result = await applySessionForToken(parsed.token)
      if (cancelled) return
      if (result.ok) {
        applySession(parsed.token, result.user)
        window.history.replaceState(null, '', paths.calculator)
        navigate(paths.calculator, { replace: true })
      } else {
        setError(result.error)
        window.history.replaceState(null, '', paths.googleCallback)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [applySession, navigate, parsed])

  return (
    <PageContainer className="grid min-h-[calc(100vh-6rem)] place-items-center py-14">
      <Card className="w-full max-w-sm p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo className="h-10" />
          {error !== null ? (
            <>
              <h1 className="text-lg font-semibold text-text">
                {t('auth.googleSignInFailed')}
              </h1>
              <p className="text-sm leading-relaxed text-text-muted" role="alert">
                {error}
              </p>
              <NavLink
                to={paths.login}
                className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-on-gold transition-colors hover:bg-gold-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {t('navigation.login')}
              </NavLink>
            </>
          ) : (
            <p className="text-sm text-text-muted">{t('common.loading')}…</p>
          )}
        </div>
      </Card>
    </PageContainer>
  )
}
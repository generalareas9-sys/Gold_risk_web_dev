import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../components/common/Logo'
import { Button } from '../components/common/Button'
import { Loading } from '../components/common/Loading'
import { IconAlert } from '../components/common/Icons'
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
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 pattern-grid-fade opacity-60" />
        <div className="absolute -top-28 end-[14%] h-96 w-96 rounded-full bg-[radial-gradient(closest-side,var(--color-hero-glow),transparent)] blur-2xl" />
        <div className="absolute -bottom-16 start-[-8%] h-80 w-80 rounded-full bg-[radial-gradient(closest-side,var(--color-glow-soft),transparent)] blur-2xl" />
      </div>

      <PageContainer className="relative grid min-h-[calc(100vh-6rem)] place-items-center py-14">
        <div className="surface-panel relative w-full max-w-sm overflow-hidden rounded-3xl border border-border p-8 shadow-2xl shadow-card-shadow">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          />
          <div className="relative flex flex-col items-center gap-4 text-center">
            <Logo className="h-10" />
            {error !== null ? (
              <>
                <span className="mt-2 flex h-11 w-11 items-center justify-center rounded-full border border-error/30 bg-error/10 text-error">
                  <IconAlert aria-hidden="true" className="h-5 w-5" />
                </span>
                <h1 className="text-lg font-semibold text-text">
                  {t('auth.googleSignInFailed')}
                </h1>
                <p className="text-sm leading-relaxed text-text-muted" role="alert">
                  {error}
                </p>
                <Link to={paths.login} className="mt-2 inline-flex">
                  <Button size="md">{t('navigation.login')}</Button>
                </Link>
              </>
            ) : (
              <div className="py-4">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
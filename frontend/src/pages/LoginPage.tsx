import { type FormEvent, useState } from 'react'
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Input } from '../components/common/Input'
import { Button } from '../components/common/Button'
import { PasswordToggle } from '../components/common/PasswordToggle'
import { GoogleButton } from '../components/common/GoogleButton'
import { IconMail, IconLock } from '../components/common/Icons'
import { AuthShell } from '../components/layout/AuthShell'
import { paths } from '../routes/paths'
import { getGoogleAuthUrl } from '../services/googleAuth'
import { useAuth } from '../auth/useAuth'
import { useLanguage } from '../i18n/useLanguage'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, error, clearError, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)
  const { t, dict } = useLanguage()

  const redirectTo = (location.state as { from?: string } | null)?.from ?? paths.calculator

  if (isLoading) {
    return null
  }
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearError()
    setSubmitting(true)
    const ok = await login(email.trim(), password)
    setSubmitting(false)
    if (ok) {
      navigate(redirectTo, { replace: true })
    }
  }

  function handleGoogle() {
    // Full-page navigation to the backend, which redirects to Google's
    // consent screen and then drops the session token back on the callback
    // page. The Google client secret never reaches the browser.
    window.location.assign(getGoogleAuthUrl())
  }

  return (
    <AuthShell
      title={dict.auth.welcomeBack}
      subtitle={dict.auth.loginSubtitle}
      footer={
        <p className="text-center text-sm text-text-muted">
          {t('auth.noAccount')}{' '}
          <NavLink
            to={paths.register}
            className="rounded font-medium text-gold transition-colors hover:text-gold-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {t('auth.createAccount')}
          </NavLink>
        </p>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <Input
          label={t('auth.email')}
          type="email"
          placeholder={t('auth.emailPlaceholder')}
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startSlot={<IconMail className="h-4 w-4" />}
        />
        <Input
          label={t('auth.password')}
          type={showPassword ? 'text' : 'password'}
          placeholder={t('auth.passwordPlaceholder')}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startSlot={<IconLock className="h-4 w-4" />}
          endSlot={
            <PasswordToggle
              shown={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
              label={
                showPassword ? t('navigation.hidePassword') : t('navigation.showPassword')
              }
            />
          }
        />

        {error !== null && (
          <div role="alert" className="rounded-md border border-error bg-error-muted px-4 py-3">
            <p className="text-sm text-text-muted">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          {submitting ? t('auth.loggingIn') : t('auth.login')}
        </Button>
      </form>

      <div className="mt-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-text-faint">
          {t('auth.or')}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton
        label={t('auth.continueWithGoogle')}
        aria-label={t('auth.continueWithGoogle')}
        disabled={submitting}
        onClick={handleGoogle}
        className="mt-4"
      />
    </AuthShell>
  )
}
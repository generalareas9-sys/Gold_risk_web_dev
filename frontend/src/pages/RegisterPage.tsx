import { type FormEvent, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { Input } from '../components/common/Input'
import { Button } from '../components/common/Button'
import { PasswordToggle } from '../components/common/PasswordToggle'
import { GoogleButton } from '../components/common/GoogleButton'
import { IconMail, IconLock, IconUser } from '../components/common/Icons'
import { AuthShell } from '../components/layout/AuthShell'
import { paths } from '../routes/paths'
import { getGoogleAuthUrl } from '../services/googleAuth'
import { useAuth } from '../auth/useAuth'
import { useLanguage } from '../i18n/useLanguage'

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const { register, error: apiError, clearError, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const { t, dict } = useLanguage()

  if (isLoading) {
    return null
  }
  if (isAuthenticated) {
    return <Navigate to={paths.calculator} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    clearError()

    if (name.trim() === '') {
      setFormError(dict.auth.nameRequired)
      return
    }
    if (password.length < 8) {
      setFormError(dict.auth.passwordTooShort)
      return
    }
    if (password !== confirm) {
      setFormError(dict.auth.passwordsDoNotMatch)
      return
    }

    setSubmitting(true)
    const ok = await register(name.trim(), email.trim(), password)
    setSubmitting(false)
    if (ok) {
      navigate(paths.calculator, { replace: true })
    }
  }

  function handleGoogle() {
    // Full-page navigation to the backend, which redirects to Google's
    // consent screen and then drops the session token back on the callback
    // page. The Google client secret never reaches the browser.
    window.location.assign(getGoogleAuthUrl())
  }

  const displayError = formError ?? apiError

  return (
    <AuthShell
      title={t('auth.createTitle')}
      subtitle={dict.auth.createSubtitle}
      footer={
        <p className="text-center text-sm text-text-muted">
          {t('auth.hasAccount')}{' '}
          <NavLink
            to={paths.login}
            className="rounded font-medium text-gold transition-colors hover:text-gold-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {t('navigation.login')}
          </NavLink>
        </p>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <Input
          label={t('auth.name')}
          type="text"
          placeholder={t('auth.namePlaceholder')}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          startSlot={<IconUser className="h-4 w-4" />}
        />
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
          placeholder={t('auth.passwordPlaceholderLong')}
          autoComplete="new-password"
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
        <Input
          label={t('auth.confirmPassword')}
          type={showConfirm ? 'text' : 'password'}
          placeholder={t('auth.confirmPlaceholder')}
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          startSlot={<IconLock className="h-4 w-4" />}
          endSlot={
            <PasswordToggle
              shown={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
              label={
                showConfirm ? t('navigation.hidePassword') : t('navigation.showPassword')
              }
            />
          }
        />

        {displayError !== null && (
          <div
            role="alert"
            className="rounded-xl border border-error/40 bg-error-muted px-4 py-3"
          >
            <p className="text-sm text-text-muted">{displayError}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          {submitting ? t('auth.creatingAccount') : t('auth.createButton')}
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
        label={t('auth.signUpWithGoogle')}
        aria-label={t('auth.signUpWithGoogle')}
        disabled={submitting}
        onClick={handleGoogle}
        className="mt-4"
      />
    </AuthShell>
  )
}
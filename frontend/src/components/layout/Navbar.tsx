import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Brand } from '../common/Brand'
import { authenticatedNavLinks, paths, publicNavLinks } from '../../routes/paths'
import { cn } from '../../utils/cn'
import { useAuth } from '../../auth/useAuth'
import { useLanguage } from '../../i18n/useLanguage'
import { LanguageSelect, LanguageMenuList } from '../../i18n/LanguageSelect'
import { ThemeToggle } from '../../theme/ThemeToggle'

/**
 * Three-zone public navbar.
 *
 *   [ BRAND ]        [ MAIN NAVIGATION ]        [ ACCOUNT / SETTINGS ]
 *
 * A `1fr auto 1fr` grid keeps the center navigation exactly centered; the
 * brand hugs the reading start and the account/settings cluster hugs the
 * reading end, so the RTL layout mirrors automatically (grid follows the
 * document direction). The full desktop header — brand, all six links,
 * Log in / Get Started, language and theme — is visible from the `xl`
 * breakpoint (1280px) upward and fits comfortably at 1366px. Below `xl`
 * the navigation and account cluster move into the mobile menu, because
 * at 1024–1279px even the default English links cannot fit on one line
 * without cramping.
 */

const NAV_VISIBLE = 'xl:flex'
const ACTIONS_VISIBLE = 'xl:flex'
const DIVIDER_VISIBLE = 'xl:block'
const MENU_BUTTON_VISIBLE = 'xl:hidden'

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative whitespace-nowrap rounded-lg px-1.5 py-2 text-sm font-semibold transition-colors duration-150',
    'after:absolute after:inset-x-1.5 after:bottom-[1px] after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-gold-muted after:via-gold after:to-gold-muted after:transition-transform after:duration-200',
    isActive ? 'text-gold after:scale-x-100' : 'text-text-muted hover:bg-surface-raised hover:text-text',
  )

function PublicActions() {
  const { t } = useLanguage()
  return (
    <div className={cn('hidden items-center gap-2.5', ACTIONS_VISIBLE)}>
      <NavLink
        to={paths.login}
        className="rounded-lg px-2 py-2 text-sm font-medium text-text-muted transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        {t('navigation.login')}
      </NavLink>
      <NavLink
        to={paths.register}
        className="rounded-lg bg-gold px-3.5 py-2 text-sm font-medium text-on-gold shadow-lg shadow-gold-glow transition-all duration-150 hover:bg-gold-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        {t('navigation.getStarted')}
      </NavLink>
    </div>
  )
}

function SignedInActions({
  email,
  onLogout,
}: {
  email: string | null
  onLogout: () => void
}) {
  const { t } = useLanguage()
  return (
    <div className={cn('hidden items-center gap-4', ACTIONS_VISIBLE)}>
      <span
        className="flex items-center gap-2 text-sm text-text-muted"
        title={t('navigation.signedInAs', { email: email ?? '' })}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border-strong bg-surface-raised font-mono text-xs text-gold">
          {(email ?? 'T').charAt(0).toUpperCase()}
        </span>
        <span className="hidden max-w-[12rem] truncate xl:inline">{email}</span>
      </span>
      <button
        type="button"
        onClick={onLogout}
        className="rounded-lg border border-border-strong px-4 py-2 text-sm font-medium text-text-muted transition-colors duration-150 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        {t('navigation.logout')}
      </button>
    </div>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { t } = useLanguage()

  const navLinks = isAuthenticated ? authenticatedNavLinks : publicNavLinks

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLogout() {
    void logout()
    setIsMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border transition-[background-color,box-shadow,backdrop-filter] duration-200',
        scrolled
          ? 'bg-surface/95 shadow-lg shadow-card-shadow backdrop-blur-xl'
          : 'bg-surface/60 backdrop-blur-md',
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-grid opacity-[0.25]"
      />

      <div className="relative mx-auto grid h-16 w-full max-w-none grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6 lg:px-6 xl:px-5 xl:max-w-[1536px]">
        {/* ZONE 1 — Brand */}
        <NavLink
          to={isAuthenticated ? paths.calculator : paths.home}
          aria-label={t('navigation.home')}
          className="brand-trigger relative inline-flex shrink-0 items-center justify-self-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <Brand />
        </NavLink>

        {/* ZONE 2 — Center navigation */}
        <nav
          aria-label="Primary"
          className={cn('hidden items-center justify-center gap-0.5', NAV_VISIBLE)}
        >
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses}>
              {t(link.labelKey)}
            </NavLink>
          ))}
        </nav>

        {/* ZONE 3 — Account / settings */}
        <div className="flex items-center justify-end gap-2">
          <span
            aria-hidden="true"
            className={cn('hidden h-6 w-px self-center bg-border/70', DIVIDER_VISIBLE)}
          />
          {isAuthenticated ? (
            <SignedInActions email={user?.email ?? null} onLogout={handleLogout} />
          ) : (
            <PublicActions />
          )}
          <LanguageSelect compact />
          <ThemeToggle />

          <button
            type="button"
            className={cn(
              'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors duration-200 hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
              MENU_BUTTON_VISIBLE,
            )}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className={cn(
            'animate-menu-in border-t border-border bg-surface/95 backdrop-blur-xl',
            MENU_BUTTON_VISIBLE,
          )}
        >
          <div className="mx-auto grid max-w-none grid-cols-1 gap-1 px-4 py-4 sm:px-6 lg:px-6 xl:max-w-[1536px]">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-lg px-3 py-2.5 text-[15px] font-semibold transition-colors duration-150',
                    isActive
                      ? 'bg-gold/10 text-gold'
                      : 'text-text-muted hover:bg-surface hover:text-text',
                  )
                }
              >
                {t(link.labelKey)}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <>
                <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
                  <span className="px-3 text-sm text-text-muted">
                    {t('navigation.signedInAs', { email: user?.email ?? '' })}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg border border-border-strong px-3 py-2.5 text-center text-sm font-medium text-text-muted hover:border-gold hover:text-gold"
                  >
                    {t('navigation.logout')}
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
                <NavLink
                  to={paths.login}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-semibold text-text-muted hover:bg-surface hover:text-text"
                >
                  {t('navigation.login')}
                </NavLink>
                <NavLink
                  to={paths.register}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-gold px-3 py-2.5 text-center text-[15px] font-semibold text-on-gold"
                >
                  {t('navigation.getStarted')}
                </NavLink>
              </div>
            )}

            <LanguageMenuList />
            <div className="mt-3 border-t border-border pt-3">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {isOpen ? (
        <path
          d="M5 5l12 12M17 5L5 17"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M3 6h16M3 11h16M3 16h16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
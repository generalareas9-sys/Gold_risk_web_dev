import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Brand } from '../common/Brand'
import { PageContainer } from './PageContainer'
import { authenticatedNavLinks, paths, publicNavLinks } from '../../routes/paths'
import { cn } from '../../utils/cn'
import { useAuth } from '../../auth/useAuth'
import { useLanguage } from '../../i18n/useLanguage'
import { LanguageSelect, LanguageMenuList } from '../../i18n/LanguageSelect'
import { ThemeToggle } from '../../theme/ThemeToggle'

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative text-[15px] font-semibold transition-colors duration-150',
    'after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-gold after:transition-transform after:duration-200',
    isActive ? 'text-gold after:scale-x-100' : 'text-text-muted hover:text-text',
  )

function PublicActions() {
  const { t } = useLanguage()
  return (
    <div className="hidden items-center gap-3 lg:flex">
      <NavLink
        to={paths.login}
        className="px-2 text-sm text-text-muted transition-colors duration-150 hover:text-text"
      >
        {t('navigation.login')}
      </NavLink>
      <NavLink
        to={paths.register}
        className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-on-gold shadow-lg shadow-gold-glow transition-all duration-150 hover:bg-gold-strong"
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
    <div className="hidden items-center gap-4 lg:flex">
      <span
        className="flex items-center gap-2 text-sm text-text-muted"
        title={t('navigation.signedInAs', { email: email ?? '' })}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border-strong bg-surface-raised font-mono text-xs text-gold">
          {(email ?? 'T').charAt(0).toUpperCase()}
        </span>
        <span className="max-w-[12rem] truncate">{email}</span>
      </span>
      <button
        type="button"
        onClick={onLogout}
        className="rounded-lg border border-border-strong px-4 py-2 text-sm font-medium text-text-muted transition-colors duration-150 hover:border-gold hover:text-gold"
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
      <PageContainer className="flex h-16 items-center justify-between gap-4">
        <NavLink
          to={isAuthenticated ? paths.calculator : paths.home}
          aria-label={t('navigation.home')}
          className="brand-trigger relative inline-flex shrink-0 items-center rounded-lg"
        >
          <Brand />
        </NavLink>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 xl:flex 2xl:gap-8"
        >
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses}>
              {t(link.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {isAuthenticated ? (
            <SignedInActions email={user?.email ?? null} onLogout={handleLogout} />
          ) : (
            <PublicActions />
          )}
          <LanguageSelect />
          <ThemeToggle />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded p-2 text-text lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </PageContainer>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="animate-menu-in border-t border-border bg-surface/95 backdrop-blur-xl lg:hidden"
        >
          <PageContainer className="flex flex-col gap-1 py-4">
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
          </PageContainer>
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
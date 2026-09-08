import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '../common/Logo'
import { PageContainer } from './PageContainer'
import { primaryNavLinks, paths } from '../../routes/paths'
import { cn } from '../../utils/cn'

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    'text-sm transition-colors duration-150',
    isActive ? 'text-gold' : 'text-text-muted hover:text-text',
  )

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm">
      <PageContainer className="flex h-16 items-center justify-between">
        <NavLink to={paths.home} className="flex items-center" aria-label="GoldRisk home">
          <Logo />
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {primaryNavLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to={paths.login}
            className="px-2 text-sm text-text-muted transition-colors duration-150 hover:text-text"
          >
            Log in
          </NavLink>
          <NavLink
            to={paths.register}
            className="rounded bg-gold px-4 py-2 text-sm font-medium text-on-gold transition-colors duration-150 hover:bg-gold-strong"
          >
            Register
          </NavLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded p-2 text-text lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <MenuIcon isOpen={isMenuOpen} />
        </button>
      </PageContainer>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-border bg-bg lg:hidden"
        >
          <PageContainer className="flex flex-col gap-1 py-4">
            {primaryNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded px-3 py-2.5 text-sm',
                    isActive ? 'text-gold' : 'text-text-muted hover:bg-surface hover:text-text',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <NavLink
                to={paths.login}
                onClick={() => setIsMenuOpen(false)}
                className="rounded px-3 py-2.5 text-sm text-text-muted hover:bg-surface hover:text-text"
              >
                Log in
              </NavLink>
              <NavLink
                to={paths.register}
                onClick={() => setIsMenuOpen(false)}
                className="rounded bg-gold px-3 py-2.5 text-center text-sm font-medium text-on-gold"
              >
                Register
              </NavLink>
            </div>
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

import { NavLink } from 'react-router-dom'
import { Logo } from '../common/Logo'
import { PageContainer } from './PageContainer'
import { footerNavLinks, legalNavLinks } from '../../routes/paths'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <PageContainer className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="text-sm text-text-muted">Risk calculator for XAUUSD traders</p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-2.5">
          <h2 className="text-sm font-medium text-text">Navigation</h2>
          {footerNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="text-sm text-text-muted transition-colors duration-150 hover:text-text"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <nav aria-label="Legal" className="flex flex-col gap-2.5">
          <h2 className="text-sm font-medium text-text">Legal</h2>
          {legalNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="text-sm text-text-muted transition-colors duration-150 hover:text-text"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-sm font-medium text-text">Disclaimer</h2>
          <p className="text-sm text-text-muted">
            GoldRisk is a calculation tool and does not execute trades or provide financial
            advice.
          </p>
        </div>
      </PageContainer>

      <div className="border-t border-border py-6">
        <PageContainer>
          <p className="text-xs text-text-faint">© {year} GoldRisk. All rights reserved.</p>
        </PageContainer>
      </div>
    </footer>
  )
}

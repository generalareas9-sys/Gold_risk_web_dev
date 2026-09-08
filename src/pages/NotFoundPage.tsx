import { NavLink } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { paths } from '../routes/paths'

export function NotFoundPage() {
  return (
    <Section className="pt-20 text-center">
      <p className="font-mono text-sm text-text-faint">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-text">Page not found</h1>
      <p className="mt-2 text-sm text-text-muted">
        The page you're looking for doesn't exist or has moved.
      </p>
      <NavLink to={paths.home} className="mt-6 inline-block text-sm text-gold hover:text-gold-strong">
        Back to the calculator
      </NavLink>
    </Section>
  )
}

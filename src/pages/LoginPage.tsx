import { NavLink } from 'react-router-dom'
import { Card } from '../components/common/Card'
import { Input } from '../components/common/Input'
import { Button } from '../components/common/Button'
import { PageContainer } from '../components/layout/PageContainer'
import { paths } from '../routes/paths'

export function LoginPage() {
  return (
    <PageContainer className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
      <Card className="w-full max-w-sm p-8">
        <h1 className="text-xl font-semibold text-text">Log in</h1>
        <p className="mt-1 text-sm text-text-muted">
          Accounts are not available yet. This form is a preview of the login screen.
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
          <Input label="Email" type="email" placeholder="you@example.com" disabled />
          <Input label="Password" type="password" placeholder="••••••••" disabled />
          <Button type="submit" disabled className="mt-2 w-full">
            Log in
          </Button>
        </form>

        <p className="mt-6 text-sm text-text-muted">
          Don't have an account?{' '}
          <NavLink to={paths.register} className="text-gold hover:text-gold-strong">
            Register
          </NavLink>
        </p>
      </Card>
    </PageContainer>
  )
}

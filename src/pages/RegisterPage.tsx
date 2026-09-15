import { NavLink } from 'react-router-dom'
import { Card } from '../components/common/Card'
import { Input } from '../components/common/Input'
import { Button } from '../components/common/Button'
import { PageContainer } from '../components/layout/PageContainer'
import { paths } from '../routes/paths'

export function RegisterPage() {
  return (
    <PageContainer className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
      <Card className="w-full max-w-sm p-8">
        <h1 className="text-xl font-semibold text-text">Create an account</h1>
        <p className="mt-1 text-sm text-text-muted">
          Registration is not available yet. This form is a preview of the sign-up screen.
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
          <Input label="Email" type="email" placeholder="you@example.com" disabled />
          <Input label="Password" type="password" placeholder="••••••••" disabled />
          <Input label="Confirm password" type="password" placeholder="••••••••" disabled />
          <Button type="submit" disabled className="mt-2 w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-sm text-text-muted">
          Already have an account?{' '}
          <NavLink to={paths.login} className="text-gold hover:text-gold-strong">
            Log in
          </NavLink>
        </p>
      </Card>
    </PageContainer>
  )
}

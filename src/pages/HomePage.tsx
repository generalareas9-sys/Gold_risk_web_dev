import { NavLink } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { PageContainer } from '../components/layout/PageContainer'
import { CalculatorPlaceholder } from '../components/calculator/CalculatorPlaceholder'
import { paths } from '../routes/paths'

export function HomePage() {
  return (
    <>
      <section className="border-b border-border pb-16 pt-16 sm:pb-20 sm:pt-24">
        <PageContainer>
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-gold">Risk calculator for XAUUSD traders</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-text sm:text-5xl">
              Size every gold trade to the risk you actually chose
            </h1>
            <p className="mt-5 text-base text-text-muted sm:text-lg">
              Calculate position size based on your account balance, risk amount, entry price,
              and stop-loss distance.
            </p>
            <a
              href="#calculator"
              className="mt-8 inline-flex items-center justify-center rounded bg-gold px-7 py-3.5 text-base font-medium text-on-gold transition-colors duration-150 hover:bg-gold-strong"
            >
              Start calculating
            </a>
          </div>
        </PageContainer>
      </section>

      <Section id="calculator" className="border-b border-border">
        <CalculatorPlaceholder />
      </Section>

      <Section className="border-b border-border">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-text">One number, calculated properly</h2>
          <p className="mt-4 text-base text-text-muted">
            Most position-sizing mistakes come from skipping the math under pressure. GoldRisk
            takes your account balance, the percentage you're willing to risk, and your
            stop-loss distance, and turns them into a lot size — so the risk on paper matches
            the risk you actually take.
          </p>
        </div>
      </Section>

      <Section className="border-b border-border">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold text-text">How it works</h2>
            <p className="mt-4 text-sm text-text-muted">
              Three inputs, one result: enter your balance and risk, set your trade levels, and
              get a lot size sized to match.
            </p>
            <NavLink
              to={paths.howItWorks}
              className="mt-5 inline-block text-sm font-medium text-gold hover:text-gold-strong"
            >
              See the full walkthrough
            </NavLink>
          </div>
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold text-text">Supported brokers</h2>
            <p className="mt-4 text-sm text-text-muted">
              GoldRisk is built to work with any broker's XAUUSD contract specification, not a
              fixed list.
            </p>
            <NavLink
              to={paths.supportedBrokers}
              className="mt-5 inline-block text-sm font-medium text-gold hover:text-gold-strong"
            >
              View broker details
            </NavLink>
          </div>
        </div>
      </Section>
    </>
  )
}

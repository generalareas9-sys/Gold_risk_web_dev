import { PlaceholderPage } from './PlaceholderPage'

const steps = [
  {
    title: 'Enter your account details',
    body: 'Add your account balance and the percentage of it you are willing to risk on this trade.',
  },
  {
    title: 'Set your trade levels',
    body: 'Add your entry price and stop-loss for XAUUSD. Take-profit is optional but helps show your reward-to-risk ratio.',
  },
  {
    title: 'Get your position size',
    body: 'GoldRisk works out the lot size that matches the risk amount you set, based on the distance to your stop-loss.',
  },
]

export function HowItWorksPage() {
  return (
    <PlaceholderPage
      title="How it works"
      description="GoldRisk turns your risk tolerance and stop-loss distance into a position size, in three steps. The calculator itself is coming in a later phase — this page describes the flow it will follow."
    >
      <ol className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong font-mono text-sm text-gold">
              {index + 1}
            </span>
            <div>
              <h2 className="text-base font-medium text-text">{step.title}</h2>
              <p className="mt-1 text-sm text-text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </PlaceholderPage>
  )
}

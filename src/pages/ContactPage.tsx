import { PlaceholderPage } from './PlaceholderPage'

export function ContactPage() {
  return (
    <PlaceholderPage
      title="Contact"
      description="A contact form will be added once GoldRisk has a backend to send messages through. Until then, reach out by email."
    >
      <a
        href="mailto:hello@goldrisk.app"
        className="text-sm font-medium text-gold hover:text-gold-strong"
      >
        hello@goldrisk.app
      </a>
    </PlaceholderPage>
  )
}

/**
 * Central definition of every route path in the app. Nav components and
 * the router both read from here so a path never has to be typed twice.
 */
export const paths = {
  home: '/',
  howItWorks: '/how-it-works',
  riskManagement: '/risk-management',
  supportedBrokers: '/supported-brokers',
  supportedInstruments: '/supported-instruments',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  accounts: '/accounts',
  history: '/history',
} as const

export interface NavLink {
  label: string
  path: string
}

/** Primary navigation, shown in the navbar. */
export const primaryNavLinks: NavLink[] = [
  { label: 'Calculator', path: paths.home },
  { label: 'How It Works', path: paths.howItWorks },
  { label: 'Risk Management', path: paths.riskManagement },
  { label: 'Supported Brokers', path: paths.supportedBrokers },
  { label: 'Supported Instruments', path: paths.supportedInstruments },
  { label: 'About', path: paths.about },
]

/** Footer navigation — the primary links plus Contact. */
export const footerNavLinks: NavLink[] = [
  ...primaryNavLinks,
  { label: 'Contact', path: paths.contact },
]

export const legalNavLinks: NavLink[] = [
  { label: 'Privacy Policy', path: paths.privacy },
  { label: 'Terms of Use', path: paths.terms },
]

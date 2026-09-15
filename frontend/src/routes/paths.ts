/**
 * Central definition of every route path in the app. Nav components and
 * the router both read from here so a path never has to be typed twice.
 * Nav labels are i18n keys resolved by the active locale at render time.
 */

import type { TranslationKey } from '../i18n/types'

export const paths = {
  home: '/',
  positionSizeCalculator: '/position-size-calculator',
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
  calculator: '/calculator',
  accounts: '/accounts',
  history: '/history',
} as const

export interface NavLink {
  labelKey: TranslationKey
  path: string
}

/** Public navigation — informational pages a visitor can reach before logging in. */
export const publicNavLinks: NavLink[] = [
  { labelKey: 'navigation.calculator', path: paths.positionSizeCalculator },
  { labelKey: 'navigation.howItWorks', path: paths.howItWorks },
  { labelKey: 'navigation.riskManagement', path: paths.riskManagement },
  { labelKey: 'navigation.supportedBrokers', path: paths.supportedBrokers },
  { labelKey: 'navigation.supportedInstruments', path: paths.supportedInstruments },
  { labelKey: 'navigation.about', path: paths.about },
]

/** Authenticated navigation — the in-app workspace, without public clutter. */
export const authenticatedNavLinks: NavLink[] = [
  { labelKey: 'navigation.calculator', path: paths.calculator },
  { labelKey: 'navigation.accounts', path: paths.accounts },
  { labelKey: 'navigation.history', path: paths.history },
]

/** Footer navigation — the public links plus Contact. */
export const footerNavLinks: NavLink[] = [
  ...publicNavLinks,
  { labelKey: 'navigation.contact', path: paths.contact },
]

export const legalNavLinks: NavLink[] = [
  { labelKey: 'navigation.privacy', path: paths.privacy },
  { labelKey: 'navigation.terms', path: paths.terms },
]
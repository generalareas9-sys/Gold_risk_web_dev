import { describe, expect, it } from 'vitest'
import { authenticatedNavLinks, paths, publicNavLinks } from './paths'

describe('marquee and nav CTA wiring', () => {
  it('points the marquee CTAs at the real login and register destinations', () => {
    expect(paths.register).toBe('/register')
    expect(paths.login).toBe('/login')
    expect(paths.register).not.toBe(paths.login)
  })

  it('targets the authenticated workspace from the brand when signed in', () => {
    expect(paths.calculator).toBe('/calculator')
  })

  it('keeps the Google OAuth callback route registered', () => {
    expect(paths.googleCallback).toBe('/auth/google/callback')
  })

  it('exposes six public and three authenticated nav links', () => {
    expect(publicNavLinks).toHaveLength(6)
    expect(authenticatedNavLinks).toHaveLength(3)
  })

  it('labels every nav link with a translation key', () => {
    for (const link of [...publicNavLinks, ...authenticatedNavLinks]) {
      expect(link.labelKey.startsWith('navigation.')).toBe(true)
      expect(link.path.startsWith('/')).toBe(true)
    }
  })
})
import { randomUUID } from 'node:crypto'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

/**
 * Google OAuth (Authorization Code flow).
 *
 * Flow:
 *   1. GET /api/auth/google redirects the browser to Google's consent screen
 *      with a short-lived signed `state` (CSRF protection).
 *   2. Google redirects back to /api/auth/google/callback?code=&state=.
 *   3. The backend exchanges `code` for tokens using the client secret and
 *      verifies the returned ID token against Google's signing keys
 *      (`google-auth-library`, which caches Google's JWKS).
 *   4. `GoogleProviderService.verifyAndGetProfile` returns the identity the
 *      backend trusts (sub, verified email, name). Arbitrary client-provided
 *      profile data is never trusted.
 *
 * `GoogleProviderService` is an interface so tests can inject a fake; the
 * default `GoogleOAuthService` is Google's official client.
 */

export interface GoogleProfile {
  /** Google's stable identifier for the account (the `sub` claim). */
  googleId: string
  email: string
  /** Google's own verification that the user controls this email address. */
  emailVerified: boolean
  name: string | null
}

export interface GoogleProviderService {
  /** Builds the Google consent URL carrying a signed anti-CSRF state. */
  buildAuthUrl(state: string): string
  /** Exchanges the authorization code and returns the verified profile. */
  verifyAndGetProfile(code: string): Promise<GoogleProfile>
}

export interface GoogleOAuthConfig {
  clientId: string
  clientSecret: string
  callbackUrl: string
}

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_SCOPES = ['openid', 'email', 'profile']

/**
 * Real Google implementation using Google's official `google-auth-library`
 * client: exchanges the code at Google's token endpoint and verifies the ID
 * token signature/claims against the configured client id.
 */
export class GoogleOAuthService implements GoogleProviderService {
  private readonly client: OAuth2Client

  constructor(private readonly config: GoogleOAuthConfig) {
    this.client = new OAuth2Client(config.clientId, config.clientSecret, config.callbackUrl)
  }

  buildAuthUrl(state: string): string {
    const url = new URL(GOOGLE_AUTH_URL)
    url.searchParams.set('client_id', this.config.clientId)
    url.searchParams.set('redirect_uri', this.config.callbackUrl)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('scope', GOOGLE_SCOPES.join(' '))
    url.searchParams.set('access_type', 'online')
    url.searchParams.set('prompt', 'select_account')
    url.searchParams.set('state', state)
    return url.toString()
  }

  async verifyAndGetProfile(code: string): Promise<GoogleProfile> {
    const { tokens } = await this.client.getToken({
      code,
      redirect_uri: this.config.callbackUrl,
    })

    const idToken = tokens.id_token
    if (idToken === undefined || idToken === null || idToken === '') {
      throw new Error('Google did not return an ID token for the authorization code.')
    }

    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: this.config.clientId,
    })
    const payload = ticket.getPayload()

    if (payload === undefined || payload.sub === undefined || payload.email === undefined) {
      throw new Error('Google ID token is missing the required identity claims.')
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified === true,
      name: typeof payload.name === 'string' ? payload.name : null,
    }
  }
}

/**
 * Returns a configured Google service, or null when Google OAuth is not
 * configured (missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET /
 * GOOGLE_CALLBACK_URL). Endpoints surface a clear 503 in that case.
 */
export function createGoogleProvider(config: GoogleOAuthConfig | null): GoogleProviderService | null {
  if (config === null) return null
  return new GoogleOAuthService(config)
}

const GOOGLE_STATE_PURPOSE = 'goldrisk-google-oauth-state'
const GOOGLE_STATE_TTL = '10m'

/**
 * Signs the anti-CSRF `state` value. Stateless by design: the backend has no
 * session store, so the state is a short-lived JWT signed with the existing
 * JWT secret (a separate purpose claim keeps it distinct from access tokens).
 */
export function createGoogleState(jwtSecret: string): string {
  return jwt.sign(
    { purpose: GOOGLE_STATE_PURPOSE, nonce: randomUUID() },
    jwtSecret,
    { expiresIn: GOOGLE_STATE_TTL },
  )
}

/** Verifies the `state` echoed by Google was one this backend generated. */
export function verifyGoogleState(state: unknown, jwtSecret: string): boolean {
  if (typeof state !== 'string' || state === '') return false
  try {
    const payload = jwt.verify(state, jwtSecret) as JwtPayload
    return payload.purpose === GOOGLE_STATE_PURPOSE
  } catch {
    return false
  }
}
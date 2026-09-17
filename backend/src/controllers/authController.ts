import type { Request, Response } from 'express'
import type { UserRepository } from '../db/usersRepository.ts'
import type { TokenStore } from '../db/tokenStore.ts'
import type { AuthUser } from '../auth/jwt.ts'
import {
  getCurrentUser,
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
} from '../auth/authService.ts'
import {
  createGoogleState,
  verifyGoogleState,
  type GoogleProviderService,
} from '../auth/googleService.ts'
import { HttpError } from '../utils/HttpError.ts'

export interface AuthController {
  register(req: Request, res: Response): Promise<void>
  login(req: Request, res: Response): Promise<void>
  googleInitiate(req: Request, res: Response): Promise<void>
  googleCallback(req: Request, res: Response): Promise<void>
  me(req: Request, res: Response): Promise<void>
  logout(req: Request, res: Response): Promise<void>
}

/** The authenticate middleware always sets req.user, but this keeps handlers honest. */
function requireAuthUser(req: Request): AuthUser {
  if (req.user === undefined) {
    throw new HttpError(401, 'Authentication required.')
  }
  return req.user
}

export interface AuthControllerDependencies {
  userRepository: UserRepository
  tokenStore: TokenStore
  googleProvider: GoogleProviderService | null
  jwtSecret: string
  frontendUrl: string
}

export function createAuthController(
  userRepository: UserRepository,
  tokenStore: TokenStore,
  dependencies: Pick<AuthControllerDependencies, 'googleProvider' | 'jwtSecret' | 'frontendUrl'>,
): AuthController {
  return {
    async register(req: Request, res: Response): Promise<void> {
      const user = await registerUser(userRepository, req.body)
      res.status(201).json({ success: true, data: { user } })
    },

    async login(req: Request, res: Response): Promise<void> {
      const { token, user } = await loginUser(userRepository, req.body)
      res.json({ success: true, data: { token, user } })
    },

    async googleInitiate(_req: Request, res: Response): Promise<void> {
      const google = requireGoogleProvider(dependencies.googleProvider)
      const state = createGoogleState(dependencies.jwtSecret)
      res.redirect(google.buildAuthUrl(state))
    },

    async googleCallback(req: Request, res: Response): Promise<void> {
      const google = requireGoogleProvider(dependencies.googleProvider)

      const code = req.query.code
      if (typeof code !== 'string' || code === '') {
        throw new HttpError(400, 'Google OAuth callback is missing the authorization code.')
      }
      if (!verifyGoogleState(req.query.state, dependencies.jwtSecret)) {
        throw new HttpError(403, 'Invalid or expired Google OAuth state.')
      }

      const profile = await google.verifyAndGetProfile(code)
      const { token } = await googleLogin(userRepository, profile)

      // Hand the normal GoldRisk JWT to the frontend through the URL hash
      // (never sent to any server, stripped by the callback page with
      // history.replaceState after it is persisted).
      const callbackPath = '/auth/google/callback'
      res.redirect(
        `${dependencies.frontendUrl}${callbackPath}#token=${encodeURIComponent(token)}`,
      )
    },

    async me(req: Request, res: Response): Promise<void> {
      const auth = requireAuthUser(req)
      const user = await getCurrentUser(userRepository, auth.id)
      res.json({ success: true, data: { user } })
    },

    async logout(req: Request, res: Response): Promise<void> {
      const auth = requireAuthUser(req)
      await logoutUser(tokenStore, auth)
      res.json({ success: true, message: 'Logged out successfully.' })
    },
  }
}

function requireGoogleProvider(provider: GoogleProviderService | null): GoogleProviderService {
  if (provider === null) {
    throw new HttpError(
      503,
      'Google sign-in is not configured. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and ' +
        'GOOGLE_CALLBACK_URL to the backend `.env` file.',
    )
  }
  return provider
}
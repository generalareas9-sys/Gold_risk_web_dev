import { API_BASE_URL } from './api.ts'

/**
 * Builds the URL that starts the Google OAuth Authorization Code flow.
 *
 * The browser is navigated to this backend route, which redirects to Google's
 * consent screen and later back to the registered callback. The Google client
 * secret never touches the frontend.
 */
export function getGoogleAuthUrl(): string {
  return `${API_BASE_URL}/auth/google`
}

export function isGoogleAuthConfigured(): boolean {
  return API_BASE_URL.length > 0
}
import { http } from '@/lib/http'
import type { AuthUser, Credentials } from '@/lib/types'

/**
 * Auth API. The backend sets/clears an httpOnly JWT cookie; these calls carry it
 * automatically (http uses credentials: 'include'). Endpoints to be added to the
 * gateway: POST /v1/auth/signup, /login, /logout and GET /v1/auth/me.
 */
export const authApi = {
  me: () => http.get<AuthUser>('/v1/auth/me'),
  login: (creds: Credentials) => http.post<AuthUser>('/v1/auth/login', creds),
  signup: (creds: Credentials) => http.post<AuthUser>('/v1/auth/signup', creds),
  logout: () => http.post<void>('/v1/auth/logout'),
}

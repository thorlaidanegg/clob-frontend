import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { authApi } from '@/api/auth'
import { ApiError } from '@/lib/http'
import { wsClient } from '@/ws/client'
import type { AuthUser, Credentials } from '@/lib/types'

type AuthStatus = 'loading' | 'authed' | 'guest'

interface AuthContextValue {
  user: AuthUser | null
  status: AuthStatus
  login: (creds: Credentials) => Promise<void>
  signup: (creds: Credentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  // Bootstrap: ask the server who we are (the JWT cookie travels automatically).
  useEffect(() => {
    let alive = true
    authApi
      .me()
      .then((u) => {
        if (!alive) return
        setUser(u)
        setStatus('authed')
      })
      .catch((err: unknown) => {
        if (!alive) return
        if (err instanceof ApiError && err.isUnauthorized) {
          setStatus('guest')
        } else {
          setStatus('guest')
        }
      })
    return () => {
      alive = false
    }
  }, [])

  // The WS feed is cookie-authed too; start it once we know the user.
  useEffect(() => {
    if (status === 'authed') wsClient.start()
    return () => wsClient.stop()
  }, [status])

  const apply = useCallback((u: AuthUser) => {
    setUser(u)
    setStatus('authed')
  }, [])

  const login = useCallback(
    async (creds: Credentials) => {
      apply(await authApi.login(creds))
    },
    [apply],
  )
  const signup = useCallback(
    async (creds: Credentials) => {
      apply(await authApi.signup(creds))
    },
    [apply],
  )
  const logout = useCallback(async () => {
    await authApi.logout().catch(() => undefined)
    wsClient.stop()
    setUser(null)
    setStatus('guest')
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, login, signup, logout }),
    [user, status, login, signup, logout],
  )
  return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth(): AuthContextValue {
  const ctx = use(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}

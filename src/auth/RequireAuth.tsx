import { Navigate } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useAuth } from './AuthContext'

/** Gates a subtree behind authentication. Redirects guests to /login. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth()
  if (status === 'loading') {
    return (
      <div className="grid h-full place-items-center text-muted">
        <span className="animate-pulse text-sm">Loading…</span>
      </div>
    )
  }
  if (status === 'guest') return <Navigate to="/login" />
  return <>{children}</>
}

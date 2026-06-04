import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/auth/AuthContext'
import { ApiError } from '@/lib/http'

export function LoginPage() {
  const { login, signup } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await (mode === 'login' ? login : signup)({ email, password })
      void navigate({ to: '/markets' })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-full place-items-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-edge bg-panel p-6">
        <h1 className="text-lg font-semibold">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-1 text-sm text-muted">Trade real markets with virtual credits.</p>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-edge bg-panel-2 px-3 py-2 text-sm outline-none focus:border-edge-strong"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-edge bg-panel-2 px-3 py-2 text-sm outline-none focus:border-edge-strong"
          />
          {error && <p className="text-sm text-down">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-accent py-2 text-sm font-medium text-black hover:opacity-90 disabled:opacity-50"
          >
            {busy ? '…' : mode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="mt-4 w-full text-center text-xs text-muted hover:text-zinc-100"
        >
          {mode === 'login' ? 'No account? Sign up' : 'Already have an account? Log in'}
        </button>
      </div>
    </div>
  )
}

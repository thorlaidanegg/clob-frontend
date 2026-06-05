import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { CandlestickChart, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { ApiError } from '@/lib/http'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Mode = 'login' | 'signup'

export function LoginPage() {
  const { login, signup } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
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
    <div className="relative grid min-h-screen w-full place-items-center overflow-hidden bg-bg px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-2xl" />

      <div className="relative z-10 w-full max-w-sm rounded-lg border border-edge bg-panel p-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-sm bg-accent/15">
              <CandlestickChart className="size-5 text-accent" />
            </div>
            <span className="text-lg font-semibold tracking-tight">PaperEx</span>
          </Link>
          <p className="text-[13px] text-muted">Virtual credits. Real mechanics.</p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex border-b border-edge">
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m)
                setError(null)
              }}
              className={`-mb-px flex-1 pb-3 text-sm font-medium transition-colors ${
                mode === m
                  ? 'border-b-2 border-accent text-zinc-50'
                  : 'text-muted hover:text-zinc-200'
              }`}
            >
              {m === 'login' ? 'Log in' : 'Sign up'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider text-muted">Email</label>
            <Input
              type="email"
              required
              autoComplete="email"
              placeholder="trader@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider text-muted">Password</label>
            <div className="relative">
              <Input
                type={show ? 'text' : 'password'}
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-zinc-200"
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-down">{error}</p>}

          <Button type="submit" disabled={busy} className="w-full">
            {busy ? '…' : mode === 'login' ? 'Log in' : 'Create account'}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="mt-6 w-full text-center text-xs text-muted hover:text-zinc-100"
        >
          {mode === 'login' ? (
            <>
              Don&apos;t have an account? <span className="text-accent">Sign up →</span>
            </>
          ) : (
            <>
              Already have an account? <span className="text-accent">Log in →</span>
            </>
          )}
        </button>

        <p className="mt-8 text-center text-[11px] text-muted/70">
          No deposit required · No KYC · Paper trading only
        </p>
      </div>
    </div>
  )
}

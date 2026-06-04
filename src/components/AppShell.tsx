import { Link, Outlet } from '@tanstack/react-router'
import { Activity } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { useWsStatus } from '@/ws/client'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/markets', label: 'Markets' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/settings/keys', label: 'API Keys' },
] as const

export function AppShell() {
  const { user, logout } = useAuth()
  const ws = useWsStatus()

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-12 shrink-0 items-center gap-6 border-b border-edge bg-panel px-4">
        <Link to="/markets" className="flex items-center gap-2 font-semibold tracking-tight">
          <Activity className="size-4 text-accent" />
          <span>clob</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded px-2.5 py-1 text-muted transition-colors hover:bg-panel-2 hover:text-zinc-100 [&.active]:text-zinc-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <span
              className={cn(
                'size-2 rounded-full',
                ws === 'open' ? 'bg-up' : ws === 'connecting' ? 'bg-amber-400' : 'bg-down',
              )}
            />
            {ws === 'open' ? 'Live' : ws === 'connecting' ? 'Connecting' : 'Offline'}
          </span>
          <span className="text-muted">{user?.email}</span>
          <button
            onClick={() => void logout()}
            className="rounded border border-edge px-2.5 py-1 text-muted transition-colors hover:text-zinc-100"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

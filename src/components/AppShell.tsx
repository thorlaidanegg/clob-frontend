import { Link, Outlet } from '@tanstack/react-router'
import { CandlestickChart, KeyRound, LineChart, Trophy, Wallet, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { usePortfolio } from '@/api/portfolio'
import { useWsStatus } from '@/ws/client'
import { formatDecimal } from '@/lib/format'
import { cn } from '@/lib/utils'

const NAV: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/markets', label: 'Markets', icon: LineChart },
  { to: '/trade', label: 'Trade', icon: Zap },
  { to: '/portfolio', label: 'Portfolio', icon: Wallet },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/settings/keys', label: 'Developer', icon: KeyRound },
]

function initials(email: string | undefined): string {
  if (!email) return '??'
  return email.slice(0, 2).toUpperCase()
}

export function AppShell() {
  const { user, logout } = useAuth()
  const ws = useWsStatus()
  const { data: portfolio } = usePortfolio()

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-12 shrink-0 items-center gap-1 border-b border-edge bg-[#0d0d10] px-4">
        <Link
          to="/markets"
          className="mr-4 flex items-center gap-2 font-bold tracking-tight"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-accent">
            <CandlestickChart className="size-4 text-black" />
          </div>
          <span className="text-sm">PaperEx</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                'flex items-center gap-1.5 rounded px-3 py-1.5 text-muted transition-colors hover:text-zinc-100',
                '[&.active]:text-zinc-100',
              )}
            >
              <n.icon className="size-3.5" />
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {portfolio && (
            <div className="rounded-full border border-edge bg-bg px-2.5 py-1">
              <span className="font-mono text-xs text-accent">
                ◎ {formatDecimal(portfolio.walletAvailable, 2)}
              </span>
            </div>
          )}
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <span
              className={cn(
                'size-2 rounded-full',
                ws === 'open' ? 'bg-accent' : ws === 'connecting' ? 'bg-amber-400' : 'bg-down',
              )}
            />
            {ws === 'open' ? 'Live' : ws === 'connecting' ? 'Connecting' : 'Offline'}
          </span>
          <button
            onClick={() => void logout()}
            title={user?.email}
            className="flex size-7 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold transition-colors hover:bg-neutral-700"
          >
            {initials(user?.email)}
          </button>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

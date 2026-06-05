import { Link, Outlet } from '@tanstack/react-router'
import { CandlestickChart, KeyRound, LineChart, Trophy, Wallet, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { usePortfolio } from '@/api/portfolio'
import { useWsStatus } from '@/ws/client'
import { useLiveSync } from '@/ws/useLiveSync'
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
  useLiveSync()

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-12 shrink-0 items-center gap-1 border-b border-edge bg-[#0d0d10] px-3 sm:px-4">
        <Link to="/markets" className="mr-2 flex items-center gap-2 font-bold tracking-tight sm:mr-4">
          <div className="flex size-6 items-center justify-center rounded-md bg-accent">
            <CandlestickChart className="size-4 text-black" />
          </div>
          <span className="hidden text-sm sm:inline">PaperEx</span>
        </Link>

        {/* Desktop inline nav */}
        <nav className="hidden items-center gap-1 text-sm lg:flex">
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

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {portfolio && (
            <div className="flex items-center gap-1.5 rounded-md border border-edge bg-panel-2 px-2 py-1 sm:gap-2 sm:pl-2.5 sm:pr-3">
              <Wallet className="size-3.5 shrink-0 text-muted" />
              <span className="hidden text-[10px] uppercase tracking-wide text-muted sm:inline">Avail</span>
              <span className="font-mono text-xs tabular-nums text-zinc-100 sm:text-sm">
                {formatDecimal(portfolio.walletAvailable, 2)}
              </span>
              <span className="hidden text-[10px] text-muted sm:inline">USD</span>
            </div>
          )}
          <span className="hidden items-center gap-1.5 text-xs text-muted sm:flex">
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
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold transition-colors hover:bg-neutral-700"
          >
            {initials(user?.email)}
          </button>
        </div>
      </header>

      {/* Content. Extra bottom padding on mobile so it clears the tab bar. */}
      <main className="min-h-0 flex-1 overflow-auto pb-14 lg:pb-0">
        <Outlet />
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid h-14 grid-cols-5 border-t border-edge bg-[#0d0d10] lg:hidden">
        {NAV.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 text-[10px] text-muted transition-colors',
              '[&.active]:text-accent',
            )}
          >
            <n.icon className="size-5" />
            <span>{n.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

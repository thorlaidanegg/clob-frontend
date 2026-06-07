import { useEffect, useState } from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import { Bot, CandlestickChart, Home, KeyRound, LineChart, Search, Trophy, Wallet, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { usePortfolio } from '@/api/portfolio'
import { useWsStatus } from '@/ws/client'
import { useLiveSync } from '@/ws/useLiveSync'
import { formatDecimal } from '@/lib/format'
import { cn } from '@/lib/utils'
import { CommandPalette } from './CommandPalette'

// Core app routes — shown in the desktop nav and the mobile bottom bar.
const NAV: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/markets', label: 'Markets', icon: LineChart },
  { to: '/trade', label: 'Trade', icon: Zap },
  { to: '/portfolio', label: 'Portfolio', icon: Wallet },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/settings/keys', label: 'Developer', icon: KeyRound },
]

// Secondary/marketing routes — desktop nav only.
const EXTRA_NAV: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/bots', label: 'Bots', icon: Bot },
  { to: '/', label: 'Home', icon: Home },
]

function initials(email: string | undefined): string {
  if (!email) return '??'
  return email.slice(0, 2).toUpperCase()
}

export function AppShell() {
  const { user, logout } = useAuth()
  const ws = useWsStatus()
  const { data: portfolio } = usePortfolio()
  const [cmdOpen, setCmdOpen] = useState(false)
  useLiveSync()

  // Global ⌘K / Ctrl-K opens the command palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex h-full flex-col">
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <header className="flex h-12 shrink-0 items-center justify-between gap-1 border-b border-edge bg-[#0d0d10] px-3 sm:px-4">
        <Link to="/markets" className="flex items-center gap-2 font-bold tracking-tight">
          <div className="flex size-6 items-center justify-center rounded-md bg-accent">
            <CandlestickChart className="size-4 text-black" />
          </div>
          <span className="hidden text-sm sm:inline">PaperEx</span>
        </Link>

        {/* Desktop inline nav — centered between the logo and the controls */}
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
          <span className="mx-1 h-5 w-px bg-edge" />
          {EXTRA_NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === '/' }}
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

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setCmdOpen(true)}
            className="hidden items-center gap-2 rounded-md border border-edge bg-panel-2 px-2.5 py-1 text-xs text-muted transition-colors hover:text-zinc-100 md:flex"
            title="Search (⌘K)"
          >
            <Search className="size-3.5" />
            <span>Search</span>
            <kbd className="rounded border border-edge px-1 font-mono text-[10px]">⌘K</kbd>
          </button>
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

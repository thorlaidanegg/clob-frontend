import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Bot, CornerDownLeft, Home, KeyRound, LineChart, Search, Trophy, Wallet, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useMarkets } from '@/api/markets'
import { cn } from '@/lib/utils'

interface Cmd {
  id: string
  label: string
  hint?: string
  icon: LucideIcon
  run: () => void
}

/**
 * A ⌘K / Ctrl-K command palette: fuzzy-jump to any market or page, fully
 * keyboard-driven (↑↓ to move, ↵ to go, esc to close).
 */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const { data: markets } = useMarkets()
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const go = (to: string, params?: Record<string, string>) => {
    void navigate({ to, params } as never)
    onClose()
  }

  const commands = useMemo<Cmd[]>(() => {
    const pages: Cmd[] = [
      { id: 'p:markets', label: 'Markets', hint: 'Page', icon: LineChart, run: () => go('/markets') },
      { id: 'p:portfolio', label: 'Portfolio', hint: 'Page', icon: Wallet, run: () => go('/portfolio') },
      { id: 'p:leaderboard', label: 'Leaderboard', hint: 'Page', icon: Trophy, run: () => go('/leaderboard') },
      { id: 'p:keys', label: 'Developer · API keys', hint: 'Page', icon: KeyRound, run: () => go('/settings/keys') },
      { id: 'p:bots', label: 'Bots', hint: 'Page', icon: Bot, run: () => go('/bots') },
      { id: 'p:home', label: 'Home', hint: 'Page', icon: Home, run: () => go('/') },
    ]
    const mkts: Cmd[] = (markets ?? []).map((m) => ({
      id: `m:${m.marketID}`,
      label: m.marketID,
      hint: 'Trade',
      icon: Zap,
      run: () => go('/trade/$market', { market: m.marketID }),
    }))
    return [...mkts, ...pages]
  }, [markets]) // eslint-disable-line react-hooks/exhaustive-deps

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q))
  }, [commands, query])

  // Reset selection when the query changes; keep it in range.
  useEffect(() => setSel(0), [query])
  useEffect(() => {
    if (open) {
      setQuery('')
      setSel(0)
      // focus after paint
      const id = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(id)
    }
  }, [open])

  // Keep the selected row scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${sel}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  if (!open) return null

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => Math.min(s + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      results[sel]?.run()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-edge bg-panel shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-edge px-3">
          <Search className="size-4 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a market or page…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
          <kbd className="hidden rounded border border-edge px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">esc</kbd>
        </div>

        <div ref={listRef} className="max-h-80 overflow-auto py-1">
          {results.length === 0 && <div className="px-4 py-8 text-center text-sm text-muted">No matches.</div>}
          {results.map((c, i) => {
            const Icon = c.icon
            return (
              <button
                key={c.id}
                data-idx={i}
                onClick={() => c.run()}
                onMouseMove={() => setSel(i)}
                className={cn(
                  'flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors',
                  i === sel ? 'bg-accent/10 text-zinc-50' : 'text-zinc-300',
                )}
              >
                <Icon className={cn('size-4 shrink-0', i === sel ? 'text-accent' : 'text-muted')} />
                <span className="flex-1 font-medium">{c.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-muted">{c.hint}</span>
                {i === sel && <CornerDownLeft className="size-3.5 text-muted" />}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-edge px-3 py-2 font-sans text-[10px] text-muted">
          <span className="flex items-center gap-1"><kbd className="rounded border border-edge px-1">↑</kbd><kbd className="rounded border border-edge px-1">↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="rounded border border-edge px-1">↵</kbd> open</span>
        </div>
      </div>
    </div>
  )
}

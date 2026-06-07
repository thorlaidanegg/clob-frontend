import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ChevronRight, Plus, Radio, Search, TrendingDown, TrendingUp } from 'lucide-react'
import { useMarkets, useRecentTrades } from '@/api/markets'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDecimal, toNum } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Market } from '@/lib/types'
import { CreateMarketModal } from './CreateMarketModal'

const BADGE_COLORS = [
  'bg-[#f7931a]/20 text-[#f7931a]',
  'bg-[#627eea]/20 text-[#627eea]',
  'bg-[#00ffa3]/20 text-[#00ffa3]',
  'bg-[#f3ba2f]/20 text-[#f3ba2f]',
  'bg-[#e6007a]/20 text-[#e6007a]',
  'bg-[#2a5ada]/20 text-[#2a5ada]',
]

function badgeColor(asset: string): string {
  let h = 0
  for (let i = 0; i < asset.length; i++) h = (h * 31 + asset.charCodeAt(i)) >>> 0
  return BADGE_COLORS[h % BADGE_COLORS.length]
}

/** A small price sparkline with a soft area fill. */
function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  const W = 104
  const H = 30
  const PAD = 3
  if (points.length < 2) {
    return (
      <svg width={W} height={H} className="opacity-40">
        <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="var(--color-edge)" strokeWidth={1} strokeDasharray="2 3" />
      </svg>
    )
  }
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const step = (W - PAD * 2) / (points.length - 1)
  const xy = points.map((p, i) => [PAD + i * step, PAD + (1 - (p - min) / range) * (H - PAD * 2)] as const)
  const line = xy.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${xy.at(-1)![0].toFixed(1)},${H} L${xy[0][0].toFixed(1)},${H} Z`
  const color = up ? 'var(--color-up)' : 'var(--color-down)'
  const gid = `spark-${up ? 'up' : 'dn'}`
  return (
    <svg width={W} height={H} className="overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={xy.at(-1)![0]} cy={xy.at(-1)![1]} r={2} fill={color} />
    </svg>
  )
}

/** Returns a brief flash direction whenever `value` changes (for price ticks). */
function useFlash(value: number | undefined): 'up' | 'down' | null {
  const prev = useRef(value)
  const [flash, setFlash] = useState<'up' | 'down' | null>(null)
  useEffect(() => {
    if (prev.current !== undefined && value !== undefined && value !== prev.current) {
      setFlash(value >= prev.current ? 'up' : 'down')
      const id = setTimeout(() => setFlash(null), 650)
      prev.current = value
      return () => clearTimeout(id)
    }
    prev.current = value
  }, [value])
  return flash
}

function MarketRow({ m, index }: { m: Market; index: number }) {
  const navigate = useNavigate()
  // Poll recent trades so the list ticks like a real exchange terminal.
  const { data: trades } = useRecentTrades(m.marketID, { refetchInterval: 8000 })

  const prices = useMemo(() => (trades ?? []).map((t) => toNum(t.price)).reverse(), [trades])
  const last = prices.at(-1)
  const first = prices[0]
  const change = last != null && first ? ((last - first) / first) * 100 : null
  const up = (change ?? 0) >= 0
  const flash = useFlash(last)

  const go = () => void navigate({ to: '/trade/$market', params: { market: m.marketID } })

  return (
    <tr
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          go()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Trade ${m.marketID}`}
      className={cn(
        'group h-14 cursor-pointer border-b border-edge outline-none transition-colors hover:bg-panel/70 focus-visible:bg-panel/70',
        index % 2 === 1 && 'bg-[#0d0d10]',
      )}
    >
      <td className="px-4 font-mono text-muted">{index + 1}</td>

      <td className="px-4">
        <div className="flex items-center gap-2.5">
          <div className={cn('flex size-7 items-center justify-center rounded-full text-[11px] font-bold', badgeColor(m.baseAsset))}>
            {m.baseAsset.slice(0, 1)}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold">{m.marketID}</span>
            <span className="text-[11px] text-muted">
              {m.baseAsset} / {m.quoteAsset}
            </span>
          </div>
        </div>
      </td>

      <td className="px-4 text-right">
        <span
          className={cn(
            'rounded-sm px-1.5 py-0.5 font-mono tabular-nums transition-colors',
            flash === 'up' && 'bg-up/20 text-up',
            flash === 'down' && 'bg-down/20 text-down',
          )}
        >
          {last != null ? formatDecimal(last, m.pricePrecision) : '—'}
        </span>
      </td>

      <td className="px-4 text-right">
        {change == null ? (
          <span className="text-muted">—</span>
        ) : (
          <span className={cn('inline-flex items-center justify-end gap-1 font-mono tabular-nums', up ? 'text-up' : 'text-down')}>
            {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
            {up ? '+' : ''}
            {change.toFixed(2)}%
          </span>
        )}
      </td>

      <td className="px-4">
        <div className="flex justify-end">
          <Sparkline points={prices.slice(-24)} up={up} />
        </div>
      </td>

      <td className="px-4 text-right">
        <span
          className={cn(
            'rounded-sm px-2 py-0.5 text-xs font-medium',
            m.state === 'open' ? 'bg-accent/15 text-accent' : 'bg-down/15 text-down',
          )}
        >
          {m.state}
        </span>
      </td>

      <td className="w-8 pr-3 text-right">
        <ChevronRight className="ml-auto size-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
      </td>
    </tr>
  )
}

export function MarketsPage() {
  const { data: markets, isLoading } = useMarkets()
  const [query, setQuery] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return markets ?? []
    return (markets ?? []).filter(
      (m) =>
        m.marketID.toLowerCase().includes(q) ||
        m.baseAsset.toLowerCase().includes(q) ||
        m.quoteAsset.toLowerCase().includes(q),
    )
  }, [markets, query])

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">Markets</h1>
          <span className="flex items-center gap-1.5 rounded-full border border-edge bg-panel px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
            <Radio className="size-3 animate-pulse text-accent" /> live
          </span>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search markets…"
              className="h-9 border-0 bg-[#0d0d10] pl-9"
            />
          </div>
          <Button size="sm" className="h-9 shrink-0 gap-1.5" onClick={() => setShowCreate(true)}>
            <Plus className="size-4" />
            <span className="hidden sm:inline">Create market</span>
          </Button>
        </div>
      </div>

      {showCreate && <CreateMarketModal onClose={() => setShowCreate(false)} />}

      <div className="overflow-x-auto rounded-lg border border-edge">
        <table className="w-full min-w-160 border-collapse">
          <thead>
            <tr className="border-b border-edge bg-panel text-[11px] uppercase tracking-wider text-muted">
              <th className="w-12 px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Market</th>
              <th className="px-4 py-3 text-right font-medium">Last price</th>
              <th className="px-4 py-3 text-right font-medium">Change</th>
              <th className="px-4 py-3 text-right font-medium">Trend</th>
              <th className="px-4 py-3 text-right font-medium">Status</th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody className="text-sm">
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  Loading markets…
                </td>
              </tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  {markets?.length ? 'No markets match your search.' : 'No markets yet — create one to get started.'}
                </td>
              </tr>
            )}
            {filtered.map((m, i) => (
              <MarketRow key={m.marketID} m={m} index={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

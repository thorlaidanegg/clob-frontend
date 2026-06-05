import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useMarkets } from '@/api/markets'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { feeRateToPct, rawToDecimal } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Market } from '@/lib/types'

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

function MarketTableRow({ m, index }: { m: Market; index: number }) {
  return (
    <tr className={cn('h-12 border-b border-edge', index % 2 === 1 && 'bg-[#0d0d10]')}>
      <td className="px-4 font-mono text-muted">{index + 1}</td>
      <td className="px-4">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              'flex size-6 items-center justify-center rounded-full text-[10px] font-bold',
              badgeColor(m.baseAsset),
            )}
          >
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
      <td className="px-4 text-right font-mono text-muted">
        {rawToDecimal(m.tickSize, m.pricePrecision)}
      </td>
      <td className="px-4 text-right font-mono text-muted">
        {rawToDecimal(m.lotSize, m.qtyPrecision)}
      </td>
      <td className="px-4 text-right font-mono">
        <span className={m.makerFeeRate < 0 ? 'text-up' : 'text-muted'}>
          {feeRateToPct(m.makerFeeRate)}
        </span>
      </td>
      <td className="px-4 text-right font-mono text-muted">{feeRateToPct(m.takerFeeRate)}</td>
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
      <td className="px-4 text-right">
        <Link to="/trade/$market" params={{ market: m.marketID }}>
          <Button variant="outline" size="sm" className="h-7 px-3 text-xs text-accent">
            Trade →
          </Button>
        </Link>
      </td>
    </tr>
  )
}

export function MarketsPage() {
  const { data: markets, isLoading } = useMarkets()
  const [query, setQuery] = useState('')

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
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Markets</h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search markets…"
            className="h-9 border-0 bg-[#0d0d10] pl-9"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-edge">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-edge bg-panel text-[11px] uppercase tracking-wider text-muted">
              <th className="w-12 px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Market</th>
              <th className="px-4 py-3 text-right font-medium">Tick</th>
              <th className="px-4 py-3 text-right font-medium">Lot</th>
              <th className="px-4 py-3 text-right font-medium">Maker</th>
              <th className="px-4 py-3 text-right font-medium">Taker</th>
              <th className="px-4 py-3 text-right font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {isLoading && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted">
                  Loading markets…
                </td>
              </tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted">
                  {markets?.length ? 'No markets match your search.' : 'No markets yet.'}
                </td>
              </tr>
            )}
            {filtered.map((m, i) => (
              <MarketTableRow key={m.marketID} m={m} index={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

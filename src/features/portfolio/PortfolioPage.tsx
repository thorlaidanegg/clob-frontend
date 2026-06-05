import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { Wallet } from 'lucide-react'
import { usePortfolio } from '@/api/portfolio'
import { formatDecimal, formatSigned, signOf, toNum } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Position } from '@/lib/types'

function pnlClass(v: string | number): string {
  const s = signOf(v)
  return s === 'up' ? 'text-up' : s === 'down' ? 'text-down' : 'text-muted'
}

export function PortfolioPage() {
  const { data, isLoading } = usePortfolio()
  const positions = data?.positions ?? []

  const totals = useMemo(() => {
    const realised = positions.reduce((s, p) => s + toNum(p.realisedPnl), 0)
    const unrealised = positions.reduce((s, p) => s + toNum(p.unrealisedPnl), 0)
    const available = toNum(data?.walletAvailable)
    const reserved = toNum(data?.walletReserved)
    const equity = available + reserved + unrealised
    return { realised, unrealised, available, reserved, equity }
  }, [positions, data])

  // PnL-by-market list (realised + unrealised per position), sorted by magnitude.
  const pnlByMarket = useMemo(() => {
    const rows = positions
      .map((p) => ({ market: p.marketID, pnl: toNum(p.realisedPnl) + toNum(p.unrealisedPnl) }))
      .sort((a, b) => Math.abs(b.pnl) - Math.abs(a.pnl))
    const max = Math.max(1, ...rows.map((r) => Math.abs(r.pnl)))
    return { rows, max }
  }, [positions])

  return (
    <div className="bg-bg p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Portfolio</h1>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Available Balance" value={formatDecimal(totals.available, 2)} sub="Virtual Credits" />
        <StatCard label="Reserved (in orders)" value={formatDecimal(totals.reserved, 2)} sub="Margin / open orders" />
        <StatCard label="Realized PnL" value={formatSigned(totals.realised)} sub="All time" valueClass={pnlClass(totals.realised)} />
        <StatCard label="Unrealized PnL" value={formatSigned(totals.unrealised)} sub="Open positions" valueClass={pnlClass(totals.unrealised)} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[65%_35%]">
        {/* Positions */}
        <div className="rounded-lg border border-edge bg-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-base font-bold">Open Positions</h2>
            {positions.length > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                {positions.length}
              </span>
            )}
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-edge text-[11px] uppercase text-muted">
                <th className="py-2 text-left font-medium">Market</th>
                <th className="py-2 text-left font-medium">Side</th>
                <th className="py-2 text-right font-medium">Qty</th>
                <th className="py-2 text-right font-medium">Avg Entry</th>
                <th className="py-2 text-right font-medium">Mark</th>
                <th className="py-2 text-right font-medium">Unreal. PnL</th>
                <th className="py-2 text-right font-medium">Realized</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted">
                    Loading…
                  </td>
                </tr>
              )}
              {!isLoading && positions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center font-sans text-muted">
                    No open positions yet.{' '}
                    <Link to="/markets" className="text-accent hover:underline">
                      Find a market
                    </Link>
                  </td>
                </tr>
              )}
              {positions.map((p) => (
                <PositionRow key={p.marketID} p={p} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 rounded-lg border border-edge bg-panel p-5">
            <span className="text-[11px] uppercase tracking-wide text-muted">Total Portfolio Value</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[28px] leading-tight">{formatDecimal(totals.equity, 2)}</span>
              <Wallet className="size-5 text-accent" />
            </div>
            <span className="text-xs text-muted">Available + reserved + unrealized PnL</span>
          </div>

          <div className="rounded-lg border border-edge bg-panel p-5">
            <h2 className="mb-4 text-base font-bold">PnL by Market</h2>
            {pnlByMarket.rows.length === 0 ? (
              <p className="text-xs text-muted">No positions to break down yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {pnlByMarket.rows.map((r) => {
                  const up = r.pnl >= 0
                  const width = (Math.abs(r.pnl) / pnlByMarket.max) * 100
                  return (
                    <div key={r.market} className="flex items-center gap-3">
                      <span className="w-20 font-sans text-xs text-zinc-50">{r.market}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-800">
                        <div
                          className={cn('h-full rounded-full', up ? 'bg-accent' : 'bg-down')}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                      <span className={cn('w-20 text-right font-mono text-xs', up ? 'text-up' : 'text-down')}>
                        {formatSigned(r.pnl)}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PositionRow({ p }: { p: Position }) {
  const qty = toNum(p.quantity)
  const long = qty >= 0
  return (
    <tr className="h-10 border-b border-edge/60">
      <td className="font-sans font-medium text-zinc-50">{p.marketID}</td>
      <td>
        <span
          className={cn(
            'rounded-sm px-2 py-0.5 text-[10px]',
            long ? 'bg-up/15 text-up' : 'bg-down/15 text-down',
          )}
        >
          {long ? 'Long' : 'Short'}
        </span>
      </td>
      <td className="text-right text-zinc-50">{formatDecimal(Math.abs(qty), 4)}</td>
      <td className="text-right text-muted">{formatDecimal(p.avgEntryPrice, 2)}</td>
      <td className="text-right text-zinc-50">{formatDecimal(p.lastPrice, 2)}</td>
      <td className={cn('text-right', pnlClass(p.unrealisedPnl))}>{formatSigned(p.unrealisedPnl)}</td>
      <td className={cn('text-right', pnlClass(p.realisedPnl))}>{formatSigned(p.realisedPnl)}</td>
    </tr>
  )
}

function StatCard({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string
  value: string
  sub: string
  valueClass?: string
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-edge bg-panel p-5">
      <span className="text-[11px] uppercase tracking-wide text-muted">{label}</span>
      <span className={cn('font-mono text-[28px] leading-tight', valueClass)}>{value}</span>
      <span className="text-xs text-muted">{sub}</span>
    </div>
  )
}

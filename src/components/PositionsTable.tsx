import { usePortfolio } from '@/api/portfolio'
import { formatDecimal, formatSigned, signOf, toNum } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Position } from '@/lib/types'

function pnlClass(v: string | number): string {
  const s = signOf(v)
  return s === 'up' ? 'text-up' : s === 'down' ? 'text-down' : 'text-muted'
}

const COLS = ['Market', 'Side', 'Qty', 'Avg Entry', 'Mark', 'Unreal. PnL', 'Realized']

/** Live positions table. Shared by the Trade terminal bottom panel and Portfolio. */
export function PositionsTable() {
  const { data, isLoading } = usePortfolio()
  const positions = (data?.positions ?? []).filter((p) => toNum(p.quantity) !== 0)

  return (
    <div className="h-full overflow-auto">
      <table className="w-full min-w-160 text-left text-[13px]">
        <thead className="sticky top-0 bg-[#0d0d10]">
          <tr className="font-sans text-[11px] uppercase tracking-wide text-muted">
            {COLS.map((h, i) => (
              <th key={h} className={cn('px-4 py-2 font-medium', i >= 2 && 'text-right')}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono">
          {isLoading && (
            <tr>
              <td colSpan={COLS.length} className="px-4 py-6 text-center font-sans text-muted">
                Loading…
              </td>
            </tr>
          )}
          {!isLoading && positions.length === 0 && (
            <tr>
              <td colSpan={COLS.length} className="px-4 py-6 text-center font-sans text-muted">
                No open positions.
              </td>
            </tr>
          )}
          {positions.map((p) => (
            <Row key={p.marketID} p={p} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Row({ p }: { p: Position }) {
  const qty = toNum(p.quantity)
  const long = qty >= 0
  return (
    <tr className="border-t border-edge hover:bg-panel-2/40">
      <td className="px-4 py-1.5 font-sans font-medium text-zinc-50">{p.marketID}</td>
      <td className="px-4 py-1.5">
        <span className={cn('rounded-sm px-2 py-0.5 text-[11px]', long ? 'bg-up/15 text-up' : 'bg-down/15 text-down')}>
          {long ? 'Long' : 'Short'}
        </span>
      </td>
      <td className="px-4 py-1.5 text-right tabular-nums text-zinc-50">{formatDecimal(Math.abs(qty), 4)}</td>
      <td className="px-4 py-1.5 text-right tabular-nums text-muted">{formatDecimal(p.avgEntryPrice, 2)}</td>
      <td className="px-4 py-1.5 text-right tabular-nums text-zinc-50">{formatDecimal(p.lastPrice, 2)}</td>
      <td className={cn('px-4 py-1.5 text-right tabular-nums', pnlClass(p.unrealisedPnl))}>
        {formatSigned(p.unrealisedPnl)}
      </td>
      <td className={cn('px-4 py-1.5 text-right tabular-nums', pnlClass(p.realisedPnl))}>
        {formatSigned(p.realisedPnl)}
      </td>
    </tr>
  )
}

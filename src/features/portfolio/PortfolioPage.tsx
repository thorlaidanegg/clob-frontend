import { usePortfolio } from '@/api/portfolio'
import { formatDecimal, formatSigned, signOf } from '@/lib/format'
import { cn } from '@/lib/utils'

export function PortfolioPage() {
  const { data, isLoading } = usePortfolio()

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-xl font-semibold tracking-tight">Portfolio</h1>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Available credits" value={data ? formatDecimal(data.walletAvailable, 2) : '—'} />
        <Stat label="Reserved (open orders)" value={data ? formatDecimal(data.walletReserved, 2) : '—'} />
        <Stat label="Open positions" value={String(data?.positions.length ?? 0)} />
      </div>

      <div className="overflow-hidden rounded-lg border border-edge">
        <table className="w-full text-sm">
          <thead className="bg-panel text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Market</th>
              <th className="px-4 py-2 text-right font-medium">Qty</th>
              <th className="px-4 py-2 text-right font-medium">Avg entry</th>
              <th className="px-4 py-2 text-right font-medium">Last</th>
              <th className="px-4 py-2 text-right font-medium">Unrealised</th>
              <th className="px-4 py-2 text-right font-medium">Realised</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-edge font-mono">
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  Loading…
                </td>
              </tr>
            )}
            {data?.positions.map((p) => (
              <tr key={p.marketID}>
                <td className="px-4 py-2.5 font-sans font-medium">{p.marketID}</td>
                <td className="px-4 py-2.5 text-right">{formatDecimal(p.quantity, 2)}</td>
                <td className="px-4 py-2.5 text-right">{formatDecimal(p.avgEntryPrice, 2)}</td>
                <td className="px-4 py-2.5 text-right text-muted">{formatDecimal(p.lastPrice, 2)}</td>
                <td className={cn('px-4 py-2.5 text-right', pnlClass(p.unrealisedPnl))}>
                  {formatSigned(p.unrealisedPnl)}
                </td>
                <td className={cn('px-4 py-2.5 text-right', pnlClass(p.realisedPnl))}>
                  {formatSigned(p.realisedPnl)}
                </td>
              </tr>
            ))}
            {data && data.positions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  No open positions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function pnlClass(v: string): string {
  const s = signOf(v)
  return s === 'up' ? 'text-up' : s === 'down' ? 'text-down' : 'text-muted'
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-edge bg-panel p-4">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 font-mono text-lg">{value}</div>
    </div>
  )
}

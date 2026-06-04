import { Link } from '@tanstack/react-router'
import { useMarkets } from '@/api/markets'
import { cn } from '@/lib/utils'

export function MarketsPage() {
  const { data: markets, isLoading } = useMarkets()

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-xl font-semibold tracking-tight">Markets</h1>
      <div className="overflow-hidden rounded-lg border border-edge">
        <table className="w-full text-sm">
          <thead className="bg-panel text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Market</th>
              <th className="px-4 py-2 text-left font-medium">Base / Quote</th>
              <th className="px-4 py-2 text-right font-medium">Price prec.</th>
              <th className="px-4 py-2 text-right font-medium">State</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-edge">
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  Loading…
                </td>
              </tr>
            )}
            {markets?.map((m) => (
              <tr key={m.marketID} className="hover:bg-panel/60">
                <td className="px-4 py-2.5 font-medium">{m.marketID}</td>
                <td className="px-4 py-2.5 text-muted">
                  {m.baseAsset} / {m.quoteAsset}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-muted">{m.pricePrecision}</td>
                <td className="px-4 py-2.5 text-right">
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-xs',
                      m.state === 'open' ? 'bg-up-soft text-up' : 'bg-down-soft text-down',
                    )}
                  >
                    {m.state}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <Link
                    to="/trade/$market"
                    params={{ market: m.marketID }}
                    className="text-accent hover:underline"
                  >
                    Trade →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

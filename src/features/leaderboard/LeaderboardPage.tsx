import { useLeaderboard } from '@/api/leaderboard'
import { formatSigned } from '@/lib/format'
import { cn } from '@/lib/utils'

export function LeaderboardPage() {
  const { data, isLoading } = useLeaderboard()

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-semibold tracking-tight">Leaderboard</h1>
      <p className="mb-4 text-sm text-muted">Ranked by realised PnL.</p>

      <div className="overflow-hidden rounded-lg border border-edge">
        <table className="w-full text-sm">
          <thead className="bg-panel text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-2 text-left font-medium">#</th>
              <th className="px-4 py-2 text-left font-medium">Trader</th>
              <th className="px-4 py-2 text-right font-medium">Realised PnL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-edge">
            {isLoading && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-muted">
                  Loading…
                </td>
              </tr>
            )}
            {data?.map((e) => (
              <tr key={e.userID} className={cn(e.rank <= 3 && 'bg-up-soft/30')}>
                <td className="px-4 py-2.5 font-mono text-muted">{e.rank}</td>
                <td className="px-4 py-2.5">{e.email || e.userID}</td>
                <td
                  className={cn(
                    'px-4 py-2.5 text-right font-mono',
                    e.score > 0 ? 'text-up' : e.score < 0 ? 'text-down' : 'text-muted',
                  )}
                >
                  {formatSigned(e.score)}
                </td>
              </tr>
            ))}
            {data && data.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-muted">
                  No ranked traders yet — be the first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

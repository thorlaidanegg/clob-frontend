import { useLeaderboard } from '@/api/leaderboard'
import { useAuth } from '@/auth/AuthContext'
import { formatSigned } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { LeaderboardEntry } from '@/lib/types'

const MEDALS = ['🥇', '🥈', '🥉']
const PODIUM_BORDER = ['border-l-[#ffd700]', 'border-l-[#c0c0c0]', 'border-l-[#cd7f32]']

function handle(e: LeaderboardEntry): string {
  const local = e.email?.split('@')[0]
  return local ? `@${local}` : e.userID
}

function initials(e: LeaderboardEntry): string {
  return (e.email || e.userID).slice(0, 2).toUpperCase()
}

function scoreClass(score: number): string {
  return score > 0 ? 'text-up' : score < 0 ? 'text-down' : 'text-muted'
}

export function LeaderboardPage() {
  const { data, isLoading } = useLeaderboard()
  const { user } = useAuth()
  const rows = data ?? []
  const podium = rows.slice(0, 3)

  return (
    <div className="bg-bg px-6 py-8 md:px-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[28px] font-bold tracking-tight">Leaderboard</h1>
        <div className="flex items-center gap-1 rounded-full border border-edge bg-panel p-1">
          <span className="rounded-full bg-accent px-4 py-1 text-xs font-medium text-black">Global</span>
          <span className="px-4 py-1 text-xs font-medium text-muted">Realized PnL</span>
        </div>
      </div>

      {/* Podium */}
      {podium.length > 0 && (
        <div className="mb-8 flex flex-wrap items-end justify-center gap-6">
          {/* order: #2, #1, #3 for the classic podium shape */}
          {[podium[1], podium[0], podium[2]].map((e, i) =>
            e ? (
              <PodiumCard key={e.userID} e={e} isMe={e.userID === user?.userID} tall={i === 1} />
            ) : null,
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-edge bg-panel">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#111114] text-[11px] uppercase tracking-wider text-muted">
              <th className="w-16 px-4 py-3 text-left font-medium">Rank</th>
              <th className="px-4 py-3 text-left font-medium">Trader</th>
              <th className="px-4 py-3 text-right font-medium">Realized PnL</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted">
                  Loading…
                </td>
              </tr>
            )}
            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted">
                  No ranked traders yet — be the first.
                </td>
              </tr>
            )}
            {rows.map((e) => {
              const isMe = e.userID === user?.userID
              return (
                <tr
                  key={e.userID}
                  className={cn(
                    'h-11 border-b border-edge',
                    isMe && 'border-l-[3px] border-l-accent bg-[#10231a]',
                  )}
                >
                  <td className="px-4 font-mono text-muted">{e.rank}</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'flex size-6 items-center justify-center rounded-full text-[10px] font-semibold',
                          isMe ? 'bg-accent text-black' : 'bg-neutral-800 text-zinc-200',
                        )}
                      >
                        {initials(e)}
                      </div>
                      <span className={cn(isMe ? 'font-semibold text-zinc-50' : 'text-zinc-50')}>
                        {handle(e)}
                      </span>
                      {isMe && (
                        <span className="rounded-sm bg-accent px-1.5 py-0.5 text-[10px] font-medium text-black">
                          YOU
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={cn('px-4 text-right font-mono', scoreClass(e.score))}>
                    {formatSigned(e.score)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span className="size-1.5 animate-pulse rounded-full bg-accent" />
        Updated live · refreshes every 15s
      </div>
    </div>
  )
}

function PodiumCard({ e, isMe, tall }: { e: LeaderboardEntry; isMe: boolean; tall: boolean }) {
  const medal = MEDALS[e.rank - 1] ?? '🏅'
  const border = PODIUM_BORDER[e.rank - 1] ?? 'border-l-edge'
  return (
    <div
      className={cn(
        'flex w-72 items-center gap-3 rounded-xl border border-edge border-l-[3px] bg-[#161618] p-6',
        border,
        tall ? 'h-40 shadow-[0_0_40px_-12px_rgba(22,199,132,0.25)]' : 'h-32',
      )}
    >
      <span className={tall ? 'text-4xl' : 'text-3xl'}>{medal}</span>
      <div
        className={cn(
          'flex items-center justify-center rounded-full border border-edge bg-neutral-800 font-semibold',
          tall ? 'size-12 text-sm' : 'size-10 text-xs',
        )}
      >
        {initials(e)}
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="flex items-center gap-1.5 truncate font-bold text-zinc-50">
          {handle(e)}
          {isMe && (
            <span className="rounded-sm bg-accent px-1.5 py-0.5 text-[10px] font-medium text-black">YOU</span>
          )}
        </span>
        <span className={cn('font-mono font-bold', scoreClass(e.score), tall ? 'text-[28px]' : 'text-2xl')}>
          {formatSigned(e.score)}
        </span>
        <span className="text-[11px] font-medium text-muted">Rank #{e.rank}</span>
      </div>
    </div>
  )
}

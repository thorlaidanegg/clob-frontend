import { useQuery } from '@tanstack/react-query'
import { http } from '@/lib/http'
import { qk } from './queryKeys'
import type { LeaderboardEntry } from '@/lib/types'

export function useLeaderboard() {
  return useQuery({
    queryKey: qk.leaderboard,
    queryFn: () => http.get<LeaderboardEntry[]>('/v1/leaderboard'),
    refetchInterval: 15_000,
  })
}

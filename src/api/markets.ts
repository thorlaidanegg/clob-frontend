import { useQuery } from '@tanstack/react-query'
import { http } from '@/lib/http'
import { qk } from './queryKeys'
import type { BookSnapshot, Market, MarketStats, Trade } from '@/lib/types'

export function useMarkets() {
  return useQuery({
    queryKey: qk.markets.all,
    queryFn: () => http.get<Market[]>('/v1/markets'),
    staleTime: 30_000,
  })
}

export function useMarket(id: string | undefined) {
  return useQuery({
    queryKey: qk.markets.detail(id ?? ''),
    queryFn: () => http.get<Market>(`/v1/markets/${id}`),
    enabled: !!id,
    staleTime: 30_000,
  })
}

/** Initial depth snapshot. Live deltas come over the WebSocket (see ws/); the
 * periodic refetch re-seeds the store so it can't drift over a long session. */
export function useDepthSnapshot(id: string | undefined, levels = 25) {
  return useQuery({
    queryKey: qk.markets.depth(id ?? ''),
    queryFn: () => http.get<BookSnapshot>(`/v1/markets/${id}/depth?levels=${levels}`),
    enabled: !!id,
    refetchInterval: 15_000,
  })
}

export function useRecentTrades(id: string | undefined) {
  return useQuery({
    queryKey: qk.markets.trades(id ?? ''),
    queryFn: () => http.get<Trade[]>(`/v1/markets/${id}/trades`),
    enabled: !!id,
  })
}

/** Admin-only engine stats for a market. */
export function useMarketStats(id: string | undefined) {
  return useQuery({
    queryKey: qk.markets.stats(id ?? ''),
    queryFn: () => http.get<MarketStats>(`/v1/admin/markets/${id}/stats`),
    enabled: !!id,
    refetchInterval: 5_000,
  })
}

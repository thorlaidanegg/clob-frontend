import { useQuery } from '@tanstack/react-query'
import { http } from '@/lib/http'
import { qk } from './queryKeys'
import type { Portfolio } from '@/lib/types'

export function usePortfolio() {
  return useQuery({
    queryKey: qk.portfolio,
    queryFn: () => http.get<Portfolio>('/v1/portfolio'),
    staleTime: 2_000,
    refetchInterval: 8_000, // safety net; WS portfolio pushes drive most updates
  })
}

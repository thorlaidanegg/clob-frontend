import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { wsClient } from './client'
import { qk } from '@/api/queryKeys'

/**
 * Bridges the live WS feed into React Query: when the server pushes an order or
 * portfolio update for the logged-in user, refetch the affected queries so the
 * UI updates without a manual refresh. The gateway auto-subscribes cookie-authed
 * clients to `orders:<uid>` and `portfolio:<uid>`.
 */
export function useLiveSync(): void {
  const qc = useQueryClient()

  useEffect(() => {
    return wsClient.onMessage((msg) => {
      const ch = msg.channel ?? ''
      if (ch.startsWith('orders:')) {
        void qc.invalidateQueries({ queryKey: qk.orders.open })
        void qc.invalidateQueries({ queryKey: qk.portfolio })
        // Cancels/expiries now emit a depth_update from the engine (clob v1.0.0),
        // so the order book updates from the WS delta — no snapshot re-fetch.
      } else if (ch.startsWith('portfolio:')) {
        void qc.invalidateQueries({ queryKey: qk.portfolio })
      }
    })
  }, [qc])
}

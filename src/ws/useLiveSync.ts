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
        // The engine emits depth_update on place/fill but NOT on cancel/expire —
        // so re-seed that market's book snapshot to reflect the removed level.
        if (msg.type === 'order_canceled' || msg.type === 'order_expired') {
          const mid = (msg.data as { marketID?: string } | undefined)?.marketID
          if (mid) void qc.invalidateQueries({ queryKey: qk.markets.depth(mid) })
        }
      } else if (ch.startsWith('portfolio:')) {
        void qc.invalidateQueries({ queryKey: qk.portfolio })
      }
    })
  }, [qc])
}

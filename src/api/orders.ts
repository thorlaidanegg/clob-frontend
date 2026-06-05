import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { http } from '@/lib/http'
import { qk } from './queryKeys'
import type { Order, PlaceOrderRequest, PlaceOrderResponse } from '@/lib/types'

export function useOpenOrders() {
  return useQuery({
    queryKey: qk.orders.open,
    queryFn: () => http.get<Order[]>('/v1/orders'),
    refetchInterval: 5_000, // safety net; WS pushes drive most updates
  })
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: qk.orders.detail(id ?? ''),
    queryFn: () => http.get<Order>(`/v1/orders/${id}`),
    enabled: !!id,
  })
}

export function usePlaceOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (req: PlaceOrderRequest) => http.post<PlaceOrderResponse>('/v1/orders', req),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.orders.open })
      void qc.invalidateQueries({ queryKey: qk.portfolio })
    },
  })
}

export function useCancelOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (orderID: string) => http.del<void>(`/v1/orders/${orderID}`),
    // Optimistically drop the order so the UI updates instantly — the settlement
    // worker updates the DB status a beat later (async), so a plain refetch can
    // briefly still see the order as open.
    onMutate: async (orderID) => {
      await qc.cancelQueries({ queryKey: qk.orders.open })
      const prev = qc.getQueryData<Order[]>(qk.orders.open)
      qc.setQueryData<Order[]>(qk.orders.open, (old) => old?.filter((o) => o.orderID !== orderID))
      return { prev }
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(qk.orders.open, ctx.prev)
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: qk.orders.open })
      void qc.invalidateQueries({ queryKey: qk.portfolio })
    },
  })
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { http } from '@/lib/http'
import { qk } from './queryKeys'
import type { Order, PlaceOrderRequest, PlaceOrderResponse } from '@/lib/types'

export function useOpenOrders() {
  return useQuery({
    queryKey: qk.orders.open,
    queryFn: () => http.get<Order[]>('/v1/orders'),
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
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.orders.open })
      void qc.invalidateQueries({ queryKey: qk.portfolio })
    },
  })
}

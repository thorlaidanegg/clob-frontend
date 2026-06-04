import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { http } from '@/lib/http'
import { qk } from './queryKeys'
import type { APIKey, CreateAPIKeyResponse } from '@/lib/types'

export function useApiKeys() {
  return useQuery({
    queryKey: qk.apikeys,
    queryFn: () => http.get<APIKey[]>('/v1/apikeys'),
  })
}

export function useCreateApiKey() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (name: string) => http.post<CreateAPIKeyResponse>('/v1/apikeys', { name }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: qk.apikeys }),
  })
}

export function useRevokeApiKey() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => http.del<void>(`/v1/apikeys/${id}`),
    onSuccess: () => void qc.invalidateQueries({ queryKey: qk.apikeys }),
  })
}

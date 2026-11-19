import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import { manageKeys } from '@/hooks/queries/useManage'

export function useUpdateProductBase() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = (await axios.put(Http.product_base, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: manageKeys.products })
    },
  })
}

export function useUpdateProductEndpoint() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      url,
      payload,
    }: {
      url: string
      payload: Record<string, unknown>
    }) => {
      const response = (await axios.put(url, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: manageKeys.products })
    },
  })
}

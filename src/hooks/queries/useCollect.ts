import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { CollectType } from '@/utils/types'

export const collectKeys = {
  list: ['collect', 'list'] as const,
}

export function useCollectList(enabled = true) {
  return useQuery({
    queryKey: collectKeys.list,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.collect)) as ApiResponse<CollectType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load collections')
      return response.data || []
    },
  })
}

export function useToggleCollect() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { collect_type: string; bind_id: number }) => {
      const response = (await axios.put(Http.collect, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: collectKeys.list })
    },
  })
}

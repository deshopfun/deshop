import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { ProfileType } from '@/utils/types'

export const followKeys = {
  recommend: (limit: number) => ['follow', 'recommend', limit] as const,
}

export function useRecommendToFollow(limit = 5, enabled = true) {
  return useQuery({
    queryKey: followKeys.recommend(limit),
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.recommend_to_follow, {
        params: { limit },
      })) as ApiResponse<ProfileType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load suggestions')
      return response.data ?? []
    },
  })
}

export function useToggleFollow() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (uuid: string) => {
      const response = (await axios.put(Http.follow, { uuid })) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Action failed')
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow'] })
    },
  })
}

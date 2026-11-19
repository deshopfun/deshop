import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { ProfileType } from '@/utils/types'

export type UserSetting = ProfileType & {
  collects?: unknown[]
}

export const userSettingKeys = {
  me: ['user', 'setting'] as const,
}

export function useUserSetting(enabled = true) {
  return useQuery({
    queryKey: userSettingKeys.me,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.user_setting)) as ApiResponse<UserSetting>
      if (!response.result) throw new Error(response.message || 'Failed to load user settings')
      return response.data
    },
  })
}

export function useUpdateUserCurrency() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (currency: string) => {
      const response = (await axios.put(Http.user_setting, { currency })) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSettingKeys.me })
    },
  })
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Record<string, string | undefined>) => {
      const response = (await axios.put(Http.user_setting, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userSettingKeys.me })
    },
  })
}

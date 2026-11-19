import { useQuery } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { UserType } from '@/utils/types'

export const profileKeys = {
  byUsername: (username: string) => ['profile', 'username', username] as const,
}

export function useProfileByUsername(username: string, enabled = true) {
  return useQuery({
    queryKey: profileKeys.byUsername(username),
    enabled: enabled && !!username,
    queryFn: async () => {
      const response = (await axios.get(Http.user_profile_by_username, {
        params: { username },
      })) as ApiResponse<UserType>
      if (!response.result) throw new Error(response.message || 'Failed to load profile')
      return response.data
    },
  })
}

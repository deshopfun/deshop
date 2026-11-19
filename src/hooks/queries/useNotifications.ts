import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { NotificationType } from '@/utils/types'

export type NotificationSettings = {
  notification: string
}

export const notificationKeys = {
  list: ['notifications', 'list'] as const,
  settings: ['notifications', 'settings'] as const,
}

export function useNotifications(enabled = true) {
  return useQuery({
    queryKey: notificationKeys.list,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(
        Http.user_notification
      )) as ApiResponse<NotificationType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load notifications')
      return response.data || []
    },
  })
}

export function useNotificationSettings(enabled = true) {
  return useQuery({
    queryKey: notificationKeys.settings,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(
        Http.user_notification_setting
      )) as ApiResponse<NotificationSettings>
      if (!response.result) throw new Error(response.message || 'Failed to load settings')
      return response.data?.notification ?? ''
    },
  })
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (notification: string) => {
      const response = (await axios.put(Http.user_notification_setting, {
        notification,
      })) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.settings })
    },
  })
}

export function useMarkNotificationSeen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { kind: string; notification_id?: number }) => {
      const response = (await axios.put(Http.user_notification, {
        kind: payload.kind,
        notification_id: payload.kind === 'single' ? payload.notification_id : undefined,
      })) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Failed')
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: notificationKeys.list })
    },
  })
}

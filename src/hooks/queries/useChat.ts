import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { Conversation, ConversationMessage, ProfileType } from '@/utils/types'

export const chatKeys = {
  conversations: ['chat', 'conversations'] as const,
  followings: ['chat', 'followings'] as const,
  messages: (conversationId: number) => ['chat', 'messages', conversationId] as const,
}

export function useChatConversations(enabled = true) {
  return useQuery({
    queryKey: chatKeys.conversations,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.chat_conversation)) as ApiResponse<Conversation[]>
      if (!response.result) throw new Error(response.message || 'Failed to load conversations')
      return response.data ?? []
    },
  })
}

export function useChatFollowings(enabled = true) {
  return useQuery({
    queryKey: chatKeys.followings,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.follow)) as ApiResponse<ProfileType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load followings')
      return response.data ?? []
    },
  })
}

export function useChatMessages(conversationId: number | null, enabled = true) {
  return useQuery({
    queryKey: chatKeys.messages(conversationId ?? 0),
    enabled: enabled && conversationId != null,
    queryFn: async () => {
      const response = (await axios.get(Http.chat_conversation_message, {
        params: { conversation_id: conversationId },
      })) as ApiResponse<ConversationMessage[]>
      if (!response.result) throw new Error(response.message || 'Failed to load messages')
      return response.data ?? []
    },
  })
}

export function useCreateConversation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (peer_uuid: string) => {
      const response = (await axios.post(Http.chat_conversation, {
        peer_uuid,
      })) as ApiResponse<Conversation[]>
      if (!response.result) throw new Error(response.message || 'Failed to start chat')
      return response.data ?? []
    },
    onSuccess: (data) => {
      queryClient.setQueryData(chatKeys.conversations, data)
    },
  })
}

export function useDeleteConversation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (conversation_id: number) => {
      const response = (await axios.delete(Http.chat_conversation, {
        params: { conversation_id },
      })) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Failed to delete chat')
      return response
    },
    onSuccess: (_data, conversation_id) => {
      queryClient.setQueryData<Conversation[]>(chatKeys.conversations, (prev) =>
        (prev ?? []).filter((c) => c.conversation_id !== conversation_id)
      )
    },
  })
}

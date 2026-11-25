import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Lock } from 'lucide-react'
import { Conversation, ConversationMessage, ProfileType } from '@/utils/types'
import { useChatSocket } from '@/hooks/useChatSocket'
import { useShallow } from 'zustand/react/shallow'
import {
  chatKeys,
  useChatConversations,
  useChatFollowings,
  useChatMessages,
  useCreateConversation,
  useDeleteConversation,
} from '@/hooks/queries/useChat'
import { useQueryClient } from '@tanstack/react-query'
import ConversationList from './ConversationList'
import ChatThread from './ChatThread'

const Chat = () => {
  const router = useRouter()

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [followings, setFollowings] = useState<ProfileType[]>([])
  const [messagesByConversation, setMessagesByConversation] = useState<
    Record<string, ConversationMessage[]>
  >({})
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [draft, setDraft] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'thread'>('list')
  const [newChatOpen, setNewChatOpen] = useState(false)
  const [newChatSearch, setNewChatSearch] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastReadMessageIdRef = useRef<number | null>(null)

  const selected = conversations?.find((c) => c.conversation_id === selectedId)
  const messages = selectedId ? (messagesByConversation[selectedId] ?? []) : []

  const { uuid, isLogin } = useUserPresistStore(
    useShallow((state) => ({
      uuid: state.uuid,
      isLogin: state.isLogin,
    }))
  )

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const queryClient = useQueryClient()
  const conversationsQuery = useChatConversations(isLogin && router.isReady)
  const followingsQuery = useChatFollowings(isLogin && router.isReady)
  const messagesQuery = useChatMessages(selectedId, isLogin && selectedId != null)
  const createConversation = useCreateConversation()
  const deleteConversation = useDeleteConversation()

  useEffect(() => {
    if (conversationsQuery.data) setConversations(conversationsQuery.data)
  }, [conversationsQuery.data])

  useEffect(() => {
    if (followingsQuery.data) setFollowings(followingsQuery.data)
  }, [followingsQuery.data])

  useEffect(() => {
    if (selectedId == null || !messagesQuery.data) return
    setMessagesByConversation((prev) => {
      if (prev[selectedId]) return prev
      return { ...prev, [selectedId]: messagesQuery.data }
    })
  }, [selectedId, messagesQuery.data])

  useEffect(() => {
    const err = conversationsQuery.error || followingsQuery.error || messagesQuery.error
    if (!err) return
    setSnackSeverity('error')
    setSnackMessage((err as Error)?.message || 'The network error occurred. Please try again later.')
    setSnackOpen(true)
  }, [
    conversationsQuery.error,
    followingsQuery.error,
    messagesQuery.error,
    setSnackSeverity,
    setSnackMessage,
    setSnackOpen,
  ])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  const onSelectConversation = async (id: number) => {
    setSelectedId(id)
    setMobileView('thread')
    setConversations((prev) => {
      const next = prev.map((c) => (c.conversation_id === id ? { ...c, unread_count: 0 } : c))
      queryClient.setQueryData(chatKeys.conversations, next)
      return next
    })
  }

  const onSelectFollowingUser = async (u: ProfileType) => {
    const existing = conversations?.find((c) => c.peer_uuid === u.uuid)

    if (existing) {
      await onSelectConversation(existing.conversation_id)
      setNewChatOpen(false)
      setNewChatSearch('')
      return
    }

    try {
      const updatedConversations = await createConversation.mutateAsync(u.uuid)
      setConversations(updatedConversations)

      const created = updatedConversations.find((c) => c.peer_uuid === u.uuid)

      if (created) {
        setMessagesByConversation((prev) => ({ ...prev, [created.conversation_id]: [] }))
        setSelectedId(created.conversation_id)

        await onSelectConversation(created.conversation_id)
        setMobileView('thread')
      }

      setNewChatOpen(false)
      setNewChatSearch('')
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage((e as Error)?.message || 'The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
  }

  const onDeleteConversation = async (id: number) => {
    try {
      await deleteConversation.mutateAsync(id)
      setConversations((prev) => prev.filter((c) => c.conversation_id !== id))
      setMessagesByConversation((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      if (selectedId === id) {
        setSelectedId(null)
        setMobileView('list')
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage((e as Error)?.message || 'The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
  }

  const { send: sendWs } = useChatSocket({
    enabled: isLogin,

    onAck: (payload) => {
      const conversationId = payload.conversation_id
      if (!conversationId) return
      setMessagesByConversation((prev) => {
        const list = prev[conversationId] ?? []
        return {
          ...prev,
          [conversationId]: list.map((m) =>
            m.client_message_id === payload.client_message_id
              ? {
                  ...m,
                  message_id: payload.message_id,
                  create_time: payload.create_time || m.create_time,
                  message_status: 'sent',
                }
              : m
          ),
        }
      })
      if (payload.create_time) {
        setConversations((prev) =>
          prev.map((c) =>
            c.conversation_id === conversationId
              ? { ...c, last_message_time: payload.create_time }
              : c
          )
        )
      }
    },

    onMessage: (payload) => {
      setMessagesByConversation((prev) => ({
        ...prev,
        [payload.conversation_id]: [
          ...(prev[payload.conversation_id] ?? []),
          {
            conversation_id: payload.conversation_id,
            message_id: payload.message_id,
            client_message_id: '',
            sender_uuid: payload.sender_uuid,
            content: payload.content,
            create_time: payload.create_time,
            message_status: 'sent',
          },
        ],
      }))
      setConversations((prev) =>
        prev.map((c) =>
          c.conversation_id === payload.conversation_id
            ? {
                ...c,
                last_message: payload.content,
                last_message_time: payload.create_time,
                unread_count:
                  selectedId === c.conversation_id ? c.unread_count : c.unread_count + 1,
              }
            : c
        )
      )
    },

    onPresence: (payload) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.peer_uuid === payload.user_uuid ? { ...c, peer_online: payload.online } : c
        )
      )
    },
  })

  useEffect(() => {
    lastReadMessageIdRef.current = null
  }, [selectedId])

  useEffect(() => {
    if (selectedId == null || !messagesQuery.isSuccess || !messagesQuery.data?.length) return
    const lastMessage = messagesQuery.data[messagesQuery.data.length - 1]
    if (!lastMessage?.message_id) return
    if (lastReadMessageIdRef.current === lastMessage.message_id) return
    lastReadMessageIdRef.current = lastMessage.message_id
    sendWs({
      type: 'read',
      payload: { conversation_id: selectedId, last_read_message_id: lastMessage.message_id },
    })
  }, [selectedId, messagesQuery.isSuccess, messagesQuery.data, sendWs])

  const sendDraftMessage = (conversationId: number, content: string, clientMessageId: string) => {
    const sent = sendWs({
      type: 'message',
      payload: { conversation_id: conversationId, client_message_id: clientMessageId, content },
    })

    if (!sent) {
      setMessagesByConversation((prev) => ({
        ...prev,
        [conversationId]: (prev[conversationId] ?? []).map((m) =>
          m.client_message_id === clientMessageId ? { ...m, message_status: 'failed' } : m
        ),
      }))
    }
  }

  const onSend = () => {
    if (!draft.trim() || !selectedId) return

    const clientMessageId = crypto.randomUUID()
    const optimisticMessage: ConversationMessage = {
      conversation_id: selectedId,
      message_id: 0,
      client_message_id: clientMessageId,
      sender_uuid: uuid,
      content: draft.trim(),
      create_time: new Date().getTime(),
      message_status: 'sending',
    }

    setMessagesByConversation((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), optimisticMessage],
    }))
    setConversations((prev) =>
      prev.map((c) =>
        c.conversation_id === selectedId
          ? {
              ...c,
              last_message: optimisticMessage.content,
              last_message_time: optimisticMessage.create_time,
            }
          : c
      )
    )

    sendDraftMessage(selectedId, optimisticMessage.content, clientMessageId)
    setDraft('')
  }

  const onRetryMessage = (message: ConversationMessage) => {
    const clientMessageId = message.client_message_id || crypto.randomUUID()
    setMessagesByConversation((prev) => ({
      ...prev,
      [message.conversation_id]: (prev[message.conversation_id] ?? []).map((m) =>
        m.client_message_id === message.client_message_id ||
        (!m.client_message_id && m.message_id === message.message_id)
          ? { ...m, client_message_id: clientMessageId, message_status: 'sending' }
          : m
      ),
    }))
    sendDraftMessage(message.conversation_id, message.content, clientMessageId)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  if (!isLogin) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        </div>

        <Card className="h-[75vh] flex items-center justify-center p-12">
          <div className="text-center max-w-sm">
            <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <Lock className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Sign in to start chatting</h2>
            <p className="text-muted-foreground mb-8">
              Connect with people you follow, share updates about your orders, and manage every
              conversation in one place.
            </p>
            <Button size="lg" onClick={() => router.push('/login')}>
              Sign In
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
      </div>

      <Card className="h-[75vh] overflow-hidden p-0">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] h-full min-h-0">
          <div className={`border-r flex-col ${mobileView === 'list' ? 'flex' : 'hidden'} md:flex`}>
            <ConversationList
              conversations={conversations}
              followings={followings}
              selectedId={selectedId}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              newChatOpen={newChatOpen}
              onNewChatOpenChange={setNewChatOpen}
              newChatSearch={newChatSearch}
              onNewChatSearchChange={setNewChatSearch}
              onSelectConversation={(id) => void onSelectConversation(id)}
              onSelectFollowingUser={(u) => void onSelectFollowingUser(u)}
              onDeleteConversation={(id) => void onDeleteConversation(id)}
            />
          </div>

          <div
            className={`flex-col min-h-0 h-full ${mobileView === 'thread' ? 'flex' : 'hidden'} md:flex`}
          >
            <ChatThread
              selected={selected}
              messages={messages}
              uuid={uuid}
              draft={draft}
              onDraftChange={setDraft}
              onKeyDown={handleKeyDown}
              onSend={onSend}
              onRetryMessage={onRetryMessage}
              onBackToList={() => setMobileView('list')}
              onOpenProfile={(username) => void router.push(`/profile/${username}`)}
              onOpenNewChat={() => setNewChatOpen(true)}
              scrollRef={scrollRef}
              loading={messagesQuery.isLoading || messagesQuery.isFetching}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Chat

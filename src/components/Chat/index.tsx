import { useMemo, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Send,
  Search,
  ArrowLeft,
  MessageCircle,
  Check,
  CheckCheck,
  SquarePen,
  Trash2,
  Lock,
  AlertCircle,
} from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { Conversation, ConversationMessage, ProfileType } from '@/utils/types'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useChatSocket } from '@/hooks/useChatSocket'

function formatTime(input: number): string {
  return new Date(input).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatRelativeTime(input: number): string {
  const iso = Number(input)
  const diffMs = Date.now() - iso
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'now'
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.floor(hours / 24)}d`
}

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

  const selected = conversations?.find((c) => c.conversation_id === selectedId)
  const messages = selectedId ? (messagesByConversation[selectedId] ?? []) : []

  const { getUuid, getIsLogin } = useUserPresistStore((state) => state)
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const initFollowings = async (signal?: AbortSignal) => {
    if (!getIsLogin?.()) return

    try {
      const response: any = await axios.get(Http.follow, { signal })

      if (response.result) {
        setFollowings(response.data)
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return
      console.error(e)
    }
  }

  const initConversations = async (signal?: AbortSignal) => {
    if (!getIsLogin?.()) return

    try {
      const response: any = await axios.get(Http.chat_conversation, { signal })

      if (response.result) {
        setConversations(response.data)
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return
      console.error(e)
    }
  }

  useAbortableEffect(
    (signal) => {
      if (!router.isReady) return
      initFollowings(signal)
      initConversations(signal)
    },
    [router.isReady]
  )

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations
    const q = searchQuery.toLowerCase()
    return conversations.filter((c) => c.peer_username.toLowerCase().includes(q))
  }, [conversations, searchQuery])

  const filteredFollowing = useMemo(() => {
    if (!newChatSearch.trim()) return followings
    const q = newChatSearch.toLowerCase()
    return followings.filter((u) => u.username.toLowerCase().includes(q))
  }, [followings, newChatSearch])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  const onSelectConversation = async (id: number) => {
    setSelectedId(id)
    setMobileView('thread')
    setConversations((prev) =>
      prev.map((c) => (c.conversation_id === id ? { ...c, unread_count: 0 } : c))
    )

    if (messagesByConversation[id]) return

    try {
      const response: any = await axios.get(Http.chat_conversation_message, {
        params: { conversation_id: id },
      })

      if (response.result) {
        const fetchedMessages: ConversationMessage[] = response.data
        setMessagesByConversation((prev) => ({ ...prev, [id]: fetchedMessages }))

        const lastMessage = fetchedMessages[fetchedMessages?.length - 1]
        if (lastMessage) {
          sendWs({
            type: 'read',
            payload: { conversation_id: id, last_read_message_id: lastMessage.message_id },
          })
        }
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return

      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
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
      const response: any = await axios.post(Http.chat_conversation, { peer_uuid: u.uuid })

      if (response.result) {
        const updatedConversations: Conversation[] = response.data
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
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return

      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
  }

  const onDeleteConversation = async (id: number) => {
    try {
      const response: any = await axios.delete(Http.chat_conversation, {
        params: { conversation_id: id },
      })

      if (response.result) {
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
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return

      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
  }

  const { send: sendWs } = useChatSocket({
    enabled: getIsLogin(),

    onAck: (payload) => {
      setMessagesByConversation((prev) => {
        const list = prev[payload.conversation_id] ?? []
        return {
          ...prev,
          [payload.conversation_id]: list.map((m) =>
            m.conversation_id.toString() === payload.client_message_id
              ? { ...m, id: payload.message_id, status: 'sent' as const }
              : m
          ),
        }
      })
    },

    onMessage: (payload) => {
      setMessagesByConversation((prev) => ({
        ...prev,
        [payload.conversation_id]: [
          ...(prev[payload.conversation_id] ?? []),
          { ...payload, status: 'sent' as const },
        ],
      }))
      setConversations((prev) =>
        prev.map((c) =>
          c.conversation_id === payload.conversation_id
            ? {
                ...c,
                last_message: payload.content,
                last_message_at: payload.create_time,
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

  const sendDraftMessage = (conversationId: number, content: string, clientMessageId: string) => {
    const sent = sendWs({
      type: 'message',
      payload: { conversation_id: conversationId, client_message_id: clientMessageId, content },
    })

    if (!sent) {
      setMessagesByConversation((prev) => ({
        ...prev,
        [conversationId]: (prev[conversationId] ?? []).map((m) =>
          m.conversation_id.toString() === clientMessageId ? { ...m, status: 'failed' as const } : m
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
      sender_uuid: getUuid(),
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
    setMessagesByConversation((prev) => ({
      ...prev,
      [message.conversation_id]: (prev[message.conversation_id] ?? []).map((m) =>
        m.conversation_id === message.conversation_id ? { ...m, status: 'sending' as const } : m
      ),
    }))
    sendDraftMessage(message.conversation_id, message.content, message.client_message_id)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  if (!getIsLogin()) {
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
          {/* 左侧：会话列表 */}
          <div className={`border-r flex-col ${mobileView === 'list' ? 'flex' : 'hidden'} md:flex`}>
            <div className="p-4 border-b space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-muted-foreground">Chats</p>

                <Dialog open={newChatOpen} onOpenChange={setNewChatOpen}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8" aria-label="New chat">
                      <SquarePen className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>New message</DialogTitle>
                    </DialogHeader>

                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={newChatSearch}
                        onChange={(e) => setNewChatSearch(e.target.value)}
                        placeholder="Search people you follow"
                        className="pl-9 h-9"
                        autoFocus
                      />
                    </div>

                    <div className="max-h-72 overflow-y-auto -mx-1 space-y-1">
                      {filteredFollowing?.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-6">
                          {followings?.length === 0
                            ? "You're not following anyone yet"
                            : 'No matches'}
                        </p>
                      ) : (
                        filteredFollowing?.map((u) => (
                          <button
                            key={u.uuid}
                            type="button"
                            onClick={() => onSelectFollowingUser(u)}
                            className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted text-left"
                          >
                            <Avatar className="w-9 h-9 shrink-0">
                              <AvatarImage
                                src={GetAbosolutePathByRelative(u.avatar_url, 'avatar')}
                              />
                              <AvatarFallback>
                                {u.username.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{u.username}</p>
                              {u.bio && (
                                <p className="text-xs text-muted-foreground truncate">{u.bio}</p>
                              )}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations"
                  className="pl-9 h-9"
                />
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
              {filteredConversations?.length === 0 ? (
                <div className="text-center py-10 px-4">
                  <p className="text-sm text-muted-foreground mb-3">No conversations yet</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setNewChatOpen(true)}
                    className="gap-1.5"
                  >
                    <SquarePen className="w-3.5 h-3.5" />
                    Start a chat
                  </Button>
                </div>
              ) : (
                filteredConversations?.map((c) => (
                  <div
                    key={c.conversation_id}
                    className={`group relative flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${
                      selectedId === c.conversation_id ? 'bg-muted' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectConversation(c.conversation_id)}
                      className="flex items-center gap-3 flex-1 min-w-0 text-left"
                    >
                      <div className="relative shrink-0">
                        <Avatar className="w-11 h-11">
                          <AvatarImage
                            src={GetAbosolutePathByRelative(c.peer_avatar_url, 'avatar')}
                          />
                          <AvatarFallback>
                            {c.peer_username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {c.peer_online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium truncate">{c.peer_username}</p>
                          <span className="text-xs text-muted-foreground shrink-0 group-hover:hidden">
                            {formatRelativeTime(c.last_message_time)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <p className="text-xs text-muted-foreground truncate">
                            {c.last_message || 'No messages yet'}
                          </p>
                          {c.unread_count > 0 && (
                            <Badge className="h-5 min-w-5 px-1.5 shrink-0 justify-center">
                              {c.unread_count}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* 删除会话：默认隐藏，hover 到这一行才出现，避免列表看起来太拥挤 */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Delete conversation"
                          className="absolute right-3 p-1.5 rounded opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-opacity shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this conversation?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Your chat history with @{c.peer_username} will be removed from this
                            list. This can&apos;t be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDeleteConversation(c.conversation_id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 右侧：当前会话 */}
          <div
            className={`flex-col min-h-0 h-full ${mobileView === 'thread' ? 'flex' : 'hidden'} md:flex`}
          >
            {!selected ? (
              <div className="flex-1 flex items-center justify-center text-center p-12">
                <div className="max-w-xs">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium mb-1">Select a conversation</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose someone from the list, or start a new chat with someone you follow
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setNewChatOpen(true)}
                    className="gap-1.5"
                  >
                    <SquarePen className="w-3.5 h-3.5" />
                    New chat
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* 会话头部 */}
                <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMobileView('list')}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div className="relative shrink-0">
                    <Avatar className="w-9 h-9">
                      <AvatarImage
                        src={GetAbosolutePathByRelative(selected.peer_avatar_url, 'avatar')}
                      />
                      <AvatarFallback>
                        {selected.peer_username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {selected.peer_online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={() => router.push(`/profile/${selected.peer_username}`)}
                      className="text-sm font-medium hover:underline"
                    >
                      {selected.peer_username}
                    </button>
                    <p className="text-xs text-muted-foreground">
                      {selected.peer_online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                {/* 消息列表 / 新会话初始化引导 */}
                <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
                  {messages?.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="max-w-xs">
                        <Avatar className="w-16 h-16 mx-auto mb-4">
                          <AvatarImage
                            src={GetAbosolutePathByRelative(selected.peer_avatar_url, 'avatar')}
                          />
                          <AvatarFallback>
                            {selected.peer_username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium mb-1">{selected.peer_username}</p>
                        <p className="text-sm text-muted-foreground">
                          This is the start of your conversation. Say hi 👋
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((m, idx) => {
                        const isMe = m.sender_uuid === getUuid()
                        const prevSameSender =
                          idx > 0 && messages[idx - 1].sender_uuid === m.sender_uuid
                        const isFailed = isMe && m.message_status === 'failed'

                        return (
                          <div
                            key={idx}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[70%] ${prevSameSender ? 'mt-1' : 'mt-2'}`}>
                              <div
                                className={`px-4 py-2 rounded-2xl text-sm ${
                                  isFailed
                                    ? 'bg-destructive/10 text-destructive rounded-br-md'
                                    : isMe
                                      ? 'bg-primary text-primary-foreground rounded-br-md'
                                      : 'bg-muted rounded-bl-md'
                                }`}
                              >
                                {m.content}
                              </div>
                              <div
                                className={`flex items-center gap-1 mt-1 text-xs ${
                                  isFailed ? 'text-destructive' : 'text-muted-foreground'
                                } ${isMe ? 'justify-end' : 'justify-start'}`}
                              >
                                {isFailed ? (
                                  <button
                                    type="button"
                                    onClick={() => onRetryMessage(m)}
                                    className="flex items-center gap-1 hover:underline"
                                  >
                                    <AlertCircle className="w-3 h-3" />
                                    Failed to send · Tap to retry
                                  </button>
                                ) : (
                                  <>
                                    <span>{formatTime(m.create_time)}</span>
                                    {isMe &&
                                      (m.message_status === 'sending' ? (
                                        <Check className="w-3 h-3" />
                                      ) : (
                                        <CheckCheck
                                          className={`w-3 h-3 ${
                                            m.message_status === 'read' ? 'text-primary' : ''
                                          }`}
                                        />
                                      ))}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* 输入框 */}
                <div className="p-3 border-t shrink-0">
                  <div className="flex items-end gap-2">
                    <Input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message"
                      className="flex-1 rounded-full h-10 px-4"
                    />
                    <Button
                      size="icon"
                      className="rounded-full h-10 w-10 shrink-0"
                      onClick={onSend}
                      disabled={!draft.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Chat

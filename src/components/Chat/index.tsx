import { useMemo, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserPresistStore } from '@/lib'
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
import { Send, Search, ArrowLeft, MessageCircle, Check, CheckCheck, SquarePen, Trash2, Lock } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'

// ---- 数据结构：对应之前设计的 conversations / messages / follows 表 ----
type Conversation = {
  id: string
  peerUuid: string
  peerUsername: string
  peerAvatarUrl: string
  peerOnline: boolean
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}

type Message = {
  id: string
  conversationId: string
  senderUuid: string
  content: string
  createdAt: string
  status: 'sending' | 'sent' | 'read'
}

type FollowingUser = {
  uuid: string
  username: string
  avatarUrl: string
  bio: string
}

const CURRENT_USER_UUID = 'me' // 换成 useUserPresistStore 里的真实 uuid

// 示例数据，接入真实接口时替换成 axios 请求
const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    peerUuid: 'u1',
    peerUsername: 'crypto_dave',
    peerAvatarUrl: '',
    peerOnline: true,
    lastMessage: 'Sounds good, sending the payment now',
    lastMessageAt: new Date(Date.now() - 3 * 60000).toISOString(),
    unreadCount: 2,
  },
  {
    id: '2',
    peerUuid: 'u2',
    peerUsername: 'satoshi_fan',
    peerAvatarUrl: '',
    peerOnline: false,
    lastMessage: 'Thanks for the quick shipping!',
    lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 0,
  },
]

const INITIAL_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: 'm1', conversationId: '1', senderUuid: 'u1', content: 'Hey, is this still available?', createdAt: new Date(Date.now() - 10 * 60000).toISOString(), status: 'read' },
    { id: 'm2', conversationId: '1', senderUuid: CURRENT_USER_UUID, content: 'Yep! Still have 2 left', createdAt: new Date(Date.now() - 9 * 60000).toISOString(), status: 'read' },
    { id: 'm3', conversationId: '1', senderUuid: 'u1', content: 'Great, I\u2019ll take one', createdAt: new Date(Date.now() - 5 * 60000).toISOString(), status: 'read' },
    { id: 'm4', conversationId: '1', senderUuid: 'u1', content: 'Sounds good, sending the payment now', createdAt: new Date(Date.now() - 3 * 60000).toISOString(), status: 'read' },
  ],
  '2': [
    { id: 'm5', conversationId: '2', senderUuid: 'u2', content: 'Thanks for the quick shipping!', createdAt: new Date(Date.now() - 3600000).toISOString(), status: 'read' },
  ],
}

// 关注列表——"New Chat" 从这里选人，接入真实接口时换成 GET /api/users/:uuid/following
const MOCK_FOLLOWING: FollowingUser[] = [
  { uuid: 'u1', username: 'crypto_dave', avatarUrl: '', bio: 'NFT collector' },
  { uuid: 'u3', username: 'moon_walker', avatarUrl: '', bio: 'Trading since 2017' },
  { uuid: 'u4', username: 'defi_queen', avatarUrl: '', bio: '' },
]

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'now'
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.floor(hours / 24)}d`
}

const Chat = () => {
  const router = useRouter()
  const { getIsLogin } = useUserPresistStore((state) => state)
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messagesByConversation, setMessagesByConversation] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'thread'>('list')
  const [newChatOpen, setNewChatOpen] = useState(false)
  const [newChatSearch, setNewChatSearch] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const selected = conversations.find((c) => c.id === selectedId)
  const messages = selectedId ? messagesByConversation[selectedId] ?? [] : []

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations
    const q = searchQuery.toLowerCase()
    return conversations.filter((c) => c.peerUsername.toLowerCase().includes(q))
  }, [conversations, searchQuery])

  const filteredFollowing = useMemo(() => {
    if (!newChatSearch.trim()) return MOCK_FOLLOWING
    const q = newChatSearch.toLowerCase()
    return MOCK_FOLLOWING.filter((u) => u.username.toLowerCase().includes(q))
  }, [newChatSearch])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  const onSelectConversation = (id: string) => {
    setSelectedId(id)
    setMobileView('thread')
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)))
    // 真实实现：GET /api/conversations/:id/messages 拉历史 + 发一条已读回执给对方
  }

  // 从关注列表选人开聊：已经有会话就直接打开，没有就创建一条新的空会话
  const onSelectFollowingUser = (u: FollowingUser) => {
    const existing = conversations.find((c) => c.peerUuid === u.uuid)

    if (existing) {
      onSelectConversation(existing.id)
    } else {
      const newConversation: Conversation = {
        id: `new-${u.uuid}`,
        peerUuid: u.uuid,
        peerUsername: u.username,
        peerAvatarUrl: u.avatarUrl,
        peerOnline: false,
        lastMessage: '',
        lastMessageAt: new Date().toISOString(),
        unreadCount: 0,
      }
      // 真实实现：调 POST /api/conversations { peer_uuid: u.uuid } 拿到真实 conversationId 再 setConversations
      setConversations((prev) => [newConversation, ...prev])
      setMessagesByConversation((prev) => ({ ...prev, [newConversation.id]: [] }))
      setSelectedId(newConversation.id)
    }

    setMobileView('thread')
    setNewChatOpen(false)
    setNewChatSearch('')
  }

  const onDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id))
    setMessagesByConversation((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    if (selectedId === id) {
      setSelectedId(null)
      setMobileView('list')
    }
    // 真实实现：调 DELETE /api/conversations/:id
  }

  const onSend = () => {
    if (!draft.trim() || !selectedId) return

    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      conversationId: selectedId,
      senderUuid: CURRENT_USER_UUID,
      content: draft.trim(),
      createdAt: new Date().toISOString(),
      status: 'sending',
    }

    setMessagesByConversation((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), optimisticMessage],
    }))
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, lastMessage: optimisticMessage.content, lastMessageAt: optimisticMessage.createdAt }
          : c,
      ),
    )
    setDraft('')
    // 真实实现：通过 WebSocket 发送 { type: 'message', payload: { conversation_id, client_msg_id, content } }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  // 未登录：不渲染聊天功能本身，只给一个引导登录的启动页。
  // 放在所有 hook 调用之后（Rules of Hooks 要求 hook 顺序每次渲染都一致，不能提前 return）
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
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] h-full">
          {/* 左侧：会话列表 */}
          <div className={`border-r flex-col ${mobileView === 'list' ? 'flex' : 'hidden'} md:flex`}>
            <div className="p-4 border-b space-y-3">
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
                      {filteredFollowing.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-6">
                          {MOCK_FOLLOWING.length === 0
                            ? "You're not following anyone yet"
                            : 'No matches'}
                        </p>
                      ) : (
                        filteredFollowing.map((u) => (
                          <button
                            key={u.uuid}
                            type="button"
                            onClick={() => onSelectFollowingUser(u)}
                            className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted text-left"
                          >
                            <Avatar className="w-9 h-9 shrink-0">
                              <AvatarImage src={GetAbosolutePathByRelative(u.avatarUrl, 'avatar')} />
                              <AvatarFallback>{u.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{u.username}</p>
                              {u.bio && <p className="text-xs text-muted-foreground truncate">{u.bio}</p>}
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

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-10 px-4">
                  <p className="text-sm text-muted-foreground mb-3">No conversations yet</p>
                  <Button size="sm" variant="outline" onClick={() => setNewChatOpen(true)} className="gap-1.5">
                    <SquarePen className="w-3.5 h-3.5" />
                    Start a chat
                  </Button>
                </div>
              ) : (
                filteredConversations.map((c) => (
                  <div
                    key={c.id}
                    className={`group relative flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${
                      selectedId === c.id ? 'bg-muted' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectConversation(c.id)}
                      className="flex items-center gap-3 flex-1 min-w-0 text-left"
                    >
                      <div className="relative shrink-0">
                        <Avatar className="w-11 h-11">
                          <AvatarImage src={GetAbosolutePathByRelative(c.peerAvatarUrl, 'avatar')} />
                          <AvatarFallback>{c.peerUsername.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {c.peerOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium truncate">{c.peerUsername}</p>
                          <span className="text-xs text-muted-foreground shrink-0 group-hover:hidden">
                            {formatRelativeTime(c.lastMessageAt)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <p className="text-xs text-muted-foreground truncate">
                            {c.lastMessage || 'No messages yet'}
                          </p>
                          {c.unreadCount > 0 && (
                            <Badge className="h-5 min-w-5 px-1.5 shrink-0 justify-center">
                              {c.unreadCount}
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
                            Your chat history with @{c.peerUsername} will be removed from this list.
                            This can&apos;t be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDeleteConversation(c.id)}>
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
          <div className={`flex-col ${mobileView === 'thread' ? 'flex' : 'hidden'} md:flex`}>
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
                  <Button size="sm" variant="outline" onClick={() => setNewChatOpen(true)} className="gap-1.5">
                    <SquarePen className="w-3.5 h-3.5" />
                    New chat
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* 会话头部 */}
                <div className="flex items-center gap-3 px-4 py-3 border-b">
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
                      <AvatarImage src={GetAbosolutePathByRelative(selected.peerAvatarUrl, 'avatar')} />
                      <AvatarFallback>{selected.peerUsername.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {selected.peerOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={() => router.push(`/profile/${selected.peerUsername}`)}
                      className="text-sm font-medium hover:underline"
                    >
                      {selected.peerUsername}
                    </button>
                    <p className="text-xs text-muted-foreground">
                      {selected.peerOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                {/* 消息列表 / 新会话初始化引导 */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
                  {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="max-w-xs">
                        <Avatar className="w-16 h-16 mx-auto mb-4">
                          <AvatarImage src={GetAbosolutePathByRelative(selected.peerAvatarUrl, 'avatar')} />
                          <AvatarFallback>{selected.peerUsername.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium mb-1">{selected.peerUsername}</p>
                        <p className="text-sm text-muted-foreground">
                          This is the start of your conversation. Say hi 👋
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((m, idx) => {
                        const isMe = m.senderUuid === CURRENT_USER_UUID
                        const prevSameSender = idx > 0 && messages[idx - 1].senderUuid === m.senderUuid
                        return (
                          <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] ${prevSameSender ? 'mt-1' : 'mt-2'}`}>
                              <div
                                className={`px-4 py-2 rounded-2xl text-sm ${
                                  isMe
                                    ? 'bg-primary text-primary-foreground rounded-br-md'
                                    : 'bg-muted rounded-bl-md'
                                }`}
                              >
                                {m.content}
                              </div>
                              <div
                                className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                                  isMe ? 'justify-end' : 'justify-start'
                                }`}
                              >
                                <span>{formatTime(m.createdAt)}</span>
                                {isMe &&
                                  (m.status === 'sending' ? (
                                    <Check className="w-3 h-3" />
                                  ) : (
                                    <CheckCheck
                                      className={`w-3 h-3 ${m.status === 'read' ? 'text-primary' : ''}`}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* 输入框 */}
                <div className="p-3 border-t">
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

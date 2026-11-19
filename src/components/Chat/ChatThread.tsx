import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GetAbosolutePathByRelative } from '@/utils/image'
import type { Conversation, ConversationMessage } from '@/utils/types'
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCheck,
  MessageCircle,
  Send,
  SquarePen,
} from 'lucide-react'
import { RefObject } from 'react'
import { formatTime } from './chatTime'

type Props = {
  selected: Conversation | undefined
  messages: ConversationMessage[]
  uuid?: string
  draft: string
  onDraftChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onSend: () => void
  onRetryMessage: (message: ConversationMessage) => void
  onBackToList: () => void
  onOpenProfile: (username: string) => void
  onOpenNewChat: () => void
  scrollRef: RefObject<HTMLDivElement | null>
  loading?: boolean
}

export default function ChatThread({
  selected,
  messages,
  uuid,
  draft,
  onDraftChange,
  onKeyDown,
  onSend,
  onRetryMessage,
  onBackToList,
  onOpenProfile,
  onOpenNewChat,
  scrollRef,
  loading = false,
}: Props) {
  if (!selected) {
    return (
      <div className="flex-1 flex items-center justify-center text-center p-12">
        <div className="max-w-xs">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="font-medium mb-1">Select a conversation</p>
          <p className="text-sm text-muted-foreground mb-4">
            Choose someone from the list, or start a new chat with someone you follow
          </p>
          <Button size="sm" variant="outline" onClick={onOpenNewChat} className="gap-1.5">
            <SquarePen className="w-3.5 h-3.5" />
            New chat
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onBackToList}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="relative shrink-0">
          <Avatar className="w-9 h-9">
            <AvatarImage src={GetAbosolutePathByRelative(selected.peer_avatar_url, 'avatar')} />
            <AvatarFallback>{selected.peer_username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {selected.peer_online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full" />
          )}
        </div>
        <div className="min-w-0">
          <button
            type="button"
            onClick={() => onOpenProfile(selected.peer_username)}
            className="text-sm font-medium hover:underline"
          >
            {selected.peer_username}
          </button>
          <p className="text-xs text-muted-foreground">
            {selected.peer_online ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        {loading && messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            Loading messages…
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div className="max-w-xs">
              <Avatar className="w-16 h-16 mx-auto mb-4">
                <AvatarImage src={GetAbosolutePathByRelative(selected.peer_avatar_url, 'avatar')} />
                <AvatarFallback>{selected.peer_username.slice(0, 2).toUpperCase()}</AvatarFallback>
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
              const isMe = m.sender_uuid === uuid
              const prevSameSender = idx > 0 && messages[idx - 1].sender_uuid === m.sender_uuid
              const isFailed = isMe && m.message_status === 'failed'

              return (
                <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
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

      <div className="p-3 border-t shrink-0">
        <div className="flex items-end gap-2">
          <Input
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={onKeyDown}
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
  )
}

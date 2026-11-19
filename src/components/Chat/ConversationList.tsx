import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { GetAbosolutePathByRelative } from '@/utils/image'
import type { Conversation, ProfileType } from '@/utils/types'
import { Search, SquarePen, Trash2 } from 'lucide-react'
import { formatRelativeTime } from './chatTime'

type Props = {
  conversations: Conversation[]
  followings: ProfileType[]
  selectedId: number | null
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  newChatOpen: boolean
  onNewChatOpenChange: (open: boolean) => void
  newChatSearch: string
  onNewChatSearchChange: (value: string) => void
  onSelectConversation: (id: number) => void
  onSelectFollowingUser: (user: ProfileType) => void
  onDeleteConversation: (id: number) => void
}

export default function ConversationList({
  conversations,
  followings,
  selectedId,
  searchQuery,
  onSearchQueryChange,
  newChatOpen,
  onNewChatOpenChange,
  newChatSearch,
  onNewChatSearchChange,
  onSelectConversation,
  onSelectFollowingUser,
  onDeleteConversation,
}: Props) {
  const filteredConversations = !searchQuery.trim()
    ? conversations
    : conversations.filter((c) =>
        c.peer_username.toLowerCase().includes(searchQuery.toLowerCase())
      )

  const filteredFollowing = !newChatSearch.trim()
    ? followings
    : followings.filter((u) => u.username.toLowerCase().includes(newChatSearch.toLowerCase()))

  return (
    <>
      <div className="p-4 border-b space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-muted-foreground">Chats</p>

          <Dialog open={newChatOpen} onOpenChange={onNewChatOpenChange}>
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
                  onChange={(e) => onNewChatSearchChange(e.target.value)}
                  placeholder="Search people you follow"
                  className="pl-9 h-9"
                  autoFocus
                />
              </div>

              <div className="max-h-72 overflow-y-auto -mx-1 space-y-1">
                {filteredFollowing.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    {followings.length === 0 ? "You're not following anyone yet" : 'No matches'}
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
                        <AvatarImage src={GetAbosolutePathByRelative(u.avatar_url, 'avatar')} />
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
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search conversations"
            className="pl-9 h-9"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-10 px-4">
            <p className="text-sm text-muted-foreground mb-3">No conversations yet</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNewChatOpenChange(true)}
              className="gap-1.5"
            >
              <SquarePen className="w-3.5 h-3.5" />
              Start a chat
            </Button>
          </div>
        ) : (
          filteredConversations.map((c) => (
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
                    <AvatarImage src={GetAbosolutePathByRelative(c.peer_avatar_url, 'avatar')} />
                    <AvatarFallback>{c.peer_username.slice(0, 2).toUpperCase()}</AvatarFallback>
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
                      Your chat history with @{c.peer_username} will be removed from this list. This
                      can&apos;t be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDeleteConversation(c.conversation_id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))
        )}
      </div>
    </>
  )
}

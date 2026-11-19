import { useEffect, useState } from 'react'
import { useSnackPresistStore } from '@/lib'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import { useRecommendToFollow, useToggleFollow } from '@/hooks/queries/useFollow'

const SKELETON_ROWS = 3

const WhoToFollow = () => {
  const [followingUuids, setFollowingUuids] = useState<Set<string>>(new Set())
  const recommendQuery = useRecommendToFollow(5)
  const toggleFollow = useToggleFollow()

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const users = recommendQuery.data ?? []
  const loading = recommendQuery.isLoading
  const loadError = recommendQuery.isError

  useEffect(() => {
    if (recommendQuery.isError) {
      setSnackSeverity('error')
      setSnackMessage(
        (recommendQuery.error as Error)?.message ||
          'The network error occurred. Please try again later.'
      )
      setSnackOpen(true)
    }
  }, [
    recommendQuery.isError,
    recommendQuery.error,
    setSnackSeverity,
    setSnackMessage,
    setSnackOpen,
  ])

  const onToggleFollow = async (uuid: string) => {
    if (toggleFollow.isPending) return

    const isFollowing = followingUuids.has(uuid)
    try {
      await toggleFollow.mutateAsync(uuid)
      setFollowingUuids((prev) => {
        const next = new Set(prev)
        if (isFollowing) next.delete(uuid)
        else next.add(uuid)
        return next
      })
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage((e as Error)?.message || 'Network error occurred')
      setSnackOpen(true)
      console.error(e)
    }
  }

  if (loadError && !loading && users.length === 0) {
    return (
      <div>
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-base">Who to follow</CardTitle>
        </CardHeader>
        <p className="text-sm text-muted-foreground">Couldn&apos;t load suggestions.</p>
      </div>
    )
  }

  if (!loading && users.length === 0) return null

  return (
    <Card>
      <CardContent className="p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-base">Who to follow</CardTitle>
        </CardHeader>
        <div className="space-y-1">
          {loading
            ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-24 bg-muted rounded" />
                    <div className="h-2.5 w-32 bg-muted rounded" />
                  </div>
                  <div className="w-16 h-8 bg-muted rounded shrink-0" />
                </div>
              ))
            : users.map((u, idx) => {
                const isFollowing = followingUuids.has(u.uuid)
                return (
                  <div
                    key={u.uuid}
                    className={`flex items-center gap-3 py-2.5 ${
                      idx < users.length - 1 ? 'border-b border-muted' : ''
                    }`}
                  >
                    <Link
                      href={`/profile/${u.username}`}
                      className="flex items-center gap-3 flex-1 min-w-0 group"
                    >
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarImage
                          src={GetAbosolutePathByRelative(u.avatar_url, 'avatar')}
                          alt={u.username}
                        />
                        <AvatarFallback>
                          <User className="w-5 h-5 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate group-hover:underline">
                          {u.username}
                        </p>
                        {u.bio ? (
                          <p className="text-xs text-muted-foreground truncate">{u.bio}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground"></p>
                        )}
                      </div>
                    </Link>
                    <Button
                      size="sm"
                      variant={isFollowing ? 'outline' : 'default'}
                      onClick={() => onToggleFollow(u.uuid)}
                      disabled={toggleFollow.isPending && toggleFollow.variables === u.uuid}
                      className="shrink-0"
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                )
              })}
        </div>
      </CardContent>
    </Card>
  )
}

export default WhoToFollow

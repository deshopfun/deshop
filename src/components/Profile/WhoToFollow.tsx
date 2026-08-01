import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useSnackPresistStore } from '@/lib'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import Link from 'next/link'
import { ProfileType } from '@/utils/types'

const SKELETON_ROWS = 3

const WhoToFollow = () => {
  const router = useRouter()
  const [users, setUsers] = useState<ProfileType[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [followingUuids, setFollowingUuids] = useState<Set<string>>(new Set())
  const [pendingUuid, setPendingUuid] = useState<string | null>(null)
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const init = async (signal?: AbortSignal) => {
    setLoading(true)

    try {
      const response: any = await axios.get(Http.recommend_to_follow, {
        params: { limit: 5 },
        signal,
      })

      if (response.result) {
        setUsers(response.data ?? [])
        setLoadError(false)
      } else {
        setLoadError(true)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return

      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useAbortableEffect((signal) => {
    init(signal)
  }, [])

  const onToggleFollow = async (uuid: string) => {
    if (pendingUuid) return

    const isFollowing = followingUuids.has(uuid)
    setPendingUuid(uuid)

    try {
      const response: any = await axios.put(Http.follow, { uuid })

      if (response.result) {
        setFollowingUuids((prev) => {
          const next = new Set(prev)
          isFollowing ? next.delete(uuid) : next.add(uuid)
          return next
        })
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message ?? 'Action failed')
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Network error occurred')
      setSnackOpen(true)
      console.error(e)
    } finally {
      setPendingUuid(null)
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
                      disabled={pendingUuid === u.uuid}
                      className="shrink-0"
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                )
              })}
        </div>
        {/* {!loading && users.length > 0 && (
          <button
            type="button"
            onClick={() => router.push('/discover/people')}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Show more
          </button>
        )} */}
      </CardContent>
    </Card>
  )
}

export default WhoToFollow

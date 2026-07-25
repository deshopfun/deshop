import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useState } from 'react'
import { ProfileType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { GetAbosolutePathByRelative } from '@/utils/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'

type Props = {
  uuid?: string
  followers?: ProfileType[]
}

const ProfileFollower = ({ followers }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">All followers</h2>

      {followers && followers.length > 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-1">
              {followers.map((u, idx) => {
                return (
                  <div
                    key={u.uuid}
                    className={`py-2.5 ${
                      idx < followers.length - 1 ? 'border-b border-muted' : ''
                    }`}
                  >
                    <Link
                      href={`/profile/${u.username}`}
                      className="flex items-center gap-3  min-w-0 group"
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
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground text-lg">Not found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ProfileFollower

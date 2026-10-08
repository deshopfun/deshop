import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import { PROFILE_TAB_DATAS } from '@/packages/constants'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'

import ProfileProduct from './Product'
import EditProfileDialog from '@/components/Dialog/EditProfileDialog'
import TipDialog from '@/components/Dialog/TipDialog'
import ProfileReply from './Reply'
import ProfileFollower from './Follower'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Coins, Edit, Globe, MessageCircle, Send, Share2, User } from 'lucide-react'
import { ProfileType, UserType } from '@/utils/types'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { cn } from '@/lib/utils'
import WhoToFollow from './WhoToFollow'
import { useShallow } from 'zustand/react/shallow'
import { SOCIALS, ResolvedSocial, resolveSocial, pickSocials } from '@/utils/social'
import ShareProfileDialog from '../Dialog/Shareprofiledialog'

const chipClass =
  'inline-flex h-9 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-sm text-gray-600 transition-colors hover:border-sky-300 hover:text-sky-600'

const SocialLinks = ({
  profile,
  onCopy,
}: {
  profile?: ProfileType
  onCopy: (text: string) => void
}) => {
  if (!profile) return null

  const list = SOCIALS.map((cfg) => ({ cfg, link: resolveSocial(cfg, profile[cfg.key]) })).filter(
    (x): x is { cfg: (typeof SOCIALS)[number]; link: ResolvedSocial } => !!x.link
  )
  if (!list.length) return null

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {list.map(({ cfg, link }) => {
        const Icon = cfg.icon
        const content = (
          <>
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{cfg.label}</span>
          </>
        )

        // 没有主页链接的（如 Discord 用户名）：点击复制
        if (link.copy) {
          return (
            <button
              key={cfg.key}
              type="button"
              className={chipClass}
              aria-label={`Copy ${cfg.label} username`}
              title={`${cfg.label}: ${link.copy} (click to copy)`}
              onClick={() => onCopy(link.copy!)}
            >
              {content}
            </button>
          )
        }

        return (
          <a
            key={cfg.key}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer nofollow ugc"
            aria-label={cfg.label}
            title={cfg.label}
            className={chipClass}
          >
            {content}
          </a>
        )
      })}
    </div>
  )
}

const ProfileDetails = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''
  const tab = typeof router.query.tab === 'string' ? router.query.tab : ''

  const [user, setUser] = useState<UserType>()
  const [activeTab, setActiveTab] = useState('products')
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)
  const [openTipDialog, setOpenTipDialog] = useState<boolean>(false)
  const [openShareDialog, setOpenShareDialog] = useState<boolean>(false)

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

  const toast = (severity: 'error' | 'success', msg: string) => {
    setSnackSeverity(severity)
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  useEffect(() => {
    if (tab) {
      const matchedTab = PROFILE_TAB_DATAS.find((item) => item.tabId === tab)
      setActiveTab(matchedTab?.tabId || 'products')
    }
  }, [tab])

  const handleTabChange = (value: string) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, tab: value },
    })
    setActiveTab(value)
  }

  const init = async (username: string, signal?: AbortSignal) => {
    if (!username) return toast('error', 'Incorrect username input')

    try {
      const response: any = await axios.get(Http.user_profile_by_username, {
        params: { username },
        signal,
      })

      if (response.result) {
        setUser({
          profile: response.data.profile,
          products: response.data.products,
          followers: response.data.followers,
          followings: response.data.followings,
          wallets: response.data.wallets,
        })
      } else {
        toast('error', response.message)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return
      toast('error', 'The network error occurred. Please try again later.')
      console.error(e)
    }
  }

  useAbortableEffect(
    (signal) => {
      if (!router.isReady || !id) return
      init(id, signal)
    },
    [router.isReady, id]
  )

  const onCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast('success', `Copied: ${text}`)
    } catch {
      toast('error', 'Copy failed. Please copy it manually.')
    }
  }

  // 修复：未登录且数据未加载时 undefined === undefined 会被判成"自己"
  const isOwnProfile = !!uuid && uuid === user?.profile?.uuid
  const wallets = user?.wallets ?? []
  const canTip = !isOwnProfile && wallets.length > 0

  // 没有侧栏时主内容占满整行，右侧不留空
  const showSidebar = isLogin

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className={cn('grid grid-cols-1 gap-6 sm:gap-8', showSidebar && 'lg:grid-cols-12')}>
        <div className={cn('min-w-0 space-y-6 sm:space-y-8', showSidebar && 'lg:col-span-8')}>
          <Card>
            <CardContent className="p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                <div className="flex items-start gap-4 sm:gap-6 min-w-0">
                  <Avatar className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 border-4 border-background shadow-lg">
                    <AvatarImage
                      src={GetAbosolutePathByRelative(user?.profile?.avatar_url, 'avatar')}
                      alt={user?.profile?.username}
                    />
                    <AvatarFallback>
                      <User className="w-10 h-10 sm:w-14 sm:h-14 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight break-words">
                      {user?.profile?.username}
                    </h1>
                    <div className="mt-2 sm:mt-3 space-y-1.5 text-sm text-muted-foreground">
                      <p className="break-all">
                        <span className="font-medium text-foreground">Email:</span>{' '}
                        {user?.profile?.email}
                      </p>
                      {user?.profile?.bio && (
                        <p className="break-words">
                          <span className="font-medium text-foreground">Bio:</span>{' '}
                          {user.profile.bio}
                        </p>
                      )}
                    </div>
                    <SocialLinks profile={user?.profile} onCopy={onCopyText} />
                  </div>
                </div>

                {/* 操作区：手机在下方整行排列，≥sm 靠右 */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {canTip && (
                    <Button
                      onClick={() => setOpenTipDialog(true)}
                      className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      <Coins className="w-4 h-4" />
                      Tip
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Share profile"
                    title="Share profile"
                    onClick={() => setOpenShareDialog(true)}
                    disabled={!user?.profile?.username}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  {isOwnProfile && (
                    <Button onClick={() => setOpenEditProfileDialog(true)} className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6 text-center border-t pt-6 sm:pt-8">
                <div>
                  <p className="text-2xl sm:text-3xl font-semibold">
                    {user?.followers?.length || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Followers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-semibold">
                    {user?.followings?.length || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Following</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-semibold">
                    {user?.products?.length || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Created products</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList
              className="grid w-full mb-6"
              style={{ gridTemplateColumns: `repeat(${PROFILE_TAB_DATAS.length}, minmax(0, 1fr))` }}
            >
              {PROFILE_TAB_DATAS.map((item) => (
                <TabsTrigger key={item.id} value={item.tabId}>
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="products" className="mt-0">
              <ProfileProduct uuid={user?.profile?.uuid} products={user?.products} />
            </TabsContent>

            <TabsContent value="replies" className="mt-0">
              <ProfileReply uuid={user?.profile?.uuid} />
            </TabsContent>

            <TabsContent value="followers" className="mt-0">
              <ProfileFollower uuid={user?.profile?.uuid} followers={user?.followers} />
            </TabsContent>
          </Tabs>
        </div>

        {showSidebar && (
          <aside className="lg:col-span-4 min-w-0 lg:sticky lg:top-24 lg:self-start">
            <WhoToFollow />
          </aside>
        )}
      </div>

      <EditProfileDialog
        avatarUrl={user?.profile?.avatar_url}
        username={user?.profile?.username}
        bio={user?.profile?.bio}
        socials={pickSocials(user?.profile)}
        openDialog={openEditProfileDialog}
        setOpenDialog={setOpenEditProfileDialog}
      />

      <TipDialog
        open={openTipDialog}
        onOpenChange={setOpenTipDialog}
        username={user?.profile?.username}
        avatarUrl={user?.profile?.avatar_url}
        wallets={wallets}
      />

      <ShareProfileDialog
        open={openShareDialog}
        onOpenChange={setOpenShareDialog}
        username={user?.profile?.username}
        avatarUrl={user?.profile?.avatar_url}
        bio={user?.profile?.bio}
        followers={user?.followers?.length ?? 0}
        followings={user?.followings?.length ?? 0}
        products={user?.products?.length ?? 0}
      />
    </div>
  )
}

export default ProfileDetails

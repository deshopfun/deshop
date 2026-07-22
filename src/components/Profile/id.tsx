import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import { PROFILE_TAB_DATAS } from '@/packages/constants'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'

import ProfileProduct from './Product'
import EditProfileDialog from '@/components/Dialog/EditProfileDialog'
import ProfileReply from './Reply'
import ProfileFollower from './Follower'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { User, Edit } from 'lucide-react'
import { UserType } from '@/utils/types'
import { GetAbosolutePathByRelative } from '@/utils/image'

const ProfileDetails = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''
  const tab = typeof router.query.tab === 'string' ? router.query.tab : ''

  const [user, setUser] = useState<UserType>()
  const [activeTab, setActiveTab] = useState('products')
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false)

  const { getUuid, getIsLogin } = useUserPresistStore((state) => state)
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

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

  const init = async (username: any) => {
    try {
      if (!username) {
        setSnackSeverity('error')
        setSnackMessage('Incorrect username input')
        setSnackOpen(true)
        return
      }

      const response: any = await axios.get(Http.user_profile_by_username, {
        params: { username },
      })

      if (response.result) {
        setUser({
          profile: response.data.profile,
          products: response.data.products,
        })
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    init(id)
  }, [id])

  const isOwnProfile = getUuid() === user?.profile?.uuid

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
                    <AvatarImage
                      src={GetAbosolutePathByRelative(user?.profile?.avatar_url, 'avatar')}
                      alt={user?.profile?.username}
                    />
                    <AvatarFallback>
                      <User className="w-14 h-14 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">{user?.profile?.username}</h1>
                    <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">Email:</span>{' '}
                        {user?.profile?.email}
                      </p>
                      {user?.profile?.bio && (
                        <p>
                          <span className="font-medium text-foreground">Bio:</span>{' '}
                          {user.profile.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {isOwnProfile && (
                  <Button onClick={() => setOpenEditProfileDialog(true)} className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 text-center border-t pt-8">
                <div>
                  <p className="text-3xl font-semibold">0</p>
                  <p className="text-sm text-muted-foreground mt-1">Followers</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">0</p>
                  <p className="text-sm text-muted-foreground mt-1">Following</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">{user?.products?.length || 0}</p>
                  <p className="text-sm text-muted-foreground mt-1">Created products</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {PROFILE_TAB_DATAS.map((item) => (
                <TabsTrigger key={item.id} value={item.tabId}>
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="products" className="mt-0">
              <ProfileProduct product={user?.products} uuid={user?.profile?.uuid} />
            </TabsContent>

            <TabsContent value="replies" className="mt-0">
              <ProfileReply uuid={user?.profile?.uuid} />
            </TabsContent>

            <TabsContent value="followers" className="mt-0">
              <ProfileFollower uuid={user?.profile?.uuid} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-4">
          {getIsLogin() && (
            <Card>
              <CardContent className="p-6">{/* Who to follow */}</CardContent>
            </Card>
          )}
        </div>
      </div>

      <EditProfileDialog
        avatarUrl={user?.profile?.avatar_url}
        username={user?.profile?.username}
        bio={user?.profile?.bio}
        openDialog={openEditProfileDialog}
        setOpenDialog={setOpenEditProfileDialog}
      />
    </div>
  )
}

export default ProfileDetails

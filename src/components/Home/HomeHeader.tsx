import HomeSearch from '@/components/Home/HomeSearch'
import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { OmitMiddleString } from '@/utils/strings'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  ShoppingCart,
  Heart,
  Plus,
  User,
  Settings,
  LayoutDashboard,
  LogOut,
  Wallet,
  Bell,
  Package,
  PackageCheck,
} from 'lucide-react'
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
import { GetAbosolutePathByRelative } from '@/utils/image'
import LanguageSwitcher from '../Language/LanguageSwitcher'
import LanguageSubmenu from '../Language/LanguageSubmenu'

const HomeHeader = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [collectNumber, setCollectNumber] = useState<number>(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state)
  const { getIsLogin, resetUser, getUserLanguage, setUserLanguage } = useUserPresistStore(
    (state) => state
  )
  const { getCart } = useCartPresistStore((state) => state)

  const onClickLogout = async () => {
    resetUser()
    window.location.href = '/'
  }

  const init = async () => {
    try {
      if (!getIsLogin || !getIsLogin()) {
        return
      }

      const response: any = await axios.get(Http.user_setting)

      if (response.result) {
        setAvatarUrl(response.data.avatar_url)
        setUsername(response.data.username)
        response.data.collects && setCollectNumber(response.data.collects.length)
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
    init()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-16 grid grid-cols-3 items-center gap-4">
        <div></div>

        <div className="flex justify-center">
          <HomeSearch />
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 shadow-sm"
              onClick={() => {
                window.location.href = '/cart'
              }}
            >
              <ShoppingCart className="h-6 w-6" />
            </Button>
            {getCart().length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-sky-500">
                {getCart().length > 99 ? '99+' : getCart().length}
              </Badge>
            )}
          </div>

          {getIsLogin() && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 shadow-sm"
                onClick={() => {
                  window.location.href = '/collect'
                }}
              >
                <Heart className="h-6 w-6" />
              </Button>
              {collectNumber > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-sky-500">
                  {collectNumber > 99 ? '99+' : collectNumber}
                </Badge>
              )}
            </div>
          )}

          <Button
            onClick={() => {
              window.location.href = '/create'
            }}
            className="h-11 px-5 text-base bg-green-700 hover:bg-green-900 text-white gap-1 hidden md:flex"
          >
            <Plus className="h-5 w-5" />
            Create
          </Button>

          {getIsLogin() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-11 flex items-center gap-2 px-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={GetAbosolutePathByRelative(avatarUrl, 'avatar')} />
                    <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:block">
                    {OmitMiddleString(String(username), 3)}
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-52" align="end">
                <div className="flex items-center gap-2 p-2 mb-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={GetAbosolutePathByRelative(avatarUrl, 'avatar')} />
                    <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{username}</p>
                    <p className="text-xs text-muted-foreground">Account</p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Manage
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `/profile/${username}`
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `/manage/${username}`
                    }}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Manage
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `/manage/${username}?tab=products`
                    }}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Products
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `/manage/${username}?tab=orders`
                    }}
                  >
                    <PackageCheck className="mr-2 h-4 w-4" />
                    Orders
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `/manage/${username}?tab=wallets`
                    }}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Wallets
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `/manage/${username}?tab=notifications`
                    }}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `/manage/${username}?tab=settings`
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `/support`
                    }}
                  >
                    Support
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `#`
                    }}
                  >
                    Status
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `#`
                    }}
                  >
                    Documentation
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `#`
                    }}
                  >
                    Help Center
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      window.location.href = `#`
                    }}
                  >
                    Terms of Use
                  </DropdownMenuItem>

                  <LanguageSubmenu />
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500 focus:bg-red-50"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You'll need to sign in again to access your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                        onClick={onClickLogout}
                      >
                        Log out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => {
                window.location.href = '/login'
              }}
              className="h-11 text-base px-5 bg-sky-500 hover:bg-sky-600 text-white"
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default HomeHeader

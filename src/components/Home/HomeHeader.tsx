import { useRouter } from 'next/router'
import HomeSearch from '@/components/Home/HomeSearch'
import HowItWorksDialog from '@/components/Home/HowItWorksDialog'
import { useCartPresistStore, useUserPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import { OmitMiddleString } from '@/utils/strings'
import { useUserSetting } from '@/hooks/queries/useUserSetting'
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
  LogOut,
  Wallet,
  Info,
  Search,
  FilePenLine,
  Diamond,
  X,
  Menu,
} from 'lucide-react'
import { SiteLogo } from '@/components/Logo/SiteLogo'
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
import LanguageSubmenu from '../Language/LanguageSubmenu'
import { cn } from '@/lib/utils'
import { useShallow } from 'zustand/react/shallow'
import Link from 'next/link'

// 顶部图标按钮：手机 40px，≥sm 44px
const ICON_BTN = 'h-10 w-10 sm:h-11 sm:w-11 shadow-sm'
const ICON = 'h-5 w-5 sm:h-6 sm:w-6'

type HomeHeaderProps = {
  showMenuButton?: boolean
  onMenuClick?: () => void
}

const HomeHeader = ({ showMenuButton = false, onMenuClick }: HomeHeaderProps) => {
  const router = useRouter()
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const { resetUser, isLogin } = useUserPresistStore(
    useShallow((state) => ({
      resetUser: state.resetUser,
      isLogin: state.isLogin,
    }))
  )

  const { cart } = useCartPresistStore(
    useShallow((state) => ({
      cart: state.cart,
    }))
  )

  const userSettingQuery = useUserSetting(isLogin)
  const avatarUrl = userSettingQuery.data?.avatar_url
  const username = userSettingQuery.data?.username
  const collectNumber = userSettingQuery.data?.collects?.length ?? 0

  const onClickLogout = async () => {
    resetUser()
    void router.push('/')
  }

  // 屏幕放大到桌面宽度后，自动收起手机端的搜索栏
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => e.matches && setMobileSearchOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center gap-2 lg:grid lg:grid-cols-[1fr_minmax(0,28rem)_1fr] lg:gap-4">
          {/* Left: mobile menu + logo / desktop spacer */}
          <div className="flex items-center gap-1 min-w-0 shrink-0">
            {showMenuButton && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(ICON_BTN, 'lg:hidden')}
                aria-label="Open menu"
                onClick={onMenuClick}
              >
                <Menu className={ICON} />
              </Button>
            )}
            <div className="lg:hidden">
              <SiteLogo collapsed={false} className="!p-1" />
            </div>
          </div>

          <div className="hidden lg:flex justify-center min-w-0">
            <HomeSearch />
          </div>

          <div className="ml-auto flex items-center justify-end gap-0.5 sm:gap-1.5 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className={cn(ICON_BTN, 'lg:hidden')}
              aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
              aria-expanded={mobileSearchOpen}
              onClick={() => setMobileSearchOpen((v) => !v)}
            >
              {mobileSearchOpen ? <X className={ICON} /> : <Search className={ICON} />}
            </Button>

            <Button
              variant="ghost"
              className="h-10 w-10 sm:w-auto sm:h-10 px-0 sm:px-3 text-sm text-muted-foreground hover:text-foreground gap-1.5 hidden sm:inline-flex"
              aria-label="How it works"
              onClick={() => setHowItWorksOpen(true)}
            >
              <Info className="h-5 w-5 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden xl:inline">How it works</span>
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={ICON_BTN}
                aria-label="Cart"
                onClick={() => {
                  void router.push('/cart')
                }}
              >
                <ShoppingCart className={ICON} />
              </Button>
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center px-1 text-xs bg-sky-500">
                  {cart.length > 99 ? '99+' : cart.length}
                </Badge>
              )}
            </div>

            {isLogin && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className={ICON_BTN}
                  aria-label="Favorites"
                  onClick={() => {
                    void router.push('/collect')
                  }}
                >
                  <Heart className={ICON} />
                </Button>
                {collectNumber > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center px-1 text-xs bg-sky-500">
                    {collectNumber > 99 ? '99+' : collectNumber}
                  </Badge>
                )}
              </div>
            )}

            <Button
              onClick={() => {
                void router.push('/create')
              }}
              className="h-11 px-4 text-base bg-green-700 hover:bg-green-900 text-white gap-1 hidden lg:flex"
            >
              <Plus className="h-5 w-5" />
              Create
            </Button>

            {isLogin ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-10 sm:h-11 flex items-center gap-2 px-1.5 sm:px-3"
                    aria-label="Account menu"
                  >
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                      <AvatarImage src={GetAbosolutePathByRelative(avatarUrl, 'avatar')} />
                      <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden xl:block">
                      {OmitMiddleString(String(username), 3)}
                    </span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-56 max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto"
                  align="end"
                  collisionPadding={8}
                >
                  <div className="flex items-center gap-2 p-2 mb-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={GetAbosolutePathByRelative(avatarUrl, 'avatar')} />
                      <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium truncate">{username}</p>
                      <p className="text-xs text-muted-foreground">Account</p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Manage
                    </DropdownMenuLabel>

                    <DropdownMenuItem asChild className="lg:hidden py-2.5">
                      <Link
                        href="/create"
                        className="flex w-full items-center font-medium text-green-700 focus:text-green-700"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="sm:hidden py-2.5"
                      onSelect={() => setHowItWorksOpen(true)}
                    >
                      <Info className="mr-2 h-4 w-4" />
                      How it works
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href={`/profile/${username}`} className="flex w-full items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/manage/${username}?tab=products`}
                        className="flex w-full items-center"
                      >
                        <Diamond className="mr-2 h-4 w-4" />
                        Products
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/manage/${username}?tab=orders`}
                        className="flex w-full items-center"
                      >
                        <FilePenLine className="mr-2 h-4 w-4" />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/manage/${username}?tab=wallets`}
                        className="flex w-full items-center"
                      >
                        <Wallet className="mr-2 h-4 w-4" />
                        Wallets
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/manage/${username}?tab=settings`}
                        className="flex w-full items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href={`/support`} className="flex w-full items-center">
                        Support
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`https://deshop.instatus.com`}
                        className="flex w-full items-center"
                      >
                        Status
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`https://docs.deshop.space`} className="flex w-full items-center">
                        Documentation
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/support`} className="flex w-full items-center">
                        Help Center
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/docs/terms-and-conditions`}
                        className="flex w-full items-center"
                      >
                        Terms of Use
                      </Link>
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

                    <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You&apos;ll need to sign in again to access your account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-2 sm:gap-0">
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
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Button
                  variant="outline"
                  className="h-11 px-4 text-sm hidden sm:flex"
                  onClick={() => {
                    void router.push('/login')
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="h-10 sm:h-11 px-3 sm:px-4 text-sm bg-sky-500 hover:bg-sky-600 text-white whitespace-nowrap"
                  onClick={() => {
                    void router.push('/login')
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="lg:hidden border-t bg-white/90 px-3 py-2.5">
            <div className="w-full">
              <HomeSearch />
            </div>
          </div>
        )}
      </header>

      <HowItWorksDialog
        open={howItWorksOpen}
        onOpenChange={setHowItWorksOpen}
        isLogin={isLogin}
      />
    </>
  )
}

export default HomeHeader

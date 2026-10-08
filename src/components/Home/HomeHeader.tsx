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
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
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
  ShoppingBag,
  CreditCard,
  Store,
  ChevronRight,
  ChevronLeft,
  FilePenLine,
  Diamond,
  X,
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
import LanguageSubmenu from '../Language/LanguageSubmenu'
import { cn } from '@/lib/utils'
import { useShallow } from 'zustand/react/shallow'
import Link from 'next/link'

const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: '1. Discover products',
    description:
      'Browse trending items or search by category. Find digital goods, opensource tools, and more from creators worldwide.',
    icon: Search,
    accent: 'bg-sky-500',
  },
  {
    id: 2,
    title: '2. Choose & add to cart',
    description:
      'Select options like color or size, set the quantity, then add to cart or buy instantly. Stock updates in real time.',
    icon: ShoppingBag,
    accent: 'bg-emerald-500',
  },
  {
    id: 3,
    title: '3. Pay with crypto',
    description:
      'Checkout securely using cryptocurrency. Your payment is recorded on-chain so every transfer is transparent and verifiable.',
    icon: CreditCard,
    accent: 'bg-violet-500',
  },
  {
    id: 4,
    title: '4. Confirm & complete',
    description:
      'The order is only marked complete after the on-chain transaction is confirmed and both buyer and seller mutually confirm. This protects both sides.',
    icon: Store,
    accent: 'bg-amber-500',
  },
]

// 顶部图标按钮：手机 40px，≥sm 44px
const ICON_BTN = 'h-10 w-10 sm:h-11 sm:w-11 shadow-sm'
const ICON = 'h-5 w-5 sm:h-6 sm:w-6'

const HomeHeader = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [collectNumber, setCollectNumber] = useState<number>(0)
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
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

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const onClickLogout = async () => {
    resetUser()
    window.location.href = '/'
  }

  const init = async () => {
    try {
      if (!isLogin) return

      const response: any = await axios.get(Http.user_setting)
      if (response && response.result) {
        setAvatarUrl(response.data.avatar_url)
        setUsername(response.data.username)
        response.data.collects && setCollectNumber(response.data.collects.length)
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    init()
  }, [])

  // 屏幕放大到桌面宽度后，自动收起手机端的搜索栏
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e: MediaQueryListEvent) => e.matches && setMobileSearchOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const openHowItWorks = () => {
    setStepIndex(0)
    setHowItWorksOpen(true)
  }

  const currentStep = HOW_IT_WORKS_STEPS[stepIndex]
  const isLastStep = stepIndex === HOW_IT_WORKS_STEPS.length - 1
  const StepIcon = currentStep.icon

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2 md:grid md:grid-cols-3 md:gap-4">
          <div />

          <div className="hidden md:flex justify-center">
            <HomeSearch />
          </div>

          <div className="ml-auto flex items-center justify-end gap-0.5 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(ICON_BTN, 'md:hidden')}
              aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
              aria-expanded={mobileSearchOpen}
              onClick={() => setMobileSearchOpen((v) => !v)}
            >
              {mobileSearchOpen ? <X className={ICON} /> : <Search className={ICON} />}
            </Button>

            <Button
              variant="ghost"
              className="h-10 w-10 sm:w-auto sm:h-10 px-0 sm:px-3 text-sm text-muted-foreground hover:text-foreground gap-1.5"
              aria-label="How it works"
              onClick={openHowItWorks}
            >
              <Info className="h-5 w-5 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden lg:inline">How it works</span>
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={ICON_BTN}
                aria-label="Cart"
                onClick={() => {
                  window.location.href = '/cart'
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
                    window.location.href = '/collect'
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
                window.location.href = '/create'
              }}
              className="h-11 w-24 px-5 text-base bg-green-700 hover:bg-green-900 text-white gap-1 hidden md:flex"
            >
              <Plus className="h-6 w-6" />
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
                    <span className="text-sm font-medium hidden md:block">
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

                    <DropdownMenuItem asChild className="md:hidden py-2.5">
                      <Link
                        href="/create"
                        className="flex w-full items-center font-medium text-green-700 focus:text-green-700"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create
                      </Link>
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
                    window.location.href = '/login'
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="h-10 sm:h-11 px-3 sm:px-4 text-sm bg-sky-500 hover:bg-sky-600 text-white whitespace-nowrap"
                  onClick={() => {
                    window.location.href = '/login'
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="md:hidden border-t bg-white/90 px-3 py-2.5">
            <div className="w-full">
              <HomeSearch />
            </div>
          </div>
        )}
      </header>

      <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-0 shadow-2xl gap-0">
          <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 px-4 sm:px-6 pt-8 pb-8 sm:pb-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />

            <div className="relative mx-auto max-w-[280px]">
              <div className="rounded-2xl bg-white shadow-xl p-5 transform rotate-[-1deg]">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <p className="text-sm font-semibold text-gray-900 leading-snug">
                    {currentStep.title.replace(/^\d+\.\s*/, '')}
                  </p>
                  <div
                    className={cn(
                      'h-10 w-10 rounded-full flex items-center justify-center text-white shrink-0',
                      currentStep.accent
                    )}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-9 rounded-lg bg-emerald-500/90" />
                  <div className="flex-1 h-9 rounded-lg bg-gray-200" />
                </div>
              </div>
            </div>

            <div className="relative flex justify-center mt-4">
              {HOW_IT_WORKS_STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to step ${i + 1}`}
                  onClick={() => setStepIndex(i)}
                  className="px-1 py-2"
                >
                  <span
                    className={cn(
                      'block h-1.5 rounded-full transition-all',
                      i === stepIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white px-4 sm:px-6 pt-5 pb-6 flex flex-col gap-5">
            <div>
              <DialogTitle className="text-lg font-bold text-gray-900 leading-snug">
                {currentStep.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {currentStep.description}
              </DialogDescription>
            </div>

            <div className="flex items-center gap-2">
              {stepIndex > 0 && (
                <Button
                  variant="outline"
                  className="h-11 px-4 rounded-xl gap-1"
                  onClick={() => setStepIndex((s) => s - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              )}

              {isLastStep ? (
                <Button
                  className="flex-1 h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold"
                  onClick={() => {
                    setHowItWorksOpen(false)
                    if (!isLogin) {
                      window.location.href = '/login'
                    }
                  }}
                >
                  {isLogin ? 'Got it' : 'Get started'}
                </Button>
              ) : (
                <Button
                  className="flex-1 h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-1"
                  onClick={() => setStepIndex((s) => s + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default HomeHeader

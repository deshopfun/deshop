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
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  ShoppingCart,
  Heart,
  Plus,
  User,
  Settings,
  LogOut,
  Wallet,
  Package,
  Info,
  Search,
  ShoppingBag,
  CreditCard,
  Store,
  ChevronRight,
  ChevronLeft,
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

const HomeHeader = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [collectNumber, setCollectNumber] = useState<number>(0)
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state)
  const { getIsLogin, resetUser } = useUserPresistStore((state) => state)
  const { getCart } = useCartPresistStore((state) => state)

  const onClickLogout = async () => {
    resetUser()
    window.location.href = '/'
  }

  const init = async () => {
    try {
      if (!getIsLogin?.()) return

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
      console.error(e)
    }
  }

  useEffect(() => {
    init()
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
        <div className="container mx-auto px-4 h-16 grid grid-cols-3 items-center gap-4">
          <div></div>

          <div className="flex justify-center">
            <HomeSearch />
          </div>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            {/* How it works */}
            <Button
              variant="ghost"
              className="h-10 px-2.5 sm:px-3 text-sm text-muted-foreground hover:text-foreground gap-1.5"
              onClick={openHowItWorks}
            >
              <Info className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">How it works</span>
            </Button>

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
              className="h-11 w-24 px-5 text-base bg-green-700 hover:bg-green-900 text-white gap-1 hidden md:flex"
            >
              <Plus className="h-6 w-6" />
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
                    <DropdownMenuItem
                      onClick={() => {
                        window.location.href = `/manage/${username}?tab=products`
                      }}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Products
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        window.location.href = `/manage/${username}?tab=wallets`
                      }}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallets
                    </DropdownMenuItem>
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
                    <DropdownMenuItem onClick={() => (window.location.href = `/support`)}>
                      Support
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => (window.location.href = `#`)}>
                      Status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => (window.location.href = `#`)}>
                      Documentation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => (window.location.href = `#`)}>
                      Help Center
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => (window.location.href = `/docs/terms-and-conditions`)}
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
                          You&apos;ll need to sign in again to access your account.
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
              <div className="flex items-center gap-2">
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
                  className="h-11 px-4 text-sm bg-sky-500 hover:bg-sky-600 text-white"
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
      </header>

      <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl border-0 shadow-2xl gap-0">
          <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 px-6 pt-8 pb-10">
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

            <div className="flex justify-center gap-1.5 mt-6">
              {HOW_IT_WORKS_STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStepIndex(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === stepIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                  )}
                />
              ))}
            </div>
          </div>

          <div className="bg-white px-6 pt-5 pb-6 flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{currentStep.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {currentStep.description}
              </p>
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
                    if (!getIsLogin()) {
                      window.location.href = '/login'
                    }
                  }}
                >
                  {getIsLogin() ? 'Got it' : 'Get started'}
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

import { useRouter } from 'next/router'
import { routes } from './Routes'
import MetaTags from '@/components/Common/MetaTags'
import { useEffect, useMemo, useState } from 'react'
import HomeSidebar from '@/components/Sidebar'
import HomeHeader from '@/components/Home/HomeHeader'
import HomeFooter from '@/components/Home/HomeFooter'
import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

const snackIcons = {
  success: { icon: CheckCircle2, className: 'text-green-500' },
  error: { icon: XCircle, className: 'text-red-500' },
  warning: { icon: AlertCircle, className: 'text-yellow-500' },
  info: { icon: Info, className: 'text-blue-500' },
}

const Index = () => {
  const router = useRouter()
  // Always false on first render so SSR HTML matches the client before rehydrate.
  const [authReady, setAuthReady] = useState(false)
  const [loginRedirecting, setLoginRedirecting] = useState(false)

  const currentRoute = useMemo(
    () => routes.find((item) => item.path === router.pathname),
    [router.pathname]
  )

  const { sidebarCollapsed, setSidebarCollapsed, isLogin } = useUserPresistStore(
    useShallow((state) => ({
      sidebarCollapsed: state.sidebarCollapsed,
      setSidebarCollapsed: state.setSidebarCollapsed,
      isLogin: state.isLogin,
    }))
  )

  const { snackSeverity, snackMessage, snackOpen, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      snackSeverity: state.snackSeverity,
      snackMessage: state.snackMessage,
      snackOpen: state.snackOpen,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const handleSidebarCollapsedChange = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
  }

  useEffect(() => {
    const persistApi = useUserPresistStore.persist
    if (!persistApi) {
      setAuthReady(true)
      return
    }
    const unsub = persistApi.onFinishHydration(() => setAuthReady(true))
    if (persistApi.hasHydrated()) {
      setAuthReady(true)
    } else {
      void persistApi.rehydrate()
    }
    return unsub
  }, [])

  useEffect(() => {
    if (!authReady || !currentRoute?.needLogin) {
      setLoginRedirecting(false)
      return
    }

    if (!isLogin) {
      setLoginRedirecting(true)
      const redirect = router.asPath || router.pathname
      void router.replace({ pathname: '/login', query: { redirect } })
      return
    }

    setLoginRedirecting(false)
  }, [router.pathname, router.asPath, isLogin, authReady, currentRoute?.needLogin, router])

  useEffect(() => {
    setSnackOpen(false)
  }, [setSnackOpen])

  useEffect(() => {
    if (!snackOpen) return
    const timer = setTimeout(() => setSnackOpen(false), 3000)
    return () => clearTimeout(timer)
  }, [snackOpen, setSnackOpen])

  const SnackIcon = snackSeverity ? snackIcons[snackSeverity]?.icon : Info
  const snackIconClass = snackSeverity ? snackIcons[snackSeverity]?.className : ''

  // Auth-only routes wait for hydration / redirect; public routes render immediately (incl. SSR).
  const waitingForAuth =
    !!currentRoute?.needLogin && (!authReady || loginRedirecting || !isLogin)

  if (!currentRoute || waitingForAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  // Product/Story pages already emit SSR Head + JSON-LD; skip shell MetaTags so we don't overwrite them.
  const skipShellMeta =
    currentRoute.path === '/products/[id]' || currentRoute.path === '/story/[id]'

  return (
    <div className="min-h-screen bg-gray-50">
      {!skipShellMeta && <MetaTags title={currentRoute.title} />}

      {currentRoute.enableSidebar ? (
        <div className="flex min-h-screen">
          <HomeSidebar
            collapsed={sidebarCollapsed}
            onCollapsedChange={handleSidebarCollapsedChange}
          />

          <div
            className={cn(
              'flex flex-col flex-1 min-h-screen transition-all duration-200',
              sidebarCollapsed ? 'ml-[72px]' : 'ml-60'
            )}
          >
            {currentRoute.enableHomeHeader && <HomeHeader />}
            <main className="flex-1 p-6">
              {currentRoute.Component ? <currentRoute.Component /> : null}
            </main>
            {currentRoute.enableHomeFooter && <HomeFooter />}
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            {currentRoute.Component ? <currentRoute.Component /> : null}
          </main>
          {currentRoute.enableHomeFooter && <HomeFooter />}
        </div>
      )}

      <div
        className={cn(
          'fixed top-6 right-6 z-[999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg bg-white border transition-all duration-300',
          snackOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
        {SnackIcon && <SnackIcon className={cn('h-5 w-5 shrink-0', snackIconClass)} />}
        <p className="text-sm font-medium text-gray-700">{snackMessage}</p>
        <button
          onClick={() => setSnackOpen(false)}
          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default Index

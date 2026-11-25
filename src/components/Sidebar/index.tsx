import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  House,
  Info,
  CircleEllipsis,
  PanelLeftClose,
  PanelLeftOpen,
  Compass,
  Radius,
  MessageCircleMore,
  X,
} from 'lucide-react'
import SidebarHeader from './SidebarHeader'
import SidebarFooter from './SidebarFooter'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navItems = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Chat', href: '/chat', icon: MessageCircleMore },
  { label: 'Blockchain', href: '/blockchain', icon: Radius },
  { label: 'Support', href: '/support', icon: Info },
]

const moreItems = [
  { label: 'Documentation', href: 'https://docs.deshop.space' },
  { label: 'Terms of Use', href: '/docs/terms-and-conditions' },
  { label: 'Help Center', href: '/support' },
]

interface HomeSidebarProps {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  mobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
}

const HomeSidebar = ({
  collapsed,
  onCollapsedChange,
  mobileOpen = false,
  onMobileOpenChange,
}: HomeSidebarProps) => {
  const router = useRouter()

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname === href || router.pathname.startsWith(href + '/')
  }

  // Close mobile drawer on navigation
  useEffect(() => {
    const close = () => onMobileOpenChange?.(false)
    router.events.on('routeChangeStart', close)
    return () => router.events.off('routeChangeStart', close)
  }, [router.events, onMobileOpenChange])

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  const renderNav = (opts: { iconOnly: boolean; showCollapse: boolean }) => (
    <>
      <SidebarHeader collapsed={opts.iconOnly} />

      <nav className="flex-1 py-3 px-2.5 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              title={opts.iconOnly ? item.label : undefined}
              onClick={() => onMobileOpenChange?.(false)}
            >
              <div
                className={cn(
                  'flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer',
                  opts.iconOnly ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
                  active
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn('h-5 w-5 shrink-0', active ? 'text-sky-500' : 'text-gray-400')}
                />
                {!opts.iconOnly && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    )}
                  </>
                )}
              </div>
            </Link>
          )
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              title={opts.iconOnly ? 'More' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-150 w-full',
                opts.iconOnly ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
                'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <CircleEllipsis className="h-5 w-5 shrink-0 text-gray-400" />
              {!opts.iconOnly && <span>More</span>}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-48">
            {moreItems.map((item) => (
              <DropdownMenuItem
                key={item.href}
                onClick={() => {
                  onMobileOpenChange?.(false)
                  void router.push(item.href)
                }}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {opts.showCollapse && (
        <div className={cn('px-2.5 pb-2', opts.iconOnly && 'flex justify-center')}>
          <button
            type="button"
            onClick={() => onCollapsedChange(!collapsed)}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {opts.iconOnly ? (
              <PanelLeftOpen className="h-4 w-4 mx-auto" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      )}

      <SidebarFooter collapsed={opts.iconOnly} />
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex fixed top-0 left-0 h-full flex-col border-r border-gray-100 bg-white shadow-sm z-40 transition-all duration-200',
          collapsed ? 'w-[72px]' : 'w-60'
        )}
      >
        {renderNav({ iconOnly: collapsed, showCollapse: true })}
      </aside>

      {/* Mobile drawer backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden',
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => onMobileOpenChange?.(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-[min(100%,16rem)] flex flex-col border-r border-gray-100 bg-white shadow-xl transition-transform duration-200 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            aria-label="Close menu"
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => onMobileOpenChange?.(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {renderNav({ iconOnly: false, showCollapse: false })}
      </aside>
    </>
  )
}

export default HomeSidebar

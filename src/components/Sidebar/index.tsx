import { useRouter } from 'next/router'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  House,
  MessageCircle,
  Bitcoin,
  Info,
  CircleEllipsis,
  PanelLeftClose,
  PanelLeftOpen,
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
  // { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Chat', href: '/chat', icon: MessageCircle },
  { label: 'Blockchain', href: '/blockchain', icon: Bitcoin },
  // { label: 'Livestreams', href: '/live', icon: Tv },
  { label: 'Support', href: '/support', icon: Info },
]

const moreItems = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Terms of Use', href: '/docs/terms-and-conditions' },
  { label: 'Help Center', href: '/support' },
]

type HomeSidebarProps = {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}

const HomeSidebar = ({ collapsed, onCollapsedChange }: HomeSidebarProps) => {
  const router = useRouter()

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname === href || router.pathname.startsWith(href + '/')
  }

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full flex flex-col border-r border-gray-100 bg-white shadow-sm z-40 transition-all duration-200',
        collapsed ? 'w-[72px]' : 'w-60'
      )}
    >
      <SidebarHeader collapsed={collapsed} />

      <nav className="flex-1 py-3 px-2.5 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}>
              <div
                className={cn(
                  'flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer',
                  collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
                  active
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn('h-5 w-5 shrink-0', active ? 'text-sky-500' : 'text-gray-400')}
                />
                {!collapsed && (
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
              title={collapsed ? 'More' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-150 w-full',
                collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5',
                'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <CircleEllipsis className="h-5 w-5 shrink-0 text-gray-400" />
              {!collapsed && <span>More</span>}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-48">
            {moreItems.map((item) => (
              <DropdownMenuItem
                key={item.href}
                onClick={() => {
                  window.location.href = item.href
                }}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div className={cn('px-2.5 pb-2', collapsed && 'flex justify-center')}>
        <button
          type="button"
          onClick={() => onCollapsedChange(!collapsed)}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4 mx-auto" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>

      <SidebarFooter collapsed={collapsed} />
    </aside>
  )
}

export default HomeSidebar

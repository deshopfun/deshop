import { useRouter } from 'next/router'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  House,
  Compass,
  Bitcoin,
  Tv,
  MessageCircle,
  Info,
  CircleEllipsis,
  Plus,
} from 'lucide-react'
import SidebarHeader from './SidebarHeader'
import SidebarFooter from './SidebarFooter'

const navItems = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Blockchain', href: '/blockchain', icon: Bitcoin },
  { label: 'Livestreams', href: '/live', icon: Tv },
  { label: 'Chat', href: '/chat', icon: MessageCircle },
  { label: 'Support', href: '/support', icon: Info },
  { label: 'More', href: '#', icon: CircleEllipsis },
]

const HomeSidebar = () => {
  const router = useRouter()

  return (
    <aside className="fixed top-0 left-0 h-full w-60 flex flex-col border-r border-gray-100 bg-white shadow-sm z-40 overflow-y-auto overflow-x-hidden">
      <SidebarHeader />

      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn('h-5 w-5 shrink-0', isActive ? 'text-sky-500' : 'text-gray-400')}
                />
                <span>{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500" />}
              </div>
            </Link>
          )
        })}
      </nav>

      <SidebarFooter />
    </aside>
  )
}

export default HomeSidebar

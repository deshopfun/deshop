import { useUserPresistStore } from '@/lib'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SiteLogo } from '@/components/Logo/SiteLogo'
import { cn } from '@/lib/utils'
import { useShallow } from 'zustand/react/shallow'
import { useNotifications } from '@/hooks/queries/useNotifications'
import Link from 'next/link'

interface Props {
  collapsed?: boolean
}

const SidebarHeader = ({ collapsed = false }: Props) => {
  const { isLogin } = useUserPresistStore(
    useShallow((state) => ({
      isLogin: state.isLogin,
    }))
  )

  const notificationsQuery = useNotifications(isLogin)
  const notificationNumber =
    notificationsQuery.data?.filter((item) => String(item?.is_read) === 'false').length ?? 0

  return (
    <div className={cn('p-3 border-b border-gray-50', collapsed && 'px-2')}>
      <div
        className={cn(
          'flex items-center',
          collapsed ? 'flex-col gap-2' : 'flex-row justify-between'
        )}
      >
        <SiteLogo collapsed={collapsed} />

        {isLogin && (
          <div className="relative inline-flex">
            <Button
              className="h-9 w-9 shadow-sm"
              variant="ghost"
              size="icon"
              title="Notifications"
              asChild
            >
              <Link href="/notification">
                <Bell className="h-4 w-4" />
              </Link>
            </Button>
            {notificationNumber > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-600">
                {notificationNumber > 99 ? '99+' : notificationNumber}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarHeader

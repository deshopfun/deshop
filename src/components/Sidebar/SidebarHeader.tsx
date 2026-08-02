import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SiteLogo } from '@/components/Logo/SiteLogo'
import { cn } from '@/lib/utils'

type Props = {
  collapsed?: boolean
}

const SidebarHeader = ({ collapsed = false }: Props) => {
  const [notificationNumber, setNotificationNumber] = useState(0)
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state)
  const { getIsLogin } = useUserPresistStore((state) => state)

  const init = async () => {
    try {
      if (!getIsLogin?.()) return
      const response: any = await axios.get(Http.user_notification)
      if (response.result) {
        const list = response.data || []
        const count = list.filter((item: any) => item.is_read === "false").length
        setNotificationNumber(count)
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

  return (
    <div className={cn('p-3 border-b border-gray-50', collapsed && 'px-2')}>
      <div
        className={cn(
          'flex items-center',
          collapsed ? 'flex-col gap-2' : 'flex-row justify-between'
        )}
      >
        <SiteLogo collapsed={collapsed} />

        {getIsLogin() && (
          <div className="relative inline-flex">
            <Button
              className="h-9 w-9 shadow-sm"
              variant="ghost"
              size="icon"
              title="Notifications"
              onClick={() => {
                window.location.href = '/notification'
              }}
            >
              <Bell className="h-4 w-4" />
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

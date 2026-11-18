import { useUserPresistStore } from '@/lib'
import { useEffect } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useShallow } from 'zustand/react/shallow'
import { Loader2 } from 'lucide-react'

const Manage = () => {
  const { isLogin } = useUserPresistStore(
    useShallow((state) => ({
      isLogin: state.isLogin,
    }))
  )

  useEffect(() => {
    if (!isLogin) {
      window.location.href = '/login'
      return
    }

    let cancelled = false

    const redirectToManage = async () => {
      try {
        const response: any = await axios.get(Http.user_setting)
        if (cancelled) return
        if (response?.result && response.data?.username) {
          window.location.replace(`/manage/${response.data.username}?tab=products`)
          return
        }
      } catch {
        // fall through to home
      }
      if (!cancelled) window.location.replace('/')
    }

    redirectToManage()

    return () => {
      cancelled = true
    }
  }, [isLogin])

  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">Redirecting…</span>
    </div>
  )
}

export default Manage

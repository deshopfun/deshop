import { useUserPresistStore } from '@/lib'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useShallow } from 'zustand/react/shallow'
import { Loader2 } from 'lucide-react'
import { useUserSetting } from '@/hooks/queries/useUserSetting'

const Manage = () => {
  const router = useRouter()
  const { isLogin } = useUserPresistStore(
    useShallow((state) => ({
      isLogin: state.isLogin,
    }))
  )

  const settingQuery = useUserSetting(isLogin)

  useEffect(() => {
    if (!isLogin) {
      void router.replace({ pathname: '/login', query: { redirect: '/manage' } })
      return
    }

    if (settingQuery.isLoading) return

    const username = settingQuery.data?.username
    if (username) {
      void router.replace(`/manage/${username}?tab=products`)
      return
    }

    void router.replace('/')
  }, [isLogin, router, settingQuery.isLoading, settingQuery.data?.username])

  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">Redirecting…</span>
    </div>
  )
}

export default Manage

import { SiteLogo } from '@/components/Logo/SiteLogo'
import { useUserPresistStore } from '@/lib'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Construction } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

const ForgotPassword = () => {
  const router = useRouter()

  const { isLogin } = useUserPresistStore(
    useShallow((state) => ({
      isLogin: state.isLogin,
    }))
  )

  useEffect(() => {
    if (isLogin) void router.replace('/')
  }, [isLogin, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <SiteLogo />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome to Deshop</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Decentralized open source product display and trading platform
            </p>
          </div>
        </div>

        <Card className="w-full shadow-lg border-0 rounded-2xl">
          <CardContent className="p-8 flex flex-col gap-6 items-center text-center">
            <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center">
              <Construction className="h-8 w-8 text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Password reset unavailable</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Email password reset is not wired to the API yet. Please sign in with the email
                verification code on the login page.
              </p>
            </div>
            <Button
              className="h-11 w-full gap-2 bg-sky-500 hover:bg-sky-600"
              onClick={() => void router.push('/login')}
            >
              <ArrowLeft className="h-4 w-4" /> Return to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword

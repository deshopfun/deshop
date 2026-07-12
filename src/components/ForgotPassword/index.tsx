import { SiteLogo } from '@/components/Logo/SiteLogo'
import { useUserPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import { IsValidEmail } from '@/utils/verify'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const { getIsLogin } = useUserPresistStore((state) => state)

  useEffect(() => {
    if (getIsLogin()) window.location.href = '/'
  }, [])

  const onResetPassword = async () => {
    if (!email || !IsValidEmail(email)) return
    setLoading(true)
    try {
      // await axios.post(Http.forgot_password, { email })
      setSent(true)
    } catch {
      // showError
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8">

        <div className="flex flex-col items-center gap-3 text-center">
          <SiteLogo />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome to Deshop</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Decentralized digital exchange platform
            </p>
          </div>
        </div>

        <Card className="w-full shadow-lg border-0 rounded-2xl">
          <CardContent className="p-8 flex flex-col gap-6">
            {!sent ? (
              <>
                <div>
                  <h2 className="text-xl font-bold">Forgot Password</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Enter your email and we'll send you a reset link
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') onResetPassword() }}
                      placeholder="you@example.com"
                      className="pl-9 h-11"
                      autoFocus
                    />
                  </div>
                </div>

                <Button
                  className="h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
                  onClick={onResetPassword}
                  disabled={loading || !email}
                >
                  {loading
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : <><Mail className="h-4 w-4" /> Send Reset Email <ArrowRight className="h-4 w-4" /></>
                  }
                </Button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-muted-foreground">remember your password?</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <Button
                  variant="outline"
                  className="h-11 gap-2"
                  onClick={() => { window.location.href = '/login' }}
                >
                  <ArrowLeft className="h-4 w-4" /> Return to Login
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Check your email</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      We sent a reset link to
                    </p>
                    <p className="text-sm font-semibold text-sky-600 mt-0.5">{email}</p>
                  </div>
                  <div className="px-4 py-3 bg-amber-50 rounded-xl text-amber-700 text-xs text-left w-full">
                    Didn't receive it? Check your spam folder or try again in a few minutes.
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="h-11 gap-2"
                  onClick={() => { window.location.href = '/login' }}
                >
                  <ArrowLeft className="h-4 w-4" /> Return to Login
                </Button>

                <button
                  className="text-xs text-sky-500 hover:underline text-center"
                  onClick={() => { setSent(false) }}
                >
                  Try a different email
                </button>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our{' '}
          <a href="/docs/terms-and-conditions" className="text-sky-500 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="/docs/privacy-policy" className="text-sky-500 hover:underline">Privacy Policy</a>
        </p>

      </div>
    </div>
  )
}

export default ForgotPassword
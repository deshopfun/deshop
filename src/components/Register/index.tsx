import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IsValidEmail } from '@/utils/verify'
import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import RegisterDialog from '@/components/Dialog/RegisterDialog'
import { SiteLogo } from '@/components/Logo/SiteLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, ArrowRight, Loader2, ShieldCheck, Zap, Globe } from 'lucide-react'

const features = [
  { icon: Globe, title: 'Decentralized', desc: 'No third-party constraints, fully open platform' },
  { icon: Zap, title: 'Free Trading', desc: 'List and sell products with zero platform fees' },
  {
    icon: ShieldCheck,
    title: 'Crypto Payments',
    desc: 'Receive payments directly in cryptocurrency',
  },
]

const Register = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state)
  const { getIsLogin } = useUserPresistStore((state) => state)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.email) setEmail(String(router.query.email))
  }, [router.isReady, router.query])

  useEffect(() => {
    if (getIsLogin()) window.location.href = '/'
  }, [])

  const onRegister = async () => {
    if (!email || !IsValidEmail(email)) return showError('Please enter a valid email')
    setLoading(true)
    try {
      const response: any = await axios.post(Http.register, { email })
      if (response.result) {
        setOpen(true)
      } else {
        showError(response.message)
      }
    } catch (e) {
      showError('Network error. Please try again later.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onRegister()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SiteLogo />
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                Trade freely,
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                  earn everything.
                </span>
              </h1>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Deshop is a decentralized digital exchange platform where anyone can list products,
                anyone can purchase products, with no third-party constraints.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="w-full shadow-lg border-0 rounded-2xl">
            <CardContent className="p-8 flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold">Create account</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Start selling in minutes, completely free
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
                    onKeyDown={handleKeyDown}
                    placeholder="you@example.com"
                    className="pl-9 h-11"
                    autoFocus
                  />
                </div>
              </div>

              <Button
                className="h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
                onClick={onRegister}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-muted-foreground">already have an account?</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <Button
                variant="outline"
                className="h-11 font-medium"
                onClick={() => {
                  window.location.href = '/login'
                }}
              >
                Log in
              </Button>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our{' '}
            <a href="/docs/terms-and-conditions" className="text-sky-500 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/docs/privacy-policy" className="text-sky-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <RegisterDialog openDialog={open} setOpenDialog={setOpen} email={email} />
    </div>
  )
}

export default Register

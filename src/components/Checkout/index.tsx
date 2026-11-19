import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader2 } from 'lucide-react'

const Checkout = () => {
  const router = useRouter()

  useEffect(() => {
    void router.replace('/cart')
  }, [router])

  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">Redirecting to cart…</span>
    </div>
  )
}

export default Checkout

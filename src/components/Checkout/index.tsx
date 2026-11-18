import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

const Checkout = () => {
  useEffect(() => {
    window.location.replace('/cart')
  }, [])

  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">Redirecting to cart…</span>
    </div>
  )
}

export default Checkout

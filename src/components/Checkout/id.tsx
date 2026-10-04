// import { CartLineType, useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
// import { useRouter } from 'next/router'
// import axios from '@/utils/http/axios'
// import { Http } from '@/utils/http/http'
// import { useEffect, useState } from 'react'
// import { CURRENCYS } from '@/packages/constants/currency'
// import Decimal from 'decimal.js'
// import { AlertCircle, Loader2 } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { GetAbosolutePathByRelative } from '@/utils/image'
// import { CartSkuInfo } from '@/utils/types'

// type MergedLine = CartLineType & {
//   sku?: CartSkuInfo
//   isUnavailable: boolean
//   exceedsStock: boolean
// }

// const CheckoutDetails = () => {
//   const router = useRouter()
//   const id = typeof router.query.id === 'string' ? router.query.id : ''

//   const [lines, setLines] = useState<MergedLine[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)
//   const [payLoading, setPayLoading] = useState(false)

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((s) => s)
//   const { getIsLogin } = useUserPresistStore((s) => s)
//   const { getCart, setCart } = useCartPresistStore((s) => s)

//   const showError = (msg: string) => {
//     setSnackSeverity('error')
//     setSnackMessage(msg)
//     setSnackOpen(true)
//   }

//   const fetchAndMerge = async (): Promise<MergedLine[]> => {
//     const cart = getCart()
//     const group = cart.find((c) => c.uuid === id)
//     if (!group || group.variant.length === 0) return []

//     const items = group.variant.map((v) => ({ product_id: v.productId, option: v.option }))
//     const res: any = await axios.post(Http.product_variant_by_option_list, { items })
//     if (!res.result) throw new Error(res.message || 'Failed to load cart data')

//     const map: Record<string, CartSkuInfo> = {}
//     res.data.forEach((sku: CartSkuInfo) => {
//       map[`${sku.product_id}|${sku.option}`] = sku
//     })

//     return group.variant.map((v) => {
//       const sku = map[`${v.productId}|${v.option}`]
//       const isUnavailable = !sku || sku.product_status !== 'active'
//       const exceedsStock = !!sku && v.quantity > sku.inventory_quantity
//       return { ...v, sku, isUnavailable, exceedsStock }
//     })
//   }

//   useEffect(() => {
//     if (!router.isReady || !id) return
//     setLoading(true)
//     setError(false)
//     fetchAndMerge()
//       .then(setLines)
//       .catch(() => setError(true))
//       .finally(() => setLoading(false))
//   }, [router.isReady, id])

//   const currency = lines.find((l) => l.sku)?.sku?.currency ?? ''
//   const currencyCode = CURRENCYS.find((c) => c.name === currency)?.code ?? ''
//   const fmt = (val: string | number) => `${currencyCode}${val}`

//   const subTotal = lines.reduce((sum, l) => {
//     if (!l.sku || l.isUnavailable) return sum
//     return sum.plus(new Decimal(l.sku.price).times(l.quantity))
//   }, new Decimal(0))

//   const tax = lines.reduce((sum, l) => {
//     if (!l.sku || l.isUnavailable || !l.sku.taxable) return sum
//     return sum.plus(new Decimal(l.sku.tax).times(l.quantity))
//   }, new Decimal(0))

//   const tip = lines.reduce((sum, l) => {
//     if (!l.sku || l.isUnavailable) return sum
//     return sum.plus(new Decimal(l.sku.tip || '0').times(l.quantity))
//   }, new Decimal(0))

//   const discount = lines.reduce((sum, l) => {
//     if (!l.sku || l.isUnavailable) return sum
//     return sum.plus(new Decimal(l.sku.discounts || '0').times(l.quantity))
//   }, new Decimal(0))

//   const total = subTotal.plus(tax).plus(tip).minus(discount)

//   const hasBlockingIssues = lines.some((l) => l.isUnavailable || l.exceedsStock)
//   const isVirtualOrder = lines.every((l) => l.sku?.is_virtual)

//   const onClickPayNow = async () => {
//     if (!getIsLogin?.()) return showError('Please login first')
//     if (lines.length === 0) return showError('Cart is empty')

//     setPayLoading(true)
//     try {
//       const fresh = await fetchAndMerge()
//       setLines(fresh)
//       if (fresh.some((l) => l.isUnavailable || l.exceedsStock)) {
//         showError('Some items changed. Please review your order before paying.')
//         return
//       }

//       const items = fresh.map((l) => ({
//         product_id: l.productId,
//         slug: l.sku!.slug,
//         option: l.option,
//         quantity: l.quantity,
//       }))

//       const response: any = await axios.post(Http.order, {
//         seller_uuid: id,
//         items,
//         landing_site: window.location.origin,
//       })

//       if (response.result && response.data.order_id) {
//         setCart(getCart().filter((c) => c.uuid !== id))
//         window.location.href = `/payment/${response.data.order_id}`
//       } else {
//         showError(response.message || 'Payment failed')
//       }
//     } catch {
//       showError('Network error. Please try again later.')
//     } finally {
//       setPayLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-32">
//         <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
//       </div>
//     )
//   }

//   if (error || lines.length === 0) {
//     return (
//       <div className="container mx-auto py-20 flex flex-col items-center gap-4 text-center">
//         <p className="font-semibold text-gray-700">No order found</p>
//         <Button variant="outline" onClick={() => (window.location.href = '/cart')}>
//           Back to Cart
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       {hasBlockingIssues && (
//         <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl mb-6 text-sm">
//           <AlertCircle className="h-4 w-4 shrink-0" />
//           Some items are out of stock or no longer available. Please
//           <a href="/cart" className="underline ml-1">
//             update your cart
//           </a>
//           .
//         </div>
//       )}

//       <Card className="border-0 shadow-sm">
//         <CardContent className="p-6 flex flex-col gap-5">
//           <div className="flex flex-col gap-4">
//             {lines.map((line) => (
//               <div key={`${line.productId}-${line.option}`} className="flex gap-3">
//                 <img
//                   src={
//                     GetAbosolutePathByRelative(line.sku?.image) ??
//                     GetAbosolutePathByRelative(line.snapshotImage)
//                   }
//                   className="h-16 w-16 object-cover rounded-xl border"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium line-clamp-2">
//                     {line.sku?.title ?? line.snapshotTitle}
//                   </p>
//                   <p className="text-xs text-muted-foreground">{line.option}</p>
//                   {line.isUnavailable && (
//                     <p className="text-xs text-red-500 font-medium">No longer available</p>
//                   )}
//                   {!line.isUnavailable && line.exceedsStock && (
//                     <p className="text-xs text-red-500 font-medium">
//                       Only {line.sku?.inventory_quantity} left
//                     </p>
//                   )}
//                 </div>
//                 <p className="text-sm font-semibold shrink-0">
//                   {line.sku && new Decimal(line.sku.price).times(line.quantity).toString()}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col gap-2 border-t pt-4 text-sm">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Subtotal</span>
//               <span>{fmt(subTotal.toString())}</span>
//             </div>
//             {tax.gt(0) && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Tax</span>
//                 <span>{fmt(tax.toString())}</span>
//               </div>
//             )}
//             {tip.gt(0) && (
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Tip</span>
//                 <span>{fmt(tip.toString())}</span>
//               </div>
//             )}
//             {discount.gt(0) && (
//               <div className="flex justify-between text-green-600">
//                 <span>Discount</span>
//                 <span>-{fmt(discount.toString())}</span>
//               </div>
//             )}
//             <div className="flex justify-between font-bold text-base border-t mt-1 pt-2">
//               <span>Total</span>
//               <span>{fmt(total.toString())}</span>
//             </div>
//           </div>

//           <Button
//             className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
//             onClick={onClickPayNow}
//             disabled={payLoading || hasBlockingIssues}
//           >
//             {payLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Pay Now'}
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default CheckoutDetails

import { CartLineType, useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useEffect, useState } from 'react'
import { CURRENCYS } from '@/packages/constants/currency'
import Decimal from 'decimal.js'
import {
  AlertCircle,
  Loader2,
  Package,
  ShoppingBag,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { CartSkuInfo } from '@/utils/types'
import { cn } from '@/lib/utils' // 如果没有 cn 工具，可自行实现或删除相关 className

type MergedLine = CartLineType & {
  sku?: CartSkuInfo
  isUnavailable: boolean
  exceedsStock: boolean
}

const CheckoutDetails = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const [lines, setLines] = useState<MergedLine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [payLoading, setPayLoading] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((s) => s)
  const { getIsLogin } = useUserPresistStore((s) => s)
  const { getCart, setCart } = useCartPresistStore((s) => s)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const fetchAndMerge = async (): Promise<MergedLine[]> => {
    const cart = getCart()
    const group = cart.find((c) => c.uuid === id)
    if (!group || group.variant.length === 0) return []

    const items = group.variant.map((v) => ({ product_id: v.productId, option: v.option }))
    const res: any = await axios.post(Http.product_variant_by_option_list, { items })
    if (!res.result) throw new Error(res.message || 'Failed to load cart data')

    const map: Record<string, CartSkuInfo> = {}
    res.data.forEach((sku: CartSkuInfo) => {
      map[`${sku.product_id}|${sku.option}`] = sku
    })

    return group.variant.map((v) => {
      const sku = map[`${v.productId}|${v.option}`]
      const isUnavailable = !sku || sku.product_status !== 'active'
      const exceedsStock = !!sku && v.quantity > sku.inventory_quantity
      return { ...v, sku, isUnavailable, exceedsStock }
    })
  }

  useEffect(() => {
    if (!router.isReady || !id) return
    setLoading(true)
    setError(false)
    fetchAndMerge()
      .then(setLines)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [router.isReady, id])

  const currency = lines.find((l) => l.sku)?.sku?.currency ?? ''
  const currencyCode = CURRENCYS.find((c) => c.name === currency)?.code ?? ''
  const fmt = (val: string | number) => `${currencyCode}${val}`

  const subTotal = lines.reduce((sum, l) => {
    if (!l.sku || l.isUnavailable) return sum
    return sum.plus(new Decimal(l.sku.price).times(l.quantity))
  }, new Decimal(0))

  const tax = lines.reduce((sum, l) => {
    if (!l.sku || l.isUnavailable || !l.sku.taxable) return sum
    return sum.plus(new Decimal(l.sku.tax).times(l.quantity))
  }, new Decimal(0))

  const tip = lines.reduce((sum, l) => {
    if (!l.sku || l.isUnavailable) return sum
    return sum.plus(new Decimal(l.sku.tip || '0').times(l.quantity))
  }, new Decimal(0))

  const discount = lines.reduce((sum, l) => {
    if (!l.sku || l.isUnavailable) return sum
    return sum.plus(new Decimal(l.sku.discounts || '0').times(l.quantity))
  }, new Decimal(0))

  const total = subTotal.plus(tax).plus(tip).minus(discount)

  const hasBlockingIssues = lines.some((l) => l.isUnavailable || l.exceedsStock)
  const isVirtualOrder = lines.every((l) => l.sku?.is_virtual)
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0)

  const onClickPayNow = async () => {
    if (!getIsLogin?.()) return showError('Please login first')
    if (lines.length === 0) return showError('Cart is empty')

    setPayLoading(true)
    try {
      const fresh = await fetchAndMerge()
      setLines(fresh)
      if (fresh.some((l) => l.isUnavailable || l.exceedsStock)) {
        showError('Some items changed. Please review your order before paying.')
        return
      }

      const items = fresh.map((l) => ({
        product_id: l.productId,
        slug: l.sku!.slug,
        option: l.option,
        quantity: l.quantity,
      }))

      const response: any = await axios.post(Http.order, {
        seller_uuid: id,
        items,
        landing_site: window.location.origin,
      })

      if (response.result && response.data.order_id) {
        setCart(getCart().filter((c) => c.uuid !== id))
        window.location.href = `/payment/${response.data.order_id}`
      } else {
        showError(response.message || 'Payment failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setPayLoading(false)
    }
  }

  // ---------- Loading ----------
  if (loading) {
    return (
      <div className="container mx-auto max-w-2xl py-10 px-4">
        <div className="space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-muted rounded-lg" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-20 w-20 bg-muted rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-1/2 bg-muted rounded" />
                  <div className="h-3 w-1/3 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="h-12 bg-muted rounded-xl" />
        </div>
      </div>
    )
  }

  // ---------- Empty / Error ----------
  if (error || lines.length === 0) {
    return (
      <div className="container mx-auto max-w-md py-24 px-4 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-9 w-9 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">No order found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This checkout session is empty or has expired.
        </p>
        <Button
          variant="outline"
          className="mt-8 gap-2"
          onClick={() => (window.location.href = '/cart')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-2xl py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => (window.location.href = '/cart')}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to cart
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {itemCount} item{itemCount > 1 ? 's' : ''} · Review your order before payment
          </p>
        </div>

        {/* Blocking Alert */}
        {hasBlockingIssues && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-medium">Some items need attention</p>
              <p className="mt-0.5 text-red-600/90">
                Please{' '}
                <a href="/cart" className="underline underline-offset-2 font-medium">
                  update your cart
                </a>{' '}
                before continuing.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Items Card */}
          <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Package className="h-4 w-4 text-muted-foreground" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y divide-border/60">
                {lines.map((line) => {
                  const lineTotal =
                    line.sku && !line.isUnavailable
                      ? new Decimal(line.sku.price).times(line.quantity).toString()
                      : null

                  return (
                    <div
                      key={`${line.productId}-${line.option}`}
                      className={cn(
                        'flex gap-4 py-4 first:pt-0 last:pb-0',
                        (line.isUnavailable || line.exceedsStock) && 'opacity-75'
                      )}
                    >
                      {/* Image */}
                      <div className="relative shrink-0">
                        <img
                          src={
                            GetAbosolutePathByRelative(line.sku?.image) ??
                            GetAbosolutePathByRelative(line.snapshotImage) ??
                            '/placeholder.png'
                          }
                          alt={line.sku?.title ?? line.snapshotTitle ?? 'Product'}
                          className="h-20 w-20 rounded-xl border object-cover bg-muted"
                        />
                        {line.isUnavailable && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                            <span className="text-[10px] font-semibold text-white">Unavailable</span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug line-clamp-2">
                          {line.sku?.title ?? line.snapshotTitle}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{line.option}</p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Qty {line.quantity}
                            {line.sku && !line.isUnavailable && (
                              <> · {fmt(line.sku.price)} each</>
                            )}
                          </span>

                          {line.isUnavailable && (
                            <Badge variant="destructive" className="h-5 text-[10px] px-1.5">
                              No longer available
                            </Badge>
                          )}
                          {!line.isUnavailable && line.exceedsStock && (
                            <Badge variant="destructive" className="h-5 text-[10px] px-1.5">
                              Only {line.sku?.inventory_quantity} left
                            </Badge>
                          )}
                          {line.sku?.is_virtual && !line.isUnavailable && (
                            <Badge variant="secondary" className="h-5 text-[10px] px-1.5">
                              Digital
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="shrink-0 text-right">
                        {lineTotal ? (
                          <p className="text-sm font-semibold tabular-nums">{fmt(lineTotal)}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">—</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="border-0 shadow-sm ring-1 ring-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums">{fmt(subTotal.toString())}</span>
              </div>

              {tax.gt(0) && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="tabular-nums">{fmt(tax.toString())}</span>
                </div>
              )}

              {tip.gt(0) && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tip</span>
                  <span className="tabular-nums">{fmt(tip.toString())}</span>
                </div>
              )}

              {discount.gt(0) && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Discount</span>
                  <span className="tabular-nums">−{fmt(discount.toString())}</span>
                </div>
              )}

              <Separator className="my-1" />

              <div className="flex justify-between items-baseline">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold tracking-tight tabular-nums">
                  {fmt(total.toString())}
                </span>
              </div>

              {isVirtualOrder && (
                <p className="text-xs text-muted-foreground pt-1">
                  This is a digital order — no shipping required.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Pay Section */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="h-12 w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-base shadow-md shadow-sky-500/20 transition-all"
              onClick={onClickPayNow}
              disabled={payLoading || hasBlockingIssues}
            >
              {payLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing…
                </>
              ) : (
                <>Pay {fmt(total.toString())}</>
              )}
            </Button>

            {hasBlockingIssues ? (
              <p className="text-center text-xs text-red-500">
                Resolve stock issues before you can pay
              </p>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure payment · Your information is protected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutDetails
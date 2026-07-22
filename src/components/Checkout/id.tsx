import { CartLineType, useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useEffect, useState } from 'react'
import { CURRENCYS } from '@/packages/constants/currency'
import Decimal from 'decimal.js'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GetAbosolutePathByRelative } from '@/utils/image'

type SkuInfo = {
  product_id: number
  option: string
  user_uuid: string
  username: string
  avatar_url: string
  currency: string
  slug: string
  title: string
  image: string
  price: string
  discounts: string
  taxable: number
  tax: string
  tip: string
  weight: string
  weight_unit: string
  is_virtual: number
  inventory_quantity: number
  product_status: number
}

type MergedLine = CartLineType & {
  sku?: SkuInfo
  isUnavailable: boolean
  exceedsStock: boolean
}

const CheckoutDetails = () => {
  const router = useRouter()
  const { id } = router.query

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

    const map: Record<string, SkuInfo> = {}
    res.data.forEach((sku: SkuInfo) => {
      map[`${sku.product_id}|${sku.option}`] = sku
    })

    return group.variant.map((v) => {
      const sku = map[`${v.productId}|${v.option}`]
      const isUnavailable = !sku || sku.product_status !== 1
      const exceedsStock = !!sku && v.quantity > sku.inventory_quantity
      return { ...v, sku, isUnavailable, exceedsStock }
    })
  }

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(false)
    fetchAndMerge()
      .then(setLines)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

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

  const onClickPayNow = async () => {
    if (!getIsLogin()) return showError('Please login first')
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || lines.length === 0) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center gap-4 text-center">
        <p className="font-semibold text-gray-700">No order found</p>
        <Button variant="outline" onClick={() => (window.location.href = '/cart')}>
          Back to Cart
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {hasBlockingIssues && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl mb-6 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Some items are out of stock or no longer available. Please
          <a href="/cart" className="underline ml-1">
            update your cart
          </a>
          .
        </div>
      )}

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            {lines.map((line) => (
              <div key={`${line.productId}-${line.option}`} className="flex gap-3">
                <img
                  src={
                    GetAbosolutePathByRelative(line.sku?.image) ??
                    GetAbosolutePathByRelative(line.snapshotImage)
                  }
                  className="h-16 w-16 object-cover rounded-xl border"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">
                    {line.sku?.title ?? line.snapshotTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">{line.option}</p>
                  {line.isUnavailable && (
                    <p className="text-xs text-red-500 font-medium">No longer available</p>
                  )}
                  {!line.isUnavailable && line.exceedsStock && (
                    <p className="text-xs text-red-500 font-medium">
                      Only {line.sku?.inventory_quantity} left
                    </p>
                  )}
                </div>
                <p className="text-sm font-semibold shrink-0">
                  {line.sku && new Decimal(line.sku.price).times(line.quantity).toString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{fmt(subTotal.toString())}</span>
            </div>
            {tax.gt(0) && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{fmt(tax.toString())}</span>
              </div>
            )}
            {tip.gt(0) && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tip</span>
                <span>{fmt(tip.toString())}</span>
              </div>
            )}
            {discount.gt(0) && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{fmt(discount.toString())}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base border-t mt-1 pt-2">
              <span>Total</span>
              <span>{fmt(total.toString())}</span>
            </div>
          </div>

          <Button
            className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
            onClick={onClickPayNow}
            disabled={payLoading || hasBlockingIssues}
          >
            {payLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Pay Now'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default CheckoutDetails

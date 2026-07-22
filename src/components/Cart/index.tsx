import { useEffect, useMemo, useState } from 'react'
import { CartLineType, useCartPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import { Plus, Minus, Trash2, ShoppingCart, User, AlertCircle, Loader2 } from 'lucide-react'
import Decimal from 'decimal.js'
import { GetAbosolutePathByRelative } from '@/utils/image'

type SkuInfo = {
  product_id: number
  option: string
  user_uuid: string
  username: string
  user_avatar_url: string
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

type MergedGroup = {
  uuid: string
  username: string
  avatarUrl: string
  currency: string
  lines: MergedLine[]
}

const Cart = () => {
  const { getCart, updateQuantity, removeFromCart, resetCart } = useCartPresistStore((s) => s)
  const cart = getCart()

  const [skuMap, setSkuMap] = useState<Record<string, SkuInfo>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchSkuData = async () => {
    const items = cart.flatMap((c) =>
      c.variant.map((v) => ({ product_id: v.productId, option: v.option }))
    )
    if (items.length === 0) {
      setSkuMap({})
      setLoading(false)
      return
    }
    setLoading(true)
    setError(false)
    try {
      const res: any = await axios.post(Http.product_variant_by_option_list, { items })
      if (res.result) {
        const map: Record<string, SkuInfo> = {}
        res.data.forEach((sku: SkuInfo) => {
          map[`${sku.product_id}|${sku.option}`] = sku
        })
        setSkuMap(map)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkuData()
  }, [cart.reduce((n, c) => n + c.variant.length, 0)])

  const mergedGroups: MergedGroup[] = useMemo(() => {
    return cart.map((c) => {
      const lines: MergedLine[] = c.variant.map((v) => {
        const sku = skuMap[`${v.productId}|${v.option}`]
        const isUnavailable = !sku || sku.product_status !== 1
        const exceedsStock = !!sku && v.quantity > sku.inventory_quantity
        return { ...v, sku, isUnavailable, exceedsStock }
      })
      const firstSku = lines.find((l) => l.sku)?.sku
      return {
        uuid: c.uuid,
        username: firstSku?.username ?? '',
        avatarUrl: firstSku?.user_avatar_url ?? '',
        currency: firstSku?.currency ?? '',
        lines,
      }
    })
  }, [cart, skuMap])

  const countGroupTotal = (group: MergedGroup): Decimal => {
    return group.lines.reduce((sum, line) => {
      if (!line.sku || line.isUnavailable) return sum
      const price = new Decimal(line.sku.price || '0')
      return sum.plus(price.times(line.quantity))
    }, new Decimal(0))
  }

  const hasIssues = (group: MergedGroup) =>
    group.lines.some((l) => l.isUnavailable || l.exceedsStock)

  const handleQuantityChange = (uuid: string, line: MergedLine, raw: string) => {
    const digits = raw.replace(/\D/g, '')
    if (digits === '') return
    const num = Number(digits)
    const max = line.sku?.inventory_quantity ?? num
    updateQuantity(uuid, line.productId, line.option, Math.min(max, num))
  }

  const handleQuantityBlur = (uuid: string, line: MergedLine) => {
    const max = line.sku?.inventory_quantity ?? line.quantity
    if (!line.quantity || line.quantity < 1) {
      updateQuantity(uuid, line.productId, line.option, 1)
    } else if (line.quantity > max) {
      updateQuantity(uuid, line.productId, line.option, max)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" />
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        </div>
        {cart.length > 0 && (
          <Button variant="destructive" onClick={resetCart}>
            Clear Cart
          </Button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl mb-6 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Failed to load the latest cart data.
          <button className="underline ml-1" onClick={fetchSkuData}>
            Retry
          </button>
        </div>
      )}

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {mergedGroups.map((group) => (
              <Card key={group.uuid} className="overflow-hidden">
                <CardHeader className="bg-muted/50 pb-4">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:underline"
                    onClick={() => (window.location.href = `/profile/${group.username}`)}
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={GetAbosolutePathByRelative(group.avatarUrl, 'avatar')} />
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{group.username || 'Unknown seller'}</p>
                  </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                  {group.lines.map((line) => (
                    <div key={`${line.productId}-${line.option}`} className="flex gap-5">
                      <img
                        src={
                          GetAbosolutePathByRelative(line.sku?.image) ??
                          GetAbosolutePathByRelative(line.snapshotImage)
                        }
                        alt={line.sku?.title ?? line.snapshotTitle}
                        className={cn(
                          'w-24 h-24 object-cover rounded-lg border',
                          line.isUnavailable && 'opacity-40 grayscale'
                        )}
                        loading="lazy"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <div
                            className={cn(
                              'cursor-pointer hover:underline',
                              line.isUnavailable && 'text-gray-400 pointer-events-none'
                            )}
                            onClick={() =>
                              line.sku && (window.location.href = `/products/${line.sku.slug}`)
                            }
                          >
                            <p className="font-semibold text-lg leading-tight">
                              {line.sku?.title ?? line.snapshotTitle ?? 'Unknown product'}
                            </p>
                          </div>
                          {line.sku && !line.isUnavailable && (
                            <p className="font-bold text-lg shrink-0">
                              {CURRENCYS.find((c) => c.name === line.sku!.currency)?.code}
                              {line.sku.price}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {line.option.split(',').map((opt, i) => (
                            <Badge key={i} variant="secondary">
                              {opt.trim()}
                            </Badge>
                          ))}
                        </div>

                        {line.isUnavailable && (
                          <p className="text-xs text-red-500 mt-1.5 font-medium">
                            This item is no longer available.
                          </p>
                        )}
                        {!line.isUnavailable && line.exceedsStock && (
                          <p className="text-xs text-red-500 mt-1.5 font-medium">
                            Only {line.sku?.inventory_quantity} left in stock. Please adjust the
                            quantity.
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              disabled={line.isUnavailable || line.quantity <= 1}
                              onClick={() =>
                                updateQuantity(
                                  group.uuid,
                                  line.productId,
                                  line.option,
                                  Math.max(1, line.quantity - 1)
                                )
                              }
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            <Input
                              className="w-16 text-center"
                              inputMode="numeric"
                              disabled={line.isUnavailable}
                              value={line.quantity}
                              onChange={(e) =>
                                handleQuantityChange(group.uuid, line, e.target.value)
                              }
                              onBlur={() => handleQuantityBlur(group.uuid, line)}
                            />

                            <Button
                              variant="outline"
                              size="icon"
                              disabled={
                                line.isUnavailable ||
                                (line.sku && line.quantity >= line.sku.inventory_quantity)
                              }
                              onClick={() =>
                                updateQuantity(
                                  group.uuid,
                                  line.productId,
                                  line.option,
                                  Math.min(
                                    line.sku?.inventory_quantity ?? line.quantity + 1,
                                    line.quantity + 1
                                  )
                                )
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeFromCart(group.uuid, line.productId, line.option)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Subtotal</p>
                      <p className="text-xl font-bold">
                        {CURRENCYS.find((c) => c.name === group.currency)?.code}
                        {countGroupTotal(group).toString()}
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={hasIssues(group)}
                    onClick={() => (window.location.href = `/checkout/${group.uuid}`)}
                  >
                    {hasIssues(group) ? 'Resolve issues above to continue' : 'Continue to Checkout'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-4">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mergedGroups.map((group) => (
                  <div key={group.uuid} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{group.username || 'Seller'}</span>
                    <span className="font-semibold">
                      {CURRENCYS.find((c) => c.name === group.currency)?.code}
                      {countGroupTotal(group).toString()}
                    </span>
                  </div>
                ))}
                <Separator />
                <p className="text-sm text-muted-foreground text-center">
                  Each seller is checked out separately. Shipping, tax, tip and discounts will be
                  finalized at checkout.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="py-20">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-20 h-20 text-muted-foreground mb-6" />
            <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground max-w-sm">
              Add products while you shop, so they&apos;ll be ready for checkout later.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Cart

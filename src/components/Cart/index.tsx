import { CartType, useCartPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

import { Plus, Minus, Trash2, ShoppingCart, User } from 'lucide-react'
import Decimal from 'decimal.js'

const Cart = () => {
  const [total, setTotal] = useState('0')

  const { getCart, setCart, resetCart } = useCartPresistStore((state) => state)

  useEffect(() => {
    countTotal()
  }, [getCart])

  const countItemTotal = (item: CartType): Decimal => {
    const itemTotal = item.variant.reduce((sum, value) => {
      const price = new Decimal(value.price || '0')
      return sum.plus(price.times(value.quantity))
    }, new Decimal(0))

    return itemTotal
  }

  const countTotal = () => {
    const cart = getCart()
    if (!cart || cart.length === 0) {
      setTotal('0')
      return
    }

    const total = cart.reduce((acc, cartItem) => {
      const itemTotal = countItemTotal(cartItem)
      return acc.plus(itemTotal)
    }, new Decimal(0))

    setTotal(total.toString())
  }

  const onClickRemove = (uuid: string, productId: number, option: string) => {
    const cart = getCart()
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.uuid === uuid
          ? {
              ...cartItem,
              variant: cartItem.variant.filter(
                (v) => !(v.productId === productId && v.option === option)
              ),
            }
          : cartItem
      )
      .filter((cartItem) => cartItem.variant.length > 0)

    setCart(updatedCart)

    countTotal()
  }

  const onClickSub = (uuid: string, productId: number, option: string) => {
    const cart = getCart()
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.uuid === uuid
          ? {
              ...cartItem,
              variant: cartItem.variant
                .map((v) =>
                  v.productId === productId && v.option === option
                    ? { ...v, quantity: Math.max(1, v.quantity - 1) }
                    : v
                )
                .filter((v) => v.quantity > 0),
            }
          : cartItem
      )
      .filter((cartItem) => cartItem.variant.length > 0)

    setCart(updatedCart)

    countTotal()
  }

  const onClickAdd = (uuid: string, productId: number, option: string) => {
    const cart = getCart()
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.uuid === uuid
          ? {
              ...cartItem,
              variant: cartItem.variant.map((v) =>
                v.productId === productId && v.option === option
                  ? { ...v, quantity: v.quantity + 1 }
                  : v
              ),
            }
          : cartItem
      )
      .filter((cartItem) => cartItem.variant.length > 0)

    setCart(updatedCart)

    countTotal()
  }

  const cartItems = getCart() || []

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" />
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        </div>
        {cartItems.length > 0 && (
          <Button variant="destructive" onClick={resetCart}>
            Clear Cart
          </Button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/50 pb-4">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:underline"
                    onClick={() => (window.location.href = `/profile/${item.username}`)}
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={item.avatarUrl} />
                      <AvatarFallback>
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{item.username}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                  {item.variant.map((vitem, vindex) => (
                    <div key={vindex} className="flex gap-5">
                      <img
                        src={vitem.image}
                        alt={vitem.title}
                        className="w-24 h-24 object-cover rounded-lg border"
                        loading="lazy"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div
                            className="cursor-pointer hover:underline"
                            onClick={() =>
                              (window.location.href = `/products/${vitem.slug || vitem.productId}`)
                            }
                          >
                            <p className="font-semibold text-lg leading-tight">{vitem.title}</p>
                          </div>
                          <p className="font-bold text-lg">
                            {CURRENCYS.find((c) => c.name === item.currency)?.code}
                            {vitem.price}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {vitem.option.split(',').map((opt, i) => (
                            <Badge key={i} variant="secondary">
                              {opt.trim()}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            {/* <div className="flex items-center border rounded-xl overflow-hidden">
                              <button
                                className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
                                disabled={vitem.quantity <= 1}
                                onClick={() => onClickSub(item.uuid, vitem.productId, vitem.option)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>

                              <input
                                type="text"
                                inputMode="numeric"
                                value={vitem.quantity}
                                className="w-12 text-center text-sm font-semibold bg-transparent outline-none border-x [appearance:textfield]"
                                onChange={(e) => {
                                  const raw = e.target.value.replace(/\D/g, '')
                                  if (raw === '') {
                                    setQuantity('' as unknown as number)
                                    return
                                  }
                                  const num = Number(raw)
                                  setQuantity(
                                    Math.min(currentProductVariant.inventory_quantity, num)
                                  )
                                }}
                                onBlur={() => {
                                  setQuantity((q) => {
                                    const num = Number(q)
                                    if (!num || num < 1) return 1
                                    return Math.min(currentProductVariant.inventory_quantity, num)
                                  })
                                }}
                              />

                              <button
                                className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
                                disabled={quantity >= currentProductVariant.inventory_quantity}
                                onClick={() =>
                                  setQuantity((q) =>
                                    Math.min(currentProductVariant.inventory_quantity, q + 1)
                                  )
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              className="text-xs text-sky-500 hover:underline"
                              onClick={() => setQuantity(1)}
                            >
                              Min
                            </button>
                            <button
                              className="text-xs text-sky-500 hover:underline"
                              onClick={() => setQuantity(currentProductVariant.inventory_quantity)}
                            >
                              Max ({currentProductVariant.inventory_quantity})
                            </button> */}
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onClickSub(item.uuid, vitem.productId, vitem.option)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            <Input className="w-16 text-center" value={vitem.quantity} readOnly />

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onClickAdd(item.uuid, vitem.productId, vitem.option)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => onClickRemove(item.uuid, vitem.productId, vitem.option)}
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
                        {CURRENCYS.find((c) => c.name === item.currency)?.code}
                        {countItemTotal(item).toString()}
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => (window.location.href = `/checkout/${item.uuid}`)}
                  >
                    Continue to Checkout
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
                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span className="font-bold">
                    {CURRENCYS.find((c) => c.name === (getCart()[0]?.currency || ''))?.code}
                    {total}
                  </span>
                </div>

                <Separator />

                <p className="text-sm text-muted-foreground text-center">
                  Shipping, tax, tip and discounts will be calculated at checkout.
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

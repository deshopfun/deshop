import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useEffect, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/navigation'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/scrollbar'
import ProductRatingsDialog from '@/components/Dialog/ProductRatingsDialog'
import RefundPolicyDialog from '@/components/Dialog/RefundPolicyDialog'
import { COLLECT_TYPE, PRODUCT_TAB_DATAS, PRODUCT_TYPE } from '@/packages/constants'
import Product from './Product'
import ProductVariant from './Variant'
import ProductRating from './Rating'
import NowTrendingCard from '@/components/Card/NowTrendingCard'
import { CURRENCYS } from '@/packages/constants/currency'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { ProductType, ProductVariantType } from '@/utils/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  Heart,
  MoreHorizontal,
  Mail,
  Flag,
  Star,
  ShoppingCart,
  Zap,
  Minus,
  Plus,
  ChevronRight,
  Link2,
  RefreshCcw,
  Tag,
  Coins,
  Receipt,
  AlertCircle,
  PackageX,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Decimal from 'decimal.js'

const RatingBar = ({ star, ratings }: { star: number; ratings: any[] }) => {
  const count = ratings.filter((r) => r.number === star).length
  const percent = ratings.length > 0 ? (count / ratings.length) * 100 : 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-3">{star}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs text-muted-foreground w-6">{count}</span>
    </div>
  )
}

const PriceRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-dashed border-gray-100 last:border-0">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" />
      {label}
    </div>
    <span className="text-sm font-semibold">{value}</span>
  </div>
)

const ProductDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState<ProductType>()
  const [openRatingsDialog, setOpenRatingsDialog] = useState(false)
  const [openRefundPolicy, setOpenRefundPolicy] = useState(false)
  const [tabValue, setTabValue] = useState('0')
  const [optionOneValue, setOptionOneValue] = useState('')
  const [optionTwoValue, setOptionTwoValue] = useState('')
  const [optionThreeValue, setOptionThreeValue] = useState('')
  const [currentProductVariant, setCurrentProductVariant] = useState<ProductVariantType>()
  const [isSelectOption, setIsSelectOption] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)
  const { getUuid, getIsLogin } = useUserPresistStore((state) => state)
  const { getCart, setCart } = useCartPresistStore((state) => state)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }
  const showSuccess = (msg: string) => {
    setSnackSeverity('success')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const currencyCode = CURRENCYS.find((c) => c.name === product?.currency)?.code ?? ''

  const init = async (id: any) => {
    try {
      if (!id) return showError('Incorrect product id')
      const endpoint = getIsLogin() ? Http.product_by_login_id : Http.product_by_id
      const isNumericId = typeof id === 'number' || /^\d+$/.test(String(id))
      const response: any = await axios.get(endpoint, {
        params: isNumericId ? { product_id: id } : { slug: id },
      })
      if (response.result) {
        setProduct({
          ...response.data,
          render_body_html: DOMPurify.sanitize(await marked(response.data.body_html)),
        })
      } else {
        showError(response.message)
      }
    } catch (e) {
      showError('Network error. Please try again later.')
    }
  }

  const initOptionValue = async (one: string, two: string, three: string) => {
    if (!product) return
    let option = ''
    switch (product.options.length) {
      case 3:
        if (!one || !two || !three) return
        option = `${one},${two},${three}`
        break
      case 2:
        if (!one || !two) return
        option = `${one},${two}`
        break
      case 1:
        if (!one) return
        option = one
        break
      default:
        return
    }
    setIsSelectOption(true)
    try {
      const response: any = await axios.get(Http.product_variant_by_option, {
        params: { product_id: product.product_id, option },
      })
      if (response.result) {
        setCurrentProductVariant({
          ...response.data,
          inventory_policy: response.data.inventory_policy === 1,
          taxable: response.data.taxable === 1,
          is_virtual: response.data.is_virtual === 1,
        })
      } else {
        setCurrentProductVariant(undefined)
        setQuantity(1)
      }
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const addToCart = () => {
    if (!product) return
    let option = ''
    switch (product.options.length) {
      case 3:
        if (!optionOneValue || !optionTwoValue || !optionThreeValue) return
        option = `${optionOneValue},${optionTwoValue},${optionThreeValue}`
        break
      case 2:
        if (!optionOneValue || !optionTwoValue) return
        option = `${optionOneValue},${optionTwoValue}`
        break
      case 1:
        if (!optionOneValue) return
        option = optionOneValue
        break
      default:
        return
    }
    const cart = getCart()
    const newVariant: any = {
      productId: product.product_id,
      slug: product.slug,
      title: product.title,
      image: String(currentProductVariant?.image ?? ''),
      option,
      price: String(currentProductVariant?.price ?? ''),
      discounts: String(currentProductVariant?.discounts ?? ''),
      taxable: currentProductVariant?.taxable,
      tax: String(currentProductVariant?.tax ?? ''),
      tip: String(currentProductVariant?.tip ?? ''),
      weight: String(currentProductVariant?.weight ?? ''),
      weightUnit: String(currentProductVariant?.weight_unit ?? ''),
      quantity,
      isVirtual: currentProductVariant?.is_virtual,
    }
    const cartItem = cart.find((i) => i.uuid === product.user_uuid)
    if (cartItem) {
      const exists = cartItem.variant.find(
        (v) => v.productId === product.product_id && v.option === option
      )
      setCart(
        cart.map((i) =>
          i.uuid === product.user_uuid
            ? {
                ...i,
                variant: exists
                  ? i.variant.map((v) =>
                      v.productId === product.product_id && v.option === option
                        ? { ...v, quantity: v.quantity + quantity }
                        : v
                    )
                  : [...i.variant, newVariant],
              }
            : i
        )
      )
    } else {
      setCart([
        ...cart,
        {
          uuid: product.user_uuid,
          avatarUrl: product.user_avatar_url,
          username: product.username,
          currency: product.currency,
          variant: [newVariant],
        },
      ])
    }
  }

  const onClickAddToCart = () => {
    if (!product || quantity <= 0) return showError('At least one quantity is required.')
    if (getUuid() === product.user_uuid) return showError('Cannot buy your own products.')
    addToCart()
    showSuccess('Added to cart successfully')
  }

  const onClickBuyNow = () => {
    if (!product || quantity <= 0) return showError('At least one quantity is required.')
    if (getUuid() === product.user_uuid) return showError('Cannot buy your own products.')
    addToCart()
    window.location.href = `/checkout/${product.user_uuid}`
  }

  const onClickFavorite = async () => {
    if (!product?.product_id) return showError('Incorrect product id')
    try {
      const response: any = await axios.put(Http.collect, {
        collect_type: COLLECT_TYPE.PRODUCT,
        bind_id: product.product_id,
      })
      if (response.result) {
        await init(id)
      } else {
        showError(response.message)
      }
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const avgRating = product?.ratings?.length
    ? product.ratings
        .reduce((s, r) => s.plus(new Decimal(r.number || 0)), new Decimal(0))
        .dividedBy(product.ratings.length)
        .toString()
    : '0'

  useEffect(() => {
    if (id) init(id)
  }, [id])
  useEffect(() => {
    initOptionValue(optionOneValue, optionTwoValue, optionThreeValue)
  }, [optionOneValue, optionTwoValue, optionThreeValue])

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )

  if (product.product_status !== 1 && getUuid() !== product.user_uuid)
    return (
      <div className="container mx-auto py-12 flex flex-col items-center gap-3 text-center">
        <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground text-sm">
          This product does not exist or has been removed.
        </p>
        <Button
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Back to Home
        </Button>
      </div>
    )

  return (
    <div className="container mx-auto py-6 px-4 flex flex-col gap-8">
      {product.product_status === 2 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Archived</strong> — This product is read-only and not editable.
          </span>
        </div>
      )}
      {product.product_status === 3 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 text-amber-700 rounded-xl text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Draft</strong> — Edit this product and publish it to the market.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden border-0 shadow-sm">
            {isSelectOption && currentProductVariant?.image ? (
              <div className="flex justify-center items-center p-8 bg-gray-50 min-h-72">
                <img
                  src={currentProductVariant.image}
                  alt="variant"
                  className="max-h-64 object-contain rounded-xl"
                />
              </div>
            ) : (
              <Swiper navigation={true} modules={[Navigation]} className="min-h-72">
                {product.images.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex justify-center items-center p-8 bg-gray-50 min-h-72">
                      <img
                        src={item.src}
                        alt="product"
                        className="max-h-64 object-contain rounded-xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="flex gap-2 p-3 border-t">
              {product.images.map((item, i) => (
                <img
                  key={i}
                  src={item.src}
                  alt="thumb"
                  className="h-14 w-14 object-cover rounded-lg border shrink-0 cursor-pointer hover:border-sky-400 transition-colors"
                />
              ))}
            </div>
          </Card>

          {product.ratings && product.ratings.length > 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <h3 className="font-semibold text-base">Ratings & Reviews</h3>

                <div className="flex items-center gap-4">
                  <div className="text-5xl font-extrabold text-gray-900">{avgRating}</div>
                  <div className="flex flex-col gap-1 flex-1">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <RatingBar key={s} star={s} ratings={product.ratings} />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setOpenRatingsDialog(true)}
                  className="text-sm text-sky-500 hover:underline text-left"
                >
                  View all {product.ratings.length} reviews
                </button>

                <div className="grid grid-cols-2 gap-4">
                  {product.ratings.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-xl">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              'h-3.5 w-3.5',
                              s <= item.number
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-200 fill-gray-200'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.username} · {new Date(item.create_time).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.product_option.split(',').join(' / ')}
                      </p>
                      {item.image && (
                        <img
                          src={item.image}
                          alt="review"
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                      )}
                      <p className="text-sm">{item.body}</p>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setOpenRatingsDialog(true)}
                >
                  Read more reviews
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-12 flex flex-col items-center gap-2 text-center">
                <Star className="h-8 w-8 text-gray-200" />
                <p className="font-medium text-sm">No ratings yet</p>
                <p className="text-xs text-muted-foreground">
                  Reviews will appear here after purchases.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              onClick={() => {
                window.location.href = `/profile/${product.username}`
              }}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={product.user_avatar_url || '/images/default_avatar.png'} />
                <AvatarFallback>{product.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold">{product.username}</span>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = `mailto:${product.user_email}`
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact {product.username}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={() => {
                    window.location.href = `/report/products/${product.product_id}`
                  }}
                >
                  <Flag className="mr-2 h-4 w-4" /> Report product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              {product.ratings && product.ratings.length > 0 && (
                <button
                  className="flex items-center gap-1"
                  onClick={() => setOpenRatingsDialog(true)}
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={cn(
                        'h-3.5 w-3.5',
                        s <= Math.round(Number(avgRating))
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-200 fill-gray-200'
                      )}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {product.ratings.length} ratings
                  </span>
                </button>
              )}
            </div>
            {getIsLogin() && (
              <button
                onClick={onClickFavorite}
                className={cn(
                  'h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-200 shrink-0',
                  product.collect_status === 1
                    ? 'bg-sky-500 border-sky-500 text-white'
                    : 'border-gray-200 text-gray-400 hover:border-sky-300 hover:text-sky-500'
                )}
              >
                <Heart className="h-5 w-5" />
              </button>
            )}
          </div>

          {currentProductVariant && isSelectOption && (
            <Card className="border-0 bg-gray-50">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="text-3xl font-extrabold text-gray-900 mb-2">
                  {currencyCode}
                  {currentProductVariant.price}
                </div>
                <PriceRow
                  icon={Receipt}
                  label="TAX"
                  value={
                    currentProductVariant.taxable
                      ? `${currencyCode}${new Decimal(currentProductVariant.tax).times(quantity)}`
                      : 'Tax free'
                  }
                />
                <PriceRow
                  icon={Coins}
                  label="TIP"
                  value={
                    Number(currentProductVariant.tip) > 0
                      ? `${currencyCode}${new Decimal(currentProductVariant.tip).times(quantity)}`
                      : 'No tip'
                  }
                />
                <PriceRow
                  icon={Tag}
                  label="DISCOUNTS"
                  value={
                    Number(currentProductVariant.discounts) > 0
                      ? `${currencyCode}${new Decimal(currentProductVariant.discounts).times(quantity)}`
                      : 'No discounts'
                  }
                />
              </CardContent>
            </Card>
          )}

          {product.options?.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <div className="flex flex-wrap gap-2">
                {item.value.split(',').map((val, vi) => {
                  const isSelected =
                    (index === 0 && val === optionOneValue) ||
                    (index === 1 && val === optionTwoValue) ||
                    (index === 2 && val === optionThreeValue)
                  return (
                    <button
                      key={vi}
                      onClick={() => {
                        if (index === 0) setOptionOneValue(val)
                        else if (index === 1) setOptionTwoValue(val)
                        else setOptionThreeValue(val)
                      }}
                      className={cn(
                        'px-4 py-1.5 rounded-full text-sm border transition-all duration-150',
                        isSelected
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'border-gray-200 text-gray-600 hover:border-sky-300'
                      )}
                    >
                      {val}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {product.product_status === 1 &&
            isSelectOption &&
            (currentProductVariant && currentProductVariant.inventory_quantity > 0 ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">Quantity</span>
                  <div className="flex items-center border rounded-xl overflow-hidden">
                    <button
                      className="h-9 w-9 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
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
                    onClick={() => setQuantity(currentProductVariant.inventory_quantity)}
                  >
                    Max ({currentProductVariant.inventory_quantity})
                  </button>
                </div>

                <Button
                  className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
                  onClick={onClickAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" /> Add to cart
                </Button>
                <Button
                  className="h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold gap-2"
                  onClick={onClickBuyNow}
                >
                  <Zap className="h-5 w-5" /> Buy now
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-xl">
                <PackageX className="h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">Sorry, this product is sold out.</p>
              </div>
            ))}

          {product.render_body_html && (
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-sm">Description</h3>
              <div
                className="text-sm text-muted-foreground prose prose-sm max-w-none overflow-auto"
                dangerouslySetInnerHTML={{ __html: product.render_body_html }}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                window.location.href = `/profile/${product.username}`
              }}
            >
              <Link2 className="h-4 w-4" /> More from {product.username}
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setOpenRefundPolicy(true)}>
              <RefreshCcw className="h-4 w-4" /> Refund Policy
            </Button>
          </div>
        </div>
      </div>

      {product.product_status === 1 && (
        <div className="flex flex-col gap-4">
          <button
            className="flex items-center gap-1 hover:text-sky-500 transition-colors"
            onClick={() => {
              window.location.href = `/explore?type=${Object.entries(PRODUCT_TYPE).find(([, v]) => v === product.product_type)?.[0]}`
            }}
          >
            <h2 className="text-lg font-bold">Recommended</h2>
            <ChevronRight className="h-5 w-5" />
          </button>
          <NowTrendingCard productType={product.product_type} />
        </div>
      )}

      {getUuid() === product.user_uuid && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Product Management</h2>
          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList className="w-full justify-start">
              {PRODUCT_TAB_DATAS.map((item) => (
                <TabsTrigger key={item.id} value={String(item.id)}>
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="0">
              <Product
                product_id={product.product_id}
                title={product.title}
                slug={product.slug}
                vendor={product.vendor}
                productType={product.product_type}
                tags={product.tags}
                description={product.body_html}
                options={product.options}
                images={product.images}
                productStatus={product.product_status}
                init={init}
              />
            </TabsContent>
            <TabsContent value="1">
              <ProductVariant
                product_id={product.product_id}
                options={product.options}
                currency={product.currency}
              />
            </TabsContent>
            <TabsContent value="2">
              <ProductRating />
            </TabsContent>
          </Tabs>
        </div>
      )}

      <ProductRatingsDialog
        product_id={product.product_id}
        openDialog={openRatingsDialog}
        setOpenDialog={setOpenRatingsDialog}
        ratings={product.ratings}
      />
      <RefundPolicyDialog openDialog={openRefundPolicy} setOpenDialog={setOpenRefundPolicy} />
    </div>
  )
}

export default ProductDetails

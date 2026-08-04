import { useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useEffect, useState } from 'react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/navigation'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/thumbs'
import ProductRatingsDialog from '@/components/Dialog/ProductRatingsDialog'
import RefundPolicyDialog from '@/components/Dialog/RefundPolicyDialog'
import { COLLECT_TYPE, PRODUCT_TAB_DATAS, PRODUCT_TYPE } from '@/packages/constants'
import Product from './Product'
import ProductVariant from './Variant'
import ProductRating from './Rating'
import { CURRENCYS } from '@/packages/constants/currency'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { ProductType, ProductVariantType } from '@/utils/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
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
  ExternalLink,
  Share2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Decimal from 'decimal.js'
import Link from 'next/link'
import VideoPlayer from '../VIdeo/VideoPlayer'
import { GetAbosolutePathByRelative } from '@/utils/image'
import Recommended from './Recommended'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'

const RatingBar = ({ star, ratings }: { star: number; ratings: any[] }) => {
  const count = ratings.filter((r) => r.number === star).length
  const percent = ratings.length > 0 ? (count / ratings.length) * 100 : 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-3 tabular-nums">{star}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-5 text-right tabular-nums">{count}</span>
    </div>
  )
}

const PriceRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
)

const ProductDetails = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''

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
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)
  const { getUuid, getIsLogin } = useUserPresistStore((state) => state)
  const { addToCart: addCartLine } = useCartPresistStore((state) => state)

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

  const init = async (id: any, signal?: AbortSignal) => {
    try {
      if (!id) return showError('Incorrect product id')
      const endpoint = getIsLogin() ? Http.product_by_login_id : Http.product_by_id
      const isNumericId = typeof id === 'number' || /^\d+$/.test(String(id))
      const response: any = await axios.get(endpoint, {
        params: isNumericId ? { product_id: id } : { slug: id },
        signal,
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
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return
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
          inventory_policy: response.data.inventory_policy,
          taxable: response.data.taxable,
          is_virtual: response.data.is_virtual,
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
    if (!product || !currentProductVariant) return
    const option = buildOption()
    if (option === null) return

    addCartLine(product.user_uuid, {
      productId: product.product_id,
      option,
      quantity,
      snapshotTitle: product.title,
      snapshotImage: String(currentProductVariant.image ?? ''),
      snapshotSlug: product.slug,
    })
  }

  const onClickAddToCart = () => {
    if (!product || !currentProductVariant) return showError('Please select a variant.')
    if (quantity <= 0) return showError('At least one quantity is required.')
    if (quantity > currentProductVariant.inventory_quantity)
      return showError('Not enough stock for the selected quantity.')
    if (getUuid() === product.user_uuid) return showError('Cannot buy your own products.')

    addToCart()
    showSuccess('Added to cart successfully')
  }

  const onClickBuyNow = () => {
    if (!product || !currentProductVariant) return showError('Please select a variant.')
    if (quantity <= 0) return showError('At least one quantity is required.')
    if (quantity > currentProductVariant.inventory_quantity)
      return showError('Not enough stock for the selected quantity.')
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
        .reduce((s, r) => s.plus(new Decimal(r.number ?? 0)), new Decimal(0))
        .dividedBy(product.ratings.length)
        .toFixed(1)
    : '0.0'

  useAbortableEffect(
    (signal) => {
      if (!router.isReady || !id) return
      init(id, signal)
    },
    [router.isReady, id]
  )

  useEffect(() => {
    initOptionValue(optionOneValue, optionTwoValue, optionThreeValue)
  }, [optionOneValue, optionTwoValue, optionThreeValue])

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse text-muted-foreground text-sm">Loading product...</div>
      </div>
    )

  if (product.product_status !== 'active' && getUuid() !== product.user_uuid)
    return (
      <div className="container mx-auto py-16 flex flex-col items-center gap-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-red-50 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          This product does not exist or has been removed.
        </p>
        <Button onClick={() => (window.location.href = '/')}>Back to Home</Button>
      </div>
    )

  const buildOption = () => {
    if (!product) return null
    switch (product.options.length) {
      case 3:
        if (!optionOneValue || !optionTwoValue || !optionThreeValue) return null
        return `${optionOneValue},${optionTwoValue},${optionThreeValue}`
      case 2:
        if (!optionOneValue || !optionTwoValue) return null
        return `${optionOneValue},${optionTwoValue}`
      case 1:
        if (!optionOneValue) return null
        return optionOneValue
      default:
        return null
    }
  }

  const totalPrice =
    currentProductVariant && isSelectOption
      ? new Decimal(currentProductVariant.price || 0).times(quantity)
      : null

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl flex flex-col gap-10">
      {/* Status banners */}
      {product.product_status === 'archived' && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Archived</strong> — This product is read-only and not editable.
          </span>
        </div>
      )}
      {product.product_status === 'draft' && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-50 text-amber-700 rounded-xl text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Draft</strong> — Edit this product and publish it to the market.
          </span>
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* ========== LEFT: Gallery ========== */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {product.video && (
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <VideoPlayer videoSrc={product.video} title={product.title} />
            </div>
          )}

          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
            {isSelectOption && currentProductVariant?.image ? (
              <div className="flex justify-center items-center p-6 min-h-[320px] sm:min-h-[400px]">
                <img
                  src={GetAbosolutePathByRelative(currentProductVariant.image)}
                  alt="variant"
                  className="max-h-[360px] object-contain rounded-xl"
                />
              </div>
            ) : (
              <>
                <Swiper
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination, Thumbs]}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  className="min-h-[320px] sm:min-h-[400px]"
                >
                  {product.images?.map((item, i) => (
                    <SwiperSlide key={i}>
                      <div className="flex justify-center items-center p-6 min-h-[320px] sm:min-h-[400px]">
                        <img
                          src={GetAbosolutePathByRelative(item.src)}
                          alt={`${product.title} ${i + 1}`}
                          className="max-h-[360px] object-contain rounded-xl"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {product.images && product.images.length > 1 && (
                  <div className="px-3 pb-3">
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={8}
                      slidesPerView={5}
                      watchSlidesProgress
                      modules={[Thumbs]}
                      className="thumbs-swiper"
                    >
                      {product.images.map((item, i) => (
                        <SwiperSlide key={i} className="cursor-pointer">
                          <div className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-sky-400 transition-colors bg-white">
                            <img
                              src={GetAbosolutePathByRelative(item.src)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Ratings preview (desktop left column) */}
          {product.ratings && product.ratings.length > 0 && (
            <Card className="border border-gray-100 shadow-sm rounded-2xl hidden lg:block">
              <CardContent className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Ratings & Reviews</h3>
                  <button
                    onClick={() => setOpenRatingsDialog(true)}
                    className="text-xs text-sky-600 hover:underline font-medium"
                  >
                    View all
                  </button>
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-4xl font-bold text-gray-900 leading-none">
                      {avgRating}
                    </span>
                    <div className="flex mt-1.5">
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
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-1">
                      {product.ratings.length} reviews
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <RatingBar key={s} star={s} ratings={product.ratings} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {product.ratings.slice(0, 2).map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1.5 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-800">{item.username}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={cn(
                                'h-3 w-3',
                                s <= item.number
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-gray-200 fill-gray-200'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      {item.body && (
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {item.body}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl"
                  onClick={() => setOpenRatingsDialog(true)}
                >
                  Read more reviews
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ========== RIGHT: Info & Purchase ========== */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Seller + actions */}
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2.5 group"
              onClick={() => (window.location.href = `/profile/${product.username}`)}
            >
              <Avatar className="h-9 w-9 border border-gray-100">
                <AvatarImage src={GetAbosolutePathByRelative(product.user_avatar_url, 'avatar')} />
                <AvatarFallback className="text-sm bg-sky-50 text-sky-600 font-semibold">
                  {product.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold group-hover:text-sky-600 transition-colors">
                  {product.username}
                </span>
                <span className="text-[11px] text-muted-foreground">Seller</span>
              </div>
            </button>

            <div className="flex items-center gap-1">
              {getIsLogin() && (
                <button
                  onClick={onClickFavorite}
                  className={cn(
                    'h-9 w-9 rounded-full flex items-center justify-center border transition-all',
                    product.collect_status === 'true'
                      ? 'bg-sky-500 border-sky-500 text-white'
                      : 'border-gray-200 text-gray-400 hover:border-sky-300 hover:text-sky-500'
                  )}
                >
                  <Heart className="h-4 w-4" />
                </button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem
                    onClick={() => (window.location.href = `mailto:${product.user_email}`)}
                  >
                    <Mail className="mr-2 h-4 w-4" /> Contact seller
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500"
                    onClick={() =>
                      (window.location.href = `/report/products/${product.product_id}`)
                    }
                  >
                    <Flag className="mr-2 h-4 w-4" /> Report product
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Title + meta */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {product.product_type && (
                <Badge variant="secondary" className="text-xs font-medium">
                  {product.product_type}
                </Badge>
              )}
              {product.vendor && (
                <Badge variant="outline" className="text-xs font-normal">
                  {product.vendor}
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
              {product.website ? (
                <a
                  href={product.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 transition-colors inline-flex items-center gap-1.5"
                >
                  {product.title}
                  <ExternalLink className="h-4 w-4 opacity-50" />
                </a>
              ) : (
                product.title
              )}
            </h1>

            {product.ratings && product.ratings.length > 0 && (
              <button
                className="flex items-center gap-1.5 w-fit"
                onClick={() => setOpenRatingsDialog(true)}
              >
                <div className="flex">
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
                </div>
                <span className="text-sm font-medium text-gray-800">{avgRating}</span>
                <span className="text-xs text-muted-foreground">
                  ({product.ratings.length} reviews)
                </span>
              </button>
            )}

            {product.tags && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {product.tags
                  .split(',')
                  .filter(Boolean)
                  .map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* Price card */}
          {currentProductVariant && isSelectOption && (
            <Card className="border border-gray-100 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">
                    {currencyCode}
                    {currentProductVariant.price}
                  </span>
                  {quantity > 1 && totalPrice && (
                    <span className="text-sm text-muted-foreground">
                      · Total {currencyCode}
                      {totalPrice.toString()}
                    </span>
                  )}
                </div>
                <div className="divide-y divide-dashed divide-gray-100">
                  <PriceRow
                    icon={Receipt}
                    label="Tax"
                    value={
                      currentProductVariant.taxable
                        ? `${currencyCode}${new Decimal(currentProductVariant.tax || 0)
                            .times(quantity)
                            .toString()}`
                        : 'Tax free'
                    }
                  />
                  <PriceRow
                    icon={Coins}
                    label="Tip"
                    value={
                      Number(currentProductVariant.tip) > 0
                        ? `${currencyCode}${new Decimal(currentProductVariant.tip || 0)
                            .times(quantity)
                            .toString()}`
                        : 'No tip'
                    }
                  />
                  <PriceRow
                    icon={Tag}
                    label="Discounts"
                    value={
                      Number(currentProductVariant.discounts) > 0
                        ? `${currencyCode}${new Decimal(currentProductVariant.discounts || 0)
                            .times(quantity)
                            .toString()}`
                        : 'No discounts'
                    }
                  />
                </div>
                {currentProductVariant.inventory_quantity > 0 && (
                  <p className="text-xs text-emerald-600 mt-3 font-medium">
                    {currentProductVariant.inventory_quantity} in stock
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Options */}
          {product.options?.map((item, index) => (
            <div key={index} className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {index === 0
                    ? optionOneValue
                    : index === 1
                      ? optionTwoValue
                      : optionThreeValue || 'Select'}
                </span>
              </div>
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
                        'px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150',
                        isSelected
                          ? 'bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-200'
                          : 'border-gray-200 text-gray-700 hover:border-sky-300 hover:bg-sky-50'
                      )}
                    >
                      {val}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Quantity + CTAs */}
          {product.product_status === 'active' &&
            isSelectOption &&
            (currentProductVariant && currentProductVariant.inventory_quantity > 0 ? (
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold">Quantity</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <button
                      className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={quantity}
                      className="w-12 h-10 text-center text-sm font-semibold bg-transparent outline-none border-x border-gray-200"
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '')
                        if (raw === '') {
                          setQuantity('' as unknown as number)
                          return
                        }
                        const num = Number(raw)
                        setQuantity(Math.min(currentProductVariant.inventory_quantity, num))
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
                      className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition-colors"
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
                    className="text-xs text-sky-600 hover:underline font-medium"
                    onClick={() => setQuantity(1)}
                  >
                    Min
                  </button>
                  <button
                    className="text-xs text-sky-600 hover:underline font-medium"
                    onClick={() => setQuantity(currentProductVariant.inventory_quantity)}
                  >
                    Max ({currentProductVariant.inventory_quantity})
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Button
                    className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2 rounded-xl shadow-sm shadow-sky-200"
                    onClick={onClickAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4" /> Add to cart
                  </Button>
                  <Button
                    className="h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold gap-2 rounded-xl"
                    onClick={onClickBuyNow}
                  >
                    <Zap className="h-4 w-4" /> Buy now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-4 py-3.5 bg-red-50 text-red-600 rounded-xl">
                <PackageX className="h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">Sorry, this product is sold out.</p>
              </div>
            ))}

          {/* Description */}
          {product.render_body_html && (
            <div className="flex flex-col gap-2.5 pt-2">
              <h3 className="font-semibold text-sm text-gray-900">Description</h3>
              <div
                className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-headings:text-gray-900"
                dangerouslySetInnerHTML={{ __html: product.render_body_html }}
              />
            </div>
          )}

          {/* Secondary actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <Button
              variant="outline"
              className="flex-1 gap-2 rounded-xl h-10"
              onClick={() => (window.location.href = `/profile/${product.username}`)}
            >
              <Link2 className="h-4 w-4" /> More from {product.username}
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2 rounded-xl h-10"
              onClick={() => setOpenRefundPolicy(true)}
            >
              <RefreshCcw className="h-4 w-4" /> Refund Policy
            </Button>
          </div>

          {/* Mobile ratings */}
          {product.ratings && product.ratings.length > 0 && (
            <Card className="border border-gray-100 shadow-sm rounded-2xl lg:hidden">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Ratings & Reviews</h3>
                  <button
                    onClick={() => setOpenRatingsDialog(true)}
                    className="text-xs text-sky-600 hover:underline font-medium"
                  >
                    View all ({product.ratings.length})
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">{avgRating}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          'h-4 w-4',
                          s <= Math.round(Number(avgRating))
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200 fill-gray-200'
                        )}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl"
                  onClick={() => setOpenRatingsDialog(true)}
                >
                  Read reviews
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Recommended */}
      {product.product_status === 'active' && (
        <Recommended productType={product.product_type} excludeId={product.product_id} />
      )}

      {/* Owner management */}
      {getUuid() === product.user_uuid && (
        <div className="flex flex-col gap-4 pt-2 border-t">
          <h2 className="text-lg font-bold pt-6">Product Management</h2>
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
                website={product.website}
                video={product.video}
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

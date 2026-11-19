import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import ProductRatingsDialog from '@/components/Dialog/ProductRatingsDialog'
import RefundPolicyDialog from '@/components/Dialog/RefundPolicyDialog'
import {
  SectionNav,
  HighlightsSection,
  PlansSection,
  SpecsSection,
  FaqSection,
} from './Productsections'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import OwnerTabs from './OwnerTabs'
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
  Link2,
  RefreshCcw,
  Tag,
  Coins,
  Receipt,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Decimal from 'decimal.js'
import VideoPlayer from '../Video/VideoPlayer'
import { GetAbosolutePathByRelative } from '@/utils/image'
import Recommended from './Recommended'
import ImageLightbox from '../Image/ImageLightbox'
import { useProductDetails } from '@/hooks/useProductDetails'
import { NAV_STICKY_TOP, PriceRow } from './ProductDetailParts'
import ProductReviewsSection from './ProductReviewsSection'
import ProductPurchasePanel from './ProductPurchasePanel'
import ProductAboutSection from './ProductAboutSection'
import ProductStorySection from './ProductStorySection'
import { navigateTo } from '@/utils/navigate'

const ProductGallery = dynamic(() => import('./ProductGallery'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[320px] sm:min-h-[420px] animate-pulse bg-gray-100 rounded-2xl" />
  ),
})

const ProductDetails = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const {
    product,
    loading,
    storyHtml,
    openRatingsDialog,
    setOpenRatingsDialog,
    openRefundPolicy,
    setOpenRefundPolicy,
    tabValue,
    setTabValue,
    optionOneValue,
    setOptionOneValue,
    optionTwoValue,
    setOptionTwoValue,
    optionThreeValue,
    setOptionThreeValue,
    currentProductVariant,
    isSelectOption,
    quantity,
    setQuantity,
    showStory,
    setShowStory,
    showAbout,
    setShowAbout,
    aboutExpanded,
    setAboutExpanded,
    lightboxOpen,
    setLightboxOpen,
    lightboxIndex,
    setLightboxIndex,
    lightboxImages,
    setLightboxImages,
    uuid,
    isLogin,
    currencyCode,
    avgRating,
    highlights,
    onClickAddToCart,
    onClickBuyNow,
    onClickFavorite,
    init,
  } = useProductDetails(id, router.isReady)

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse text-muted-foreground text-sm">Loading product...</div>
      </div>
    )
  }

  if (product.product_status !== 'active' && uuid !== product.user_uuid) {
    return (
      <div className="container mx-auto py-16 flex flex-col items-center gap-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-red-50 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          This product does not exist or has been removed.
        </p>
        <Button onClick={() => router.push('/')}>Back to Home</Button>
      </div>
    )
  }

  const totalPrice =
    currentProductVariant && isSelectOption
      ? new Decimal(currentProductVariant.price || 0).times(quantity)
      : null

  const canBuy =
    product.product_status === 'active' &&
    isSelectOption &&
    currentProductVariant &&
    currentProductVariant.inventory_quantity > 0

  const openLightbox = (images: string[], index = 0) => {
    if (!images.length) return
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const hasStory =
    !!product.story && (product.story.story_status === 'active' || uuid === product.user_uuid)

  const navItems = [
    product.render_body_html && { id: 'overview', label: 'Overview' },
    product.highlights?.length && { id: 'highlights', label: 'Highlights' },
    product.plan_image && { id: 'plans', label: 'Plans' },
    product.specs?.length && { id: 'specs', label: 'Specs' },
    product.faqs?.length && { id: 'faq', label: 'FAQ' },
    hasStory && { id: 'story', label: 'Story' },
    product.ratings?.length > 0 && { id: 'reviews', label: 'Reviews' },
  ].filter(Boolean) as { id: string; label: string }[]

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl flex flex-col gap-10">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-6 flex flex-col gap-4">
          {product.video && (
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <VideoPlayer videoSrc={product.video} title={product.title} />
            </div>
          )}

          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
            <ProductGallery
              title={product.title}
              images={product.images}
              isSelectOption={isSelectOption}
              currentProductVariant={currentProductVariant}
              onOpenLightbox={openLightbox}
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-24 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-2.5 group"
                onClick={() => router.push(`/profile/${product.username}`)}
              >
                <Avatar className="h-9 w-9 border border-gray-100">
                  <AvatarImage
                    src={GetAbosolutePathByRelative(product.user_avatar_url, 'avatar')}
                  />
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
                {isLogin && (
                  <button
                    type="button"
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
                    <button
                      type="button"
                      className="h-9 w-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem asChild>
                      <a href={`mailto:${product.user_email}`}>
                        <Mail className="mr-2 h-4 w-4" /> Contact seller
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500"
                      onClick={() =>
                        router.push(`/report/products/${product.product_id}`)
                      }
                    >
                      <Flag className="mr-2 h-4 w-4" /> Report product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

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
                  type="button"
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
            </div>

            {highlights.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {highlights.map((text) => (
                  <li key={text} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            )}

            {product.is_promote === 'false' && (
              <>
                <div className="flex items-start gap-2 rounded-xl bg-sky-50 border border-sky-100 px-3 py-2.5 text-xs text-sky-800">
                  <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>
                    Pay with crypto. Order completes after on-chain confirmation and mutual
                    confirmation by buyer and seller.
                  </p>
                </div>

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

                <ProductPurchasePanel
                  options={product.options}
                  optionOneValue={optionOneValue}
                  optionTwoValue={optionTwoValue}
                  optionThreeValue={optionThreeValue}
                  setOptionOneValue={setOptionOneValue}
                  setOptionTwoValue={setOptionTwoValue}
                  setOptionThreeValue={setOptionThreeValue}
                  productStatus={product.product_status}
                  isSelectOption={isSelectOption}
                  canBuy={!!canBuy}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  currentProductVariant={currentProductVariant}
                  onAddToCart={onClickAddToCart}
                  onBuyNow={onClickBuyNow}
                />
              </>
            )}

            {product.is_promote === 'true' && product.plan_image_website && (
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="flex-1 gap-2 rounded-xl h-10 bg-gray-50 bg-sky-500 hover:bg-sky-600 text-white hover:text-white"
                  onClick={() => navigateTo(router, product.plan_image_website)}
                >
                  Go to Buy Now <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="flex-1 gap-2 rounded-xl h-10"
                onClick={() => router.push(`/profile/${product.username}`)}
              >
                <Link2 className="h-4 w-4" /> More from {product.username}
              </Button>
              {product.is_promote === 'false' && (
                <Button
                  variant="outline"
                  className="flex-1 gap-2 rounded-xl h-10"
                  onClick={() => setOpenRefundPolicy(true)}
                >
                  <RefreshCcw className="h-4 w-4" /> Refund Policy
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {navItems.length > 2 && <SectionNav items={navItems} stickyTop={NAV_STICKY_TOP} />}

      {product.render_body_html && (
        <ProductAboutSection
          html={product.render_body_html}
          showAbout={showAbout}
          setShowAbout={setShowAbout}
          aboutExpanded={aboutExpanded}
          setAboutExpanded={setAboutExpanded}
        />
      )}

      {!!product.highlights?.length && <HighlightsSection items={product.highlights} />}

      {product.plan_image && (
        <PlansSection
          image={product.plan_image}
          caption={product.plan_image_caption}
          website={product.plan_image_website}
          onOpen={(src) => openLightbox([src])}
        />
      )}

      {!!product.specs?.length && <SpecsSection items={product.specs} />}

      {!!product.faqs?.length && <FaqSection items={product.faqs} />}

      {hasStory && product.story && (
        <ProductStorySection
          story={product.story}
          storyHtml={storyHtml}
          showStory={showStory}
          setShowStory={setShowStory}
        />
      )}

      {product.ratings && product.ratings.length > 0 && (
        <ProductReviewsSection
          ratings={product.ratings}
          avgRating={avgRating}
          onViewAll={() => setOpenRatingsDialog(true)}
        />
      )}

      {product.product_status === 'active' && (
        <Recommended
          productType={product.product_type}
          excludeId={product.product_id}
          pageSize={5}
        />
      )}

      {uuid === product.user_uuid && (
        <OwnerTabs
          productId={product.product_id}
          title={product.title}
          slug={product.slug}
          vendor={product.vendor}
          productType={product.product_type}
          tags={product.tags}
          description={product.body_html}
          website={product.website}
          video={product.video}
          isPromote={product.is_promote}
          planImage={product.plan_image}
          planImageCaption={product.plan_image_caption}
          planImageWebsite={product.plan_image_website}
          options={product.options}
          images={product.images}
          specs={product.specs}
          highlights={product.highlights}
          faqs={product.faqs}
          productStatus={product.product_status}
          currency={product.currency}
          tabValue={tabValue}
          setTabValue={setTabValue}
          init={init}
        />
      )}

      <ProductRatingsDialog
        product_id={product.product_id}
        openDialog={openRatingsDialog}
        setOpenDialog={setOpenRatingsDialog}
        ratings={product.ratings}
      />
      <RefundPolicyDialog openDialog={openRefundPolicy} setOpenDialog={setOpenRefundPolicy} />

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onChange={setLightboxIndex}
      />
    </div>
  )
}

export default ProductDetails

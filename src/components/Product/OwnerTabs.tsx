import dynamic from 'next/dynamic'
import { PRODUCT_TAB_DATAS } from '@/packages/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ProductFaqType, ProductHighlightType, ProductImageType, ProductOptionType, ProductSpecType } from '@/utils/types'

const Product = dynamic(() => import('./Product'), {
  ssr: false,
  loading: () => <div className="p-4 text-sm text-muted-foreground">Loading editor…</div>,
})
const ProductVariant = dynamic(() => import('./Variant'), {
  ssr: false,
  loading: () => <div className="p-4 text-sm text-muted-foreground">Loading variants…</div>,
})
const ProductRating = dynamic(() => import('./Rating'), { ssr: false })
const ProductStory = dynamic(() => import('./Story'), {
  ssr: false,
  loading: () => <div className="p-4 text-sm text-muted-foreground">Loading story…</div>,
})

type Props = {
  productId: number
  title: string
  slug: string
  vendor: string
  productType: string
  tags: string
  description: string
  website: string
  video: string
  isPromote: string
  planImage: string
  planImageCaption: string
  planImageWebsite: string
  options: ProductOptionType[]
  images: ProductImageType[]
  specs: ProductSpecType[]
  highlights: ProductHighlightType[]
  faqs: ProductFaqType[]
  productStatus: string
  currency: string
  tabValue: string
  setTabValue: (value: string) => void
  init: (id?: string | number) => Promise<void>
}

export default function OwnerTabs(props: Props) {
  const { tabValue, setTabValue, currency, init, ...product } = props

  return (
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
            productId={product.productId}
            title={product.title}
            slug={product.slug}
            vendor={product.vendor}
            productType={product.productType}
            tags={product.tags}
            description={product.description}
            website={product.website}
            video={product.video}
            isPromote={product.isPromote}
            planImage={product.planImage}
            planImageCaption={product.planImageCaption}
            planImageWebsite={product.planImageWebsite}
            options={product.options}
            images={product.images}
            specs={product.specs}
            highlights={product.highlights}
            faqs={product.faqs}
            productStatus={product.productStatus}
            init={init}
          />
        </TabsContent>
        <TabsContent value="1">
          <ProductVariant productId={product.productId} options={product.options} currency={currency} />
        </TabsContent>
        <TabsContent value="2">
          <ProductStory productId={product.productId} />
        </TabsContent>
        <TabsContent value="3">
          <ProductRating />
        </TabsContent>
      </Tabs>
    </div>
  )
}

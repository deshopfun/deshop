import { useSnackPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import { PRODUCT_TYPE } from '@/packages/constants'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PackageOpen, Loader2 } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'

type Props = {
  productType?: string
}

const PAGE_SIZE = 20

const NowTrendingCard = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [currentProductType, setCurrentProductType] = useState<string>(props.productType || 'ALL')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)

  const init = async (productType: string, pageNum = 1, append = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
    }

    try {
      const params: any = {
        limit: PAGE_SIZE,
        offset: (pageNum - 1) * PAGE_SIZE,
      }

      if (productType && productType !== 'ALL') {
        params.product_type = productType
      }

      const response: any = await axios.get(Http.product_list, { params })

      if (response.result) {
        const list: ProductType[] = response.data || []
        setProducts((prev) => (append ? [...prev, ...list] : list))
        setHasMore(list.length >= PAGE_SIZE)
        setPage(pageNum)
      } else {
        if (!append) setProducts([])
        setHasMore(false)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later')
      setSnackOpen(true)
      console.error(e)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    init(currentProductType, 1, false)
  }, [])

  const handleCategoryClick = (productType: string) => {
    if (productType === currentProductType) return
    setCurrentProductType(productType)
    setPage(1)
    setHasMore(true)
    init(productType, 1, false)
  }

  const handleShowMore = () => {
    if (loadingMore || !hasMore) return
    init(currentProductType, page + 1, true)
  }

  const categories = [['ALL', 'ALL'], ...Object.entries(PRODUCT_TYPE)]

  return (
    <div>
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 pb-1 min-w-max">
          {categories.map(([key, value]) => {
            const isActive = currentProductType === value

            return (
              <button
                key={key}
                onClick={() => handleCategoryClick(value)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }
                `}
              >
                {value === 'ALL' ? 'All' : value}
              </button>
            )
          })}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : products && products.length > 0 ? (
        <>
          <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((item, index) => (
              <Card
                key={`${item.product_id}-${index}`}
                className="cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden"
                onClick={() => {
                  window.location.href = `/products/${item.slug || item.product_id}`
                }}
              >
                <div className="relative">
                  <img
                    src={GetAbosolutePathByRelative(item.images?.[0]?.src)}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <CardContent className="p-3 flex flex-col gap-1">
                  <p className="font-semibold text-sm line-clamp-2">{item.title}</p>

                  {item.variants && item.variants.length > 0 && (
                    <>
                      <p className="text-xs text-muted-foreground">{item.variants[0].option}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="font-bold text-red-500 text-base">
                          {CURRENCYS.find((c) => c.name === item.currency)?.code}
                          {item.variants[0].price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.variants[0].inventory_quantity} in stock
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                className="min-w-[200px] h-11 rounded-full"
                onClick={handleShowMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Show more products'
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <PackageOpen className="h-16 w-16 mb-4 opacity-30" />
          <p className="text-sm mt-1">More products will be displayed here in the future.</p>
        </div>
      )}
    </div>
  )
}

export default NowTrendingCard

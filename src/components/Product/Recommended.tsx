import { useCallback, useEffect, useState } from 'react'
import { useSnackPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import { PRODUCT_TYPE } from '@/packages/constants'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, ChevronRight } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'

type Props = {
  productType?: string
  excludeId?: number
  pageSize?: number
}

const PAGE_SIZE_DEFAULT = 5

const Recommended = ({ productType, excludeId, pageSize = PAGE_SIZE_DEFAULT }: Props) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)

  const fetchProducts = useCallback(
    async (nextOffset: number, isReset: boolean) => {
      if (isReset) {
        setInitialLoading(true)
      } else {
        setLoading(true)
      }

      try {
        const response: any = await axios.get(Http.product_list, {
          params: {
            product_type: productType || undefined,
            exclude_id: excludeId || undefined,
            limit: pageSize,
            offset: nextOffset,
          },
        })

        if (!response.result) {
          if (isReset) {
            setProducts([])
            setHasMore(false)
          }
          return
        }

        const incoming: ProductType[] = response.data || []

        setProducts((prev) => {
          const merged = isReset ? incoming : [...prev, ...incoming]
          const seen = new Set<number>()
          return merged.filter((item) => {
            if (!item?.product_id) return false
            if (excludeId && item.product_id === excludeId) return false
            if (seen.has(item.product_id)) return false
            seen.add(item.product_id)
            return true
          })
        })

        if (typeof response.total === 'number') {
          const loaded = nextOffset + incoming.length
          setHasMore(loaded < response.total)
        } else {
          setHasMore(incoming.length >= pageSize)
        }

        setOffset(nextOffset + pageSize)
      } catch (e) {
        setSnackSeverity('error')
        setSnackMessage('The network error occurred. Please try again later')
        setSnackOpen(true)
        console.error(e)
      } finally {
        setLoading(false)
        setInitialLoading(false)
      }
    },
    [productType, excludeId, pageSize, setSnackSeverity, setSnackMessage, setSnackOpen]
  )

  useEffect(() => {
    setProducts([])
    setOffset(0)
    setHasMore(true)
    fetchProducts(0, true)
  }, [productType, excludeId, pageSize]) // eslint-disable-line react-hooks/exhaustive-deps

  const onClickLoadMore = () => {
    if (loading || !hasMore) return
    fetchProducts(offset, false)
  }

  const exploreHref = (() => {
    const entry = Object.entries(PRODUCT_TYPE).find(([, v]) => v === productType)
    return entry ? `/explore?type=${entry[0]}` : '/explore'
  })()

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 pt-2">
      <button
        type="button"
        className="flex items-center gap-1 w-fit hover:text-sky-600 transition-colors group"
        onClick={() => {
          window.location.href = exploreHref
        }}
      >
        <h2 className="text-lg font-bold">Recommended</h2>
        <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((item) => (
          <Card
            key={item.product_id}
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
                loading="lazy"
              />
            </div>

            <CardContent className="p-3 flex flex-col gap-1">
              <p className="font-semibold text-sm line-clamp-2">{item.title}</p>

              {item.variants && item.variants.length > 0 && (
                <>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.variants[0].option}
                  </p>
                  <div className="flex items-center justify-between mt-1 gap-2">
                    <p className="font-bold text-red-500 text-base">
                      {CURRENCYS.find((c) => c.name === item.currency)?.code}
                      {item.variants[0].price}
                    </p>
                    <p className="text-xs text-muted-foreground shrink-0">
                      {item.variants[0].inventory_quantity} in stock
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            onClick={onClickLoadMore}
            disabled={loading}
            className="min-w-[160px] gap-2 rounded-full"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      ) : (
        <p className="text-center text-xs text-muted-foreground">
          {/* You&apos;ve reached the end of the recommendations. */}
        </p>
      )}
    </div>
  )
}

export default Recommended

import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useSnackPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import { PRODUCT_TYPE } from '@/packages/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, ChevronRight } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import RemoteImage from '@/components/Image/RemoteImage'
import { useShallow } from 'zustand/react/shallow'
import Link from 'next/link'
import { useRecommendedProducts } from '@/hooks/queries/useProductList'

interface Props {
  productType?: string
  excludeId?: number
  pageSize?: number
}

const PAGE_SIZE_DEFAULT = 5

const Recommended = ({ productType, excludeId, pageSize = PAGE_SIZE_DEFAULT }: Props) => {
  const router = useRouter()

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const productsQuery = useRecommendedProducts({ productType, excludeId, pageSize })

  const products = useMemo(() => {
    const merged = productsQuery.data?.pages.flat() ?? []
    const seen = new Set<number>()
    return merged.filter((item) => {
      if (!item?.product_id) return false
      if (excludeId && item.product_id === excludeId) return false
      if (seen.has(item.product_id)) return false
      seen.add(item.product_id)
      return true
    })
  }, [productsQuery.data, excludeId])

  const loading = productsQuery.isFetchingNextPage
  const initialLoading = productsQuery.isLoading
  const hasMore = !!productsQuery.hasNextPage

  useEffect(() => {
    if (productsQuery.isError) {
      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later')
      setSnackOpen(true)
    }
  }, [productsQuery.isError, setSnackSeverity, setSnackMessage, setSnackOpen])

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
          void router.push(exploreHref)
        }}
      >
        <h2 className="text-lg font-bold">Recommended</h2>
        <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((item, index) => (
          <Link
            key={item.product_id ?? index}
            href={`/products/${item.slug || item.product_id}`}
            className="block"
          >
            <Card className="h-full hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
              <div className="relative h-48">
                <RemoteImage
                  src={GetAbosolutePathByRelative(item.images?.[0]?.src)}
                  alt={item.title}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>

              <CardContent className="p-3 flex flex-col gap-1">
                <p className="font-semibold text-sm line-clamp-2">{item.title}</p>

                {item.is_promote === 'true' ? (
                  <p className="text-muted-foreground text-sm line-clamp-3">{item.body_html}</p>
                ) : (
                  item.variants &&
                  item.variants.length > 0 && (
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
                  )
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            onClick={() => productsQuery.fetchNextPage()}
            disabled={loading}
            className="min-w-[160px] gap-2 rounded-full"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      ) : (
        <p className="text-center text-xs text-muted-foreground" />
      )}
    </div>
  )
}

export default Recommended

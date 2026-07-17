import { useCallback, useEffect, useRef, useState } from 'react'
import { useSnackPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PackageOpen, Loader2 } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'

type Props = {
  productType?: string
  excludeId?: number
  pageSize?: number
}

const PAGE_SIZE_DEFAULT = 12

const Recommended = (props: Props) => {
  const pageSize = props.pageSize ?? PAGE_SIZE_DEFAULT

  const [products, setProducts] = useState<ProductType[]>([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState<number>()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const seenIdsRef = useRef<Set<number>>(new Set())

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)

  const showError = () => {
    setSnackSeverity('error')
    setSnackMessage('The network error occurred. Please try again later')
    setSnackOpen(true)
  }

  const fetchProducts = useCallback(
    async (nextOffset: number, isReset: boolean) => {
      setLoading(true)
      try {
        const response: any = await axios.get(Http.product_list, {
          params: {
            product_type: props.productType || undefined,
            exclude_id: props.excludeId || undefined,
            limit: pageSize,
            offset: nextOffset,
          },
        })

        if (response.result) {
          const incoming: ProductType[] = response.data || []

          const deduped = incoming.filter((item) => {
            if (props.excludeId && item.product_id === props.excludeId) return false
            if (seenIdsRef.current.has(item.product_id)) return false
            seenIdsRef.current.add(item.product_id)
            return true
          })

          setProducts((prev) => (isReset ? deduped : [...prev, ...deduped]))
          setTotal(response.total)
          setOffset(nextOffset + pageSize)
        } else {
          if (isReset) setProducts([])
        }
      } catch (e) {
        showError()
        console.error(e)
      } finally {
        setLoading(false)
        setInitialLoading(false)
      }
    },
    [props.productType, props.excludeId, pageSize]
  )

  useEffect(() => {
    seenIdsRef.current = new Set()
    setProducts([])
    setOffset(0)
    setTotal(undefined)
    setInitialLoading(true)
    fetchProducts(0, true)
  }, [props.productType, props.excludeId])

  const hasMore = total === undefined ? true : products.length < total

  const onClickLoadMore = () => {
    if (loading) return
    fetchProducts(offset, false)
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div>
      {products.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={onClickLoadMore}
                disabled={loading}
                className="gap-2"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? 'Loading...' : 'Load more'}
              </Button>
            </div>
          )}

          {!hasMore && (
            <p className="text-center text-xs text-muted-foreground">
              You&apos;ve reached the end of the recommendations.
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <PackageOpen className="h-16 w-16 mb-4 opacity-30" />
          <p className="text-sm mt-1">More products will be displayed here in the future.</p>
        </div>
      )}
    </div>
  )
}

export default Recommended

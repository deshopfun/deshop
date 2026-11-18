import { CURRENCYS } from '@/packages/constants/currency'
import { PRODUCT_TYPE } from '@/packages/constants'
import { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PackageOpen, Loader2 } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import Link from 'next/link'
import { useProductListInfinite } from '@/hooks/queries/useProductList'
import RemoteImage from '@/components/Image/RemoteImage'

interface Props {
  productType?: string
}

const AllMarket = (props: Props) => {
  const [currentProductType, setCurrentProductType] = useState<string>(props.productType || 'ALL')

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError } =
    useProductListInfinite(currentProductType)

  const products = useMemo(() => data?.pages.flatMap((page) => page) ?? [], [data])

  const handleCategoryClick = (productType: string) => {
    if (productType === currentProductType) return
    setCurrentProductType(productType)
  }

  const handleShowMore = () => {
    if (isFetchingNextPage || !hasNextPage) return
    fetchNextPage()
  }

  const categories = [['ALL', 'ALL'], ...Object.entries(PRODUCT_TYPE)]

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
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

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <p className="text-sm">The network error occurred. Please try again later</p>
        </div>
      ) : products && products.length > 0 ? (
        <>
          <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((item, index) => (
              <Link
                key={item.product_id ?? index}
                href={`/products/${item.slug || item.product_id}`}
                className="block"
              >
                <Card className="h-full hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
                  <div className="relative w-full h-48 overflow-hidden bg-[#F1F3F7]">
                    <RemoteImage
                      src={GetAbosolutePathByRelative(item.images?.[0]?.src)}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="scale-110 object-cover blur-xl opacity-60"
                    />
                    <RemoteImage
                      src={GetAbosolutePathByRelative(item.images?.[0]?.src)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-contain"
                    />
                  </div>

                  <CardContent className="p-3 flex flex-col gap-1">
                    <p className="font-semibold text-sm line-clamp-2">{item.title}</p>

                    {item.is_promote === 'true' ? (
                      <>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {item.body_html}
                        </p>
                      </>
                    ) : (
                      <>
                        {item.variants && item.variants.length > 0 && (
                          <>
                            <p className="text-xs text-muted-foreground">
                              {item.variants[0].option}
                            </p>
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
                      </>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                className="min-w-[200px] h-11 rounded-full"
                onClick={handleShowMore}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
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

export default AllMarket

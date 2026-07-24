import { PRODUCT_TYPE } from '@/packages/constants'
import { useEffect, useState } from 'react'
import { GetAbosolutePathByRelative, GetImgSrcByProductType } from '@/utils/image'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useSnackPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import { CURRENCYS } from '@/packages/constants/currency'
import { ProductType } from '@/utils/types'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react'

const Explore = () => {
  const router = useRouter()
  const type = typeof router.query.type === 'string' ? router.query.type : ''

  const [showMore, setShowMore] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductType[]>([])
  const [currentProductType, setCurrentProductType] = useState<string>(PRODUCT_TYPE.OPENSOURCE)
  const [isClick, setIsClick] = useState<boolean>(false)

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)

  const init = async (productType: string) => {
    try {
      const response: any = await axios.get(Http.product_list, {
        params: { product_type: productType },
      })

      if (response.result) {
        setProducts(response.data || [])
      } else {
        setProducts([])
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later')
      setSnackOpen(true)
      console.error(e)
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    if (isClick) {
      setIsClick(false)
      return
    }

    const value = type ? PRODUCT_TYPE[type as keyof typeof PRODUCT_TYPE] : undefined
    if (value) {
      setCurrentProductType(value)
      init(value)
    } else {
      init(PRODUCT_TYPE.OPENSOURCE)
    }
  }, [router.isReady, type])

  const handleCategoryClick = (productType: string) => {
    setIsClick(true)
    setCurrentProductType(productType)
    init(productType)

    router.push({
      pathname: router.pathname,
      query: { ...router.query, type: productType },
    })
  }

  const categories = Object.entries(PRODUCT_TYPE)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Explore
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(([key, value], index) => {
            const isVisible = index < 12 || showMore
            if (!isVisible) return null

            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
                  currentProductType === value ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleCategoryClick(value)}
              >
                <div className="aspect-square relative">
                  <img
                    src={GetImgSrcByProductType(value)}
                    alt={value}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white font-semibold text-lg">{value}</p>
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <p className="font-medium">{value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {categories.length > 8 && (
          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={() => setShowMore(!showMore)} className="gap-2">
              {showMore ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <Separator className="mb-8" />

      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold">{currentProductType}</h2>
          <Badge variant="secondary">{products.length} items</Badge>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((item, index) => {
              const firstVariant = item.variants?.[0]

              return (
                <Card
                  key={index}
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                  onClick={() => {
                    window.location.href = `/products/${item.slug || item.product_id}`
                  }}
                >
                  <div className="aspect-[4/3] relative bg-muted">
                    <img
                      src={GetAbosolutePathByRelative(item.images?.[0]?.src, 'avatar')}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold line-clamp-2 leading-tight">{item.title}</h3>

                    {firstVariant && (
                      <div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {firstVariant.option}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xl font-bold text-primary">
                            {CURRENCYS.find((c) => c.name === item.currency)?.code}
                            {firstVariant.price}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {firstVariant.inventory_quantity} in stock
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-24 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
              <h3 className="text-2xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                {currentProductType} category is currently empty.
                <br />
                More products will be added soon.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Explore

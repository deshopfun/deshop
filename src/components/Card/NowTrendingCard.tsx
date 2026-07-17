import { useSnackPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { PackageOpen } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'

type Props = {
  productType?: string
}

const NowTrendingCard = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>()

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)

  const init = async () => {
    try {
      const response: any = await axios.get(Http.product_list, {
        params: {
          product_type: props.productType ? props.productType : undefined,
          limit: 10,
        },
      })

      if (response.result) {
        setProducts(response.data)
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
    init()
  }, [])

  return (
    <div>
      {products && products.length > 0 ? (
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((item, index) => (
            <Card
              key={index}
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

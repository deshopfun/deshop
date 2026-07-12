import { useSnackPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Plus, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusConfig: Record<number, { label: string; className: string }> = {
  1: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200' },
  2: { label: 'Archived', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  3: { label: 'Draft', className: 'bg-amber-100 text-amber-700 border-amber-200' },
}

const ManageProduct = () => {
  const [products, setProducts] = useState<ProductType[]>([])

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const init = async () => {
    try {
      const response: any = await axios.get(Http.product)
      setProducts(response.result ? response.data : [])
    } catch {
      setSnackSeverity('error')
      setSnackMessage('Network error. Please try again later.')
      setSnackOpen(true)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
            <Package className="h-4 w-4 text-sky-500" />
          </div>
          <div>
            <h3 className="font-semibold">All Products</h3>
            <p className="text-xs text-muted-foreground">
              {products?.length} product{products?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button
          className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
          onClick={() => {
            window.location.href = '/create'
          }}
        >
          <Plus className="h-4 w-4" /> New Product
        </Button>
      </div>

      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((item, index) => {
            const status = statusConfig[item.product_status ?? 3]
            return (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden group"
                onClick={() => {
                  window.location.href = `/products/${item.slug || item.product_id}`
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.images?.[0]?.src}
                    alt={item.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={cn(
                        'text-xs font-semibold px-2 py-1 rounded-full border',
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm line-clamp-1 flex-1">{item.title}</p>
                    <Badge className="bg-sky-100 text-sky-700 border-sky-200 text-xs shrink-0">
                      {item.product_type}
                    </Badge>
                  </div>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags
                        .split(',')
                        .slice(0, 3)
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      {item.tags.split(',').length > 3 && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full">
                          +{item.tags.split(',').length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-xs text-sky-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-3 w-3" />
                    View product
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Package className="h-8 w-8 text-gray-300" />
          </div>
          <div>
            <p className="font-semibold text-gray-700">No products yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first product and start selling.
            </p>
          </div>
          <Button
            className="bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
            onClick={() => {
              window.location.href = '/create'
            }}
          >
            <Plus className="h-4 w-4" /> Create Product
          </Button>
        </div>
      )}
    </div>
  )
}

export default ManageProduct

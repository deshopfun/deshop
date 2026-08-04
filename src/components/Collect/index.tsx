import { useSnackPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { CollectType } from '@/utils/types'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { Trash2, Heart, ShoppingCart } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'

const Collect = () => {
  const [collect, setCollect] = useState<CollectType[]>([])
  const [collectProduct, setCollectProduct] = useState<CollectType[]>([])
  // const [collectLive, setCollectLive] = useState<CollectType[]>([]);
  // const [collectChat, setCollectChat] = useState<CollectType[]>([]);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const init = async () => {
    try {
      const response: any = await axios.get(Http.collect)

      if (response.result) {
        const products: CollectType[] = []
        // const lives: CollectType[] = [];
        // const chats: CollectType[] = [];

        response.data?.forEach((item: CollectType) => {
          switch (item.collect_type) {
            case 'product':
              products.push(item)
              break
            // case "live": lives.push(item); break;
            // case "chat": chats.push(item); break;
          }
        })

        setCollect(response.data || [])
        setCollectProduct(products)
        // setCollectLive(lives);
        // setCollectChat(chats);
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
  }

  useEffect(() => {
    init()
  }, [])

  const onClickDelete = async (collectType: string, bindId: number) => {
    try {
      const response: any = await axios.put(Http.collect, {
        collect_type: collectType,
        bind_id: bindId,
      })

      if (response.result) {
        await init()
        setSnackSeverity('success')
        setSnackMessage('Deleted successfully')
        setSnackOpen(true)
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-red-500" />
        <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Products
            <Badge variant="secondary">{collectProduct.length}</Badge>
          </h2>
        </div>

        {collectProduct.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectProduct.map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="relative aspect-square bg-muted">
                  <img
                    src={GetAbosolutePathByRelative(item.image_srcs?.[0], 'avatar')}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    onClick={() => onClickDelete(item.collect_type, item.bind_id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
                    {item.title}
                  </h3>

                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => {
                      window.location.href = `/products/${item.slug || item.bind_id}`
                    }}
                  >
                    View Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-20 text-center">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
              <h3 className="text-2xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Add products you love to your favorites collection.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Collect

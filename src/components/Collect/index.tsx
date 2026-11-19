import { useSnackPresistStore } from '@/lib'
import { useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Heart } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { useShallow } from 'zustand/react/shallow'
import { useCollectList, useToggleCollect } from '@/hooks/queries/useCollect'
import RemoteImage from '@/components/Image/RemoteImage'
import Link from 'next/link'

const Collect = () => {
  const collectQuery = useCollectList(true)
  const toggleCollect = useToggleCollect()

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  useEffect(() => {
    if (collectQuery.isError) {
      setSnackSeverity('error')
      setSnackMessage(
        (collectQuery.error as Error)?.message ||
          'The network error occurred. Please try again later.'
      )
      setSnackOpen(true)
    }
  }, [collectQuery.isError, collectQuery.error, setSnackSeverity, setSnackMessage, setSnackOpen])

  const collectProduct = useMemo(
    () => (collectQuery.data || []).filter((item) => item.collect_type === 'product'),
    [collectQuery.data]
  )

  const onClickDelete = async (collectType: string, bindId: number) => {
    try {
      await toggleCollect.mutateAsync({ collect_type: collectType, bind_id: bindId })
      setSnackSeverity('success')
      setSnackMessage('Deleted successfully')
      setSnackOpen(true)
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage(
        e instanceof Error ? e.message : 'The network error occurred. Please try again later.'
      )
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

        {collectQuery.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : collectProduct.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collectProduct.map((item, index) => (
              <Card
                key={item.bind_id ?? index}
                className="group overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="relative aspect-square bg-muted">
                  <RemoteImage
                    src={GetAbosolutePathByRelative(item.image_srcs?.[0], 'avatar')}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
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
                  <p className="font-semibold text-sm line-clamp-2">{item.title}</p>
                  <p className="text-muted-foreground text-sm line-clamp-3">{item.description}</p>
                  <Button asChild className="w-full mt-2" size="sm">
                    <Link href={`/products/${item.slug || item.bind_id}`}>View Product</Link>
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

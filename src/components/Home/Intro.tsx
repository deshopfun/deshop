import { useSnackPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import { useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductStoryType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, BarChart3, RefreshCw, Package, Layers } from 'lucide-react'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { useShallow } from 'zustand/react/shallow'

const HIGHLIGHTS = [
  {
    icon: ShoppingBag,
    title: 'List any product',
    description: 'Open source tools, templates, or services — publish a listing in minutes.',
  },
  {
    icon: RefreshCw,
    title: 'Zero trading fees',
    description: 'Trading is completely free. Keep 100% of every sale.',
  },
  {
    icon: Package,
    title: 'Get paid directly',
    description: 'Set one payout wallet. Every sale settles straight to your wallet.',
  },
  {
    icon: Layers,
    title: `${CURRENCYS.length}+ currencies`,
    description: 'Accept payment across multiple chains buyers already use.',
  },
  {
    icon: BarChart3,
    title: 'Track performance',
    description: 'See views, orders, and revenue for every product you list.',
  },
]

const Intro = () => {
  const [stories, setStories] = useState<ProductStoryType[]>([])
  const [storiesLoading, setStoriesLoading] = useState(true)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const init = async (signal?: AbortSignal) => {
    try {
      setStoriesLoading(true)

      const response: any = await axios.get(Http.product_story_list, {
        params: {
          limit: 5,
        },
        signal,
      })

      if (response.result) {
        setStories(response.data)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return

      setSnackSeverity('error')
      setSnackMessage('The network error occurred. Please try again later')
      setSnackOpen(true)
      console.error(e)
    } finally {
      setStoriesLoading(false)
    }
  }

  useAbortableEffect((signal) => {
    init(signal)
  }, [])

  return (
    <div className="container mx-auto py-8 flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-8 relative overflow-hidden bg-gradient-to-br from-blue-600 to-sky-400 text-white p-8 sm:p-10 flex flex-col justify-center min-h-[320px]">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4" />
            <div className="absolute top-1/2 right-12 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 hidden lg:block" />

            <div className="relative z-10 flex flex-col items-start gap-4 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/20 shadow-md text-white text-xl font-bold select-none">
                  D
                </div>
                <span className="text-white/80 text-sm">
                  Decentralized open source product display and trading platform
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                List, sell, and get paid in crypto — instantly.
              </h1>

              <p className="text-white/80 text-sm leading-relaxed">
                Publish your product, set your price, and let buyers pay you wallet to wallet. No
                custody, no approval queue, no trading fees — just your product, priced honestly and
                sold directly.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => {
                    window.location.href = '/create'
                  }}
                  className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-6 h-11 gap-2"
                >
                  Go to Create Product
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    window.location.href = '/explore'
                  }}
                  className="text-white hover:bg-white/10 hover:text-white font-semibold px-5 h-11"
                >
                  Browse products
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-5 sm:p-6 bg-white flex flex-col border-t md:border-t-0 md:border-l border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Latest Stories</h2>
              <a
                href="#"
                className="text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors"
              >
                View all
              </a>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto max-h-[425px] pr-1">
              {storiesLoading &&
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex gap-2.5 p-2.5 animate-pulse">
                    <div className="h-9 w-9 rounded-full bg-gray-100 shrink-0" />
                    <div className="min-w-0 flex-1 space-y-2 py-0.5">
                      <div className="h-3 rounded bg-gray-100 w-4/5" />
                      <div className="h-2.5 rounded bg-gray-100 w-2/5" />
                    </div>
                  </div>
                ))}

              {!storiesLoading && stories.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-10 gap-2">
                  <p className="text-sm text-gray-500">No stories yet.</p>
                  <p className="text-xs text-gray-400">
                    Stories from creators will show up here once published.
                  </p>
                </div>
              )}

              {!storiesLoading &&
                stories.length > 0 &&
                stories.map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => (window.location.href = `/story/${item.slug}`)}
                  >
                    <Avatar className="h-9 w-9 shrink-0">
                      {item.cover_image ? (
                        <AvatarImage
                          src={GetAbosolutePathByRelative(item.cover_image)}
                          alt={item.title}
                        />
                      ) : null}
                      <AvatarFallback className="bg-sky-100 text-sky-700 text-xs font-semibold">
                        {item.title ? item.title.charAt(0).toUpperCase() : '?'}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-sky-700 transition-colors leading-snug">
                        {item.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="truncate">{item.username}</span>
                        <span>·</span>
                        <span className="shrink-0">
                          <time dateTime={new Date(item.create_time).toISOString()}>
                            {new Date(item.create_time).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {HIGHLIGHTS.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="border-gray-100 shadow-sm">
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="h-9 w-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Intro

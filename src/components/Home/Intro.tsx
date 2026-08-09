import { useSnackPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductStoryType, StatType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SiteLogo } from '@/components/Logo/SiteLogo'
import { ArrowRight, ShoppingBag, BarChart3, RefreshCw, Package, Layers } from 'lucide-react'
import { useAbortableEffect } from '@/hooks/useAbortableEffect'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GetAbosolutePathByRelative } from '@/utils/image'

const Intro = () => {
  const [stats, setStats] = useState<StatType>()
  const [stories, setStories] = useState<ProductStoryType[]>([])

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)

  // const init = async (signal?: AbortSignal) => {
  //   try {
  //     const response: any = await axios.get(Http.home_stat, { signal })

  //     if (response.result) {
  //       setStats(response.data)
  //     }
  //   } catch (e) {
  //     if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return

  //     setSnackSeverity('error')
  //     setSnackMessage('The network error occurred. Please try again later')
  //     setSnackOpen(true)
  //     console.error(e)
  //   }
  // }

  const init = async (signal?: AbortSignal) => {
    try {
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
    }
  }

  useAbortableEffect((signal) => {
    init(signal)
  }, [])

  const statItems = [
    { icon: ShoppingBag, label: 'Order Number', value: stats?.order_number },
    {
      icon: BarChart3,
      label: 'Trading Volume',
      value: `${CURRENCYS.find((c) => c.name === stats?.currency)?.code}${stats?.trading_volume}`,
    },
    { icon: RefreshCw, label: 'Transaction Number', value: stats?.transaction_number },
    { icon: Package, label: 'Product Number', value: stats?.product_number },
    { icon: Layers, label: 'Product Variants', value: stats?.variant_number },
  ]

  return (
    <div className="container mx-auto py-8 flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* ===== Left: Promo Visual (8/12) ===== */}
          <div className="md:col-span-8 relative overflow-hidden bg-gradient-to-br from-blue-600 to-sky-400 text-white p-8 sm:p-10 flex flex-col justify-center min-h-[320px]">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4" />

            <div className="relative z-10 flex flex-col items-start gap-4 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/20 shadow-md text-white text-xl font-bold select-none">
                  D
                </div>
                <span className="text-white/80 text-sm">
                  Decentralized Digital Exchange Platform
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                List, Sell & Earn with Crypto
              </h1>

              <p className="text-white/80 text-sm leading-relaxed">
                Deshop allows anyone to list their products and conduct online transactions using
                cryptocurrency. Trading is completely free — keep 100% of your profits.
              </p>

              <Button
                onClick={() => {
                  window.location.href = '/create'
                }}
                className="mt-2 bg-white text-blue-600 hover:bg-white/90 font-semibold px-6 h-11 gap-2"
              >
                Go to Create Product
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* ===== Right: Latest Stories (4/12) ===== */}
          <div className="md:col-span-4 p-5 sm:p-6 bg-white flex flex-col border-t md:border-t-0 md:border-l border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Latest Stories</h2>
              {/* <Button
                variant="ghost"
                size="sm"
                className="text-sky-600 hover:text-sky-700 h-7 px-1.5 text-xs"
                onClick={() => (window.location.href = '/stories')}
              >
                View all
                <ArrowRight className="h-3 w-3 ml-0.5" />
              </Button> */}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto max-h-[425px] pr-1">
              {/* Replace with your real stories data */}
              {stories &&
                stories.length > 0 &&
                stories.map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => (window.location.href = `/story/${item.slug}`)}
                  >
                    <Avatar className="h-9 w-9 shrink-0">
                      {item.user_avatar_url ? (
                        <AvatarImage src={GetAbosolutePathByRelative(item.user_avatar_url)} />
                      ) : null}
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

      {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
              <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-sky-500" />
              </div>
              <p className="text-2xl font-bold text-sky-500">{item.value ?? '—'}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div> */}
    </div>
  )
}

export default Intro

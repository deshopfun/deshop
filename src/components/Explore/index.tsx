// import { PRODUCT_TYPE } from '@/packages/constants'
// import { useEffect, useState } from 'react'
// import { GetAbosolutePathByRelative, GetImgSrcByProductType } from '@/utils/image'
// import axios from '@/utils/http/axios'
// import { Http } from '@/utils/http/http'
// import { useSnackPresistStore } from '@/lib'
// import { useRouter } from 'next/router'
// import { CURRENCYS } from '@/packages/constants/currency'
// import { ProductType } from '@/utils/types'

// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Separator } from '@/components/ui/separator'

// import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react'
// import { useShallow } from 'zustand/react/shallow'
// import Link from 'next/link'

// const Explore = () => {
//   const router = useRouter()
//   const type = typeof router.query.type === 'string' ? router.query.type : ''

//   const [showMore, setShowMore] = useState<boolean>(false)
//   const [products, setProducts] = useState<ProductType[]>([])
//   const [currentProductType, setCurrentProductType] = useState<string>(PRODUCT_TYPE.OPENSOURCE)
//   const [isClick, setIsClick] = useState<boolean>(false)

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
//     useShallow((state) => ({
//       setSnackSeverity: state.setSnackSeverity,
//       setSnackMessage: state.setSnackMessage,
//       setSnackOpen: state.setSnackOpen,
//     }))
//   )

//   const init = async (productType: string) => {
//     try {
//       const response: any = await axios.get(Http.product_list, {
//         params: { product_type: productType },
//       })

//       if (response.result) {
//         setProducts(response.data || [])
//       } else {
//         setProducts([])
//       }
//     } catch (e) {
//       setSnackSeverity('error')
//       setSnackMessage('The network error occurred. Please try again later')
//       setSnackOpen(true)
//       console.error(e)
//     }
//   }

//   useEffect(() => {
//     if (!router.isReady) return
//     if (isClick) {
//       setIsClick(false)
//       return
//     }

//     const value = type ? PRODUCT_TYPE[type as keyof typeof PRODUCT_TYPE] : undefined
//     if (value) {
//       setCurrentProductType(value)
//       init(value)
//     } else {
//       init(PRODUCT_TYPE.OPENSOURCE)
//     }
//   }, [router.isReady, type])

//   const handleCategoryClick = (productType: string) => {
//     setIsClick(true)
//     setCurrentProductType(productType)
//     init(productType)

//     router.push({
//       pathname: router.pathname,
//       query: { ...router.query, type: productType },
//     })
//   }

//   const categories = Object.entries(PRODUCT_TYPE)

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="mb-10">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold flex items-center gap-3">
//             <ShoppingBag className="w-8 h-8" />
//             Explore
//           </h1>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {categories.map(([key, value], index) => {
//             const isVisible = index < 12 || showMore
//             if (!isVisible) return null

//             return (
//               <Card
//                 key={key}
//                 className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
//                   currentProductType === value ? 'ring-2 ring-primary' : ''
//                 }`}
//                 onClick={() => handleCategoryClick(value)}
//               >
//                 <div className="aspect-square relative">
//                   <img
//                     src={GetImgSrcByProductType(value)}
//                     alt={value}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                     <p className="text-white font-semibold text-lg">{value}</p>
//                   </div>
//                 </div>
//                 <CardContent className="p-4 text-center">
//                   <p className="font-medium">{value}</p>
//                 </CardContent>
//               </Card>
//             )
//           })}
//         </div>

//         {categories.length > 8 && (
//           <div className="flex justify-center mt-6">
//             <Button variant="outline" onClick={() => setShowMore(!showMore)} className="gap-2">
//               {showMore ? (
//                 <>
//                   Show Less <ChevronUp className="w-4 h-4" />
//                 </>
//               ) : (
//                 <>
//                   Show More <ChevronDown className="w-4 h-4" />
//                 </>
//               )}
//             </Button>
//           </div>
//         )}
//       </div>

//       <Separator className="mb-8" />

//       <div>
//         <div className="flex items-center gap-3 mb-6">
//           <h2 className="text-2xl font-semibold">{currentProductType}</h2>
//           <Badge variant="secondary">{products.length} items</Badge>
//         </div>

//         {products.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//             {products.map((item, index) => {
//               const firstVariant = item.variants?.[0]

//               return (
//                 <Link
//                   key={item.product_id ?? index}
//                   href={`/products/${item.slug || item.product_id}`}
//                   className="block"
//                 >
//                   <Card className="h-full hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
//                     <div className="relative w-full h-48 overflow-hidden bg-[#F1F3F7]">
//                       <img
//                         src={GetAbosolutePathByRelative(item.images?.[0]?.src)}
//                         alt="img"
//                         aria-hidden="true"
//                         className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-60"
//                       />
//                       <img
//                         src={GetAbosolutePathByRelative(item.images?.[0]?.src)}
//                         alt={item.title}
//                         className="relative h-full w-full object-contain"
//                       />
//                     </div>

//                     <CardContent className="p-4 space-y-3">
//                       <p className="font-semibold text-sm line-clamp-2">{item.title}</p>

//                       {item.is_promote === 'true' ? (
//                         <>
//                           <p className="text-muted-foreground text-sm line-clamp-3">
//                             {item.body_html}
//                           </p>
//                         </>
//                       ) : (
//                         <>
//                           {item.variants && item.variants.length > 0 && (
//                             <>
//                               <p className="text-xs text-muted-foreground">
//                                 {item.variants[0].option}
//                               </p>
//                               <div className="flex items-center justify-between mt-1">
//                                 <p className="font-bold text-red-500 text-base">
//                                   {CURRENCYS.find((c) => c.name === item.currency)?.code}
//                                   {item.variants[0].price}
//                                 </p>
//                                 <p className="text-xs text-muted-foreground">
//                                   {item.variants[0].inventory_quantity} in stock
//                                 </p>
//                               </div>
//                             </>
//                           )}
//                         </>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </Link>
//               )
//             })}
//           </div>
//         ) : (
//           <Card>
//             <CardContent className="py-24 text-center">
//               <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
//               <h3 className="text-2xl font-semibold mb-2">No products found</h3>
//               <p className="text-muted-foreground">
//                 {currentProductType} category is currently empty.
//                 <br />
//                 More products will be added soon.
//               </p>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Explore

import { PRODUCT_TYPE } from '@/packages/constants'
import { useEffect, useMemo, useRef, useState } from 'react'
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

import { Check, ChevronDown, ChevronUp, ImageOff, ShoppingBag } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const DEFAULT_VISIBLE = 10

// 每个类型的说明 + 典型例子（也可以挪到 constants 里）
const PRODUCT_TYPE_INFO: Record<string, { desc: string; examples: string[] }> = {
  [PRODUCT_TYPE.OPENSOURCE]: {
    desc: 'Community-built projects whose source code is publicly available.',
    examples: ['Libraries', 'Protocols', 'Self-hosted apps'],
  },
  [PRODUCT_TYPE.AI]: {
    desc: 'Models, agents, and tools powered by artificial intelligence.',
    examples: ['AI agents', 'Model APIs', 'Prompt tools'],
  },
  [PRODUCT_TYPE.INFRASTRUCTURE]: {
    desc: 'Nodes, networks, and core services that other products build on.',
    examples: ['RPC nodes', 'Storage', 'Bridges'],
  },
  [PRODUCT_TYPE.DEVTOOLS]: {
    desc: 'SDKs, libraries, and tooling that make building faster.',
    examples: ['SDKs', 'Testing', 'Deployment'],
  },
  [PRODUCT_TYPE.DEFI]: {
    desc: 'Lending, staking, yield, and other decentralized financial protocols.',
    examples: ['Lending', 'Staking', 'Yield'],
  },
  [PRODUCT_TYPE.EXCHANGE]: {
    desc: 'Exchanges, DEXs, and aggregators for trading digital assets.',
    examples: ['DEX', 'Aggregators', 'Trading bots'],
  },
  [PRODUCT_TYPE.WALLET]: {
    desc: 'Apps and hardware to store, send, and manage your assets.',
    examples: ['Mobile wallets', 'Hardware', 'Multisig'],
  },
  [PRODUCT_TYPE.PAYMENTS]: {
    desc: 'Checkout, invoicing, and payout tools for moving value.',
    examples: ['Checkout', 'Invoicing', 'Payroll'],
  },
  [PRODUCT_TYPE.NFT]: {
    desc: 'Digital collectibles, marketplaces, and creator tools.',
    examples: ['Collections', 'Marketplaces', 'Minting'],
  },
  [PRODUCT_TYPE.RWA]: {
    desc: 'Real-world assets such as property or bonds, represented on-chain.',
    examples: ['Real estate', 'Bonds', 'Commodities'],
  },
  [PRODUCT_TYPE.GAMING]: {
    desc: 'Games, in-game economies, and companion tools for players.',
    examples: ['Games', 'Guilds', 'Companion apps'],
  },
  [PRODUCT_TYPE.SOCIAL]: {
    desc: 'Communities, messaging, and social networks.',
    examples: ['Communities', 'Messaging', 'Social feeds'],
  },
  [PRODUCT_TYPE.MEDIA]: {
    desc: 'Content, streaming, publishing, and creative media.',
    examples: ['Publishing', 'Video', 'Music'],
  },
  [PRODUCT_TYPE.EDUCATION]: {
    desc: 'Courses, tutorials, and learning resources.',
    examples: ['Courses', 'Tutorials', 'Workshops'],
  },
  [PRODUCT_TYPE.PRODUCTIVITY]: {
    desc: 'Tools that help you plan, organize, and get work done.',
    examples: ['Notes', 'Task management', 'Automation'],
  },
  [PRODUCT_TYPE.DAO]: {
    desc: 'Governance, voting, and treasury tools for on-chain organizations.',
    examples: ['Voting', 'Treasury', 'Contributor tools'],
  },
  [PRODUCT_TYPE.IDENTITY]: {
    desc: 'Digital identity, credentials, and verification.',
    examples: ['Login', 'Credentials', 'Reputation'],
  },
  [PRODUCT_TYPE.SECURITY]: {
    desc: 'Audits, protection, and privacy tools that keep assets and data safe.',
    examples: ['Audits', 'Monitoring', 'Privacy'],
  },
  [PRODUCT_TYPE.DATA]: {
    desc: 'Dashboards, indexers, and analytics that make sense of data.',
    examples: ['Dashboards', 'Indexers', 'Reports'],
  },
  [PRODUCT_TYPE.OTHER]: {
    desc: "Everything that doesn't fit the categories above.",
    examples: ['Misc.'],
  },
}

// 同时支持 ?type=DEVTOOLS（key）和 ?type=Developer Tools（value，兼容旧链接）
const resolveType = (q: string): string => {
  if (!q) return PRODUCT_TYPE.OPENSOURCE
  const byKey = PRODUCT_TYPE[q.toUpperCase() as keyof typeof PRODUCT_TYPE]
  if (byKey) return byKey
  const byValue = Object.values(PRODUCT_TYPE).find((v) => v.toLowerCase() === q.toLowerCase())
  return byValue ?? PRODUCT_TYPE.OPENSOURCE
}

const Explore = () => {
  const router = useRouter()
  const type = typeof router.query.type === 'string' ? router.query.type : ''
  const currentProductType = useMemo(() => resolveType(type), [type])
  const info = PRODUCT_TYPE_INFO[currentProductType]

  const [showMore, setShowMore] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const productsRef = useRef<HTMLDivElement>(null)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  // 以 URL 为唯一数据源；cancelled 标记避免快速切换时旧请求覆盖新结果
  useEffect(() => {
    if (!router.isReady) return
    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const response: any = await axios.get(Http.product_list, {
          params: { product_type: currentProductType },
        })
        if (cancelled) return
        setProducts(response.result ? response.data || [] : [])
      } catch (e) {
        if (cancelled) return
        setProducts([])
        setSnackSeverity('error')
        setSnackMessage('The network error occurred. Please try again later')
        setSnackOpen(true)
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()

    return () => {
      cancelled = true
    }
  }, [router.isReady, currentProductType])

  const handleCategoryClick = (key: string) => {
    router.push({ pathname: router.pathname, query: { ...router.query, type: key } }, undefined, {
      shallow: true,
      scroll: false,
    })
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const categories = Object.entries(PRODUCT_TYPE)
  const visibleCategories = showMore ? categories : categories.slice(0, DEFAULT_VISIBLE)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-10">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShoppingBag className="w-8 h-8" />
          Explore
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse products by category. Pick a category to see what it covers.
        </p>
      </div>

      <section className="flex flex-col gap-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleCategories.map(([key, value]) => {
            const active = currentProductType === value
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleCategoryClick(key)}
                aria-pressed={active}
                className={cn(
                  'group relative text-left rounded-2xl border bg-white p-3 transition-all duration-200',
                  'hover:-translate-y-0.5 hover:shadow-md',
                  active
                    ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-sm'
                    : 'border-gray-100 hover:border-sky-200'
                )}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={GetImgSrcByProductType(value)}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{value}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                      {PRODUCT_TYPE_INFO[value]?.desc}
                    </p>
                  </div>
                </div>
                {active && (
                  <span className="absolute top-2 right-2 h-5 w-5 rounded-full bg-sky-500 text-white flex items-center justify-center">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {categories.length > DEFAULT_VISIBLE && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setShowMore((v) => !v)}
              className="gap-2 rounded-xl"
            >
              {showMore ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show all {categories.length} categories <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </section>

      <section ref={productsRef} className="flex flex-col gap-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-white p-5 sm:p-6">
          <img
            src={GetImgSrcByProductType(currentProductType)}
            alt={currentProductType}
            className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-sm"
          />
          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-gray-900">{currentProductType}</h2>
              <Badge variant="secondary">{loading ? '…' : `${products.length} items`}</Badge>
            </div>
            {info && (
              <>
                <p className="text-sm text-gray-600 max-w-2xl">{info.desc}</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-muted-foreground mr-1">Examples:</span>
                  {info.examples.map((ex) => (
                    <Badge key={ex} variant="outline" className="text-xs font-normal bg-white">
                      {ex}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-72 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((item, index) => {
              const cover = item.images?.[0]?.src
              return (
                <Link
                  key={item.product_id ?? index}
                  href={`/products/${item.slug || item.product_id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
                    <div className="relative w-full h-48 overflow-hidden bg-[#F1F3F7]">
                      {cover ? (
                        <>
                          <img
                            src={GetAbosolutePathByRelative(cover)}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-60"
                          />
                          <img
                            src={GetAbosolutePathByRelative(cover)}
                            alt={item.title}
                            className="relative h-full w-full object-contain"
                          />
                        </>
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-300">
                          <ImageOff className="h-8 w-8" />
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4 space-y-3">
                      <p className="font-semibold text-sm line-clamp-2">{item.title}</p>

                      {item.is_promote === 'true' ? (
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {item.body_html}
                        </p>
                      ) : (
                        item.variants &&
                        item.variants.length > 0 && (
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
                        )
                      )}
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-20 text-center">
              <ShoppingBag className="w-14 h-14 mx-auto text-muted-foreground mb-5" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground text-sm">
                {currentProductType} is currently empty.
                <br />
                Try another category, or be the first to list one here.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}

export default Explore

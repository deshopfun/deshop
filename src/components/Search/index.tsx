import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ChevronRight, Search as SearchIcon } from 'lucide-react'
import { Http } from '@/utils/http/http'
import { useSnackPresistStore } from '@/lib'
import { ProductType, ProfileType, SearchType } from '@/utils/types'
import { GetAbosolutePathByRelative } from '@/utils/image'

type Tab = 'products' | 'profiles'

const PAGE_SIZE = 20

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value
  )
}

const Search = () => {
  const router = useRouter()
  const q = typeof router.query.q === 'string' ? router.query.q : ''
  const initialTab: Tab = router.query.type === 'profiles' ? 'profiles' : 'products'

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const [inputValue, setInputValue] = useState(q)
  const [tab, setTab] = useState<Tab>(initialTab)
  const [products, setProducts] = useState<ProductType[]>([])
  const [profiles, setProfiles] = useState<ProfileType[]>([])
  const [productsTotal, setProductsTotal] = useState(0)
  const [profilesTotal, setProfilesTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    setInputValue(q)
  }, [q])

  const switchTab = (next: Tab) => {
    setTab(next)
    router.replace({ pathname: '/search', query: { q, type: next } }, undefined, { shallow: true })
  }

  const init = async (searchQuery: string, searchType: Tab, offset: number) => {
    const trimmed = searchQuery.trim()
    if (!trimmed) {
      setProducts([])
      setProfiles([])
      setProductsTotal(0)
      setProfilesTotal(0)
      setLoading(false)
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    offset === 0 ? setLoading(true) : setLoadingMore(true)

    try {
      const response: any = await axios.get(Http.search, {
        params: { q: trimmed, type: searchType, limit: PAGE_SIZE, offset },
        signal: controller.signal,
      })

      if (response.result) {
        const payload: SearchType = response.data ?? {}
        if (searchType === 'products') {
          setProducts((prev) =>
            offset === 0 ? (payload.products ?? []) : [...prev, ...(payload.products ?? [])]
          )
          setProductsTotal(payload.total_product ?? 0)
        } else {
          setProfiles((prev) =>
            offset === 0 ? (payload.profiles ?? []) : [...prev, ...(payload.profiles ?? [])]
          )
          setProfilesTotal(payload.total_profile ?? 0)
        }
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      if (axios.isCancel(e) || (e as any)?.code === 'ERR_CANCELED') return

      setSnackSeverity('error')
      setSnackMessage('Network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    init(q, tab, 0)
  }, [q, tab, router.isReady])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    if (!trimmed) return
    router.push({ pathname: '/search', query: { q: trimmed, type: tab } })
  }

  const loadMore = () => {
    const offset = tab === 'products' ? products.length : profiles.length
    init(q, tab, offset)
  }

  const currentTotal = tab === 'products' ? productsTotal : profilesTotal
  const currentList = tab === 'products' ? products : profiles
  const hasMore = currentList.length < currentTotal

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search products, profiles..."
            className="w-full h-12 rounded-lg bg-white border border-gray-200 pl-12 pr-4 text-base outline-none focus:border-gray-400 placeholder:text-gray-400"
          />
        </form>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">
            {q ? (
              <>
                Results for &ldquo;{q}&rdquo;
                {!loading && (
                  <span className="text-gray-400 font-normal">
                    {' '}
                    &middot; {formatCompactNumber(currentTotal)} {tab}
                  </span>
                )}
              </>
            ) : (
              'Search'
            )}
          </h1>
        </div>

        <div className="flex items-center gap-2 mb-6 border-b border-gray-200">
          {(['products', 'profiles'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => switchTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
                tab === t
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && (
          <div className="space-y-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-5 border-b border-gray-100 animate-pulse"
              >
                <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-64 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        )}

        {!loading && q && currentList.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-500">
              No {tab} found for &ldquo;{q}&rdquo;
            </p>
            <p className="text-gray-400 text-sm mt-1">Try a different search term.</p>
          </div>
        )}

        {!loading && tab === 'products' && products.length > 0 && (
          <div>
            {products.map((m) => (
              <button
                key={m.product_id}
                type="button"
                onClick={() => router.push(`/products/${m.slug ? m.slug : m.product_id}`)}
                className="w-full flex items-center gap-4 py-5 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors px-2 -mx-2 rounded"
              >
                {m.images && m.images[0].src ? (
                  <img
                    src={GetAbosolutePathByRelative(m.images[0].src)}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-gray-100"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 truncate">{m.title}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-xs font-bold leading-none">{m.product_type}</p>
                    {m.tags && <p className="text-sm text-gray-400 mt-1">{m.tags}</p>}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        )}

        {!loading && tab === 'profiles' && profiles.length > 0 && (
          <div>
            {profiles.map((p) => (
              <button
                key={p.uuid}
                type="button"
                onClick={() => router.push(`/profile/${p.username}`)}
                className="w-full flex items-center gap-4 py-5 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors px-2 -mx-2 rounded"
              >
                {p.avatar_url ? (
                  <img
                    src={GetAbosolutePathByRelative(p.avatar_url, 'avatar')}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover shrink-0 border border-gray-100"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 truncate">
                    {p.username || p.username}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                    <span>@{p.username}</span>
                    <span>{p.bio}</span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
              </button>
            ))}
          </div>
        )}

        {!loading && hasMore && (
          <div className="flex justify-center py-8">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              {loadingMore ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search

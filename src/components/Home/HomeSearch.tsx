import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Search as SearchIcon, X } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import RemoteImage from '@/components/Image/RemoteImage'
import { useSnackPresistStore } from '@/lib'
import { useShallow } from 'zustand/react/shallow'
import { useSearchAll } from '@/hooks/queries/useSearch'

type Tab = 'products' | 'profiles'

const DEBOUNCE_MS = 250

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

const HomeSearch = () => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('products')

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS)
  const searchQuery = useSearchAll(debouncedQuery, open)
  const data = searchQuery.data ?? {
    products: [],
    profiles: [],
    total_product: 0,
    total_profile: 0,
  }
  const loading = searchQuery.isFetching

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.isError) {
      setSnackSeverity('error')
      setSnackMessage(
        (searchQuery.error as Error)?.message ||
          'Network error occurred. Please try again later.'
      )
      setSnackOpen(true)
    }
  }, [searchQuery.isError, searchQuery.error, setSnackSeverity, setSnackMessage, setSnackOpen])

  const goToFullResults = () => {
    if (!query.trim()) return
    setOpen(false)
    router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${tab}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') goToFullResults()
    if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  const hasAnyResult = (data.products?.length ?? 0) > 0 || (data.profiles?.length ?? 0) > 0

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, profiles..."
          className="h-11 w-full rounded-md border border-gray-200 bg-white pl-10 pr-9 text-base outline-none focus:border-gray-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            aria-label="clear"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-gray-200 bg-white text-gray-900 shadow-xl overflow-hidden z-30">
          <div className="flex items-center gap-2 px-4 pt-3">
            {(['products', 'profiles'] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                  tab === t ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="px-2 py-3 max-h-[60vh] overflow-y-auto">
            {!loading && !query.trim() && (
              <p className="px-2 py-6 text-center text-sm text-gray-400">
                Start typing to search products and profiles
              </p>
            )}
            {!loading && query.trim() && !hasAnyResult && (
              <p className="px-2 py-6 text-center text-sm text-gray-400">No results found</p>
            )}

            {tab === 'products' &&
              data.products?.map((m) => (
                <button
                  key={m.product_id}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    router.push(`/products/${m.slug ? m.slug : m.product_id}`)
                  }}
                  className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 text-left"
                >
                  {m.images && m.images[0].src ? (
                    <RemoteImage
                      src={GetAbosolutePathByRelative(m.images[0].src)}
                      alt=""
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-100"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
                  )}
                  <span className="flex-1 min-w-0 text-sm truncate">{m.title}</span>
                  <span className="text-right shrink-0">
                    <span className="block text-xs font-semibold leading-none text-gray-900">
                      {m.product_type}
                    </span>
                    {m.tags && <span className="block text-xs text-gray-400 mt-0.5">{m.tags}</span>}
                  </span>
                </button>
              ))}

            {tab === 'profiles' &&
              data.profiles?.map((p) => (
                <button
                  key={p.uuid}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    router.push(`/profile/${p.username}`)
                  }}
                  className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 text-left"
                >
                  {p.avatar_url ? (
                    <RemoteImage
                      src={GetAbosolutePathByRelative(p.avatar_url, 'avatar')}
                      alt=""
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-100"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
                  )}
                  <span className="min-w-0">
                    <span className="block text-sm truncate text-gray-900">{p.username}</span>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span>@{p.username}</span>
                      <span>{p.bio}</span>
                    </div>
                  </span>
                </button>
              ))}
          </div>

          {query.trim() && (
            <div className="px-4 py-3 border-t border-gray-100">
              <button
                type="button"
                onClick={goToFullResults}
                className="text-sm text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
              >
                See all results
                <span aria-hidden>→</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HomeSearch

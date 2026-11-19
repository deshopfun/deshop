import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { SearchType } from '@/utils/types'

export const PAGE_SIZE = 20

export const searchKeys = {
  all: (q: string) => ['search', 'all', q] as const,
  typed: (q: string, type: string) => ['search', type, q] as const,
}

const emptySearch = (): SearchType => ({
  products: [],
  profiles: [],
  total_product: 0,
  total_profile: 0,
})

export function useSearchAll(query: string, enabled = true) {
  const trimmed = query.trim()
  return useQuery({
    queryKey: searchKeys.all(trimmed),
    enabled: enabled && trimmed.length > 0,
    queryFn: async () => {
      const response = (await axios.get(Http.search, {
        params: { q: trimmed, type: 'all' },
      })) as ApiResponse<SearchType>
      if (!response.result) throw new Error(response.message || 'Search failed')
      return response.data || emptySearch()
    },
  })
}

export function useSearchTyped(
  query: string,
  type: 'products' | 'profiles',
  enabled = true
) {
  const trimmed = query.trim()
  return useInfiniteQuery({
    queryKey: searchKeys.typed(trimmed, type),
    enabled: enabled && trimmed.length > 0,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const response = (await axios.get(Http.search, {
        params: { q: trimmed, type, limit: PAGE_SIZE, offset: pageParam },
      })) as ApiResponse<SearchType>
      if (!response.result) throw new Error(response.message || 'Search failed')
      return response.data || emptySearch()
    },
    getNextPageParam: (lastPage, pages) => {
      if (type === 'products') {
        const loaded = pages.reduce((n, p) => n + (p.products?.length ?? 0), 0)
        const total = lastPage.total_product ?? 0
        return loaded < total ? loaded : undefined
      }
      const loaded = pages.reduce((n, p) => n + (p.profiles?.length ?? 0), 0)
      const total = lastPage.total_profile ?? 0
      return loaded < total ? loaded : undefined
    },
  })
}

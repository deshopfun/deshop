import { useInfiniteQuery } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductType } from '@/utils/types'
import { queryKeys } from '@/lib/queryClient'
import type { ApiResponse } from '@/utils/http/types'

const PAGE_SIZE = 20

type ProductListParams = {
  productType?: string
  excludeId?: number
  pageSize?: number
}

async function fetchProductPage(
  { productType, excludeId, pageSize = PAGE_SIZE }: ProductListParams,
  pageNum: number
): Promise<ProductType[]> {
  const params: Record<string, string | number> = {
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
  }

  if (productType && productType !== 'ALL') {
    params.product_type = productType
  }
  if (excludeId) {
    params.exclude_id = excludeId
  }

  const response = (await axios.get(Http.product_list, {
    params,
  })) as ApiResponse<ProductType[]>
  if (!response.result) return []
  return response.data || []
}

export function useProductListInfinite(productType: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.products.infinite(productType),
    queryFn: ({ pageParam }) => fetchProductPage({ productType }, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.length >= PAGE_SIZE ? lastPageParam + 1 : undefined,
  })
}

export function useRecommendedProducts({
  productType,
  excludeId,
  pageSize = 5,
  enabled = true,
}: ProductListParams & { enabled?: boolean }) {
  return useInfiniteQuery({
    queryKey: [
      ...queryKeys.products.infinite(productType || 'ALL'),
      'recommended',
      excludeId ?? 0,
      pageSize,
    ],
    enabled,
    queryFn: ({ pageParam }) =>
      fetchProductPage({ productType, excludeId, pageSize }, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.length >= pageSize ? lastPageParam + 1 : undefined,
  })
}

export { PAGE_SIZE }

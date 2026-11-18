import { useInfiniteQuery } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductType } from '@/utils/types'
import { queryKeys } from '@/lib/queryClient'
import type { ApiResponse } from '@/utils/http/types'

const PAGE_SIZE = 20

async function fetchProductPage(productType: string, pageNum: number): Promise<ProductType[]> {
  const params: Record<string, string | number> = {
    limit: PAGE_SIZE,
    offset: (pageNum - 1) * PAGE_SIZE,
  }

  if (productType && productType !== 'ALL') {
    params.product_type = productType
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
    queryFn: ({ pageParam }) => fetchProductPage(productType, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.length >= PAGE_SIZE ? lastPageParam + 1 : undefined,
  })
}

export { PAGE_SIZE }

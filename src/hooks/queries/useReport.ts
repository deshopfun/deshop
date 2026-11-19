import { useMutation, useQuery } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { ProductType } from '@/utils/types'

export const reportKeys = {
  product: (id: string) => ['report', 'product', id] as const,
}

export function useReportProduct(id: string, enabled = true) {
  return useQuery({
    queryKey: reportKeys.product(id),
    enabled: enabled && !!id,
    queryFn: async () => {
      const isNumericId = /^\d+$/.test(String(id))
      const response = (await axios.get(Http.product_by_id, {
        params: isNumericId ? { product_id: id } : { slug: id },
      })) as ApiResponse<ProductType>
      if (!response.result) throw new Error(response.message || 'Failed to load product')
      return response.data
    },
  })
}

export function useSubmitReport() {
  return useMutation({
    mutationFn: async (payload: {
      report_type: string
      bind_id: number
      select: string
      detail: string
    }) => {
      const response = (await axios.post(Http.report, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Failed to submit report')
      return response
    },
  })
}

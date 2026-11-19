import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { ProductVariantType } from '@/utils/types'

export const productVariantKeys = {
  byOption: (productId: number, option: string) =>
    ['product', 'variant', productId, option] as const,
  byProduct: (productId: number) => ['product', 'variant', productId] as const,
}

export function useProductVariant(productId: number, option: string, enabled = true) {
  return useQuery({
    queryKey: productVariantKeys.byOption(productId, option),
    enabled: enabled && !!productId && !!option,
    queryFn: async () => {
      const response = (await axios.get(Http.product_variant, {
        params: { product_id: productId, option },
      })) as ApiResponse<ProductVariantType>
      if (!response.result) return null
      return response.data
    },
  })
}

export function useSaveProductVariant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const response = (await axios.post(Http.product_variant, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: (_data, variables) => {
      const productId = variables.product_id
      if (typeof productId === 'number') {
        void queryClient.invalidateQueries({ queryKey: productVariantKeys.byProduct(productId) })
      }
    },
  })
}

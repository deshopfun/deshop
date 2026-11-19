import { useMutation } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { ProductImageType, ProductOptionType } from '@/utils/types'

export type CreateProductPayload = {
  title: string
  slug: string
  body_html: string
  product_type: string
  tags: string
  vendor: string
  images: ProductImageType[]
  options: ProductOptionType[]
  is_promote: string
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (payload: CreateProductPayload) => {
      const response = (await axios.post(Http.product, payload)) as ApiResponse<{ slug: string }>
      if (!response.result || !response.data?.slug) {
        throw new Error(response.message || 'Create failed')
      }
      return response.data
    },
  })
}

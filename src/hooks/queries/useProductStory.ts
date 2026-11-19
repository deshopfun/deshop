import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { ProductStoryType } from '@/utils/types'

export const productStoryKeys = {
  byProduct: (productId: number) => ['product', 'story', productId] as const,
}

export function useProductStory(productId: number, enabled = true) {
  return useQuery({
    queryKey: productStoryKeys.byProduct(productId),
    enabled: enabled && !!productId,
    queryFn: async () => {
      const response = (await axios.get(Http.product_story, {
        params: { product_id: productId },
      })) as ApiResponse<Partial<ProductStoryType>>
      if (!response.result) return null
      return response.data ?? null
    },
  })
}

export function useSaveProductStory(productId?: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: {
      product_id: number
      slug: string
      title: string
      sub_title: string
      body_html: string
      cover_image: string
      cover_image_caption: string
      story_status: string
    }) => {
      const response = (await axios.post(Http.product_story, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: (_data, variables) => {
      const id = productId ?? variables.product_id
      void queryClient.invalidateQueries({ queryKey: productStoryKeys.byProduct(id) })
    },
  })
}

import { useMutation, useQuery } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { RatingType } from '@/utils/types'

export const productRatingKeys = {
  byProduct: (productId: number, sortBy: string, ratingNumber: number) =>
    ['product', 'ratings', productId, sortBy, ratingNumber] as const,
}

export function useProductRatings(
  productId: number,
  sortBy: string,
  ratingFilter: string,
  enabled = true
) {
  const ratingNumber = !isNaN(parseInt(ratingFilter)) ? parseInt(ratingFilter) : 0
  return useQuery({
    queryKey: productRatingKeys.byProduct(productId, sortBy, ratingNumber),
    enabled: enabled && !!productId,
    queryFn: async () => {
      const response = (await axios.get(Http.product_rating_by_id, {
        params: {
          product_id: productId,
          sort_by: sortBy || undefined,
          rating_number: ratingNumber,
        },
      })) as ApiResponse<RatingType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load ratings')
      return response.data || []
    },
  })
}

export function useSubmitProductRating() {
  return useMutation({
    mutationFn: async (payload: {
      number?: number
      body?: string
      image?: string
      order_id?: number
      ratings?: unknown[]
    }) => {
      const response = (await axios.post(Http.product_rating, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Failed to post rating')
      return response
    },
  })
}

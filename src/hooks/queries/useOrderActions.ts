import { useMutation } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'

export function useConfirmOrder() {
  return useMutation({
    mutationFn: async (payload: { order_id: number; confirm_number: string }) => {
      const response = (await axios.put(Http.order_confirm, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Confirmation failed')
      return response
    },
  })
}

export function useConfirmPayment() {
  return useMutation({
    mutationFn: async (payload: {
      order_id: number
      confirm_payment_id: number
      confirm_number: string
    }) => {
      const response = (await axios.put(Http.order_confirm_payment, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Confirmation failed')
      return response
    },
  })
}

export function useConfirmShipping() {
  return useMutation({
    mutationFn: async (payload: { order_id: number; confirm_number: string }) => {
      const response = (await axios.put(
        Http.order_confirm_shipping,
        payload
      )) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Confirmation failed')
      return response
    },
  })
}

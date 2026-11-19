import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { BLOCKCHAIN, BLOCKCHAINNAMES } from '@/packages/constants'
import { OrderType, TransactionType } from '@/utils/types'
import { queryKeys } from '@/lib/queryClient'
import type { ApiResponse } from '@/utils/http/types'
import {
  isTerminalStep,
  POLL_INTERVAL_MS,
  REFUNDED_STATUSES,
  statusToStep,
  VOIDED_STATUSES,
} from '@/utils/paymentStatus'

export {
  CONFIRMING_TX_STATUS,
  FAILED_STEP,
  FAILED_TX_STATUSES,
  isTerminalStep,
  PENDING_TX_STATUS,
  POLL_INTERVAL_MS,
  REFUNDED_STATUSES,
  statusToStep,
  SUCCESS_TX_STATUS,
  VOIDED_STATUSES,
} from '@/utils/paymentStatus'

export type OrderPaymentData = {
  order: OrderType
  blockchains: BLOCKCHAIN[]
  orderClosed: boolean
  activeStep: number
}

export async function fetchOrderPayment(orderId: string): Promise<OrderPaymentData> {
  const response = (await axios.get(Http.order_by_id, {
    params: { order_id: Number(orderId) },
  })) as ApiResponse<OrderType>

  if (!response.result) {
    throw new Error(response.message ?? 'Failed to load order')
  }

  const newBlockchains: BLOCKCHAIN[] = BLOCKCHAINNAMES.reduce((acc: BLOCKCHAIN[], chain) => {
    const wallet = response.data.wallets?.find((w) => w.chain_id === chain.chainId)
    if (wallet?.address) {
      const disabled = new Set(wallet.disable_coin.split(',').filter(Boolean))
      const coins = chain.coins.filter((coin) => !disabled.has(coin.name))
      if (coins.length > 0) {
        acc.push({ ...chain, coins })
      }
    }
    return acc
  }, [])

  const closed =
    VOIDED_STATUSES.includes(response.data.financial_status) ||
    REFUNDED_STATUSES.includes(response.data.financial_status)

  let activeStep = 0
  if (!closed) {
    const tx =
      response.data.transactions?.find((item: TransactionType) => item.select === 'true') ??
      response.data.transactions?.find(
        (item: TransactionType) => item.transaction_model === 'default'
      )
    activeStep = statusToStep(tx?.transaction_status)
  }

  return {
    order: response.data,
    blockchains: newBlockchains,
    orderClosed: closed,
    activeStep,
  }
}

export function useOrderPayment(orderId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.order.detail(orderId),
    queryFn: () => fetchOrderPayment(orderId),
    enabled: enabled && !!orderId,
    refetchInterval: (query) => {
      const step = query.state.data?.activeStep
      if (step === undefined) return POLL_INTERVAL_MS
      return isTerminalStep(step) || query.state.data?.orderClosed ? false : POLL_INTERVAL_MS
    },
  })
}

export function useOrderById(orderId: string, enabled = true) {
  return useQuery({
    queryKey: [...queryKeys.order.detail(orderId), 'plain'] as const,
    enabled: enabled && !!orderId,
    queryFn: async () => {
      const response = (await axios.get(Http.order_by_id, {
        params: { order_id: Number(orderId) },
      })) as ApiResponse<OrderType>
      if (!response.result) throw new Error(response.message || 'Failed to load order')
      return response.data
    },
  })
}

export function useSelectPaymentMethod(orderId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { order_id: number; chain_id: number; coin: string }) => {
      const res = (await axios.post(Http.transaction, payload)) as ApiResponse<unknown>
      if (!res.result) throw new Error(res.message ?? 'Failed to select payment method')
      return res
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.order.detail(orderId) })
    },
  })
}

export function usePastePaymentTxId(orderId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { order_id: number; txid: string }) => {
      const res = (await axios.post(Http.transaction_paste_tx_id, payload)) as ApiResponse<unknown>
      if (!res.result) throw new Error(res.message || 'Failed to submit transaction')
      return res
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.order.detail(orderId) })
    },
  })
}

export type CreateOrderPayload = {
  seller_uuid: string
  items: { product_id: number; slug: string; option: string; quantity: number }[]
  landing_site: string
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const response = (await axios.post(Http.order, payload)) as ApiResponse<{
        order_id: number | string
      }>
      if (!response.result || !response.data?.order_id) {
        throw new Error(response.message || 'Payment failed')
      }
      return response.data
    },
  })
}

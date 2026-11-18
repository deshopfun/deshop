import { useQuery } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { BLOCKCHAIN, BLOCKCHAINNAMES } from '@/packages/constants'
import { TransactionType } from '@/utils/types'
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
  order: any
  blockchains: BLOCKCHAIN[]
  orderClosed: boolean
  activeStep: number
}

export async function fetchOrderPayment(orderId: string): Promise<OrderPaymentData> {
  const response = (await axios.get(Http.order_by_id, {
    params: { order_id: Number(orderId) },
  })) as ApiResponse<any>

  if (!response.result) {
    throw new Error(response.message ?? 'Failed to load order')
  }

  const newBlockchains: BLOCKCHAIN[] = BLOCKCHAINNAMES.reduce((acc: BLOCKCHAIN[], chain) => {
    const wallet = response.data.wallets?.find(
      (w: { chain_id: number; address?: string; disable_coin?: string[] }) =>
        w.chain_id === chain.chainId
    )
    if (wallet?.address) {
      const coins = chain.coins.filter((coin) => !wallet.disable_coin?.includes(coin.name))
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

import { useQuery } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { BlockchainOrderType } from '@/utils/types'
import type { CHAINIDS } from '@/packages/constants'

export const blockchainKeys = {
  orders: (chainId: CHAINIDS | number) => ['blockchain', 'orders', chainId] as const,
}

export function useBlockchainOrders(chainId: CHAINIDS | number, enabled = true) {
  return useQuery({
    queryKey: blockchainKeys.orders(chainId),
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.blockchainOrder, {
        params: { chain_id: Number(chainId) },
      })) as ApiResponse<BlockchainOrderType>
      if (!response.result) return undefined
      return response.data
    },
  })
}

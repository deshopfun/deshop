import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type {
  AddressType,
  OrderType,
  ProductType,
  TransactionType,
  UserType,
  WalletType,
} from '@/utils/types'
import type { CHAINIDS } from '@/packages/constants'

export const manageKeys = {
  products: ['manage', 'products'] as const,
  wallets: ['manage', 'wallets'] as const,
  orders: (kind: string) => ['manage', 'orders', kind] as const,
  addresses: (kind: string) => ['manage', 'addresses', kind] as const,
  transactions: ['manage', 'transactions'] as const,
  user: ['manage', 'user'] as const,
}

export function useManageProducts(enabled = true) {
  return useQuery({
    queryKey: manageKeys.products,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.product)) as ApiResponse<ProductType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load products')
      return response.data ?? []
    },
  })
}

export function useManageWallets(enabled = true) {
  return useQuery({
    queryKey: manageKeys.wallets,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.wallet)) as ApiResponse<WalletType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load wallets')
      return response.data ?? []
    },
  })
}

export function useManageOrders(kind: 'buy' | 'sell', enabled = true) {
  return useQuery({
    queryKey: manageKeys.orders(kind),
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.order, {
        params: { kind },
      })) as ApiResponse<OrderType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load orders')
      return response.data ?? []
    },
  })
}

export function useManageAddresses(kind: 'received' | 'delivery', enabled = true) {
  return useQuery({
    queryKey: manageKeys.addresses(kind),
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.address, {
        params: { kind },
      })) as ApiResponse<AddressType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load addresses')
      return response.data ?? []
    },
  })
}

export function useManageTransactions(enabled = true) {
  return useQuery({
    queryKey: manageKeys.transactions,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.transaction)) as ApiResponse<TransactionType[]>
      if (!response.result) throw new Error(response.message || 'Failed to load transactions')
      return response.data ?? []
    },
  })
}

export function useManageUser(enabled = true) {
  return useQuery({
    queryKey: manageKeys.user,
    enabled,
    queryFn: async () => {
      const response = (await axios.get(Http.user_manage)) as ApiResponse<UserType>
      if (!response.result) throw new Error(response.message || 'Failed to load manage profile')
      return response.data
    },
  })
}

export function useUpdateWalletCoin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: {
      chain_id: CHAINIDS
      disable_coin: string
    }) => {
      const response = (await axios.put(Http.wallet, {
        handle: 'false',
        ...payload,
      })) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: manageKeys.wallets })
    },
  })
}

export function useBindWalletAddress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { chain_id: CHAINIDS; address: string }) => {
      const response = (await axios.put(Http.wallet, {
        handle: 'true',
        ...payload,
      })) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Failed to bind address')
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: manageKeys.wallets })
    },
  })
}

export function useSetDefaultAddress(kind: 'received' | 'delivery') {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { address_id: number; is_default: string }) => {
      const response = (await axios.put(Http.address, payload)) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Update failed')
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: manageKeys.addresses(kind) })
    },
  })
}

export function useDeleteAddress(kind: 'received' | 'delivery') {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (address_id: number) => {
      const response = (await axios.delete(Http.address, {
        params: { address_id },
      })) as ApiResponse<unknown>
      if (!response.result) throw new Error(response.message || 'Delete failed')
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: manageKeys.addresses(kind) })
    },
  })
}

export type AddressPayload = {
  first_name: string
  last_name: string
  email: string
  company: string
  phone: string
  country: string
  country_code: string
  city: string
  province: string
  province_code: string
  zip: string
  address_one: string
  address_two: string
}

export function useSaveAddress(kind: 'received' | 'delivery') {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      handle: 1 | 2
      address_id?: number
      payload: AddressPayload
    }) => {
      let response: ApiResponse<unknown>
      if (input.handle === 1) {
        response = (await axios.post(Http.address, {
          ...input.payload,
          kind,
        })) as ApiResponse<unknown>
      } else {
        response = (await axios.put(Http.address, {
          ...input.payload,
          address_id: input.address_id,
        })) as ApiResponse<unknown>
      }
      if (!response.result) throw new Error(response.message || 'Save failed')
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: manageKeys.addresses(kind) })
    },
  })
}

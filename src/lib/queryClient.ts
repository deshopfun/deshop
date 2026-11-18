import { QueryClient } from '@tanstack/react-query'

export function createAppQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  })
}

export const queryKeys = {
  products: {
    list: (productType: string, page: number) =>
      ['products', 'list', productType, page] as const,
    infinite: (productType: string) => ['products', 'infinite', productType] as const,
    detail: (id: string, isLogin: boolean) => ['products', 'detail', id, isLogin] as const,
    variant: (productId: number | string, option: string) =>
      ['products', 'variant', productId, option] as const,
  },
  order: {
    detail: (orderId: string) => ['orders', 'detail', orderId] as const,
  },
}

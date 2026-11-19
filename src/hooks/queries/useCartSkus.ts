import { useQuery } from '@tanstack/react-query'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import type { ApiResponse } from '@/utils/http/types'
import type { CartSkuInfo } from '@/utils/types'

export type CartSkuItem = { product_id: number; option: string }

export const cartSkuKeys = {
  byItems: (items: CartSkuItem[]) =>
    ['cart', 'skus', items.map((i) => `${i.product_id}|${i.option}`).sort().join(',')] as const,
}

export async function fetchCartSkus(items: CartSkuItem[]): Promise<Record<string, CartSkuInfo>> {
  if (items.length === 0) return {}
  const res = (await axios.post(Http.product_variant_by_option_list, {
    items,
  })) as ApiResponse<CartSkuInfo[]>
  if (!res.result) throw new Error(res.message || 'Failed to load cart SKUs')
  const map: Record<string, CartSkuInfo> = {}
  ;(res.data ?? []).forEach((sku) => {
    map[`${sku.product_id}|${sku.option}`] = sku
  })
  return map
}

export function useCartSkus(items: CartSkuItem[], enabled = true) {
  return useQuery({
    queryKey: cartSkuKeys.byItems(items),
    enabled: enabled && items.length > 0,
    queryFn: () => fetchCartSkus(items),
  })
}

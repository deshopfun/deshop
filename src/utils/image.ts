import { PRODUCT_TYPE } from '@/packages/constants'
import { Http } from './http/http'

export function GetAbosolutePathByRelative(
  src: string | undefined,
  type: 'image' | 'avatar' = 'image'
): string {
  if (!src || src == '')
    return type == 'image' ? '/images/default_image.png' : '/images/default_avatar.png'
  return Http.baseHttpPath + src
}

const PRODUCT_TYPE_IMAGE: Record<string, string> = {
  [PRODUCT_TYPE.OPENSOURCE]: 'open-source',
  [PRODUCT_TYPE.AI]: 'ai',
  [PRODUCT_TYPE.INFRASTRUCTURE]: 'infrastructure',
  [PRODUCT_TYPE.DEVTOOLS]: 'developer-tools',
  [PRODUCT_TYPE.DEFI]: 'defi',
  [PRODUCT_TYPE.EXCHANGE]: 'exchange',
  [PRODUCT_TYPE.WALLET]: 'wallet',
  [PRODUCT_TYPE.PAYMENTS]: 'payments',
  [PRODUCT_TYPE.NFT]: 'nft',
  [PRODUCT_TYPE.RWA]: 'rwa',
  [PRODUCT_TYPE.GAMING]: 'gaming',
  [PRODUCT_TYPE.SOCIAL]: 'social',
  [PRODUCT_TYPE.MEDIA]: 'media',
  [PRODUCT_TYPE.EDUCATION]: 'education',
  [PRODUCT_TYPE.PRODUCTIVITY]: 'productivity',
  [PRODUCT_TYPE.DAO]: 'dao',
  [PRODUCT_TYPE.IDENTITY]: 'identity',
  [PRODUCT_TYPE.SECURITY]: 'security',
  [PRODUCT_TYPE.DATA]: 'data',
  [PRODUCT_TYPE.OTHER]: 'other',
}

export function GetImgSrcByProductType(type: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const name = PRODUCT_TYPE_IMAGE[type] ?? PRODUCT_TYPE_IMAGE[PRODUCT_TYPE.OTHER]
  return `${baseUrl}/images/product/${name}.svg`
}

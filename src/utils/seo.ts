import { SITE_URL } from '@/packages/constants/general'

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function getSiteOrigin(): string {
  if (SITE_URL) return SITE_URL
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin
  return 'https://deshop.space'
}

export function toAbsoluteUrl(pathOrUrl: string, origin = getSiteOrigin()): string {
  if (!pathOrUrl) return origin
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  return `${origin}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

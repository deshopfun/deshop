import type { NextRouter } from 'next/router'

/** Open absolute http(s) URLs in a new tab; otherwise client-route with Next.js. */
export function navigateTo(router: NextRouter, url: string | undefined | null) {
  if (!url) return
  if (/^https?:\/\//i.test(url)) {
    window.open(url, '_blank', 'noopener,noreferrer')
    return
  }
  void router.push(url)
}

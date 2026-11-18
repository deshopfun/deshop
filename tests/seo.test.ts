import { describe, expect, it } from 'vitest'
import { safeJsonLd, toAbsoluteUrl } from '@/utils/seo'

describe('safeJsonLd', () => {
  it('escapes < to prevent script breakout', () => {
    const html = safeJsonLd({ name: '</script><img src=x onerror=alert(1)>' })
    expect(html).not.toContain('</script>')
    expect(html).toContain('\\u003c')
  })
})

describe('toAbsoluteUrl', () => {
  it('keeps absolute urls', () => {
    expect(toAbsoluteUrl('https://cdn.example/a.png', 'https://deshop.space')).toBe(
      'https://cdn.example/a.png'
    )
  })

  it('joins relative paths', () => {
    expect(toAbsoluteUrl('/products/1', 'https://deshop.space')).toBe(
      'https://deshop.space/products/1'
    )
  })
})

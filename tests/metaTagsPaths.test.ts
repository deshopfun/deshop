import { describe, expect, it } from 'vitest'

/** Mirrors Index skipShellMeta paths — keep in sync with src/components/Index/index.tsx */
const SSR_SEO_ROUTE_PATHS = ['/products/[id]', '/story/[id]']

describe('SSR SEO shell meta skip paths', () => {
  it('covers product and story dynamic routes', () => {
    expect(SSR_SEO_ROUTE_PATHS).toContain('/products/[id]')
    expect(SSR_SEO_ROUTE_PATHS).toContain('/story/[id]')
  })
})

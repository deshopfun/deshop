import { describe, expect, it } from 'vitest'
import { sanitizeHtml } from '../src/utils/sanitizeHtml'

describe('sanitizeHtml', () => {
  it('is a no-op string guard under Node/SSR (no DOM)', () => {
    // Vitest default env has no browser DOMPurify target; util returns '' server-side.
    if (typeof window === 'undefined') {
      expect(sanitizeHtml('<p>hello</p>')).toBe('')
      return
    }
    const cleaned = sanitizeHtml('<p>hello<script>alert(1)</script></p>')
    expect(cleaned).toContain('hello')
    expect(cleaned.toLowerCase()).not.toContain('<script')
  })
})

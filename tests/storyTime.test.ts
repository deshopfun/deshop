import { describe, expect, it } from 'vitest'
import { stripHtml, toStoryDate } from '@/utils/storyTime'

describe('toStoryDate', () => {
  it('treats small values as seconds', () => {
    const d = toStoryDate(1_700_000_000)
    expect(d?.getUTCFullYear()).toBe(2023)
  })

  it('treats large values as milliseconds', () => {
    const d = toStoryDate(1_700_000_000_000)
    expect(d?.getUTCFullYear()).toBe(2023)
  })

  it('returns null for empty input', () => {
    expect(toStoryDate(undefined)).toBeNull()
    expect(toStoryDate(0)).toBeNull()
  })
})

describe('stripHtml', () => {
  it('removes tags and scripts', () => {
    expect(stripHtml('<p>Hello <b>world</b><script>x()</script></p>')).toBe('Hello world')
  })
})

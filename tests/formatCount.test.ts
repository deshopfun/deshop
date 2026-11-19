import { describe, expect, it } from 'vitest'
import { formatCount } from '../src/utils/formatCount'

describe('formatCount', () => {
  it('keeps small numbers as-is', () => {
    expect(formatCount(0)).toBe('0')
    expect(formatCount(999)).toBe('999')
  })

  it('formats thousands and millions', () => {
    expect(formatCount(1000)).toBe('1K')
    expect(formatCount(1500)).toBe('1.5K')
    expect(formatCount(1_000_000)).toBe('1M')
    expect(formatCount(2_500_000)).toBe('2.5M')
  })
})

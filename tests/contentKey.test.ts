import { describe, expect, it } from 'vitest'
import { contentKey } from '../src/components/Product/ProductFormParts'

describe('contentKey', () => {
  it('stable-serializes values for dirty checks', () => {
    expect(contentKey({ a: 1, b: 'x' })).toBe(contentKey({ a: 1, b: 'x' }))
    expect(contentKey(null)).toBe('null')
    expect(contentKey(undefined)).toBe('null')
  })
})

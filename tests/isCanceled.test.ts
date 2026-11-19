import { describe, expect, it } from 'vitest'
import axios from 'axios'
import { isCanceled } from '../src/utils/http/isCanceled'

describe('isCanceled', () => {
  it('detects axios cancel errors', () => {
    const err = new axios.Cancel('aborted')
    expect(isCanceled(err)).toBe(true)
  })

  it('detects AbortError', () => {
    const err = new Error('aborted')
    err.name = 'AbortError'
    expect(isCanceled(err)).toBe(true)
  })

  it('detects ERR_CANCELED code', () => {
    expect(isCanceled({ code: 'ERR_CANCELED' })).toBe(true)
  })

  it('returns false for normal errors', () => {
    expect(isCanceled(new Error('network'))).toBe(false)
    expect(isCanceled(null)).toBe(false)
  })
})

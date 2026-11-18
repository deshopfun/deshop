import { describe, expect, it } from 'vitest'
import { isApiSuccess, type ApiResponse } from '@/utils/http/types'

describe('isApiSuccess', () => {
  it('narrows success responses', () => {
    const ok: ApiResponse<{ id: number }> = { result: true, data: { id: 1 } }
    const fail: ApiResponse<{ id: number }> = { result: false, message: 'nope' }
    expect(isApiSuccess(ok)).toBe(true)
    if (isApiSuccess(ok)) expect(ok.data.id).toBe(1)
    expect(isApiSuccess(fail)).toBe(false)
  })
})

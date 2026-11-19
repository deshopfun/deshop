import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { navigateTo } from '../src/utils/navigate'

describe('navigateTo', () => {
  const push = vi.fn()
  const router = { push } as unknown as import('next/router').NextRouter
  const open = vi.fn()
  const originalOpen = globalThis.window?.open

  beforeEach(() => {
    push.mockReset()
    open.mockReset()
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { ...(globalThis.window ?? {}), open },
    })
  })

  afterEach(() => {
    if (originalOpen) {
      Object.defineProperty(globalThis.window, 'open', {
        configurable: true,
        value: originalOpen,
      })
    }
  })

  it('no-ops on empty url', () => {
    navigateTo(router, '')
    navigateTo(router, null)
    expect(push).not.toHaveBeenCalled()
    expect(open).not.toHaveBeenCalled()
  })

  it('opens absolute http urls', () => {
    navigateTo(router, 'https://example.com/x')
    expect(open).toHaveBeenCalledWith('https://example.com/x', '_blank', 'noopener,noreferrer')
    expect(push).not.toHaveBeenCalled()
  })

  it('routes internal paths', () => {
    navigateTo(router, '/orders/1')
    expect(push).toHaveBeenCalledWith('/orders/1')
  })
})

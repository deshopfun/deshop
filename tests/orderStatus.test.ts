import { describe, expect, it } from 'vitest'
import { FAILED_STEP, isTerminalStep, statusToStep } from '@/utils/paymentStatus'

describe('statusToStep', () => {
  it('maps known statuses', () => {
    expect(statusToStep(undefined)).toBe(0)
    expect(statusToStep('pending')).toBe(1)
    expect(statusToStep('pending blockchain')).toBe(2)
    expect(statusToStep('success')).toBe(3)
    expect(statusToStep('failure')).toBe(FAILED_STEP)
    expect(statusToStep('error')).toBe(FAILED_STEP)
  })
})

describe('isTerminalStep', () => {
  it('treats success and failure as terminal', () => {
    expect(isTerminalStep(3)).toBe(true)
    expect(isTerminalStep(FAILED_STEP)).toBe(true)
    expect(isTerminalStep(1)).toBe(false)
  })
})

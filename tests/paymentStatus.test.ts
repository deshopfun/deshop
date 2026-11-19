import { describe, expect, it } from 'vitest'
import {
  FAILED_STEP,
  FAILED_TX_STATUSES,
  statusToStep,
  isTerminalStep,
  SUCCESS_TX_STATUS,
  PENDING_TX_STATUS,
  CONFIRMING_TX_STATUS,
} from '../src/utils/paymentStatus'

describe('paymentStatus', () => {
  it('maps known statuses to steps', () => {
    expect(statusToStep(undefined)).toBe(0)
    expect(statusToStep(PENDING_TX_STATUS)).toBe(1)
    expect(statusToStep(CONFIRMING_TX_STATUS)).toBe(2)
    expect(statusToStep(SUCCESS_TX_STATUS)).toBe(3)
    for (const status of FAILED_TX_STATUSES) {
      expect(statusToStep(status)).toBe(FAILED_STEP)
    }
  })

  it('detects terminal steps', () => {
    expect(isTerminalStep(3)).toBe(true)
    expect(isTerminalStep(FAILED_STEP)).toBe(true)
    expect(isTerminalStep(1)).toBe(false)
  })
})

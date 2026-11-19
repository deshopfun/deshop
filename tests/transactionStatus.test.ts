import { describe, expect, it } from 'vitest'
import { getTransactionStatus } from '../src/utils/transactionStatus'

describe('getTransactionStatus', () => {
  it('maps known statuses', () => {
    expect(getTransactionStatus('success').label).toBe('Success')
    expect(getTransactionStatus('pending').label).toBe('Pending')
    expect(getTransactionStatus('failed').label).toBe('Failed')
  })

  it('falls back for unknown/empty', () => {
    expect(getTransactionStatus('weird').label).toBe('Weird')
    expect(getTransactionStatus('').label).toBe('Unknown')
  })
})

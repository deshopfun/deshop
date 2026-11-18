export const PENDING_TX_STATUS = 'pending'
export const CONFIRMING_TX_STATUS = 'pending blockchain'
export const SUCCESS_TX_STATUS = 'success'
export const FAILED_TX_STATUSES = new Set(['failure', 'error'])
export const VOIDED_STATUSES = ['voided']
export const REFUNDED_STATUSES = ['refunded', 'partially_refunded']
export const FAILED_STEP = -1
export const POLL_INTERVAL_MS = 10000

export function statusToStep(status: string | undefined): number {
  if (status === undefined) return 0
  if (status === SUCCESS_TX_STATUS) return 3
  if (FAILED_TX_STATUSES.has(status)) return FAILED_STEP
  if (status === CONFIRMING_TX_STATUS) return 2
  if (status === PENDING_TX_STATUS) return 1
  return 0
}

export function isTerminalStep(step: number) {
  return step === 3 || step === FAILED_STEP
}

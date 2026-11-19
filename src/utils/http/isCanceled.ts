import axios from 'axios'

/** True when a request was aborted / canceled by the client. */
export function isCanceled(error: unknown): boolean {
  if (axios.isCancel(error)) return true
  if (error instanceof Error && error.name === 'AbortError') return true
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === 'ERR_CANCELED'
  )
}

/** Normalize API/WS timestamps to epoch milliseconds. */
function toMs(input: number): number {
  const n = Number(input)
  if (!Number.isFinite(n) || n <= 0) return NaN
  // Heuristic: < 1e12 ≈ seconds, otherwise milliseconds
  return n < 1e12 ? n * 1000 : n
}

/** Message bubble time: today → clock only; older → date + clock. */
export function formatTime(input: number): string {
  const ms = toMs(input)
  if (!Number.isFinite(ms)) return ''

  const d = new Date(ms)
  const now = new Date()
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()

  if (sameDay) {
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  }

  const sameYear = d.getFullYear() === now.getFullYear()
  return d.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** Conversation list relative time. */
export function formatRelativeTime(input: number): string {
  const ms = toMs(input)
  if (!Number.isFinite(ms)) return ''

  const diffMs = Date.now() - ms
  if (diffMs < 60_000) return 'now'

  const mins = Math.floor(diffMs / 60_000)
  if (mins < 60) return `${mins}m`

  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`

  const d = new Date(ms)
  const now = new Date()
  const sameYear = d.getFullYear() === now.getFullYear()
  return d.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  })
}

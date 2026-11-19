export function formatTime(input: number): string {
  return new Date(input).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function formatRelativeTime(input: number): string {
  const iso = Number(input)
  const diffMs = Date.now() - iso
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'now'
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.floor(hours / 24)}d`
}

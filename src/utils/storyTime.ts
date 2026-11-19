/** Backend timestamps have been inconsistent about seconds vs milliseconds. */
const SECONDS_HEURISTIC_THRESHOLD = 10_000_000_000

export function toStoryDate(timestamp: number | undefined | null): Date | null {
  if (!timestamp) return null
  const ms = timestamp < SECONDS_HEURISTIC_THRESHOLD ? timestamp * 1000 : timestamp
  const date = new Date(ms)
  return Number.isNaN(date.getTime()) ? null : date
}

export function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

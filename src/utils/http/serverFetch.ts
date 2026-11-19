import type { ApiResponse } from '@/utils/http/types'

/** Server-only GET against a full Http.* absolute URL (no browser axios / window). */
export async function serverGetUrl<T>(
  absoluteUrl: string,
  params?: Record<string, string | number | undefined>
): Promise<ApiResponse<T>> {
  const target = new URL(absoluteUrl)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) target.searchParams.set(key, String(value))
    }
  }

  try {
    const res = await fetch(target.toString(), {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return { result: false, message: `HTTP ${res.status}` }
    return (await res.json()) as ApiResponse<T>
  } catch (e) {
    return { result: false, message: e instanceof Error ? e.message : 'fetch failed' }
  }
}

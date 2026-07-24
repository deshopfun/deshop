import { useEffect } from 'react'

/**
 *   useAbortableEffect((signal) => {
 *     if (!router.isReady || !id) return
 *     init(id, signal)
 *   }, [id, router.isReady])
 *
 */
export function useAbortableEffect(
  effect: (signal: AbortSignal) => void,
  deps: React.DependencyList
) {
  useEffect(() => {
    const controller = new AbortController()
    effect(controller.signal)
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

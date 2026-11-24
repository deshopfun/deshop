import { createJSONStorage, type PersistStorage, type StateStorage } from 'zustand/middleware'

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

/** Avoid persist middleware dropping `.persist` when localStorage is unavailable (SSR). */
export function createSSRJSONStorage<S>(): PersistStorage<S, unknown> {
  // getStorage never throws here, so createJSONStorage always returns a storage.
  return createJSONStorage<S>(() =>
    typeof window === 'undefined' ? noopStorage : localStorage
  )!
}

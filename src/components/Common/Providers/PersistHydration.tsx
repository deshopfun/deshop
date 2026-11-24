import { useEffect } from 'react'
import { useCartPresistStore, useUserPresistStore } from '@/lib'

/** Client-only rehydrate for zustand persist stores (skipHydration: true). */
const PersistHydration = () => {
  useEffect(() => {
    void useUserPresistStore.persist.rehydrate()
    void useCartPresistStore.persist.rehydrate()
  }, [])

  return null
}

export default PersistHydration

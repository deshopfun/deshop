import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartLineType = {
  productId: number
  option: string
  quantity: number
  snapshotTitle?: string
  snapshotImage?: string
  snapshotSlug?: string
}

export type CartType = {
  uuid: string
  variant: CartLineType[]
}

type CartPersistState = {
  cart: CartType[]
}

type CartPersistAction = {
  setCart: (carts: CartType[]) => void
  getCart: () => CartType[]
  addToCart: (uuid: string, line: CartLineType) => void
  updateQuantity: (uuid: string, productId: number, option: string, quantity: number) => void
  removeFromCart: (uuid: string, productId: number, option: string) => void
  resetCart: () => void
}

const initialCartState: CartPersistState = {
  cart: [],
}

export const useCartPresistStore = create(
  persist<CartPersistState & CartPersistAction>(
    (set, get) => ({
      ...initialCartState,

      setCart: (value) => set(() => ({ cart: value })),
      getCart: () => get().cart,

      addToCart: (uuid, line) => {
        const cart = get().cart
        const group = cart.find((c) => c.uuid === uuid)

        if (!group) {
          set({ cart: [...cart, { uuid, variant: [line] }] })
          return
        }

        const exists = group.variant.find(
          (v) => v.productId === line.productId && v.option === line.option
        )

        set({
          cart: cart.map((c) =>
            c.uuid === uuid
              ? {
                  ...c,
                  variant: exists
                    ? c.variant.map((v) =>
                        v.productId === line.productId && v.option === line.option
                          ? { ...v, quantity: v.quantity + line.quantity }
                          : v
                      )
                    : [...c.variant, line],
                }
              : c
          ),
        })
      },

      updateQuantity: (uuid, productId, option, quantity) => {
        set({
          cart: get().cart.map((c) =>
            c.uuid === uuid
              ? {
                  ...c,
                  variant: c.variant.map((v) =>
                    v.productId === productId && v.option === option ? { ...v, quantity } : v
                  ),
                }
              : c
          ),
        })
      },

      removeFromCart: (uuid, productId, option) => {
        set({
          cart: get()
            .cart.map((c) =>
              c.uuid === uuid
                ? {
                    ...c,
                    variant: c.variant.filter(
                      (v) => !(v.productId === productId && v.option === option)
                    ),
                  }
                : c
            )
            .filter((c) => c.variant.length > 0),
        })
      },

      resetCart: () => set(initialCartState),
    }),
    { name: 'deshop.cart.market' }
  )
)

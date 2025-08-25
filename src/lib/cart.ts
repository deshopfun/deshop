import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type VariantType = {
  productId: number;
  title: string;
  image: string;
  option: string;
  price: string;
  discounts: string;
  taxable: boolean;
  tax: string;
  tipReceived: string;
  weight: string;
  weightUnit: string;
  quantity: number;
};

export type CartType = {
  uuid: string;
  avatarUrl: string;
  username: string;
  currency: string;
  variant: VariantType[];
};

type CartPerisistState = {
  cart: CartType[];
};

type CartPerisistAction = {
  setCart: (carts: CartType[]) => void;
  getCart: () => CartType[];

  resetCart: () => void;
};

const initialCartState: CartPerisistState = {
  cart: [],
};

export const useCartPresistStore = create(
  persist<CartPerisistState & CartPerisistAction>(
    (set, get) => ({
      ...initialCartState,

      setCart: (value: any) => set(() => ({ cart: value })),
      getCart: () => get().cart,

      resetCart: () => {
        set(initialCartState);
      },
    }),
    {
      name: 'deshop.cart.market',
    },
  ),
);

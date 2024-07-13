import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ProductCartStore {
  id: number;
  account: string;
}

interface ProductState {
  shoppingCart: ProductCartStore[];
  addCart: (product: ProductCartStore) => void;
  removeFromCart: (id: number | undefined) => void;
  removeAllFromCart: () => void;
  updateCart: (product: ProductCartStore) => void;
}

export const useShoppingCart = create<
  ProductState,
  [['zustand/persist', unknown]]
>(
  persist(
    (set) => ({
      shoppingCart: [],
      addCart: (product: ProductCartStore) =>
        set((state) => ({ shoppingCart: [...state.shoppingCart, product] })),
      removeFromCart: (id: number | undefined) =>
        set((state) => ({
          shoppingCart: state.shoppingCart.filter((item) => item.id !== id),
        })),
      removeAllFromCart: () => set(() => ({ shoppingCart: [] })),
      updateCart: (product: ProductCartStore) =>
        set((state) => {
          const existingProductIndex = state.shoppingCart.findIndex(
            (item) => item.id === product.id,
          );

          if (existingProductIndex !== -1) {
            const updatedCart = [...state.shoppingCart];
            updatedCart[existingProductIndex] = product;
            return { shoppingCart: updatedCart };
          }
          return { shoppingCart: [...state.shoppingCart, product] };
        }),
    }),
    {
      name: 'shopping-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

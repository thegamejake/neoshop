import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
};

type CartStore = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (item, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          return get().updateQuantity(item.id, existingItem.quantity + quantity);
        }
        
        const newItem = { ...item, quantity };
        
        set((state) => ({
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (item.price * quantity),
        }));
      },
      
      removeItem: (id) => {
        const itemToRemove = get().items.find((item) => item.id === id);
        
        if (!itemToRemove) return;
        
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          totalItems: state.totalItems - itemToRemove.quantity,
          totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
        }));
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          return get().removeItem(id);
        }
        
        const currentItems = get().items;
        const itemToUpdate = currentItems.find((item) => item.id === id);
        
        if (!itemToUpdate) return;
        
        const quantityDiff = quantity - itemToUpdate.quantity;
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
          totalItems: state.totalItems + quantityDiff,
          totalPrice: state.totalPrice + (itemToUpdate.price * quantityDiff),
        }));
      },
      
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
    }),
    {
      name: 'neoshop-cart',
    }
  )
);
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Cart, CartItem, MenuItemData } from '@shared/schema';

interface CartContextType {
  cart: Cart;
  addItem: (item: MenuItemData, customizations?: string, specialInstructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  const calculateTotals = useCallback((items: CartItem[]): { total: number; itemCount: number } => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
  }, []);

  const addItem = useCallback((item: MenuItemData, customizations?: string, specialInstructions?: string) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        cartItem => 
          cartItem.name === item.name && 
          cartItem.customizations === customizations &&
          cartItem.specialInstructions === specialInstructions
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Item exists with same customizations, increase quantity
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
      } else {
        // New item or different customizations
        const newItem: CartItem = {
          id: `${item.name}-${Date.now()}-${Math.random()}`,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category || 'general',
          imageUrl: item.image,
          quantity: 1,
          customizations,
          specialInstructions,
        };
        newItems = [...prevCart.items, newItem];
      }

      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  }, [calculateTotals]);

  const removeItem = useCallback((itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  }, [calculateTotals]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  }, [calculateTotals, removeItem]);

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}
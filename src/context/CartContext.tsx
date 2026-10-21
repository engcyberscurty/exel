import React, { createContext, useContext, useState, useEffect } from 'react';
import { Template } from '../types';

interface CartContextType {
  items: Template[];
  addToCart: (template: Template) => void;
  removeFromCart: (templateId: string) => void;
  clearCart: () => void;
  isInCart: (templateId: string) => boolean;
  totalEgp: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Template[]>(() => {
    const saved = localStorage.getItem('sheetora_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('sheetora_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (template: Template) => {
    if (template.is_free || template.price_egp === 0) return;
    setItems((prev) => {
      if (prev.some((item) => item.id === template.id)) {
        return prev;
      }
      return [...prev, template];
    });
  };

  const removeFromCart = (templateId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== templateId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (templateId: string) => {
    return items.some((item) => item.id === templateId);
  };

  const totalEgp = items.reduce((sum, item) => sum + (item.price_egp || 0), 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalEgp,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

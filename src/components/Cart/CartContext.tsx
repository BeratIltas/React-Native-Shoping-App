import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { ProductProps } from '../../../type';



type CartContextType = {
  cartItems: ProductProps[];
  addToCart: (product_item_id: number) => Promise<void>;
  removeFromCart: (item_id: number) => Promise<void>;
  updateQuantity: (item_id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE_URL = 'https://shopal.expozy.co';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductProps[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setCartItems([]);
      }
    });
    return subscriber;
  }, []);

  const fetchCart = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart?user_id=${userId}`);

      if (response.status === 404) {
        setCartItems([]);
        return;
      }

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch cart: ${response.status} ${response.statusText} - ${text}`);
      }

      const data: ProductProps[] = await response.json();

      const withQuantity = data.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));

      setCartItems(withQuantity);
    } catch (error) {
      console.error('Fetch cart error:', error);
      setCartItems([]);
    }
  };



  useEffect(() => {
    fetchCart();
  }, [userId]);

  const addToCart = async (product_item_id: number) => {
    if (!userId) return;
    console.log(userId);
    console.log(product_item_id);

    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_item_id,
          qty: 1,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add to cart: ${response.status} - ${errorText}`);
      }

      await fetchCart();
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };


  const updateQuantity = async (item_id: number, quantity: number) => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart/update/${item_id}?user_id=${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty: quantity }),
      });

      if (!response.ok) throw new Error('Failed to update cart item');
      await fetchCart();
    } catch (error) {
      console.error('Update cart item error:', error);
    }
  };

  const removeFromCart = async (item_id: number) => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove/${item_id}?user_id=${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to remove cart item');
      await fetchCart();
    } catch (error) {
      console.error('Remove cart item error:', error);
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      for (const item of cartItems) {
        await removeFromCart(item.product_id);
      }
      setCartItems([]);
    } catch (error) {
      console.error('Clear cart error:', error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

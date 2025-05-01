import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth'; // Firebase Authentication için

export interface ProductProps {
  _id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

type CartContextType = {
  cartItems: ProductProps[];
  addToCart: (product: ProductProps) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductProps[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); 
      } else {
        setUserId(null); // Kullanıcı çıkış yaparsa null
        setCartItems([]); // Sepeti sıfırla
      }
    });

    return subscriber; // Listener'ı temizle
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        const jsonValue = await AsyncStorage.getItem(`cart-${userId}`);
        if (jsonValue) setCartItems(JSON.parse(jsonValue));
      }
    };

    loadCart();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      AsyncStorage.setItem(`cart-${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = (product: ProductProps) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) => (p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p));
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item._id === id ? { ...item, quantity } : item)));
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
export type ProductProps = {
  id: number;
  name: string;
  price: number;
  product_image: string[];
};
type WishlistContextType = {
  wishlistItems: ProductProps[];
  addToWishlist: (product_id: number) => Promise<void>;
  removeFromWishlist: (product_id: number) => Promise<void>;
  isInWishlist: (product_id: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const API_BASE_URL = 'https://shopal.expozy.co';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<ProductProps[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setWishlistItems([]);
      }
    });
    return subscriber;
  }, []);

  const fetchWishlist = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/wishlist?user_id=${userId}`);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch wishlist: ${response.status} - ${text}`);
      }
      const data: ProductProps[] = await response.json();
      setWishlistItems(data);
    } catch (error) {
      console.error('Fetch wishlist error:', error);
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  const addToWishlist = async (product_id: number) => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, product_item_id: product_id }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to add to wishlist: ${response.status} - ${text}`);
      }

      await fetchWishlist();
    } catch (error) {
      console.error('Add to wishlist error:', error);
    }
  };

  const removeFromWishlist = async (product_id: number) => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/remove/${product_id}?user_id=${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to remove from wishlist: ${response.status} - ${text}`);
      }

      await fetchWishlist();
    } catch (error) {
      console.error('Remove from wishlist error:', error);
    }
  };

  const isInWishlist = (product_id: number): boolean => {
    return wishlistItems.some((item) => item.id === product_id);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
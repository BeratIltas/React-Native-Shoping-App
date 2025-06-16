import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Product = {
  id: string;
  name: string;
  image: any;
  price: number;
};

type PurchaseContextType = {
  purchasedItems: Product[];
  buyProduct: (product: Product) => void;
  loadPurchasedItems: () => void;
  clearPurchases: () => void;
};

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export const PurchaseProvider = ({ children }: { children: ReactNode }) => {
  const [purchasedItems, setPurchasedItems] = useState<Product[]>([]);

  useEffect(() => {
    loadPurchasedItems();
  }, []);
  const clearPurchases = () => {
    try {
      setPurchasedItems([]);
      AsyncStorage.removeItem('@purchased_items');
    } catch (e) {
      console.error('Failed to clear purchased items:', e);
    }
  };
  const loadPurchasedItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@purchased_items');
      if (jsonValue != null) {
        setPurchasedItems(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load purchased items:', e);
    }
  };

  const saveToStorage = async (items: Product[]) => {
    try {
      const jsonValue = JSON.stringify(items);
      await AsyncStorage.setItem('@purchased_items', jsonValue);
    } catch (e) {
      console.error('Failed to save purchased items:', e);
    }
  };

  const buyProduct = (product: Product) => {
    const updated = [...purchasedItems, product];
    setPurchasedItems(updated);
    saveToStorage(updated);
  };

  return (
    <PurchaseContext.Provider value={{ purchasedItems, buyProduct, loadPurchasedItems, clearPurchases }}>
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchase = () => {
  const context = useContext(PurchaseContext);
  if (!context) throw new Error("usePurchase must be used within a PurchaseProvider");
  return context;
};

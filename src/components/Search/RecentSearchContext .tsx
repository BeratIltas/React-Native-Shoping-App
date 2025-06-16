import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RecentSearchContextType {
  recentSearches: string[];
  addSearch: (search: string) => void;
  removeSearch: (search: string) => void;
  clearSearches: () => void;
}

const RecentSearchContext = createContext<RecentSearchContextType | undefined>(undefined);

export const RecentSearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // AsyncStorage'dan geçmişi yükleme
  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const storedSearches = await AsyncStorage.getItem('recentSearches');
        if (storedSearches) {
          setRecentSearches(JSON.parse(storedSearches));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    };
    loadRecentSearches();
  }, []);

  // Yeni aramaları ekleme ve kaydetme
  const addSearch = async (search: string) => {
    const updatedSearches = [search, ...recentSearches.filter((item) => item !== search)].slice(0, 10);
    setRecentSearches(updatedSearches);
    await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // Belirli bir aramayı silme
  const removeSearch = async (search: string) => {
    const updatedSearches = recentSearches.filter((item) => item !== search);
    setRecentSearches(updatedSearches);
    await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // Tüm geçmişi temizleme
  const clearSearches = async () => {
    setRecentSearches([]);
    await AsyncStorage.removeItem('recentSearches');
  };

  return (
    <RecentSearchContext.Provider value={{ recentSearches, addSearch, removeSearch, clearSearches }}>
      {children}
    </RecentSearchContext.Provider>
  );
};

export const useRecentSearch = () => {
  const context = useContext(RecentSearchContext);
  if (!context) {
    throw new Error('useRecentSearch must be used within a RecentSearchProvider');
  }
  return context;
};
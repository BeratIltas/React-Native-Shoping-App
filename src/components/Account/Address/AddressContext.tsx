import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}

interface AddressContextProps {
  addresses: Address[];
  defaultAddressId: string | null;
  defaultAddress: Address | null;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>;
  loading: boolean;
}

const AddressContext = createContext<AddressContextProps | undefined>(undefined);

const ADDRESSES_KEY = 'addresses';
const DEFAULT_ADDRESS_KEY = 'default_address_id';

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const storedAddresses = await AsyncStorage.getItem(ADDRESSES_KEY);
      const storedDefaultId = await AsyncStorage.getItem(DEFAULT_ADDRESS_KEY);

      if (storedAddresses) setAddresses(JSON.parse(storedAddresses));
      if (storedDefaultId) setDefaultAddressId(storedDefaultId);

      setLoading(false);
    };

    loadData();
  }, []);

  const saveAddresses = async (updated: Address[]) => {
    setAddresses(updated);
    await AsyncStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
  };

  const addAddress = async (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      id: uuid.v4().toString(),
      ...address,
    };

    const updatedAddresses = [...addresses, newAddress];
    await saveAddresses(updatedAddresses);

    if (updatedAddresses.length === 1) {
      await setDefaultAddress(newAddress.id);
    }
  };

  const deleteAddress = async (addressId: string) => {
    const updated = addresses.filter(addr => addr.id !== addressId);
    await saveAddresses(updated);

    if (defaultAddressId === addressId) {
      await AsyncStorage.removeItem(DEFAULT_ADDRESS_KEY);
      setDefaultAddressId(null);
    }
  };

  const setDefaultAddress = async (addressId: string) => {
    await AsyncStorage.setItem(DEFAULT_ADDRESS_KEY, addressId);
    setDefaultAddressId(addressId);
  };

  const defaultAddress = addresses.find(addr => addr.id === defaultAddressId) || null;

  return (
    <AddressContext.Provider
      value={{
        addresses,
        defaultAddressId,
        defaultAddress,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        loading,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = (): AddressContextProps => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddresses must be used within an AddressProvider');
  }
  return context;
};

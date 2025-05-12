import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface PaymentCard {
  id: string;
  cardNumber: string;
  expiry: string;
  nameOnCard: string;
  type?: 'visa' | 'mastercard' | 'default';
}

interface PaymentCardContextProps {
  cards: PaymentCard[];
  defaultCardId: string | null;
  defaultCard: PaymentCard | null;
  addCard: (card: Omit<PaymentCard, 'id' | 'type'>) => Promise<void>;
  deleteCard: (cardId: string) => Promise<void>;
  setDefaultCard: (cardId: string) => Promise<void>;
  loading: boolean;
}

const PaymentCardContext = createContext<PaymentCardContextProps | undefined>(undefined);

const CARDS_KEY = 'payment_cards';
const DEFAULT_CARD_KEY = 'default_card_id';

const getCardType = (cardNumber: string): 'visa' | 'mastercard' | 'default' => {
  if (cardNumber.startsWith('4')) return 'visa';
  if (cardNumber.startsWith('5')) return 'mastercard';
  return 'default';
};

export const PaymentCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [defaultCardId, setDefaultCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const storedCards = await AsyncStorage.getItem(CARDS_KEY);
      const storedDefaultId = await AsyncStorage.getItem(DEFAULT_CARD_KEY);

      if (storedCards) setCards(JSON.parse(storedCards));
      if (storedDefaultId) setDefaultCardId(storedDefaultId);

      setLoading(false);
    };

    loadData();
  }, []);

  const saveCards = async (updatedCards: PaymentCard[]) => {
    setCards(updatedCards);
    await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(updatedCards));
  };

  const addCard = async (card: Omit<PaymentCard, 'id' | 'type'>) => {
    const newCard: PaymentCard = {
      id: uuid.v4().toString(),
      ...card,
      type: getCardType(card.cardNumber),
    };

    const updatedCards = [...cards, newCard];
    await saveCards(updatedCards);

    if (updatedCards.length === 1) {
      await setDefaultCard(newCard.id);
    }
  };

  const deleteCard = async (cardId: string) => {
    const updatedCards = cards.filter(c => c.id !== cardId);
    await saveCards(updatedCards);

    if (defaultCardId === cardId) {
      await AsyncStorage.removeItem(DEFAULT_CARD_KEY);
      setDefaultCardId(null);
    }
  };

  const setDefaultCard = async (cardId: string) => {
    await AsyncStorage.setItem(DEFAULT_CARD_KEY, cardId);
    setDefaultCardId(cardId);
  };

  const defaultCard = cards.find(card => card.id === defaultCardId) || null;

  return (
    <PaymentCardContext.Provider
      value={{
        cards,
        defaultCardId,
        defaultCard,
        addCard,
        deleteCard,
        setDefaultCard,
        loading,
      }}
    >
      {children}
    </PaymentCardContext.Provider>
  );
};

export const usePaymentCards = (): PaymentCardContextProps => {
  const context = useContext(PaymentCardContext);
  if (!context) {
    throw new Error('usePaymentCards must be used within a PaymentCardProvider');
  }
  return context;
};

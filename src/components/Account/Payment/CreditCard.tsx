import { View, Text, Button } from 'react-native'
import React from 'react'
import { usePaymentCards } from './PaymentCardContext';

const CreditCard = () => {
    const { cards, addCard, deleteCard, setDefaultCard, defaultCardId, loading } = usePaymentCards();
  
    if (loading) return <Text>Loading...</Text>;
  
    return (
      <View>
        {cards.map((card) => (
          <View key={card.id}>
            <Text>{card.cardNumber}</Text>
            <Button title="Set Default" onPress={() => setDefaultCard(card.id)} />
            <Button title="Delete" onPress={() => deleteCard(card.id)} />
            {defaultCardId === card.id && <Text>Default ✅</Text>}
          </View>
        ))}
        <Button
          title="Add Dummy Card"
          onPress={() => addCard({ cardNumber: '1234 5678 9012 3456', expiry: '12/26', nameOnCard: 'Test User' })}
        />
      </View>
    );
  };
  
export default CreditCard
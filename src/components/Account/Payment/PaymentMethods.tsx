import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import CommonHeader from '../../../navigation/Header/CommonHeader';
import { usePaymentCards } from './PaymentCardContext';

interface PaymentCard {
  id: string;
  cardNumber: string;
  expiry: string;
  nameOnCard: string;
}

const PaymentMethods = () => {
  const { cards, setDefaultCard, deleteCard, defaultCardId, addCard } = usePaymentCards();
  const [modalVisible, setModalVisible] = useState(false);
  const [newCard, setNewCard] = useState({ cardNumber: '', expiry: '', nameOnCard: '' });

  const handleAddCard = async () => {
    if (newCard.cardNumber && newCard.expiry && newCard.nameOnCard) {
      await addCard(newCard);
      setModalVisible(false);
      setNewCard({ cardNumber: '', expiry: '', nameOnCard: '' });
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Payment Methods" icon={null} page="goBack" />
      <ScrollView contentContainerStyle={styles.list}>
        {cards.map((card) => (
          <View
            key={card.id}
            style={[styles.cardContainer, card.id === defaultCardId ? styles.defaultCard : null]}
          >
            <Text style={styles.cardNumber}>**** **** **** {card.cardNumber.slice(-4)}</Text>
            <Text style={styles.cardName}>{card.nameOnCard}</Text>
            <Text style={styles.cardExpiry}>Expires {card.expiry}</Text>
            {card.id === defaultCardId ? (
              <Text style={styles.defaultText}>Default ✅</Text>
            ) : (
              <TouchableOpacity
                onPress={() => setDefaultCard(card.id)}
                style={styles.setDefaultButton}
              >
                <Text style={styles.setDefaultText}>Set Default</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => deleteCard(card.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add New Card</Text>
      </TouchableOpacity>

      {/* Modal for Adding Card */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={newCard.cardNumber}
            onChangeText={(text) => setNewCard({ ...newCard, cardNumber: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date (MM/YY)"
            value={newCard.expiry}
            onChangeText={(text) => setNewCard({ ...newCard, expiry: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Name on Card"
            value={newCard.nameOnCard}
            onChangeText={(text) => setNewCard({ ...newCard, nameOnCard: text })}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleAddCard}>
            <Text style={styles.saveButtonText}>Save Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    padding: 16,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  defaultCard: {
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardName: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  cardExpiry: {
    fontSize: 14,
    color: '#999',
  },
  defaultText: {
    color: '#4caf50',
    marginTop: 8,
  },
  setDefaultButton: {
    marginTop: 8,
  },
  setDefaultText: {
    color: '#007bff',
  },
  deleteButton: {
    marginTop: 8,
  },
  deleteText: {
    color: '#ff0000',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#007bff',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
  },
});

export default PaymentMethods;
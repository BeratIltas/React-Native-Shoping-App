import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Image } from 'react-native';
import CommonHeader from '../../../navigation/Header/CommonHeader';
import { usePaymentCards } from './PaymentCardContext';
import { images } from '../../../assets/assets';
import typography from '../../../assets/typography';
import Colors from '../../../assets/colors';
import AddCardModal from './AddPaymentModal';
import AddPaymentModal from './AddPaymentModal';


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
  const [showDelete, setShowDelete] = useState(false);

  const handleAddCard = async () => {
    if (newCard.cardNumber && newCard.expiry && newCard.nameOnCard) {
      await addCard(newCard);
      setModalVisible(false);
      setNewCard({ cardNumber: '', expiry: '', nameOnCard: '' });
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Payment Methods" icon={showDelete ? images.check : null} onPress={() => setShowDelete(false)} page="goBack" />
      {cards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image style={{ tintColor: Colors.gray }} source={images.addCard}></Image>
          <Text style={[typography.Header4, styles.emptyTextHeader]}>No cards yet!</Text>
          <Text style={[typography.Body1Regular, styles.emptyText]}>Start by adding a payment method, and you'll see it here.</Text>
        </View>
      ) : (

        <ScrollView contentContainerStyle={styles.list}>
          {cards.map((card) => (
            <View
              key={card.id}
            >
              <TouchableOpacity style={styles.creditCard}
                onLongPress={() => setShowDelete(true)}
                activeOpacity={1}
              >

                {showDelete && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteCard(card.id)}
                  >
                    <Image source={images.trash} style={{ tintColor: "red" }} />
                  </TouchableOpacity>
                )}

                <Image style={styles.chipImage} source={images.chip} />
                <View>
                  <Text style={styles.cardNumber}>**** **** **** {card.cardNumber.slice(-4)}</Text>
                </View>
                <View style={styles.cardBottomContainer}>
                  <View style={styles.cardInfoContainer}>
                    <Text style={[typography.Body3Regular, { color: "white" }]} >Card Holder Name</Text>
                    <Text style={[styles.cardName, typography.Body2]}>{card.nameOnCard}</Text>
                  </View>
                  <View style={styles.cardInfoContainer}>
                    <Text style={[typography.Body3Regular, { color: "white" }]} >Expiry Date</Text>
                    <Text style={[styles.cardExpiry, typography.Body2]}>{card.expiry}</Text>
                  </View>
                  <View style={styles.cardInfoContainer}>
                    {card?.cardNumber.startsWith("4") ? (
                      <Image source={images.visa} />
                    ) : (
                      <Image source={images.mastercard} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.defaultContainer} >
                {card.id === defaultCardId ? (
                  <Image source={images.checkboxOn} />
                ) : (
                  <TouchableOpacity
                    onPress={() => setDefaultCard(card.id)}
                  >
                    <Image source={images.checkboxOff} />
                  </TouchableOpacity>
                )}
                <Text style={typography.Body2Medium}>Use as default payment method</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <AddPaymentModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 5
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal:"10%",
    
  },
  emptyTextHeader: {
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: 'center',
    color: Colors.black
  },
  emptyText: {
    color: Colors.gray,
    textAlign:"center",
  },
  list: {
    padding: 16,
    paddingBottom: 46
  },

  creditCard: {
    backgroundColor: "#222222",
    borderRadius: 8,
    padding: 20,
    elevation: 1,
    gap: 24,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding:5,
  },
  chipImage: {
    resizeMode: "contain",
    marginTop: 10,
  },
  cardNumber: {
    fontSize: 24,
    color: "#fff",
    letterSpacing: 2,
  },
  cardBottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfoContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  cardName: {
    fontSize: 16,
    color: 'white',
    marginVertical: 4,
    fontWeight: "bold"
  },
  cardExpiry: {
    color: 'white',
  },
  defaultContainer: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 20,
    alignItems: "center",
    alignContent: "center",

  },

  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.black,
    borderRadius: 50,
    height: 44,
    width: 44,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: 'rgba(255, 255, 255, 0.5)',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2

  },
  addButtonText: {
    color: '#fff',
    fontSize: 26,
    textAlign: "center",
    textAlignVertical: "center"

  },
});

export default PaymentMethods;
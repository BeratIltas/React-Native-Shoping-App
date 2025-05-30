import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Platform } from 'react-native';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../type';
import { useCart } from './CartContext';


const TotalCart: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {totalPrice } = useCart();
  const handleCheckout = () => {
    if (totalPrice === 0) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'Your cart is empty! Please add products before checkout.',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      } else {
      }
      return;
    }
    navigation.navigate('Checkout');
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={[typography.Body2Medium, styles.label]}>Total</Text>
        <Text style={[typography.Body1, styles.amount]}>{totalPrice.toFixed(2)} $</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Check Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TotalCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    letterSpacing: 1,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: Colors.orange,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
  },
});

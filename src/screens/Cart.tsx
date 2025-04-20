import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useCart } from '../components/Cart/CartContext';
import ProductCardHorizontalCart from '../components/Cart/ProductCardHorizontalCart';
import EmptyCart from '../components/Cart/EmptyCart';
import TotalCart from '../components/Cart/TotalCart';
import CommonHeader from '../navigation/Header/CommonHeader';
import AdviceProduct from '../components/AdviceProduct';

const Cart = () => {
  const { cartItems, totalPrice } = useCart();

  return (
    <View style={styles.container}>
      <CommonHeader title="Cart" icon={null} iconleft={null} page="MainApp" />
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => <ProductCardHorizontalCart item={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

      )}
      <View style={styles.totalCartContainer}>
        <TotalCart totalPrice={totalPrice} />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1 },
  totalCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

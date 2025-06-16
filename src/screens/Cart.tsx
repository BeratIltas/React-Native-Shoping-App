import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useCart } from '../components/Cart/CartContext';
import ProductCardHorizontalCart from '../components/ProductCardHorizontalCart';
import EmptyCart from '../components/Cart/EmptyCart';
import TotalCart from '../components/Cart/TotalCart';
import CommonHeader from '../navigation/Header/CommonHeader';
import AdviceProduct from '../components/AdviceProduct';
import { images } from '../assets/assets';
import Colors from '../assets/colors';

const Cart = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

  useEffect(() => {
  }, [cartItems]);


  return (
    <View style={styles.container}>
      <CommonHeader title="Cart" icon={totalPrice !== 0 ? (images.trash) : (null)} onPress={totalPrice !== 0 ? clearCart : undefined} iconleft={null} page="MainApp" />
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <FlatList
          data={[...cartItems]}
          renderItem={({ item }) => <ProductCardHorizontalCart item={item} />}
          keyExtractor={(item) => item.product_id.toString()}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}
      <View style={styles.totalCartContainer}>
        <TotalCart />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.whiteGray
  },
  totalCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

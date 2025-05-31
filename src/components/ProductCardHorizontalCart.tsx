import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import typography from '../assets/typography';
import Colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { images } from '../assets/assets';
import { useCart } from './Cart/CartContext';

const { height } = Dimensions.get('window');

type Props = {
  item: {
    product_id: number;
    product_name: string;
    price: number;
    product_image: string[];
    quantity?: number;
    total?: number;
  };
};

const ProductCardHorizontalCart: React.FC<Props> = ({ item }) => {
  const navigation: any = useNavigation();
  const lottieRef = useRef<LottieView | null>(null);
  const { removeFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(item.quantity ?? 1);

  const playTrashAnimation = () => {
    lottieRef.current?.play();
    removeFromCart(item.product_id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    updateQuantity(item.product_id, newQuantity);
  };

  const imageUrl = item.product_image?.[0] ?? '';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.innerContainer}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ProductDetails', { product_id: item.product_id })}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Text>No Image</Text>
          </View>
        )}
        <View style={styles.details}>
          <View style={styles.upper}>
            <View style={styles.titleContainer}>
              <Text
                style={[typography.Body1, styles.productName]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.product_name}
              </Text>
            </View>
            <TouchableOpacity style={styles.trashWrapper} onPress={playTrashAnimation} activeOpacity={0.7}>
              <LottieView
                ref={lottieRef}
                source={require('../assets/Animations/Trash.json')}
                autoPlay={false}
                loop={false}
                speed={3}
                style={styles.trash}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <Text style={[typography.Body2, styles.price]}>
              ${(item.price * quantity).toFixed(2)}
            </Text>
            <View style={styles.quantityWrapper}>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => handleQuantityChange(quantity - 1)}
              >
                <Image source={images.minus} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => handleQuantityChange(quantity + 1)}
              >
                <Image source={images.plus} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCardHorizontalCart;

const styles = StyleSheet.create({
  container: {
    height: height * 0.18, // Eskisi 0.22
    paddingHorizontal: 10,
    marginVertical: 4,
    backgroundColor: Colors.whiteGray,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.whiteGray,
    resizeMode: 'contain',
    margin: 8,
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1.8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  upper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  productName: {
    fontWeight: '600',
    fontSize: 15, // Eskisi 17
    color: Colors.black,
  },
  trashWrapper: {
    width: 40,
    height: 40,
  },
  trash: {
    flex: 1,
    resizeMode: 'contain',
  },
  price: {
    color: Colors.black,
    fontSize: 16, // Eskisi 18
    fontWeight: '700',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBtn: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 4, // Eskisi 6
    marginHorizontal: 4,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: Colors.black,
  },
  quantityText: {
    fontSize: 16, // Eskisi 16
    fontWeight: '600',
    minWidth: 18,
    textAlign: 'center',
  },
});


import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import typography from '../../assets/typography';
import Colors from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../assets/assets';
import { useCart } from './CartContext';

const { height } = Dimensions.get('window');

type Props = {
  item: {
    _id: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
  };
};

const ProductCardHorizontalCart: React.FC<Props> = ({ item }) => {
  const navigation: any = useNavigation();
  const lottieRef = useRef<LottieView | null>(null);
  const { removeFromCart, updateQuantity } = useCart(); 
  const [quantity, setQuantity] = useState(item.quantity); 

  const playTrashAnimation = () => {
    lottieRef.current?.play();
    removeFromCart(item._id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    updateQuantity(item._id, newQuantity);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.innerContainer}
        onPress={() => navigation.navigate('ProductDetails', { _id: item._id })}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <View style={styles.upper}>
            <View style={styles.titleContainer}>
              <Text style={typography.Body1} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
            </View>
            <TouchableOpacity style={styles.trashWrapper} onPress={playTrashAnimation}>
              <LottieView
                ref={lottieRef}
                source={require('../../assets/Animations/Trash.json')}
                autoPlay={false}
                loop={false}
                speed={3}
                style={styles.trash}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <Text style={[typography.Body3Medium, styles.price]}>
              {item.price * quantity} $
            </Text>
            <View style={styles.quantityWrapper}>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => handleQuantityChange(Math.max(quantity - 1, 1))}
              >
                <Image source={images.minus} />
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => handleQuantityChange(quantity + 1)}
              >
                <Image source={images.plus} />
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
    height: height * 0.2,
    backgroundColor: Colors.whiteGray,
  },
  innerContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 0.2,
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  details: {
    flex: 1.5,
    padding: 15,
    justifyContent: 'space-between',
  },
  upper: {
    flexDirection: 'row',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  trashWrapper: {
    height: 36,
    width: 36,
  },
  trash: {
    flex: 1,
    resizeMode: 'contain',
  },
  price: {
    textAlign: 'left',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  quantityBtn: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
  },
});

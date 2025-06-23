import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import typography from '../assets/typography';
import Colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './Cart/CartContext';
import { images } from '../assets/assets';

const { height } = Dimensions.get('window');

type ProductCardProps = {
  item: {
    product_id: number;
    name: string;
    price: number;
    product_image: string[];
    average_rating: number;
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigation: any = useNavigation();
  const addToCardRef = useRef<LottieView | null>(null);
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (addToCardRef.current) {
      addToCardRef.current.play(0, 75);
      addToCart(item.product_id);
    }
  };

  return (
    <View style={styles.productViewContainer}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.productView}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            product_id: item.product_id,
          })
        }
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.product_image?.[0] ?? '' }}
            style={styles.img}
          />
        </View>
        <View style={styles.productDetail}>
          <View style={styles.productDetailText}>
            <Text
              style={[typography.Body1, styles.productName]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <View style={styles.starContainer}>
              <Image source={images.star} style={{ height: 15, width: 15}} />
              <Text style={{ flex: 1, textAlign: "left" }}>{item.average_rating?.toFixed(1) ?? "0.0"} </Text>
            </View>
            <Text style={[typography.Body2, styles.price]}>
              ${item.price.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleAddToCart}
            activeOpacity={0.7}
            style={styles.addToCartButton}
          >
            <LottieView
              ref={addToCardRef}
              source={require("../assets/Animations/AddToCard.json")}
              loop={false}
              autoPlay={false}
              style={styles.cardIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productViewContainer: {
    height: height * 0.15,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  productView: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    flexDirection: "row",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 5,
    overflow: 'hidden',
  },
  imageWrapper: {
    flex: 1,
    backgroundColor: Colors.whiteGray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productDetail: {
    flex: 1.8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetailText: {
    flex: 1,
    paddingRight: 8,
    gap: 2,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  productName: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.black,
    marginBottom: 4,
  },
  price: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: '700',
  },
  addToCartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cardIcon: {
    width: 28,
    height: 28,
  },
});

export default ProductCard;

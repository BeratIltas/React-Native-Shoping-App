import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import typography from '../assets/typography';
import Colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './Cart/CartContext';
import { images } from '../assets/assets';
import { ProductProps } from '../../type';
import { useWishlist } from '../components/Wishlist/WishlistContext';

const { height, width } = Dimensions.get('window');

type ProductCardProps = {
  item: ProductProps & { _id: string };
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigation: any = useNavigation();
  const lottieRef = useRef<LottieView | null>(null);
  const addToCardRef = useRef<LottieView | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const liked = isInWishlist(item.product_id);

  useEffect(() => {
    if (liked) {
      lottieRef.current?.play(900, 900);
    } else {
      lottieRef.current?.play(0, 0);
    }
  }, [liked]);

  const handleHeartPress = async () => {
    if (liked) {
      await removeFromWishlist(item.product_id);
      lottieRef.current?.play(66, 0);
    } else {
      await addToWishlist(item.product_id);
      lottieRef.current?.play(0, 66);
    }
  };

  const handleAddToCart = () => {
    if (addToCardRef.current) {
      addToCardRef.current.play(0, 75);
      addToCart(item.product_id);
    }
  };

  return (
    <View style={styles.productViewContainer}>
      <View style={styles.heartViewContainer}>
        <TouchableOpacity style={styles.heart} onPress={handleHeartPress}>
          <LottieView
            ref={lottieRef}
            source={require('../assets/Animations/Heart.json')}
            autoPlay={false}
            loop={false}
            style={styles.heart}
            speed={2}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.productView}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            product_id: item.product_id,
          })
        }
      >
        <Image
          source={{ uri: item.product_images?.contentUrl?.[0] }}
          style={styles.img}
        />
        <View style={styles.starContainer}>
          <Image source={images.star} style={{ height: 20, width: 20 }} />
          <Text>{item.average_rating?.toFixed(1) ?? "0.0"} </Text>
        </View>
        <View style={styles.productDetail}>
          <View style={styles.productDetailText}>
            <Text style={typography.Body1} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={typography.Body3Medium}>{item.price} $</Text>
          </View>

          <TouchableOpacity onPress={handleAddToCart}>
            <LottieView
              ref={addToCardRef}
              source={require('../assets/Animations/AddToCard.json')}
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
    height: height * 0.3,
    width: width * 0.4,
    flex: 1,
    backgroundColor: Colors.whiteGray,
  },
  heartViewContainer: {
    borderRadius: 50,
  },
  productView: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  img: {
    backgroundColor: Colors.white,
    flex: 5,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  starContainer: {
    flex: 0.7,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  productDetail: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  heart: {
    position: 'absolute',
    top: 0,
    right: 1,
    zIndex: 1,
    width: 70,
    height: 70,
  },
  productDetailText: {
    flex: 1,
    marginRight: 10,
    marginBottom: 5,
  },
  cardIcon: {
    height: 30,
    width: 30,
  },
});

export default ProductCard;

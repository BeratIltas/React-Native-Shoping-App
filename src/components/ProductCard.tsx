import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import typography from '../assets/typography';
import Colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './Cart/CartContext';
import { images } from '../assets/assets';

const { height, width } = Dimensions.get('window');

type ProductCardProps = {
  item: {
    _id: string;
    image: string;
    title: string;
    price: number;
  };
  onHeartPress: (productId: string) => void;
  isLiked: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ item, onHeartPress, isLiked }) => {
  const navigation: any = useNavigation();
  const lottieRef = useRef<LottieView | null>(null); // Ref for "Heart" animation
  const addToCardRef = useRef<LottieView | null>(null); // Ref for "AddToCard" animation
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (addToCardRef.current) {
      addToCardRef.current.play(0, 75);
      addToCart({ ...item, quantity: 1 })
    }
  };

  return (
    <View style={styles.productViewContainer}>
      <View style={styles.heartViewContainer}>
        <TouchableOpacity
          style={styles.heart}
          onPress={() => {
            onHeartPress(String(item._id));
            if (lottieRef.current) {
              isLiked ? lottieRef.current.play(0, 1) : lottieRef.current.play();
            }
          }}
        >
          <LottieView
            ref={lottieRef}
            source={require('../assets/Animations/Heart.json')}
            autoPlay={false}
            loop={false}
            style={styles.heart}
            speed={5}

          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.productView}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            _id: item._id,
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.img} />
        <View style={styles.starContainer} >
          <Image source={images.star} style={{height:20,width:20}} />
          <Text style={{}} >4.2</Text>
        </View>
        <View style={styles.productDetail}>
          <View style={styles.productDetailText}>
            <Text
              style={typography.Body1}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text style={typography.Body3Medium}>{item.price} $</Text>
          </View>

          <TouchableOpacity onPress={handleAddToCart}>
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
    height: height * 0.3,
    width: width * 0.40,//46 tam
    flex: 1,
    backgroundColor: Colors.whiteGray
  },
  heartViewContainer: {
    borderRadius: 50
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
  starContainer:{
    flex:0.7,
    flexDirection:"row",
    gap:5,
    paddingHorizontal:10,
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

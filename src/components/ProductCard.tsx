import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import typography from '../assets/typography';
import Colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

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

  const handleAddToCart = () => {
    if (addToCardRef.current) {
      addToCardRef.current.play(0, 75); // Plays the animation from frame 0 to 75
    }
  };

  return (
    <View style={styles.productViewContainer}>
      {/* Heart animation */}
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
          speed={1.5}
        />
      </TouchableOpacity>

      {/* Product Details */}
      <TouchableOpacity
        style={styles.productView}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            _id: item._id,
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.img} />
        <View style={styles.productDetail}>
          <View style={styles.productDetailText}>
            {/* Product Title and Price */}
            <Text
              style={typography.Body1}
              numberOfLines={2}
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
    flex: 1,
    backgroundColor: Colors.whiteGray
  },
  productView: {
    flex: 1,
    height: height * 0.3,
    borderWidth: 0.2,
    margin: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    overflow: 'hidden',

  },
  img: {
    backgroundColor: Colors.white,
    flex: 5,
    resizeMode: 'contain',
    width: '100%',
    height: '70%',
  },
  productDetail: {
    flexDirection:'row',
    flex: 1,
    padding:15,
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
  productDetailText:{
    flex: 1,
    marginRight: 10,
    marginBottom:5,
  },
  cardIcon: {
    height: 30,
    width: 30,
  },
});

export default ProductCard;

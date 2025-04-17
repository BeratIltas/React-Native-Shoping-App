import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import typography from '../assets/typography';
import Colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { images } from '../assets/assets';

const { height, width } = Dimensions.get('window');

type ProductCardProps = {
  item: {
    _id: string;
    image: string;
    title: string;
    price: number;
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigation: any = useNavigation();
  const lottieRef = useRef<LottieView | null>(null);
  const [quantity, setQuantity] = useState(1);

  const playTrashAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  return (
    <View style={styles.productViewContainer}>
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
          <View style={styles.productDetailUpp}>
            <View style={styles.productDetailText}>
              <Text style={typography.Body1} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
            </View>
            <TouchableOpacity style={styles.trashContainer} onPress={playTrashAnimation}>
              <LottieView
                ref={lottieRef}
                source={require('../assets/Animations/Trash.json')}
                autoPlay={false}
                loop={false}
                speed={1}
                style={styles.trash}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productDetailDown}>
            <Text style={[typography.Body3Medium, styles.productPrice]}>{item.price*quantity} $</Text>
            <View style={styles.productAmmount}>
              <TouchableOpacity
                style={styles.productAmmountBtn}
                onPress={() => setQuantity(prev => Math.max(prev - 1, 1))}
              >
                <Image source={images.minus} />
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity
                style={styles.productAmmountBtn}
                onPress={() => setQuantity(prev => prev + 1)}
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

const styles = StyleSheet.create({
  productViewContainer: {
    height: height * 0.2,
    flex: 1,
    backgroundColor: Colors.whiteGray,
  },
  productView: {
    flex: 1,
    borderWidth: 0.2,
    margin: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    flexDirection: "row"

  },
  img: {
    backgroundColor: Colors.white,
    flex: 1,
    resizeMode: 'contain',
    flexDirection: "column",
  },
  trash: {
    flex: 1,    
    resizeMode: 'contain',

  },
  trashContainer:{
    height: 36,
    width: 36,
  },
  productDetail: {
    flexDirection: 'column',
    flex: 1.5,
    padding: 15,
    justifyContent: 'space-between',
  },
  productDetailUpp: {
    flexDirection: 'row',
    flex: 2,
  },
  productDetailDown: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  productPrice: {
    flex: 1,
    textAlign: "left",
    textAlignVertical: "center",
  },
  productAmmount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-evenly',
  },
  productAmmountBtn: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
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

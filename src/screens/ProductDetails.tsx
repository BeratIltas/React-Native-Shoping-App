import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, Platform } from 'react-native'; // ToastAndroid ve Platform eklendi
import CommonHeader from '../navigation/Header/CommonHeader';
import { ProductDetailProps, ProductProps, RootStackParamList } from '../../type';
import Colors from '../assets/colors';
import Loader from '../components/Loader';
import { images } from '../assets/assets';
import AdviceProduct from '../components/AdviceProduct';
import Share from 'react-native-share';
import LottieView from 'lottie-react-native';
import { useCart } from '../components/Cart/CartContext';
import typography from '../assets/typography';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ExpandableSection from '../components/ExpandableSection';

const { width, height } = Dimensions.get('window');

const ProductDetails = ({ route }: any) => {
  const _id = route?.params?.product_id;
  const [productData, setProductsData] = useState<ProductDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productsArray, setProductsArray] = useState([]);
  const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});
  const addToCardRef = useRef<LottieView | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { addToCart } = useCart();

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://shopal.expozy.co/product-info/${_id}`, {
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      setProductsData({
        product_id: json.product_id,
        title: json.title,
        price: json.price,
        categories: json.categories,
        merchant_name: json.merchant_name,
        average_rating: json.average_rating,
        rating_count: json.rating_count,
        product_images: json.product_images,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [_id]);

  const handleShare = async () => {
    if (!productData) return;
    try {
      const shareOptions = {
        title: 'Product Details',
        message: `Check out this product: ${productData.title} for $${productData.price}`,
        url: productData.product_images?.[0],
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error during sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        page="goBack"
        title={"Details"}
        icon={images.shareIcon}
        onPress={handleShare}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.imgView}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ width: width, height: height / 2 }}
              >
                {productData?.product_images?.map((imgUrl: string, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: imgUrl }}
                    style={styles.img}
                  />
                ))}
              </ScrollView>

            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.rowBetween}>
                <Text style={styles.title}>
                  {productData?.merchant_name
                    ? productData.merchant_name.charAt(0).toUpperCase() + productData.merchant_name.slice(1)
                    : ""}
                </Text>
                <Text style={styles.price}>${productData?.price}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ReviewsScreen', { productId: productData?.product_id })}
                style={styles.starRow}
              >
                <Image style={{ height: 22, width: 22 }} source={images.star} />
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Text style={[{ fontWeight: "bold", textDecorationLine: 'underline' }, typography.Body1Medium]}>{productData?.average_rating}/5</Text>
                  <Text style={[{}, typography.Body1Medium]}>  ({productData?.rating_count})</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.description} >{productData?.title}</Text>
            </View>
            <View style={styles.divider} />
            <ExpandableSection title="Shipping Info">
              <Text style={{ fontSize: 15, lineHeight: 22, paddingBottom: 10, color: "#555" }}>
                Your order will be shipped within 3-5 business days. Tracking
                information will be provided once dispatched.
              </Text>
            </ExpandableSection>
            <View style={styles.divider} />
            <ExpandableSection title="Return Policy">
              <Text style={{ fontSize: 15, lineHeight: 22, paddingBottom: 10, color: "#555" }}>
                The return process is valid within 14 days after the product is received.
              </Text>
            </ExpandableSection>
            <View style={styles.divider} />
            <AdviceProduct productIds={productData?.product_id} />

          </ScrollView>

          <View style={styles.addToCartContainer}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                if (productData?.product_id) {
                  addToCart(productData.product_id);

                  if (Platform.OS === 'android') {
                    ToastAndroid.show('Sepete eklendi', ToastAndroid.SHORT);
                  }
                  addToCardRef.current?.play();
                } else {
                  console.error("Product ID is missing");
                }

              }}>
              <LottieView
                ref={addToCardRef}
                source={require("../assets/Animations/AddToCard.json")}
                loop={false}
                autoPlay={false}
                style={styles.cardIcon}
              />
              <Text style={styles.buttonText}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.extraLightGray,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingBottom: height * 0.15,
  },
  imgView: {
    width: width,
    height: height / 2,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: width,
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: Colors.white,
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.green,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10
  },
  description: {
    fontSize: 16,
    color: Colors.mediumGray,
    lineHeight: 24,
  },
  addToCartContainer: {
    position: 'absolute',
    bottom: '7%',
    left: '5%',
    right: '5%',
    backgroundColor: 'transparent',
  },
  addToCartButton: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    borderRadius: 25,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontFamily: 'Metropolis',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    paddingLeft: 10,
  },
  cardIcon: {
    height: 30,
    width: 30,
  }
});


export default ProductDetails;

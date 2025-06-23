import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, Platform } from 'react-native'; // ToastAndroid ve Platform eklendi
import CommonHeader from '../navigation/Header/CommonHeader';
import { RootStackParamList } from '../../type';
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
import axios from 'axios';

const { width, height } = Dimensions.get('window');


type ProductPropsDetail = {
  product_id: number;
  title: string;
  price: number;
  categories: string[];
  merchant_name: string;
  average_rating: number;
  rating_count: number;
  meta_data: { [key: string]: string }[];
  product_images: string[];
};

const ProductDetails = ({ route }: any) => {
  const product_id = route?.params?.product_id;
  const [productData, setProductsData] = useState<ProductPropsDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const addToCardRef = useRef<LottieView | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log('Route params:', route?.params);
  console.log('Product ID:', product_id);
  const { addToCart } = useCart();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://shopal.expozy.co/product-info/?product_id=${product_id}`);

      const data = response.data;

      setProductsData({
        product_id: data.product_id,
        title: data.title,
        price: data.price,
        categories: data.categories,
        merchant_name: data.merchant_name,
        average_rating: data.average_rating,
        rating_count: data.rating_count,
        meta_data: data.meta_data,
        product_images: data.product_images,
      });
    } catch (error: any) {
      console.error('Axios Error:', error.message || error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    console.log("Product ID:", product_id);
    getData();
  }, []);

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
                onScroll={(e) => {
                  const index = Math.round(e.nativeEvent.contentOffset.x / width);
                  setCurrentImageIndex(index);
                }}
                scrollEventThrottle={16}
              >
                {productData?.product_images?.map((imgUrl: string, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: imgUrl }}
                    style={styles.img}
                  />
                ))}
              </ScrollView>
              <View style={styles.dotsContainer}>
                {productData?.product_images?.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      currentImageIndex === index ? styles.activeDot : null,
                    ]}
                  />
                ))}
              </View>


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
            <ExpandableSection title="Product Details">
              <View style={styles.metaDataContainer}>
                {productData?.meta_data?.map((item, index) => {
                  const key = Object.keys(item)[0];
                  const value = key ? item[key] : "";
                  return (
                    <View key={index} style={styles.metaDataItem}>
                      <Text style={styles.metaDataKey}>{key}:</Text>
                      <Text style={styles.metaDataValue}>{value}</Text>
                    </View>
                  );
                })}
              </View>
            </ExpandableSection>
            <View style={styles.divider} />


            <AdviceProduct productIds={product_id} />
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
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: Colors.orange,
  },

  detailsContainer: {
    padding: 20,
    paddingTop: 10,
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
  },
  metaDataContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    gap: 8,
  },
  metaDataItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  metaDataKey: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.black,
    width: 120,
  },
  metaDataValue: {
    fontSize: 14,
    color: Colors.mediumGray,
    flexShrink: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 8,
    color: Colors.black,
  },


});


export default ProductDetails;

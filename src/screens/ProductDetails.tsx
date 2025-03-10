import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CommonHeader from '../components/CommonHeader';
import { ProductProps } from '../../type';
import Colors from '../assets/colors';
import Loader from '../components/Loader';
import { images } from '../assets/assets';
import AdviceProduct from '../components/AdviceProduct';

const { width, height } = Dimensions.get('window');

const ProductDetails = ({ route }: any) => {
  const _id = route?.params?._id;
  const [productData, setProductsData] = useState<ProductProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productsArray, setProductsArray] = useState([]);
  const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://jsonserver.reactbd.com/amazonpro/${_id}`);
      const json = await response.json();
      setProductsData(json);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setIsLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch('https://jsonserver.reactbd.com/amazonpro');
      const json = await response.json();
      setProductsArray(json);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  useEffect(() => {
    getData();
    fetchRelatedProducts();
  }, [_id]);

  const handleHeartPress = (productId: string) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <View style={styles.container}>
      <CommonHeader page="MainApp" title={productData?.title || "Details"} icon={images.shareIcon} />

      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.imgView}>
              {productData?.image && (
                <Image source={{ uri: productData?.image }} style={styles.img} />
              )}
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.rowBetween}>
                <Text style={styles.title}>{productData?.title}</Text>
                <Text style={styles.price}>${productData?.price}</Text>
              </View>
              <Text style={styles.description}>{productData?.description}</Text>
            </View>

            <AdviceProduct
              products={productsArray}
              onHeartPress={handleHeartPress}
              likedProducts={likedProducts}
            />
          </ScrollView>

          <View style={styles.lottieContainer}>
            <TouchableOpacity style={styles.addToCartButton}>
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
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingBottom: height * 0.2,
  },
  imgView: {
    width: width,
    height: height / 2,
    backgroundColor: Colors.ultraLightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  description: {
    fontSize: 16,
    color: Colors.mediumGray,
    lineHeight: 24,
  },
  lottieContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: Colors.white,
  },
  addToCartButton: {
    width: '100%',
    height: 48,
    borderRadius: 25,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Metropolis',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
  },
});

export default ProductDetails;

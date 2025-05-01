import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet, Image } from 'react-native';
import Header from '../navigation/Header/Header';
import Carousel from 'react-native-reanimated-carousel';
import { images } from '../assets/assets';
import Colors from '../assets/colors';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryRow from '../components/CategoryRow';
import AdviceProduct from '../components/AdviceProduct';
import PromotionCard from '../components/PromotionCard';

const { width } = Dimensions.get('window');

const HomePage = () => {
  const [productsArray, setProductsArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://jsonserver.reactbd.com/amazonpro');
      const json = await response.json();
      setProductsArray(json);
      await AsyncStorage.setItem('productData', JSON.stringify(json));
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const bannerImages = [images.bannerOne, images.bannerTwo, images.bannerThree];

  const handleHeartPress = (productId: string) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const renderItem = ({ item }: { item: any }) => (
    <ProductCard
      item={item}
      onHeartPress={handleHeartPress}
      isLiked={!!likedProducts[item._id]}
    />
  );

  return (
    <View style={styles.container}>
      <Header />
      <View>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={productsArray}
            contentContainerStyle={styles.container}
            keyExtractor={(item: any) => String(item?._id)}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={() => {
              getData();
            }}
            numColumns={2}
            ListHeaderComponent={
              <View>
                <Carousel
                  loop
                  width={width}
                  style={{ height: 150 }}
                  autoPlay={true}
                  data={bannerImages}
                  scrollAnimationDuration={2500}
                  renderItem={({ item }) => {
                    return (
                      <View key={String(item)}>
                        <Image
                          source={item}
                          style={{ width: '100%', height: 150, resizeMode: 'contain' }}
                        />
                      </View>
                    );
                  }}
                />
                <CategoryRow />
                <AdviceProduct
                  products={productsArray}
                  onHeartPress={handleHeartPress}
                  likedProducts={likedProducts} />
                {productsArray
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 50)
                  .map((item: any) => (
                    <PromotionCard
                      key={item._id}
                      item={{
                        _id: item._id,
                        image: item.image,
                        brand: item.brand,
                        category:item.category,
                      }}
                    />
                  ))}
              </View>

            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteGray,
    paddingBottom: 100,
  },
});

export default HomePage;

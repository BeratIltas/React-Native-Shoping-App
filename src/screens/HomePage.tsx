import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Image, FlatList } from 'react-native';
import Header from '../navigation/Header/Header';
import Carousel from 'react-native-reanimated-carousel';
import { images } from '../assets/assets';
import Colors from '../assets/colors';
import CategoryRow from '../components/CategoryRow';
import AdviceProduct from '../components/AdviceProduct';
import PromotionCard from '../components/PromotionCard';
import Loader from '../components/Loader';

const { width } = Dimensions.get('window');
interface Product {
  product_id: string;
  product_images?: { contentUrl?: string[] };
  merchant_name: string;
  categories: string;
}

const HomePage = () => {
const [productsArray, setProductsArray] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        sort_by: 'highest_price',
        min_ratings: '3',        
      }).toString();

      const response = await fetch(`https://shopal.expozy.co/filter-product?${queryParams}`);
      const json = await response.json();
      console.log(productsArray)
      setProductsArray(json.products?.slice(10, 20) || []);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const bannerImages = [images.bannerOne, images.bannerTwo, images.bannerThree];

  if (isLoading) {
    return <Loader />;
  }

  const ListHeader = () => (
    <>
      <Carousel
        loop
        width={width}
        style={{ height: 150 }}
        autoPlay={true}
        data={bannerImages}
        scrollAnimationDuration={2500}
        renderItem={({ item }) => (
          <View key={String(item)}>
            <Image
              source={item}
              style={{ width: '100%', height: 150, resizeMode: 'contain' }}
            />
          </View>
        )}
      />
      <CategoryRow />
      <AdviceProduct productIds={['39049410', '32660527', '329980272']} />
    </>
  );

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={productsArray}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={({ item }) => (
          <PromotionCard
            item={{
              _id: item.product_id,
              image: item.product_images?.contentUrl?.[0],
              brand: item.merchant_name,
              category: item.categories,
            }}
          />
        )}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteGray,
    flex: 1,
  },
});

export default HomePage;

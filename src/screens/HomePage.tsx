import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Header from '../navigation/Header/Header';
import Carousel from 'react-native-reanimated-carousel';
import { images } from '../assets/assets';
import Colors from '../assets/colors';
import CategoryRow from '../components/CategoryRow';
import AdviceProduct from '../components/AdviceProduct';
import PromotionCard from '../components/PromotionCard';
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';

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
  const navigation: any = useNavigation();

  const getData = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        sort_by: 'highest_price',
        min_ratings: '3',
      }).toString();

      const response = await fetch(`https://shopal.expozy.co/filter-product?${queryParams}`);
      const json = await response.json();
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

  const bannerImages = [
    { image: images.bannerTshirt, screen: "TShirtCustomizer" },
    { image: images.bannerTwo, screen: "ProductsPage", category: "yaz" }, 
    { image: images.bannerThree, screen: "ProductsPage", category: "kış" },
    { image: images.bannerFR, screen: "FashionRecommendationScreen" },

  ];


  if (isLoading) {
    return <Loader />;
  }

  const ListHeader = () => (
    <>
      <Carousel
        loop
        width={width}
        style={{ height: 150, marginTop: 5 }}
        autoPlay={true}
        data={bannerImages}
        scrollAnimationDuration={2500}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>
            item.screen === "ProductsPage"
              ? navigation.navigate(item.screen, { category: item.category })
              : navigation.navigate(item.screen)
          }
          >
            <View key={String(item)}>
              <Image
                source={item.image}
                style={{ width: '100%', height: 150, resizeMode: 'contain' }}
              />
            </View>
          </TouchableOpacity>

        )}
      />
      <CategoryRow />
      <AdviceProduct productIds={['39049410', '78042017', '124732911', '660525591', '32660527', '329980272']} />
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
        removeClippedSubviews={true}
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

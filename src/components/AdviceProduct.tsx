import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ProductCard from './ProductCard';
import typography from '../assets/typography';
import { useAuth } from './Account/AuthContext';
import axios from 'axios';

type AdviceProductProps = {
  productIds: string[] | number | undefined;
};

const AdviceProduct: React.FC<AdviceProductProps> = ({ productIds }) => {
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const { user } = useAuth();

  const productIdsArray = useMemo(() => {
    if (typeof productIds === 'number') {
      return [productIds.toString()];
    } else if (Array.isArray(productIds)) {
      return productIds;
    }
    return [];
  }, [productIds]);

  const getRandomProductId = useMemo(() => {
    if (productIdsArray.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * productIdsArray.length);
    return productIdsArray[randomIndex];
  }, [productIdsArray]);

  const fetchSimilarProducts = async () => {
    if (!getRandomProductId) return;

    try {
      const response = await axios.post('https://shopal.expozy.co/similar-product', {
        product_id: getRandomProductId,
        top_n: 5,
      });
      setRecommendedProducts(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching similar products:', error);
    }
  };

  useEffect(() => {
    fetchSimilarProducts();
  }, [getRandomProductId]);

  const renderAdviceItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <ProductCard item={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[typography.Header4, styles.categoryHeader]}>
        Suggestions for {user?.displayName ? user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1) : 'You'}
      </Text>
      <FlatList
        data={recommendedProducts}
        renderItem={renderAdviceItem}
        keyExtractor={(item) => String(item.product_id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  categoryHeader: {
    flex: 1,
    padding: 5,
    paddingLeft: 25,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  itemContainer: {},
});

export default AdviceProduct;

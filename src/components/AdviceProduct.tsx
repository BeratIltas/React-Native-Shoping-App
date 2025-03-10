import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ProductCard from './ProductCard';
import typography from '../assets/typography';

const AdviceProduct = ({ products, onHeartPress, likedProducts }: { 
  products: Array<any>, 
  onHeartPress: (productId: string) => void,
  likedProducts: { [key: string]: boolean },
}) => {
  const renderAdviceItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <ProductCard
        item={item}
        onHeartPress={onHeartPress}
        isLiked={!!likedProducts[item._id]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
    <Text style={[typography.Header4, styles.categoryHeader]}>Advice Product</Text>
      <FlatList
        data={products}
        renderItem={renderAdviceItem}
        keyExtractor={(item) => String(item._id)}
        horizontal // Enables horizontal scrolling
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
  itemContainer: {
   
  },
});

export default AdviceProduct;

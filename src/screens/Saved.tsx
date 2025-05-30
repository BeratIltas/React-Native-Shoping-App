import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CommonHeader from '../navigation/Header/CommonHeader';
import Colors from '../assets/colors';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import { useWishlist } from '../components/Wishlist/WishlistContext';

const Saved = () => {
  const { wishlistItems, removeFromWishlist, isInWishlist } = useWishlist();

  const handleUnliked = async (productId: number) => {
    await removeFromWishlist(productId);
  };

  const renderRightActions = () => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText}>Remove</Text>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => handleUnliked(item.product_id)}
      >
        <ProductCardHorizontal
          item={item}
          onHeartPress={() => handleUnliked(item.product_id)}
          isLiked={isInWishlist(item.product_id)}
        />
      </Swipeable>
    );
  };

  return (
    <View>
      <CommonHeader page="Saved" title="Saved" iconleft={null} icon={null} onPress={undefined} />
      <FlatList
        data={wishlistItems}
        contentContainerStyle={styles.container}
        keyExtractor={(item: any) => String(item.product_id)}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={() => {}}
        numColumns={1}
        ItemSeparatorComponent={() => null}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: Colors.black, fontSize: 16 }}>No saved items.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteGray,
    paddingBottom: 100,
  },
  deleteContainer: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
    margin: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Saved;

import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CommonHeader from '../navigation/Header/CommonHeader';
import Colors from '../assets/colors';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import { useWishlist } from '../components/Wishlist/WishlistContext';
import { ProductProps } from '../../type';
import { images } from '../assets/assets';
import typography from '../assets/typography';


const Saved = () => {
  const { wishlistItems, removeFromWishlist, isInWishlist } = useWishlist();
  const handleUnliked = async (productId: number) => {
    await removeFromWishlist(productId);
    console.log(productId)
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
        keyExtractor={(item: any) => String(item.id ?? item.product_id ?? item._id)}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={() => { }}
        numColumns={1}
        ItemSeparatorComponent={() => null}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 200 }}>
            <Image source={images.FullHeart}></Image>
            <Text style={[{ color: Colors.black, fontWeight: 700 }, typography.Header4]}>No Saved Items!</Text>
            <Text style={[{ textAlignVertical: 'center', textAlign: 'center', paddingHorizontal: 70 }, typography.Body1Regular]} numberOfLines={2} ellipsizeMode="tail">
              You don’t have any saved items. Go to home and add some.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteGray,
    flex: 1,
    paddingBottom: 320,
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

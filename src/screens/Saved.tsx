import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CommonHeader from '../navigation/Header/CommonHeader';
import Colors from '../assets/colors';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import { useAuth } from '../components/Account/AuthContext';
import { images } from '../assets/assets';

const Saved = () => {
  const [productsArray, setProductsArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});
  const { user } = useAuth();

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://jsonserver.reactbd.com/amazonpro');
      const json = await response.json();
      setProductsArray(json);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUnliked = async (userId: any, productId: string) => {
    console.log(`Unliked UserID: ${userId}, ProductID: ${productId}`);
    setLikedProducts((prev) => {
      const updatedLiked = { ...prev };
      delete updatedLiked[productId];
      return updatedLiked;
    });
  };

  const renderRightActions = (item: any) => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText}>Remove</Text>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item)}
        onSwipeableOpen={() => handleUnliked(user?.uid, item._id)}
        containerStyle={{ borderWidth: 0 }}
      >
        <ProductCardHorizontal
          item={item}
          onHeartPress={() => setLikedProducts((prev) => ({ ...prev, [item._id]: !prev[item._id] }))}
          isLiked={!!likedProducts[item._id]}
        />
      </Swipeable>
    );
  };

  return (
    <View>
      <CommonHeader page="Saved" title="Saved" iconleft={null} icon={null} onPress={undefined}/>
      <FlatList
        data={productsArray}
        contentContainerStyle={styles.container}
        keyExtractor={(item: any) => String(item?._id)}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={() => getData()}
        numColumns={1}
        ItemSeparatorComponent={() => null}
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
    width: "40%",
    borderRadius:10,
    margin:5
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Saved;
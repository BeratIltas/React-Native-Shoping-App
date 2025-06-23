import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Colors from '../assets/colors';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/Search/SearchBar';
import { images } from '../assets/assets';
import { RootStackParamList } from '../../type';
import { useRecentSearch } from '../components/Search/RecentSearchContext ';

const SearchScreen = () => {
  const [productsArray, setProductsArray] = useState<any[]>([]);
  const { recentSearches, clearSearches, removeSearch } = useRecentSearch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderRecentSearchItem = ({ item }: { item: string }) => (
    <View style={styles.searchItem}>
      <TouchableOpacity style={styles.searchTextContainer} onPress={() => setProductsArray([])}>
        <Text style={styles.searchText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeSearch(item)} style={styles.deleteButton}>
        <Image source={images.deleteIcon} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }} >
        <TouchableOpacity onPress={() => navigation.navigate('MainApp')} style={styles.cancelButton}>
          <Image style={{height:24,width:24,marginLeft:10,}} source={images.leftArrow}></Image>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <SearchBar setResults={setProductsArray} />
        </View>

      </View>


      {productsArray.length > 0 ? (
        <FlatList
          data={productsArray}
          removeClippedSubviews={true}
          keyExtractor={(item) => String(item.product_id)}
          renderItem={({ item }) => <ProductCard item={item} />}
          numColumns={2}
        />
      ) : (
        <View style={styles.recentSearchContainer}>
          <View style={styles.header}>
            <Text style={[styles.headerText]}>Recent Searches</Text>
            <TouchableOpacity onPress={clearSearches}>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRecentSearchItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: Colors.white,
  },
  cancelButton: {
    paddingLeft:10,
    paddingVertical: 10,
    alignSelf: 'flex-end',
  },
  recentSearchContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  clearAllText: {
    color: Colors.orange,
    fontSize: 14,
  },
  list: {
    paddingBottom: 16,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 6,
    backgroundColor: Colors.whiteGray,
    borderRadius: 10,
  },
  searchTextContainer: {
    flex: 1,
  },
  searchText: {
    fontSize: 16,
    color: Colors.black,
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.lightGray,
  },
});

export default SearchScreen;
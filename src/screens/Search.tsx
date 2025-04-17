import React, { useEffect, useState } from 'react';
import {
  View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../assets/colors';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/Search/SearchBar';
import RecentSearches from '../components/Search/RecentSearches';
import { images } from '../assets/assets';
import { RootStackParamList } from '../navigation/AppNavigation';

const { height } = Dimensions.get('window');


const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [productsArray, setProductsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const loadRecentSearches = async () => {
    try {
      const storedSearches = await AsyncStorage.getItem('recentSearches');
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const saveRecentSearch = async (newSearch: string) => {
    if (!newSearch.trim()) return;
    try {
      const updatedSearches = [newSearch, ...recentSearches.filter((item) => item !== newSearch)];
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const loadProductsFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('productData');
      if (storedData) {
        setProductsArray(JSON.parse(storedData));
      }
    } catch (error) {
      console.log('Error fetching data from storage:', error);
    }
  };

  useEffect(() => {
    loadProductsFromStorage();
    loadRecentSearches();
  }, []);

  const filteredProducts = query
    ? productsArray.filter((product: any) =>
        product?.title?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

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
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
          <Image source={images.leftArrow} style={styles.image} />
        </TouchableOpacity>
        <SearchBar query={query} setQuery={setQuery} saveRecentSearch={saveRecentSearch} />
      </View>

      {query === '' ? (
        <RecentSearches
          recentSearches={recentSearches}
          clearSearches={() => setRecentSearches([])}
          removeSearchItem={(item: string) => setRecentSearches(recentSearches.filter((search) => search !== item))}
        />
      ) : isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item: any) => String(item._id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,    
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',

  },
  listContainer: {
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
});

export default SearchScreen;

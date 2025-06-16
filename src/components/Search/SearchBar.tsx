import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { images } from '../../assets/assets';
import { useRecentSearch } from './RecentSearchContext ';

const API_BASE_URL = "https://shopal.expozy.co";

const SearchBar = ({ setResults }: { setResults: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [query, setQuery] = useState('');
  const { addSearch } = useRecentSearch();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchProductsByCategory = async (category: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/filter-product`, { params: { category } });
      setResults(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (text.trim()) {
        fetchProductsByCategory(text);
        addSearch(text);
      }
    }, 500);
  };


  return (
    <View style={styles.searchContainer}>
      <Image source={images.searchIcon} style={styles.searchIcon} />
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Search for products..."
        placeholderTextColor={Colors.lightGray}
        style={[styles.searchInput, typography.Body2Regular]}
      />
      <TouchableOpacity onPress={() => setQuery('')}>
        <Image source={images.deleteIcon} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.extraLightGray,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.orange,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: Colors.black,
    fontSize: 16,
    paddingVertical: 5,
  },
  deleteIcon: {
    tintColor: Colors.gray,
  },
});

export default SearchBar;
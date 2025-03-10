import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { images } from '../../assets/assets'; 
const SearchBar = ({ query, setQuery, saveRecentSearch }: any) => (
  <View style={styles.searchContainer}>
    <Image source={images.searchIcon} style={styles.searchIcon} /> 
    <TextInput
      value={query}
      onChangeText={setQuery}
      onBlur={() => saveRecentSearch(query)}
      placeholder="Search for products..."
      placeholderTextColor={Colors.lightGray}
      style={[styles.searchInput, typography.Body2Regular]}
    />
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:10,
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
    tintColor: Colors.lightGray, 
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: Colors.black, 
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default SearchBar;

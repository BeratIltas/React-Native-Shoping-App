import React from 'react';
import { TextInput, StyleSheet, Image } from 'react-native';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';

const SearchBar = ({ query, setQuery, saveRecentSearch }: any) => (
  <TextInput
    
    value={query}
    onChangeText={setQuery}
    onBlur={() => saveRecentSearch(query)}
    placeholder="Search for products..."
    placeholderTextColor={Colors.lightGray}
    style={[styles.searchBar, typography.Body2Regular]}
  />
);

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.extraLightGray,
    backgroundColor: Colors.white,
  },
});

export default SearchBar;

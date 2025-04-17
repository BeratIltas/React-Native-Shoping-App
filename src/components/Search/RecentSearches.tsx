import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { images } from '../../assets/assets';

const RecentSearches = ({ recentSearches, clearSearches, removeSearchItem, setQuery }: any) => {
  const renderRecentSearchItem = ({ item }: { item: string }) => (
    <View style={styles.searchItem}>

      <TouchableOpacity style={styles.searchTextContainer} onPress={() => setQuery(item)}>
        <Text style={styles.searchText}>{item}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => removeSearchItem(item)} style={styles.deleteButton}>
        <Image source={images.deleteIcon} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.Header4, styles.headerText]}>Recent Searches</Text>
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
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default RecentSearches;

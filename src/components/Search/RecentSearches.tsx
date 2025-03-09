import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { images } from '../../assets/assets';

const RecentSearches = ({ recentSearches, clearSearches, removeSearchItem }: any) => {
  const renderRecentSearchItem = ({ item }: { item: string }) => (
    <View style={styles.recentSearchItem}>
      <TouchableOpacity onPress={() => setQuery(item)}>
        <Text style={[typography.Body2Regular, styles.recentSearchText]}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeSearchItem(item)}>
        <Image source={images.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.recentSearchesHeader}>
        <Text style={typography.Header4}>Recent Searches</Text>
        <TouchableOpacity onPress={clearSearches}>
          <Text style={[typography.Body2Medium, styles.clearAllText]}>Clear all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecentSearchItem}
        contentContainerStyle={styles.recentSearchesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recentSearchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 8,
  },
  recentSearchesList: {
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.extraLightGray,
  },
  recentSearchText: {
    fontFamily: 'typography.Body2Regular',
    paddingLeft: 10,
    fontSize: 16,
    color: Colors.black,
  },
  clearAllText: {
    color: "#3B82F6",
  },
});

export default RecentSearches;
function setQuery(item: string): void {
    throw new Error('Function not implemented.');
}


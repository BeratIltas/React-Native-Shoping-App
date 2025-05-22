import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../assets/assets';
import typography from '../../assets/typography';
import Colors from '../../assets/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../type';

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.containerView}>
      <TouchableOpacity>
        <Image source={images.headerLogo} style={{resizeMode:'cover',height:44,width:160}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Image source={images.searchIcon} style={styles.image}></Image>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  containerView: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.gray,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: Colors.orange,
  },
});


export default Header
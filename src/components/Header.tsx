import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../assets/assets';
import typography from '../assets/typography';
import Colors from '../assets/colors';

const Header = () => {
  return (
      <View style={styles.containerView}>
        <TouchableOpacity>
          <Text style={[typography.Header2,styles.titleText]}>Pazar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={images.bell} style={styles.image}></Image>
        </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
  containerView: {
    paddingTop: 30,
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
    // tintColor: Colors.orange,
  },
  titleText: {
    fontWeight: '900',
    color: Colors.black,
    textTransform: 'uppercase', 
    letterSpacing: 9, 
  },
});


export default Header
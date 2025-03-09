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
          <Text style={typography.Header2}>Pazarrradad</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={images.bell} style={styles.image}></Image>
        </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
  containerView: {
    paddingTop:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    opacity: 1,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    opacity: 1
  },
});
export default Header
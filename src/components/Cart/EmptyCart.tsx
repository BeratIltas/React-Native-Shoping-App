import { Image, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { images } from '../../assets/assets';

export class EmptyCart extends Component {
  render() {
    return (
        <View style={styles.emptyTextContainer}>
          <Image source={images.cartEmpty} />
          <Text style={[typography.Header4, styles.emptyTextHeader]}>Your cart is empty!</Text>
          <Text style={[typography.Body1Regular, styles.emptyText]}>When you add products, they'll
            appear here.</Text>
        </View>
    )
  }
}
const styles = StyleSheet.create({

emptyTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  emptyTextHeader: {
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: 'center',
    color: Colors.black
  },
  emptyText: {
    color: Colors.gray,
  },
});

export default EmptyCart
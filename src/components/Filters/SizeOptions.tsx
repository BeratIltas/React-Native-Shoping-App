import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../assets/colors'
import typography from '../../assets/typography'

const SizeOptions = () => {
    return (
        <View>
            <View style={styles.sizeContainer}>
                <Text style={[typography.Body3, styles.label]}>Size</Text>
                <Text style={styles.sizeText}>L ⌄</Text>
            </View>

            <View style={styles.divider} />
        </View>
    )
}
const styles = StyleSheet.create({
divider: {
    height: 1,
    backgroundColor: Colors.extraLightGray,
    marginVertical: 10,
    marginHorizontal: 20,
},
label: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "black",
},
sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
sizeText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
    paddingRight:20,
},
})
export default SizeOptions
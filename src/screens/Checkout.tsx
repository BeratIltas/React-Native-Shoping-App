import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CommonHeader from '../navigation/Header/CommonHeader'
import Colors from '../assets/colors'
import typography from '../assets/typography'
import { images } from '../assets/assets'


const Checkout = () => {
    return (
        <View style={styles.container}>
            <CommonHeader title="CheckOut" icon={null} page="goBack" />

            <View style={styles.divider} />

            <View style={styles.addressContainer}>
                <View style={styles.addressheader} >
                    <Text style={[typography.Body1, styles.title]}>Delivery Address</Text>
                    <TouchableOpacity>
                        <Text style={[typography.Body2Medium, styles.changeText]}>Change</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.addressBody}>
                    <Image source={images.location} />
                    <View>
                        <Text style={[typography.Body2, styles.subTitle]}>Home</Text>
                        <Text style={[typography.Body2Regular, styles.addressText]} numberOfLines={1} ellipsizeMode="tail">
                            925 S Chugach St #APT 10, Alaska 99645
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.paymentContainer}>
                <View style={styles.addressheader}>
                    <Text style={[typography.Body1, styles.title]}>Payment Method</Text>
                    <TouchableOpacity >
                        <Text style={[typography.Body2Medium, styles.changeText]}>Change</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    
                </View>
                <View>

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    divider: {
        height: 0.5,
        backgroundColor: Colors.extraLightGray,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    addressContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        gap: 15,
    },
    addressheader: {
        alignItems: "stretch",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    title: {
        flex: 3,
        fontWeight: "700",
    },
    changeText: {
        textDecorationLine: "underline",
        textAlign: "center",
        color: Colors.orange,
    },
    addressBody: {
        alignItems: "center",
        flexDirection: "row",
        gap: 15
    },
    subTitle: {
        fontWeight: "700",
    },
    addressText: {
        paddingRight: 20,
    },
    paymentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
        gap: 15,
    },
})
export default Checkout
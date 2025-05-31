import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommonHeader from '../navigation/Header/CommonHeader'
import Colors from '../assets/colors'
import typography from '../assets/typography'
import { images } from '../assets/assets'
import { useCart } from '../components/Cart/CartContext'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../type'
import { usePaymentCards } from '../components/Account/Payment/PaymentCardContext'
import { useAddresses } from '../components/Account/Address/AddressContext'
import axios from 'axios'
import { useAuth } from '../components/Account/AuthContext'


const Checkout = () => {
    const [query, setQuery] = useState<string>("");
    const [discount, setDiscount] = useState<string>("0");
    const { cartItems, totalPrice } = useCart();
    const shippingFee = "50";
    const total = totalPrice - Number(discount) + Number(shippingFee);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const { defaultCard } = usePaymentCards();
    const { defaultAddress } = useAddresses();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { user } = useAuth();
    const userId = user?.uid;

    useEffect(() => {
        const showListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const hideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    const handleDiscount = (): void => {
        { query === "" ? (setDiscount("0")) : (setDiscount("50")) }
    }

    const handleBuyCartItems = async (userId: string) => {
        try {
            const response = await axios.post(`https://shopal.expozy.co/cart/buy`, null, {
                params: { user_id: userId },
                headers: {
                    "Accept": "application/json"
                }
            });

            Alert.alert("Success", "Cart items purchased successfully!");
            console.log("Buy Cart Response:", response.data);
        } catch (error: any) {
            console.error("Error buying cart items:", error.response?.data || error.message);
            Alert.alert("Error", "Failed to complete purchase.");
        }
    };

    return (

        <View style={styles.container}>
            <CommonHeader title="CheckOut" icon={null} page="goBack" />

            <View style={styles.divider} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.addressContainer}>
                        <View style={styles.addressheader} >
                            <Text style={[typography.Body1, styles.title]}>Delivery Address</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Addresses")}>
                                <Text style={[typography.Body2Medium, styles.changeText]}>{defaultAddress ? ("Change") : ("Add")}</Text>
                            </TouchableOpacity>
                        </View>
                        {defaultAddress ? (
                            <View style={styles.addressBody}>
                                <Image source={images.location} />
                                <View>
                                    <Text style={[typography.Body2, styles.subTitle]}>{defaultAddress?.name}</Text>
                                    <Text style={[typography.Body2Regular, styles.addressText]} numberOfLines={1} ellipsizeMode="tail">
                                        {[defaultAddress.street, defaultAddress.country, defaultAddress.city, defaultAddress.zip].join(' ')}
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <Text style={{ textAlign: "center" }}>No saved address</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.paymentContainer}>
                        <View style={styles.addressheader}>
                            <Text style={[typography.Body1, styles.title]}>Payment Method</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("PaymentMethods")}>
                                <Text style={[typography.Body2Medium, styles.changeText]}>{defaultCard ? ("Change") : ("Add")}</Text>
                            </TouchableOpacity>
                        </View>
                        {defaultCard ? (
                            <View style={styles.paymentBody}>
                                <View>
                                    {defaultCard?.cardNumber.startsWith("4") ?
                                        <Image source={images.visa} style={{ tintColor: "blue" }} /> : <Image source={images.mastercard} />
                                    }
                                </View>
                                <View>
                                    <Text>**** **** **** {defaultCard?.cardNumber.slice(-4)}</Text>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <Text style={{ textAlign: "center" }}>No saved cards</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.orderSummaryContainer} >
                        <View style={styles.addressheader}>
                            <Text style={[typography.Body1, styles.title]}>Order Summary</Text>
                        </View>
                        <View style={styles.orderSubContainers}>
                            <Text style={[styles.orderLeftTexts, typography.Body1Regular]}>Sub Total</Text>
                            <Text style={[styles.orderRightTexts, typography.Body1Medium]}>{totalPrice}</Text>
                        </View>
                        <View style={styles.orderSubContainers}>
                            <Text style={[styles.orderLeftTexts, typography.Body1Regular]}>Discount</Text>
                            <Text style={[styles.orderRightTexts, typography.Body1Medium]}>{discount}</Text>
                        </View>
                        <View style={styles.orderSubContainers}>
                            <Text style={[styles.orderLeftTexts, typography.Body1Regular]}>Shipping Fee</Text>
                            <Text style={[styles.orderRightTexts, typography.Body1Medium]}>{shippingFee}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.orderSummaryContainer} >
                        <View style={styles.orderSubContainers}>
                            <Text style={[typography.Body1Regular, {
                                fontWeight: "semibold", flex: 3,
                            }]}>Total</Text>
                            <Text style={[typography.Body1, { fontWeight: "semibold" }]}>{total}</Text>
                        </View>
                        <View style={styles.promoContainer}>
                            <View style={styles.promoInputContainer}>
                                <Image source={images.discount} style={styles.discountIcon} />
                                <TextInput
                                    value={query}
                                    onChangeText={(text) => setQuery(text)}
                                    placeholder="Enter Promo Code"
                                    placeholderTextColor={Colors.lightGray}
                                    style={[styles.discountInput, typography.Body2Regular]}
                                />

                                {query !== '' && (
                                    <TouchableOpacity onPress={() => [setQuery(''), setDiscount("0")]}>
                                        <Image source={images.deleteIcon} style={styles.deleteIcon} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <TouchableOpacity style={styles.addButton} onPress={handleDiscount}>
                                <Text style={[styles.addText, typography.Body1Medium]}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>

            {!isKeyboardVisible && (
                <TouchableOpacity style={styles.orderButton} onPress={()=>handleBuyCartItems(userId!)}>
                    <Text style={[styles.addText, typography.Body1Medium]}>Place Order</Text>
                </TouchableOpacity>
            )}

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
        paddingHorizontal: 20,
        paddingVertical: 5,
        gap: 15,
    },
    paymentBody: {
        resizeMode: "center",
        flexDirection: "row",
        gap: "20",
    },
    orderSummaryContainer: {
        paddingHorizontal: 20,
        gap: 10,
    },
    orderSubContainers: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-around",
    },
    orderLeftTexts: {
        flex: 3,
        color: Colors.lightGray
    },
    orderRightTexts: {
        textAlign: "center",
    },
    promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingTop: 10
    },
    addButton: {
        flex: 1,
        backgroundColor: Colors.black,
        alignItems: "center",
        borderRadius: 10,
    },
    addText: {
        paddingVertical: 10,
        color: Colors.white
    },
    promoInputContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.extraLightGray,
        backgroundColor: Colors.white,
    },
    discountIcon: {
        width: 20,
        height: 20,
        tintColor: Colors.orange,
        marginRight: 10,

    },
    discountInput: {
        flex: 1,
        color: Colors.black,
        fontSize: 16,
        paddingVertical: 5,
    },
    deleteIcon: {
        tintColor: Colors.gray,
    },
    orderButton: {
        backgroundColor: Colors.black,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 40,
        margin: 20,
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
    }
})
export default Checkout
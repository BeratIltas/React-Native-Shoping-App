import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import CommonHeader from "../../../navigation/Header/CommonHeader";
import Colors from "../../../assets/colors";
import typography from "../../../assets/typography";
import { images } from "../../../assets/assets";
import axios from "axios";
import { usePaymentCards } from "../Payment/PaymentCardContext";
import { useAddresses } from "../Address/AddressContext";
import CommentModal from "./CommentModal";
import { useNavigation } from "@react-navigation/native";

interface ProductItem {
    product_name: string;
    product_id: number;
}
const OrderDetailsScreen = ({ route }: any) => {
    const orderId = route?.params?.orderId;
    const [commentModalVisible, setCommentModalVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState<ProductItem | null>(null);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { defaultCard } = usePaymentCards();
    const { defaultAddress } = useAddresses();
    const navigation: any = useNavigation();
    const [cancelMessage, setCancelMessage] = useState<string | null>(null);


    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://shopal.expozy.co/orders/${orderId}`);
                setOrder(response.data);
            } catch (error) {
                console.error("Order details fetch error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color={Colors.black} />
            </View>
        );
    }

    if (!order) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <Text>Order not found</Text>
            </View>
        );
    }


    const cancelOrder = async () => {
        setLoading(true);
        setCancelMessage(null);
        try {
            const response = await fetch(`https://shopal.expozy.co/orders/cancel/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('Cancel response data:', data);

            setCancelMessage('Siparişiniz iptal edilmiştir');
        } catch (e: any) {
            console.error('Cancel order error:', e);
            setCancelMessage('Sipariş iptali başarısız oldu'); // İstersen hata mesajı da gösterebilirsin
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <CommonHeader title={`Order №  ${order.id}`} page="goBack" icon={null} onPress={undefined} />
            <ScrollView style={{ padding: 20 }}>

                <View style={{ flexDirection: "row", gap: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text style={styles.label}>Status:</Text>
                        <Text style={[styles.value, { color: Colors.green }]}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Text>

                    </View>
                    <View style={styles.topInfo}>
                        <Text style={styles.date}>{order.created_at}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>{order.items.length} items</Text>

                <FlatList
                    data={order.items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemCard}>
                            <Image source={{ uri: item.product_image[0] }} style={styles.itemImage} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">{item.product_name.charAt(0).toUpperCase() + item.product_name.slice(1)}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={styles.itemDetail}>Units: {item.quantity}</Text>
                                    <Text style={styles.price}>{item.price}$</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedItem(item);
                                    setCommentModalVisible(true);
                                }}
                            >
                                <Image style={{ height: 40, width: 40, marginRight: 10, }} source={images.comment} />
                            </TouchableOpacity>
                        </View>
                    )}
                    scrollEnabled={false}
                    removeClippedSubviews={false}

                />
                <CommentModal
                    visible={commentModalVisible}
                    onClose={() => setCommentModalVisible(false)}
                    product_name={selectedItem?.product_name}
                    product_id={selectedItem?.product_id}

                />
                <Text style={styles.sectionTitle}>Order information</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel} numberOfLines={1} ellipsizeMode="tail">Shipping Address:</Text>
                    <Text style={[typography.Body2Regular]} numberOfLines={1} ellipsizeMode="tail">
                        {[defaultAddress?.street, defaultAddress?.country, defaultAddress?.city, defaultAddress?.zip].join(' ')}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel} numberOfLines={1} ellipsizeMode="tail">Payment method:</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            {defaultCard?.cardNumber.startsWith("4") ?
                                <Image source={images.visa} style={{ tintColor: "blue" }} /> : <Image source={images.mastercard} />
                            }
                        </View>
                        <View>
                            <Text>**** **** **** {defaultCard?.cardNumber.slice(-4)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel} numberOfLines={1} ellipsizeMode="tail">Discount:</Text>
                    <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">5</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel} numberOfLines={1} ellipsizeMode="tail">Total Amount:</Text>
                    <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">{order.total_price}</Text>
                </View>
                <TouchableOpacity onPress={() => cancelOrder()}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.helpBtn} onPress={() => navigation.navigate('HelpScreen')}>
                <Image source={images.headPhones} style={{ tintColor: Colors.white, width: 20, height: 20 }} />
                <Text style={{ color: Colors.white }}>
                    Help
                </Text>
            </TouchableOpacity>
            {cancelMessage && (
                <View style={styles.messageBox}>
                    <Text style={styles.messageText}>{cancelMessage}</Text>
                    <TouchableOpacity style={{ backgroundColor: Colors.orange, borderRadius: 10, padding: 10, }} onPress={() => navigation.navigate('MainApp')}>
                        <Text style={{ color: Colors.white }} >Continue</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    topInfo: {
        alignItems: "center",
    },
    date: {
        fontSize: 14,
        color: "#888",
    },
    trackingContainer: {
        marginTop: 20,
        gap: 8,
    },
    label: {
        fontWeight: "600",
        fontSize: 14,
    },
    value: {
        fontSize: 14,
        color: "#000",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 10,
    },
    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    itemImage: {
        width: 60,
        height: 80,
        resizeMode: "cover",
        borderRadius: 4,
        marginRight: 10,
    },
    itemInfo: {
        flex: 1,
        gap: 10,
        paddingHorizontal: 10,
        paddingRight: 30,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "600",
    },
    itemBrand: {
        fontSize: 12,
        color: "#888",
    },
    itemDetail: {
        fontSize: 12,
        color: "#444",
    },
    price: {
        fontSize: 14,
        fontWeight: "700",
    },
    infoRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        textAlignVertical: "center",
        gap: 10,
    },
    infoLabel: {
        fontWeight: "600",
        fontSize: 14,
    },
    infoValue: {
        fontSize: 14,
        color: "#000",
        marginTop: 4,
    },
    paymentRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        gap: 8,
    },
    cardIcon: {
        width: 30,
        height: 20,
        resizeMode: "contain",
    },

    buttonText: { color: 'white', fontSize: 16 },
    messageBox: {
        backgroundColor: '#000000cc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        alignItems: 'center',
        marginHorizontal: 40,
        gap: 20,
    },
    messageText: {
        color: 'white',
        fontSize: 16,
    },
    helpBtn: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black,
        padding: 15,
        marginHorizontal: 20,
        borderRadius: 20,
        gap: 10,
    },

});

export default OrderDetailsScreen;

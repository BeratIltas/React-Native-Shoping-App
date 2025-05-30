import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import CommonHeader from "../../../navigation/Header/CommonHeader";
import Colors from "../../../assets/colors";
import typography from "../../../assets/typography";
import { images } from "../../../assets/assets";

const order = {
    id: "1947034",
    date: "05-12-2019",
    trackingNumber: "IW3475453455",
    status: "Delivered",
    items: [
        {
            id: 1,
            name: "Pullover",
            brand: "Mango",
            color: "Gray",
            size: "L",
            units: 1,
            price: 51,
            image: images.Bell64,
        },
        {
            id: 2,
            name: "Pullover",
            brand: "Mango",
            color: "Gray",
            size: "L",
            units: 1,
            price: 51,
            image: images.Bell64,
        },
        {
            id: 3,
            name: "Pullover",
            brand: "Mango",
            color: "Gray",
            size: "L",
            units: 1,
            price: 51,
            image: images.Bell64,
        },
    ],
    shippingAddress: "3 Newbridge Court ,Chino Hills, CA 91709, United States",
    paymentMethod: {
        type: "mastercard",
        last4: "3947",
    },
    deliveryMethod: "FedEx, 3 days, 15$",
    discount: "10%, Personal promo code",
    total: "133$",
};

const OrderDetailsScreen = () => {
    return (

        <View style={styles.container}>
            <CommonHeader title={`Order №${order.id}`} page="goBack" icon={null} onPress={undefined} />

            <ScrollView style={{ padding: 20 }} >
                <View style={{ flexDirection: "row" }} >
                    <View style={styles.trackingContainer}>
                        <Text style={styles.label}>Tracking number:</Text>
                        <Text style={styles.value}>{order.trackingNumber}</Text>

                        <Text style={styles.label}>Status:</Text>
                        <Text style={[styles.value, { color: Colors.green }]}>{order.status}</Text>
                    </View>
                    <View style={styles.topInfo}>
                        <Text style={styles.date}>{order.date}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>{order.items.length} items</Text>

                {order.items.map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                        <Image source={item.image} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                            <Text style={styles.itemBrand}>{item.brand}</Text>
                            <Text style={styles.itemDetail}>
                                Color: {item.color}    Size: {item.size}
                            </Text>
                            <Text style={styles.itemDetail}>Units: {item.units}</Text>
                        </View>
                        <Text style={styles.price}>{item.price}$</Text>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Order information</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Shipping Address:</Text>
                    <Text style={styles.infoValue}>{order.shippingAddress}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Payment method:</Text>
                    <View style={styles.paymentRow}>
                        <Image
                            source={order.paymentMethod.type === "mastercard" ? images.mastercard : images.visa}
                            style={styles.cardIcon}
                        />
                        <Text>**** **** **** {order.paymentMethod.last4}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Delivery method:</Text>
                    <Text style={styles.infoValue}>{order.deliveryMethod}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Discount:</Text>
                    <Text style={styles.infoValue}>{order.discount}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Total Amount:</Text>
                    <Text style={styles.infoValue}>{order.total}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    topInfo: {
        alignItems: "flex-end",
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
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "700",
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
});

export default OrderDetailsScreen;

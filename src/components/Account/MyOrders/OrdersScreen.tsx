import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CommonHeader from "../../../navigation/Header/CommonHeader";
import Colors from "../../../assets/colors";
import typography from "../../../assets/typography";

const tabs = ["Delivered", "Processing", "Cancelled"];


export const ordersData = [
    {
        id: "19470343",
        date: "05-12-2019",
        trackingNumber: "IW3475453455",
        quantity: 3,
        totalAmount: "$112",
        status: "Delivered",
    },
    {
        id: "19347035",
        date: "06-12-2019",
        trackingNumber: "IW3475453466",
        quantity: 1,
        totalAmount: "$50",
        status: "Processing",
    },
    {
        id: "19470336",
        date: "07-12-2019",
        trackingNumber: "IW3475453477",
        quantity: 2,
        totalAmount: "$75",
        status: "Cancelled",
    },
    {
        id: "19470334",
        date: "05-12-2019",
        trackingNumber: "IW3475453455",
        quantity: 3,
        totalAmount: "$112",
        status: "Delivered",
    },
    {
        id: "19470335",
        date: "06-12-2019",
        trackingNumber: "IW3475453466",
        quantity: 1,
        totalAmount: "$50",
        status: "Processing",
    },
    {
        id: "1947036",
        date: "07-12-2019",
        trackingNumber: "IW3475453477",
        quantity: 2,
        totalAmount: "$75",
        status: "Cancelled",
    },
];


const OrdersScreen = () => {
    const [activeTab, setActiveTab] = useState("Delivered");

    const filteredOrders = ordersData.filter(order => order.status === activeTab);
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered":
                return Colors.green;
            case "Processing":
                return Colors.orange;
            case "Cancelled":
                return Colors.red;
            default:
                return Colors.gray;
        }
    };
    
    return (
        <View style={styles.container}>
            <CommonHeader title="My Orders" page="goBack" onPress={undefined} icon={null}/>
            <View style={styles.tabContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && styles.activeTab,typography.Header1]}>
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredOrders}
                removeClippedSubviews={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <View style={styles.orderCard1}>
                            <Text style={[typography.Body1,styles.orderTitle]}>Order №{item.id}</Text>
                            <Text style={[typography.Body2Regular]}>{item.date}</Text>
                        </View>
                        <View style={styles.orderCard2}>
                            <Text style={[{ fontWeight: "bold" },typography.Body2]}>
                                <Text style={[{ fontWeight: "normal" },typography.Body2Regular]}>Tracking: </Text>{item.trackingNumber}
                            </Text>
                            <View style={styles.orderCard2Sub}>
                                <Text style={[{ fontWeight: "bold" },typography.Body2Medium]}>
                                    <Text style={[{ fontWeight: "normal" },typography.Body2Regular]}>Quantity: </Text>{item.quantity}
                                </Text>
                                <Text style={[{ fontWeight: "bold" },typography.Body2Medium]}>
                                    <Text style={[{ fontWeight: "normal" },typography.Body2Regular]}>Total Amount:</Text> {item.totalAmount}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.orderCard3}>
                            <TouchableOpacity style={styles.detailsButton}>
                                <Text style={[styles.detailsButtonText,typography.Body2]}>Details</Text>
                            </TouchableOpacity>
                            <Text style={[{ color: getStatusColor(item.status) },typography.Body2]} >{item.status}</Text>
                        </View>
                    </View>

                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        backgroundColor:Colors.white,
        borderWidth:0.5,
        borderTopWidth:0,
        borderBottomLeftRadius:20, 
        borderBottomRightRadius:20,      
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom:10,
    },
    activeTab: {
        backgroundColor: Colors.darkGray,

    },
    tabText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    activeTabText: {
        color: "white"
    },
    orderCard: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: 20,
        gap: 15,
    },
    orderCard1: {
        flex: 1,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    orderCard2: {
        gap: 5,
        flex: 1,
    },
    orderCard2Sub: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    orderCard3: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    orderTitle: {
        fontWeight: "bold"
    },
    detailsButton: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 20,
        marginTop: 5,
        borderWidth: 1,
        width: "35%"
    },
    detailsButtonText: {
        textAlign: "center"
    },
});

export default OrdersScreen;
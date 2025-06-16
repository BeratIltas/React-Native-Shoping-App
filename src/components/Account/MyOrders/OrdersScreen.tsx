import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Image, ScrollView } from "react-native";
import CommonHeader from "../../../navigation/Header/CommonHeader";
import Colors from "../../../assets/colors";
import typography from "../../../assets/typography";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../type";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { usePurchase } from "../../CustomRow/TshirtContext";

const tabs = ["pending", "custom", "cancelled", "delivered"];
//pending, paid, cancelled, shipped, delivered

const OrdersScreen = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { user } = useAuth();
    const userId = user?.uid;
    const { purchasedItems, clearPurchases } = usePurchase();
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://shopal.expozy.co/orders?user_id=${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending": return Colors.green;
            case "delivered": return Colors.orange;
            case "cancelled": return Colors.red;
            default: return Colors.gray;
        }
    };

    const filteredOrders = activeTab === "custom"
        ? purchasedItems.map((item, index) => ({
            id: item.id,
            created_at: new Date().toISOString(),
            items: [{ quantity: 1 }],
            total_price: item.price,
            status: "custom",
            name: item.name,
        }))
        : orders.filter(order => order.status === activeTab);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.darkGray} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CommonHeader title="My Orders" page="goBack" onPress={undefined} icon={null} />


            <View style={styles.tabContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                        >
                            <Text
                                style={[styles.tabText, activeTab === tab && styles.activeTabText]}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </Text>

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>


            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id.toString()}
                removeClippedSubviews={false}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <View style={styles.orderCard1}>
                            <Text style={[typography.Body1, styles.orderTitle]}>
                                {activeTab === "custom" ? item.name : `Order №${item.id}`}
                            </Text>
                            <Text style={[typography.Body2Regular]}>
                                {new Date(item.created_at).toLocaleDateString()}
                            </Text>
                        </View>

                        <View style={styles.orderCard2}>
                            <Text style={[{ fontWeight: "bold" }, typography.Body2]}>
                                <Text style={[{ fontWeight: "normal" }, typography.Body2Regular]}>Items: </Text>
                                {activeTab === "custom" ? 1 : item.items.length}
                            </Text>

                            <View style={styles.orderCard2Sub}>
                                <Text style={[{ fontWeight: "bold" }, typography.Body2Medium]}>
                                    <Text style={[{ fontWeight: "normal" }, typography.Body2Regular]}>
                                        Quantity:{" "}
                                    </Text>
                                    {activeTab === "custom"
                                        ? 1
                                        : item.items.reduce((sum: number, i: any) => sum + i.quantity, 0)}
                                </Text>

                                <Text style={[{ fontWeight: "bold" }, typography.Body2Medium]}>
                                    <Text style={[{ fontWeight: "normal" }, typography.Body2Regular]}>
                                        Total:{" "}
                                    </Text>
                                    ${item.total_price}
                                </Text>
                            </View>
                        </View>

                        {activeTab === "custom" && (
                            <TouchableOpacity
                                style={styles.orderCard3}
                                onPress={() => {
                                    const imageSource =
                                        typeof item.image === "string"
                                            ? { uri: item.image }
                                            : item.image ?? purchasedItems.find((p) => p.id === item.id)?.image;

                                    setSelectedImage(imageSource);
                                }}
                            >
                                <Image
                                    source={
                                        typeof item.image === "string"
                                            ? { uri: item.image }
                                            : item.image ?? purchasedItems.find((p) => p.id === item.id)?.image
                                    }
                                    style={{ width: "100%", height: 180, borderRadius: 8 }}
                                    resizeMode="center"
                                />
                            </TouchableOpacity>
                        )}

                        <View style={styles.orderCard3}>
                            {activeTab !== "custom" ? (
                                <TouchableOpacity
                                    style={styles.detailsButton}
                                    onPress={() => navigation.navigate("OrderDetailsScreen", { orderId: item.id })}
                                >
                                    <Text style={[styles.detailsButtonText, typography.Body2]}>Details</Text>
                                </TouchableOpacity>
                            ) : (
                                <View />
                            )}
                            <Text
                                style={[{ color: getStatusColor(item.status || "custom") }, typography.Body2]}
                            >
                                {item.status
                                    ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                                    : "Custom"}
                            </Text>
                        </View>
                    </View>
                )}
            />
            {selectedImage && (
                <View style={styles.fullscreenOverlay}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelectedImage(null)}
                    >
                        <Text style={{ fontSize: 24, color: "white" }}>✕</Text>
                    </TouchableOpacity>
                    <Image
                        source={selectedImage}
                        style={styles.fullscreenImage}
                        resizeMode="contain"
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 5,
    },
    tab: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, marginBottom: 10 },
    activeTab: { backgroundColor: Colors.darkGray },
    tabText: { fontSize: 16, fontWeight: "bold" },
    activeTabText: { color: "white" },
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    orderCard2: { gap: 5 },
    orderCard2Sub: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    orderCard3: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    orderTitle: { fontWeight: "bold" },
    detailsButton: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 20,
        marginTop: 5,
        borderWidth: 1,
        width: "35%"
    },
    detailsButtonText: { textAlign: "center" },
    fullscreenOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },

    fullscreenImage: {
        width: "100%",
        height: "80%",
    },

    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 1000,
        padding: 10,
    },
});

export default OrdersScreen;

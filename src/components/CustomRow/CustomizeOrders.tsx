import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { usePurchase } from './TshirtContext';
import typography from '../../assets/typography';
import CommonHeader from '../../navigation/Header/CommonHeader';
import Colors from '../../assets/colors';


const CustomizeOrders = () => {
    const { purchasedItems } = usePurchase();

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
                <Text style={[typography.Body1, styles.name]}>{item.name}</Text>
                <Text style={[typography.Body2Regular, styles.price]}>${item.price}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <CommonHeader title="Customize Orders" icon={null} page="goBack" />
            <FlatList
                data={purchasedItems}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No custom purchases yet.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    listContainer: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.extraLightGray,
        borderRadius: 12,
        marginBottom: 12,
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    name: {
        marginBottom: 4,
        color: Colors.black,
    },
    price: {
        color: Colors.gray,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: Colors.lightGray,
        fontSize: 16,
    },
});

export default CustomizeOrders;

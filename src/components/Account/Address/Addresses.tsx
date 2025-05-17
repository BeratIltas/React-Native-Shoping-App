import { View, Image, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CommonHeader from '../../../navigation/Header/CommonHeader'
import { images } from '../../../assets/assets';
import Colors from '../../../assets/colors';
import typography from '../../../assets/typography';
import { useAddresses } from './AddressContext';
import AddAddressModal from './AddAddressModal';


const Addresses = () => {
    const {addresses, setDefaultAddress, addAddress, deleteAddress, defaultAddressId } = useAddresses();
    const [showDelete, setShowDelete] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <CommonHeader title='Address' icon={showDelete ? images.check : null} onPress={() => setShowDelete(false)} page='goBack' />

            {addresses.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Image style={{tintColor:Colors.gray}} source={images.HomeAddress}/>
                    <Text style={[typography.Header4, styles.emptyTextHeader]}>No addresses yet!</Text>
                    <Text style={[typography.Body1Regular, styles.emptyText]}>
                        Start by adding an address, and you'll see it here.
                    </Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.list}>
                    {addresses.map((address) => (
                        <View key={address.id} style={styles.cardWrapper}>
                            <TouchableOpacity
                                style={styles.card}
                                onLongPress={() => setShowDelete(true)}
                                activeOpacity={1}
                            >
                                {showDelete && (
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => deleteAddress(address.id)}
                                    >
                                        <Image source={images.trash} style={{ tintColor: "red" }} />
                                    </TouchableOpacity>
                                )}

                                <View style={styles.headerRow}>
                                    <Text style={styles.name}>{address.name}</Text>
                                </View>
                                <Text style={styles.text}>{address.street}</Text>
                                <Text style={styles.text}>{address.city}</Text>
                                <View style={styles.checkboxRow}>
                                    {defaultAddressId === address.id ? (
                                        <Image source={images.checkboxOn} style={styles.checkbox} />
                                    ) : (
                                        <TouchableOpacity onPress={() => setDefaultAddress(address.id)}>
                                            <Image source={images.checkboxOff} style={styles.checkbox} />
                                        </TouchableOpacity>
                                    )}
                                    <Text style={typography.Body2Medium}>Use as the shipping address</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <AddAddressModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 16,
        marginBottom: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTextHeader: {
        marginTop: 8,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 4,
        color: Colors.gray,
    },
    list: {
        paddingBottom: 100,
    },
    cardWrapper: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        position: 'relative',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    editText: {
        color: 'red',
    },
    text: {
        fontSize: 14,
        marginBottom: 2,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 12,
        padding: 5,
        zIndex: 1,
    },
    addButton: {
        position: 'absolute',
        right: 16,
        bottom: 32,
        backgroundColor: 'black',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
    },
});

export default Addresses
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../assets/colors';
import { images } from '../assets/assets';
import { useNavigation } from '@react-navigation/native';

type PageNames = "MainApp" | "Intro" | "Cart" | "ProductDetails" | "Addresses" | "Contact" | "Checkout" | "Onboarding";

const CommonHeader = ({ title, icon, page, params }: { 
    title: string; 
    icon: any; 
    page: PageNames;  // Kesin sayfa adları
    params?: object;  // Ekstra parametreler için opsiyonel alan
}) => {
    const navigation = useNavigation();

    const handleNavigation = () => {
        navigation.navigate({
            name: page,
            params: params || {}, 
        } as never); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleNavigation} style={styles.image}>
                <Image source={images.leftArrow} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity>
                <Image source={icon || images.bell} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.white,
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black',
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'cover',
    },
});

export default CommonHeader;

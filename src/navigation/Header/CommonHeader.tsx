import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../assets/colors';
import { images } from '../../assets/assets';
import { useNavigation } from '@react-navigation/native';

type PageNames = "MainApp" | "Intro" | "Cart" | "ProductDetails" | "Addresses" | "Contact" | "Checkout" | "Onboarding"| "Saved";

const CommonHeader = ({ 
    title, 
    icon = images.bell,
    iconleft = images.leftArrow,
    page, 
    params, 
    onPress 
}: { 
    title: string; 
    icon?: any;
    iconleft?:any;
    page?: PageNames;
    params?: object;
    onPress?: () => void;
}) => {
    const navigation = useNavigation();

    const handleNavigation = () => {
        if (page) {
            navigation.navigate({
                name: page,
                params: params || {},
            } as never);
        } else {
            console.log("No page specified for navigation.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleNavigation} style={styles.iconButton}>
                <Image source={iconleft} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>

            <Text style={styles.text}>{title}</Text>

            <TouchableOpacity onPress={onPress || (() => console.log("Default action for icon"))} style={styles.iconButton}>
                <Image source={icon} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.white,
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.black,
        textAlign: 'center',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    image: {
        width: 24,
        height: 24,
    },
});

export default CommonHeader;

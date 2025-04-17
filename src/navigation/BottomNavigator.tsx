import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import Saved from '../screens/Saved';
import Account from '../screens/Account';
import Cart from '../screens/Cart';
import React from 'react';
import Colors from '../assets/colors';
import { images } from '../assets/assets';
import { Image } from 'react-native';
import ProductsPage from '../screens/ProductsPage';
const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: Colors.black,
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    elevation: 0,
                    borderTopWidth: 0,
                },
                tabBarHideOnKeyboard: true,
                animationEnabled: false,
            })}
        >
            <Tab.Screen name="Home" component={HomePage} options={{
                tabBarIcon: ({ focused, color }) => (
                    <Image source={images.homeIcon} resizeMode="contain"
                        style={{ width: 24, height: 24, tintColor: focused ? '#000' : '#888' }} />
                )
            }} />
            <Tab.Screen name="Cart" component={Cart} options={{
                tabBarIcon: ({ focused, color }) => (
                    <Image source={images.cartIcon} resizeMode="contain"
                        style={{ width: 24, height: 24, tintColor: focused ? '#000' : '#888' }} />
                )
            }} />
            <Tab.Screen name="Saved" component={Saved} options={{
                tabBarIcon: ({ focused, color }) => (
                    <Image source={images.favoriesIcon} resizeMode="contain"
                        style={{ width: 24, height: 24, tintColor: focused ? '#000' : '#888' }} />
                )
            }} />
            <Tab.Screen name="Account" component={Account} options={{
                tabBarIcon: ({ focused, color }) => (
                    <Image source={images.profileIcon} resizeMode="contain"
                        style={{ width: 24, height: 24, tintColor: focused ? '#000' : '#888' }} />
                )
            }} />
        </Tab.Navigator>
    )
}




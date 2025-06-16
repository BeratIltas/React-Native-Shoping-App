/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigator from './src/navigation/AppNavigation';
import { StatusBar } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { AuthProvider } from './src/components/Account/AuthContext';
import { CartProvider } from './src/components/Cart/CartContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaymentCardProvider } from './src/components/Account/Payment/PaymentCardContext';
import { AddressProvider } from './src/components/Account/Address/AddressContext';

import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Notifications } from './src/navigation/Notifications';
import { WishlistProvider } from './src/components/Wishlist/WishlistContext';
import { RecentSearchProvider } from './src/components/Search/RecentSearchContext ';
import { PurchaseProvider } from './src/components/CustomRow/TshirtContext';



const Tab = createBottomTabNavigator();

const RootContent = () => {

  useEffect(() => {
    const initNotifications = async () => {
      const unsubscribe = await Notifications();
    };
    initNotifications();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <PaymentCardProvider>
            <AddressProvider>
              <RecentSearchProvider>
                <PurchaseProvider>
                  <GestureHandlerRootView>
                    <NavigationContainer>
                      <AppNavigator />
                    </NavigationContainer>
                  </GestureHandlerRootView>
                </PurchaseProvider>
              </RecentSearchProvider>
            </AddressProvider>
          </PaymentCardProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>

  )
}

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent', true);
    SystemNavigationBar.setNavigationColor('black');
    SystemNavigationBar.setNavigationBarContrastEnforced(true);
  }, []);
  return <RootContent />;
};

export default App;

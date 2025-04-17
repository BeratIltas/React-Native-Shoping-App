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
const Tab = createBottomTabNavigator();

const RootContent = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <GestureHandlerRootView>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
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

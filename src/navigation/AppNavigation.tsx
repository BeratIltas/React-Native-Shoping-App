import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Intro from "../screens/Intro";
import Onboarding from "../screens/Onboarding";
import ProductDetails from "../screens/ProductDetails";
import BottomTabNavigator from "./BottomNavigator";
import ProductsPage from "../screens/ProductsPage";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import { RootStackParamList } from "../../type";
import HelpScreen from "../components/Account/Help/HelpScreen";
import ProfileScreen from "../components/Account/ProfileScreen";
import Account from "../screens/Account";
import PaymentMethods from "../components/Account/Payment/PaymentMethods";
import Addresses from "../components/Account/Address/Addresses";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Onboarding" component={Onboarding} /> */}
      <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductsPage" component={ProductsPage} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
      <Stack.Screen name="Addresses" component={Addresses} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />

    </Stack.Navigator>
  );
};

export default AppNavigator;

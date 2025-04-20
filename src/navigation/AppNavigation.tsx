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
export type RootStackParamList = {
  Intro: undefined;
  Onboarding: undefined;
  MainApp: undefined;
  ProductDetails: { productId: string };
  ProductsPage: {category:string};
  Search: undefined;
  Checkout:undefined;
  Cart:undefined;
};

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
      <Stack.Screen name="Cart" component={Cart}/>  
      <Stack.Screen name="Checkout" component={Checkout}/>  
    </Stack.Navigator>
  );
};

export default AppNavigator;

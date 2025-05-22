import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    MainApp:undefined;
    HomePage: undefined;
    Intro: undefined;
    Cart: undefined;
    ProductDetails: { productId: string };
    ProductsPage: {category:string};
    Addresses: undefined;
    Contact: undefined;
    Checkout: undefined;
    Onboarding: undefined;
    Search: undefined;
    Header: undefined;
    HelpScreen:undefined;
    ProfileScreen:undefined;
    Account:undefined;
    ForgetPassword:undefined;
    PaymentMethods:undefined;
    AddAddressPage:undefined;
    NotificationsScreen:undefined;
    ReviewsScreen:undefined;
    OrdersScreen:undefined;
}
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type User = {
    username?: string;
    email: string;
  };
export  type ProfileProps = {
    user: {
      username?: string;
      email: string;
    };
    onLogout: () => void;
  };  
export interface ProductProps {
    brand: string;
    category: string;
    description: string;
    image: string;
    isNew: boolean;
    previousPrice: number;
    price: number;
    quentity: number;
    title: string;
    _id: string;
    quantity: number;
}

export interface Item {
    item: ProductProps,
}



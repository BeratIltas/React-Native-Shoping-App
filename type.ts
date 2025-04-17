import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    HomePage: undefined;
    Intro: undefined;
    Cart: undefined;
    ProductDetails: undefined;
    Addresses: undefined;
    Contact: undefined;
    Checkout: undefined;
    Onboarding: undefined;
    Search: undefined;
    Header: undefined;
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
    _id: number;
}

export interface Item {
    item: ProductProps,
}



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
    ReviewsScreen:{ productId?: number };
    OrdersScreen:undefined;
    OrderDetailsScreen:{ orderId?: number};
    TshirtCustomizer:undefined;
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
  product_id: number;
  title: string;
  price: number;
  categories: string[];
  merchant_name: string;
  average_rating: number;
  rating_count: number;
  product_images: {
    type: string;
    contentUrl: string[];
    embeddedTextCaption: string[];
  };
  quantity?: number;
}
export interface ProductDetailProps {
  product_id: number;
  title: string;
  price: number;
  categories: string[];
  merchant_name: string;
  average_rating: number;
  rating_count: number;
  product_image: string[];
};

export interface Item {
    item: ProductProps,
};




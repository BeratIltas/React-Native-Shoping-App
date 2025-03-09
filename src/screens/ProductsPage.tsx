import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CommonHeader from '../components/CommonHeader'
import { images } from '../assets/assets'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import ProductCard from '../components/ProductCard'
import Colors from '../assets/colors'
import Loader from '../components/Loader'
import FilterOptions from '../components/Filters/FilterOptions'

const ProductsPage = ({ route }: any) => {
    const category = route?.params?.category;
    const navigation: any = useNavigation();
    const [query, setQuery] = useState('');
    const [productsArray, setProductsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});
    const [sortType, setSortType] = useState<string>('mostPopular');

    const loadProductsFromStorage = async () => {
        try {
            const storedData = await AsyncStorage.getItem('productData');
            if (storedData) {
                setProductsArray(JSON.parse(storedData));
            }
        } catch (error) {
            console.log('Error fetching data from storage:', error);
        }
    };

    useEffect(() => {
        loadProductsFromStorage();
    }, []);

    const sortProducts = (products: any[], type: string) => {
        if (type === 'priceLowToHigh') {
            return products.sort((a, b) => a.price - b.price);
        }
        if (type === 'priceHighToLow') {
            return products.sort((a, b) => b.price - a.price);
        }
        return products;
    };

    const filteredProducts = sortProducts(
        productsArray.filter((product: any) => {
            const matchesCategory = category
                ? product?.category?.toLowerCase() === category.toLowerCase()
                : true;
            const matchesQuery = query
                ? product?.title?.toLowerCase().includes(query.toLowerCase())
                : true;
            return matchesCategory && matchesQuery;
        }),
        sortType
    );

    const handleSort = (type: string) => {
        setSortType(type);
    };

    const handleHeartPress = (productId: string) => {
        setLikedProducts((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    const renderItem = ({ item }: { item: any }) => (
        <ProductCard
            item={item}
            onHeartPress={handleHeartPress}
            isLiked={!!likedProducts[item._id]}
        />
    );

    return (
        <View style={styles.container}>
            <CommonHeader title={category} icon={images.bell} page='MainApp'/>
            <FilterOptions onSort={handleSort} />
            {isLoading ? (
                <Loader />
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item: any) => String(item._id)}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whiteGray,
        paddingBottom: 100,
    },
    columnWrapper: {},
    listContainer: {},
});

export default ProductsPage
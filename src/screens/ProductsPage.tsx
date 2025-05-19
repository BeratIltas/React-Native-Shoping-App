import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonHeader from "../navigation/Header/CommonHeader";
import FilterOptions from "../components/Filters/FilterOptions";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Colors from "../assets/colors";
import { images } from "../assets/assets";

const ProductsPage = ({ route }: any) => {
    const category = route?.params?.category;
    const [query, setQuery] = useState(""); 
    const [productsArray, setProductsArray] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});
    const [sortType, setSortType] = useState<string>("mostPopular");
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);

    const loadProductsFromStorage = async () => {
        setIsLoading(true);
        try {
            const storedData = await AsyncStorage.getItem("productData");
            if (storedData) {
                setProductsArray(JSON.parse(storedData));
            }
        } catch (error) {
            console.error("Error fetching data from storage:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProductsFromStorage();
    }, []);

    const sortProducts = (products: any[], type: string) => {
        if (type === "priceLowToHigh") {
            return products.sort((a, b) => a.price - b.price);
        }
        if (type === "priceHighToLow") {
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
            const matchesPrice =
                product?.price >= priceRange[0] && product?.price <= priceRange[1];  

            return matchesCategory && matchesQuery && matchesPrice;
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
            <CommonHeader title={category} icon={images.bell} page="MainApp" />

            <FilterOptions
                onSort={handleSort}
                onPriceChange={setPriceRange}
                priceRange={priceRange}
            />

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
                    removeClippedSubviews={false}

                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteGray,
    },
    columnWrapper: {
        justifyContent: "space-between",
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
});

export default ProductsPage;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import CommonHeader from "../navigation/Header/CommonHeader";
import FilterOptions from "../components/Filters/FilterOptions";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Colors from "../assets/colors";
import { images } from "../assets/assets";
import { ProductProps } from "../../type";

const API_BASE_URL = "https://shopal.expozy.co";

const ProductsPage = ({ route }: any) => {
    const category = route?.params?.category;
    const [query, setQuery] = useState("");
    const [productsArray, setProductsArray] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});
    const [sortType, setSortType] = useState<string>("recommended");
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchProducts = async (pageNumber = 1) => {
        if (!hasMore && pageNumber !== 1) return;

        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/filter-product`, {
                params: {
                    category,
                    min_price: priceRange[0],
                    max_price: priceRange[1],
                    sort_by: sortType,
                    page: pageNumber,
                    limit: 20,
                },
            });

            const newProducts = response.data.products || [];

            if (pageNumber === 1) {
                setProductsArray(newProducts);
            } else {
                setProductsArray(prev => [...prev, ...newProducts]);
            }

            setHasMore(newProducts.length > 0);
            setPage(pageNumber);
        } catch (error) {
            console.error("Error fetching products from API:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(1);
    }, [category, priceRange, sortType]);


    const handleSort = (type: string) => {
        setSortType(type);
    };

    const renderItem = ({ item }: { item: any }) => (
        <ProductCard
            item={item}
        />
    );

    return (
        <View style={styles.container}>
            <CommonHeader title={category} icon={images.bell} page="MainApp" />

            <FilterOptions
                onSort={handleSort}
                onPriceChange={setPriceRange}
                priceRange={priceRange}
                setModalVisible={setModalVisible}
                setProductsArray={setProductsArray}
            />

            {isLoading ? (
                <Loader />
            ) : (
                <FlatList
                    data={productsArray}
                    keyExtractor={(item: any, index: number) =>
                        item?._id ? String(item._id) : `fallback-key-${index}`
                    }
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    removeClippedSubviews={true}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    onEndReached={() => {
                        if (!isLoading && hasMore) {
                            fetchProducts(page + 1);
                        }
                    }}
                    onEndReachedThreshold={0.5}
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

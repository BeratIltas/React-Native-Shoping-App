import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import ModalContent from "./ModalContent";
import Colors from "../../assets/colors";
import SearchBar from "../Search/SearchBar";
import { images } from "../../assets/assets";

interface FilterOptionsProps {
    onSort: (type: string) => void;
    onPriceChange: (price: number[]) => void;
    priceRange: number[];
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
    onSort,
    onPriceChange,
    priceRange,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>("mostPopular");

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <SearchBar />
            </View>
            <View style={styles.itemContainer}>
                <TouchableOpacity onPress={toggleModal}>
                    <Image source={images.filters} />
                </TouchableOpacity>
            </View>
            {modalVisible && (
                <ModalContent
                    toggleModal={toggleModal}
                    onSort={onSort}
                    onPriceChange={onPriceChange} 
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    priceRange={priceRange} 
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: Colors.white,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.2,
        flexDirection: "row",
        height: 70,
        justifyContent: "space-between",
        paddingRight: 30,
    },
    searchBar:{
        flex:8,
        paddingHorizontal:20,

    },
    itemContainer: {
        flex:1,
        padding: 10,
        backgroundColor: Colors.black,
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 10,
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
    },
});

export default FilterOptions;

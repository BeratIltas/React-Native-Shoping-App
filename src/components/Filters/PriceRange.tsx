import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import typography from "../../assets/typography";
import Colors from "../../assets/colors";

const { width } = Dimensions.get("window");

const PriceRange = () => {
    const [price, setPrice] = useState([0, 2000]); 

    return (
        <View style={styles.container}>
            {/* Price Header */}
            <View style={styles.header}>
                <Text style={[typography.Body3, styles.label]}>Price</Text>
                <Text style={styles.priceText}>${price[0]} - ${price[1]}</Text>
            </View>

            <MultiSlider
                values={price}
                containerStyle={{paddingHorizontal: 20,alignItems:'center'}}
                sliderLength={width*0.77}
                onValuesChange={setPrice}
                min={0}
                max={2000}
                step={50}
                allowOverlap={false}
                snapped
                selectedStyle={{ backgroundColor: "black" }}
                unselectedStyle={{ backgroundColor: "lightgray" }}
                markerStyle={styles.markerStyle}
            />

            <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: "500",
        color: "black",
    },
    priceText: {
        fontSize: 14,
        fontWeight: "400",
        color: "gray",
        paddingRight:20,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.extraLightGray,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    sizeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sizeText: {
        fontSize: 14,
        fontWeight: "400",
        color: "black",
        paddingRight:20,
    },
    markerStyle: {
        backgroundColor: "white",
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: "black",
    },
});

export default PriceRange;

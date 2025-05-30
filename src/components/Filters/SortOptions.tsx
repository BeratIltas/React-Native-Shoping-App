import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Colors from "../../assets/colors";
import typography from "../../assets/typography";

interface SortOptionsProps {
    selectedOption: string;
    onSelect: (option: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ selectedOption, onSelect }) => {
    
    const options = [
        { key: "most_reviewed", label: "Most Popular" },
        { key: "highest_price", label: "Price: High - Low" },
        { key: "lowest_price", label: "Price: Low - High" },
    ];

    return (
        <View style={{ flex: 1,}}>
            <View style={styles.header}>
                <Text style={[typography.Body3,styles.label]}>Sort By</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortContainer}>
                {options.map((option) => (

                    <TouchableOpacity
                        key={option.key}
                        style={[
                            styles.sortOption,
                            selectedOption === option.key && styles.selectedOption,
                        ]}
                        onPress={() => onSelect(option.key)}
                    >
                        <Text style={[
                            typography.Body3,
                            styles.filterText,
                            selectedOption === option.key && styles.selectedText,
                        ]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.divider} />

        </View>

    );
};

const styles = StyleSheet.create({
    sortContainer: {
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft:10,
        paddingRight:10,
    },
    header: {
        paddingLeft:20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "black",
    },
    priceText: {
        fontSize: 14,
        fontWeight: "400",
        color: "gray",
    },
    sortOption: {
        padding: 15,
        backgroundColor: Colors.ultraLightGray,
        marginVertical: 5,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 10,
        borderWidth: 0.1,

    },
    selectedOption: {
        backgroundColor: Colors.darkGray,
    },
    filterText: {
        color: Colors.black,
    },
    selectedText: {
        color: Colors.white,
        fontWeight: "bold",
    },
    divider: {
        height: 1,
        backgroundColor: Colors.extraLightGray,
        marginVertical: 10,
        marginHorizontal: 20,

    },
});

export default SortOptions;

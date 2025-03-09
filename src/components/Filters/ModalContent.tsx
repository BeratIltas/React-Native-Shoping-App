import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";
import Colors from "../../assets/colors";
import typography from "../../assets/typography";
import SortOptions from "./SortOptions";
import PriceRange from "./PriceRange";
import SizeOptions from "./SizeOptions";

const { width, height } = Dimensions.get("window");

const ModalContent = ({
    toggleModal,
    onSort,
    selectedOption,
    setSelectedOption,
}: {
    toggleModal: () => void;
    onSort: (type: string) => void;
    selectedOption: string;
    setSelectedOption: (option: string) => void;
}) => {
    return (
        <Modal
            isVisible={true}
            onBackdropPress={toggleModal}
            onSwipeComplete={toggleModal}
            swipeDirection="down"
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <View style={styles.handleBar}></View>
                <Text style={[typography.Header4, styles.filtersTitle]}>Filters</Text>
                <View style={styles.divider} />

                <SortOptions selectedOption={selectedOption} onSelect={(option) => {
                    setSelectedOption(option);
                    onSort(option);
                }} />


                <PriceRange />
                <SizeOptions/>
                <TouchableOpacity
                    style={styles.applyButton}
                    onPress={() => {
                        toggleModal();
                    }}
                >
                    <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: Colors.white,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: height * 0.7,

    },
    handleBar: {
        width: 100,
        height: 5,
        backgroundColor: Colors.ultraLightGray,
        borderRadius: 2.5,
        alignSelf: "center",
        marginBottom: 10,
    },
    filtersTitle: {
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: "bold",
    },
    applyButton: {
        backgroundColor: Colors.darkGray,
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    applyButtonText: {
        color: Colors.white,
        fontSize: 16,
    },
    closeButton: {
        marginTop: 15,
        alignItems: "center",
    },
    closeButtonText: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: "bold",
    },
    divider: {
        height: 1,
        backgroundColor: Colors.extraLightGray,
        marginVertical: 10,
        marginHorizontal: 20,
    },
});

export default ModalContent;

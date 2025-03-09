import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ModalContent from './ModalContent';
import Colors from '../../assets/colors';
import SearchBar from '../Search/SearchBar';
import { images } from '../../assets/assets';

const FilterOptions = ({ onSort }: { onSort: (type: string) => void }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('mostPopular');

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>
            <View>
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
                    selectedOption={selectedOption} 
                    setSelectedOption={setSelectedOption}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderBottomColor: Colors.darkGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        paddingRight: 30,
        paddingLeft: 20,
        
    },
    itemContainer: {
        padding: 10,
        backgroundColor: Colors.black,
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
});

export default FilterOptions;

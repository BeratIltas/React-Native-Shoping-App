import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../assets/colors';
import { images } from '../assets/assets';
import typography from '../assets/typography';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const CategoryRow = () => {

    const navigation: any = useNavigation();

    const handleCategoryPress = (category?: string) => {
        navigation.navigate('ProductsPage', { category });
    };
    return (
        <View style={styles.container}>
            <Text style={[typography.Header4, styles.categoryHeader]}>Category</Text>
            <View style={styles.category}>
                <TouchableOpacity style={styles.categoryContainer} onPress={() => handleCategoryPress('phone')}>
                    <View style={[styles.img, { backgroundColor: '#EDF7FF' }]}>
                        <Image source={images.apparelIcon} />
                    </View>
                    <Text style={[typography.Body3Medium, styles.text]}>Apparel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryContainer} onPress={() => handleCategoryPress('Electronic')}>
                    <View style={[styles.img, { backgroundColor: '#E9FFF8' }]}>
                        <Image source={images.electronicIcon} />
                    </View>
                    <Text style={[typography.Body3Medium, styles.text]}>Electronic</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryContainer} onPress={() => handleCategoryPress('Furniture')}>
                    <View style={[styles.img, { backgroundColor: '#FFEEED' }]}>
                        <Image source={images.furnitureIcon} />
                    </View>
                    <Text style={[typography.Body3Medium, styles.text]}>Furniture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryContainer} onPress={() => handleCategoryPress()}>
                    <View style={[styles.img, { backgroundColor: '#FFEDDD' }]}>
                        <Image source={images.allIcon} />
                    </View>
                    <Text style={[typography.Body3Medium, styles.text]}>All</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteGray,
    },
    categoryHeader: {
        flex: 1,
        padding: 5,
        paddingLeft: 25,
    },
    category: {
        flex: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    categoryContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.2,
    },
    text: {

    },
    img: {
        padding: 10,
        borderRadius: 10,
    }
});

export default CategoryRow
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
                <TouchableOpacity style={styles.categoryContainer} onPress={() => handleCategoryPress('Erkek')}>
                    <View style={[styles.img, { backgroundColor: '#B0D4FF' }]}>
                        <Image source={images.man} />
                    </View>
                    <Text style={[typography.Body3Medium, styles.text]}>Man</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryContainer} onPress={() => handleCategoryPress('Kadın')}>
                    <View style={[styles.img, { backgroundColor: '#FFC9C5' }]}>
                        <Image source={images.woman} />
                    </View>
                    <Text style={[typography.Body3Medium, styles.text]}>Women</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryContainer} onPress={() => handleCategoryPress('Ev')}>
                    <View style={[styles.img, { backgroundColor: '#FFD7A5' }]}>
                        <Image source={images.furnitureIcon} />
                    </View>
                    <Text style={[typography.Body3Medium, styles.text]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryContainer} onPress={() => handleCategoryPress()}>
                    <View style={[styles.img, { backgroundColor: '#FFE5D4' }]}>
                        <Image source={images.allIcon} style={{ tintColor: Colors.orange }} />
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
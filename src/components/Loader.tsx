import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../assets/colors';
import typography from '../assets/typography';
import LottieView from 'lottie-react-native';


const { width, height } = Dimensions.get('window');

const Loader = () => {
    return (
        <View style={styles.container}>
            <View>
                <LottieView

                    source={require('../assets/Animations/Loading.json')}
                    autoPlay={true}
                    loop={true}
                    progress={0}
                    style={styles.loading}
                    />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: height - 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    loading:{
        alignItems:'center',
        paddingBottom:'35%',
        height:height,
        width:width,

    }

})
export default Loader
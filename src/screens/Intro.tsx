
import { useEffect } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Colors from "../assets/colors";
const { height, width } = Dimensions.get('window');



const Intro = () => {
const navigation:any = useNavigation()
useEffect(() => {
    !setTimeout(() => {navigation.navigate('Onboarding')}, 4000)},[navigation]);

return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/Intro/IntroBackEfect.png')}
      >
        <View style={styles.logoContainer}>
          <LottieView
            source={require('../assets/Animations/ShoppingCar.json')}
            autoPlay={true}
            loop={false}
            style={styles.lottie}
            speed={1.2}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    marginBottom:200,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:200,
  },
  lottie: {
    width: width , 
    height: height , 
  },
});



export default Intro;
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Platform } from "react-native";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Colors from "../assets/colors";
import { RootStackParamList } from "../../type";


const { height, width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

const Onboarding: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/Onboarding/OnboardingBackground.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <LottieView
            style={styles.lottie}
            source={require('../assets/Animations/Onboarding.json')}
            autoPlay
            loop
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Enjoy Shopping With Our Service</Text>
            <Text style={styles.descriptionText}>
              Make an order sitting on a sofa. Our new service makes it easy for you to shop.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.replace('MainApp')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: Colors.black
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  animationContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  lottie: {
    width: width * 0.8,
    height: height * 0.4,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.gray,
    lineHeight: 22,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    backgroundColor: Colors.black,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Manrope-SemiBold',
  },
  bottomContainer: {
    flex: 2.5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.ultraLightGray,
  },
});

export default Onboarding;

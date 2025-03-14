import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../assets/colors';
import LottieView from 'lottie-react-native';
import typography from '../../assets/typography';

const { width } = Dimensions.get('window');

type SignupScreenProps = {
  onSignup: (userData: { username: string; email: string; password: string }) => void;
  onLoginNavigate: () => void;
};

const SignupScreen: React.FC<SignupScreenProps> = ({ onSignup, onLoginNavigate }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    onSignup({ username, email, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.upContainerBg}>
        <View style={styles.upContainer}>
          <LottieView
            source={require('../../assets/Animations/AddToCard.json')}
            style={styles.lottie}
          />
        </View>
      </View>
      <View style={styles.downContainer}>
        <Text style={[typography.Header2, styles.title]}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
            <Text style={[typography.Body1, styles.loginText]}>Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onLoginNavigate}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGray,
  },
  upContainerBg: {
    flex: 1,
    backgroundColor: Colors.whiteGray,
  },
  upContainer: {
    flex: 1,
    backgroundColor: Colors.darkGray,
    borderBottomLeftRadius: 60,
  },
  lottie: {
    marginTop: 20,
    flex: 1,
  },
  downContainer: {
    flex: 1.5,
    backgroundColor: Colors.whiteGray,
    borderTopRightRadius: 60,
  },
  inputContainer: {
    alignItems: 'center',
  },
  title: {
    color: Colors.darkGray,
    marginBottom: 8,
    fontWeight: 'bold',
    padding: 30,
    paddingBottom: 10,
    paddingLeft: width * 0.1,
    textShadowRadius: 1,
    textShadowColor: Colors.gray,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: Colors.gray,
    borderWidth: 1,
    backgroundColor: Colors.whiteGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: Colors.black,
  },
  linkText: {
    color: Colors.darkGray,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: Colors.orange,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  loginText: {
    color: Colors.white,
    textShadowColor: Colors.whiteGray,
    textShadowRadius: 1,
  },
});

export default SignupScreen;

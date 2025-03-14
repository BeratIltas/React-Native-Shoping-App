import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import LottieView from 'lottie-react-native';
import { assets } from '../../../react-native.config';

const { width } = Dimensions.get('window');

type LoginScreenProps = {
  onLogin: (userData: { username: string; email: string; password: string }) => void;
  onSignupNavigate: () => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignupNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin({ username: 'Admin', email:'Admin@gmail.com', password });
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
        <Text style={[typography.Header2, styles.title]}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input]}
            placeholder="Enter your email address"
            placeholderTextColor={Colors.softGray}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.input]}
            placeholder="Enter your password"
            placeholderTextColor={Colors.softGray}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity>
            <Text style={[typography.Body2Medium, styles.forgotText]}>
              Forgot your password? Reset it
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={[typography.Body1, styles.loginText]}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onSignupNavigate}>
          <Text style={[typography.Body2Medium, styles.linkText]}>
            Don't have an account? Join
          </Text>
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
  upContainerBg:{
    flex:1,
    backgroundColor: Colors.whiteGray,
  },
  upContainer: {
    flex: 1,
    backgroundColor: Colors.darkGray,
    borderBottomRightRadius: 60,
  },
  downContainer: {
    flex: 1.5,
    backgroundColor: Colors.whiteGray,
    borderTopLeftRadius: 60,
  },
  inputContainer: {
    alignItems: 'center',
  },
  title: {
    color: Colors.darkGray,
    marginBottom: 8,
    fontWeight: 'bold',
    padding: 30,
    paddingLeft:width*0.1,
    textShadowRadius:1,
    textShadowColor:Colors.gray,
  },
  lottie: {
    flex: 1,
    marginTop:20,
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
  forgotText: {
    color: Colors.darkGray,
    textDecorationLine: 'underline',
    marginBottom: 20,
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
    textShadowColor:Colors.whiteGray,
    textShadowRadius:1,
  },
  orText: {
    color: Colors.gray,
    marginBottom: 20,
  },
  linkText: {
    color: Colors.darkGray,
    textDecorationLine: 'underline',
    textAlign:'center',
  },
});

export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';

type LoginScreenProps = {
  onLogin: (userData: { username: string; email: string; password: string }) => void;
  onSignupNavigate: () => void;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignupNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin({ username: 'Guest', email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={[typography.Header2, styles.title]}>Login to your account</Text>
      <Text style={[typography.Body1Regular, styles.subtitle]}>It's great to see you again.</Text>

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

      <Text style={[typography.Body1Regular, styles.orText]}>Or login with</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onSignupNavigate}>
        <Text style={[typography.Body2Medium, styles.linkText]}>
          Don't have an account? Join
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.whiteGray,
    paddingHorizontal: 20,
    paddingVertical:35,
  },
  title: {
    color: Colors.black,
    marginBottom: 8,
    fontWeight:'bold',
  },
  subtitle: {
    color: Colors.mediumGray,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: Colors.extraLightGray,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: Colors.black,
  },
  forgotText: {
    color: Colors.orange,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: Colors.green,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  loginText: {
    color: Colors.white,
  },
  orText: {
    color: Colors.gray,
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: Colors.ultraLightGray,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  socialButtonText: {
    color: Colors.black,
  },
  linkText: {
    color: Colors.darkGray,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default LoginScreen;

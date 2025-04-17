import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { useAuth } from './AuthContext'; // Context API'den kullanıcı durumu erişimi
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { images } from '../../assets/assets';

const { width } = Dimensions.get('window');

type SignupScreenProps = {
  onLoginNavigate: () => void;
};

const SignupScreen: React.FC<SignupScreenProps> = ({ onLoginNavigate }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth(); // Context API'den signup fonksiyonunu alıyoruz

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSignup = async () => {
    try {
      await signup(email, password); // Kayıt işlemini başlat
      Alert.alert('Başarılı!', 'Kayıt işlemi tamamlandı!');
    } catch (error: any) {
      Alert.alert('Hata!', error.message || 'Kayıt işlemi yapılamadı.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upContainerBg}>
        <View style={styles.upContainer}>
          <Image source={images.loginProfile} style={styles.profileIcon} />
        </View>
      </View>
      <View style={styles.downContainer}>
        <Text style={[typography.Header2, styles.title]}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            ref={emailRef}
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            ref={passwordRef}
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            returnKeyType="done"
            onSubmitEditing={handleSignup}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
            <Text style={[typography.Body1, styles.loginText]}>Sign Up</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGray,
    borderBottomLeftRadius: 60,
  },
  profileIcon: {
    marginTop: '15%',
    marginBottom: '10%',
    resizeMode: 'contain',
    flex: 1,
  },
  downContainer: {
    flex: 1.8,
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
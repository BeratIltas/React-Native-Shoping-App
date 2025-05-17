import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import { useAuth } from './AuthContext';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { images } from '../../assets/assets';
import { RootStackParamList } from '../../../type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const LoginScreen: React.FC<{ onSignupNavigate: () => void }> = ({ onSignupNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const { login } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    const isEmailEmpty = email.trim() === '';
    const isPasswordEmpty = password.trim() === '';

    setTouched({ email: true, password: true });

    if (isEmailEmpty || isPasswordEmpty) {
      setErrorMsg('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      await login(email, password);
      setErrorMsg('');
    } catch (error: any) {
      setErrorMsg('Giriş başarısız.');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.upContainerBg} source={images.LoginBackground}></Image>

      <View style={styles.downContainer}>
        <Text style={[typography.Header2, styles.title]}>Login</Text>

        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          {/* E-Mail */}
          <View style={[styles.inputWrapper, touched.email && email.trim() === '' && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor={Colors.softGray}
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={[styles.inputWrapper, touched.password && password.trim() === '' && styles.inputError]}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Enter your password"
              placeholderTextColor={Colors.softGray}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(prev => !prev)}
              style={styles.eyeIcon}
            >
              <Image
                source={showPassword ? images.EyeOff : images.Eye}
                style={styles.eyeImage}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={[typography.Body2Medium, styles.forgotText]}>
              Forgot your password? Reset it
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.8}
            style={{ width: '80%' }}
          >
            <LinearGradient
              colors={['#B210FF', '#EECE13']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
            >
              <Text style={[typography.Body1, styles.loginText]}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          onPress={onSignupNavigate}
          style={{ paddingVertical: 5, paddingHorizontal: 10 }}
        >
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
    gap: 50,
    backgroundColor: "white"
  },
  upContainerBg: {
    width: "100%",
    height: 120,
  },
  upContainer: {
    flex: 1,
    backgroundColor: Colors.darkGray,
    borderBottomRightRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downContainer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
  },
  title: {
    textAlign: "center",
    color: Colors.darkGray,
    marginBottom: 8,
    fontWeight: "900",
    padding: 30,
    paddingLeft: width * 0.1,
    textShadowRadius: 1,
    textShadowColor: Colors.gray,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: -10,
  },
  inputContainer: {
    alignItems: 'center',
  },
  inputWrapper: {
    width: '80%',
    height: 50,
    borderColor: Colors.lighterGray,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: Colors.black,
  },
  inputError: {
    borderColor: 'red',
  },
  passwordInput: {
    paddingRight: 45,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  eyeImage: {
    width: 24,
    height: 24,
    tintColor: Colors.gray,
  },
  forgotText: {
    color: Colors.darkGray,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#B210FF',     // Mor tonlarında gölge rengi
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowRadius: 2,
  },
  linkText: {
    color: Colors.darkGray,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10
  },
});

export default LoginScreen;
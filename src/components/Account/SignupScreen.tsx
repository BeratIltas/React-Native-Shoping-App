import React, { useState, useRef } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width } = Dimensions.get('window');

type SignupScreenProps = {
  onLoginNavigate: () => void;
};

const SignupScreen: React.FC<SignupScreenProps> = ({ onLoginNavigate }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ displayName: false, email: false, password: false });
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const displayNameRef = useRef<TextInput>(null);
  const { user } = useAuth();


  const handleSignup = async () => {
    const newTouched = {
      email: email.trim() === '',
      password: password.trim() === '',
      displayName: displayName.trim() === '',
    };
    setTouched(newTouched);

    if (newTouched.email || newTouched.password || newTouched.displayName) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    try {
      const createdUser = await signup(email, password, displayName);

      if (!createdUser) {
        throw new Error('User not found after signup');
      }

      try {
        const response = await axios.post('https://shopal.expozy.co/new-users', {
          id: createdUser.uid,
          email_address: createdUser.email,
          phone_number: '5555555',
          password: "sssss",
        });

        console.log('API success:', response.data);
        Alert.alert('Success!', 'User registered successfully to backend.');
      } catch (error: any) {
        console.error('API error:', error.response?.data || error.message);
        Alert.alert('Error', 'Backend registration failed.');
      }


      Alert.alert('Success!', 'Registration completed successfully!');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrorMsg('Backend validation error occurred.');
      } else if (error.code === 'auth/email-already-in-use') {
        setTouched(prev => ({ ...prev, email: true }));
        setErrorMsg('This email is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        setTouched(prev => ({ ...prev, email: true }));
        setErrorMsg('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        setTouched(prev => ({ ...prev, password: true }));
        setErrorMsg('Password is too weak. It must be at least 6 characters.');
      } else {
        setErrorMsg('An error occurred during registration.');
      }
    }
  };



  return (
    <View style={styles.container}>
      <Image style={styles.upContainerBg} source={images.LoginBackground}></Image>


      <View style={styles.downContainer}>
        <Text style={[typography.Header2, styles.title]}>Sign Up</Text>

        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          <View style={[styles.inputWrapper, touched.displayName && displayName.trim() === '' && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={Colors.softGray}
              value={displayName}
              onChangeText={setDisplayName}
              returnKeyType="next"
              onSubmitEditing={() => displayNameRef.current?.focus()}
              onBlur={() => setTouched(prev => ({ ...prev, displayName: true }))}
              blurOnSubmit={false}
            />
          </View>

          <View style={[styles.inputWrapper, touched.email && email.trim() === '' && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor={Colors.softGray}
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            />
          </View>

          <View style={[styles.inputWrapper, touched.password && password.trim() === '' && styles.inputError]}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Enter your password"
              placeholderTextColor={Colors.softGray}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
              autoCapitalize="none"
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
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

          <TouchableOpacity
            onPress={handleSignup}
            activeOpacity={0.8}
            style={{ width: '80%' }}
          >
            <LinearGradient
              colors={['#B210FF', '#EECE13']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signupButton}
            >
              <Text style={[typography.Body1, styles.signupText]}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onLoginNavigate} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={[typography.Body2Medium, styles.linkText]}>
            Already have an account? Log In
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
    backgroundColor: 'white',
  },
  upContainerBg: {
    width: '100%',
    height: 120,
    transform: [{ scaleX: -1 }]
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
    backgroundColor: 'white',
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
  signupButton: {
    width: '100%',
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#B210FF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signupText: {
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
    marginTop: 10,
  },
});

export default SignupScreen;

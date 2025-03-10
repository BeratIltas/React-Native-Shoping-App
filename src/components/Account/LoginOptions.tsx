import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

type LoginOptionsProps = {
  onLogin: (userData: { username: string; email: string; password: string }) => void;
};

const LoginOptions: React.FC<LoginOptionsProps> = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      {showLogin ? (
        <LoginScreen
          onLogin={(userData) => {
            onLogin(userData);
          }}
          onSignupNavigate={() => setShowLogin(false)}
        />
      ) : (
        <SignupScreen
          onSignup={(userData) => {
            onLogin(userData);
          }}
          onLoginNavigate={() => setShowLogin(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginOptions;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileScreen from '../components/Account/ProfileScreen';
import { useAuth } from '../components/Account/AuthContext';
import LoginScreen from '../components/Account/LoginScreen';
import SignupScreen from '../components/Account/SignupScreen';

const Account: React.FC = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      {user ? (
        <ProfileScreen />
      ) : (
        <View style={styles.container}>
        {showLogin ? (
          <LoginScreen
            onSignupNavigate={() => setShowLogin(false)}
          />
        ) : (
          <SignupScreen
            onLoginNavigate={() => setShowLogin(true)}
          />
        )}
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Account;
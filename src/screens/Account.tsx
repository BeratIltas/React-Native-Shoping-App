import React, { useState } from 'react';
import { View } from 'react-native';
import LoginOptions from '../components/Account/LoginOptions';
import ProfileScreen from '../components/Account/ProfileScreen';

type User = {
  username: string;
  email: string;
  password: string;
};

const Account: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn && user ? (
        <ProfileScreen user={user} onLogout={handleLogout} />
      ) : (
        <LoginOptions onLogin={handleLogin} />
      )}
    </View>
  );
};

export default Account;

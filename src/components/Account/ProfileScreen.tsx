import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type ProfileProps = {
  user: {
    username: string;
    email: string;
  };
  onLogout: () => void;
};

const ProfileScreen: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Bilgileri</Text>
      <Text>Kullanıcı Adı: {user.username}</Text>
      <Text>E-Posta: {user.email}</Text>
      <Button title="Çıkış Yap" onPress={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProfileScreen;

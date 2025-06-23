import React, { createContext, useEffect, useState, useContext } from 'react';
import { getAuth, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  profilePhoto: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<FirebaseAuthTypes.User | null>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (displayName: string, photoBase64OrUri: string | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const PROFILE_PHOTO_KEY = '@profile_photo';
const auth = getAuth(getApp());

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const refreshUser = async () => {
      const currentUser = auth.currentUser;
      await currentUser?.reload();
      setUser(auth.currentUser);
    };
    refreshUser();
  }, []);

  useEffect(() => {
    const loadSavedPhoto = async () => {
      const savedPhoto = await AsyncStorage.getItem(PROFILE_PHOTO_KEY);
      if (savedPhoto) {
        setProfilePhoto(savedPhoto);
      }
    };
    loadSavedPhoto();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName });
      await userCredential.user.reload();
      const currentUser = auth.currentUser;
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };


  const logout = async () => {
    try {
      await auth.signOut();
      setProfilePhoto(null);
      await AsyncStorage.removeItem(PROFILE_PHOTO_KEY);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  const updateProfile = async (displayName: string, photoBase64OrUri: string | null) => {
    try {
      if (user) {
        await user.updateProfile({ displayName });
        await user.reload();

        const refreshedUser = auth.currentUser;
        setUser(refreshedUser);

        if (photoBase64OrUri) {
          await AsyncStorage.setItem(PROFILE_PHOTO_KEY, photoBase64OrUri);
          setProfilePhoto(photoBase64OrUri);
        }
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profilePhoto, login, signup, logout, resetPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

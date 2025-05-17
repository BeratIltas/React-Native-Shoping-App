import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable 
} from 'react-native';
import CommonHeader from '../../../navigation/Header/CommonHeader';
import typography from '../../../assets/typography';
import Colors from '../../../assets/colors';
import { useAuth } from '../AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native';
import { images } from '../../../assets/assets';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../type';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();
  const [inputError, setInputError] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showSuccessImage, setShowSuccessImage] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleResetPassword = async () => {
    setInputError(false);
    setShowSuccessImage(false);
    if (!email) {
      setInputError(true);
      return;
    }
    try {
      await resetPassword(email);
      setModalMessage('The password reset link has been sent to your email.');
      setShowSuccessImage(true);
      setModalVisible(true);
    } catch (error: any) {
      setModalMessage('An error occurred. Please try again later.');
      setShowSuccessImage(false);
      setModalVisible(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CommonHeader title="" icon={null} page="goBack" />
      <View style={styles.container}>
        <View style={{ gap: 10 }}>
          <Text style={typography.Header2}>Forgot password</Text>
          <Text style={[styles.subTitle, typography.Body1Regular]}>
            Enter your email and we'll send you a reset link.
          </Text>
        </View>
        <View>
          <Text style={typography.Body1Medium}>Email</Text>
          <TextInput
            style={[
              styles.input,
              inputError && { borderColor: 'red' }
            ]}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (text) setInputError(false);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <TouchableOpacity
          onPress={handleResetPassword}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#B210FF', '#EECE13']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sendButton}
          >
            <Text style={[typography.Body1, styles.sendButtonText]}>Send</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {showSuccessImage && <Image source={images.SuccessIcon} style={{ marginBottom: 20 }} />} {/* 🔴 Sadece başarılıysa göster */}
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    backgroundColor: "white",
  },
  subTitle: {
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lighterGray,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  sendButton: {
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
  sendButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#E2883A',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ForgetPassword;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useAuth } from './AuthContext';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { images } from '../../assets/assets';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../type';
import { launchImageLibrary, launchCamera, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen: React.FC = () => {
  const { user, logout, updateProfile, profilePhoto  } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User has logged out successfully');
    } catch (error: any) {
      console.error('Logout Error:', error.message || 'Logout failed');
    }
  };

 const pickFromGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          await updateProfile(user?.displayName ?? '', imageUri);
          setModalVisible(false);
          console.log('Profile photo updated to:', imageUri);
        }
      }
    });
  };

  const pickFromCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, async (response) => {
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          await updateProfile(user?.displayName ?? '', imageUri);
          setModalVisible(false);
          console.log('Profile photo updated to:', imageUri);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[typography.Header2, styles.title]}>My Profile</Text>

      <View style={styles.uppContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={profilePhoto ? { uri: profilePhoto } : images.userProfile}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
        <View style={styles.uppContainerText}>
          <Text style={[typography.Body3Medium, styles.username]}>
            {user?.displayName}
          </Text>
          <Text style={[typography.Body3Medium, styles.email]}>{user?.email || 'Email not available'}</Text>
        </View>
      </View>

      <View style={styles.downContainer}>
        <TouchableOpacity style={styles.optionContainers} onPress={() => navigation.navigate("OrdersScreen")}>
          <View style={styles.optionContainerLeft}>
            <Image source={images.myOrders} />
            <Text style={[typography.Body1Regular, styles.subTitle]}>My Orders</Text>
          </View>
          <Image source={images.rightArrow} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.optionContainers} onPress={() => navigation.navigate("Addresses")} >
          <View style={styles.optionContainerLeft}>
            <Image source={images.addressBook} />
            <Text style={[typography.Body1Regular, styles.subTitle]}>Address Book</Text>
          </View>
          <Image source={images.rightArrow} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.optionContainers} onPress={() => navigation.navigate('PaymentMethods')}>
          <View style={styles.optionContainerLeft}>
            <Image source={images.paymentMethods} />
            <Text style={[typography.Body1Regular, styles.subTitle]}>Payment Methods</Text>
          </View>
          <Image source={images.rightArrow} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.optionContainers} onPress={() => navigation.navigate("NotificationsScreen")} >
          <View style={styles.optionContainerLeft}>
            <Image source={images.bell} />
            <Text style={[typography.Body1Regular, styles.subTitle]}>Notifications</Text>
          </View>
          <Image source={images.rightArrow} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.optionContainers}
          onPress={() => navigation.navigate("HelpScreen")}>
          <View style={styles.optionContainerLeft}>
            <Image source={images.headPhones} />
            <Text style={[typography.Body1Regular, styles.subTitle]}>Help</Text>
          </View>
          <Image source={images.rightArrow} />
        </TouchableOpacity>

        <View style={styles.line} />

      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logOut}>
        <Text style={styles.logOutText}>Logout</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalOption} onPress={pickFromGallery}>
              <Text style={styles.modalText}>Galeriden Seç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={pickFromCamera}>
              <Text style={styles.modalText}>Kamerayı Aç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalText, { color: 'red' }]}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingLeft: 40,
    paddingTop: 50,
    textShadowColor: Colors.darkGray,
    textShadowRadius: 1,
  },
  uppContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '20%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  profileIcon: {
    resizeMode: 'stretch',
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  uppContainerText: {
    paddingLeft: 30,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {},
  downContainer: {
    flex: 3,
  },
  optionContainers: {
    marginHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    height: 64,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  optionContainerLeft: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  subTitle: {
    paddingLeft: 30,
  },
  line: {
    marginVertical: 7,
    marginHorizontal: 35,
  },
  logOut: {
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
  },
  logOutText: {
    color: Colors.white,
    textShadowColor: Colors.whiteGray,
    textShadowRadius: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalOption: {
    paddingVertical: 15,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProfileScreen;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from './AuthContext';
import Colors from '../../assets/colors';
import typography from '../../assets/typography';
import { images } from '../../assets/assets';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../type';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User has logged out successfully');
    } catch (error: any) {
      console.error('Logout Error:', error.message || 'Logout failed');
    }
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={[typography.Header2, styles.title]}>My Profile</Text>

      <TouchableOpacity style={styles.uppContainer}>
        <Image source={images.userProfile} style={styles.profileIcon} />
        <View style={styles.uppContainerText}>
          <Text style={[typography.Body3Medium, styles.username]}>
            {user?.displayName || 'Guest User'}
          </Text>
          <Text style={[typography.Body3Medium, styles.email]}>{user?.email || 'Email not available'}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.downContainer}>
        <TouchableOpacity style={styles.optionContainers}>
          <View style={styles.optionContainerLeft}>
            <Image source={images.myOrders} />
            <Text style={[typography.Body1Regular, styles.subTitle]}>My Orders</Text>
          </View>
          <Image source={images.rightArrow} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.optionContainers}>
          <View style={styles.optionContainerLeft}>
            <Image source={images.addressBook} />
            <Text style={[typography.Body1Regular, styles.subTitle]}>Address Book</Text>
          </View>
          <Image source={images.rightArrow} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.optionContainers}  onPress={() => navigation.navigate('PaymentMethods')}>
          <View style={styles.optionContainerLeft}>
            <Image source={images.paymentMethods} />
            <Text style={[typography.Body1Regular, styles.subTitle]}>Payment Methods</Text>
          </View>
          <Image source={images.rightArrow} />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.optionContainers}>
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
    resizeMode: 'contain',
    height: 80,
    width: 80,
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
});

export default ProfileScreen;
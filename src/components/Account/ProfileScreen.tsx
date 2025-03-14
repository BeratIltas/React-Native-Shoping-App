import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import typography from '../../assets/typography';
import Colors from '../../assets/colors';
import { Assets } from '@react-navigation/elements';
import { assets } from '../../../react-native.config';
import { images } from '../../assets/assets';

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
      <Text style={[typography.Header2, styles.title]}>My Profile</Text>

      <TouchableOpacity style={styles.uppContainer} >
        <Image source={images.userProfile} style={{}} />
        <View style={styles.uppContainerText} >
          <Text style={[typography.Body3Medium, {fontSize: 20, fontWeight: 'bold',}]}>{user.username}</Text>
          <Text style={[typography.Body3Medium, ]}>{user.email}</Text>
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

        <TouchableOpacity style={styles.optionContainers}>
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


      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logOut}>
        <Text style={styles.logOutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  downContainer: {
    flex: 3,
  },
  uppContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '20%',
    alignItems: 'center',
    alignContent:'center',
    alignSelf:'center',
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
  },
  uppContainerText:{
    paddingLeft:30,
  },
  title: {
    paddingLeft: 40,
    paddingTop: 50,
    textShadowColor: Colors.darkGray,
    textShadowRadius: 1,
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
  }
});

export default ProfileScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import CommonHeader from '../../../navigation/Header/CommonHeader';
import Colors from '../../../assets/colors';
import typography from '../../../assets/typography';
import { images } from '../../../assets/assets';

type Notification = {
  id: string;
  title: string;
  body: string;
  receivedAt: string;
};


const ForegroundNotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground mesajı:', remoteMessage);

      const newNotification: Notification = {
        id: remoteMessage.messageId || Date.now().toString(),
        title: remoteMessage.notification?.title || 'Başlıksız Bildirim',
        body: remoteMessage.notification?.body || '',
        receivedAt: new Date().toLocaleString(),
      };

      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <CommonHeader title="Notifications" page="goBack" icon={null} onPress={undefined} />
            {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image style={{ tintColor: Colors.gray }} source={images.Bell64}></Image>
          <Text style={[typography.Header4, styles.emptyTextHeader]}>You haven’t gotten any notifications yet!</Text>
          <Text style={[typography.Body1Regular, styles.emptyText]}>We’ll alert you when something cool happens.</Text>
        </View>
      ) : (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {notifications.length === 0 ? (
          <Text style={styles.emptyText}>No notifications yet.</Text>
        ) : (
          notifications.map(item => (
            <View key={item.id} style={styles.notificationCard}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.receivedAt}</Text>
              </View>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          ))
        )}
      </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
    emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal:"15%",
    gap:10
  },
  emptyTextHeader: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.black
  },
  emptyText: {
    color: Colors.gray,
    textAlign:"center",
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    color: '#2e2e2e',
    flex: 1,
    paddingRight: 10,
  },
  date: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'center',
  },
  body: {
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
  },

});

export default ForegroundNotificationsScreen;

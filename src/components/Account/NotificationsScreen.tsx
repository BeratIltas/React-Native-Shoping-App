import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import CommonHeader from '../../navigation/Header/CommonHeader';
import Colors from '../../assets/colors';

type Notification = {
  id: string;
  title: string;
  body: string;
  receivedAt: string;
};

const fakeNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome!',
    body: 'Thank you for signing up to our app.',
    receivedAt: '2025-05-18 10:00',
  },
  {
    id: '2',
    title: 'Update',
    body: 'New features have been added, check them out now!',
    receivedAt: '2025-05-17 18:30',
  },
  {
    id: '3',
    title: 'Reminder',
    body: 'Don’t forget to update your profile.',
    receivedAt: '2025-05-16 09:15',
  },
];

const ForegroundNotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>(fakeNotifications);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ForegroundNotificationsScreen;

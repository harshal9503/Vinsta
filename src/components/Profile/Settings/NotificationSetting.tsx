import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';

const { width, height } = Dimensions.get('window');

const NotificationSetting = () => {
  const navigation = useNavigation<any>();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotional, setPromotional] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(true);
  const [newFeatures, setNewFeatures] = useState(true);

  const notificationOptions = [
    {
      id: 1,
      title: 'Push Notifications',
      description: 'Receive push notifications on your device',
      value: pushNotifications,
      onValueChange: setPushNotifications,
    },
    {
      id: 2,
      title: 'Email Notifications',
      description: 'Get notifications via email',
      value: emailNotifications,
      onValueChange: setEmailNotifications,
    },
    {
      id: 3,
      title: 'Order Updates',
      description: 'Updates about your orders and deliveries',
      value: orderUpdates,
      onValueChange: setOrderUpdates,
    },
    {
      id: 4,
      title: 'Promotional Content',
      description: 'Deals and promotional offers',
      value: promotional,
      onValueChange: setPromotional,
    },
    {
      id: 5,
      title: 'Special Offers',
      description: 'Exclusive offers and discounts',
      value: specialOffers,
      onValueChange: setSpecialOffers,
    },
    {
      id: 6,
      title: 'New Features',
      description: 'Updates about new app features',
      value: newFeatures,
      onValueChange: setNewFeatures,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <Text style={styles.sectionDescription}>
          Choose what type of notifications you want to receive
        </Text>

        {notificationOptions.map((item) => (
          <View key={item.id} style={styles.notificationRow}>
            <View style={styles.notificationLeft}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationDescription}>{item.description}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor={item.value ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        ))}

        {/* <View style={styles.scheduleSection}>
          <Text style={styles.scheduleTitle}>Quiet Hours</Text>
          <Text style={styles.scheduleDescription}>
            Mute notifications during specific hours
          </Text>
          <TouchableOpacity style={styles.scheduleButton}>
            <Text style={styles.scheduleButtonText}>Configure Quiet Hours</Text>
            <Image source={require('../../../assets/right-arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View> */}

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Some notifications are essential for app functionality and cannot be disabled.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
    fontFamily : 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    fontFamily : 'Figtree-Bold',
  },
  sectionDescription: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 25,
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationLeft: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: width * 0.038,
    color: '#000',
    marginBottom: 4,
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
  notificationDescription: {
    fontSize: width * 0.03,
    color: '#666',
    fontFamily : 'Figtree-Regular',
    fontWeight  :'400'
  },
  scheduleSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleTitle: {
    fontSize: width * 0.038,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  scheduleDescription: {
    fontSize: width * 0.03,
    color: '#666',
    marginBottom: 12,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  scheduleButtonText: {
    fontSize: width * 0.035,
    color: '#000',
    fontWeight: '500',
  },
  arrowIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: '#999',
  },
  noteContainer: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  noteText: {
    fontSize: width * 0.03,
    color: '#666',
    textAlign: 'center',
    fontFamily : 'Figtree-Medium',
    fontWeight  :'400'
  },
});

export default NotificationSetting;
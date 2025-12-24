import React, { useContext, useState } from 'react';
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
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const NotificationSetting = () => {
  const navigation = useNavigation<any>();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotional, setPromotional] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(true);
  const [newFeatures, setNewFeatures] = useState(true);
  const { theme } = useContext(ThemeContext);

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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textSecondary }]}>
          Notification Settings
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          Notification Preferences
        </Text>
        <Text
          style={[styles.sectionDescription, { color: theme.textSecondary }]}
        >
          Choose what type of notifications you want to receive
        </Text>

        {notificationOptions.map(item => (
          <View
            key={item.id}
            style={[
              styles.notificationRow,
              { backgroundColor: theme.background },
            ]}
          >
            <View style={styles.notificationLeft}>
              <Text
                style={[
                  styles.notificationTitle,
                  { color: theme.textSecondary },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.notificationDescription,
                  { color: theme.textSecondary },
                ]}
              >
                {item.description}
              </Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor={item.value ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        ))}

        <View style={styles.noteContainer}>
          <Text style={[styles.noteText, { color: '#616161' }]}>
            Some notifications are essential for app functionality and cannot be
            disabled.
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
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    color: '#616161',
    fontFamily: 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    color: '#616161',
    marginBottom: 8,
    fontFamily: 'Figtree-Bold',
  },
  sectionDescription: {
    fontSize: width * 0.035,
    color: '#616161',
    marginBottom: 25,
    fontFamily: 'Figtree-Medium',
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
    color: '#616161',
    marginBottom: 4,
    fontFamily: 'Figtree-SemiBold',
  },
  notificationDescription: {
    fontSize: width * 0.03,
    color: '#616161',
    fontFamily: 'Figtree-Regular',
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
    color: '#616161',
    textAlign: 'center',
    fontFamily: 'Figtree-Medium',
  },
});

export default NotificationSetting;

// File: screens/Notification.tsx
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import { ThemeContext } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';
import { getFontFamily, getFontWeight } from '../../utils/fontHelper';

const { width, height } = Dimensions.get('window');

const Notification = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('Offer & Discount');
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState<any>(null);

  const data = {
    'Offer & Discount': [
      {
        id: 1,
        title: 'Get 50% off on first order',
        message: 'Enjoy half-price on your first Vinsta order today!',
        icon: require('../../assets/offers.png'),
      },
      {
        id: 2,
        title: 'Diwali Special Combo Offer',
        message: 'Buy any two teas and get one free combo pack.',
        icon: require('../../assets/offers.png'),
      },
    ],
    'Order Status': [
      {
        id: 1,
        title: 'Your order is on the way!',
        message: 'Delivery partner arriving soon. Be ready!',
        icon: require('../../assets/bikee.png'),
      },
      {
        id: 2,
        title: 'Order Delivered Successfully',
        message: 'Hope you enjoyed your meal!',
        icon: require('../../assets/noti.png'),
      },
    ],
    Reminder: [
      {
        id: 1,
        title: 'Time for your evening tea!',
        message: "Don't miss your favorite masala chai.",
        icon: require('../../assets/noti.png'),
      },
      {
        id: 2,
        title: 'Weekend treat reminder',
        message: 'Try our new hot chocolate blend.',
        icon: require('../../assets/offers.png'),
      },
    ],
  };
  // Structured Notification State
  const [notifications, setNotifications] = useState(() =>
    Object.fromEntries(
      Object.keys(data).map((tab) => [
        tab,
        {
          recent: data[tab].map((item) => ({ ...item, read: false })),
          yesterday: data[tab].map((item) => ({ ...item, read: false })),
        },
      ])
    )
  );
  const getUnreadCount = (section: string) =>
    notifications[activeTab][section].filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    const updated = { ...notifications };
    updated[activeTab].recent.forEach((n) => (n.read = true));
    updated[activeTab].yesterday.forEach((n) => (n.read = true));
    setNotifications(updated);
  };

  const openPopup = (section: string, itemId: number) => {
    const updated = { ...notifications };
    updated[activeTab][section] = updated[activeTab][section].map((item) =>
      item.id === itemId ? { ...item, read: true } : item
    );
    const item = updated[activeTab][section].find((i) => i.id === itemId);

    setNotifications(updated);
    setPopupData(item);
    setShowPopup(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Notification
        </Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Tabs */}
      <View
        style={[
          styles.tabsRow,
          {
            backgroundColor: theme.cardBackground,
            borderBottomColor: theme.mode === 'dark' ? '#444' : '#ddd',
          },
        ]}
      >
        {Object.keys(data).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                { color: theme.textSecondary },
                activeTab === tab && { color: COLORS.primary },
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Recent Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionLeft}>
            <Text style={[styles.sectionHeader, { color: theme.text }]}>
              Recent
            </Text>

            {getUnreadCount('recent') > 0 && (
              <View style={[styles.countBadge]}>
                <Text style={styles.countText}>
                  {getUnreadCount('recent')}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity onPress={handleMarkAllRead}>
            <Text style={[styles.markRead, { color: COLORS.primary }]}>
              Marks as read
            </Text>
          </TouchableOpacity>
        </View>
       {/* Recent Items */}
{notifications[activeTab].recent.map((item) => (
  <TouchableOpacity
    key={item.id}
    style={[
      styles.notificationRow,
      { backgroundColor: theme.cardBackground },
      !item.read && {
        backgroundColor: theme.mode === 'dark' ? '#333' : '#faeae1ff',
        borderLeftColor: COLORS.primary,
      },
    ]}
    onPress={() => openPopup('recent', item.id)}
  >
    <View
      style={[
        styles.iconCircle,
        {
          backgroundColor: theme.mode === 'dark' ? '#444' : '#fff',
          borderColor: theme.textSecondary,
        },
      ]}
    >
      <Image source={item.icon} style={styles.icon} />
    </View>

    <View style={styles.notificationText}>
      <Text
        style={[
          styles.notificationTitle,
          { color: theme.mode === 'dark' ? '#fff' : '#000' },
        ]}
      >
        {item.title}
      </Text>

      <Text
        style={[
          styles.notificationMessage,
          { color: theme.mode === 'dark' ? '#ccc' : '#444' },
        ]}
      >
        {item.message}
      </Text>
    </View>
  </TouchableOpacity>
))}
        {/* Yesterday */}
        <View style={[styles.sectionHeaderRow, { marginTop: 20 }]}>
          <View style={styles.sectionLeft}>
            <Text style={[styles.sectionHeader, { color: theme.text }]}>
              Yesterday
            </Text>
            {getUnreadCount('yesterday') > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>
                  {getUnreadCount('yesterday')}
                </Text>
              </View>
            )}
          </View>
        </View>
         {/* Yesterday Items */}
      {notifications[activeTab].yesterday.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.notificationRow,
            {
              backgroundColor: theme.mode === 'dark' ? '#333' : '#faeae1ff',
            },
            !item.read && {
              borderLeftColor: COLORS.primary,
            },
          ]}
          onPress={() => openPopup('yesterday', item.id)}
        >
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: theme.mode === 'dark' ? '#444' : '#fff',
                borderColor: theme.textSecondary,
              },
            ]}
          >
            <Image source={item.icon} style={styles.icon} />
          </View>

          <View style={styles.notificationText}>
            <Text
              style={[
                styles.notificationTitle,
                { color: theme.mode === 'dark' ? '#fff' : '#000' },
              ]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.notificationMessage,
                { color: theme.mode === 'dark' ? '#ccc' : '#444' },
              ]}
            >
              {item.message}
            </Text>
          </View>
        </TouchableOpacity>
        ))}
      </ScrollView>
      {/* POPUP MODAL */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View
            style={[
              styles.popupBox,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            {popupData && (
              <>
                <Text
                  style={[styles.popupTitle, { color: theme.text }]}
                >
                  {popupData.title}
                </Text>

                <Text
                  style={[styles.popupText, { color: theme.textSecondary }]}
                >
                  {popupData.message}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.popupButton,
                    { backgroundColor: COLORS.primary },
                  ]}
                  onPress={() => setShowPopup(false)}
                >
                  <Text style={styles.popupButtonText}>OK</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },

  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: width * 0.045,
    fontFamily: getFontFamily('Bold'),
  },

  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
  },

  tabButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },

  tabText: {
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
  },

  activeIndicator: {
    marginTop: 6,
    height: 3,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionHeader: {
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
  },

  countBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 6,
  },
  countText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: getFontFamily('SemiBold'),
  },
  markRead: {
    fontSize: 13,
    fontFamily: getFontFamily('SemiBold'),
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    borderLeftWidth: 3,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  notificationText: { flex: 1 },
  notificationTitle: {
    fontSize: 14,
    fontFamily: getFontFamily('SemiBold'),
  },
  notificationMessage: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: getFontFamily('Regular'),
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    width: '86%',
    padding: 24,
    borderRadius: 18,
  },
  popupTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: getFontFamily('Bold'),
  },
  popupText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  popupButton: {
    paddingVertical: 12,
    borderRadius: 10,
  },
  popupButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
  },
});

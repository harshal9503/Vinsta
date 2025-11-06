// File: screens/Notification.tsx

import React, { useState } from 'react';
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
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const Notification = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Offer & Discount');
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState<any>(null);

  // ===== DATA =====
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
        message: 'Delivery partner is arriving soon. Get ready to receive your order.',
        icon: require('../../assets/bikee.png'),
      },
      {
        id: 2,
        title: 'Order Delivered Successfully',
        message: 'Hope you enjoyed your meal! Rate your experience with Vinsta.',
        icon: require('../../assets/noti.png'),
      },
    ],
    Reminder: [
      {
        id: 1,
        title: 'Time for your evening tea!',
        message: 'Don\'t forget your favorite masala chai — order now!',
        icon: require('../../assets/noti.png'),
      },
      {
        id: 2,
        title: 'Weekend treat reminder',
        message: 'Make your weekend cozy with our new hot chocolate blend.',
        icon: require('../../assets/offers.png'),
      },
    ],
  };

  // ===== STATE FOR UNREAD =====
  const [notifications, setNotifications] = useState(() => {
    return Object.fromEntries(
      Object.keys(data).map((tab) => [
        tab,
        {
          recent: data[tab].map((item) => ({ ...item, read: false })),
          yesterday: data[tab].map((item) => ({ ...item, read: false })),
        },
      ])
    );
  });

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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {Object.keys(data).map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        {/* Recent Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionHeader}>Recent</Text>
            {getUnreadCount('recent') > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{getUnreadCount('recent')}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={handleMarkAllRead}>
            <Text style={styles.markRead}>Marks as read</Text>
          </TouchableOpacity>
        </View>

        {notifications[activeTab].recent.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.notificationRow,
              !item.read && styles.unreadHighlight,
            ]}
            onPress={() => openPopup('recent', item.id)}>
            <View style={styles.iconCircle}>
              <Image source={item.icon} style={styles.icon} />
            </View>
            <View style={styles.notificationText}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Yesterday Section */}
        <View style={[styles.sectionHeaderRow, { marginTop: 20 }]}>
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionHeader}>Yesterday</Text>
            {getUnreadCount('yesterday') > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{getUnreadCount('yesterday')}</Text>
              </View>
            )}
          </View>
        </View>

        {notifications[activeTab].yesterday.map((item) => (
          <TouchableOpacity
            key={`y${item.id}`}
            style={[
              styles.notificationRow,
              !item.read && styles.unreadHighlight,
            ]}
            onPress={() => openPopup('yesterday', item.id)}>
            <View style={styles.iconCircle}>
              <Image source={item.icon} style={styles.icon} />
            </View>
            <View style={styles.notificationText}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Popup Modal */}
      <Modal
        transparent
        visible={showPopup}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}>
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            {popupData && (
              <>
                <Text style={styles.popupTitle}>{popupData.title}</Text>
                <Text style={styles.popupText}>{popupData.message}</Text>
                <TouchableOpacity
                  style={styles.popupButton}
                  onPress={() => setShowPopup(false)}>
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

// ========================= STYLES =========================
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
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '700',
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
    marginBottom: 8,
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginRight: 8,
  },
  countBadge: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  markRead: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  unreadHighlight: {
    backgroundColor: '#FFF6F0',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
  },

  /** Popup styles **/
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  popupBox: {
    width: width * 0.85,
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  popupTitle: {
    fontSize: width * 0.045,
    color: COLORS.text,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  popupText: {
    fontSize: width * 0.038,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  popupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    minWidth: 120,
    alignItems: 'center',
  },
  popupButtonText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: width * 0.038,
  },
});

export default Notification;
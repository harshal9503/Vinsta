import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation<any>();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAction, setPopupAction] = useState<null | (() => void)>(null);

  const topOptions = [
    {
      id: 1,
      icon: require('../../assets/address.png'),
      label: 'Address',
      route: 'Address',
    },
    {
      id: 2,
      icon: require('../../assets/myorders.png'),
      label: 'My Order',
      route: 'MyOrder',
    },
    {
      id: 3,
      icon: require('../../assets/subscription.png'),
      label: 'My Subscription',
      route: 'Subscription',
    },
    {
      id: 4,
      icon: require('../../assets/wallet1.png'),
      label: 'Wallet',
      route: 'Wallet',
    },
  ];

  const bottomOptions = [
    { id: 1, icon: require('../../assets/profile.png'), label: 'Profile', route: 'ProfileEdit' },
    { id: 2, icon: require('../../assets/favourite.png'), label: "Favourite's", route: 'Favourite' },
    { id: 3, icon: require('../../assets/offers.png'), label: "My Offer's", route: 'MyOffer' },
    { id: 4, icon: require('../../assets/refer.png'), label: 'Refer To Earn', route: 'Refer' },
    { id: 5, icon: require('../../assets/dark.png'), label: 'Dark Mode', route: 'DarkMode' },
    { id: 6, icon: require('../../assets/support.png'), label: 'Support', route: 'Support' },
    { id: 7, icon: require('../../assets/settings.png'), label: "Setting's", route: 'Settings' },
  ];

  const openPopup = (message: string, onConfirm: () => void) => {
    setPopupMessage(message);
    setPopupAction(() => onConfirm);
    setShowPopup(true);
  };

  const handleNavigation = (route: string) => {
    if (route === 'DarkMode') {
      // Handle dark mode toggle here if needed
      return;
    }
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* ===== Background Image under header ===== */}
      <Image source={require('../../assets/bg.png')} style={styles.bgImage} />

      {/* ===== Fixed Header ===== */}
      <View style={styles.fixedHeader}>
        <View style={styles.backRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== Scrollable Content ===== */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* ===== Profile Header ===== */}
        <View style={styles.profileHeader}>
          <View style={styles.userRow}>
            <Image
              source={require('../../assets/user.png')}
              style={styles.userImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Harshal Sharma</Text>
              <Text style={styles.userEmail}>harshal@gmail.com</Text>
              <Text style={styles.userPhone}>+91 1234567890</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('ProfileEdit')}>
              <Image source={require('../../assets/edit.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== Top Options ===== */}
        <View style={styles.topOptionsContainer}>
          {topOptions.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.topOption}
              onPress={() => navigation.navigate(item.route)}
            >
              <Image source={item.icon} style={styles.topIcon} />
              <Text style={styles.topLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== Bottom Options ===== */}
        <View style={styles.bottomSection}>
          {bottomOptions.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.optionRow}
              onPress={() => handleNavigation(item.route)}>
              <View style={styles.optionLeft}>
                <Image source={item.icon} style={styles.optionIcon} />
                <Text style={styles.optionLabel}>{item.label}</Text>
              </View>
              <Image
                source={require('../../assets/right-arrow.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          ))}

          {/* ===== Logout ===== */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              openPopup('Are you sure you want to logout?', () =>
                navigation.navigate('SignIn'),
              )
            }
          >
            <View style={styles.optionLeft}>
              <Image
                source={require('../../assets/logout.png')}
                style={styles.optionIcon}
              />
              <Text style={[styles.optionLabel, { color: '#E53935' }]}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>

          {/* ===== Delete Account ===== */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              openPopup('Are you sure you want to delete your account?', () =>
                navigation.navigate('SignIn'),
              )
            }
          >
            <View style={styles.optionLeft}>
              <Image
                source={require('../../assets/delete.png')}
                style={styles.optionIcon}
              />
              <Text style={[styles.optionLabel, { color: '#E53935' }]}>
                Delete Account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ===== Popup Modal ===== */}
      <Modal
        transparent
        visible={showPopup}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupText}>{popupMessage}</Text>
            <View style={styles.popupButtonsContainer}>
              <TouchableOpacity
                style={[styles.popupButton, styles.popupCancelButton]}
                onPress={() => setShowPopup(false)}>
                <Text style={[styles.popupButtonText, { color: COLORS.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.popupButton, styles.popupConfirmButton]}
                onPress={() => {
                  setShowPopup(false);
                  popupAction && popupAction();
                }}>
                <Text style={styles.popupButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  /** BACKGROUND IMAGE **/
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: height * 0.25, // covers header area + status bar
    resizeMode: 'cover',
  },

  /** FIXED HEADER **/
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent', // bg.png behind it
    paddingTop: height * 0.07,
    paddingBottom: 10,
  },
  backRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#000', // visible over bg
  },
  helpText: {
    fontSize: width * 0.035,
    color: '#E87C23',
    fontWeight: '600',
  },

  /** PROFILE HEADER **/
  profileHeader: {
    width: '100%',
    marginTop: height * 0.13, // below header
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userImage: {
    width: 85,
    height: 85,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: width * 0.048,
    fontWeight: '700',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: width * 0.032,
    color: '#666',
    marginTop: 3,
  },
  userPhone: {
    fontSize: width * 0.032,
    color: '#666',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    padding: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: { elevation: 3 },
    }),
  },
  editIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#616161',
  },

  /** TOP OPTIONS **/
  topOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 25,
  },
  topOption: {
    width: width * 0.21,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: { elevation: 4 },
    }),
  },
  topIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginBottom: 5,
    tintColor: '#616161',
  },
  topLabel: {
    fontSize: width * 0.0237,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
  },

  /** BOTTOM OPTIONS **/
  bottomSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 15,
    tintColor: '#616161',
  },
  optionLabel: {
    fontSize: width * 0.037,
    color: COLORS.text,
    fontWeight: '600',
  },
  arrowIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: '#616161',
  },

  /** POPUP **/
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupBox: {
    width: width * 0.8,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 6 },
    }),
  },
  popupText: {
    fontSize: width * 0.04,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  popupButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  popupCancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  popupConfirmButton: {
    backgroundColor: COLORS.primary,
    marginLeft: 10,
  },
  popupButtonText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: width * 0.035,
  },
});

export default Profile;
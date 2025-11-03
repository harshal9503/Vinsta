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

const Settings = () => {
  const navigation = useNavigation<any>();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAction, setPopupAction] = useState<null | (() => void)>(null);

  const openPopup = (message: string, onConfirm: () => void) => {
    setPopupMessage(message);
    setPopupAction(() => onConfirm);
    setShowPopup(true);
  };

  const settingsOptions = [
    { id: 1, label: 'Account Setting', icon: require('../../assets/ac.png') },
    {
      id: 2,
      label: 'Sound’s and voice',
      icon: require('../../assets/sound.png'),
    },
    { id: 3, label: 'Language', icon: require('../../assets/language.png') },
    {
      id: 4,
      label: 'Notification Setting',
      icon: require('../../assets/notisetting.png'),
    },
    {
      id: 5,
      label: 'Account management',
      icon: require('../../assets/acmanage.png'),
    },
    { id: 6, label: 'About us', icon: require('../../assets/aboutus.png') },
    { id: 7, label: 'Share app', icon: require('../../assets/share1.png') },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setting’s</Text>
        <View style={{ width: 24 }} /> {/* spacer */}
      </View>

      {/* ===== SCROLL CONTENT ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View style={styles.optionContainer}>
          {settingsOptions.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={() => console.log(item.label)}
            >
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
            activeOpacity={0.7}
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
                Log out
              </Text>
            </View>
          </TouchableOpacity>

          {/* ===== Delete Account ===== */}
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
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

      {/* ===== POPUP MODAL ===== */}
      <Modal
        transparent
        visible={showPopup}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupText}>{popupMessage}</Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => {
                setShowPopup(false);
                popupAction && popupAction();
              }}
            >
              <Text style={styles.popupButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  /** HEADER **/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: COLORS.text,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: COLORS.text,
  },

  /** OPTION LIST **/
  optionContainer: {
    marginTop: 15,
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
    marginBottom: 16,
  },
  popupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  popupButtonText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: width * 0.04,
  },
});

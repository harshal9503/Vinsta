import React, { useContext, useState } from 'react';
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
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const Settings = () => {
  const navigation = useNavigation<any>();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAction, setPopupAction] = useState<null | (() => void)>(null);
  const {theme} = useContext(ThemeContext);

  /** ─── Function to open confirmation popup ─── **/
  const openPopup = (message: string, onConfirm: () => void) => {
    setPopupMessage(message);
    setPopupAction(() => onConfirm);
    setShowPopup(true);
  };

  /** ─── Settings options list ─── **/
  const settingsOptions = [
    { id: 1, label: 'Account Setting', icon: require('../../../assets/ac.png'), route: 'AccountSetting' },
    { id: 2, label: "Sound's and voice", icon: require('../../../assets/sound.png'), route: 'SoundAndVoice' },
    { id: 3, label: 'Language', icon: require('../../../assets/language.png'), route: 'Language' },
    { id: 4, label: 'Notification Setting', icon: require('../../../assets/notisetting.png'), route: 'NotificationSetting' },
    { id: 5, label: 'Account management', icon: require('../../../assets/acmanage.png'), route: 'AccountManagement' },
    { id: 6, label: 'About us', icon: require('../../../assets/aboutus.png'), route: 'AboutUs' },
    { id: 7, label: 'Share app', icon: require('../../../assets/share1.png'), route: 'ShareApp' },
  ];

  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ===== HEADER ===== */}
      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor : COLORS.text}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : '#616161'}]}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ===== OPTIONS LIST ===== */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.optionContainer}>
          {settingsOptions.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.optionLeft}>
                <Image source={item.icon} style={[styles.optionIcon,{tintColor : COLORS.text}]} />
                <Text style={[styles.optionLabel,{color : '#616161'}]}>{item.label}</Text>
              </View>
              <Image source={require('../../../assets/right-arrow.png')} style={[styles.arrowIcon,{tintColor : COLORS.text}]} />
            </TouchableOpacity>
          ))}

          {/* ===== LOG OUT ===== */}
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() =>
              openPopup('Are you sure you want to logout?', () => navigation.navigate('SignIn'))
            }
          >
            <View style={styles.optionLeft}>
              <Image source={require('../../../assets/logout.png')} style={[styles.optionIcon,{tintColor : COLORS.text}]} />
              <Text style={[styles.optionLabel, { color: '#E53935' }]}>Log out</Text>
            </View>
          </TouchableOpacity>

          {/* ===== DELETE ACCOUNT ===== */}
          {/* <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() =>
              openPopup('Are you sure you want to delete your account?', () => navigation.navigate('SignIn'))
            }
          >
            <View style={styles.optionLeft}>
              <Image source={require('../../../assets/delete.png')} style={styles.optionIcon} />
              <Text style={[styles.optionLabel, { color: '#E53935' }]}>Delete Account</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* ===== CONFIRMATION POPUP ===== */}
      <Modal
        transparent
        visible={showPopup}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <Text style={styles.popupText}>{popupMessage}</Text>

            <View style={styles.popupButtonsRow}>
              {/* CANCEL */}
              <TouchableOpacity
                style={[styles.popupButton, { backgroundColor: '#ccc' }]}
                onPress={() => setShowPopup(false)}
              >
                <Text style={[styles.popupButtonText, { color: '#000' }]}>Cancel</Text>
              </TouchableOpacity>

              {/* CONFIRM */}
              <TouchableOpacity
                style={[styles.popupButton, { backgroundColor: COLORS.primary }]}
                onPress={() => {
                  setShowPopup(false);
                  popupAction && popupAction();
                }}
              >
                <Text style={styles.popupButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;

/* ────────────── STYLES ────────────── */
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
    paddingTop: height * 0.07,
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
    color: '#616161',
    fontFamily : 'Figtree-Bold',
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
    tintColor: COLORS.text,
  },
  optionLabel: {
    fontSize: width * 0.037,
    color: '#616161',
    fontWeight: '600',
    fontFamily : 'Figtree-SemiBold',
  },
  arrowIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: COLORS.text,
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
    color: '#616161',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
  popupButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  popupButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  popupButtonText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: width * 0.04,
    fontFamily : 'Figtree-Bold',
  },
});
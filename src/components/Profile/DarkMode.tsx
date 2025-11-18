import React, { useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Switch,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const DarkMode = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode, toggleDarkMode, theme } = useContext(ThemeContext);

  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Popup States
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const showPopup = useCallback((msg: string) => {
    setPopupMessage(msg);
    setPopupVisible(true);
  }, []);

  const closePopup = useCallback(() => setPopupVisible(false), []);

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    showPopup(`Switched to ${!isDarkMode ? 'Dark' : 'Light'} Mode`);
  };

  const handleResetPreferences = () => {
    setPopupMessage('Are you sure you want to reset all preferences to default?');
    setPopupVisible(true);
  };

  const confirmResetPreferences = () => {
    setNotifications(true);
    setMarketingEmails(false);

    if (isDarkMode) toggleDarkMode();

    showPopup('All preferences have been reset to default.');
  };

  const onPopupButtonPress = () => {
    if (popupMessage === 'Are you sure you want to reset all preferences to default?') {
      setPopupVisible(false);
      setTimeout(confirmResetPreferences, 200);
    } else {
      closePopup();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.background, borderBottomColor: theme.borderColor },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: '#000000' }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: '#616161' }]}>Appearance</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#616161' }]}>Theme</Text>

          <View style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.settingInfo}>
              <Image
                source={require('../../assets/light.png')}
                style={[styles.settingIcon, { tintColor: COLORS.text }]}
              />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: '#616161' }]}>Dark Mode</Text>
                <Text style={[styles.settingDescription, { color: '#616161' }]}>
                  Switch between light and dark theme
                </Text>
              </View>
            </View>

            <Switch
              value={isDarkMode}
              onValueChange={handleToggleDarkMode}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#616161' }]}>Notifications</Text>

          <View style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.settingInfo}>
              <Image
                source={require('../../assets/notification.png')}
                style={[styles.settingIcon, { tintColor: COLORS.text }]}
              />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: '#616161' }]}>
                  Push Notifications
                </Text>
                <Text style={[styles.settingDescription, { color: '#616161' }]}>
                  Receive app notifications and updates
                </Text>
              </View>
            </View>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>

        {/* Email Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#616161' }]}>Email Preferences</Text>

          <View style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.settingInfo}>
              <Image
                source={require('../../assets/email.png')}
                style={[styles.settingIcon, { tintColor: COLORS.text }]}
              />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: '#616161' }]}>
                  Marketing Emails
                </Text>
                <Text style={[styles.settingDescription, { color: '#616161' }]}>
                  Receive promotional emails and offers
                </Text>
              </View>
            </View>

            <Switch
              value={marketingEmails}
              onValueChange={setMarketingEmails}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          style={[styles.resetBtn, { backgroundColor: theme.cardBackground }]}
          onPress={handleResetPreferences}
        >
          <Text style={[styles.resetText, { color: '#FF3B30' }]}>Reset to Default</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <Text style={[styles.appInfoTitle, { color: '#616161' }]}>Vinsta App</Text>
          <Text style={[styles.appInfoVersion, { color: '#616161' }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>

      {/* Popup Modal */}
      <Modal transparent visible={popupVisible} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity style={styles.closeIconWrapper} onPress={closePopup}>
              <Image
                source={require('../../assets/close.png')}
                style={[styles.closeIcon, { tintColor: COLORS.text }]}
              />
            </TouchableOpacity>

            <Text style={[styles.popupText, { color: '#616161' }]}>{popupMessage}</Text>

            <View style={styles.popupButtonsRow}>
              {popupMessage ===
              'Are you sure you want to reset all preferences to default?' ? (
                <>
                  <TouchableOpacity
                    style={[styles.popupButton, styles.popupCancelButton]}
                    onPress={closePopup}
                  >
                    <Text style={[styles.popupButtonText, { color: '#333' }]}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.popupButton} onPress={onPopupButtonPress}>
                    <Text style={[styles.popupButtonText]}>Reset</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.popupButton} onPress={onPopupButtonPress}>
                  <Text style={styles.popupButtonText}>OK</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DarkMode;

/* ========================= STYLES ========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.05,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },

  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },

  headerTitle: {
    textAlign: 'center',
    fontSize: width * 0.045,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  scrollContent: {
    paddingBottom: 50,
    paddingHorizontal: 20,
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: width * 0.04,
    fontWeight: '600',
    marginBottom: 15,
    marginLeft: 5,
    fontFamily: 'Figtree-SemiBold',
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 2 },
    }),
  },

  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  settingIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  settingTextContainer: { flex: 1 },

  settingTitle: {
    fontSize: width * 0.038,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Figtree-SemiBold',
  },

  settingDescription: {
    fontSize: width * 0.032,
    fontFamily: 'Figtree-Regular',
    fontWeight: '400',
  },

  resetBtn: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 30,
    marginBottom: 20,
  },

  resetText: {
    fontSize: width * 0.038,
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },

  appInfoSection: {
    alignItems: 'center',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  appInfoTitle: {
    fontSize: width * 0.038,
    fontFamily: 'Figtree-Bold',
  },

  appInfoVersion: {
    fontSize: width * 0.032,
    fontFamily: 'Figtree-Regular',
    marginBottom: 8,
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  popupBox: {
    width: width * 0.8,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    elevation: 6,
  },

  popupText: {
    fontSize: width * 0.04,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Figtree-Regular',
  },

  popupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  popupButtonText: {
    color: COLORS.secondary,
    fontSize: width * 0.04,
    fontFamily: 'Figtree-Bold',
  },

  closeIconWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  closeIcon: {
    width: 18,
    height: 18,
  },

  popupButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  popupCancelButton: {
    backgroundColor: '#ccc',
  },
});
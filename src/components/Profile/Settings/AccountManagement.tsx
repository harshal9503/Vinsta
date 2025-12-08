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
  Modal,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const { width, height } = Dimensions.get('window');

const AccountManagement = () => {
  const navigation = useNavigation<any>();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const {theme} = useContext(ThemeContext);

  const managementOptions = [
    {
      id: 2,
      title: 'Clear Search History',
      description: 'Remove all your search queries',
      
      icon: require('../../../assets/clear.png'),
      action: () => console.log('Clear history'),
    },
    {
      id: 3,
      title: 'Reset App Preferences',
      description: 'Restore default app settings',
      icon: require('../../../assets/reset.png'),
      action: () => console.log('Reset preferences'),
    },
    {
      id: 4,
      title: 'Deactivate Account',
      description: 'Temporarily disable your account',
      icon: require('../../../assets/profile2.png'),
      action: () => console.log('Deactivate account'),
    },
  ];

  const handleDeleteAccount = () => {
    setShowDeletePopup(false);
    navigation.navigate('SignIn');
  };

  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor : theme.text}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.text}]}>Account Management</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle,{color : theme.text}]}>Manage Your Account</Text>
        <Text style={[styles.sectionDescription,{color : theme.text}]}>
          Control your data and account settings
        </Text>

        {managementOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.managementCard,{backgroundColor : theme.cardBackground}]}
            onPress={item.action}
          >
            <View style={styles.managementLeft}>
              <Image source={item.icon} style={[styles.managementIcon,{tintColor : theme.text}]} />
              <View style={styles.managementText}>
                <Text style={[styles.managementTitle,{color : theme.text}]}>{item.title}</Text>
                <Text style={[styles.managementDescription,{color : theme.textSecondary}]}>{item.description}</Text>
              </View>
            </View>
            <Image source={require('../../../assets/right-arrow.png')} style={[styles.arrowIcon,{tintColor : theme.text}]} />
          </TouchableOpacity>
        ))}

        {/* Delete Account Section */}
        <View style={[styles.deleteSection, { backgroundColor: theme.cardBackground, borderLeftColor: '#f44336' }]}>
          <Text style={[styles.deleteTitle, { color: '#d32f2f' }]}>Delete Account</Text>
          <Text style={[styles.deleteDescription,{color : theme.text}]}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowDeletePopup(true)}
          >
            <Image 
              source={require('../../../assets/delete.png')} 
              style={styles.deleteIcon} 
            />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Delete Confirmation Popup */}
      <Modal
        transparent
        visible={showDeletePopup}
        animationType="fade"
        onRequestClose={() => setShowDeletePopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox, { backgroundColor: theme.cardBackground }]}>
            <Image 
              source={require('../../../assets/b1.png')} 
              style={styles.warningIcon} 
            />
            <Text style={[styles.popupTitle,{color : theme.text}]}>Delete Account</Text>
            <Text style={[styles.popupText,{color : theme.text}]}>
              Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data will be lost.
            </Text>
            
            <View style={styles.popupButtonsRow}>
              <TouchableOpacity
                style={[styles.popupButton, styles.cancelButton, { backgroundColor: theme.borderColor }]}
                onPress={() => setShowDeletePopup(false)}
              >
                <Text style={[styles.cancelButtonText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.popupButton, styles.deleteConfirmButton, { backgroundColor: '#d32f2f' }]}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.07,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: width * 0.035,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    marginBottom: 25,
  },
  managementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  managementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  managementIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  managementText: {
    flex: 1,
  },
  managementTitle: {
    fontSize: width * 0.038,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    marginBottom: 4,
  },
  managementDescription: {
    fontSize: width * 0.03,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  deleteSection: {
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
  },
  deleteTitle: {
    fontSize: width * 0.04,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: 8,
  },
  deleteDescription: {
    fontSize: width * 0.033,
    marginBottom: 16,
    lineHeight: 18,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d32f2f',
    padding: 14,
    borderRadius: 8,
  },
  deleteIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#fff',
    marginRight: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: width * 0.036,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  popupBox: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  warningIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    tintColor: '#f44336',
    marginBottom: 16,
  },
  popupTitle: {
    fontSize: width * 0.045,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: 12,
    textAlign: 'center',
  },
  popupText: {
    fontSize: width * 0.035,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  popupButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  deleteConfirmButton: {
    backgroundColor: '#d32f2f',
  },
  cancelButtonText: {
    fontSize: width * 0.036,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
});

export default AccountManagement;
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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';

const { width, height } = Dimensions.get('window');

const AccountManagement = () => {
  const navigation = useNavigation<any>();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const managementOptions = [
    // {
    //   id: 1,
    //   title: 'Download Your Data',
    //   description: 'Get a copy of your personal data',
    //   icon: require('../../../assets/b1.png'),
    //   action: () => console.log('Download data'),
    // },
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
    // Implement actual delete logic here
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Management</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Manage Your Account</Text>
        <Text style={styles.sectionDescription}>
          Control your data and account settings
        </Text>

        {managementOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.managementCard}
            onPress={item.action}
          >
            <View style={styles.managementLeft}>
              <Image source={item.icon} style={styles.managementIcon} />
              <View style={styles.managementText}>
                <Text style={styles.managementTitle}>{item.title}</Text>
                <Text style={styles.managementDescription}>{item.description}</Text>
              </View>
            </View>
            <Image source={require('../../../assets/right-arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        ))}

        {/* Delete Account Section */}
        <View style={styles.deleteSection}>
          <Text style={styles.deleteTitle}>Delete Account</Text>
          <Text style={styles.deleteDescription}>
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
          <View style={styles.popupBox}>
            <Image 
              source={require('../../../assets/b1.png')} 
              style={styles.warningIcon} 
            />
            <Text style={styles.popupTitle}>Delete Account</Text>
            <Text style={styles.popupText}>
              Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data will be lost.
            </Text>
            
            <View style={styles.popupButtonsRow}>
              <TouchableOpacity
                style={[styles.popupButton, styles.cancelButton]}
                onPress={() => setShowDeletePopup(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.popupButton, styles.deleteConfirmButton]}
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
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 25,
  },
  managementCard: {
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
    tintColor: COLORS.primary,
  },
  managementText: {
    flex: 1,
  },
  managementTitle: {
    fontSize: width * 0.038,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  managementDescription: {
    fontSize: width * 0.03,
    color: '#666',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  deleteSection: {
    backgroundColor: '#ffebee',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  deleteTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
    color: '#d32f2f',
    marginBottom: 8,
  },
  deleteDescription: {
    fontSize: width * 0.033,
    color: '#666',
    marginBottom: 16,
    lineHeight: 18,
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
    fontWeight: '600',
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
    backgroundColor: COLORS.secondary,
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
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  popupText: {
    fontSize: width * 0.035,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
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
    color: '#000',
    fontSize: width * 0.036,
    fontWeight: '600',
  },
});

export default AccountManagement;
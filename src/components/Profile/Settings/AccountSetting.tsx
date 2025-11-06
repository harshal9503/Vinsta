import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';

const { width, height } = Dimensions.get('window');

const AccountSetting = () => {
  const navigation = useNavigation<any>();

  const accountOptions = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Update your name, email, and phone number',
      icon: require('../../../assets/user1.png'),
      route: 'ProfileEdit'
    },
    // {
    //   id: 2,
    //   title: 'Change Password',
    //   description: 'Update your password regularly',
    //   icon: require('../../../assets/p1.png'),
    //   route: 'ChangePassword'
    // },
    {
      id: 3,
      title: 'Privacy Settings',
      description: 'Control your privacy and data sharing',
      icon: require('../../../assets/privacy.png'),
      route: 'PrivacyPolicy'
    },
    // {
    //   id: 4,
    //   title: 'Two-Factor Authentication',
    //   description: 'Add extra security to your account',
    //   icon: require('../../../assets/p1.png'),
    //   route: 'TwoFactorAuth'
    // },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Setting</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Account Management</Text>
        <Text style={styles.sectionDescription}>
          Manage your account settings and preferences
        </Text>

        {accountOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.optionCard}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.optionLeft}>
              <Image source={item.icon} style={styles.optionIcon} />
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>{item.title}</Text>
                <Text style={styles.optionDescription}>{item.description}</Text>
              </View>
            </View>
            <Image source={require('../../../assets/right-arrow.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        ))}

        {/* Delete Account Option */}
        <TouchableOpacity
          style={[styles.optionCard, { borderLeftColor: '#E53935' }]}
          onPress={() => navigation.navigate('AccountManagement')}
        >
          <View style={styles.optionLeft}>
            <Image 
              source={require('../../../assets/delete.png')} 
              style={[styles.optionIcon, { tintColor: '#E53935' }]} 
            />
            <View style={styles.optionText}>
              <Text style={[styles.optionTitle, { color: '#E53935' }]}>
                Delete Account
              </Text>
              <Text style={styles.optionDescription}>
                Permanently delete your account and all data
              </Text>
            </View>
          </View>
          <Image source={require('../../../assets/right-arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
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
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
    tintColor: COLORS.primary,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: width * 0.038,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: width * 0.03,
    color: '#666',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#999',
  },
});

export default AccountSetting;
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const { width, height } = Dimensions.get('window');

const AccountSetting = () => {
  const navigation = useNavigation<any>();
  const {theme} = useContext(ThemeContext);

  const accountOptions = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Update your name, email, and phone number',
      icon: require('../../../assets/user1.png'),
      route: 'ProfileEdit'
    },
    {
      id: 3,
      title: 'Privacy Settings',
      description: 'Control your privacy and data sharing',
      icon: require('../../../assets/privacy.png'),
      route: 'PrivacyPolicy'
    },
  ];

  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor :theme.text}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.text}]}>Account Setting</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle,{color : theme.text}]}>Account Management</Text>
        <Text style={[styles.sectionDescription,{color : theme.text}]}>
          Manage your account settings and preferences
        </Text>

        {accountOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.optionCard,{backgroundColor : theme.cardBackground,borderLeftColor : COLORS.primary}]}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.optionLeft}>
              <Image source={item.icon} style={[styles.optionIcon,{tintColor : theme.text}]} />
              <View style={styles.optionText}>
                <Text style={[styles.optionTitle,{color : theme.text}]}>{item.title}</Text>
                <Text style={[styles.optionDescription,{color : theme.textSecondary}]}>{item.description}</Text>
              </View>
            </View>
            <Image source={require('../../../assets/right-arrow.png')} style={[styles.arrowIcon,{tintColor : theme.text}]} />
          </TouchableOpacity>
        ))}

        {/* Delete Account Option */}
        <TouchableOpacity
          style={[styles.optionCard, { borderLeftColor: '#E53935',backgroundColor : theme.cardBackground }]}
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
              <Text style={[styles.optionDescription,{color : theme.textSecondary}]}>
                Permanently delete your account and all data
              </Text>
            </View>
          </View>
          <Image source={require('../../../assets/right-arrow.png')} style={[styles.arrowIcon,{tintColor : theme.text}]} />
        </TouchableOpacity>
      </ScrollView>
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
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    marginBottom: 25,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
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
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: width * 0.038,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: width * 0.03,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});

export default AccountSetting;
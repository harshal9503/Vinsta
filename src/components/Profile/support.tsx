// FILE: Support.tsx

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

// Figtree font helper
const FONTS = {
  REGULAR: 'Figtree-Regular',
  MEDIUM: 'Figtree-Medium',
  SEMIBOLD: 'Figtree-SemiBold',
  BOLD: 'Figtree-Bold',
};

const Support = () => {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);

  const openEmail = () => {
    Linking.openURL('mailto:support@vinsta.com').catch(() =>
      Alert.alert('Error', 'Could not open email client.'),
    );
  };

  const openPhone = () => {
    Linking.openURL('tel:+911234567890').catch(() =>
      Alert.alert('Error', 'Could not open phone dialer.'),
    );
  };

  const openWebsite = () => {
    Linking.openURL('https://vinsta.com/support').catch(() =>
      Alert.alert('Error', 'Could not open browser.'),
    );
  };

  const openFAQ = () => {
    const whatsappURL = `whatsapp://send?phone=+911234567890`;

    Linking.canOpenURL(whatsappURL)
      .then(supported => {
        if (supported) {
          return Linking.openURL(whatsappURL);
        } else {
          Alert.alert(
            'WhatsApp not installed',
            'Please install WhatsApp to contact support.',
          );
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Could not open WhatsApp.');
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.borderColor,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>Support</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* Scroll */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Contact Options -:
          </Text>

          {/* Email */}
          <TouchableOpacity
            style={[
              styles.contactItem,
              { backgroundColor: theme.cardBackground },
            ]}
            onPress={openEmail}
          >
            <View style={styles.contactInfo}>
              <Image
                source={require('../../assets/email.png')}
                style={[styles.contactIcon, { tintColor: theme.text }]}
              />
              <View style={styles.contactTextContainer}>
                <Text style={[styles.contactTitle, { color: theme.text }]}>
                  Email Support
                </Text>
                <Text
                  style={[
                    styles.contactDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  support@vinsta.com
                </Text>
              </View>
            </View>

            <Image
              source={require('../../assets/right-arrow.png')}
              style={[styles.chevronIcon, { tintColor: theme.text }]}
            />
          </TouchableOpacity>

          {/* Phone */}
          <TouchableOpacity
            style={[
              styles.contactItem,
              { backgroundColor: theme.cardBackground },
            ]}
            onPress={openPhone}
          >
            <View style={styles.contactInfo}>
              <Image
                source={require('../../assets/phone.png')}
                style={[styles.contactIcon, { tintColor: theme.text }]}
              />
              <View style={styles.contactTextContainer}>
                <Text style={[styles.contactTitle, { color: theme.text }]}>
                  Phone Support
                </Text>
                <Text
                  style={[
                    styles.contactDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  +91 1234567890
                </Text>
              </View>
            </View>

            <Image
              source={require('../../assets/right-arrow.png')}
              style={[styles.chevronIcon, { tintColor: theme.text }]}
            />
          </TouchableOpacity>

          {/* Website */}
          <TouchableOpacity
            style={[
              styles.contactItem,
              { backgroundColor: theme.cardBackground },
            ]}
            onPress={openWebsite}
          >
            <View style={styles.contactInfo}>
              <Image
                source={require('../../assets/website.png')}
                style={[styles.contactIcon, { tintColor: theme.text }]}
              />
              <View style={styles.contactTextContainer}>
                <Text style={[styles.contactTitle, { color: theme.text }]}>
                  Help Center
                </Text>
                <Text
                  style={[
                    styles.contactDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  vinsta.com/support
                </Text>
              </View>
            </View>

            <Image
              source={require('../../assets/right-arrow.png')}
              style={[styles.chevronIcon, { tintColor: theme.text }]}
            />
          </TouchableOpacity>

          {/* FAQ */}
          <TouchableOpacity
            style={[
              styles.contactItem,
              { backgroundColor: theme.cardBackground },
            ]}
            onPress={openFAQ}
          >
            <View style={styles.contactInfo}>
              <Image
                source={require('../../assets/faq.png')}
                style={[styles.contactIcon, { tintColor: theme.text }]}
              />
              <View style={styles.contactTextContainer}>
                <Text style={[styles.contactTitle, { color: theme.text }]}>
                  FAQ
                </Text>
                <Text
                  style={[
                    styles.contactDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Frequently asked questions
                </Text>
              </View>
            </View>

            <Image
              source={require('../../assets/right-arrow.png')}
              style={[styles.chevronIcon, { tintColor: theme.text }]}
            />
          </TouchableOpacity>
        </View>

        {/* Support Info */}
        <View
          style={[styles.supportInfo, { borderTopColor: theme.borderColor }]}
        >
          <Text style={[styles.supportHours, { color: theme.text }]}>
            📞 Support Hours: 24/7
          </Text>
          <Text style={[styles.responseTime, { color: theme.text }]}>
            ⏰ Average Response Time: 2 hours
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Support;

// ========================= STYLES =========================

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.07,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },

  backIcon: { width: 22, height: 22, resizeMode: 'contain' },

  headerTitle: {
    fontSize: width * 0.045,
    fontFamily: 'Figtree-Bold',
  },

  scrollContent: { paddingBottom: 50, paddingHorizontal: 20 },

  section: { marginTop: 25 },

  sectionTitle: {
    fontSize: width * 0.04,
    fontFamily: 'Figtree-SemiBold',
    marginBottom: 15,
    marginLeft: 5,
  },

  contactItem: {
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
        shadowOffset: { height: 1 },
      },
      android: { elevation: 2 },
    }),
  },

  contactInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },

  contactIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },

  contactTextContainer: { flex: 1 },

  contactTitle: { fontSize: width * 0.038, fontFamily: 'Figtree-SemiBold' },

  contactDescription: {
    fontSize: width * 0.032,
    fontFamily: 'Figtree-Regular',
  },

  chevronIcon: { width: 16, height: 16, resizeMode: 'contain' },

  supportInfo: {
    alignItems: 'center',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
  },

  supportHours: { fontSize: width * 0.034, fontFamily: 'Figtree-Medium' },

  responseTime: { fontSize: width * 0.034, fontFamily: 'Figtree-Medium' },
});

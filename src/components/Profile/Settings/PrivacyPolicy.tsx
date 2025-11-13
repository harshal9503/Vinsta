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
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  // Define your navigation params here if needed
  PrivacyPolicy: undefined;
  // Add other screens as needed
};

const PrivacyPolicy = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last updated: January 2024</Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information that you provide directly to us, including:
        </Text>
        <Text style={styles.listItem}>• Personal information (name, email, phone number)</Text>
        <Text style={styles.listItem}>• Delivery addresses</Text>
        <Text style={styles.listItem}>• Payment information</Text>
        <Text style={styles.listItem}>• Order history and preferences</Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect to:
        </Text>
        <Text style={styles.listItem}>• Process and deliver your orders</Text>
        <Text style={styles.listItem}>• Provide customer support</Text>
        <Text style={styles.listItem}>• Send you important updates and notifications</Text>
        <Text style={styles.listItem}>• Improve our services and user experience</Text>
        <Text style={styles.listItem}>• Prevent fraud and ensure security</Text>

        <Text style={styles.sectionTitle}>3. Information Sharing</Text>
        <Text style={styles.paragraph}>
          We do not sell your personal information. We may share your information with:
        </Text>
        <Text style={styles.listItem}>• Restaurants to fulfill your orders</Text>
        <Text style={styles.listItem}>• Delivery partners to deliver your orders</Text>
        <Text style={styles.listItem}>• Payment processors to handle transactions</Text>
        <Text style={styles.listItem}>• Legal authorities when required by law</Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement appropriate security measures to protect your personal information 
          against unauthorized access, alteration, disclosure, or destruction.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.paragraph}>
          You have the right to:
        </Text>
        <Text style={styles.listItem}>• Access your personal information</Text>
        <Text style={styles.listItem}>• Correct inaccurate data</Text>
        <Text style={styles.listItem}>• Request deletion of your data</Text>
        <Text style={styles.listItem}>• Opt-out of marketing communications</Text>
        <Text style={styles.listItem}>• Object to processing of your data</Text>

        <Text style={styles.sectionTitle}>6. Cookies and Tracking</Text>
        <Text style={styles.paragraph}>
          We use cookies and similar technologies to enhance your experience, 
          analyze usage patterns, and deliver personalized content.
        </Text>

        <Text style={styles.sectionTitle}>7. Third-Party Services</Text>
        <Text style={styles.paragraph}>
          Our app may contain links to third-party websites or services. 
          We are not responsible for the privacy practices of these third parties.
        </Text>

        <Text style={styles.sectionTitle}>8. Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Our services are not intended for children under 13. We do not knowingly 
          collect personal information from children under 13.
        </Text>

        <Text style={styles.sectionTitle}>9. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          We may update this privacy policy from time to time. We will notify you 
          of any changes by posting the new policy on this page.
        </Text>

        <Text style={styles.sectionTitle}>10. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions about this Privacy Policy, please contact us at:
        </Text>
        <Text style={styles.contactInfo}>Email: privacy@vinsta.com</Text>
        <Text style={styles.contactInfo}>Phone: +91 1234567890</Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using our app, you agree to the terms of this Privacy Policy.
          </Text>
        </View>
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
    fontFamily : 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: width * 0.032,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily : 'Figtree-MediumItalic',
    fontWeight  :'500'
  },
  sectionTitle: {
    fontSize: width * 0.038,
    fontWeight: '700',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    fontFamily : 'Figtree-Bold',
  },
  paragraph: {
    fontSize: width * 0.035,
    color: '#333',
    lineHeight: 22,
    marginBottom: 10,
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
  listItem: {
    fontSize: width * 0.035,
    color: '#333',
    lineHeight: 22,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily : 'Figtree-Regular',
    fontWeight  :'400'
  },
  contactInfo: {
    fontSize: width * 0.035,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: 5,
    fontFamily : 'Figtree-Medium',
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: width * 0.032,
    color: '#666',
    textAlign: 'center',
    fontFamily : 'Figtree-MediumItalic',
    fontWeight  :'500'
  },
});

export default PrivacyPolicy;
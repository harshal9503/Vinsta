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
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';
import { ThemeContext } from '../../../theme/ThemeContext';


const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  // Define your navigation params here if needed
  PrivacyPolicy: undefined;
  // Add other screens as needed
};

const PrivacyPolicy = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
 const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor : theme.text}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.text}]}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.lastUpdated,{color : theme.text}]}>Last updated: January 2024</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>1. Information We Collect</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          We collect information that you provide directly to us, including:
        </Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Personal information (name, email, phone number)</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Delivery addresses</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Payment information</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Order history and preferences</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>2. How We Use Your Information</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          We use the information we collect to:
        </Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Process and deliver your orders</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Provide customer support</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Send you important updates and notifications</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Improve our services and user experience</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Prevent fraud and ensure security</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>3. Information Sharing</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          We do not sell your personal information. We may share your information with:
        </Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Restaurants to fulfill your orders</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Delivery partners to deliver your orders</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Payment processors to handle transactions</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Legal authorities when required by law</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>4. Data Security</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          We implement appropriate security measures to protect your personal information 
          against unauthorized access, alteration, disclosure, or destruction.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>5. Your Rights</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          You have the right to:
        </Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Access your personal information</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Correct inaccurate data</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Request deletion of your data</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Opt-out of marketing communications</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Object to processing of your data</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>6. Cookies and Tracking</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          We use cookies and similar technologies to enhance your experience, 
          analyze usage patterns, and deliver personalized content.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>7. Third-Party Services</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          Our app may contain links to third-party websites or services. 
          We are not responsible for the privacy practices of these third parties.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>8. Children's Privacy</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          Our services are not intended for children under 13. We do not knowingly 
          collect personal information from children under 13.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>9. Changes to This Policy</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          We may update this privacy policy from time to time. We will notify you 
          of any changes by posting the new policy on this page.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>10. Contact Us</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          If you have questions about this Privacy Policy, please contact us at:
        </Text>
        <Text style={[styles.contactInfo,{color : theme.text}]}>Email: privacy@vinsta.com</Text>
        <Text style={[styles.contactInfo,{color : theme.text}]}>Phone: +91 1234567890</Text>

        <View style={styles.footer}>
          <Text style={[styles.footerText,{color : theme.text}]}>
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
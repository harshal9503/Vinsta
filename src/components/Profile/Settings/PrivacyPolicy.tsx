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
  PrivacyPolicy: undefined;
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
        <Text style={[styles.headerTitle,{color : theme.textSecondary}]}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.lastUpdated,{color : theme.textSecondary}]}>Last updated: January 2024</Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>1. Information We Collect</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          We collect information that you provide directly to us, including:
        </Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Personal information (name, email, phone number)</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Delivery addresses</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Payment information</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Order history and preferences</Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>2. How We Use Your Information</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          We use the information we collect to:
        </Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Process and deliver your orders</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Provide customer support</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Send you important updates and notifications</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Improve our services and user experience</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Prevent fraud and ensure security</Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>3. Information Sharing</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          We do not sell your personal information. We may share your information with:
        </Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Restaurants to fulfill your orders</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Delivery partners to deliver your orders</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Payment processors to handle transactions</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Legal authorities when required by law</Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>4. Data Security</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          We implement appropriate security measures to protect your personal information 
          against unauthorized access, alteration, disclosure, or destruction.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>5. Your Rights</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          You have the right to:
        </Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Access your personal information</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Correct inaccurate data</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Request deletion of your data</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Opt-out of marketing communications</Text>
        <Text style={[styles.listItem,{color : theme.textSecondary}]}>• Object to processing of your data</Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>6. Cookies and Tracking</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          We use cookies and similar technologies to enhance your experience, 
          analyze usage patterns, and deliver personalized content.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>7. Third-Party Services</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          Our app may contain links to third-party websites or services. 
          We are not responsible for the privacy practices of these third parties.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>8. Children's Privacy</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          Our services are not intended for children under 13. We do not knowingly 
          collect personal information from children under 13.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>9. Changes to This Policy</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          We may update this privacy policy from time to time. We will notify you 
          of any changes by posting the new policy on this page.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>10. Contact Us</Text>
        <Text style={[styles.paragraph,{color : theme.textSecondary}]}>
          If you have questions about this Privacy Policy, please contact us at:
        </Text>
        <Text style={[styles.contactInfo,{color : theme.textSecondary}]}>Email: privacy@vinsta.com</Text>
        <Text style={[styles.contactInfo,{color : theme.textSecondary}]}>Phone: +91 1234567890</Text>

        <View style={styles.footer}>
          <Text style={[styles.footerText,{color : theme.textSecondary}]}>
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
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#616161',
    fontFamily : 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: width * 0.032,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily : 'Figtree-MediumItalic',
    fontWeight  :'500'
  },
  sectionTitle: {
    fontSize: width * 0.038,
    fontWeight: '700',
    color: '#616161',
    marginTop: 20,
    marginBottom: 10,
    fontFamily : 'Figtree-Bold',
  },
  paragraph: {
    fontSize: width * 0.035,
    color: '#616161',
    lineHeight: 22,
    marginBottom: 10,
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
  listItem: {
    fontSize: width * 0.035,
    color: '#616161',
    lineHeight: 22,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily : 'Figtree-Regular',
    fontWeight  :'400'
  },
  contactInfo: {
    fontSize: width * 0.035,
    color: '#616161',
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
    color: '#616161',
    textAlign: 'center',
    fontFamily : 'Figtree-MediumItalic',
    fontWeight  :'500'
  },
});

export default PrivacyPolicy;
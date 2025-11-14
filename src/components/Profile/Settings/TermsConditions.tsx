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
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const TermsConditions = () => {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor : theme.text}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.text}]}>Terms & Conditions</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.lastUpdated,{color : theme.text}]}>Last updated: January 2024</Text>

        <Text style={[styles.paragraph,{color : theme.text}]}>
          Welcome to Vinsta! These Terms and Conditions govern your use of our mobile 
          application and services. By accessing or using our app, you agree to be bound 
          by these terms.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>1. Account Registration</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          You must create an account to use our services. You agree to:
        </Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Provide accurate and complete information</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Maintain the security of your password</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Accept responsibility for all activities under your account</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Be at least 18 years old to create an account</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>2. Ordering and Payments</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          When you place an order through our app:
        </Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• You agree to pay all charges for your orders</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Prices are subject to change without notice</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• We accept various payment methods as displayed in the app</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Delivery fees may apply and will be shown before checkout</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>3. Delivery</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          We strive to deliver your orders promptly, however:
        </Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Delivery times are estimates only</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• We are not responsible for delays beyond our control</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• You must provide accurate delivery address</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Someone must be available to receive the delivery</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>4. Cancellations and Refunds</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          Cancellation and refund policies:
        </Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Orders can be cancelled within 5 minutes of placement</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Refunds are processed according to our refund policy</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Quality issues must be reported within 2 hours of delivery</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>5. User Conduct</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          You agree not to:
        </Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Use the app for any illegal purpose</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Harass, abuse, or harm our staff or partners</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Attempt to gain unauthorized access to the app</Text>
        <Text style={[styles.listItem,{color : theme.text}]}>• Interfere with the proper working of the app</Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>6. Intellectual Property</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          All content, features, and functionality of our app are owned by Vinsta 
          and are protected by international copyright, trademark, and other 
          intellectual property laws.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>7. Limitation of Liability</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          To the maximum extent permitted by law, Vinsta shall not be liable for 
          any indirect, incidental, special, consequential, or punitive damages 
          resulting from your use of or inability to use the app.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>8. Termination</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          We may terminate or suspend your account immediately, without prior notice, 
          for conduct that we believe violates these Terms or is harmful to other users, 
          us, or third parties, or for any other reason.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>9. Changes to Terms</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          We reserve the right to modify these terms at any time. We will notify you 
          of any changes by posting the new Terms and Conditions on this page.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>10. Governing Law</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          These Terms shall be governed and construed in accordance with the laws of 
          India, without regard to its conflict of law provisions.
        </Text>

        <Text style={[styles.sectionTitle,{color : theme.text}]}>11. Contact Information</Text>
        <Text style={[styles.paragraph,{color : theme.text}]}>
          For any questions about these Terms and Conditions, please contact us:
        </Text>
        <Text style={styles.contactInfo}>Vinsta Support</Text>
        <Text style={styles.contactInfo}>Email: legal@vinsta.com</Text>
        <Text style={styles.contactInfo}>Phone: +91 1234567890</Text>

        <View style={styles.footer}>
          <Text style={[styles.footerText,{color : theme.text}]}>
            By using our app, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms and Conditions.
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
    marginBottom: 20,
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
    fontFamily : 'Figtree-Regular',
    fontWeight  :'400'
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

export default TermsConditions;
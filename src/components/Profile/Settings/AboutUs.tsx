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
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');
const AboutUs = () => {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);

  const contactInfo = [
    {
      id: 1,
      title: 'Website',
      value: 'www.vinsta.com',
      icon: require('../../../assets/website.png'),
      action: () => Linking.openURL('https://www.vinsta.com'),
    },
    {
      id: 2,
      title: 'Email',
      value: 'support@vinsta.com',
      icon: require('../../../assets/email.png'),
      action: () => Linking.openURL('mailto:support@vinsta.com?subject=App Support&body=Hello, I need help with...'),
    },
    {
      id: 3,
      title: 'Phone',
      value: '+91 1234567890',
      icon: require('../../../assets/phone.png'),
      action: () => Linking.openURL('tel:+911234567890'),
    },
    {
      id: 4,
      title: 'Address',
      value: '123 App Street, Tech City',
      icon: require('../../../assets/location.png'),
      action: () => {
        Linking.openURL('https://maps.google.com/?q=123+App+Street+Tech+City');
      },
    },
  ];

  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor:'#000000'}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color:'#616161'}]}>About Us</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* App Logo and Basic Info */}
        <View style={[styles.appHeader]}>
          <Image 
            source={require('../../../assets/Splash.png')} 
            style={styles.appLogo} 
          />
          <Text style={[styles.appName,{color : '#616161'}]}>Vinsta</Text>
          <Text style={[styles.appVersion,{color : '#616161'}]}>Version 1.0.0</Text>
          <Text style={[styles.appDescription,{color : '#616161'}]}>
            Delivering excellence one order at a time
          </Text>
        </View>

        {/* App Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle,{color : '#616161'}]}>Our Story</Text>
          <Text style={[styles.sectionText,{color : '#616161'}]}>
            Founded in 2024, our mission is to provide the best food delivery experience 
            to our customers. We connect you with your favorite restaurants and deliver 
            delicious meals right to your doorstep.
          </Text>
        </View>

        {/* Features */}
        <View style={[styles.section,{backgroundColor : theme.background}]}>
          <Text style={[styles.sectionTitle,{color : '#616161'}]}>What We Offer</Text>
          <View style={[styles.featuresList,{backgroundColor : theme.background}]}>
            <View style={styles.featureItem}>
              <Image source={require('../../../assets/tick.png')} style={[styles.featureIcon,{tintColor:COLORS.text}]} />
              <Text style={[styles.featureText,{color : '#616161'}]}>Fast Delivery</Text>
            </View>
            <View style={styles.featureItem}>
              <Image source={require('../../../assets/tick.png')} style={[styles.featureIcon,{tintColor:COLORS.text}]} />
              <Text style={[styles.featureText,{color : '#616161'}]}>Wide Restaurant Selection</Text>
            </View>
            <View style={styles.featureItem}>
              <Image source={require('../../../assets/tick.png')} style={[styles.featureIcon,{tintColor:COLORS.text}]} />
              <Text style={[styles.featureText,{color : '#616161'}]}>Secure Payments</Text>
            </View>
            <View style={styles.featureItem}>
              <Image source={require('../../../assets/tick.png')} style={[styles.featureIcon,{tintColor:COLORS.text}]} />
              <Text style={[styles.featureText,{color : '#616161'}]}>24/7 Customer Support</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle,{color : '#616161'}]}>Contact Us</Text>
          {contactInfo.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.contactItem,{backgroundColor : theme.background}]}
              onPress={item.action}
            >
              <View style={styles.contactLeft}>
                <Image source={item.icon} style={[styles.contactIcon,{tintColor:COLORS.text}]} />
                <View>
                  <Text style={[styles.contactTitle,{color : '#616161'}]}>{item.title}</Text>
                  <Text style={[styles.contactValue,{color : '#616161'}]}>{item.value}</Text>
                </View>
              </View>
              <Image source={require('../../../assets/right-arrow.png')} style={[styles.arrowIcon,{tintColor:COLORS.text}]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Legal */}
        <View style={[styles.section]}>
          <Text style={[styles.sectionTitle,{color : '#616161'}]}>Legal</Text>
          <TouchableOpacity 
            style={[styles.legalItem,{backgroundColor : theme.background}]}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <Text style={[styles.legalText,{color : '#616161'}]}>Privacy Policy</Text>
            <Image source={require('../../../assets/right-arrow.png')} style={[styles.arrowIcon,{tintColor:COLORS.text}]} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.legalItem,{backgroundColor : theme.background}]}
            onPress={() => navigation.navigate('TermsConditions')}
          >
            <Text style={[styles.legalText,{color : '#616161'}]}>Terms & Conditions</Text>
            <Image source={require('../../../assets/right-arrow.png')} style={[styles.arrowIcon,{tintColor:COLORS.text}]} />
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={[styles.copyrightText,{color : '#616161'}]}>
            © 2024 Vinsta. All rights reserved.
          </Text>
        </View>
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
    fontFamily : 'Figtree-Bold'
  },
  content: {
    padding: 20,
  },
  appHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appLogo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 16,
  },
  appName: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#616161',
    marginBottom: 4,
    fontFamily : 'Figtree-Bold'
  },
  appVersion: {
    fontSize: width * 0.035,
    color: '#616161',
    marginBottom: 8,
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
  appDescription: {
    fontSize: width * 0.036,
    color: COLORS.primary,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily : 'Figtree-Medium',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
    color: '#616161',
    marginBottom: 12,
    fontFamily : 'Figtree-Bold',
  },
  sectionText: {
    fontSize: width * 0.035,
    color: '#616161',
    lineHeight: 20,
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
  featuresList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 12,
    tintColor: COLORS.text,
  },
  featureText: {
    fontSize: width * 0.035,
    color: '#616161',
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 12,
    tintColor: COLORS.text,
  },
  contactTitle: {
    fontSize: width * 0.035,
    color: '#616161',
    marginBottom: 2,
    fontFamily : 'Figtree-Bold',
    fontWeight  :'700'
  },
  contactValue: {
    fontSize: width * 0.032,
    color: '#616161',
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
  arrowIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: COLORS.text,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legalText: {
    fontSize: width * 0.035,
    color: '#616161',
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
  copyrightSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: width * 0.03,
    color: '#616161',
    textAlign: 'center',
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
});

export default AboutUs;
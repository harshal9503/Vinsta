// File: screens/SignInScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }: any) => {
  const [mobile, setMobile] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const validateMobile = (number: string) => /^[6-9]\d{9}$/.test(number);

  const handleSendOtp = () => {
    if (!validateMobile(mobile)) {
      setPopupMessage('Please enter a valid 10-digit Indian mobile number.');
      setShowPopup(true);
      return;
    }
    navigation.navigate('OtpVerification', { mobile });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.secondary }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={require('../assets/Splash.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>
            “Welcome to <Text style={{ color: COLORS.primary }}>Vinsta</Text> freshly brewed food
            delivered at anywhere anytime home instantly”
          </Text>

          {/* Label */}
          <Text style={styles.label}>Please Enter Your Mobile Number</Text>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <View style={styles.separator} />
            <TextInput
              style={styles.input}
              placeholder="Enter your 10 digit mobile number"
              placeholderTextColor="#9E9E9E"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
              maxLength={10}
            />
          </View>

          {/* Send OTP Button */}
          <TouchableOpacity
            style={[styles.button, { opacity: mobile.length === 10 ? 1 : 0.6 }]}
            onPress={handleSendOtp}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/google.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>Login with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/apple.png')}
                style={styles.appleIcon}
                resizeMode="contain"
              />
              <Text style={styles.appleText}>Login with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Popup Modal */}
          <Modal
            transparent
            visible={showPopup}
            animationType="fade"
            onRequestClose={() => setShowPopup(false)}
          >
            <View style={styles.popupOverlay}>
              <View style={styles.popupBox}>
                <Text style={styles.popupText}>{popupMessage}</Text>
                <TouchableOpacity
                  style={styles.popupButton}
                  onPress={() => setShowPopup(false)}
                >
                  <Text style={styles.popupButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    paddingHorizontal: width * 0.08,
    paddingBottom: height * 0.05,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    marginTop: height * 0.16, // Added top margin for spacing from top
    marginBottom: height * 0.045,
  },
  welcomeText: {
    fontSize: width * 0.04,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: height * 0.04,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    fontSize: width * 0.04,
    color: COLORS.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: height * 0.03,
    backgroundColor: COLORS.secondary,
  },
  countryCode: {
    fontSize: width * 0.045,
    color: COLORS.text,
    fontWeight: '600',
  },
  separator: {
    width: 1,
    height: '60%',
    backgroundColor: COLORS.primary,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: width * 0.04,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: height * 0.018,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: COLORS.secondary,
    fontSize: width * 0.045,
    fontWeight: '700',
  },

  /** SOCIAL SECTION **/
  socialContainer: {
    marginTop: height * 0.06,
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // marginVertical: height * 0.011,
  },
  socialIcon: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    marginRight: 0,
  },
    appleIcon: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    marginLeft: 0,
  },
  appleText: {
    fontSize: width * 0.045,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 20,
    marginRight: 10,
  },
  socialText: {
    fontSize: width * 0.045,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 20,
  },

  /** POPUP **/
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupBox: {
    width: width * 0.8,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  popupText: {
    fontSize: width * 0.04,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  popupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  popupButtonText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: width * 0.04,
  },
});

export default SignInScreen;

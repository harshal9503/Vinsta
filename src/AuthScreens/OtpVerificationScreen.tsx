// File: screens/OtpVerificationScreen.tsx

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { COLORS } from '../theme/colors';

const { height: screenHeight } = Dimensions.get('window');

const OtpVerificationScreen = ({ navigation, route }: any) => {
  const { mobile } = route.params || {};
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [timer, setTimer] = useState(60); // Start with 1 minute (60s)
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const inputs = useRef<TextInput[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  // Focus first input on load
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardVisible(true);
        // Scroll to make inputs visible when keyboard appears
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: 100, animated: true });
        }, 100);
      }
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    // Move forward when typing
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Move backward when deleting
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    setOtp(newOtp);
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setLoadingResend(true);
    setTimeout(() => {
      setLoadingResend(false);
      setOtp(['', '', '', '', '', '']);
      setTimer(60);
      inputs.current[0]?.focus();
    }, 2000);
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length < 6) return;

    setLoadingVerify(true);
    setTimeout(() => {
      setLoadingVerify(false);
      navigation.navigate('Welcome', { mobile });
    }, 2000);
  };

  // Format timer mm:ss
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContainer,
            keyboardVisible && styles.scrollContainerKeyboardVisible
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <Image
            source={require('../assets/Splash.png')}
            style={[
              styles.logo,
              keyboardVisible && styles.logoKeyboardVisible
            ]}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>O.T.P. Verification</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Enter the code from SMS we sent to {'\n'}
            <Text style={styles.mobileText}>+91 {mobile}</Text>
          </Text>

          {/* Timer */}
          <Text style={styles.timerText}>{formatTime()}</Text>

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref!)}
                style={[
                  styles.otpInput,
                  digit !== '' && { borderColor: COLORS.primary },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectionColor={COLORS.primary}
                textAlign="center"
                onFocus={() => {
                  if (keyboardVisible) {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({ y: 120, animated: true });
                    }, 100);
                  }
                }}
              />
            ))}
          </View>

          {/* Verify Button */}
          <View style={[
            styles.buttonContainer,
            keyboardVisible && styles.buttonContainerKeyboardVisible
          ]}>
            <TouchableOpacity
              style={[
                styles.button,
                { opacity: otp.join('').length === 6 ? 1 : 0.6 },
              ]}
              onPress={handleVerify}
              disabled={loadingVerify || otp.join('').length !== 6}
              activeOpacity={0.8}
            >
              {loadingVerify ? (
                <ActivityIndicator color={COLORS.secondary} size="small" />
              ) : (
                <Text style={styles.buttonText}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Resend OTP */}
          <View style={[
            styles.resendContainer,
            keyboardVisible && styles.resendContainerKeyboardVisible
          ]}>
            <Text style={styles.resendText}>Didn't receive the OTP? </Text>
            {timer > 0 ? (
              <Text style={[styles.resendButton, { opacity: 0.5 }]}>Resend</Text>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={loadingResend}>
                {loadingResend ? (
                  <ActivityIndicator color={COLORS.primary} size="small" />
                ) : (
                  <Text style={styles.resendButton}>Resend</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    minHeight: screenHeight,
  },
  scrollContainerKeyboardVisible: {
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 40,
  },
  logoKeyboardVisible: {
    width: 70,
    height: 70,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  mobileText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  timerText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 12,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginVertical: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 22,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainerKeyboardVisible: {
    marginTop: 30,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '85%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: '700',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  resendContainerKeyboardVisible: {
    marginTop: 30,
    marginBottom: 30,
  },
  resendText: {
    color: COLORS.text,
    fontSize: 14,
  },
  resendButton: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default OtpVerificationScreen;
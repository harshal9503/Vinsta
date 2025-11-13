// File: screens/WelcomeScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
  Image,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');
const AVATAR_SIZE = width * 0.2;

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mobile: mobileFromOtp } = route.params || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [refCode, setRefCode] = useState('');
  const [profileImage, setProfileImage] = useState<any>(null);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);

  const defaultUserImage = require('../assets/user.png');
  const closeIcon = require('../assets/close.png');

  useEffect(() => {
    const loadData = async () => {
      if (mobileFromOtp) {
        setMobile(mobileFromOtp);
      } else {
        const savedPhone = await AsyncStorage.getItem('verifiedPhone');
        if (savedPhone) setMobile(savedPhone);
      }
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) setProfileImage(JSON.parse(savedImage));
    };
    loadData();
  }, [mobileFromOtp]);

  const showPopup = useCallback((msg: string) => {
    setPopupMessage(msg);
    setPopupVisible(true);
  }, []);

  const closePopup = useCallback(() => setPopupVisible(false), []);

  const openPicker = () => setPickerVisible(true);
  const closePicker = () => setPickerVisible(false);

  const onPickResult = async (res: any) => {
    if (!res || res.didCancel) return;
    const asset = res.assets && res.assets[0];
    if (!asset) return;

    const next = {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      fileName: asset.fileName || 'profile.jpg',
    };

    setProfileImage(next);
    await AsyncStorage.setItem('profileImage', JSON.stringify(next));
  };

  const handleTakePhoto = async () => {
    closePicker();
    const res = await launchCamera({ mediaType: 'photo', quality: 0.7 });
    await onPickResult(res);
  };

  const handleChooseFromGallery = async () => {
    closePicker();
    const res = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
    await onPickResult(res);
  };

  const removeProfileImage = async () => {
    setProfileImage(null);
    await AsyncStorage.removeItem('profileImage');
    closePicker();
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    if (!name.trim()) return showPopup('Please enter your name');
    if (!mobile.trim()) return showPopup('Please enter your mobile number');
    if (email && !validateEmail(email))
      return showPopup('Invalid email format');
    if (!accepted) return showPopup('Please accept the terms & conditions');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showPopup('Profile updated successfully!');
      setTimeout(() => {
        setPopupVisible(false);
        navigation.navigate('Home');
      }, 1000);
    }, 1500);
  };

  const handleTermsPress = () => {
    navigation.navigate('TermsConditions');
  };

  const checkBoxProps =
    Platform.OS === 'ios'
      ? {
          onCheckColor: COLORS.secondary,
          onFillColor: COLORS.primary,
          onTintColor: COLORS.primary,
          tintColor: COLORS.primary,
          boxType: 'square',
          lineWidth: 1.5,
          animationDuration: 0.1,
          style: { width: 20, height: 20 },
        }
      : {
          tintColors: { true: COLORS.primary, false: COLORS.primary },
          style: { width: 20, height: 20 },
        };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
        >
          <View style={styles.titleSection}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>
              Fill the details & complete your profile
            </Text>
          </View>

          <View style={styles.profileSection}>
            <Text style={styles.label}>
              Profile photo <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.avatarRow}>
              <TouchableOpacity
                style={styles.avatarWrapper}
                activeOpacity={0.8}
                onPress={openPicker}
              >
                <Image
                  source={
                    profileImage?.uri
                      ? { uri: profileImage.uri }
                      : defaultUserImage
                  }
                  style={styles.avatar}
                />
                <View style={styles.cameraBadge}>
                  <Text style={styles.cameraBadgeText}>📷</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.avatarTextContainer}>
                <Text style={styles.avatarHelpTitle}>
                  Add a face to your profile
                </Text>
                <Text style={styles.avatarHelpText}>
                  Tap to take a photo or upload from gallery. JPG / PNG up to ~5
                  MB.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>
              Enter Your Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your name here"
              placeholderTextColor="#A0A0A0"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>
              Enter Your Email <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your email here"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>
              Enter Your Mobile No. <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter your mobile number"
              placeholderTextColor="#A0A0A0"
              value={mobile}
              editable={false}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Reference Code (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Reference code"
              placeholderTextColor="#A0A0A0"
              value={refCode}
              onChangeText={setRefCode}
            />
          </View>

          <View style={styles.termsRow}>
            <CheckBox
              value={accepted}
              onValueChange={setAccepted}
              {...checkBoxProps}
            />
            <Text style={styles.termsText}>
              I accept{' '}
              <Text style={styles.link} onPress={handleTermsPress}>
                terms & conditions.
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.secondary} size="small" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        transparent
        visible={popupVisible}
        animationType="fade"
        onRequestClose={closePopup}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <TouchableOpacity
              style={styles.closeIconWrapper}
              onPress={closePopup}
            >
              <Image
                source={closeIcon}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.popupText}>{popupMessage}</Text>
            <TouchableOpacity style={styles.popupButton} onPress={closePopup}>
              <Text style={styles.popupButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={pickerVisible} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <TouchableOpacity
              style={styles.closeIconWrapper}
              onPress={closePicker}
            >
              <Image
                source={closeIcon}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.popupTitle}>Change your Profile pic</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={handleTakePhoto}
            >
              <Text style={styles.pickerButtonText}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={handleChooseFromGallery}
            >
              <Text style={styles.pickerButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            {profileImage && (
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={removeProfileImage}
              >
                <Text style={[styles.pickerButtonText, { color: '#FF3B30' }]}>
                  Remove Profile Photo
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 25,
  },
  title: {
    fontFamily: 'Figtree-Bold',
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Figtree-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: '#777',
  },
  profileSection: {
    marginBottom: 25,
  },
  label: {
    fontFamily: 'Figtree-Bold',
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  required: {
    color: 'red',
  },
  inputSection: {
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: 'Figtree-Regular',
    fontSize: 14,
    color: COLORS.textDark,
    backgroundColor: COLORS.secondary,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  cameraBadgeText: {
    fontSize: 12,
    color: '#fff',
  },
  avatarTextContainer: {
    flex: 1,
  },
  avatarHelpTitle: {
    fontFamily: 'Figtree-Semibold',
    fontSize: 13,
    color: COLORS.textDark,
  },
  avatarHelpText: {
    fontFamily: 'Figtree-Regular',
    fontSize: 12,
    color: '#777',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  termsText: {
    fontFamily: 'Figtree-Regular',
    fontSize: 13,
    color: COLORS.textDark,
    marginLeft: 8,
    flex: 1,
  },
  link: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
    fontFamily: 'Figtree-Semibold',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontFamily: 'Figtree-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  bottomSpacer: {
    height: 40,
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  popupBox: {
    width: '80%',
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  popupText: {
    fontFamily: 'Figtree-Regular',
    fontSize: 14,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 15,
  },
  popupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  popupButtonText: {
    fontFamily: 'Figtree-Semibold',
    fontSize: 14,
    color: COLORS.secondary,
  },
  closeIconWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.textDark,
  },
  popupTitle: {
    fontFamily: 'Figtree-Semibold',
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  pickerButton: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerButtonText: {
    fontFamily: 'Figtree-Regular',
    fontSize: 14,
    color: COLORS.textDark,
  },
});

export default WelcomeScreen;

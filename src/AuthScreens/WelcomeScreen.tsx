// File: screens/WelcomeScreen.tsx

import React, {useState, useEffect, useCallback} from 'react';
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
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {COLORS} from '../theme/colors';

const {width, height} = Dimensions.get('window');
const AVATAR_SIZE = 80;

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {mobile: mobileFromOtp} = route.params || {};

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
  const closeIcon = require('../assets/close.png'); // close.png icon

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
    const res = await launchCamera({mediaType: 'photo', quality: 0.7});
    await onPickResult(res);
  };

  const handleChooseFromGallery = async () => {
    closePicker();
    const res = await launchImageLibrary({mediaType: 'photo', quality: 0.7});
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
    if (email && !validateEmail(email)) return showPopup('Invalid email format');
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

  // Platform-specific CheckBox color config and size adjustment
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
          style: {width: 20, height: 20},
        }
      : {
          tintColors: {true: COLORS.primary, false: COLORS.primary},
          style: {width: 20, height: 20},
        };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {/* Title */}
      <View style={{marginTop: 20}} />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Fill the details & complete your profile</Text>

      {/* Name */}
      <Text style={styles.label}>
        Enter Your Name <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Please enter your name here"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      {/* Email */}
      <Text style={styles.label}>
        Enter Your Email <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Please enter your email here"
        keyboardType="email-address"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* Mobile */}
      <Text style={styles.label}>
        Enter Your Mobile No. <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Please enter your mobile number"
        keyboardType="number-pad"
        value={mobile}
        editable={false}
      />

      {/* Profile Photo */}
      <Text style={styles.label}>
        Profile photo <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.avatarRow}>
        <TouchableOpacity
          style={styles.avatarWrapper}
          activeOpacity={0.8}
          onPress={openPicker}>
          <Image
            source={profileImage?.uri ? {uri: profileImage.uri} : defaultUserImage}
            style={styles.avatar}
          />
          <View style={styles.cameraBadge}>
            <Text style={styles.cameraBadgeText}>📷</Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={styles.avatarHelpTitle}>Add a face to your profile</Text>
          <Text style={styles.avatarHelpText}>
            Tap to take a photo or upload from gallery. JPG \ PNG up to ~5 MB.
          </Text>
        </View>
      </View>

      {/* Reference Code */}
      <Text style={styles.label}>Reference Code (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Reference code"
        placeholderTextColor="#999"
        value={refCode}
        onChangeText={setRefCode}
      />

      {/* Terms */}
      <View style={styles.termsRow}>
        <CheckBox
          value={accepted}
          onValueChange={setAccepted}
          {...checkBoxProps}
        />
        <Text style={styles.termsTextWithSpace}>
          I accept{' '}
          <Text style={styles.link} onPress={handleTermsPress}>
            terms & conditions.
          </Text>
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, {opacity: loading ? 0.7 : 1}]}
        onPress={handleSubmit}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={COLORS.secondary} size="small" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>

      {/* Popup Modal (same as SignInScreen) */}
      <Modal
        transparent
        visible={popupVisible}
        animationType="fade"
        onRequestClose={closePopup}>
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <TouchableOpacity style={styles.closeIconWrapper} onPress={closePopup}>
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

      {/* Image Picker Modal */}
      <Modal visible={pickerVisible} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <TouchableOpacity style={styles.closeIconWrapper} onPress={closePicker}>
              <Image
                source={closeIcon}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.popupTitle}>Change your Profile pic</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={handleTakePhoto}>
              <Text style={styles.pickerButtonText}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickerButton} onPress={handleChooseFromGallery}>
              <Text style={styles.pickerButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            {profileImage && (
              <TouchableOpacity style={styles.pickerButton} onPress={removeProfileImage}>
                <Text style={[styles.pickerButtonText, {color: '#FF3B30'}]}>
                  Remove Profile Photo
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// ========================= STYLES =========================

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 8000,
    backgroundColor: COLORS.secondary,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 6,
    fontWeight: '500',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.secondary,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: AVATAR_SIZE / 2,
  },
  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 4,
  },
  cameraBadgeText: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 6,
    marginRight: 2,
  },
  avatarHelpTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  avatarHelpText: {
    fontSize: 12,
    color: '#555',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  termsTextWithSpace: {
    fontSize: 13,
    color: COLORS.text,
    marginLeft: 8, // extra spacing after checkbox
  },
  link: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: '700',
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
    position: 'relative',
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 4},
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
  closeIconWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
  },
  closeIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.text,
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  pickerButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 14,
    color: COLORS.text,
  },
});

export default WelcomeScreen;

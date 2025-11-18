import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const ProfileEdit = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('Harshal');
  const [phone, setPhone] = useState('+910202388848');
  const [email, setEmail] = useState('h@gmail.com');
  const [address, setAddress] = useState('N09, Banglai Square, Indore.');
  const [editableField, setEditableField] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [pickerVisible, setPickerVisible] = useState(false);

  const defaultUserImage = require('../../assets/user.png');
  const closeIcon = require('../../assets/close1.png');

  const clearField = (field: string) => {
    if (field === 'name') setName('');
    else if (field === 'phone') setPhone('');
    else if (field === 'email') setEmail('');
    else if (field === 'address') setAddress('');
    setEditableField(field);
  };

  const handleSave = () => {
    Alert.alert('Profile Updated', 'Your details have been saved successfully!');
    setEditableField(null);
  };

  const setFieldEditable = (field: string) => {
    setEditableField(field);
  };

  // Image Picker Handlers
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={[styles.backIcon, {tintColor: '#000000'}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: '#616161'}]}>My Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Avatar */}
        <View style={styles.profileSection}>
          <TouchableOpacity activeOpacity={0.8} onPress={openPicker} style={styles.profileWrapper}>
            <Image
              source={profileImage?.uri ? { uri: profileImage.uri } : defaultUserImage}
              style={styles.profileImage}
            />
            <View style={styles.cameraBadge}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          {/* Name */}
          <Text style={[styles.label, {color: '#616161'}]}>Name</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[styles.input, {color: '#616161'}]}
              value={name}
              onChangeText={setName}
              editable={editableField === 'name'}
              placeholder="Enter your name"
              placeholderTextColor="#999"
              onPressIn={() => setFieldEditable('name')}
            />
            {editableField === 'name' ? (
              <TouchableOpacity onPress={() => clearField('name')}>
                <Image source={closeIcon} style={[styles.closeIcon, {tintColor: COLORS.text}]} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setFieldEditable('name')}>
                <Image source={closeIcon} style={[styles.closeIcon, { opacity: 0.3, tintColor: COLORS.text }]} />
              </TouchableOpacity>
            )}
          </View>

          {/* Phone Number */}
          <Text style={[styles.label, {color: '#616161'}]}>Phone Number</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[styles.input, {color: '#616161'}]}
              value={phone}
              onChangeText={setPhone}
              editable={editableField === 'phone'}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              placeholderTextColor="#999"
              onPressIn={() => setFieldEditable('phone')}
            />
            {editableField === 'phone' ? (
              <TouchableOpacity onPress={() => clearField('phone')}>
                <Image source={closeIcon} style={[styles.closeIcon, {tintColor: COLORS.text}]} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setFieldEditable('phone')}>
                <Image source={closeIcon} style={[styles.closeIcon, { opacity: 0.3, tintColor: COLORS.text }]} />
              </TouchableOpacity>
            )}
          </View>

          {/* Email */}
          <Text style={[styles.label, {color: '#616161'}]}>Gmail</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[styles.input, {color: '#616161'}]}
              value={email}
              onChangeText={setEmail}
              editable={editableField === 'email'}
              keyboardType="email-address"
              placeholder="Enter email"
              placeholderTextColor="#999"
              onPressIn={() => setFieldEditable('email')}
            />
            {editableField === 'email' ? (
              <TouchableOpacity onPress={() => clearField('email')}>
                <Image source={closeIcon} style={[styles.closeIcon, {tintColor: COLORS.text}]} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setFieldEditable('email')}>
                <Image source={closeIcon} style={[styles.closeIcon, { opacity: 0.3, tintColor: COLORS.text }]} />
              </TouchableOpacity>
            )}
          </View>

          {/* Address */}
          <Text style={[styles.label, {color: '#616161'}]}>Delivery Address</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[styles.input, {color: '#616161'}]}
              value={address}
              onChangeText={setAddress}
              editable={editableField === 'address'}
              placeholder="Enter address"
              placeholderTextColor="#999"
              multiline={true}
              onPressIn={() => setFieldEditable('address')}
            />
            {editableField === 'address' ? (
              <TouchableOpacity onPress={() => clearField('address')}>
                <Image source={closeIcon} style={[styles.closeIcon, {tintColor: COLORS.text}]} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setFieldEditable('address')}>
                <Image source={closeIcon} style={[styles.closeIcon, { opacity: 0.3, tintColor: COLORS.text }]} />
              </TouchableOpacity>
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Image Picker Modal */}
      <Modal visible={pickerVisible} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <TouchableOpacity style={styles.closeIconWrapper} onPress={closePicker}>
              <Image source={closeIcon} style={[styles.closeIcon, {tintColor: COLORS.text}]} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={[styles.popupTitle, {color: '#616161'}]}>Change your Profile pic</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={handleTakePhoto}>
              <Text style={[styles.pickerButtonText, {color: '#616161'}]}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickerButton} onPress={handleChooseFromGallery}>
              <Text style={[styles.pickerButtonText, {color: '#616161'}]}>Choose from Gallery</Text>
            </TouchableOpacity>
            {profileImage && (
              <TouchableOpacity style={styles.pickerButton} onPress={removeProfileImage}>
                <Text style={[styles.pickerButtonText, { color: '#FF3B30' }]}>Remove Profile Photo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileEdit;

// ========================= STYLES =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  /** HEADER **/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.05,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: width * 0.045,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  /** SCROLL CONTENT **/
  scrollContent: {
    paddingBottom: 50,
  },

  /** PROFILE IMAGE **/
  profileSection: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  profileWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 4 },
    }),
  },
  cameraIcon: {
    fontSize: 16,
    fontFamily: 'Figtree-Regular',
  },

  /** FORM **/
  formContainer: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  label: {
    fontSize: width * 0.038,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
    fontFamily: 'Figtree-SemiBold',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    marginBottom: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 2 },
    }),
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    padding: 0,
    margin: 0,
    fontFamily: 'Figtree-Regular',
  },
  closeIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 8,
  },

  /** SAVE BUTTON **/
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 30,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 3 },
    }),
  },
  saveText: {
    color: COLORS.secondary,
    fontSize: width * 0.042,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  /** POPUP **/
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  popupBox: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 6 },
    }),
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Figtree-SemiBold',
  },
  pickerButton: {
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },
  closeIconWrapper: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 4,
    zIndex: 1,
  },
});
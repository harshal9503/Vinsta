import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';
import font from '../../assets/fonts';
import { ThemeContext } from '../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

interface Address {
  id: number;
  name: string;
  label: string;
  address: string;
  phone: string;
  landmark?: string;
  addressType: string;
}

const Address = () => {
  const navigation = useNavigation<any>();

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: 'Harshal Sharma',
      label: 'Home',
      address:
        '320 Koregaon park lane to, 4 opposite to B.M.W. showroom, Indore M.P.',
      phone: '+91 98765 43210',
      landmark: 'Near BMW Showroom',
      addressType: 'Home',
    },
    {
      id: 2,
      name: 'Vinsta Aplication',
      label: 'Office',
      address: '789 Corporate Avenue, Scheme 54, Vijay Nagar, Indore M.P.',
      phone: '+91 98765 43210',
      landmark: 'Behind City Mall',
      addressType: 'Office',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState('Home');

  const closeIcon = require('../../assets/close.png');

  const handleDeletePress = (id: number) => {
    setAddressToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      setAddresses(addresses.filter(addr => addr.id !== addressToDelete));
      setIsDeleteModalVisible(false);
      setAddressToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setAddressToDelete(null);
  };

  const handleAddAddress = () => {
    if (!name || !phone || !houseNo || !area || !city || !pincode) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    if (pincode.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit pincode');
      return;
    }

    const newAddress: Address = {
      id: addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1,
      name,
      label: addressType,
      address: `${houseNo}, ${area}, ${city}, ${pincode}`,
      phone: `+91 ${phone}`,
      landmark: landmark || undefined,
      addressType,
    };

    setAddresses([...addresses, newAddress]);
    resetForm();
    setIsModalVisible(false);
    Alert.alert('Success', 'Address added successfully!');
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setHouseNo('');
    setArea('');
    setLandmark('');
    setCity('');
    setPincode('');
    setAddressType('Home');
  };

  const AddressTypeButton = ({
    type,
    icon,
  }: {
    type: string;
    icon: string;
  }) => (
    <TouchableOpacity
      style={[styles.typeBtn,{backgroundColor  :theme.cardBackground,borderColor : theme.cardBackground}, addressType === type && styles.typeBtnActive,{backgroundColor : theme.cardBackground}]}
      onPress={() => setAddressType(type)}
    >
      <Text style={styles.typeIcon}>{icon}</Text>
      <Text
        style={[styles.typeText, addressType === type && styles.typeTextActive]}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );
  const {theme} = useContext(ThemeContext);
  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon,{tintColor : theme.text}]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.text}]}>My Addresses</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title,{color : theme.text}]}>Saved Addresses</Text>

        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saved addresses yet</Text>
            <Text style={[styles.emptySubText,{color : theme.text}]}>
              Add your delivery addresses to get started
            </Text>
          </View>
        ) : (
          addresses.map(address => (
            <View key={address.id} style={[styles.card,{backgroundColor  :theme.cardBackground}]}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelIcon}>
                      {address.addressType === 'Home'
                        ? '🏠'
                        : address.addressType === 'Office'
                        ? '💼'
                        : '📍'}
                    </Text>
                    <Text style={styles.label}>{address.label}</Text>
                  </View>
                </View>

                <Text style={[styles.nameText,{color : theme.text}]}>{address.name}</Text>
                <Text style={[styles.text,{color : theme.textSecondary}]}>{address.address}</Text>
                {address.landmark && (
                  <Text style={[styles.landmarkText,{color : theme.textSecondary}]}>
                    Landmark: {address.landmark}
                  </Text>
                )}
                <Text style={[styles.phoneText,{color : theme.textSecondary}]}>{address.phone}</Text>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePress(address.id)}
              >
                <Image
                  source={require('../../assets/delete.png')}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={[styles.addButtonText,{color : theme.background}]}>+ Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Address Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={[styles.modalContent,{backgroundColor : theme.background}]}>
            <View style={[styles.modalHeader,{borderBottomColor : theme.cardBackground}]}>
              <Text style={[styles.modalTitle,{color : theme.text}]}>Add New Address</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  resetForm();
                }}
              >
                <Text style={[styles.closeBtn]}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.formContainer}
            >
              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel,{color : theme.text}]}>Full Name *</Text>
                <TextInput
                  style={[styles.input,{backgroundColor : theme.cardBackground,borderColor : theme.cardBackground}]}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Phone Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel,{color : theme.text}]}>Phone Number *</Text>
                <View style={styles.phoneInput}>
                  <Text style={[styles.phonePrefix,{backgroundColor  :theme.cardBackground,color :"#999"}]}>+91</Text>
                  <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 ,backgroundColor : theme.cardBackground,borderColor : theme.cardBackground}]}
                    placeholder="Enter 10-digit number"
                    placeholderTextColor="#999"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              </View>

              {/* House/Flat No */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel,{color : theme.text}]}>House/Flat/Block No. *</Text>
                <TextInput
                  style={[styles.input,{backgroundColor : theme.cardBackground,borderColor : theme.cardBackground}]}
                  placeholder="Enter house/flat/block no."
                  placeholderTextColor="#999"
                  value={houseNo}
                  onChangeText={setHouseNo}
                />
              </View>

              {/* Area/Street */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel,{color : theme.text}]}>Area/Street/Sector *</Text>
                <TextInput
                  style={[styles.input,{backgroundColor : theme.cardBackground,borderColor : theme.cardBackground}]}
                  placeholder="Enter area/street/sector"
                  placeholderTextColor="#999"
                  value={area}
                  onChangeText={setArea}
                />
              </View>

              {/* Landmark */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel,{color : theme.text}]}>Landmark (Optional)</Text>
                <TextInput
                  style={[styles.input,{backgroundColor : theme.cardBackground,borderColor : theme.cardBackground}]}
                  placeholder="E.g. Near City Mall"
                  placeholderTextColor="#999"
                  value={landmark}
                  onChangeText={setLandmark}
                />
              </View>

              {/* City */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel,{color : theme.text}]}>City *</Text>
                <TextInput
                  style={[styles.input,{backgroundColor : theme.cardBackground,borderColor : theme.cardBackground}]}
                  placeholder="Enter city"
                  placeholderTextColor="#999"
                  value={city}
                  onChangeText={setCity}
                />
              </View>

              {/* Pincode */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel,{color : theme.text}]}>Pincode *</Text>
                <TextInput
                  style={[styles.input,{backgroundColor : theme.cardBackground,borderColor : theme.cardBackground}]}
                  placeholder="Enter 6-digit pincode"
                  placeholderTextColor="#999"
                  value={pincode}
                  onChangeText={setPincode}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>

              {/* Address Type */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel,{color : theme.text}]}>Save Address As *</Text>
                <View style={styles.typeContainer}>
                  <AddressTypeButton type="Home" icon="🏠" />
                  <AddressTypeButton type="Office" icon="💼" />
                  <AddressTypeButton type="Other" icon="📍" />
                </View>
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddAddress}
              >
                <Text style={[styles.saveButtonText,{color  :theme.background}]}>Save Address</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        transparent
        visible={isDeleteModalVisible}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox,{backgroundColor : theme.cardBackground}]}>
            <TouchableOpacity
              style={styles.closeIconWrapper}
              onPress={cancelDelete}
            >
              <Image
                source={closeIcon}
                style={styles.closeIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={[styles.popupTitle,{color : theme.text}]}>Delete Address</Text>
            <Text style={[styles.popupText,{color : theme.textSecondary}]}>
              Are you sure you want to delete this address? This action cannot
              be undone.
            </Text>
            <View style={styles.popupButtonContainer}>
              <TouchableOpacity
                style={[styles.popupButton, styles.cancelButton]}
                onPress={cancelDelete}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.popupButton, styles.deleteConfirmButton]}
                onPress={confirmDelete}
              >
                <Text style={[styles.deleteButtonText,{color : theme.background}]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#000',
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily : 'Figtree-Bold'
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    fontFamily : 'Figtree-Bold'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    fontFamily : 'Figtree-SemiBold'
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontFamily : 'Figtree-Medium'
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily : 'Figtree-Bold'
  },
  nameText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    fontFamily : 'Figtree-SemiBold'
  },
  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 4,
    fontFamily : 'Figtree-Medium',
    fontWeight : '500'
  },
  landmarkText: {
    fontSize: 13,
    color: '#777',
    // fontStyle: 'italic',
    marginBottom: 4,
    fontFamily : 'Figtree-MediumItalic',
    fontWeight : '500'
  },
  phoneText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginTop: 4,
    fontFamily : 'Figtree-Medium'
  },
  deleteButton: {
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor: '#FF3B30',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    fontFamily : 'Figtree-Bold'
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.9,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    fontFamily : 'figtree-Bold'
  },
  closeBtn: {
    fontSize: 24,
    color: '#666',
    fontWeight: '400',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    fontFamily : 'Figtree-Medium'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#F9F9F9',
    marginBottom: 0,
    fontFamily : 'Figtree-Medium'
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  phonePrefix: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    fontFamily : 'Figtree-Medium'
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
  },
  typeBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF9F0',
  },
  typeIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    fontFamily : 'Figtree-Medium'
  },
  typeTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily : 'Figtree-Bold'
  },

  // Delete Popup Styles (Similar to WelcomeScreen)
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  popupBox: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    padding: width * 0.05,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  closeIconWrapper: {
    position: 'absolute',
    top: width * 0.03,
    right: width * 0.03,
    padding: width * 0.01,
    zIndex: 10,
  },
  closeIconImage: {
    width: width * 0.045,
    height: width * 0.045,
    tintColor: '#666',
  },
  popupTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
    marginBottom: height * 0.015,
    marginTop: height * 0.01,
    textAlign: 'center',
    fontFamily : 'Figtree-Bold'
  },
  popupText: {
    fontSize: width * 0.037,
    color: '#555',
    textAlign: 'center',
    marginBottom: height * 0.025,
    lineHeight: height * 0.025,
    paddingHorizontal: width * 0.02,
    fontFamily : 'Figtree-Medium'
  },
  popupButtonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  popupButton: {
    flex: 1,
    borderRadius: width * 0.02,
    paddingVertical: height * 0.014,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: width * 0.037,
    fontFamily : 'Figtree-Medium'
  },
  deleteConfirmButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: width * 0.037,
    fontFamily : 'Figtree-Medium'
  },
});

import React, { useState, useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

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

const ChangeLocation = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

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

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    addresses[0],
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState('Home');

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    if (route.params?.onSelectAddress) {
      route.params.onSelectAddress({
        label: address.label,
        address: address.address,
      });
    }
    navigation.goBack();
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
      id: addresses.length + 1,
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
      style={[styles.typeBtn, addressType === type && styles.typeBtnActive]}
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

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Addresses</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Saved Addresses</Text>

        {addresses.map(address => (
          <TouchableOpacity
            key={address.id}
            style={[
              styles.card,
              selectedAddress?.id === address.id && styles.cardSelected,
            ]}
            onPress={() => handleSelectAddress(address)}
          >
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
              {selectedAddress?.id === address.id && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedText}>✓</Text>
                </View>
              )}
            </View>

            <Text style={styles.nameText}>{address.name}</Text>
            <Text style={styles.text}>{address.address}</Text>
            {address.landmark && (
              <Text style={styles.landmarkText}>
                Landmark: {address.landmark}
              </Text>
            )}
            <Text style={styles.phoneText}>{address.phone}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add New Address</Text>
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Address</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  resetForm();
                }}
              >
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.formContainer}
            >
              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Phone Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number *</Text>
                <View style={styles.phoneInput}>
                  <Text style={styles.phonePrefix}>+91</Text>
                  <TextInput
                    style={[styles.input, { flex: 1, marginTop: 0 }]}
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
                <Text style={styles.inputLabel}>House/Flat/Block No. *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter house/flat/block no."
                  placeholderTextColor="#999"
                  value={houseNo}
                  onChangeText={setHouseNo}
                />
              </View>

              {/* Area/Street */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Area/Street/Sector *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter area/street/sector"
                  placeholderTextColor="#999"
                  value={area}
                  onChangeText={setArea}
                />
              </View>

              {/* Landmark */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Landmark (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. Near City Mall"
                  placeholderTextColor="#999"
                  value={landmark}
                  onChangeText={setLandmark}
                />
              </View>

              {/* City */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>City *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter city"
                  placeholderTextColor="#999"
                  value={city}
                  onChangeText={setCity}
                />
              </View>

              {/* Pincode */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Pincode *</Text>
                <TextInput
                  style={styles.input}
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
                <Text style={styles.inputLabel}>Save Address As *</Text>
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
                <Text style={styles.saveButtonText}>Save Address</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default ChangeLocation;

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
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF9F0',
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
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  nameText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 4,
  },
  landmarkText: {
    fontSize: 13,
    color: '#777',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginTop: 4,
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
  },
});

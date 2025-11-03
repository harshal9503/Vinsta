import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const Address = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Addresses</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Saved Addresses</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Home Address</Text>
          <Text style={styles.text}>123 Main Street, Springfield</Text>
          <Text style={styles.text}>Phone: +1 555-0101</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Office Address</Text>
          <Text style={styles.text}>789 Corporate Ave, Downtown</Text>
          <Text style={styles.text}>Phone: +1 555-0110</Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#000',
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: width * 0.04,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  text: {
    fontSize: width * 0.037,
    color: '#333',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
});

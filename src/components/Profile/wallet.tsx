import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const Wallet = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>₹ 2,450.00</Text>
        </View>

        <TouchableOpacity style={styles.addFundsButton}>
          <Text style={styles.addFundsText}>Add Funds</Text>
        </TouchableOpacity>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Transactions</Text>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionText}>Order #12345</Text>
            <Text style={[styles.transactionText, { color: '#2E7D32' }]}>+ ₹250</Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionText}>Subscription Renewal</Text>
            <Text style={[styles.transactionText, { color: '#E53935' }]}>- ₹999</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Wallet;

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
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    padding: 20,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: width * 0.04,
    color: COLORS.secondary,
  },
  balanceAmount: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginTop: 5,
  },
  addFundsButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
  },
  addFundsText: {
    color: '#fff',
    fontWeight: '700',
  },
  historyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },
  historyTitle: {
    fontWeight: '700',
    fontSize: width * 0.04,
    color: COLORS.primary,
    marginBottom: 10,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionText: {
    fontSize: width * 0.037,
    color: '#333',
  },
});

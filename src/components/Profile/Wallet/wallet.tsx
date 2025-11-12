import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';

const { width, height } = Dimensions.get('window');

const transactions = [
  {
    id: 1,
    title: 'Masala Poha',
    time: '22 Sep, 9.00 • 3 Items',
    amount: '₹ 50.00',
    type: 'Orders',
    icon: require('../../../assets/b1.png'),
    arrow: require('../../../assets/up1.png'),
  },
  {
    id: 2,
    title: 'Top up wallet',
    time: '22 Sep, 9.00',
    amount: '₹ 50.00',
    type: 'Top Up',
    icon: require('../../../assets/b2.png'),
    arrow: require('../../../assets/down1.png'),
  },
  {
    id: 3,
    title: 'Masala Poha',
    time: '22 Sep, 9.00 • 3 Items',
    amount: '₹ 50.00',
    type: 'Orders',
    icon: require('../../../assets/b3.png'),
    arrow: require('../../../assets/up1.png'),
  },
  {
    id: 4,
    title: 'Masala Poha',
    time: '22 Sep, 9.00 • 3 Items',
    amount: '₹ 50.00',
    type: 'Orders',
    icon: require('../../../assets/r1.png'),
    arrow: require('../../../assets/up1.png'),
  },
  {
    id: 5,
    title: 'Masala Poha',
    time: '22 Sep, 9.00 • 3 Items',
    amount: '₹ 50.00',
    type: 'Orders',
    icon: require('../../../assets/r2.png'),
    arrow: require('../../../assets/up1.png'),
  },
  {
    id: 6,
    title: 'Masala Poha',
    time: '22 Sep, 9.00 • 3 Items',
    amount: '₹ 50.00',
    type: 'Orders',
    icon: require('../../../assets/r3.png'),
    arrow: require('../../../assets/up1.png'),
  },
];

const Wallet = () => {
  const navigation = useNavigation<any>();
  const [showSearch, setShowSearch] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const handleFilterPress = (type: string) => {
    console.log('Selected filter:', type);
    setFilterType(type);
    
    let filtered = [...transactions];
    
    switch (type) {
      case 'Older':
        // Sort by date (assuming older first)
        filtered.sort((a, b) => a.id - b.id);
        break;
      case 'Latest':
        // Sort by date (assuming latest first)
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'Credit':
        // Filter only credit transactions (down arrow)
        filtered = transactions.filter(item => item.arrow === require('../../../assets/down1.png'));
        break;
      case 'Debit':
        // Filter only debit transactions (up arrow)
        filtered = transactions.filter(item => item.arrow === require('../../../assets/up1.png'));
        break;
      default:
        filtered = transactions;
    }
    
    setFilteredTransactions(filtered);
    setShowOptions(false);
  };

  const clearFilter = () => {
    setFilterType(null);
    setFilteredTransactions(transactions);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My E-Wallet</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Image source={require('../../../assets/search.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
            <Image source={require('../../../assets/options.png')} style={[styles.icon, { marginLeft: 10 }]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {showSearch && (
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search transactions..."
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
        </View>
      )}

      {/* Options Dropdown */}
      {showOptions && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.optionItem} onPress={() => handleFilterPress('Older')}>
            <Text style={styles.optionText}>Older First</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={() => handleFilterPress('Latest')}>
            <Text style={styles.optionText}>Latest First</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={() => handleFilterPress('Credit')}>
            <Text style={styles.optionText}>Only Credit</Text>
            <Image source={require('../../../assets/down1.png')} style={styles.optionIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={() => handleFilterPress('Debit')}>
            <Text style={styles.optionText}>Only Debit</Text>
            <Image source={require('../../../assets/up1.png')} style={styles.optionIcon} />
          </TouchableOpacity>
          {filterType && (
            <TouchableOpacity style={[styles.optionItem, { borderBottomWidth: 0 }]} onPress={clearFilter}>
              <Text style={[styles.optionText, { color: COLORS.primary }]}>Clear Filter</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Wallet Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.cardBase} />
          <View style={styles.cardOverlay} />

          <View style={styles.cardContent}>
            <Text style={styles.cardName}>Harshal Sharma</Text>
            <Text style={styles.cardNumber}>1234567890</Text>
            <Text style={styles.balanceLabel}>Your balance</Text>

            {/* Row for balance + top up */}
            <View style={styles.balanceRow}>
              <Text style={styles.balanceAmount}>₹ 9,379</Text>
              <TouchableOpacity
                style={styles.topUpBtn}
                onPress={() => navigation.navigate('TopUp')}>
                <Image source={require('../../../assets/bag.png')} style={styles.bagIcon} />
                <Text style={styles.topUpText}>Top Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardLogos}>
            <Image source={require('../../../assets/Splash.png')} style={[styles.cardLogo, { marginLeft: 8 }]} />
          </View>
        </View>

        {/* Filter Indicator */}
        {filterType && (
          <View style={styles.filterIndicator}>
            <Text style={styles.filterText}>Filter: {filterType}</Text>
            <TouchableOpacity onPress={clearFilter}>
              <Text style={styles.clearFilterText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Transaction History */}
        <View style={styles.transactionSection}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>Transaction History</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {filteredTransactions.map(item => (
            <View key={item.id} style={styles.transactionRow}>
              <Image source={item.icon} style={styles.foodImg} />
              <View style={{ flex: 1 }}>
                <Text style={styles.foodTitle}>{item.title}</Text>
                <Text style={styles.foodTime}>{item.time}</Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.foodAmount}>{item.amount}</Text>
                <View style={styles.typeRow}>
                  <Text style={styles.typeText}>{item.type}</Text>
                  <Image source={item.arrow} style={styles.arrowIcon} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  /** HEADER **/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerTitle: { fontSize: width * 0.045, fontWeight: '700', color: '#000' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 20, height: 20, tintColor: '#000', resizeMode: 'contain' },

  /** SEARCH **/
  searchBar: { paddingHorizontal: 20, paddingBottom: 10 },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    color: '#000',
  },

  /** DROPDOWN **/
  dropdown: {
    position: 'absolute',
    top: height * 0.13,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 999,
    minWidth: 150,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  optionText: { color: '#000', fontWeight: '500', fontSize: 14 },
  optionIcon: { width: 14, height: 14, resizeMode: 'contain' },

  /** CARD **/
  cardWrapper: {
    borderRadius: 18,
    height: height * 0.22,
    marginHorizontal: 20,
    marginTop: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  cardBase: { ...StyleSheet.absoluteFillObject, backgroundColor: '#8F3C09' },
  cardOverlay: {
    position: 'absolute',
    right: -width * 0.15,
    top: -height * 0.02,
    width: width * 0.9,
    height: height * 0.32,
    backgroundColor: '#E87C23',
    opacity: 0.42,
    transform: [{ rotate: '-18deg' }],
  },
  cardContent: { position: 'absolute', top: 20, left: 25, right: 25 },
  cardName: { color: '#fff', fontSize: width * 0.045, fontWeight: '700' },
  cardNumber: { color: '#fff', opacity: 0.9, marginTop: 4 },
  balanceLabel: { color: '#fff', opacity: 0.9, marginTop: 18 },
  balanceRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 4,
    justifyContent: 'space-between',
  },
  balanceAmount: {
    color: '#fff',
    fontSize: width * 0.08,
    fontWeight: '700',
  },
  topUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 0,
  },
  bagIcon: { width: 16, height: 16, resizeMode: 'contain', marginRight: 6 },
  topUpText: { color: '#000', fontWeight: '600', fontSize: width * 0.035 },
  cardLogos: { position: 'absolute', top: 18, right: 25, flexDirection: 'row', alignItems: 'center' },
  cardLogo: { width: 50, height: 50, resizeMode: 'contain' },

  /** FILTER INDICATOR **/
  filterIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  filterText: { color: '#000', fontWeight: '600', fontSize: 14 },
  clearFilterText: { color: COLORS.primary, fontWeight: '600', fontSize: 14 },

  /** TRANSACTION SECTION **/
  transactionSection: { marginTop: 25, paddingHorizontal: 20 },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionTitle: { fontWeight: '700', fontSize: width * 0.042, color: '#000' },
  seeAll: { color: COLORS.primary, fontSize: width * 0.037, fontWeight: '600' },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.6,
    borderColor: '#eee',
  },
  foodImg: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  foodTitle: { fontWeight: '600', fontSize: width * 0.038, color: '#000' },
  foodTime: { color: '#888', fontSize: width * 0.032, marginTop: 2 },
  foodAmount: { fontWeight: '700', fontSize: width * 0.038, color: '#000' },
  typeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  typeText: { color: '#888', fontSize: width * 0.032, marginRight: 4 },
  arrowIcon: { width: 12, height: 12, resizeMode: 'contain' },
});
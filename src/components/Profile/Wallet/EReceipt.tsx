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
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const EReceipt = () => {
  const navigation = useNavigation<any>();
  const transactionId = 'SK7263727399';
  const {theme} = useContext(ThemeContext);

  const copyToClipboard = () => {
    Clipboard.setString(transactionId);

    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Transaction ID copied to clipboard!',
        ToastAndroid.SHORT,
      );
    } else {
      Alert.alert('Success', 'Transaction ID copied to clipboard!');
    }
  };

  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('TopUp')}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon,{tintColor : theme.text}]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.text}]}>E- Receipt</Text>
        <View style={{ width: 25 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* BARCODE */}
        <View style={styles.barcodeContainer}>
          <Image
            source={require('../../../assets/barcode.png')}
            style={[styles.barcodeImg,{tintColor : theme.text}]}
          />
          <View style={styles.barcodeNumbers}>
            <Text style={[styles.barcodeNum,{color : theme.text}]}>273628</Text>
            <Text style={[styles.barcodeNum,{color : theme.text}]}>837279</Text>
          </View>
        </View>

        {/* TRANSACTION HEADER */}
        <View style={styles.transactionHeader}>
          <Image
            source={require('../../../assets/b4.png')}
            style={styles.walletImg}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.txTitle,{color : theme.text}]}>Top up wallet</Text>
            <Text style={styles.txTime}>22 Sep, 9.00</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.txAmount,{color:theme.text}]}>₹ 50.00</Text>
            <View style={styles.typeRow}>
              <Text style={styles.txType}>Top Up</Text>
              <Image
                source={require('../../../assets/down1.png')}
                style={styles.arrowIcon}
              />
            </View>
          </View>
        </View>

        {/* AMOUNT DETAILS */}
        <View style={[styles.card,{backgroundColor:theme.cardBackground}]}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Amount</Text>
            <Text style={[styles.value,{color:theme.text}]}>₹375.00</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Promo</Text>
            <Text style={[styles.value, { color: '#E63946' }]}>- ₹112.50</Text>
          </View>

          <View style={[styles.divider,{backgroundColor:theme.background}]} />

          <View style={styles.rowBetween}>
            <Text style={[styles.label, { fontWeight: '700' }]}>Total</Text>
            <Text style={[styles.value, { fontWeight: '700',color:theme.text }]}>₹262.50</Text>
          </View>
        </View>

        {/* PAYMENT DETAILS */}
        <View style={[styles.card,{backgroundColor:theme.cardBackground}]}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Payment Methods</Text>
            <Text style={[styles.value,{color:theme.text}]}>My E-Wallet</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Date</Text>
            <Text style={[styles.value,{color:theme.text}]}>Dec 15, 2024</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Transaction ID</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.value, { color: COLORS.primary }]}>
                {transactionId}
              </Text>
              <TouchableOpacity onPress={copyToClipboard}>
                <Image
                  source={require('../../../assets/copy.png')}
                  style={[styles.copyIcon, { marginLeft: 6 }]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={[styles.statusText,{color:theme.background}]}>Paid</Text>
            </View>
          </View>
        </View>

        {/* CATEGORY SECTION */}
        <View style={[styles.card,{backgroundColor:theme.cardBackground}]}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Category</Text>
            <Text style={[styles.value,{color:theme.text}]}>Orders</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EReceipt;

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
  headerTitle: { fontSize: width * 0.045, fontWeight: '700', color: '#000',fontFamily : 'Figtree-Bold',
    },

  /** BARCODE **/
  barcodeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  barcodeImg: {
    width: width - 20,
    height: 90,
    resizeMode: 'stretch',
  },
  barcodeNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.4,
    marginTop: 4,
  },
  barcodeNum: { fontSize: 13, color: '#000',fontFamily : 'Figtree-Medium',
    fontWeight  :'500' },

  /** TRANSACTION HEADER **/
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  walletImg: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  txTitle: { fontWeight: '700', fontSize: width * 0.04, color: '#000',fontFamily : 'Figtree-Bold', },
  txTime: { color: '#888', fontSize: width * 0.032, marginTop: 2,fontFamily : 'Figtree-Medium',
    fontWeight  :'500' },
  txAmount: {fontSize: width * 0.04, color: '#000',fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600' },
  typeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  txType: { color: '#888', fontSize: width * 0.032, marginRight: 4,fontFamily : 'Figtree-Medium',
    fontWeight  :'500' },
  arrowIcon: { width: 12, height: 12, resizeMode: 'contain' },

  /** CARD **/
  card: {
    backgroundColor: '#fff',
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: { color: '#555', fontSize: width * 0.037, fontWeight: '500' ,fontFamily : 'Figtree-Medium',
   },
  value: { color: '#000', fontSize: width * 0.037, fontWeight: '600',fontFamily : 'Figtree-SemiBold',
   },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 8 },

  /** STATUS BADGE **/
  statusBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: { color: '#fff', fontWeight: '700', fontSize: 12,fontFamily : 'Figtree-Bold',
    },

  /** MISC **/
  row: { flexDirection: 'row', alignItems: 'center' },
  copyIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
});

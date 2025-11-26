import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';
import { ThemeContext } from '../../../theme/ThemeContext';

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
    title: 'Top up wallet',
    time: '22 Sep, 9.00',
    amount: '₹ 50.00',
    type: 'Top Up',
    icon: require('../../../assets/b2.png'),
    arrow: require('../../../assets/down1.png'),
  },
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
    title: 'Top up wallet',
    time: '22 Sep, 9.00',
    amount: '₹ 50.00',
    type: 'Top Up',
    icon: require('../../../assets/b2.png'),
    arrow: require('../../../assets/down1.png'),
  },
];

const TransactionHistory = () => {
  const navigation = useNavigation<any>();
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const {theme} = useContext(ThemeContext);
  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon,{tintColor : theme.text}]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.text}]}>Transiction History</Text>
        <View style={{ width: 25 }} />
      </View>

      {/* BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {transactions.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.row,{borderColor : theme.cardBackground}]}
            onPress={() => setSelectedTx(item)}
          >
            <Image source={item.icon} style={styles.foodImg} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.foodTitle,{color : theme.text}]}>{item.title}</Text>
              <Text style={styles.foodTime}>{item.time}</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.foodAmount,{color : theme.text}]}>{item.amount}</Text>
              <View style={styles.typeRow}>
                <Text style={styles.typeText}>{item.type}</Text>
                <Image
                  source={item.arrow}
                  style={[
                    styles.arrowIcon,
                    {
                      tintColor: item.type === 'Top Up' ? '#1AAE0A' : '#D92020',
                    },
                  ]}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* POPUP MODAL */}
      <Modal
        visible={!!selectedTx}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedTx(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox,{backgroundColor : theme.background}]}>
            <Image source={selectedTx?.icon} style={styles.modalImg} />
            <Text style={[styles.modalTitle,{color : theme.text}]}>{selectedTx?.title}</Text>
            <Text style={styles.modalTime}>{selectedTx?.time}</Text>

            <View style={[styles.modalDivider,{backgroundColor:theme.cardBackground}]} />

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Amount:</Text>
              <Text style={[styles.modalValue,{color : theme.text}]}>{selectedTx?.amount}</Text>
            </View>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Type:</Text>
              <Text
                style={[
                  styles.modalValue,
                  {
                    color:
                      selectedTx?.type === 'Top Up' ? '#1AAE0A' : '#D92020',
                  },
                ]}
              >
                {selectedTx?.type}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSelectedTx(null)}
            >
              <Text style={[styles.closeBtnText,{color : theme.background}]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TransactionHistory;

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
  headerTitle: { fontSize: width * 0.045, fontWeight: '700', color: '#000',fontFamily : 'Figtree-Bold' },

  /** LIST **/
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.6,
    borderColor: '#eee',
  },
  foodImg: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  foodTitle: { fontWeight: '600', fontSize: width * 0.038, color: '#000',fontFamily : '"Figtree-SemiBold' },
  foodTime: { color: '#888', fontSize: width * 0.032, marginTop: 2,
    fontFamily : "Figtree-Medium",
    fontWeight : '500'
   },
  foodAmount: { fontWeight: '700', fontSize: width * 0.038, color: '#000', fontFamily : "Figtree-Bold",
     },
  typeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  typeText: { color: '#888', fontSize: width * 0.032, marginRight: 4, fontFamily : "Figtree-Medium",
    fontWeight : '500' },
  arrowIcon: { width: 12, height: 12, resizeMode: 'contain' },

  /** MODAL **/
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 8,
  },
  modalImg: { width: 70, height: 70, borderRadius: 35, marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#000', fontFamily : "Figtree-Bold" },
  modalTime: { fontSize: 13, color: '#888', marginBottom: 10, fontFamily : "Figtree-Regular",
    fontWeight : '400' },
  modalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 4,
  },
  modalLabel: { fontWeight: '600', color: '#555', fontFamily : "Figtree-SemiBold",
     },
  modalValue: { fontWeight: '700', color: '#000', fontFamily : "Figtree-Bold" },
  closeBtn: {
    marginTop: 20,
    backgroundColor: COLORS.primary || '#E87C23',
    paddingHorizontal: 100,
    paddingVertical: 8,
    borderRadius: 5,
  },
  closeBtnText: { color: '#fff', fontWeight: '700', fontSize: 14,fontFamily : 'Figtree-Bold' },
});

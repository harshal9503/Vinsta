import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

// Static Data
const breakfastData = [
  { id: 1, name: 'Masala Poha', cafe: 'Foodicated Cafe', price: '₹50.00' },
  { id: 2, name: 'Masala Poha', cafe: 'Foodicated Cafe', price: '₹50.00' },
  { id: 3, name: 'Masala - Idli', cafe: 'Foodicated Cafe', price: '₹50.00' },
  { id: 4, name: 'Masala Poha', cafe: 'Foodicated Cafe', price: '₹50.00' },
  { id: 5, name: 'Double Egg Omlete', cafe: 'Foodicated Cafe', price: '₹50.00' },
  { id: 6, name: 'Masala Poha', cafe: 'Foodicated Cafe', price: '₹50.00' },
];

const lunchData = [
  { id: 1, name: 'Veg Lunch Box', cafe: 'Foodicated Cafe', price: '₹90.00' },
  { id: 2, name: 'Paneer Rice Combo', cafe: 'Foodicated Cafe', price: '₹120.00' },
  { id: 3, name: 'Mix Veg Curry', cafe: 'Foodicated Cafe', price: '₹80.00' },
  { id: 4, name: 'Mini Thali', cafe: 'Foodicated Cafe', price: '₹150.00' },
];

const dinnerData = [
  { id: 1, name: 'Roti Sabzi', cafe: 'Foodicated Cafe', price: '₹70.00' },
  { id: 2, name: 'Pulao', cafe: 'Foodicated Cafe', price: '₹100.00' },
  { id: 3, name: 'Chicken Curry', cafe: 'Foodicated Cafe', price: '₹180.00' },
  { id: 4, name: 'Dal Tadka Rice', cafe: 'Foodicated Cafe', price: '₹90.00' },
];

const daysList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Main Component
const MenuItems = () => {
  const navigation = useNavigation();

  const [tab, setTab] = useState('Breakfast');

  const [items, setItems] = useState({
    Breakfast: breakfastData.map(item => ({
      ...item,
      qty: 1,
      days: [],
    })),
    Lunch: lunchData.map(item => ({
      ...item,
      qty: 1,
      days: [],
    })),
    Dinner: dinnerData.map(item => ({
      ...item,
      qty: 1,
      days: [],
    })),
  });

  const toggleDay = (mealType, id, day) => {
    setItems(prev => {
      const newList = prev[mealType].map(x => {
        if (x.id === id) {
          const hasDay = x.days.includes(day);
          return {
            ...x,
            days: hasDay ? x.days.filter(d => d !== day) : [...x.days, day],
          };
        }
        return x;
      });
      return { ...prev, [mealType]: newList };
    });
  };

  const updateQty = (mealType, id, change) => {
    setItems(prev => {
      const newList = prev[mealType].map(x =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty + change) } : x
      );
      return { ...prev, [mealType]: newList };
    });
  };

  const activeList = items[tab];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bistro Excellence Menu</Text>
        <View style={{ width: width * 0.06 }} />
      </View>

      {/* Select Food Title */}
      <View style={styles.selectRow}>
        <Image
          source={require('../../../../assets/menu.png')}
          style={styles.menuIcon}
        />
        <Text style={styles.selectFood}>Select Food</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {['Breakfast', 'Lunch', 'Dinner'].map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeList.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Image
                source={require('../../../../assets/poha.png')}
                style={styles.foodImg}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.cafeName}>{item.cafe}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
              {/* Quantity */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  onPress={() => updateQty(tab, item.id, -1)}
                  style={styles.qtyBtn}
                >
                  <Text style={styles.qtySign}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>
                  {item.qty.toString().padStart(2, '0')}
                </Text>
                <TouchableOpacity
                  onPress={() => updateQty(tab, item.id, +1)}
                  style={styles.qtyBtn}
                >
                  <Text style={styles.qtySign}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomRow}>
              <Text style={styles.selectMealFor}>Select Meal For</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailsScreen')}
              >
                <Text style={styles.detailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
            {/* Days Slider */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.daysRow}
            >
              {daysList.map(d => (
                <TouchableOpacity
                  key={d}
                  style={[
                    styles.dayBtn,
                    item.days.includes(d) && styles.dayActive,
                  ]}
                  onPress={() => toggleDay(tab, item.id, d)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      item.days.includes(d) && styles.dayTextActive,
                    ]}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* NEXT BUTTON */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('SelectPlan')}
      >
        <Text style={styles.menuText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuItems;

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('5%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#FFFFFF',
  },
  backButton: { padding: wp('1.5%') },
  backIcon: { width: wp('6%'), height: wp('6%') },
  headerTitle: {
    fontSize: wp('5%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    textAlign: 'center',
    flex: 1,
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.5%'),
    paddingHorizontal: wp('5%'),
  },
  menuIcon: { width: wp('5%'), height: wp('5%'), resizeMode: 'contain' },
  selectFood: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    marginLeft: wp('2.5%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  tabsRow: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    paddingHorizontal: wp('5%'),
    justifyContent: 'space-between',
  },
  tabBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
    marginHorizontal: wp('1%'),
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#E87C23',
    borderColor: '#E87C23',
  },
  tabText: {
    color: '#000',
    fontWeight: '600',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    fontSize: wp('4%'),
  },
  tabTextActive: { color: '#fff' },
  card: {
    backgroundColor: '#fff',
    elevation: 3,
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
    borderRadius: wp('3%'),
    padding: wp('4%'),
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  foodImg: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('2.5%'),
    marginRight: wp('3%'),
  },
  foodName: {
    color: '#000',
    fontWeight: '700',
    fontSize: wp('4.5%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  cafeName: {
    color: '#777',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  price: {
    color: '#000',
    fontWeight: '700',
    marginTop: hp('1%'),
    fontSize: wp('4.5%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('3.5%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  qtySign: {
    color: COLORS.primary,
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  qtyText: {
    marginHorizontal: wp('2.5%'),
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#000',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  selectMealFor: {
    color: '#444',
    fontSize: wp('3.5%'),
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  detailsText: {
    color: '#E87C23',
    fontSize: wp('3.5%'),
    fontWeight: '600',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  daysRow: { flexDirection: 'row', marginTop: hp('1.5%') },
  dayBtn: {
    width: wp('12%'),
    marginHorizontal: wp('1%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('6%'),
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  dayActive: { backgroundColor: '#E87C23' },
  dayText: {
    color: '#000',
    fontSize: wp('3.5%'),
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  dayTextActive: { color: '#fff' },
  menuButton: {
    marginTop: hp('1%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('3%'),
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    marginBottom: hp('3%'),
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: wp('3.8%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});

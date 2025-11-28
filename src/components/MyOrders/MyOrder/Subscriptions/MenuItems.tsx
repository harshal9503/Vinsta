import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  Animated,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

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

const checklistItems = [
  { id: 1, name: 'Paneer Masala' },
  { id: 2, name: 'Tandoori Roti (5 pcs)' },
  { id: 3, name: 'Steamed Rice' },
  { id: 4, name: 'Dal (Tadka/Yellow Dal)' },
  { id: 5, name: 'Fresh Salad' },
  { id: 6, name: 'Butter' },
];
// Main Component
const MenuItems = () => {
  const navigation = useNavigation();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [slideAnim] = useState(new Animated.Value(0));

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

  const openModal = (item) => {
    setSelectedItem(item);
    setShowFilterModal(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowFilterModal(false);
      setSelectedItem(null);
    });
  };

  const modalTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

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
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => openModal(item)}
          >
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
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={closeModal}
          />
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY: modalTranslateY }],
              },
            ]}
          >
            {/* Modal Header */}

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            {selectedItem && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp('2%') }}
              >
                <View style={styles.modalContent}>

                  <View style={styles.imageWrapper}>
                    <Image
                      source={require('../../../../assets/poha.png')}
                      style={styles.modalFoodImg}
                    />

                    <View style={styles.productRatingBadge}>
                      <Image
                        source={require('../../../../assets/star.png')}
                        style={styles.starIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.ratingText}>4.4</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Text style={styles.modalFoodName}>{selectedItem.name}</Text>
                    <Text style={styles.modalPrice}>{selectedItem.price}</Text>
                  </View>

                  <Text style={styles.mustOrdered}>(Must Ordered)</Text>

                  <Text style={styles.descriptionText}>
                    Tired of figuring out what to eat every day? We’ve got you covered!
                    Introducing our Combo Meal Subscription — a wholesome, flavorful meal’s.
                  </Text>

                  <View style={styles.separator}></View>

                  {/* Customize Options */}
                  <Text style={styles.customizeTitle}>Ingredient’s</Text>
                  <Text
                    style={[
                      styles.customizeTitle,
                      { fontWeight: '400', fontSize: wp('3%') },
                    ]}
                  >
                    More than upto 5 ingredients
                  </Text>

                  {/* Remove height from this container */}
                  <View style={{ marginVertical: hp('1%') }}>
                    {checklistItems.map((item) => (
                      <TouchableOpacity key={item.id} style={styles.checklistItem}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          }}
                        >
                          <View style={styles.checkboxContainer}>
                            <View style={styles.checkbox}>
                              <Image
                                source={require('../../../../assets/checkCircle.png')}
                                style={{ height: wp('5%'), width: wp('5%') }}
                              />
                            </View>
                          </View>
                          <Text style={styles.itemText}>{item.name}</Text>
                        </View>
                        <Image
                          source={require('../../../../assets/checkbox.png')}
                          style={{
                            width: wp('5%'),
                            height: wp('5%'),
                            tintColor: '#259E29',
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.separator}></View>
                  <Text style={styles.customizeTitle}>
                    Add a cooking request (optional)
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder='e.g. don"t make it too spicy'
                    placeholderTextColor='#999'
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={7}
                  />
                </View>
              </ScrollView>
            )}

          </Animated.View>
        </View>
      </Modal>

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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    paddingBottom: hp('2%'),
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  closeButton: {
    position: 'absolute',
    alignSelf: 'center',   // now alignSelf works horizontally
    top: 0,                // anchor at top
    transform: [
      { translateY: -wp('5%') }, // float half outside WITHOUT top change
    ],
    backgroundColor: '#fff',
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  closeText: {
    fontSize: wp('5%'),
    color: '#000',
  },
  modalContent: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('4%'),
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',   // IMPORTANT
    width: '100%',
  },
  modalFoodImg: {
    width: '100%',
    height: wp('40%'),
    borderRadius: wp('2%'),
  },

  productRatingBadge: {
    position: 'absolute',
    bottom: wp('0%'),
    left: wp('0%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  starIcon: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    marginRight: wp('1%'),
    tintColor: '#fff',
  },
  ratingText: {
    fontWeight: '400',
    fontSize: wp('3%'),
    color: '#fff',
  },
  modalFoodName: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('0.5%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  modalCafeName: {
    fontSize: wp('4%'),
    color: '#777',
    marginBottom: hp('1%'),
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  modalPrice: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#111',
    marginBottom: hp('1%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  mustOrdered: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
    color: COLORS.primary,
    marginBottom: hp('2%'),
    fontFamily: getFontFamily('Bold'),
    alignSelf: 'flex-start'
  },
  descriptionText: {
    fontSize: wp('3.3%'),
    color: '#666',
    lineHeight: hp('2.5%'),
    marginBottom: hp('2%'),
    textAlign: 'left',
    fontFamily: getFontFamily('Regular'),
    fontWeight: '400',
  },
  separator: {
    backgroundColor: '#F4F4F4',
    height: 4,
    width: '110%',
    marginBottom: hp('2%')
  },
  customizeTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: hp('1%'),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  customizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp('3%'),
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
  },
  checkboxContainer: {
    paddingHorizontal: wp('1%')
  },
  itemText: {
    fontSize: wp('3.3%'),
    color: '#111719',
    textAlign: 'left',
    fontFamily: getFontFamily('Regular'),
    fontWeight: '400',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
    fontSize: wp('3.8%'),
    color: '#000',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
    minHeight: hp('14%'),
    textAlignVertical: 'top',
    marginBottom: hp('5%')
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('3%'),
    width: '100%',
  },
  addToCartText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
});
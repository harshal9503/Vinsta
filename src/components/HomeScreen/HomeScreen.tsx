// File: src/screens/HomeScreen/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { COLORS } from '../../theme/colors';

const { width } = Dimensions.get('window');

// Static data for categories, restaurants, and products
const categories = [
  { name: 'Burger', img: require('../../assets/burger.png') },
  { name: 'Mexican', img: require('../../assets/burger.png') },
  { name: 'Asian', img: require('../../assets/burger.png') },
];
const restaurants = [
  { name: 'Bistro Excellence', img: require('../../assets/featuredrestaurant.png') },
  { name: 'Elite-Ember', img: require('../../assets/featuredrestaurant.png') },
];
const products = [
  { name: 'Cheese Burger', price: '₹45.50', img: require('../../assets/burger1.png') },
  { name: 'Cheese Burger', price: '₹45.50', img: require('../../assets/burger1.png') },
  { name: 'Cheese Burger', price: '₹45.50', img: require('../../assets/burger1.png') },
  { name: 'Cheese Burger', price: '₹45.50', img: require('../../assets/burger1.png') },
];

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 24;

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Burger');

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {/* Keep Primary color only for header/status bar */}
      <View style={{ backgroundColor: COLORS.primary, height: STATUSBAR_HEIGHT }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.rowJustify}>
            <View style={styles.locationRow}>
              <Image source={require('../../assets/location.png')} style={styles.icon} />
              <Text style={styles.locationText}>4102 Pretty View Lane</Text>
              <Image source={require('../../assets/dropdown.png')} style={styles.dropdownIcon} />
            </View>
            <View style={styles.walletBagRow}>
              <TouchableOpacity>
                <Image source={require('../../assets/wallet.png')} style={styles.walletIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../assets/bag.png')} style={styles.bagIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.headerTitle}>
            What you{'\n'}Going eat  for today ?
          </Text>
          <View style={styles.rowJustify}>
            <View style={{ flex: 1 }} />
            <View style={styles.vegRow}>
              <View style={styles.switchCircleOn} />
              <Text style={styles.vegModeTxt}>Veg Mode</Text>
            </View>
          </View>
        </View>

        {/* Main Content with safe top margin */}
        <View style={styles.mainContent}>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Find for food or restaurant..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity>
              <Image source={require('../../assets/filter.png')} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>

          {/* Today's Offers */}
          <View style={styles.sectionRowBetween}>
            <Text style={styles.sectionTitle}>Today's Offer's</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.offerCard}>
            <View style={styles.offerImageWrap}>
              <Image source={require('../../assets/todayoffer.png')} style={styles.offerImage} />
            </View>
            <View style={styles.offerContent}>
              <Text style={styles.offerHeader}>Free Delivery</Text>
              <Text style={styles.offerSubTxt}>Enjoy exclusive discount on tasty{'\n'}food today !</Text>
              <TouchableOpacity style={styles.offerButton}>
                <Text style={styles.offerBtnText}>VIEW OFFER’S</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Categories - Slider */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySlider}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                style={[
                  styles.categoryBtn,
                  selectedCategory === cat.name && styles.categoryBtnActive,
                ]}
                onPress={() => setSelectedCategory(cat.name)}
              >
                <Image source={cat.img} style={styles.categoryIcon} />
                <Text style={[
                  styles.categoryTxt,
                  selectedCategory === cat.name && styles.categoryTxtActive,
                ]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Featured restaurants */}
          <View style={styles.sectionRowBetween}>
            <Text style={styles.sectionTitle}>Featured restaurants</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 4}}>
            {restaurants.map((r, idx) => (
              <View key={r.name} style={styles.restaurantCard}>
                <Image source={r.img} style={styles.restaurantImg} />
                <Text style={styles.restaurantTitle}>{r.name}</Text>
                <View style={styles.restaurantInfoRow}>
                  <Image source={require('../../assets/bike.png')} style={styles.infoIcon} />
                  <Text style={styles.infoTxt}>free delivery</Text>
                  <Image source={require('../../assets/clock.png')} style={styles.infoIcon} />
                  <Text style={styles.infoTxt}>10-15 mins</Text>
                  <Image source={require('../../assets/star.png')} style={styles.infoIcon} />
                  <Text style={styles.infoTxt}>4.4</Text>
                  <Image source={require('../../assets/heart.png')} style={styles.heartIcon} />
                </View>
                <Text style={styles.restaurantTags}>Burger   Chicken   Fast Food</Text>
              </View>
            ))}
          </ScrollView>

          {/* Products List */}
          <Text style={[styles.sectionTitle, {marginTop: 16}]}>Best-Rated Burgers</Text>
          <View style={styles.productRow}>
            {products.map((item, idx) => (
              <View key={idx} style={styles.productCard}>
                <Image source={item.img} style={styles.productImg} />
                <Text style={styles.productTitle}>{item.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <TouchableOpacity>
                    <Image source={require('../../assets/plus.png')} style={styles.plusIcon} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.deliveryTxt}>10-15 mins</Text>
              </View>
            ))}
          </View>

          {/* Bottom info text */}
          <View style={styles.bottomRow}>
            <Text style={styles.reachingTxt}>Reaching at your doorstep</Text>
            <Text style={styles.getDeliveredTxt}>Get delivered in 15 minutes</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Styles below
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingTop: 18,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 14,
  },
  rowJustify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { width: 20, height: 20, marginRight: 6 },
  locationText: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: '500',
    marginRight: 2,
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.secondary,
    marginLeft: 2,
  },
  walletBagRow: { flexDirection: 'row', gap: 10 },
  walletIcon: { width: 24, height: 22, marginRight: 10 },
  bagIcon: { width: 24, height: 24 },
  headerTitle: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 6,
    lineHeight: 28,
  },
  vegRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  switchCircleOn: {
    width: 24,
    height: 24,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    borderColor: '#62c370',
    borderWidth: 1,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegModeTxt: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  mainContent: {
    marginTop: 16,
    paddingHorizontal: 14,
    backgroundColor: COLORS.background,
  },
  searchBarContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    marginTop: -20,
    marginBottom: 14,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
    color: COLORS.textDark,
  },
  filterIcon: {
    width: 22, height: 22, marginHorizontal: 12, tintColor: COLORS.primary,
  },
  sectionRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 7,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  sectionLink: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
  },
  offerCard: {
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    elevation: 1,
    shadowColor: COLORS.cardShadow,
    marginBottom: 6,
  },
  offerImageWrap: { marginRight: 18 },
  offerImage: { width: 70, height: 70, resizeMode: 'contain' },
  offerContent: { flex: 1 },
  offerHeader: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginBottom: 3 },
  offerSubTxt: { color: COLORS.textLight, fontSize: 14, marginBottom: 8 },
  offerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  offerBtnText: { color: COLORS.secondary, fontWeight: '700', fontSize: 12 },
  // Categories slider
  categorySlider: { paddingVertical: 10, marginVertical: 2 },
  categoryBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    paddingVertical: 4,
    paddingHorizontal: 23,
    flexDirection: 'row',
  },
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
  },
  categoryIcon: { width: 22, height: 22, marginRight: 7 },
  categoryTxt: { color: COLORS.primary, fontWeight: '600', fontSize: 14 },
  categoryTxtActive: { color: COLORS.secondary },
  // Featured Restaurants
  restaurantCard: {
    width: width * 0.60,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 13,
    padding: 12,
    shadowColor: COLORS.cardShadow,
    elevation: 2,
  },
  restaurantImg: { width: '100%', height: 80, borderRadius: 11, marginBottom: 7 },
  restaurantTitle: { fontWeight: '600', fontSize: 15, color: COLORS.textDark, marginBottom: 2 },
  restaurantInfoRow: {
    flexDirection: 'row', alignItems: 'center', marginVertical: 2, gap: 5,
  },
  infoIcon: { width: 14, height: 14, marginLeft: 4, marginRight: 2 },
  heartIcon: { width: 14, height: 14, marginLeft: 3, tintColor: COLORS.primary },
  infoTxt: { color: COLORS.textLight, fontSize: 12, fontWeight: '500', marginRight: 5 },
  restaurantTags: { color: COLORS.primary, fontSize: 11, marginTop: 2, fontWeight: '400' },
  // Product List
  productRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 8,
    marginBottom: 8,
  },
  productCard: {
    backgroundColor: COLORS.secondary,
    width: width * 0.43,
    borderRadius: 14,
    padding: 10,
    margin: 6,
    shadowColor: COLORS.cardShadow,
    elevation: 1,
    alignItems: 'center',
  },
  productImg: { width: '100%', height: 80, borderRadius: 12, marginBottom: 7 },
  productTitle: { fontWeight: '700', fontSize: 14, color: COLORS.textDark, marginBottom: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 7 },
  productPrice: { color: COLORS.primary, fontWeight: '700', fontSize: 16 },
  plusIcon: { width: 24, height: 24, marginLeft: 6 },
  deliveryTxt: { color: COLORS.textLight, fontSize: 12 },
  bottomRow: { alignItems: 'center', marginTop: 16, marginBottom: 12 },
  reachingTxt: { color: COLORS.primary, fontWeight: '700', fontSize: 15, marginBottom: 1 },
  getDeliveredTxt: { color: COLORS.textLight, fontSize: 13 },
});

export default HomeScreen;

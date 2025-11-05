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
  Animated,
  FlatList,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

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
  { name: 'Cheese Burger', price: '$45.50', img: require('../../assets/b1.png'), oldPrice: '$50.50' },
  { name: 'Cheese Burger', price: '$45.50', img: require('../../assets/b2.png'), oldPrice: '$50.50' },
  { name: 'Cheese Burger', price: '$45.50', img: require('../../assets/b1.png'), oldPrice: '$50.50' },
  { name: 'Cheese Burger', price: '$45.50', img: require('../../assets/b3.png'), oldPrice: '$50.50' },
];

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 24;

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Burger');
  const navigation = useNavigation<any>();
  const [isVegMode, setIsVegMode] = useState(false);
  const toggleAnim = useState(new Animated.Value(0))[0];

  const toggleSwitch = () => {
    Animated.timing(toggleAnim, {
      toValue: isVegMode ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsVegMode(!isVegMode);
  };

  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [wp('0%'), wp('3.5%')],
  });

  const toggleBgColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['green', 'red'],
  });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={{ backgroundColor: COLORS.primary, height: STATUSBAR_HEIGHT }} />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.rowJustify}>
            <View style={styles.locationContainer}>
              <View style={styles.locationRow}>
                <Image source={require('../../assets/location.png')} style={styles.icon} />
                <Text style={styles.locationText}>Location</Text>
                <Image source={require('../../assets/dropdown.png')} style={styles.dropdownIcon} />
              </View>
              <Text style={styles.addressText}>4102 Pretty View Lane</Text>
            </View>
            <View style={styles.walletBagRow}>
              <TouchableOpacity style={styles.walletBtn}>
                <Image source={require('../../assets/wallet.png')} style={styles.walletIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bagBtn}>
                <Image source={require('../../assets/bag.png')} style={styles.bagIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>
              What you{'\n'}Going eat for today ?
            </Text>
            <View style={styles.vegContainer}>
              <TouchableOpacity
                style={[
                  styles.switchOuter,
                  { backgroundColor: '#fff' },
                ]}
                onPress={toggleSwitch}
                activeOpacity={0.8}
              >
                <Animated.View
                  style={[
                    styles.switchCircle,
                    { 
                      transform: [{ translateX }], 
                      backgroundColor: toggleBgColor 
                    },
                  ]}
                />
                <View style={styles.switchTextContainer}>
                  {!isVegMode && <Text style={styles.switchText}>OFF</Text>}
                  {isVegMode && <Text style={styles.switchText}>ON</Text>}
                </View>
              </TouchableOpacity>
              <Text style={styles.vegModeTxt}>Veg Mode</Text>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.searchBarContainer}
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.8}
            >
              <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
              <Text style={styles.searchPlaceholder}>
                Find for food or restaurant...
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
              <Image
                source={require('../../assets/filter.png')}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Offers */}
          <View style={styles.sectionRowBetween}>
            <Text style={styles.sectionTitle}>Today's Offer's</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Offer Card */}
          <View style={styles.offerCard}>
            <View style={styles.offerContent}>
              <Text style={styles.offerHeader}>Free Delivery</Text>
              <Text style={styles.offerSubTxt}>Enjoy exclusive discount on tasty{'\n'}food today!</Text>
              <TouchableOpacity style={styles.offerButton}>
                <Text style={styles.offerBtnText}>VIEW OFFER'S</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.offerImageWrap}>
              <Image source={require('../../assets/todayoffer.png')} style={styles.offerImage} />
            </View>
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categorySliderContent}
          >
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
                <Text
                  style={[
                    styles.categoryTxt,
                    selectedCategory === cat.name && styles.categoryTxtActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Featured Restaurants */}
          <View style={styles.sectionRowBetween}>
            <View style={styles.sectionTitleRow}>
              <Image source={require('../../assets/feature.png')} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Featured restaurants</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.restaurantScrollContent}
          >
            {restaurants.map((r, index) => (
              <View key={r.name + index} style={styles.restaurantCard}>
                <Image source={r.img} style={styles.restaurantImg} />
                <View style={styles.iconWrapper}>
                  <Image source={require('../../assets/heart.png')} style={styles.heartIcon} />
                </View>

                <View style={styles.ratingWrapper}>
                  <Image source={require('../../assets/star.png')} style={styles.starIcon} />
                  <Text style={styles.ratingText}>4.4</Text>
                </View>
                <Text style={styles.restaurantTitle}>{r.name}</Text>
                <View style={styles.restaurantInfoRow}>
                  <Image source={require('../../assets/bike.png')} style={styles.infoIcon} />
                  <Text style={styles.infoTxt}>free delivery</Text>
                  <Image source={require('../../assets/clock.png')} style={styles.infoIcon} />
                  <Text style={styles.infoTxt}>10-15 mins</Text>
                </View>
                <View style={styles.tagsContainer}>
                  <Text style={styles.restaurantTags}>Burger</Text>
                  <Text style={styles.restaurantTags}>Chicken</Text>
                  <Text style={styles.restaurantTags}>FastFood</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Product List */}
          <View style={styles.sectionRowBetween}>
            <View style={styles.sectionTitleRow}>
              <Image source={require('../../assets/popular.png')} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Best-Rated Burgers</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productGrid}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={item.img} style={styles.productImg} />
                <View style={[styles.iconWrapper, styles.productHeartWrapper]}>
                  <Image source={require('../../assets/heart.png')} style={styles.heartIcon} />
                </View>

                <View style={[styles.ratingWrapper, styles.productRatingWrapper]}>
                  <Image source={require('../../assets/star.png')} style={styles.starIcon} />
                  <Text style={styles.ratingText}>4.4</Text>
                </View>
                
                <Text style={styles.productTitle}>{item.name}</Text>

                <View style={styles.priceRow}>
                 <View style={styles.priceContainer}>
                   <Text style={styles.productPrice}>{item.price}</Text>
                  <Text style={styles.oldPrice}>
                    {item.oldPrice}
                  </Text>
                 </View>

                  <TouchableOpacity style={styles.plusBtn}>
                    <Image source={require('../../assets/plus.png')} style={styles.plusIcon} />
                  </TouchableOpacity>
                </View>

                <View style={styles.deliveryTimeRow}>
                  <Image source={require('../../assets/clock.png')} style={styles.infoIcon} />
                  <Text style={styles.infoTxt}>10-15 mins</Text>
                </View>
              </View>
            )}
          />

          {/* Bottom info */}
          <View style={styles.bottomRow}>
            <Image 
              source={require('../../assets/walk.png')} 
              style={styles.bottomImage}
            />
            <View style={styles.bottomTextContainer}>
              <Text style={styles.reachingTxt}>Reaching at your doorstep</Text>
              <View style={styles.deliveryTimeContainer}>
                <Image source={require('../../assets/clock.png')} style={styles.deliveryClockIcon} />
                <Text style={styles.getDeliveredTxt}>Get delivered in 15 minutes</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('2%'),
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('4.5%'),
    paddingTop: hp('4%'),
    borderBottomLeftRadius: wp('4%'),
    borderBottomRightRadius: wp('4%'),
    paddingBottom: hp('4%'),
  },
  rowJustify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('1%'),
  },
  locationContainer: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  icon: { 
    width: wp('5%'), 
    height: wp('5%'), 
    marginRight: wp('1.2%') 
  },
  locationText: {
    color: COLORS.secondary,
    fontSize: wp('3.3%'),
    fontWeight: '500',
    marginRight: wp('0.5%'),
  },
  dropdownIcon: {
    width: wp('2%'),
    height: wp('1%'),
    tintColor: COLORS.secondary,
    marginLeft: wp('2%'),
  },
  addressText: {
    color: COLORS.secondary,
    fontSize: wp('3%'),
    fontWeight: '400',
  },
  walletBagRow: { 
    flexDirection: 'row', 
    gap: wp('2.5%') 
  },
  walletBtn: { 
    backgroundColor: '#fff', 
    padding: wp('2.5%'), 
    borderRadius: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagBtn: { 
    backgroundColor: '#fff', 
    padding: wp('2.2%'), 
    borderRadius: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletIcon: { 
    width: wp('4.5%'), 
    height: wp('4.5%'), 
  tintColor: COLORS.primary
  },
  bagIcon: { 
    width: wp('4.5%'), 
    height: wp('4.5%') ,
    tintColor: COLORS.primary
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('1%'),
  },
  headerTitle: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: wp('5.5%'),
    lineHeight: hp('3.4%'),
    flex: 1,
  },
  vegContainer: {
    alignItems: 'center',
    marginLeft: wp('2%'),
  },
  switchOuter: {
    width: wp('17%'),
    height: hp('4%'),
    borderRadius: hp('2.25%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('1.5%'),
  },
  switchTextContainer: {
    width: wp('6%'),
    alignItems: 'center',
  },
  switchText: {
    color: '#000',
    fontWeight: '700',
    fontSize: wp('3%'),
  },
  switchCircle: {
    width: hp('3%'),
    height: hp('3%'),
    borderRadius: hp('1.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  vegModeTxt: {
    marginTop: hp('0.8%'),
    color: COLORS.secondary,
    fontSize: wp('3%'),
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderRadius: wp('2.5%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: wp('3%'),
  },
  searchIcon: {
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
    tintColor: '#999',
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: wp('3.5%'),
    color: '#999',
  },
  filterBtn: {
    backgroundColor: '#fff',
    borderRadius: wp('2.5%'),
    padding: wp('3%'),
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('13%'),
    height: wp('13%'),
  },
  filterIcon: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
  },
  mainContent: {
    marginTop: hp('2%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: COLORS.background,
    flex: 1,
  },
  sectionRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
    marginTop: hp('1%'),
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  sectionIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  sectionTitle: {
    fontSize: wp('4.2%'),
    fontWeight: '700',
    color: COLORS.textDark,
  },
  sectionLink: {
    fontSize: wp('3.5%'),
    color: COLORS.primary,
    fontWeight: '500',
  },
  offerCard: {
    borderRadius: wp('4%'),
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
    elevation: 3,
    shadowColor: COLORS.cardShadow,
    marginBottom: hp('1%'),
  },
  offerContent: {
    flex: 1,
    marginRight: wp('2%'),
  },
  offerHeader: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: hp('0.5%'),
  },
  offerSubTxt: {
    color: COLORS.textLight,
    fontSize: wp('3.5%'),
    marginBottom: hp('1.5%'),
    lineHeight: hp('2.2%'),
  },
  offerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('2%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    alignSelf: 'flex-start',
  },
  offerBtnText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: wp('3%'),
  },
  offerImageWrap: {
    width: wp('30%'),
    height: wp('30%'),
  },
  offerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  categorySliderContent: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('1%'),
  },
  categoryBtn: {
    backgroundColor: '#fff',
    borderRadius: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
  },
  categoryIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('2%'),
  },
  categoryTxt: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: wp('3.5%'),
  },
  categoryTxtActive: {
    color: COLORS.secondary,
  },
  restaurantScrollContent: {
    paddingHorizontal: wp('1%'),
    paddingBottom: hp('1%'),
  },
  restaurantCard: {
    width: wp('55%'),
    backgroundColor: COLORS.secondary,
    marginHorizontal: wp('1.5%'),
    marginBottom: hp('1%'),
    borderRadius: wp('4%'),
    padding: wp('3%'),
    shadowColor: COLORS.cardShadow,
    elevation: 3,
    position: 'relative',
  },
  restaurantImg: {
    width: '100%',
    height: hp('15%'),
    borderRadius: wp('3%'),
    marginBottom: hp('1%'),
  },
  iconWrapper: {
    position: 'absolute',
    top: wp('4%'),
    right: wp('4%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('5%'),
    padding: wp('2%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  heartIcon: {
    width: wp('4%'),
    height: wp('4%'),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  ratingWrapper: {
    position: 'absolute',
    bottom: hp('9%'),
    left: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  productRatingWrapper: {
    bottom: hp('11%'),
    left: wp('4%'),
  },
  starIcon: {
    width: wp('3%'),
    height: wp('3%'),
    resizeMode: 'contain',
    marginRight: wp('1%'),
    tintColor: '#fff',
  },
  ratingText: {
    color: '#fff',
    fontSize: wp('2.8%'),
    fontWeight: '600',
  },
  restaurantTitle: {
    fontWeight: '600',
    fontSize: wp('3.8%'),
    color: COLORS.textDark,
    marginBottom: hp('0.5%'),
  },
  restaurantInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
    gap: wp('1%'),
  },
  infoIcon: {
    width: wp('3%'),
    height: wp('3.5%'),
    tintColor: COLORS.textLight,
  },
  infoTxt: {
    color: COLORS.textLight,
    fontSize: wp('3%'),
    fontWeight: '500',
    marginRight: wp('2%'),
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: wp('1.5%'),
    flexWrap: 'wrap',
  },
  restaurantTags: {
    color: COLORS.primary,
    fontSize: wp('2.8%'),
    fontWeight: '400',
    backgroundColor: '#f3f1f1',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.3%'),
    borderRadius: wp('5%'),
  },
  productGrid: {
    paddingHorizontal: wp('1%'),
  },
  productCard: {
    backgroundColor: COLORS.secondary,
    width: wp('43%'),
    borderRadius: wp('4%'),
    padding: wp('3%'),
    margin: wp('1.5%'),
    shadowColor: COLORS.cardShadow,
    elevation: 3,
    position: 'relative',
  },
  productImg: {
    width: '100%',
    height: hp('16%'),
    borderRadius: wp('3%'),
    marginBottom: hp('1%'),
  },
  productHeartWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  productTitle: {
    fontWeight: '700',
    fontSize: wp('3.6%'),
    color: COLORS.textDark,
    marginBottom: hp('0.5%'),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('0.5%'),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.5%'),
  },
  productPrice: {
    color: '#111',
    fontWeight: '700',
    fontSize: wp('3.8%'),
  },
  oldPrice: {
    color: 'red',
    textDecorationLine: 'line-through',
    fontSize: wp('3%'),
    fontWeight: '500',
  },
  plusBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('50%'),
    padding: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    tintColor: '#fff',
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1%'),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    paddingHorizontal: wp('2%'),
  },
  bottomImage: {
    width: wp('15%'),
    height: wp('15%'),
    resizeMode: 'contain',
  },
  bottomTextContainer: {
    flex: 1,
    marginLeft: wp('4%'),
  },
  reachingTxt: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: wp('3.8%'),
    marginBottom: hp('0.5%'),
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.5%'),
  },
  deliveryClockIcon: {
    width: wp('3%'),
    height: wp('3.5%'),
    tintColor: COLORS.textLight,
  },
  getDeliveredTxt: {
    color: COLORS.textLight,
    fontSize: wp('3.2%'),
  },
});

export default HomeScreen;
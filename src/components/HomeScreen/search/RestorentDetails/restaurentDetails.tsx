import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
  Vibration,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';
import RecommendedFood from './RecommendedFood';
import BestInBurger from './BestInBurger';
import FilterModal from './FilterModal';
import FoodDetailModal from './FoodDetailModal';
import VegNonVegModal from './VegNonVegModal';
import RestuarantBadge from './RestuarantBadge';
import FilterTags from './FilterTags';

const { width, height } = Dimensions.get('window');

const FILTER_TAG_COLORS = {
  background: '#FFF9F3',
  border: '#FFE0C8',
  text: '#F99C38',
};

interface FoodItem {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  time: string;
  img: any;
  description?: string;
  restaurant?: string;
  isVeg?: boolean;
}

const RestaurentDetails: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const selectedItem = route.params?.selectedItem || 'Burger';
  const initialFoodType = route.params?.foodType || 'Veg';

  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [heartScales] = useState<{ [key: number]: Animated.Value }>({});
  const [plusScales] = useState<{ [key: number]: Animated.Value }>({});
  const [activeCategory, setActiveCategory] = useState(selectedItem);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>(['Spicy']);
  const [vegNonVegFilter, setVegNonVegFilter] = useState<'Veg' | 'NonVeg'>(
    initialFoodType,
  );
  const [vegNonVegDropdownVisible, setVegNonVegDropdownVisible] =
    useState(false);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Heart Icon in header state for liked toggle
  const [headerLiked, setHeaderLiked] = useState(false);
  const [headerHeartScale] = useState(new Animated.Value(1));

  // Food Item Modal States
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [selectedCheese, setSelectedCheese] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [cookingRequest, setCookingRequest] = useState<string>('');

  const categories = [
    { name: 'Burger', img: require('../../../../assets/burger.png') },
    { name: 'Maxican', img: require('../../../../assets/mexican1.png') },
    { name: 'Asian', img: require('../../../../assets/asian.png') },
  ];

  const vegFoodItems: FoodItem[] = [
    {
      id: 1,
      name: 'Spicy Paneer Burger',
      price: 250.0,
      oldPrice: 280.0,
      time: '10-15 mins',
      img: require('../../../../assets/b1.png'),
      description:
        'A flavorful burger with a spiced paneer patty, fresh veggies, and creamy mint mayo in a toasted bun. Perfect for those craving a hearty.',
      restaurant: 'Foodicated Cafe',
      isVeg: true,
    },
    {
      id: 2,
      name: 'Veg Delight',
      price: 45.5,
      oldPrice: 50.0,
      time: '10-15 mins',
      img: require('../../../../assets/b2.png'),
      description:
        'A flavorful burger with a spiced paneer patty, fresh veggies, and creamy mint mayo in a toasted bun. Perfect for those craving a hearty.',
      restaurant: 'Foodicated Cafe',
      isVeg: true,
    },
    {
      id: 3,
      name: 'Paneer Wrap',
      price: 45.5,
      oldPrice: 50.0,
      time: '10-15 mins',
      img: require('../../../../assets/b3.png'),
      description:
        'A flavorful burger with a spiced paneer patty, fresh veggies, and creamy mint mayo in a toasted bun. Perfect for those craving a hearty.',
      restaurant: 'Foodicated Cafe',
      isVeg: true,
    },
    {
      id: 4,
      name: 'Veg Pizza',
      price: 45.5,
      oldPrice: 50.0,
      time: '10-15 mins',
      img: require('../../../../assets/b1.png'),
      description:
        'A flavorful burger with a spiced paneer patty, fresh veggies, and creamy mint mayo in a toasted bun. Perfect for those craving a hearty.',
      restaurant: 'Foodicated Cafe',
      isVeg: true,
    },
  ];

  const nonVegFoodItems: FoodItem[] = [];

  const foodItems = vegNonVegFilter === 'Veg' ? vegFoodItems : nonVegFoodItems;

  const handleHeartPress = (id: number) => {
    if (!heartScales[id]) heartScales[id] = new Animated.Value(1);
    Animated.sequence([
      Animated.timing(heartScales[id], {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(heartScales[id], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    setLikedItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const handlePlusPress = (id: number) => {
    if (!plusScales[id]) plusScales[id] = new Animated.Value(1);
    Animated.sequence([
      Animated.timing(plusScales[id], {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(plusScales[id], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    setAddedItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const toggleFilter = (filterName: string) => {
    setFilters(prev => {
      if (prev.includes(filterName)) {
        return prev.filter(f => f !== filterName);
      } else {
        return [...prev, filterName];
      }
    });
  };

  const [appliedFilters, setAppliedFilters] = useState({
    sortBy: 'Price High to Low',
    TopPicks: 'Highly Recommended',
    DietaryPrefrence: 'Spicy',
  });

  const filterOptions = {
    sortBy: ['Price Low to High', 'Price High to Low'],
    TopPicks: ['Highly Recommended'],
    DietaryPrefrence: ['Spicy'],
  };

  const hasActiveFilters = () => {
    return Object.values(appliedFilters).some(filter => filter !== 'All');
  };

  const handleFoodItemPress = (food: FoodItem) => {
    setSelectedFood(food);
    setQuantity(1);
    setSelectedCheese([]);
    setCookingRequest('');
    setFoodModalVisible(true);
  };

  const toggleCheeseSelection = (cheese: string) => {
    setSelectedCheese(prev => {
      if (prev.includes(cheese)) {
        return prev.filter(c => c !== cheese);
      } else {
        if (prev.length < 2) {
          return [...prev, cheese];
        }
        return prev;
      }
    });
  };

  const handleAddToCart = () => {
    if (selectedFood) {
      console.log('Added to cart:', {
        food: selectedFood,
        cheese: selectedCheese,
        quantity,
        cookingRequest,
      });
      setAddedItems(prev => [...prev, selectedFood.id]);
      setFoodModalVisible(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const getTotalPrice = () => {
    if (!selectedFood) return 0;
    let basePrice = selectedFood.price;

    selectedCheese.forEach(cheese => {
      if (cheese === 'Single Cheese Slice') {
        basePrice += 25.0;
      } else if (cheese === 'Double Cheese Slice') {
        basePrice += 39.0;
      }
    });

    return basePrice * quantity;
  };

  const resetFilters = () => {
    setAppliedFilters({
      sortBy: 'Price High to Low',
      TopPicks: 'Highly Recommended',
      DietaryPrefrence: 'Spicy',
    });
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../../../../assets/emptycart.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>
        {vegNonVegFilter === 'NonVeg'
          ? "Non-veg option is not available here you can explore from veg option's."
          : "Veg option is not available here you can explore from non-veg option's."}
      </Text>
    </View>
  );

  const currentIcon =
    vegNonVegFilter === 'Veg'
      ? require('../../../../assets/leaf.png')
      : require('../../../../assets/nonveg.png');

  // Heart press handler for header back button heart with scale animation, color switch, and vibration
  const onHeaderHeartPress = () => {
    Vibration.vibrate(50);
    Animated.sequence([
      Animated.timing(headerHeartScale, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(headerHeartScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    setHeaderLiked(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* VEG/NON-VEG DROPDOWN MODAL */}
      <VegNonVegModal
        visible={vegNonVegDropdownVisible}
        onClose={() => setVegNonVegDropdownVisible(false)}
        vegNonVegFilter={vegNonVegFilter}
        setVegNonVegFilter={setVegNonVegFilter}
      />

      {/* FOOD ITEM DETAIL MODAL */}
      <FoodDetailModal
        foodModalVisible={foodModalVisible}
        setFoodModalVisible={setFoodModalVisible}
        selectedFood={selectedFood}
        selectedCheese={selectedCheese}
        toggleCheeseSelection={toggleCheeseSelection}
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        cookingRequest={cookingRequest}
        setCookingRequest={setCookingRequest}
        handleAddToCart={handleAddToCart}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== HEADER IMAGE & ICONS ===== */}
        <View style={styles.headerImgBox}>
          <Image
            source={require('../../../../assets/r1.png')}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require('../../../../assets/back.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Bistro Excellence</Text>

            <TouchableOpacity
              style={[
                styles.headerHeartBtn,
                headerLiked && styles.headerHeartBtnLiked,
              ]}
              onPress={onHeaderHeartPress}
              activeOpacity={0.8}
            >
              <Animated.Image
                source={
                  headerLiked
                    ? require('../../../../assets/heartfill.png')
                    : require('../../../../assets/heart.png')
                }
                style={[
                  styles.heartIcon,
                  { transform: [{ scale: headerHeartScale }] },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== RESTAURANT BADGE ===== */}
        <RestuarantBadge />

        {/* ===== SEARCH BAR ===== */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchRow}>
            <Image
              source={require('../../../../assets/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="search"
              placeholderTextColor="#999"
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.searchFilterContainer}
            onPress={() => navigation.navigate('MenuScreen')}
          >
            <Image
              source={require('../../../../assets/menu.png')}
              style={styles.searchFilterIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ===== CATEGORY BAR ===== */}
        <View style={styles.categoryHeader}>
          <Image source={currentIcon} style={styles.leafIcon} />
          <Text style={styles.availText}>Available options for {selectedItem}</Text>
          <Image
            source={
              vegNonVegFilter === 'Veg'
                ? require('../../../../assets/veg.png')
                : require('../../../../assets/nonveg.png')
            }
            style={styles.vegIcon}
          />
          <TouchableOpacity onPress={() => setVegNonVegDropdownVisible(true)}>
            <Image
              source={require('../../../../assets/dropdown.png')}
              style={styles.dropIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Show content only if items are available */}
        {foodItems.length > 0 ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categorySlider}
            >
              {categories.map(cat => {
                const selected = activeCategory === cat.name;
                return (
                  <TouchableOpacity
                    key={cat.name}
                    style={[
                      styles.categoryBtn,
                      selected && styles.categoryBtnActive,
                    ]}
                    onPress={() => setActiveCategory(cat.name)}
                  >
                    {selected ? (
                      <View style={styles.selectedIconCircle}>
                        <Image
                          source={cat.img}
                          style={styles.categoryIconSelected}
                        />
                      </View>
                    ) : (
                      <Image source={cat.img} style={styles.categoryIcon} />
                    )}
                    <Text
                      style={[
                        styles.categoryTxt,
                        selected && styles.categoryTxtActive,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* ===== FILTER TAGS ===== */}
            <FilterTags
              setShowFilterModal={setShowFilterModal}
              hasActiveFilters={hasActiveFilters}
              toggleFilter={toggleFilter}
              filters={filters}
            />

            {/* ===== RECOMMENDATION HEADER ===== */}
            <View style={styles.recommendHeaderRow}>
              <Image source={currentIcon} style={styles.recommendHeaderIcon} />
              <Text style={styles.recommendHeaderText}>Recommendation for you.</Text>
            </View>

            {/* FOOD GRID (Recommendation) */}
            <RecommendedFood
              foodItems={foodItems}
              likedItems={likedItems}
              heartScales={heartScales}
              plusScales={plusScales}
              handleHeartPress={handleHeartPress}
              handlePlusPress={handlePlusPress}
              handleFoodItemPress={handleFoodItemPress}
            />

            {/* ===== BEST IN CATEGORY ===== */}
            <View style={styles.bestBurgerHeaderRow}>
              <Image
                source={require('../../../../assets/popular.png')}
                style={styles.bestBurgerHeaderIcon}
              />
              <Text style={styles.bestBurgerHeaderText}>Best In {activeCategory}.</Text>
            </View>
            <BestInBurger
              foodItems={foodItems}
              likedItems={likedItems}
              heartScales={heartScales}
              plusScales={plusScales}
              handleHeartPress={handleHeartPress}
              handlePlusPress={handlePlusPress}
              handleFoodItemPress={handleFoodItemPress}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </ScrollView>

      <FilterModal
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        filterOptions={filterOptions}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
      />
    </View>
  );
};

export default RestaurentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('2%'),
  },
  headerImgBox: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: hp('24%'),
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: hp('24%'),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: hp('6%'),
    paddingHorizontal: wp('5%'),
    zIndex: 9,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: hp('6.5%'),
    textAlign: 'center',
    color: '#fff',
    fontSize: hp('2.2%'),
    letterSpacing: 0.6,
    textShadowColor: '#000',
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
  },
  backBtn: {
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: wp('50%'),
    padding: wp('1.5%'),
  },
  backIcon: {
    width: wp('5.5%'),
    height: wp('5.5%'),
    tintColor: '#fff',
  },
  headerHeartBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('6%'),
    padding: wp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 8,
  },
  headerHeartBtnLiked: {
    backgroundColor: '#fff',
  },
  heartIcon: {
    width: wp('4.3%'),
    height: wp('4.3%'),
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5.5%'),
    marginTop: hp('1.6%'),
    marginBottom: hp('0.4%'),
  },
  searchRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: wp('3.5%'),
    paddingHorizontal: wp('3.5%'),
    height: hp('5.5%'),
    elevation: 1,
  },
  searchIcon: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    tintColor: '#999',
    marginRight: wp('1.8%'),
  },
  input: {
    flex: 1,
    paddingVertical: hp('1%'),
    fontSize: hp('1.8%'),
    color: '#111',
    fontFamily: Platform.OS === 'android' ? 'Figtree-Regular' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '400',
  },
  searchFilterContainer: {
    backgroundColor: COLORS.primary,
    marginLeft: wp('3%'),
    padding: wp('2.5%'),
    borderRadius: wp('3.5%'),
    elevation: 2,
  },
  searchFilterIcon: {
    width: wp('5.5%'),
    height: wp('5.5%'),
    tintColor: '#fff',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5.5%'),
    marginTop: hp('1.3%'),
  },
  leafIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginRight: wp('1.8%'),
  },
  availText: {
    color: '#000',
    fontSize: hp('1.8%'),
    flex: 1,
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
  },
  vegIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginLeft: wp('1.8%'),
    marginRight: wp('1.2%'),
  },
  dropIcon: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    resizeMode: 'contain',
    tintColor: '#999',
  },
  categorySlider: {
    paddingVertical: hp('1.2%'),
    marginVertical: hp('0.3%'),
    marginLeft: wp('5.5%'),
  },
  categoryBtn: {
    backgroundColor: '#fff',
    borderRadius: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
    paddingVertical: hp('0.3%'),
    paddingHorizontal: wp('3%'),
    flexDirection: 'row',
    minHeight: hp('5%'),
  },
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
  },
  selectedIconCircle: {
    backgroundColor: '#fff',
    borderRadius: wp('50%'),
    width: wp('10%'),
    height: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2%'),
  },
  categoryIcon: {
    width: wp('10%'),
    height: wp('10%'),
    marginRight: wp('2%'),
  },
  categoryIconSelected: {
    width: wp('8%'),
    height: wp('8%'),
  },
  categoryTxt: {
    color: COLORS.primary,
    fontSize: hp('1.7%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
  },
  categoryTxtActive: {
    color: COLORS.secondary,
  },
  recommendHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5.5%'),
    marginTop: hp('1.8%'),
    marginBottom: hp('0.2%'),
  },
  recommendHeaderIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginRight: wp('1.5%'),
  },
  recommendHeaderText: {
    color: '#222',
    fontSize: hp('1.8%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
  },
  bestBurgerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5.5%'),
    marginBottom: hp('0.7%'),
    marginTop: hp('1.7%'),
  },
  bestBurgerHeaderIcon: {
    width: wp('4%'),
    height: wp('4%'),
    marginRight: wp('1.8%'),
  },
  bestBurgerHeaderText: {
    color: '#222',
    fontSize: hp('1.7%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('10%'),
    minHeight: hp('40%'),
  },
  emptyImage: {
    width: wp('90%'),
    height: wp('60%'),
    resizeMode: 'contain',
    marginBottom: hp('0%'),
  },
  emptyText: {
    fontSize: hp('2%'),
    color: '#666',
    textAlign: 'center',
    lineHeight: hp('3%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-Medium' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '500',
  },
});
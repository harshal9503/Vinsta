import React, { useState } from 'react';
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
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

  // Food Item Modal States
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [selectedCheese, setSelectedCheese] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [cookingRequest, setCookingRequest] = useState<string>('');

  const categories = [
    { name: 'Burger', img: require('../../../assets/burger.png') },
    { name: 'Maxican', img: require('../../../assets/mexican1.png') },
    { name: 'Asian', img: require('../../../assets/asian.png') },
  ];

  const vegFoodItems: FoodItem[] = [
    {
      id: 1,
      name: 'Spicy Paneer Burger',
      price: 250.0,
      oldPrice: 280.0,
      time: '10-15 mins',
      img: require('../../../assets/b1.png'),
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
      img: require('../../../assets/b2.png'),
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
      img: require('../../../assets/b3.png'),
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
      img: require('../../../assets/b1.png'),
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

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../../../assets/emptycart.png')}
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
      ? require('../../../assets/leaf.png')
      : require('../../../assets/nonveg.png');

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* CATEGORY DROPDOWN MODAL */}
      <Modal
        visible={dropdownVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            {categories.map(c => (
              <TouchableOpacity
                key={c.name}
                style={styles.dropdownItem}
                onPress={() => {
                  setActiveCategory(c.name);
                  setDropdownVisible(false);
                }}
              >
                <Image source={c.img} style={styles.dropdownIcon} />
                <Text
                  style={[
                    styles.dropdownText,
                    activeCategory === c.name
                      ? { color: COLORS.primary, fontWeight: '700' }
                      : undefined,
                  ]}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* VEG/NON-VEG DROPDOWN MODAL */}
      <Modal
        visible={vegNonVegDropdownVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setVegNonVegDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVegNonVegDropdownVisible(false)}
        >
          <View style={styles.vegDropdownMenu}>
            <TouchableOpacity
              style={styles.vegDropdownItem}
              onPress={() => {
                setVegNonVegFilter('Veg');
                setVegNonVegDropdownVisible(false);
              }}
            >
              <Image
                source={require('../../../assets/veg.png')}
                style={styles.vegDropdownIcon}
              />
              <Text
                style={[
                  styles.vegDropdownText,
                  vegNonVegFilter === 'Veg' && {
                    color: '#259E29',
                    fontWeight: '700',
                  },
                ]}
              >
                Veg
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.vegDropdownItem}
              onPress={() => {
                setVegNonVegFilter('NonVeg');
                setVegNonVegDropdownVisible(false);
              }}
            >
              <Image
                source={require('../../../assets/nonveg.png')}
                style={styles.vegDropdownIcon}
              />
              <Text
                style={[
                  styles.vegDropdownText,
                  vegNonVegFilter === 'NonVeg' && {
                    color: '#FE0505',
                    fontWeight: '700',
                  },
                ]}
              >
                Non-Veg
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* FOOD ITEM DETAIL MODAL */}
      <Modal
        visible={foodModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFoodModalVisible(false)}
      >
        <View style={styles.foodModalOverlay}>
          <Pressable
            style={styles.foodModalBackdrop}
            onPress={() => setFoodModalVisible(false)}
          />

          {/* Close Button - Half Outside/Half Inside Modal */}
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => setFoodModalVisible(false)}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../../assets/close.png')}
              style={styles.modalCloseIcon}
            />
          </TouchableOpacity>

          <View style={styles.foodModalContent}>
            {selectedFood && (
              <>
                {/* Header with Image */}
                <View style={styles.modalHeader}>
                  <Image
                    source={selectedFood.img}
                    style={styles.modalFoodImage}
                  />

                  {/* Rating Badge */}
                  <View style={styles.modalRatingBadge}>
                    <Image
                      source={require('../../../assets/star.png')}
                      style={styles.modalStarIcon}
                    />
                    <Text style={styles.modalRatingText}>4.4</Text>
                  </View>
                </View>

                {/* Scrollable Content */}
                <ScrollView
                  style={styles.modalScrollContent}
                  contentContainerStyle={styles.modalScrollContentContainer}
                  showsVerticalScrollIndicator={false}
                  bounces={true}
                >
                  {/* Veg/Non-Veg Badge and Spicy Tag */}
                  <View style={styles.modalBadgeRow}>
                    <Image
                      source={
                        selectedFood.isVeg
                          ? require('../../../assets/veg.png')
                          : require('../../../assets/nonveg.png')
                      }
                      style={styles.modalVegBadge}
                    />
                    <View style={styles.modalSpicyTag}>
                      <Image
                        source={require('../../../assets/spicy.png')}
                        style={styles.modalSpicyIcon}
                      />
                      <Text style={styles.modalSpicyText}>Spicy</Text>
                    </View>
                  </View>

                  {/* Food Name */}
                  <Text style={styles.modalFoodName}>{selectedFood.name}</Text>

                  {/* Restaurant Name */}
                  <Text style={styles.modalRestaurantName}>
                    {selectedFood.restaurant}
                  </Text>

                  {/* Description */}
                  <Text style={styles.modalDescription}>
                    {selectedFood.description}
                  </Text>

                  {/* Extra Cheese Section */}
                  <Text style={styles.modalSectionTitle}>Extra Cheese</Text>
                  <Text style={styles.modalSectionSubtitle}>
                    Select up to 2 option
                  </Text>

                  {/* Cheese Options */}
                  <TouchableOpacity
                    style={styles.modalOptionRow}
                    onPress={() => toggleCheeseSelection('Single Cheese Slice')}
                    activeOpacity={0.7}
                  >
                    <View style={styles.modalOptionLeft}>
                      <Image
                        source={require('../../../assets/veg.png')}
                        style={styles.modalOptionVegIcon}
                      />
                      <Text style={styles.modalOptionText}>
                        Single Cheese Slice
                      </Text>
                    </View>
                    <View style={styles.modalOptionRight}>
                      <Text style={styles.modalOptionPrice}>₹25.00</Text>
                      {selectedCheese.includes('Single Cheese Slice') ? (
                        <Image
                          source={require('../../../assets/tick.png')}
                          style={styles.modalTickIcon}
                        />
                      ) : (
                        <View style={styles.modalUncheckedCircle} />
                      )}
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalOptionRow}
                    onPress={() => toggleCheeseSelection('Double Cheese Slice')}
                    activeOpacity={0.7}
                  >
                    <View style={styles.modalOptionLeft}>
                      <Image
                        source={require('../../../assets/veg.png')}
                        style={styles.modalOptionVegIcon}
                      />
                      <Text style={styles.modalOptionText}>
                        Double Cheese Slice
                      </Text>
                    </View>
                    <View style={styles.modalOptionRight}>
                      <Text style={styles.modalOptionPrice}>₹39.00</Text>
                      {selectedCheese.includes('Double Cheese Slice') ? (
                        <Image
                          source={require('../../../assets/tick.png')}
                          style={styles.modalTickIcon}
                        />
                      ) : (
                        <View style={styles.modalUncheckedCircle} />
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Cooking Request */}
                  <Text style={styles.modalCookingRequestTitle}>
                    Add a cooking request (optional)
                  </Text>
                  <TextInput
                    style={styles.modalCookingInput}
                    placeholder="e.g. don't make it too spicy"
                    placeholderTextColor="#999"
                    value={cookingRequest}
                    onChangeText={setCookingRequest}
                    multiline
                    numberOfLines={4}
                  />
                </ScrollView>

                {/* Bottom Action Bar */}
                <View style={styles.modalBottomBar}>
                  {/* Quantity Control */}
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={decrementQuantity}
                    >
                      <Text style={styles.quantityBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={incrementQuantity}
                    >
                      <Text style={styles.quantityBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Add to Cart Button */}
                  <TouchableOpacity
                    style={styles.addToCartBtn}
                    onPress={handleAddToCart}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={require('../../../assets/bag.png')}
                      style={styles.bagIcon}
                    />
                    <Text style={styles.addToCartText}>ADD TO CART</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== HEADER IMAGE & ICONS ===== */}
        <View style={styles.headerImgBox}>
          <Image
            source={require('../../../assets/r1.png')}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.navigate('Search')}
            >
              <Image
                source={require('../../../assets/back.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Bistro Excellence</Text>
            <TouchableOpacity style={styles.headerHeartBtn}>
              <Image
                source={require('../../../assets/heart.png')}
                style={styles.heartIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== RESTAURANT BADGE ===== */}
        <View style={styles.curvedSection}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoCircle}>
              <Image
                source={require('../../../assets/be.png')}
                style={styles.logo}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.mapWrapper}>
            <Image
              source={require('../../../assets/map.png')}
              style={styles.mapIcon}
            />
          </TouchableOpacity>
          <Text style={styles.resName}>Bistro Excellence</Text>
          <View style={styles.locationRow}>
            <Image
              source={require('../../../assets/location1.png')}
              style={styles.locIcon}
            />
            <Text style={styles.locationText}>
              Near MC College, Barpeta Town
            </Text>
          </View>
          <View style={styles.statsRow}>
            <Image
              source={require('../../../assets/leaf.png')}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>590.0 m</Text>
            <Image
              source={require('../../../assets/clockk.png')}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>25 min</Text>
            <Image
              source={require('../../../assets/order.png')}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>5000+ Order</Text>
          </View>
        </View>

        {/* ===== SEARCH BAR ===== */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchRow}>
            <Image
              source={require('../../../assets/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="search"
              placeholderTextColor="#999"
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.searchFilterContainer}
            onPress={() => navigation.navigate('MenuScreen')}
          >
            <Image
              source={require('../../../assets/menu.png')}
              style={styles.searchFilterIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ===== CATEGORY BAR ===== */}
        <View style={styles.categoryHeader}>
          <Image source={currentIcon} style={styles.leafIcon} />
          <Text style={styles.availText}>
            Available options for {selectedItem}
          </Text>
          <Image
            source={
              vegNonVegFilter === 'Veg'
                ? require('../../../assets/veg.png')
                : require('../../../assets/nonveg.png')
            }
            style={styles.vegIcon}
          />
          <TouchableOpacity onPress={() => setVegNonVegDropdownVisible(true)}>
            <Image
              source={require('../../../assets/dropdown.png')}
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
            <View style={styles.filtersWrapper}>
              <View style={styles.filterTagFixed}>
                <Image
                  source={require('../../../assets/filter3.png')}
                  style={styles.filterTagIcon}
                />
                <Text style={styles.filterTagText}>Filter (1)</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScrollView}
                contentContainerStyle={styles.filterScrollContent}
              >
                <TouchableOpacity
                  style={styles.filterTag}
                  onPress={() => toggleFilter('Spicy')}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require('../../../assets/spicy.png')}
                    style={styles.filterTagIcon}
                  />
                  <Text style={styles.filterTagText}>Spicy</Text>
                  {filters.includes('Spicy') && (
                    <Image
                      source={require('../../../assets/close.png')}
                      style={[styles.closeIcon]}
                    />
                  )}
                </TouchableOpacity>

                <View style={styles.filterTag}>
                  <Image
                    source={require('../../../assets/popular.png')}
                    style={styles.filterTagIcon}
                  />
                  <Text style={styles.filterTagText}>Offer's</Text>
                </View>

                <View style={styles.filterTag}>
                  <Image
                    source={require('../../../assets/vegan.png')}
                    style={styles.filterTagIcon}
                  />
                  <Text style={styles.filterTagText}>Vegan</Text>
                </View>
              </ScrollView>
            </View>

            {/* ===== RECOMMENDATION HEADER ===== */}
            <View style={styles.recommendHeaderRow}>
              <Image source={currentIcon} style={styles.recommendHeaderIcon} />
              <Text style={styles.recommendHeaderText}>
                Recommendation for you.
              </Text>
            </View>

            {/* FOOD GRID (Recommendation) */}
            <View style={styles.grid}>
              {foodItems.map(f => (
                <View key={f.id} style={styles.foodCard}>
                  <TouchableOpacity
                    style={[styles.heartWrapper, styles.heartWrapperBack]}
                    onPress={() => handleHeartPress(f.id)}
                  >
                    <Animated.Image
                      source={
                        likedItems.includes(f.id)
                          ? require('../../../assets/heartfill.png')
                          : require('../../../assets/heart.png')
                      }
                      style={[
                        styles.heartIconSmall,
                        { transform: [{ scale: heartScales[f.id] || 1 }] },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleFoodItemPress(f)}
                  >
                    <Image source={f.img} style={styles.foodImg} />
                    <View style={styles.foodRatingBadge}>
                      <Image
                        source={require('../../../assets/star.png')}
                        style={styles.starIcon}
                      />
                      <Text style={styles.ratingText}>4.4</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{f.name}</Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.price}>₹ {f.price.toFixed(2)}</Text>
                      <Text style={styles.oldPrice}>
                        ₹ {f.oldPrice.toFixed(2)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handlePlusPress(f.id)}
                        style={styles.plusBtn}
                      >
                        <Animated.Image
                          source={require('../../../assets/plus.png')}
                          style={[
                            styles.plusIcon,
                            { transform: [{ scale: plusScales[f.id] || 1 }] },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.timeRow}>
                      <Image
                        source={require('../../../assets/clock.png')}
                        style={styles.clockIcon}
                      />
                      <Text style={styles.timeText}>{f.time}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* ===== BEST IN CATEGORY ===== */}
            <View style={styles.bestBurgerHeaderRow}>
              <Image
                source={require('../../../assets/popular.png')}
                style={styles.bestBurgerHeaderIcon}
              />
              <Text style={styles.bestBurgerHeaderText}>
                Best In {activeCategory}.
              </Text>
            </View>
            <View style={styles.grid}>
              {foodItems.map(f => (
                <View key={`best-${f.id}`} style={styles.foodCard}>
                  <TouchableOpacity
                    style={styles.heartWrapper}
                    onPress={() => handleHeartPress(f.id)}
                  >
                    <Animated.Image
                      source={
                        likedItems.includes(f.id)
                          ? require('../../../assets/heartfill.png')
                          : require('../../../assets/heart.png')
                      }
                      style={[
                        styles.heartIconSmall,
                        { transform: [{ scale: heartScales[f.id] || 1 }] },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleFoodItemPress(f)}
                  >
                    <Image source={f.img} style={styles.foodImg} />
                    <View style={styles.foodRatingBadge}>
                      <Image
                        source={require('../../../assets/star.png')}
                        style={styles.starIcon}
                      />
                      <Text style={styles.ratingText}>4.4</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{f.name}</Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.price}>₹ {f.price.toFixed(2)}</Text>
                      <Text style={styles.oldPrice}>
                        ₹ {f.oldPrice.toFixed(2)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handlePlusPress(f.id)}
                        style={styles.plusBtn}
                      >
                        <Animated.Image
                          source={require('../../../assets/plus.png')}
                          style={[
                            styles.plusIcon,
                            { transform: [{ scale: plusScales[f.id] || 1 }] },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.timeRow}>
                      <Image
                        source={require('../../../assets/clockk.png')}
                        style={styles.clockIcon}
                      />
                      <Text style={styles.timeText}>{f.time}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <EmptyState />
        )}
      </ScrollView>
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
    fontWeight: '700',
    letterSpacing: 0.6,
    textShadowColor: '#000',
    textShadowRadius: 4,
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
  heartIcon: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    tintColor: '#fff',
  },

  curvedSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    marginTop: hp('-2.2%'),
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingBottom: hp('1.2%'),
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 4,
  },

  logoWrapper: {
    marginTop: hp('-3.8%'),
    marginBottom: hp('1%'),
    alignSelf: 'center',
  },
  logoCircle: {
    backgroundColor: '#FFDB56',
    borderRadius: wp('7%'),
    padding: wp('3.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  logo: {
    width: wp('11%'),
    height: wp('11%'),
    resizeMode: 'contain',
  },
  mapWrapper: {
    position: 'absolute',
    top: hp('1.3%'),
    right: wp('4%'),
    zIndex: 2,
  },
  mapIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  resName: {
    fontSize: hp('2%'),
    fontWeight: '700',
    color: '#222',
    marginTop: hp('0.5%'),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.6%'),
    marginBottom: hp('0.3%'),
  },
  locIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginRight: wp('1.5%'),
  },
  locationText: {
    color: '#888',
    fontSize: hp('1.5%'),
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.6%'),
    justifyContent: 'center',
    gap: wp('3%'),
  },
  statIcon: {
    width: wp('3.2%'),
    height: wp('3.2%'),
    marginRight: wp('0.8%'),
  },
  statText: {
    fontSize: hp('1.4%'),
    color: '#222',
    fontWeight: '400',
    marginRight: wp('2.5%'),
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
    fontWeight: '600',
    color: '#000',
    fontSize: hp('1.8%'),
    flex: 1,
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
    fontWeight: '600',
    fontSize: hp('1.7%'),
  },
  categoryTxtActive: {
    color: COLORS.secondary,
  },

  filtersWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.3%'),
    marginHorizontal: wp('5.5%'),
  },
  filterTagFixed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: FILTER_TAG_COLORS.background,
    borderColor: FILTER_TAG_COLORS.border,
    borderWidth: 1.1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('0.8%'),
    marginRight: wp('2.5%'),
  },
  filterScrollView: {
    flex: 1,
  },
  filterScrollContent: {
    alignItems: 'center',
    gap: wp('2.5%'),
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: FILTER_TAG_COLORS.background,
    borderColor: FILTER_TAG_COLORS.border,
    borderWidth: 1.1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('0.8%'),
  },
  filterTagIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginRight: wp('1%'),
  },
  filterTagText: {
    color: '#000',
    fontWeight: '600',
    fontSize: hp('1.5%'),
  },
  closeIcon: {
    width: wp('3%'),
    height: wp('3%'),
    marginLeft: wp('1.5%'),
    tintColor: '#000',
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
    fontWeight: '700',
    color: '#222',
    fontSize: hp('1.8%'),
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: wp('5.5%'),
    marginTop: hp('0.7%'),
  },
  foodCard: {
    width: wp('44%'),
    backgroundColor: '#fff',
    borderRadius: wp('4.5%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  heartWrapper: {
    position: 'absolute',
    right: wp('3%'),
    top: hp('1.2%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('5%'),
    padding: wp('1.8%'),
    zIndex: 8,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  heartWrapperBack: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heartIconSmall: {
    width: wp('3.8%'),
    height: wp('3.8%'),
    tintColor: '#fff',
  },
  foodImg: {
    width: '100%',
    height: hp('13%'),
    borderTopLeftRadius: wp('4.5%'),
    borderTopRightRadius: wp('4.5%'),
  },
  foodRatingBadge: {
    position: 'absolute',
    bottom: hp('1%'),
    right: wp('3%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('1.5%'),
    paddingVertical: hp('0.4%'),
  },
  starIcon: {
    width: wp('3%'),
    height: wp('3%'),
    tintColor: '#fff',
    marginRight: wp('1%'),
  },
  ratingText: {
    color: '#fff',
    fontSize: hp('1.3%'),
    fontWeight: '600',
  },

  foodInfo: {
    padding: wp('2.5%'),
    paddingTop: hp('0.8%'),
  },
  foodName: {
    fontWeight: '700',
    color: '#222',
    fontSize: hp('1.6%'),
    marginBottom: hp('0.3%'),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('0.2%'),
  },
  price: {
    fontWeight: '700',
    color: '#222',
    fontSize: hp('1.6%'),
  },
  oldPrice: {
    fontSize: hp('1.3%'),
    color: '#FA463D',
    textDecorationLine: 'line-through',
    marginLeft: wp('1%'),
  },
  plusBtn: {
    backgroundColor: COLORS.primary,
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('2%'),
  },
  plusIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    tintColor: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.6%'),
    gap: wp('1.8%'),
  },
  clockIcon: {
    width: wp('3.2%'),
    height: wp('3.2%'),
    tintColor: COLORS.primary,
  },
  timeText: {
    fontSize: hp('1.3%'),
    color: '#666',
    fontWeight: '600',
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
    fontWeight: '700',
    color: '#222',
    fontSize: hp('1.7%'),
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('6%'),
    elevation: 5,
    minWidth: wp('40%'),
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  dropdownIcon: {
    width: wp('4.8%'),
    height: wp('4.8%'),
    marginRight: wp('3.5%'),
  },
  dropdownText: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
    color: '#232323',
  },

  vegDropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('6%'),
    elevation: 5,
    minWidth: wp('40%'),
  },
  vegDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.2%'),
  },
  vegDropdownIcon: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    marginRight: wp('3%'),
  },
  vegDropdownText: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
    color: '#232323',
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
    fontWeight: '500',
  },

  // FOOD MODAL STYLES
  foodModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  foodModalBackdrop: {
    flex: 1,
  },
  foodModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    height: Platform.OS === 'ios' ? hp('82%') : hp('80%'),
    paddingBottom: Platform.OS === 'ios' ? hp('2%') : 0,
  },
  modalHeader: {
    position: 'relative',
  },
  modalFoodImage: {
    width: '100%',
    height: Platform.OS === 'ios' ? hp('22%') : hp('20%'),
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    resizeMode: 'cover',
  },
  // Close Button - Half Outside Modal
  modalCloseBtn: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? hp('82%') - wp('6%') : hp('80%') - wp('6%'),
    left: '50%',
    marginLeft: -wp('6%'), // Half of button width to center it
    zIndex: 999,
    backgroundColor: '#fff',
    borderRadius: wp('50%'),
    padding: wp('2%'),
    width: wp('12%'),
    height: wp('12%'),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  modalCloseIcon: {
    width: wp('15%'),
    height: wp('15%'),
    tintColor: COLORS.primary,
    resizeMode: 'contain',
  },
  modalRatingBadge: {
    position: 'absolute',
    bottom: hp('1.5%'),
    right: wp('5%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.6%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalStarIcon: {
    width: wp('3.2%'),
    height: wp('3.2%'),
    tintColor: '#fff',
    marginRight: wp('1%'),
    resizeMode: 'contain',
  },
  modalRatingText: {
    color: '#fff',
    fontSize: hp('1.5%'),
    fontWeight: '700',
  },
  modalScrollContent: {
    flex: 1,
    marginTop: wp('2%'),
  },
  modalScrollContentContainer: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('1%'),
    paddingBottom: hp('3%'),
  },
  modalBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  modalVegBadge: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    marginRight: wp('2%'),
    resizeMode: 'contain',
  },
  modalSpicyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: FILTER_TAG_COLORS.background,
    borderColor: FILTER_TAG_COLORS.border,
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
  },
  modalSpicyIcon: {
    width: wp('3%'),
    height: wp('3%'),
    marginRight: wp('1%'),
    resizeMode: 'contain',
  },
  modalSpicyText: {
    color: FILTER_TAG_COLORS.text,
    fontSize: hp('1.4%'),
    fontWeight: '600',
  },
  modalFoodName: {
    fontSize: hp('2.4%'),
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('0.5%'),
    lineHeight: hp('2.8%'),
  },
  modalRestaurantName: {
    fontSize: hp('1.6%'),
    fontWeight: '500',
    color: '#666',
    marginBottom: hp('1.2%'),
  },
  modalDescription: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: '#555',
    lineHeight: hp('2.3%'),
    marginBottom: hp('2%'),
  },
  modalSectionTitle: {
    fontSize: hp('1.9%'),
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('0.4%'),
    marginTop: hp('0.5%'),
  },
  modalSectionSubtitle: {
    fontSize: hp('1.5%'),
    fontWeight: '400',
    color: '#888',
    marginBottom: hp('1.2%'),
  },
  modalOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.6%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalOptionVegIcon: {
    width: wp('4%'),
    height: wp('4%'),
    marginRight: wp('2.5%'),
    resizeMode: 'contain',
  },
  modalOptionText: {
    fontSize: hp('1.65%'),
    fontWeight: '600',
    color: '#000',
  },
  modalOptionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOptionPrice: {
    fontSize: hp('1.65%'),
    fontWeight: '700',
    color: '#000',
    marginRight: wp('3%'),
  },
  modalTickIcon: {
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: 'contain',
  },
  modalUncheckedCircle: {
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: '#CCC',
  },
  modalCookingRequestTitle: {
    fontSize: hp('1.7%'),
    fontWeight: '600',
    color: '#000',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  modalCookingInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: wp('3%'),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: wp('4%'),
    paddingVertical: Platform.OS === 'ios' ? hp('1.5%') : hp('1.2%'),
    fontSize: hp('1.55%'),
    color: '#000',
    height: Platform.OS === 'ios' ? hp('10%') : hp('11%'),
    textAlignVertical: 'top',
  },
  modalBottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingVertical: Platform.OS === 'ios' ? hp('1.8%') : hp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F3',
    borderColor: '#FFE0C8',
    borderWidth: 1.5,
    borderRadius: wp('3%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
  },
  quantityBtn: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.2%'),
  },
  quantityBtnText: {
    fontSize: hp('2.8%'),
    fontWeight: '700',
    color: COLORS.primary,
  },
  quantityText: {
    fontSize: hp('2.1%'),
    fontWeight: '700',
    color: '#000',
    marginHorizontal: wp('4%'),
    minWidth: wp('7%'),
    textAlign: 'center',
  },
  addToCartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: wp('3%'),
    paddingVertical: Platform.OS === 'ios' ? hp('1.8%') : hp('1.9%'),
    marginLeft: wp('4%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bagIcon: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: '#fff',
    marginRight: wp('2%'),
    resizeMode: 'contain',
  },
  addToCartText: {
    fontSize: hp('1.85%'),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});

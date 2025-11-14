import React, { useContext, useState } from 'react';
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
  Modal,
} from 'react-native';
import { COLORS, FONT_STYLES } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import font from '../../assets/fonts'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ThemeContext } from '../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

// Calculate responsive dimensions with iOS optimizations
const isTablet = width >= 768;
const isSmallScreen = width < 380;
const screenRatio = width / height;
const isIOS = Platform.OS === 'ios';

// iOS-specific font scaling
const fontScale = size => {
  if (isIOS) {
    return isTablet ? size * 0.85 : size * 0.95;
  }
  return isTablet ? size * 0.85 : size;
};

// iOS-specific dimension scaling
const scaleSize = size => {
  if (isIOS) {
    return isTablet ? size * 0.9 : size * 1.02;
  }
  return size;
};

const categories = [
  { name: 'Burger', img: require('../../assets/burger.png') },
  { name: 'Mexican', img: require('../../assets/burger.png') },
  { name: 'Asian', img: require('../../assets/burger.png') },
  { name: 'Donut', img: require('../../assets/donut.png') },
];

// Separate veg and non-veg restaurants
const vegRestaurants = [
  {
    id: 1,
    name: 'Bistro Excellence',
    img: require('../../assets/featuredrestaurant.png'),
    rating: 4.4,
    deliveryTime: '10-15 mins',
    tags: ['Burger', 'Chicken', 'FastFood'],
  },
  {
    id: 2,
    name: 'Elite-Ember',
    img: require('../../assets/featuredrestaurant.png'),
    rating: 4.4,
    deliveryTime: '10-15 mins',
    tags: ['Burger', 'Chicken', 'FastFood'],
  },
];

const nonVegRestaurants = [
  {
    id: 2,
    name: 'Elite-Ember',
    img: require('../../assets/featuredrestaurant.png'),
    rating: 4.4,
    deliveryTime: '10-15 mins',
    tags: ['Chicken', 'Mutton', 'Seafood'],
  },
  {
    id: 1,
    name: 'Bistro Excellence',
    img: require('../../assets/featuredrestaurant.png'),
    rating: 4.4,
    deliveryTime: '10-15 mins',
    tags: ['Chicken', 'Mutton', 'Seafood'],
  },
];

// Separate veg and non-veg products
const vegProducts = [
  {
    id: 1,
    name: 'Veg Cheese Burger',
    price: '$45.50',
    img: require('../../assets/b1.png'),
    oldPrice: '$50.50',
    rating: 4.4,
    deliveryTime: '10-15 mins',
  },
  {
    id: 2,
    name: 'Veg Delight Burger',
    price: '$45.50',
    img: require('../../assets/b2.png'),
    oldPrice: '$50.50',
    rating: 4.4,
    deliveryTime: '10-15 mins',
  },
  {
    id: 3,
    name: 'Garden Fresh Burger',
    price: '$45.50',
    img: require('../../assets/b1.png'),
    oldPrice: '$50.50',
    rating: 4.4,
    deliveryTime: '10-15 mins',
  },
  {
    id: 4,
    name: 'Veggie Supreme',
    price: '$45.50',
    img: require('../../assets/b3.png'),
    oldPrice: '$50.50',
    rating: 4.4,
    deliveryTime: '10-15 mins',
  },
];

const nonVegProducts = [
  {
    id: 1,
    name: 'Chicken Deluxe',
    price: '$55.50',
    img: require('../../assets/non1.png'),
    oldPrice: '$60.50',
    rating: 4.4,
    deliveryTime: '10-15 mins',
  },
  {
    id: 2,
    name: 'Beef Special',
    price: '$65.50',
    img: require('../../assets/non2.png'),
    oldPrice: '$70.50',
    rating: 4.4,
    deliveryTime: '10-15 mins',
  },
  {
    id: 3,
    name: 'Mutton Classic',
    price: '$75.50',
    img: require('../../assets/non3.png'),
    oldPrice: '$80.50',
    rating: 4.4,
    deliveryTime: '10-15 mins',
  },
  {
    id: 4,
    name: 'Seafood Combo',
    price: '$85.50',
    img: require('../../assets/non1.png'),
    oldPrice: '$90.50',
    rating: 4.4,
    deliveryTime: '10-15 mins',
  },
];
const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Burger');
  const navigation = useNavigation<any>();
  const [isVegMode, setIsVegMode] = useState(true);
  const toggleAnim = useState(new Animated.Value(0))[0];
  const insets = useSafeAreaInsets();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useContext(ThemeContext);



  const toggleSwitch = () => {
    Animated.timing(toggleAnim, {
      toValue: isVegMode ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsVegMode(!isVegMode);
  };

  // Calculate proper toggle dimensions
  const switchWidth = isTablet ? scaleSize(wp('14%')) : scaleSize(wp('17%'));
  const switchHeight = isTablet ? hp('3.5%') : hp('4%');
  const circleSize = isTablet ? hp('2.8%') : hp('3.2%');
  const padding = wp('0.8%');
  const maxTranslateX = switchWidth - circleSize - padding * 2;

  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [padding, maxTranslateX],
  });

  const toggleBgColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['green', 'red'],
  });

  // Navigation handlers
  const handleTodayOfferViewAll = () => {
    navigation.navigate('todayOfferView');
  };

  const handleViewOffers = () => {
    navigation.navigate('todayOfferView');
  };

  const handleFeaturedRestaurantViewAll = () => {
    navigation.navigate('featuredRestrorents');
  };

  const handleBestBurgerViewAll = () => {
    navigation.navigate('bestBurger');
  };

  const handleProductPress = product => {
    navigation.navigate('fooddetails', { product });
  };

  const handleWalletPress = () => {
    navigation.navigate('Wallet');
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  // Calculate proper status bar height for both platforms
  const getStatusBarHeight = () => {
    if (isIOS) {
      return Math.max(insets.top, 20);
    } else {
      return StatusBar.currentHeight || 0;
    }
  };

  // const getFilteredRestaurants = () => {
  //   let filtered = allRestaurants;

  //   // Apply search filter
  //   if (searchQuery.trim() !== '') {
  //     filtered = filtered.filter(restaurant =>
  //       restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  //     );
  //   }

  //   // Apply category filter
  //   if (appliedFilters.category !== 'All') {
  //     filtered = filtered.filter(restaurant => restaurant.category === appliedFilters.category);
  //   }

  //   // Apply rating filter
  //   if (appliedFilters.rating !== 'All') {
  //     const minRating = parseFloat(appliedFilters.rating.replace('+', ''));
  //     filtered = filtered.filter(restaurant => restaurant.rating >= minRating);
  //   }

  //   // Apply price range filter
  //   if (appliedFilters.priceRange !== 'All') {
  //     filtered = filtered.filter(restaurant => restaurant.priceRange === appliedFilters.priceRange);
  //   }

  //   // Apply delivery time filter
  //   if (appliedFilters.deliveryTime !== 'All') {
  //     if (appliedFilters.deliveryTime === 'Under 15 mins') {
  //       filtered = filtered.filter(restaurant => {
  //         const maxTime = parseInt(restaurant.deliveryTime.split('-')[1]);
  //         return maxTime <= 15;
  //       });
  //     } else if (appliedFilters.deliveryTime === 'Under 20 mins') {
  //       filtered = filtered.filter(restaurant => {
  //         const maxTime = parseInt(restaurant.deliveryTime.split('-')[1]);
  //         return maxTime <= 20;
  //       });
  //     }
  //   }

  //   return filtered;
  // };

  const handleRestaurantPress = (restaurant: any) => {
    navigation.navigate('restaurentDetails', { restaurant });
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const resetFilters = () => {
    setAppliedFilters({
      category: 'All',
      rating: 'All',
      priceRange: [100, 650],
      sortBy: 'Recent',
    });
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  // Get current restaurants and products based on mode
  const getCurrentRestaurants = () => {
    return isVegMode ? vegRestaurants : nonVegRestaurants;
  };

  const getCurrentProducts = () => {
    return isVegMode ? vegProducts : nonVegProducts;
  };

  const [appliedFilters, setAppliedFilters] = useState({
    category: 'All',
    rating: 'All',
    priceRange: [100, 650],
    sortBy: 'Recent',
  });


  const filterOptions = {
    category: ['All', 'Cold Drink', 'Fast Food', 'Paneer'],
    rating: ['All', '4.0', '4.5'],
    priceRange: [0, 1000],
    sortBy: ['Popular', 'Recent', 'Price High', 'Price Low'],
  };

  const hasActiveFilters = () => {
    return Object.values(appliedFilters).some(filter => filter !== 'All');
  };
  return (
    <View style={[styles.container,{backgroundColor: theme.background}]}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content"
        translucent={false}
      />

      <View style={[styles.statusBarArea, { height: getStatusBarHeight() }]} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={isIOS}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.rowJustify}>
            <View style={styles.locationContainer}>
              <View style={styles.locationRow}>
                <Image
                  source={require('../../assets/location.png')}
                  style={[styles.icon,{tintColor : theme.background}]}
                />
                <Text style={[styles.locationText,{color : theme.background}]}>Location</Text>
                <Image
                  source={require('../../assets/dropdown.png')}
                  style={[styles.dropdownIcon,{tintColor : theme.background}]}
                />
              </View>
              <Text style={[styles.addressText,{color : theme.background}]}>4102 Pretty View Lane</Text>
            </View>
            <View style={styles.walletBagRow}>
              <TouchableOpacity
                style={[styles.walletBtn,{backgroundColor: theme.background}]}
                activeOpacity={0.7}
                onPress={handleWalletPress}
              >
                <Image
                  source={require('../../assets/wallet.png')}
                  style={styles.walletIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.bagBtn,{backgroundColor: theme.background}]}
                activeOpacity={0.7}
                onPress={handleCartPress}
              >
                <Image
                  source={require('../../assets/bag.png')}
                  style={styles.bagIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.titleRow}>
            <Text style={[styles.headerTitle,{color : theme.background}]}>
              What you{'\n'}Going eat for today ?
            </Text>
            <View style={styles.vegContainer}>
              <TouchableOpacity
                style={[
                  styles.switchOuter,
                  {
                    width: switchWidth,
                    height: switchHeight,
                  },
                ]}
                onPress={toggleSwitch}
                activeOpacity={0.8}
              >
                <View style={styles.switchBackground} />

                <Animated.View
                  style={[
                    styles.switchCircle,
                    {
                      width: circleSize,
                      height: circleSize,
                      borderRadius: circleSize / 2,
                      transform: [{ translateX }],
                      backgroundColor: toggleBgColor,
                    },
                  ]}
                />

                <View style={styles.switchLabelsContainer}>
                  <Text
                    style={[
                      styles.switchTextLeft,
                      {
                        color: isVegMode ? '#fff' : '#000',
                        fontWeight: isVegMode ? '700' : '500',
                      },
                    ]}
                  >
                    OFF
                  </Text>
                  <Text
                    style={[
                      styles.switchTextRight,
                      {
                        color: !isVegMode ? '#fff' : '#000',
                        fontWeight: !isVegMode ? '700' : '500',
                      },
                    ]}
                  >
                    ON
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={[styles.vegModeTxt,{color : theme.background}]}>
                {isVegMode ? 'Veg Mode' : 'Non-Veg Mode'}
              </Text>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={[styles.searchBarContainer,{backgroundColor: theme.background}]}
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/search.png')}
                style={styles.searchIcon}
              />
              <Text style={[styles.searchPlaceholder,{color : theme.text}]}>
                Find for food or restaurant...
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filterBtn,{backgroundColor: theme.background}]} activeOpacity={0.8} onPress={() => setShowFilterModal(true)}>
              <Image
                source={require('../../assets/filter.png')}
                style={styles.filterIcon}
              />
              {hasActiveFilters() && <View style={styles.filterDot} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View style={[styles.mainContent,{backgroundColor: theme.background}]}>
          {/* Today's Offers */}
          <View style={styles.sectionRowBetween}>
            <Text style={[styles.sectionTitle,{color : theme.text}]}>Today's Offer's</Text>
            <TouchableOpacity
              onPress={handleTodayOfferViewAll}
              activeOpacity={0.7}
            >
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Offer Card */}
          <View style={styles.offerCard}>
            <View style={styles.offerContent}>
              <Text style={styles.offerHeader}>Free Delivery</Text>
              <Text style={styles.offerSubTxt}>
                Enjoy exclusive discount on tasty{'\n'}food today!
              </Text>
              <TouchableOpacity
                style={styles.offerButton}
                onPress={handleViewOffers}
                activeOpacity={0.8}
              >
                <Text style={styles.offerBtnText}>VIEW OFFER'S</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.offerImageWrap}>
              <Image
                source={require('../../assets/todayoffer.png')}
                style={styles.offerImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categorySliderContent}
            bounces={false}
          >
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.name}
                style={[
                  styles.categoryBtn,
                  selectedCategory === cat.name && styles.categoryBtnActive,
                ]}
                onPress={() => setSelectedCategory(cat.name)}
                activeOpacity={0.8}
              >
                <Image
                  source={cat.img}
                  style={styles.categoryIcon}
                  resizeMode="contain"
                />
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
              {/* <Image
                source={require('../../assets/feature.png')}
                style={styles.sectionIcon}
                resizeMode="contain"
              /> */}
              <Text style={[styles.sectionTitle,{color : theme.text}]}>Featured restaurants</Text>
            </View>
            <TouchableOpacity
              onPress={handleFeaturedRestaurantViewAll}
              activeOpacity={0.7}
            >
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.restaurantScrollContent}
            bounces={false}
          >
            {getCurrentRestaurants().map(restaurant => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.restaurantCard}
                onPress={() => handleRestaurantPress(restaurant)}
                activeOpacity={0.8}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={restaurant.img}
                    style={styles.restaurantImg}
                    resizeMode="cover"
                  />

                  <TouchableOpacity
                    style={styles.iconWrapper}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={require('../../assets/heart.png')}
                      style={styles.heartIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  <View style={styles.ratingBadge}>
                    <Image
                      source={require('../../assets/star.png')}
                      style={styles.starIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                </View>

                <Text style={styles.restaurantTitle}>{restaurant.name}</Text>

                <View style={styles.restaurantInfoRow}>
                  <Image
                    source={require('../../assets/bike.png')}
                    style={styles.infoIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.infoTxt}>free delivery</Text>
                  <Image
                    source={require('../../assets/clock.png')}
                    style={styles.infoIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.infoTxt}>{restaurant.deliveryTime}</Text>
                </View>

                <View style={styles.tagsContainer}>
                  {restaurant.tags.map((tag, index) => (
                    <Text key={index} style={styles.restaurantTags}>
                      {tag}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Best-Rated Burgers */}
          <View style={styles.sectionRowBetween}>
            <View style={styles.sectionTitleRow}>
              <Image
                source={require('../../assets/popular.png')}
                style={styles.sectionIcon}
                resizeMode="contain"
              />
              <Text style={[styles.sectionTitle,{color : theme.text}]}>
                {isVegMode ? 'Best-Rated Burgers' : 'Best-Rated Non-Veg'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleBestBurgerViewAll}
              activeOpacity={0.7}
            >
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={getCurrentProducts()}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productGrid}
            columnWrapperStyle={styles.productRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.productCard,{backgroundColor : theme.cardBackground}]}
                onPress={() => handleProductPress(item)}
                activeOpacity={0.8}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={item.img}
                    style={styles.productImg}
                    resizeMode="cover"
                  />

                  <TouchableOpacity
                    style={styles.productHeartWrapper}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={require('../../assets/heart.png')}
                      style={styles.heartIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  <View style={styles.productRatingBadge}>
                    <Image
                      source={require('../../assets/star.png')}
                      style={styles.starIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>

                <Text style={styles.productTitle} numberOfLines={2}>
                  {item.name}
                </Text>

                <View style={styles.priceRow}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                  </View>

                  <TouchableOpacity style={styles.plusBtn} activeOpacity={0.7}>
                    <Image
                      source={require('../../assets/plus.png')}
                      style={styles.plusIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.deliveryTimeRow}>
                  <Image
                    source={require('../../assets/clock.png')}
                    style={styles.infoIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.infoTxt}>{item.deliveryTime}</Text>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* Bottom info */}
          <View style={styles.bottomRow}>
            <Image
              source={require('../../assets/walk.png')}
              style={styles.bottomImage}
              resizeMode="contain"
            />
            <View style={styles.bottomTextContainer}>
              <Text style={styles.reachingTxt}>Reaching at your doorstep</Text>
              <View style={styles.deliveryTimeContainer}>
                <Image
                  source={require('../../assets/clock.png')}
                  style={styles.deliveryClockIcon}
                  resizeMode="contain"
                />
                <Text style={styles.getDeliveredTxt}>
                  Get delivered in 15 minutes
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort & Filter</Text>
              <View style={{ height: 1, width: '85%', backgroundColor: '#dadada' }}></View>

              {/* Close icon outside header (overlapping) */}
              <TouchableOpacity
                onPress={() => setShowFilterModal(false)}
                style={styles.closeButtonWrapper}
              >
                <Image
                  source={require('../../assets/close1.png')}
                  style={styles.closeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
              {/* Category Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Category</Text>

                <FlatList
                  data={filterOptions.category}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item}
                  contentContainerStyle={{ paddingVertical: 6 }}
                  renderItem={({ item }) => {
                    const isActive = appliedFilters.category === item;
                    return (
                      <TouchableOpacity
                        style={[
                          styles.filterOption,
                          isActive && styles.activeFilterOption,
                          { marginRight: 10 }, // space between items
                        ]}
                        onPress={() =>
                          setAppliedFilters({ ...appliedFilters, category: item })
                        }
                      >
                        <Text
                          style={[
                            styles.filterOptionText,
                            isActive && styles.activeFilterOptionText,
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>


              {/* Price Range Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Price Range</Text>

                {/* Histogram visual (optional) */}
                <View style={styles.histogramContainer}>
                  {[...Array(20)].map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.bar,
                        { height: Math.random() * 60 + 10 },
                      ]}
                    />
                  ))}
                </View>

                {/* Price Range Slider */}
                <MultiSlider
                  values={appliedFilters.priceRange}
                  onValuesChange={(values) =>
                    setAppliedFilters((prev) => ({
                      ...prev,
                      priceRange: values,
                    }))
                  }
                  min={0}
                  max={1000}
                  step={10}
                  sliderLength={300}
                  selectedStyle={{ backgroundColor: '#EB8B23' }}
                  unselectedStyle={{ backgroundColor: '#ddd' }}
                  markerStyle={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    backgroundColor: '#EB8B23',
                  }}
                />

                {/* ✅ Stick the prices right below the slider */}
                <View style={[styles.priceRow, { marginTop: 0, paddingTop: 0 }]}>
                  <Text style={styles.priceText}>${appliedFilters.priceRange[0]}</Text>
                  <Text style={styles.priceText}>${appliedFilters.priceRange[1]}</Text>
                </View>
              </View>

              {/* Delivery Time Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Sort By</Text>

                <FlatList
                  data={filterOptions.sortBy}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item}
                  contentContainerStyle={{ paddingVertical: 6 }}
                  renderItem={({ item }) => {
                    const isActive = appliedFilters.sortBy === item;
                    return (
                      <TouchableOpacity
                        style={[
                          styles.filterOption,
                          isActive && styles.activeFilterOption,
                          { marginRight: 10 }, // spacing between items
                        ]}
                        onPress={() => setAppliedFilters({ ...appliedFilters, sortBy: item })}
                      >
                        <Text
                          style={[
                            styles.filterOptionText,
                            isActive && styles.activeFilterOptionText,
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>


              {/* Rating Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Rating</Text>
                <View style={styles.filterOptions}>
                  {filterOptions.rating.map(option => {
                    const isActive = appliedFilters.rating === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.filterOption,
                          isActive && styles.activeFilterOption
                        ]}
                        onPress={() => setAppliedFilters({ ...appliedFilters, rating: option })}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <Image
                            source={require('../../assets/star.png')}
                            style={{
                              width: 13,
                              height: 12,
                              resizeMode: 'contain',
                              tintColor: isActive ? '#fff' : COLORS.primary, // ✅ White if active, primary color otherwise
                            }}
                          />
                          <Text
                            style={[
                              styles.filterOptionText,
                              isActive && styles.activeFilterOptionText
                            ]}
                          >
                            {option}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  statusBarArea: {
    backgroundColor: COLORS.primary,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: isIOS ? hp('4%') : hp('3%'),
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scaleSize(wp('4.5%')),
    paddingTop: isIOS ? hp('2.5%') : hp('3%'),
    borderBottomLeftRadius: scaleSize(wp('6%')),
    borderBottomRightRadius: scaleSize(wp('6%')),
    paddingBottom: isIOS ? hp('3.5%') : hp('4%'),
  },
  rowJustify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('1.5%'),
  },
  locationContainer: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.3%'),
  },
  icon: {
    width: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4.5%')),
    height: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4.5%')),
    marginRight: wp('1.5%'),
  },
  locationText: {
    fontFamily: getFontFamily('Medium'),
    fontSize: fontScale(14),
    color: COLORS.secondary,
    marginRight: wp('0.5%'),
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  dropdownIcon: {
    width: isTablet ? scaleSize(wp('1.8%')) : scaleSize(wp('2.5%')),
    height: isTablet ? scaleSize(wp('1%')) : scaleSize(wp('1.2%')),
    tintColor: COLORS.secondary,
    marginLeft: wp('1.5%'),
  },
  addressText: {
    fontFamily: getFontFamily('Regular'),
    fontSize: fontScale(13),
    color: COLORS.secondary,
    opacity: 0.9,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  walletBagRow: {
    flexDirection: 'row',
    gap: wp('2.5%'),
  },
  walletBtn: {
    backgroundColor: '#fff',
    padding: isTablet ? scaleSize(wp('2%')) : scaleSize(wp('2.5%')),
    borderRadius: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  bagBtn: {
    backgroundColor: '#fff',
    padding: isTablet ? scaleSize(wp('1.8%')) : scaleSize(wp('2.2%')),
    borderRadius: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  walletIcon: {
    width: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4.5%')),
    height: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4.5%')),
    tintColor: COLORS.primary,
  },
  bagIcon: {
    width: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4.5%')),
    height: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4.5%')),
    tintColor: COLORS.primary,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('2%'),
  },
  headerTitle: {
    fontFamily: getFontFamily('Bold'),
    fontSize: fontScale(24),
    color: COLORS.secondary,
    lineHeight: isTablet ? hp('3.2%') : hp('3.6%'),
    flex: 1,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  vegContainer: {
    alignItems: 'center',
    marginLeft: wp('2%'),
  },
  switchOuter: {
    borderRadius: hp('2.25%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  switchBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: hp('2.25%'),
  },
  switchCircle: {
    position: 'absolute',
    left: 0,
    top: '50%',
    marginTop: -(isTablet ? hp('2.8%') : hp('3.2%')) / 2,
    zIndex: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  switchLabelsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2.5%'),
    zIndex: 1,
  },
  switchTextLeft: {
    fontFamily: getFontFamily('SemiBold'),
    fontSize: fontScale(10),
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  switchTextRight: {
    fontFamily: getFontFamily('SemiBold'),
    fontSize: fontScale(10),
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  vegModeTxt: {
    fontFamily: getFontFamily('Bold'),
    fontSize: fontScale(12),
    marginTop: hp('0.6%'),
    color: COLORS.secondary,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderRadius: scaleSize(wp('3%')),
    paddingVertical: isIOS ? hp('1.8%') : hp('1.5%'),
    paddingHorizontal: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: wp('3%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchIcon: {
    width: isTablet ? scaleSize(wp('4%')) : scaleSize(wp('5%')),
    height: isTablet ? scaleSize(wp('4%')) : scaleSize(wp('5%')),
    resizeMode: 'contain',
    marginRight: wp('2%'),
    tintColor: '#999',
  },
  searchPlaceholder: {
    fontFamily: getFontFamily('Regular'),
    fontSize: fontScale(14),
    flex: 1,
    color: '#999',
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  filterBtn: {
    backgroundColor: '#fff',
    borderRadius: scaleSize(wp('3%')),
    padding: scaleSize(wp('3%')),
    justifyContent: 'center',
    alignItems: 'center',
    width: isTablet ? scaleSize(wp('11%')) : scaleSize(wp('13%')),
    height: isTablet ? scaleSize(wp('11%')) : scaleSize(wp('13%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  filterIcon: {
    width: isTablet ? scaleSize(wp('5%')) : scaleSize(wp('6%')),
    height: isTablet ? scaleSize(wp('5%')) : scaleSize(wp('6%')),
    resizeMode: 'contain',
  },
  filterDot: {
    position: 'absolute',
    top: scaleSize(wp('2%')),
    right: scaleSize(wp('2%')),
    width: scaleSize(wp('2%')),
    height: scaleSize(wp('2%')),
    borderRadius: scaleSize(wp('1%')),
    backgroundColor: 'red',
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
    width: isTablet ? scaleSize(wp('4.5%')) : scaleSize(wp('5.5%')),
    height: isTablet ? scaleSize(wp('4.5%')) : scaleSize(wp('5.5%')),
  },
  sectionTitle: {
    fontFamily: getFontFamily('Bold'),
    fontSize: fontScale(18),
    color: COLORS.textDark,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  sectionLink: {
    fontFamily: getFontFamily('Medium'),
    fontSize: fontScale(14),
    color: COLORS.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  offerCard: {
    borderRadius: scaleSize(wp('4%')),
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleSize(wp('4%')),
    marginBottom: hp('2%'),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.cardShadow || '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  offerContent: {
    flex: 1,
    marginRight: wp('2%'),
  },
  offerHeader: {
    fontFamily: getFontFamily('Bold'),
    fontSize: fontScale(20),
    color: 'black',
    marginBottom: hp('0.5%'),
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  offerSubTxt: {
    fontFamily: getFontFamily('Regular'),
    fontSize: fontScale(13),
    color: COLORS.textLight,
    marginBottom: hp('1.5%'),
    lineHeight: hp('2%'),
    includeFontPadding: false,
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  offerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(wp('2%')),
    paddingVertical: isIOS ? hp('1.2%') : hp('1%'),
    paddingHorizontal: wp('4%'),
    alignSelf: 'flex-start',
  },
  offerBtnText: {
    fontFamily: getFontFamily('Bold'),
    fontSize: fontScale(13),
    color: COLORS.secondary,
    includeFontPadding: false,
    textAlignVertical: 'center',
    letterSpacing: 0.3,
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  offerImageWrap: {
    width: isTablet ? scaleSize(wp('25%')) : scaleSize(wp('30%')),
    height: isTablet ? scaleSize(wp('25%')) : scaleSize(wp('30%')),
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImage: {
    width: '100%',
    height: '100%',
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
    paddingVertical: isIOS ? hp('1.3%') : hp('1.1%'),
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    minWidth: isTablet ? scaleSize(wp('18%')) : scaleSize(wp('22%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
  },
  categoryIcon: {
    width: isTablet ? scaleSize(wp('4.5%')) : scaleSize(wp('5.5%')),
    height: isTablet ? scaleSize(wp('4.5%')) : scaleSize(wp('5.5%')),
    marginRight: wp('2%'),
  },
  categoryTxt: {
    fontFamily: getFontFamily('Medium'),
    fontSize: fontScale(14),
    color: COLORS.primary,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  categoryTxtActive: {
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.secondary,
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  restaurantScrollContent: {
    paddingHorizontal: wp('1%'),
    paddingBottom: hp('1%'),
  },
  restaurantCard: {
    width: isTablet ? scaleSize(wp('48%')) : scaleSize(wp('55%')),
    backgroundColor: COLORS.secondary,
    marginHorizontal: wp('1.5%'),
    marginBottom: hp('1%'),
    borderRadius: scaleSize(wp('4%')),
    padding: scaleSize(wp('3%')),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.cardShadow || '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageContainer: {
    position: 'relative',
    marginBottom: hp('1%'),
  },
  restaurantImg: {
    width: '100%',
    height: isTablet ? hp('12%') : hp('15%'),
    borderRadius: scaleSize(wp('3%')),
  },
  iconWrapper: {
    position: 'absolute',
    top: scaleSize(wp('3%')),
    right: scaleSize(wp('3%')),
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(wp('5%')),
    padding: scaleSize(wp('2%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  heartIcon: {
    width: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4%')),
    height: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4%')),
    tintColor: '#fff',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: scaleSize(wp('3%')),
    left: scaleSize(wp('3%')),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
    borderRadius: scaleSize(wp('2%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  starIcon: {
    width: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    height: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    marginRight: wp('1%'),
    tintColor: '#fff',
  },
  ratingText: {
    fontFamily: getFontFamily('SemiBold'),
    fontSize: fontScale(11),
    color: '#fff',
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  restaurantTitle: {
    fontFamily: getFontFamily('Bold'),
    fontSize: fontScale(15),
    color: COLORS.textDark,
    marginBottom: hp('0.5%'),
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  restaurantInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
    gap: wp('1%'),
  },
  infoIcon: {
    width: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    height: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    tintColor: COLORS.primary,
  },
  infoTxt: {
    fontFamily: getFontFamily('Regular'),
    fontSize: fontScale(12),
    color: COLORS.textLight,
    marginRight: wp('2%'),
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: wp('1.5%'),
    flexWrap: 'wrap',
  },
  restaurantTags: {
    fontFamily: getFontFamily('Regular'),
    fontSize: fontScale(11),
    color: COLORS.primary,
    backgroundColor: '#f3f1f1',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: isIOS ? hp('0.3%') : hp('0.25%'),
    borderRadius: scaleSize(wp('5%')),
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  productGrid: {
    paddingHorizontal: wp('1%'),
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: wp('1%'),
  },
  productCard: {
    backgroundColor: COLORS.secondary,
    width: isTablet ? scaleSize(wp('45%')) : scaleSize(wp('43%')),
    borderRadius: scaleSize(wp('4%')),
    padding: scaleSize(wp('3%')),
    marginBottom: hp('2%'),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.cardShadow || '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  productImg: {
    width: '100%',
    height: isTablet ? hp('14%') : hp('16%'),
    borderRadius: scaleSize(wp('3%')),
  },
  productHeartWrapper: {
    position: 'absolute',
    top: scaleSize(wp('3%')),
    right: scaleSize(wp('3%')),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: scaleSize(wp('5%')),
    padding: scaleSize(wp('2%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  productRatingBadge: {
    position: 'absolute',
    bottom: scaleSize(wp('3%')),
    left: scaleSize(wp('3%')),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
    borderRadius: scaleSize(wp('2%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productTitle: {
    fontFamily: getFontFamily('Bold'),
    fontSize: fontScale(14),
    color: COLORS.textDark,
    marginBottom: hp('0.5%'),
    marginTop: hp('1%'),
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.5%'),
    flex: 1,
  },
  productPrice: {
    fontFamily: getFontFamily('Bold'),
    fontSize: fontScale(15),
    color: '#111',
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  oldPrice: {
    fontFamily: getFontFamily('Regular'),
    fontSize: fontScale(12),
    color: '#666',
    textDecorationLine: 'line-through',
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  plusBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('50%'),
    padding: scaleSize(wp('2%')),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scaleSize(wp('8%')),
    minHeight: scaleSize(wp('8%')),
  },
  plusIcon: {
    width: isTablet ? scaleSize(wp('3%')) : scaleSize(wp('3.5%')),
    height: isTablet ? scaleSize(wp('3%')) : scaleSize(wp('3.5%')),
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
    width: isTablet ? scaleSize(wp('8%')) : scaleSize(wp('10%')),
    height: isTablet ? scaleSize(wp('8%')) : scaleSize(wp('10%')),
  },
  bottomTextContainer: {
    flex: 1,
    marginLeft: wp('4%'),
  },
  reachingTxt: {
    fontFamily: getFontFamily('SemiBold'),
    fontSize: fontScale(14),
    color: COLORS.primary,
    marginBottom: hp('0.4%'),
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.5%'),
  },
  deliveryClockIcon: {
    width: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    height: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    tintColor: COLORS.textLight,
  },
  getDeliveredTxt: {
    fontFamily: getFontFamily('Regular'),
    fontSize: fontScale(13),
    color: COLORS.textLight,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    paddingTop: hp('3%'),
    maxHeight: hp('80%'),
  },
  modalHeader: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
  },
  modalTitle: {
    fontSize: fontScale(18),
    fontFamily: getFontFamily('Bold'),
    color: '#000',
    marginBottom: 10,
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  closeButtonWrapper: {
    position: 'absolute',
    bottom: 70,
    left: '50%',
    transform: [{ translateX: -30 }],
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  modalScroll: {
    flex: 1,
  },
  filterSection: {
    padding: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  filterLabel: {
    fontFamily: getFontFamily('Bold'),
    fontSize: fontScale(16),
    color: '#000',
    marginBottom: 10,
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  histogramContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
    marginVertical: 5,
  },
  bar: {
    width: 6,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2,
    borderRadius: 3,
  },
  filterSectionTitle: {
    fontSize: fontScale(16),
    color: '#000',
    marginBottom: hp('1.5%'),
    fontFamily: getFontFamily('Bold'),
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2%'),
  },
  filterOption: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    marginBottom: hp('1%'),
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
  },
  filterOptionText: {
    fontSize: fontScale(14),
    color: '#666',
    fontFamily: getFontFamily('Medium'),
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  activeFilterOptionText: {
    color: '#fff',
    fontFamily: getFontFamily('Medium'),
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  priceRangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 0,
    paddingTop: 0,
  },
  priceRangeText: {
    fontFamily: getFontFamily('SemiBold'),
    fontSize: fontScale(14),
    color: '#000',
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  modalActions: {
    flexDirection: 'row',
    padding: wp('5%'),
    gap: wp('3%'),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  resetBtn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: hp('1.8%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
  },
  resetBtnText: {
    fontSize: fontScale(16),
    color: '#666',
    fontFamily: getFontFamily('Bold'),
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
  },
  applyBtnText: {
    fontSize: fontScale(16),
    color: '#fff',
    fontFamily: getFontFamily('Bold'),
    ...(Platform.OS === 'android' && { fontWeight: 'normal' }),
  },
});


export default HomeScreen;

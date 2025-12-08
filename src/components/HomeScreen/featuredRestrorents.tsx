import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFontFamily, getFontWeight } from '../../utils/fontHelper';
import { vibrate } from '../../utils/vibrationHelper';

const { width, height } = Dimensions.get('window');

const FeaturedRestaurants = () => {
  const navigation = useNavigation<any>();
   const { theme } = useContext(ThemeContext);
    const isDarkMode = theme.mode === "dark";

  const allRestaurants = [
    {
      id: 1,
      name: 'Bistro Excellence',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.4,
      deliveryTime: '10-15 mins',
      distance: '0.5 km',
      tags: ['Italian', 'Fast Food', 'Beverages'],
      discount: '20% OFF',
      description: 'Authentic Italian cuisine with modern twist',
      category: 'Italian',
      priceRange: 'Medium',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Tokyo Sushi',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.7,
      deliveryTime: '20-25 mins',
      distance: '1.2 km',
      tags: ['Japanese', 'Sushi', 'Asian'],
      discount: '15% OFF',
      description: 'Fresh sushi and authentic Japanese dishes',
      category: 'Japanese',
      priceRange: 'High',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'Spice Garden',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.2,
      deliveryTime: '15-20 mins',
      distance: '0.8 km',
      tags: ['Indian', 'Vegetarian', 'Spicy'],
      discount: '25% OFF',
      description: 'Traditional Indian flavors with modern presentation',
      category: 'Indian',
      priceRange: 'Medium',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Burger Hub',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.0,
      deliveryTime: '10-12 mins',
      distance: '0.3 km',
      tags: ['Fast Food', 'Burgers', 'American'],
      discount: '10% OFF',
      description: 'Gourmet burgers and crispy fries',
      category: 'Fast Food',
      priceRange: 'Low',
      isFavorite: false,
    },
    {
      id: 5,
      name: 'Dragon Palace',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.5,
      deliveryTime: '18-22 mins',
      distance: '1.5 km',
      tags: ['Chinese', 'Asian', 'Noodles'],
      discount: '30% OFF',
      description: 'Authentic Chinese cuisine with Sichuan specialties',
      category: 'Asian',
      priceRange: 'Medium',
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Mediterranean Delight',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.6,
      deliveryTime: '25-30 mins',
      distance: '2.0 km',
      tags: ['Mediterranean', 'Healthy', 'Greek'],
      discount: '20% OFF',
      description: 'Fresh Mediterranean dishes with olive oil and herbs',
      category: 'Mediterranean',
      priceRange: 'High',
      isFavorite: false,
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    category: 'All',
    rating: 'All',
    priceRange: 'All',
    deliveryTime: 'All',
  });

  const [restaurants, setRestaurants] = useState(allRestaurants);

  const filterOptions = {
    category: ['All', 'Italian', 'Asian', 'Indian', 'Fast Food', 'Japanese', 'Mediterranean'],
    rating: ['All', '4.0+', '4.5+'],
    priceRange: ['All', 'Low', 'Medium', 'High'],
    deliveryTime: ['All', 'Under 15 mins', 'Under 20 mins'],
  };

  const getFilteredRestaurants = () => {
    let filtered = restaurants;

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (appliedFilters.category !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.category === appliedFilters.category);
    }

    if (appliedFilters.rating !== 'All') {
      const minRating = parseFloat(appliedFilters.rating.replace('+', ''));
      filtered = filtered.filter(restaurant => restaurant.rating >= minRating);
    }

    if (appliedFilters.priceRange !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.priceRange === appliedFilters.priceRange);
    }

    if (appliedFilters.deliveryTime !== 'All') {
      if (appliedFilters.deliveryTime === 'Under 15 mins') {
        filtered = filtered.filter(restaurant => {
          const maxTime = parseInt(restaurant.deliveryTime.split('-')[1]);
          return maxTime <= 15;
        });
      } else if (appliedFilters.deliveryTime === 'Under 20 mins') {
        filtered = filtered.filter(restaurant => {
          const maxTime = parseInt(restaurant.deliveryTime.split('-')[1]);
          return maxTime <= 20;
        });
      }
    }

    return filtered;
  };

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
      priceRange: 'All',
      deliveryTime: 'All',
    });
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  const hasActiveFilters = () => {
    return Object.values(appliedFilters).some(filter => filter !== 'All');
  };

  const handleHeartPressWithVibration = (id: number) => {
    vibrate(40); // Use the vibration helper from utils
    setRestaurants(prevRestaurants =>
      prevRestaurants.map(restaurant =>
        restaurant.id === id
          ? { ...restaurant, isFavorite: !restaurant.isFavorite }
          : restaurant
      )
    );
  };

  const filteredRestaurants = getFilteredRestaurants();

  return (
    <View  style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}>
      <StatusBar 
        barStyle={theme.cardBackground === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent" />

      {/* Header */}
      <View style={[
        styles.header,
        { backgroundColor: theme.background },
      ]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/back.png')} 
          style={[
              styles.backIcon,
              { tintColor: theme.text }, // theme.text will be white in dark, black in light
            ]} />
        </TouchableOpacity>
        <Text style={[
        styles.headerTitle,
        {color:theme.text},
      ]}>Featured Restaurants</Text>
        <TouchableOpacity onPress={() => setShowFilterModal(true)} style={styles.filterButton}>
          <View style={styles.filterButtonContainer}>
            <Image source={require('../../assets/filter.png')} style={styles.filterIcon} resizeMode="contain" />
            {hasActiveFilters() && <View style={styles.filterDot} />}
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[
        styles.searchContainer,
        { backgroundColor: theme.background },
      ]}>
       <View
  style={[
    styles.searchInputContainer,
    { backgroundColor: theme.cardBackground }, // dynamic background
  ]}
>
  <Image
    source={require('../../assets/search.png')}
    style={[styles.searchIcon, { tintColor: theme.text }]} // icon color
    resizeMode="contain"
  />

  <TextInput
    style={[
      styles.searchInput,
      { color: theme.text }, // text color based on theme
    ]}
    placeholder="Search restaurants, cuisines..."
    value={searchQuery}
    onChangeText={setSearchQuery}
    placeholderTextColor={theme.textSecondary} // dynamic placeholder color
    autoCapitalize="none"
    autoCorrect={false}
  />


          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Image source={require('../../assets/close.png')} style={styles.clearIcon} resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Count */}
      <View style={[
        styles.resultsContainer,
        { backgroundColor: theme.background },
      ]}>
        <Text
  style={[
    styles.resultsText,
    { color: theme.text }, // white in dark, black in light
  ]}
>
  {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
</Text>

        {hasActiveFilters() && (
          <TouchableOpacity onPress={resetFilters} style={styles.clearFiltersBtn}>
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[
          styles.scrollContent,
          filteredRestaurants.length === 0 && styles.emptyScrollContent
        ]}
      >
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map(restaurant => {
            return (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.restaurantCard}
                activeOpacity={0.9}
                onPress={() => handleRestaurantPress(restaurant)}
              >
                <View style={styles.imageContainer}>
                  <Image source={restaurant.image} style={styles.restaurantImage} resizeMode="cover" />

                  {/* Discount Badge */}
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{restaurant.discount}</Text>
                  </View>

                  {/* Heart Icon - Same style as previous components */}
                  <TouchableOpacity
                    style={[
                      styles.productHeartWrapper,
                      { backgroundColor: restaurant.isFavorite ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)' }
                    ]}
                    activeOpacity={0.7}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleHeartPressWithVibration(restaurant.id);
                    }}
                  >
                    <Image
                      source={
                        restaurant.isFavorite
                          ? require('../../assets/heartfill.png')
                          : require('../../assets/heart.png')
                      }
                      style={[
                        styles.heartIcon,
                        { tintColor: restaurant.isFavorite ? COLORS.primary : '#fff' }
                      ]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  {/* Rating Badge - Same style as previous components */}
                  <View style={styles.productRatingBadge}>
                    <Image source={require('../../assets/star.png')} style={styles.starIcon} resizeMode="contain" />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                </View>

                <View 
                 style={[
    styles.restaurantInfo,
    {
      backgroundColor: theme.cardBackground,           // dark/light card background
      borderColor: theme.mode === 'dark' ? theme.borderColor : 'transparent',
      borderWidth: theme.mode === 'dark' ? 1 : 0,
    },
  ]}>
                  <View style={styles.titleRow}>
                  <Text
  style={[
    styles.restaurantName,
    { color: theme.text }, // white in dark, black in light
  ]}
>
  {restaurant.name}
</Text>

                    <View style={styles.ratingContainer}>
                      <Image source={require('../../assets/star.png')} style={styles.starIcon} resizeMode="contain" />
                      <Text style={styles.ratingText}>{restaurant.rating}</Text>
                    </View>
                  </View>

                  <Text style={styles.description}>{restaurant.description}</Text>

                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Image source={require('../../assets/clock.png')} style={styles.infoIcon} resizeMode="contain" />
                      <Text style={[
    styles.infoText,
    { color: theme.text }, // white in dark, black in light
  ]}>
                        {restaurant.deliveryTime}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Image source={require('../../assets/location1.png')} style={styles.infoIcon} resizeMode="contain" />
                      <Text style={[
    styles.infoText,
    { color: theme.text }, // white in dark, black in light
  ]}>{restaurant.distance}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Image source={require('../../assets/bike.png')} style={styles.infoIcon} resizeMode="contain" />
                      <Text style={[
    styles.infoText,
    { color: theme.text }, // white in dark, black in light
  ]}>Free delivery</Text>
                    </View>
                  </View>

                  <View style={styles.tagsContainer}>
                    {restaurant.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noResultsContainer}>
            <Image source={require('../../assets/emptycart.png')} style={styles.noResultsImage} resizeMode="contain" />
            <Text style={styles.noResultsText}>No restaurants found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your search or filters</Text>
            <TouchableOpacity 
              style={styles.tryAgainButton}
              onPress={() => {
                setSearchQuery('');
                resetFilters();
              }}
            >
              <Text style={styles.tryAgainText}>Show All Restaurants</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Restaurants</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Image source={require('../../assets/close.png')} style={styles.closeIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
              {/* Category Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Category</Text>
                <View style={styles.filterOptions}>
                  {filterOptions.category.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[styles.filterOption, appliedFilters.category === option && styles.activeFilterOption]}
                      onPress={() => setAppliedFilters(prev => ({ ...prev, category: option }))}
                    >
                      <Text style={[styles.filterOptionText, appliedFilters.category === option && styles.activeFilterOptionText]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Rating Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Rating</Text>
                <View style={styles.filterOptions}>
                  {filterOptions.rating.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[styles.filterOption, appliedFilters.rating === option && styles.activeFilterOption]}
                      onPress={() => setAppliedFilters(prev => ({ ...prev, rating: option }))}
                    >
                      <Text style={[styles.filterOptionText, appliedFilters.rating === option && styles.activeFilterOptionText]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Range Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Price Range</Text>
                <View style={styles.filterOptions}>
                  {filterOptions.priceRange.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[styles.filterOption, appliedFilters.priceRange === option && styles.activeFilterOption]}
                      onPress={() => setAppliedFilters(prev => ({ ...prev, priceRange: option }))}
                    >
                      <Text style={[styles.filterOptionText, appliedFilters.priceRange === option && styles.activeFilterOptionText]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Delivery Time Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Delivery Time</Text>
                <View style={styles.filterOptions}>
                  {filterOptions.deliveryTime.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[styles.filterOption, appliedFilters.deliveryTime === option && styles.activeFilterOption]}
                      onPress={() => setAppliedFilters(prev => ({ ...prev, deliveryTime: option }))}
                    >
                      <Text style={[styles.filterOptionText, appliedFilters.deliveryTime === option && styles.activeFilterOptionText]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeaturedRestaurants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('6%'),
    paddingBottom: hp('1%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: wp('1%'),
  },
  backIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  headerTitle: {
    fontSize: wp('4.8%'),
    color: '#000',
    textAlign: 'center',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  filterButton: {
    padding: wp('1%'),
  },
  filterButtonContainer: {
    position: 'relative',
  },
  filterIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  filterDot: {
    position: 'absolute',
    top: -wp('0.5%'),
    right: -wp('0.5%'),
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    backgroundColor: COLORS.primary,
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.5%'),
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  searchIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('3%'),
  },
  searchInput: {
    flex: 1,
    fontSize: wp('3.8%'),
    color: '#000',
    paddingVertical: 0,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  clearButton: {
    padding: wp('1%'),
  },
  clearIcon: {
    width: wp('4%'),
    height: wp('4%'),
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultsText: {
    fontSize: wp('3.5%'),
    color: '#666',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  clearFiltersBtn: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.8%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('2%'),
  },
  clearFiltersText: {
    color: '#fff',
    fontSize: wp('3%'),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  scrollContent: {
    paddingBottom: hp('10%'),
    paddingTop: hp('1%'),
  },
  emptyScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  restaurantCard: {
    backgroundColor: '#fff',
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    borderRadius: wp('4%'),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    height: hp('20%'),
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: hp('1.5%'),
    left: wp('4%'),
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.8%'),
    borderRadius: wp('2%'),
  },
  discountText: {
    color: '#fff',
    fontSize: wp('3%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  // Heart wrapper styles - Same as previous components
  productHeartWrapper: {
    position: 'absolute',
    top: hp('1.5%'),
    right: wp('4%'),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: wp('5%'),
    padding: wp('2%'),
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
    width: wp('4%'),
    height: wp('4%'),
  },
  // Rating badge styles - Same as previous components
  productRatingBadge: {
    position: 'absolute',
    bottom: hp('1.5%'),
    left: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
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
    width: wp('3%'),
    height: wp('3%'),
    marginRight: wp('1%'),
    tintColor: '#fff',
  },
  ratingText: {
    color: '#fff',
    fontSize: wp('3%'),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  restaurantInfo: {
    padding: wp('4%'),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('0.8%'),
  },
  restaurantName: {
    fontSize: wp('5.2%'),
    color: '#000',
    flex: 1,
    marginRight: wp('2%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  description: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginBottom: hp('1.5%'),
    lineHeight: hp('2.2%'),
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
    gap: wp('4%'),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginRight: wp('1%'),
    tintColor: COLORS.primary,
  },
  infoText: {
    fontSize: wp('3%'),
    color: '#666',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2%'),
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%'),
  },
  tagText: {
    fontSize: wp('3%'),
    color: COLORS.primary,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp('15%'),
    paddingHorizontal: wp('10%'),
  },
  noResultsImage: {
    width: wp('30%'),
    height: wp('30%'),
    marginBottom: hp('3%'),
    opacity: 0.5,
  },
  noResultsText: {
    fontSize: wp('4.5%'),
    color: '#333',
    marginBottom: hp('1%'),
    textAlign: 'center',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  noResultsSubtext: {
    fontSize: wp('3.8%'),
    color: '#666',
    textAlign: 'center',
    lineHeight: hp('2.5%'),
    marginBottom: hp('3%'),
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  tryAgainButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('3%'),
  },
  tryAgainText: {
    color: '#fff',
    fontSize: wp('3.8%'),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    paddingTop: hp('3%'),
    maxHeight: hp('80%'),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: wp('4.8%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  closeIcon: {
    width: wp('5%'),
    height: wp('5%'),
  },
  modalScroll: {
    maxHeight: hp('55%'),
  },
  filterSection: {
    padding: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterSectionTitle: {
    fontSize: wp('4%'),
    color: '#000',
    marginBottom: hp('1.5%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
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
    fontSize: wp('3.5%'),
    color: '#666',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  activeFilterOptionText: {
    color: '#fff',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
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
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  resetBtnText: {
    fontSize: wp('4%'),
    color: '#666',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  applyBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  applyBtnText: {
    fontSize: wp('4%'),
    color: '#fff',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});
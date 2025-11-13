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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import font from '../../assets/fonts';


const { width, height } = Dimensions.get('window');

const FeaturedRestaurants = () => {
  const navigation = useNavigation<any>();
  
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
    },
    {
      id: 2,
      name: 'Elite-Ember',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.6,
      deliveryTime: '15-20 mins',
      distance: '0.8 km',
      tags: ['Asian', 'Chinese', 'Thai'],
      discount: '15% OFF',
      description: 'Best Asian flavors in town',
      category: 'Asian',
      priceRange: 'High',
    },
    {
      id: 3,
      name: 'Golden Spoon',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.2,
      deliveryTime: '12-18 mins',
      distance: '1.2 km',
      tags: ['Indian', 'Spicy', 'Curry'],
      discount: '25% OFF',
      description: 'Traditional Indian dishes with authentic spices',
      category: 'Indian',
      priceRange: 'Medium',
    },
    {
      id: 4,
      name: 'Burger Palace',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.5,
      deliveryTime: '8-12 mins',
      distance: '0.3 km',
      tags: ['Burger', 'Fast Food', 'American'],
      discount: '30% OFF',
      description: 'Juicy burgers made with premium ingredients',
      category: 'Fast Food',
      priceRange: 'Low',
    },
    {
      id: 5,
      name: 'Pizza Corner',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.3,
      deliveryTime: '15-25 mins',
      distance: '1.0 km',
      tags: ['Pizza', 'Italian', 'Cheese'],
      discount: 'Buy 1 Get 1',
      description: 'Wood-fired pizzas with fresh toppings',
      category: 'Italian',
      priceRange: 'Medium',
    },
    {
      id: 6,
      name: 'Sushi Master',
      image: require('../../assets/featuredrestaurant.png'),
      rating: 4.7,
      deliveryTime: '20-30 mins',
      distance: '1.5 km',
      tags: ['Japanese', 'Sushi', 'Fresh'],
      discount: '18% OFF',
      description: 'Fresh sushi made by expert chefs',
      category: 'Japanese',
      priceRange: 'High',
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

  const filterOptions = {
    category: ['All', 'Italian', 'Asian', 'Indian', 'Fast Food', 'Japanese'],
    rating: ['All', '4.0+', '4.5+'],
    priceRange: ['All', 'Low', 'Medium', 'High'],
    deliveryTime: ['All', 'Under 15 mins', 'Under 20 mins'],
  };

  // Filter and search functionality
  const getFilteredRestaurants = () => {
    let filtered = allRestaurants;

    // Apply search filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (appliedFilters.category !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.category === appliedFilters.category);
    }

    // Apply rating filter
    if (appliedFilters.rating !== 'All') {
      const minRating = parseFloat(appliedFilters.rating.replace('+', ''));
      filtered = filtered.filter(restaurant => restaurant.rating >= minRating);
    }

    // Apply price range filter
    if (appliedFilters.priceRange !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.priceRange === appliedFilters.priceRange);
    }

    // Apply delivery time filter
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

  const filteredRestaurants = getFilteredRestaurants();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Featured Restaurants</Text>
        <TouchableOpacity onPress={() => setShowFilterModal(true)} style={styles.filterButton}>
          <View style={styles.filterButtonContainer}>
            <Image source={require('../../assets/filter.png')} style={styles.filterIcon} resizeMode="contain" />
            {hasActiveFilters() && <View style={styles.filterDot} />}
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Image source={require('../../assets/search.png')} style={styles.searchIcon} resizeMode="contain" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants, cuisines..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
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
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
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
        contentContainerStyle={styles.scrollContent}
      >
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map(restaurant => (
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
                
                {/* Heart Icon */}
                <TouchableOpacity style={styles.heartBtn} activeOpacity={0.7}>
                  <Image source={require('../../assets/heart.png')} style={styles.heartIcon} resizeMode="contain" />
                </TouchableOpacity>
              </View>

              <View style={styles.restaurantInfo}>
                <View style={styles.titleRow}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Image source={require('../../assets/star.png')} style={styles.starIcon} resizeMode="contain" />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                </View>

                <Text style={styles.description}>{restaurant.description}</Text>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Image source={require('../../assets/clock.png')} style={styles.infoIcon} resizeMode="contain" />
                    <Text style={styles.infoText}>{restaurant.deliveryTime}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Image source={require('../../assets/location1.png')} style={styles.infoIcon} resizeMode="contain" />
                    <Text style={styles.infoText}>{restaurant.distance}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Image source={require('../../assets/bike.png')} style={styles.infoIcon} resizeMode="contain" />
                    <Text style={styles.infoText}>Free delivery</Text>
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
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Image source={require('../../assets/emptycart.png')} style={styles.noResultsImage} resizeMode="contain" />
            <Text style={styles.noResultsText}>No restaurants found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your search or filters</Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
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
                      style={[
                        styles.filterOption,
                        appliedFilters.category === option && styles.activeFilterOption
                      ]}
                      onPress={() => setAppliedFilters({...appliedFilters, category: option})}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        appliedFilters.category === option && styles.activeFilterOptionText
                      ]}>
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
                      style={[
                        styles.filterOption,
                        appliedFilters.rating === option && styles.activeFilterOption
                      ]}
                      onPress={() => setAppliedFilters({...appliedFilters, rating: option})}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        appliedFilters.rating === option && styles.activeFilterOptionText
                      ]}>
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
                      style={[
                        styles.filterOption,
                        appliedFilters.priceRange === option && styles.activeFilterOption
                      ]}
                      onPress={() => setAppliedFilters({...appliedFilters, priceRange: option})}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        appliedFilters.priceRange === option && styles.activeFilterOptionText
                      ]}>
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
                      style={[
                        styles.filterOption,
                        appliedFilters.deliveryTime === option && styles.activeFilterOption
                      ]}
                      onPress={() => setAppliedFilters({...appliedFilters, deliveryTime: option})}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        appliedFilters.deliveryTime === option && styles.activeFilterOptionText
                      ]}>
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
    backgroundColor: '#f8f9fa' 
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
    fontWeight: '700', 
    color: '#000',
    textAlign: 'center',
    fontFamily : 'Figtree-Bold'
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
    fontFamily : 'Figtree-Medium',
    fontWeight : '500'
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
    fontWeight: '500',
    fontFamily : 'Figtree-SemiBold'
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
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: hp('10%'),
    paddingTop: hp('1%'),
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
    fontWeight: '700',
    fontFamily : 'Figtree-Bold'
  },
  heartBtn: {
    position: 'absolute',
    top: hp('1.5%'),
    right: wp('4%'),
    backgroundColor: COLORS.primary,
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  heartIcon: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    tintColor: '#fff',
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
    fontSize: wp('4.2%'),
    fontWeight: '700',
    color: '#000',
    flex: 1,
    marginRight: wp('2%'),
    fontFamily : 'Figtree-Bold'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
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
    fontWeight: '600',
    fontFamily : 'Figtree-Medium'
  },
  description: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginBottom: hp('1.5%'),
    lineHeight: hp('2.2%'),
    fontFamily : 'Figtree-Medium',
    fontWeight : '500'
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
  },
  infoText: {
    fontSize: wp('3%'),
    color: '#666',
    fontWeight: '500',
    fontFamily : 'Figtree-Medium'
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
    fontWeight: '500',
     fontFamily : 'Figtree-Medium'
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
    fontWeight: '700',
    color: '#333',
    marginBottom: hp('1%'),
    textAlign: 'center',
    fontFamily : 'Figtree-Bold'
  },
  noResultsSubtext: {
    fontSize: wp('3.8%'),
    color: '#666',
    textAlign: 'center',
    lineHeight: hp('2.5%'),
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
  // Modal Styles
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
    fontWeight: '700',
    color: '#000',
    fontFamily : 'Figtree-Bold'
  },
  closeIcon: {
    width: wp('5%'),
    height: wp('5%'),
  },
  modalScroll: {
    flex: 1,
  },
  filterSection: {
    padding: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterSectionTitle: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('1.5%'),
    fontFamily : 'Figtree-Bold'
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
    fontWeight: '500',
    fontFamily : 'Figtree-Medium'
  },
  activeFilterOptionText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily : 'Figtree-Medium'
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
    fontWeight: '600',
    color: '#666',
    fontFamily : 'Figtree-Bold'
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
    fontWeight: '700',
    color: '#fff',
    fontFamily : 'Figtree-Bold'
  },
});
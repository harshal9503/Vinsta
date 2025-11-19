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
  FlatList,
  TextInput,
  Platform,
  Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

// Map font weight to actual font family names on Android
const fontMap: Record<string, string> = {
  Thin: 'Figtree-Thin',
  ExtraLight: 'Figtree-ExtraLight',
  Light: 'Figtree-Light',
  Regular: 'Figtree-Regular',
  Medium: 'Figtree-Medium',
  SemiBold: 'Figtree-SemiBold',
  Bold: 'Figtree-Bold',
  ExtraBold: 'Figtree-ExtraBold',
  Black: 'Figtree-Black',
};

const { width, height } = Dimensions.get('window');

function getFontFamily(weight: keyof typeof fontMap = 'Regular') {
  if (Platform.OS === 'android') {
    return fontMap[weight] || fontMap.Regular;
  }
  return 'Figtree';
}

function getFontWeight(weight: keyof typeof fontMap = 'Regular') {
  if (Platform.OS === 'android') {
    return undefined;
  }
  const weightMap: Record<string, string> = {
    Thin: '100',
    ExtraLight: '200',
    Light: '300',
    Regular: '400',
    Medium: '500',
    SemiBold: '600',
    Bold: '700',
    ExtraBold: '800',
    Black: '900',
  };
  return weightMap[weight] || '400';
}

const BestBurgers = () => {
  const navigation = useNavigation<any>();

  const allBurgers = [
    {
      id: 1,
      name: 'Classic Cheese Burger',
      price: 45.5,
      oldPrice: 50.5,
      image: require('../../assets/b1.png'),
      rating: 4.4,
      deliveryTime: '10-15 mins',
      description: 'Juicy beef patty with melted cheese',
      restaurant: 'Burger Palace',
      isVeg: false,
    },
    {
      id: 2,
      name: 'Veggie Delight Burger',
      price: 38.0,
      oldPrice: 42.0,
      image: require('../../assets/b2.png'),
      rating: 4.2,
      deliveryTime: '12-18 mins',
      description: 'Fresh veggie patty with special sauce',
      restaurant: 'Green Bites',
      isVeg: true,
    },
    {
      id: 3,
      name: 'BBQ Bacon Burger',
      price: 52.75,
      oldPrice: 58.0,
      image: require('../../assets/b3.png'),
      rating: 4.6,
      deliveryTime: '15-20 mins',
      description: 'Smoky BBQ sauce with crispy bacon',
      restaurant: 'Smokehouse',
      isVeg: false,
    },
    {
      id: 4,
      name: 'Chicken Crispy Burger',
      price: 48.25,
      oldPrice: 53.0,
      image: require('../../assets/b1.png'),
      rating: 4.3,
      deliveryTime: '12-16 mins',
      description: 'Crispy fried chicken with mayo',
      restaurant: 'Chicken Corner',
      isVeg: false,
    },
    {
      id: 5,
      name: 'Mushroom Swiss Burger',
      price: 44.0,
      oldPrice: 49.0,
      image: require('../../assets/b2.png'),
      rating: 4.1,
      deliveryTime: '14-18 mins',
      description: 'Grilled mushrooms with Swiss cheese',
      restaurant: 'Gourmet Grill',
      isVeg: true,
    },
    {
      id: 6,
      name: 'Spicy Jalapeño Burger',
      price: 46.5,
      oldPrice: 51.5,
      image: require('../../assets/b3.png'),
      rating: 4.5,
      deliveryTime: '10-14 mins',
      description: 'Spicy jalapeños with pepper jack cheese',
      restaurant: 'Hot & Spicy',
      isVeg: false,
    },
    {
      id: 7,
      name: 'Double Cheese Burger',
      price: 35.0,
      oldPrice: 38.0,
      image: require('../../assets/b1.png'),
      rating: 3.9,
      deliveryTime: '8-12 mins',
      description: 'Double cheese with special sauce',
      restaurant: 'Cheese Palace',
      isVeg: true,
    },
    {
      id: 8,
      name: 'Premium Beef Burger',
      price: 65.0,
      oldPrice: 70.0,
      image: require('../../assets/b2.png'),
      rating: 4.8,
      deliveryTime: '18-25 mins',
      description: 'Premium Angus beef with truffle sauce',
      restaurant: 'Premium Grill',
      isVeg: false,
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const filters = ['All', 'Veg', 'Non-Veg', 'Under $40', 'Rating 4+', 'Fast Delivery'];

  const getFilteredBurgers = () => {
    let filtered = allBurgers;

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(
        burger =>
          burger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          burger.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          burger.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (selectedFilter) {
      case 'Veg':
        filtered = filtered.filter(burger => burger.isVeg);
        break;
      case 'Non-Veg':
        filtered = filtered.filter(burger => !burger.isVeg);
        break;
      case 'Under $40':
        filtered = filtered.filter(burger => burger.price < 40);
        break;
      case 'Rating 4+':
        filtered = filtered.filter(burger => burger.rating >= 4.0);
        break;
      case 'Fast Delivery':
        filtered = filtered.filter(burger => {
          const maxTime = parseInt(burger.deliveryTime.split('-')[1]);
          return maxTime <= 15;
        });
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleProductPress = (product: any) => {
    navigation.navigate('fooddetails', { product });
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Heart press toggles liked state with vibration
  const handleHeartPressWithVibration = (id: number) => {
    Vibration.vibrate(50);
    setLikedIds(prev =>
      prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]
    );
  };

  const filteredBurgers = getFilteredBurgers();

  const renderBurgerItem = ({ item, index }: { item: any; index: number }) => {
    const isLastItemInOddRow = filteredBurgers.length % 2 === 1 && index === filteredBurgers.length - 1;
    const isLiked = likedIds.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.burgerCard, isLastItemInOddRow && styles.lastItemCard]}
        activeOpacity={0.9}
        onPress={() => handleProductPress(item)}
      >
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.burgerImage} />

          <View style={[styles.vegIndicator, { backgroundColor: item.isVeg ? '#4CAF50' : '#F44336' }]}>
            <View style={styles.vegDot} />
          </View>

          {/* Heart Button */}
          <TouchableOpacity
            style={[
              styles.heartBtn,
              isLiked ? styles.heartBtnFilled : styles.heartBtnBack,
            ]}
            activeOpacity={0.7}
            onPress={(e) => {
              e.stopPropagation(); // prevent parent touchable press
              handleHeartPressWithVibration(item.id);
            }}
          >
            <Image
              source={
                isLiked
                  ? require('../../assets/heartfill.png')
                  : require('../../assets/heart.png')
              }
              style={[
                styles.heartIcon,
                !isLiked && styles.heartIconWhite,
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.ratingBadge}>
            <Image source={require('../../assets/star.png')} style={styles.starIcon} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <View style={styles.burgerInfo}>
          <Text style={styles.burgerName} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.restaurantName} numberOfLines={1} ellipsizeMode="tail">
            {item.restaurant}
          </Text>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {item.description}
          </Text>

          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
              <Image source={require('../../assets/plus.png')} style={styles.addIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.deliveryRow}>
            <Image source={require('../../assets/clock.png')} style={styles.clockIcon} />
            <Text style={styles.deliveryTime} numberOfLines={1} ellipsizeMode="tail">
              {item.deliveryTime}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Best Burgers</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search burgers, restaurants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Image source={require('../../assets/close.png')} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterBtn, selectedFilter === filter && styles.activeFilterBtn]}
              onPress={() => setSelectedFilter(filter)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredBurgers.length} burger{filteredBurgers.length !== 1 ? 's' : ''} found
        </Text>
        {(selectedFilter !== 'All' || searchQuery.trim() !== '') && (
          <TouchableOpacity
            onPress={() => {
              setSelectedFilter('All');
              setSearchQuery('');
            }}
            style={styles.clearFiltersBtn}
          >
            <Text style={styles.clearFiltersText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredBurgers.length > 0 ? (
        <FlatList
          data={filteredBurgers}
          renderItem={renderBurgerItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.burgerGrid}
          columnWrapperStyle={filteredBurgers.length > 1 ? styles.burgerRow : undefined}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Image source={require('../../assets/emptycart.png')} style={styles.noResultsImage} />
          <Text style={styles.noResultsText}>No burgers found</Text>
          <Text style={styles.noResultsSubtext}>Try adjusting your search or filters</Text>
        </View>
      )}
    </View>
  );
};

export default BestBurgers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: getFontWeight('Bold'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#999',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    width: 16,
    height: 16,
    tintColor: '#999',
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  filterScroll: {
    paddingHorizontal: 20,
  },
  filterBtn: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  activeFilterBtn: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: getFontWeight('600'),
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  clearFiltersBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  clearFiltersText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: getFontWeight('600'),
  },
  burgerGrid: {
    padding: 16,
    paddingBottom: 80,
  },
  burgerRow: {
    justifyContent: 'space-between',
  },
  burgerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: (width - 48) / 2,
    minHeight: 280,
  },
  lastItemCard: {
    marginRight: (width - 48) / 2 + 16,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
    width: '100%',
  },
  burgerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  vegIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  heartBtnBack: {
    backgroundColor: COLORS.primary,
  },
  heartBtnFilled: {
    backgroundColor: '#fff',
  },
  heartIcon: {
    width: 14,
    height: 14,
  },
  heartIconWhite: {
    tintColor: '#fff',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  starIcon: {
    width: 10,
    height: 10,
    tintColor: '#fff',
    marginRight: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  burgerInfo: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  burgerName: {
    fontSize: 18,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    color: '#000',
    marginBottom: 4,
    lineHeight: 18,
    minHeight: 18,
  },
  restaurantName: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    marginBottom: 6,
    lineHeight: 16,
    minHeight: 16,
  },
  description: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
    lineHeight: 14,
    minHeight: 28,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    minHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 14,
    color: '#000',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    width: 12,
    height: 12,
    tintColor: '#fff',
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 16,
  },
  clockIcon: {
    width: 13,
    height: 15,
    tintColor: '#999',
    marginRight: 4,
  },
  deliveryTime: {
    fontSize: 11,
    color: '#999',
    flex: 1,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    flex: 1,
  },
  noResultsImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    opacity: 0.5,
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    color: '#333',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
});

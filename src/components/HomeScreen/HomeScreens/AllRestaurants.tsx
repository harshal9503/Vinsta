import React, { useContext } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;
const isSmallScreen = width < 380;
const screenRatio = width / height;
const isIOS = Platform.OS === 'ios';

const fontScale = (size) => {
  if (isIOS) {
    return isTablet ? size * 0.85 : size * 0.95;
  }
  return isTablet ? size * 0.85 : size;
};

const scaleSize = (size) => {
  if (isIOS) {
    return isTablet ? size * 0.9 : size * 1.02;
  }
  return size;
};

const getFontFamily = (weight = 'Regular') => {
  if (Platform.OS === 'ios') {
    return 'Figtree';
  } else {
    const fontMap = {
      '100': 'Figtree-Thin',
      '200': 'Figtree-ExtraLight',
      '300': 'Figtree-Light',
      '400': 'Figtree-Regular',
      '500': 'Figtree-Medium',
      '600': 'Figtree-SemiBold',
      '700': 'Figtree-Bold',
      '800': 'Figtree-ExtraBold',
      '900': 'Figtree-Black',
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
    return fontMap[weight] || 'Figtree-Regular';
  }
};

const getFontWeight = (weight = 'Regular') => {
  if (Platform.OS === 'android') {
    return undefined;
  }

  const weightMap = {
    Thin: '100',
    ExtraLight: '200',
    Light: '300',
    Regular: '400',
    Medium: '500',
    SemiBold: '600',
    Bold: '700',
    ExtraBold: '800',
    Black: '900',
    '100': '100',
    '200': '200',
    '300': '300',
    '400': '400',
    '500': '500',
    '600': '600',
    '700': '700',
    '800': '800',
    '900': '900',
  };
  return weightMap[weight] || '400';
};

const getTextStyle = (weight = 'Regular') => {
  return {
    fontFamily: getFontFamily(weight),
    ...(Platform.OS === 'ios' && { fontWeight: getFontWeight(weight) }),
    includeFontPadding: false,
    textAlignVertical: 'center',
  };
};

const AllRestaurants = ({
  getCurrentRestaurants,
  handleRestaurantPress,
  toggleFavorite,
  isVegMode,
}) => {
  const { theme } = useContext(ThemeContext);

  const getAllRestaurantsWithMore = () => {
    const currentRestaurants = getCurrentRestaurants();
    
    const additionalRestaurants = [
      {
        id: 3,
        name: 'Spice Garden',
        img: require('../../../assets/featuredrestaurant.png'),
        rating: 4.2,
        deliveryTime: '15-20 mins',
        tags: ['Indian', 'Vegetarian', 'Spicy'],
        discount: '25% OFF',
        isFavorite: false,
        distance: '0.8 km',
        cuisines: 'North Indian, Chinese',
      },
      {
        id: 4,
        name: 'Burger Hub',
        img: require('../../../assets/featuredrestaurant.png'),
        rating: 4.0,
        deliveryTime: '10-12 mins',
        tags: ['Fast Food', 'Burgers', 'American'],
        discount: '10% OFF',
        isFavorite: false,
        distance: '0.3 km',
        cuisines: 'American, Fast Food',
      },
      {
        id: 5,
        name: 'Dragon Palace',
        img: require('../../../assets/featuredrestaurant.png'),
        rating: 4.5,
        deliveryTime: '18-22 mins',
        tags: ['Chinese', 'Asian', 'Noodles'],
        discount: '30% OFF',
        isFavorite: false,
        distance: '1.5 km',
        cuisines: 'Chinese, Asian',
      },
    ];

    // Return only 4 restaurants (current + first 2 additional)
    const allRestaurants = [...currentRestaurants, ...additionalRestaurants];
    return allRestaurants.slice(0, 4); // Show only 4 restaurants
  };

  const allRestaurants = getAllRestaurantsWithMore();

  return (
    <View style={styles.container}>
      {allRestaurants.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.restaurantCard,
            { backgroundColor: theme.cardBackground },
            index === 0 && { marginTop: 0 },
            index === allRestaurants.length - 1 && { marginBottom: 0 },
          ]}
          onPress={() => handleRestaurantPress(item)}
          activeOpacity={0.8}
        >
          <View style={styles.imageContainer}>
            <Image
              source={item.img}
              style={styles.restaurantImg}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={[
                styles.restaurantHeartWrapper,
                {
                  backgroundColor: item.isFavorite
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'rgba(255, 255, 255, 0.3)',
                },
              ]}
              activeOpacity={0.7}
              onPress={() => toggleFavorite(item.id, isVegMode)}
            >
              <Image
                source={
                  item.isFavorite
                    ? require('../../../assets/heartfill.png')
                    : require('../../../assets/heart.png')
                }
                style={[
                  styles.heartIcon,
                  { tintColor: item.isFavorite ? COLORS.primary : '#fff' },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={styles.restaurantRatingBadge}>
              <Image
                source={require('../../../assets/star.png')}
                style={styles.starIcon}
                resizeMode="contain"
              />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>

            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            )}
          </View>

          <View style={styles.restaurantInfo}>
            <View style={styles.titleRow}>
              <Text
                style={[styles.restaurantTitle, { color: theme.text }]}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <View style={styles.ratingContainer}>
                <Image
                  source={require('../../../assets/star.png')}
                  style={styles.ratingStarIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingValue}>{item.rating}</Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Image
                  source={require('../../../assets/clock.png')}
                  style={styles.detailIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.detailText, { color: theme.text }]}>
                  {item.deliveryTime}
                </Text>
              </View>

              <View style={styles.detailSeparator} />

              <View style={styles.detailItem}>
                <Image
                  source={require('../../../assets/location1.png')}
                  style={styles.detailIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.detailText, { color: theme.text }]}>
                  {item.distance || '1.2 km'}
                </Text>
              </View>

              <View style={styles.detailSeparator} />

              <View style={styles.detailItem}>
                <Image
                  source={require('../../../assets/bike.png')}
                  style={styles.detailIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.detailText, { color: theme.text }]}>
                  Free
                </Text>
              </View>
            </View>

            {item.cuisines && (
              <Text style={[styles.cuisinesText, { color: theme.text }]}>
                {item.cuisines}
              </Text>
            )}

            <View style={styles.tagsContainer}>
              {item.tags.slice(0, 2).map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
              {item.tags.length > 2 && (
                <View style={styles.moreTag}>
                  <Text style={styles.moreTagText}>+{item.tags.length - 2}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('2%'),
  },
  restaurantCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: scaleSize(wp('3%')), // SMALLER: Reduced from 3.5% to 3%
    marginBottom: hp('1.5%'), // SMALLER: Reduced from 2% to 1.5%
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.cardShadow || '#000',
        shadowOffset: { width: 0, height: 1.5 }, // SMALLER: Reduced from 2 to 1.5
        shadowOpacity: 0.08,
        shadowRadius: 3, // SMALLER: Reduced from 4 to 3
      },
      android: {
        elevation: 2, // SMALLER: Reduced from 3 to 2
      },
    }),
  },
  imageContainer: {
    position: 'relative',
    height: hp('16%'), // SMALLER: Reduced from 20% to 16%
  },
  restaurantImg: {
    width: '100%',
    height: '100%',
  },
  restaurantHeartWrapper: {
    position: 'absolute',
    top: scaleSize(wp('2%')), // SMALLER: Reduced from 2.5% to 2%
    right: scaleSize(wp('2%')), // SMALLER: Reduced from 2.5% to 2%
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: scaleSize(wp('3.5%')), // SMALLER: Reduced from 4% to 3.5%
    padding: scaleSize(wp('1.5%')), // SMALLER: Reduced from 1.8% to 1.5%
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0.8 },
        shadowRadius: 1.5,
      },
      android: {
        elevation: 1, // SMALLER: Reduced from 2 to 1
      },
    }),
  },
  restaurantRatingBadge: {
    position: 'absolute',
    bottom: scaleSize(wp('2%')), // SMALLER: Reduced from 2.5% to 2%
    left: scaleSize(wp('2%')), // SMALLER: Reduced from 2.5% to 2%
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2%'), // SMALLER: Reduced from 2.5% to 2%
    paddingVertical: hp('0.4%'), // SMALLER: Reduced from 0.5% to 0.4%
    borderRadius: scaleSize(wp('1.8%')), // SMALLER: Reduced from 2% to 1.8%
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0.8 },
        shadowRadius: 1.5,
      },
      android: {
        elevation: 1, // SMALLER: Reduced from 2 to 1
      },
    }),
  },
  discountBadge: {
    position: 'absolute',
    top: scaleSize(wp('2%')), // SMALLER: Reduced from 2.5% to 2%
    left: scaleSize(wp('2%')), // SMALLER: Reduced from 2.5% to 2%
    backgroundColor: '#FF4757',
    paddingHorizontal: wp('2.5%'), // SMALLER: Reduced from 3% to 2.5%
    paddingVertical: hp('0.5%'), // SMALLER: Reduced from 0.6% to 0.5%
    borderRadius: scaleSize(wp('1.8%')), // SMALLER: Reduced from 2% to 1.8%
  },
  discountText: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(9), // SMALLER: Reduced from 10 to 9
    color: '#fff',
  },
  heartIcon: {
    width: isTablet ? scaleSize(wp('3%')) : scaleSize(wp('3.2%')), // SMALLER: Reduced sizes
    height: isTablet ? scaleSize(wp('3%')) : scaleSize(wp('3.2%')),
  },
  restaurantInfo: {
    padding: scaleSize(wp('3%')), // SMALLER: Reduced from 3.5% to 3%
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.8%'), // SMALLER: Reduced from 1% to 0.8%
  },
  restaurantTitle: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(14), // SMALLER: Reduced from 16 to 14
    color: COLORS.textDark,
    flex: 1,
    marginRight: wp('2%'),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2%'), // SMALLER: Reduced from 2.5% to 2%
    paddingVertical: hp('0.5%'), // SMALLER: Reduced from 0.6% to 0.5%
    borderRadius: scaleSize(wp('1.8%')), // SMALLER: Reduced from 2% to 1.8%
  },
  ratingStarIcon: {
    width: scaleSize(wp('2.5%')), // SMALLER: Reduced from 3% to 2.5%
    height: scaleSize(wp('2.5%')),
    marginRight: wp('0.6%'), // SMALLER: Reduced from 0.8% to 0.6%
    tintColor: '#fff',
  },
  ratingValue: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(11), // SMALLER: Reduced from 12 to 11
    color: '#fff',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.6%'), // SMALLER: Reduced from 0.8% to 0.6%
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    width: scaleSize(wp('2.5%')), // SMALLER: Reduced from 2.8% to 2.5%
    height: scaleSize(wp('2.5%')),
    marginRight: wp('0.8%'), // SMALLER: Reduced from 1% to 0.8%
    tintColor: COLORS.primary,
  },
  detailText: {
    ...getTextStyle('Medium'),
    fontSize: fontScale(11), // SMALLER: Reduced from 12 to 11
    color: COLORS.textLight,
  },
  detailSeparator: {
    width: 1,
    height: hp('1.2%'), // SMALLER: Reduced from 1.5% to 1.2%
    backgroundColor: '#E0E0E0',
    marginHorizontal: wp('1.2%'), // SMALLER: Reduced from 1.5% to 1.2%
  },
  cuisinesText: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(11), // SMALLER: Reduced from 12 to 11
    color: COLORS.textLight,
    marginBottom: hp('0.6%'), // SMALLER: Reduced from 0.8% to 0.6%
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('1.2%'), // SMALLER: Reduced from 1.5% to 1.2%
  },
  tag: {
    backgroundColor: 'rgba(216, 103, 5, 0.1)',
    paddingHorizontal: wp('2%'), // SMALLER: Reduced from 2.5% to 2%
    paddingVertical: hp('0.3%'), // SMALLER: Reduced from 0.4% to 0.3%
    borderRadius: scaleSize(wp('1.8%')), // SMALLER: Reduced from 2% to 1.8%
  },
  tagText: {
    ...getTextStyle('Medium'),
    fontSize: fontScale(9), // SMALLER: Reduced from 10 to 9
    color: COLORS.primary,
  },
  moreTag: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: wp('2%'), // SMALLER: Reduced from 2.5% to 2%
    paddingVertical: hp('0.3%'), // SMALLER: Reduced from 0.4% to 0.3%
    borderRadius: scaleSize(wp('1.8%')), // SMALLER: Reduced from 2% to 1.8%
  },
  moreTagText: {
    ...getTextStyle('Medium'),
    fontSize: fontScale(9), // SMALLER: Reduced from 10 to 9
    color: '#666',
  },
  starIcon: {
    width: scaleSize(wp('2.5%')), // SMALLER: Reduced from 2.8% to 2.5%
    height: scaleSize(wp('2.5%')),
    marginRight: wp('0.6%'), // SMALLER: Reduced from 0.8% to 0.6%
    tintColor: '#fff',
  },
  ratingText: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(10), // SMALLER: Reduced from 11 to 10
    color: '#fff',
  },
});

export default AllRestaurants;
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
const { width, height } = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';

const isTablet = width >= 768;
const isSmallScreen = width < 380;
const screenRatio = width / height;
const isIOS = Platform.OS === 'ios';

const fontScale = size => {
  if (isIOS) {
    return isTablet ? size * 0.85 : size * 0.95;
  }
  return isTablet ? size * 0.85 : size;
};

const scaleSize = size => {
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

const FeaturedRestaurant = ({
  getCurrentRestaurants,
  handleRestaurantPress,
  toggleFavorite,
  isVegMode,
}) => {
  const { theme } = useContext(ThemeContext);

  const currentRestaurants = getCurrentRestaurants();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.restaurantScrollContent}
      bounces={false}
    >
      {currentRestaurants.map((restaurant, index) => (
        <TouchableOpacity
          key={restaurant.id}
          style={[
            styles.restaurantCard,
            { backgroundColor: theme.cardBackground },
            index === 0 && styles.firstCard,
            index === currentRestaurants.length - 1 && styles.lastCard,
          ]}
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
              style={[
                styles.productHeartWrapper,
                {
                  backgroundColor: restaurant.isFavorite
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'rgba(255, 255, 255, 0.3)',
                },
              ]}
              activeOpacity={0.7}
              onPress={() => toggleFavorite(restaurant.id, isVegMode)}
            >
              <Image
                source={
                  restaurant.isFavorite
                    ? require('../../../assets/heartfill.png')
                    : require('../../../assets/heart.png')
                }
                style={[
                  styles.heartIcon,
                  {
                    tintColor: restaurant.isFavorite ? COLORS.primary : '#fff',
                  },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={styles.productRatingBadge}>
              <Image
                source={require('../../../assets/star.png')}
                style={styles.starIcon}
                resizeMode="contain"
              />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
          </View>

          <Text style={[styles.restaurantTitle, { color: theme.text }]}>
            {restaurant.name}
          </Text>

          <View style={styles.restaurantInfoRow}>
            <Image
              source={require('../../../assets/bike.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={[styles.infoTxt, { color: theme.text }]}>
              free delivery
            </Text>

            <Image
              source={require('../../../assets/clock.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={[styles.infoTxt, { color: theme.text }]}>
              {restaurant.deliveryTime}
            </Text>
          </View>

          {/* Tags container */}
          <View style={styles.tagsContainer}>
            {restaurant.tags.map((tag, index) => (
              <View key={index} style={styles.tagWrapper}>
                <Text style={styles.restaurantTags}>{tag}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FeaturedRestaurant;

const styles = StyleSheet.create({
  restaurantScrollContent: {
    paddingBottom: hp('0.8%'),
  },
  restaurantCard: {
    width: isTablet ? scaleSize(wp('45%')) : scaleSize(wp('52%')),
    backgroundColor: COLORS.secondary,
    marginRight: wp('2.5%'),
    marginBottom: hp('0.8%'),
    borderRadius: scaleSize(wp('3.5%')),
    padding: scaleSize(wp('2.5%')),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.cardShadow || '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  firstCard: {
    marginLeft: 0, // First card has no left margin
  },
  lastCard: {
    marginRight: 0, // Last card has no right margin
  },
  imageContainer: {
    position: 'relative',
    marginBottom: hp('0.8%'),
  },
  restaurantImg: {
    width: '100%',
    height: isTablet ? hp('11%') : hp('13.5%'),
    borderRadius: scaleSize(wp('2.5%')),
  },
  productHeartWrapper: {
    position: 'absolute',
    top: scaleSize(wp('2.5%')),
    right: scaleSize(wp('2.5%')),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: scaleSize(wp('4%')),
    padding: scaleSize(wp('1.5%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0.8 },
        shadowRadius: 1.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  heartIcon: {
    width: isTablet ? scaleSize(wp('3.2%')) : scaleSize(wp('3.5%')),
    height: isTablet ? scaleSize(wp('3.2%')) : scaleSize(wp('3.5%')),
  },
  productRatingBadge: {
    position: 'absolute',
    bottom: scaleSize(wp('2.5%')),
    left: scaleSize(wp('2.5%')),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.4%'),
    borderRadius: scaleSize(wp('1.5%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0.8 },
        shadowRadius: 1.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  starIcon: {
    width: isTablet ? scaleSize(wp('2.2%')) : scaleSize(wp('2.5%')),
    height: isTablet ? scaleSize(wp('2.2%')) : scaleSize(wp('2.5%')),
    marginRight: wp('0.8%'),
    tintColor: '#fff',
  },
  ratingText: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(10),
    color: '#fff',
  },
  restaurantTitle: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16),
    color: COLORS.textDark,
    marginBottom: hp('0.4%'),
  },
  restaurantInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.8%'),
    gap: wp('0.8%'),
  },
  infoIcon: {
    width: isTablet ? scaleSize(wp('2.2%')) : scaleSize(wp('2.5%')),
    height: isTablet ? scaleSize(wp('2.2%')) : scaleSize(wp('2.5%')),
    tintColor: COLORS.primary,
  },
  infoTxt: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(11),
    color: COLORS.textLight,
    marginRight: wp('1.5%'),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('0.8%'),
    marginTop: hp('0.2%'),
  },
  tagWrapper: {
    flexShrink: 1,
  },
  restaurantTags: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(9.5),
    color: COLORS.primary,
    backgroundColor: '#f3f1f1',
    paddingHorizontal: wp('1.8%'),
    paddingVertical: isIOS ? hp('0.25%') : hp('0.15%'),
    borderRadius: scaleSize(wp('4%')),
    overflow: 'hidden',
    maxWidth: isTablet ? wp('12%') : wp('15%'),
    textAlign: 'center',
  },
});
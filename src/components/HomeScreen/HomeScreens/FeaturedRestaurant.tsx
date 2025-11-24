import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
const { width, height } = Dimensions.get('window');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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

// iOS-specific dimension scaling
const scaleSize = size => {
    if (isIOS) {
        return isTablet ? size * 0.9 : size * 1.02;
    }
    return size;
};

// ✅ UNIVERSAL Font family helper with proper iOS and Android support
const getFontFamily = (weight = 'Regular') => {
    if (Platform.OS === 'ios') {
        // iOS uses base font family name + fontWeight property
        return 'Figtree';
    } else {
        // Android needs specific font file names
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
            'Thin': 'Figtree-Thin',
            'ExtraLight': 'Figtree-ExtraLight',
            'Light': 'Figtree-Light',
            'Regular': 'Figtree-Regular',
            'Medium': 'Figtree-Medium',
            'SemiBold': 'Figtree-SemiBold',
            'Bold': 'Figtree-Bold',
            'ExtraBold': 'Figtree-ExtraBold',
            'Black': 'Figtree-Black',
        };
        return fontMap[weight] || 'Figtree-Regular';
    }
};

// ✅ Get fontWeight for iOS (Android ignores this)
const getFontWeight = (weight = 'Regular') => {
    if (Platform.OS === 'android') {
        return undefined; // Android doesn't use fontWeight with custom fonts
    }

    // iOS fontWeight mapping
    const weightMap = {
        'Thin': '100',
        'ExtraLight': '200',
        'Light': '300',
        'Regular': '400',
        'Medium': '500',
        'SemiBold': '600',
        'Bold': '700',
        'ExtraBold': '800',
        'Black': '900',
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

// ✅ Complete font style helper
const getTextStyle = (weight = 'Regular') => {
    return {
        fontFamily: getFontFamily(weight),
        ...(Platform.OS === 'ios' && { fontWeight: getFontWeight(weight) }),
        includeFontPadding: false,
        textAlignVertical: 'center',
    };
};

const FeaturedRestaurant = ({ getCurrentRestaurants, handleRestaurantPress, toggleFavorite, isVegMode }) => {
  const {theme} = useContext(ThemeContext);
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.restaurantScrollContent}
      bounces={false}
    >
      {getCurrentRestaurants().map(restaurant => (
        <TouchableOpacity
          key={restaurant.id}
          style={[styles.restaurantCard,{backgroundColor : theme.cardBackground}]}
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
                { backgroundColor: restaurant.isFavorite ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)' }
              ]} 
              activeOpacity={0.7}
              onPress={() => toggleFavorite(restaurant.id, isVegMode)}
            >
              <Image
                source={restaurant.isFavorite 
                  ? require('../../../assets/heartfill.png')
                  : require('../../../assets/heart.png')
                }
                style={[
                  styles.heartIcon,
                  { tintColor: restaurant.isFavorite ? COLORS.primary : '#fff' }
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

          <Text style={[styles.restaurantTitle,{color: theme.text}]}>{restaurant.name}</Text>

          <View style={styles.restaurantInfoRow}>
            <Image
              source={require('../../../assets/bike.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={[styles.infoTxt,{color: theme.text}]}>free delivery</Text>

            <Image
              source={require('../../../assets/clock.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={[styles.infoTxt,{color: theme.text}]}>{restaurant.deliveryTime}</Text>
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
  );
};

export default FeaturedRestaurant

const styles = StyleSheet.create({ 
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
  heartIcon: {
    width: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4%')),
    height: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4%')),
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
  starIcon: {
    width: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    height: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    marginRight: wp('1%'),
    tintColor: '#fff',
  },
  ratingText: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(11),
    color: '#fff',
  },
  restaurantTitle: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(18),
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
    width: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    height: isTablet ? scaleSize(wp('2.5%')) : scaleSize(wp('3%')),
    tintColor: COLORS.primary,
  },
  infoTxt: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(12),
    color: COLORS.textLight,
    marginRight: wp('2%'),
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: wp('1.5%'),
    flexWrap: 'wrap',
  },
  restaurantTags: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(11),
    color: COLORS.primary,
    backgroundColor: '#f3f1f1',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: isIOS ? hp('0.3%') : hp('0.25%'),
    borderRadius: scaleSize(wp('5%')),
  },
})
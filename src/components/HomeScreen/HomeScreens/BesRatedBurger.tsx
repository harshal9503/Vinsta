import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
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

// ✅ Get fontWeight for iOS (Android ignores this)
const getFontWeight = (weight = 'Regular') => {
  if (Platform.OS === 'android') {
    return undefined; // Android doesn't use fontWeight with custom fonts
  }

  // iOS fontWeight mapping
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

// ✅ Complete font style helper
const getTextStyle = (weight = 'Regular') => {
  return {
    fontFamily: getFontFamily(weight),
    ...(Platform.OS === 'ios' && { fontWeight: getFontWeight(weight) }),
    includeFontPadding: false,
    textAlignVertical: 'center',
  };
};

const BesRatedBurger = ({
  getCurrentProducts,
  handleProductPress,
  toggleFavorite,
  isVegMode,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <FlatList
      data={getCurrentProducts()}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      scrollEnabled={false}
      contentContainerStyle={styles.productGrid}
      columnWrapperStyle={styles.productRow}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.productCard,
            { backgroundColor: theme.cardBackground },
          ]}
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
              style={[
                styles.productHeartWrapper,
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

            <View style={styles.productRatingBadge}>
              <Image
                source={require('../../../assets/star.png')}
                style={styles.starIcon}
                resizeMode="contain"
              />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <Text
            style={[styles.productTitle, { color: theme.text }]}
            numberOfLines={2}
          >
            {item.name}
          </Text>

          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={[styles.productPrice, { color: theme.text }]}>
                {item.price}
              </Text>
              <Text style={styles.oldPrice}>{item.oldPrice}</Text>
            </View>

            <TouchableOpacity style={styles.plusBtn} activeOpacity={0.7}>
              <Image
                source={require('../../../assets/plus.png')}
                style={styles.plusIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.deliveryTimeRow}>
            <Image
              source={require('../../../assets/clock.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={[styles.infoTxt, { color: theme.text }]}>
              {item.deliveryTime}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default BesRatedBurger;

const styles = StyleSheet.create({
  productGrid: {
    paddingHorizontal: wp('1%'),
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: wp('1%'),
  },
  productCard: {
    backgroundColor: COLORS.secondary,
    width: isTablet ? scaleSize(wp('45%')) : scaleSize(wp('43%')), // ✅ SAME WIDTH
    borderRadius: scaleSize(wp('3.5%')), // ✅ COMPACT: Smaller radius
    padding: scaleSize(wp('2.5%')), // ✅ COMPACT: Reduced padding
    marginBottom: hp('2%'), // ✅ SAME spacing between cards
    ...Platform.select({
      ios: {
        shadowColor: COLORS.cardShadow || '#000',
        shadowOffset: { width: 0, height: 1.5 }, // ✅ COMPACT: Reduced shadow
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productImg: {
    width: '100%',
    height: isTablet ? hp('12.5%') : hp('14.5%'), // ✅ COMPACT: Reduced height (was 14%/16%)
    borderRadius: scaleSize(wp('2.5%')), // ✅ COMPACT: Smaller radius
  },
  productHeartWrapper: {
    position: 'absolute',
    top: scaleSize(wp('2.5%')), // ✅ COMPACT: Adjusted position
    right: scaleSize(wp('2.5%')), // ✅ COMPACT: Adjusted position
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: scaleSize(wp('4%')), // ✅ COMPACT: Smaller
    padding: scaleSize(wp('1.5%')), // ✅ COMPACT: Reduced padding
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
  imageContainer: {
    position: 'relative',
    marginBottom: hp('0.8%'), // ✅ COMPACT: Reduced (was 1%)
  },
  productRatingBadge: {
    position: 'absolute',
    bottom: scaleSize(wp('2.5%')), // ✅ COMPACT: Adjusted
    left: scaleSize(wp('2.5%')), // ✅ COMPACT: Adjusted
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2%'), // ✅ COMPACT: Reduced
    paddingVertical: hp('0.4%'), // ✅ COMPACT: Reduced
    borderRadius: scaleSize(wp('1.5%')), // ✅ COMPACT: Smaller
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
    width: isTablet ? scaleSize(wp('3.2%')) : scaleSize(wp('3.5%')), // ✅ COMPACT: Smaller
    height: isTablet ? scaleSize(wp('3.2%')) : scaleSize(wp('3.5%')), // ✅ COMPACT: Smaller
  },
  productTitle: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16), // ✅ COMPACT: Smaller (was 18)
    color: COLORS.textDark,
    marginBottom: hp('0.4%'), // ✅ COMPACT: Reduced
    marginTop: hp('0.8%'), // ✅ COMPACT: Reduced (was 1%)
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.4%'), // ✅ COMPACT: Reduced
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.2%'), // ✅ COMPACT: Reduced gap
    flex: 1,
  },
  productPrice: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(13), // ✅ COMPACT: Smaller (was 15)
    color: '#111',
  },
  oldPrice: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(11), // ✅ COMPACT: Smaller (was 12)
    color: '#666',
    textDecorationLine: 'line-through',
  },
  plusBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('50%'),
    padding: scaleSize(wp('1.8%')), // ✅ COMPACT: Reduced
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scaleSize(wp('7%')), // ✅ COMPACT: Smaller
    minHeight: scaleSize(wp('7%')), // ✅ COMPACT: Smaller
  },
  plusIcon: {
    width: isTablet ? scaleSize(wp('2.8%')) : scaleSize(wp('3.2%')), // ✅ COMPACT: Smaller
    height: isTablet ? scaleSize(wp('2.8%')) : scaleSize(wp('3.2%')), // ✅ COMPACT: Smaller
    tintColor: '#fff',
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('0.8%'), // ✅ COMPACT: Reduced gap
  },
  infoIcon: {
    width: isTablet ? scaleSize(wp('2.2%')) : scaleSize(wp('2.5%')), // ✅ COMPACT: Smaller
    height: isTablet ? scaleSize(wp('2.2%')) : scaleSize(wp('2.5%')), // ✅ COMPACT: Smaller
    tintColor: COLORS.primary,
  },
  infoTxt: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(11), // ✅ COMPACT: Smaller (was 12)
    color: COLORS.textLight,
  },
  starIcon: {
    width: isTablet ? scaleSize(wp('2.2%')) : scaleSize(wp('2.5%')), // ✅ COMPACT: Smaller
    height: isTablet ? scaleSize(wp('2.2%')) : scaleSize(wp('2.5%')), // ✅ COMPACT: Smaller
    marginRight: wp('0.8%'), // ✅ COMPACT: Reduced
    tintColor: '#fff',
  },
  ratingText: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(10), // ✅ COMPACT: Smaller (was 11)
    color: '#fff',
  },
});

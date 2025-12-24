import React, { useContext } from 'react';
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

const BesRatedBurger = ({
  getCurrentProducts,
  handleProductPress,
  toggleFavorite,
  isVegMode,
}) => {
  const { theme } = useContext(ThemeContext);

  const getCurrentProductsWithMore = () => {
    const currentProducts = getCurrentProducts();
    
    const additionalProducts = [
      {
        id: 5,
        name: 'Paneer Burger',
        price: '₹50.50',
        img: require('../../../assets/b1.png'),
        oldPrice: '₹55.50',
        rating: 4.2,
        deliveryTime: '12-17 mins',
        isFavorite: false,
      },
      {
        id: 6,
        name: 'Cheese Lover',
        price: '₹48.50',
        img: require('../../../assets/b2.png'),
        oldPrice: '₹53.50',
        rating: 4.3,
        deliveryTime: '15-20 mins',
        isFavorite: false,
      },
      {
        id: 7,
        name: 'Spicy Veg Burger',
        price: '₹47.50',
        img: require('../../../assets/b3.png'),
        oldPrice: '₹52.50',
        rating: 4.5,
        deliveryTime: '10-15 mins',
        isFavorite: false,
      },
      {
        id: 8,
        name: 'Classic Veg Burger',
        price: '₹42.50',
        img: require('../../../assets/b1.png'),
        oldPrice: '₹47.50',
        rating: 4.0,
        deliveryTime: '8-12 mins',
        isFavorite: false,
      },
      {
        id: 9,
        name: 'Mushroom Burger',
        price: '₹49.50',
        img: require('../../../assets/b2.png'),
        oldPrice: '₹54.50',
        rating: 4.1,
        deliveryTime: '13-18 mins',
        isFavorite: false,
      },
      {
        id: 10,
        name: 'Double Cheese',
        price: '₹52.50',
        img: require('../../../assets/b3.png'),
        oldPrice: '₹57.50',
        rating: 4.4,
        deliveryTime: '11-16 mins',
        isFavorite: false,
      },
    ];

    return [...currentProducts, ...additionalProducts];
  };

  const allProducts = getCurrentProductsWithMore();

  // CHANGED: Split products into 2 rows - first 6 items row 1, rest row 2
  const firstRowProducts = allProducts.slice(0, 6);
  const secondRowProducts = allProducts.slice(6);

  const renderProductCard = (item, index, rowProducts) => (
    <TouchableOpacity
      style={[
        styles.productCard,
        { backgroundColor: theme.cardBackground },
        index === 0 && { marginLeft: wp('4%') },
        index === rowProducts.length - 1 && { marginRight: wp('4%') },
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
        numberOfLines={1}
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
  );

  return (
    <View style={styles.container}>
      {/* CHANGED: First Row - Horizontal scroll for first 6 items */}
      <FlatList
        data={firstRowProducts}
        keyExtractor={(item) => `row1-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item, index }) => renderProductCard(item, index, firstRowProducts)}
      />
      
      {/* CHANGED: Second Row - Horizontal scroll for remaining items, with top margin */}
      {secondRowProducts.length > 0 && (
        <FlatList
          data={secondRowProducts}
          keyExtractor={(item) => `row2-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentSecondRow}
          renderItem={({ item, index }) => renderProductCard(item, index, secondRowProducts)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('2%'),
  },
  scrollContent: {
    paddingVertical: hp('1%'),
  },
  // CHANGED: New style for second row scroll content with top margin
  scrollContentSecondRow: {
    paddingVertical: hp('0.5%'), // CHANGED: Less vertical padding
    paddingTop: hp('1.2%'), // CHANGED: Added top margin between rows
  },
  // CHANGED: MADE SMALLER - Width: wp('32%') → wp('28%'), Padding: wp('1.5%') → wp('1.2%')
  productCard: {
    backgroundColor: COLORS.secondary,
    width: wp('28%'), // CHANGED: was wp('32%') - 12.5% smaller width
    borderRadius: scaleSize(wp('2.5%')), // CHANGED: was wp('2.8%') - smaller radius
    padding: scaleSize(wp('1.2%')), // CHANGED: was wp('1.5%') - 20% less padding (shorter height)
    marginRight: wp('2%'), // CHANGED: was wp('2.5%') - tighter spacing
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
  // CHANGED: Even tighter image spacing for shorter height
  imageContainer: {
    position: 'relative',
    marginBottom: hp('0.3%'), // CHANGED: was hp('0.4%') - tighter
  },
  // CHANGED: Smaller image height
  productImg: {
    width: '100%',
    height: wp('22%'), // CHANGED: was wp('25%') - 12% smaller image
    borderRadius: scaleSize(wp('1.8%')), // CHANGED: was wp('2%') - smaller border
  },
  // CHANGED: Repositioned for smaller card
  productHeartWrapper: {
    position: 'absolute',
    top: scaleSize(wp('1%')), // CHANGED: was wp('1.2%')
    right: scaleSize(wp('1%')), // CHANGED: was wp('1.2%')
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: scaleSize(wp('2.2%')), // CHANGED: was wp('2.5%')
    padding: scaleSize(wp('0.8%')), // CHANGED: was wp('1%')
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
  // CHANGED: Repositioned for smaller card
  productRatingBadge: {
    position: 'absolute',
    bottom: scaleSize(wp('1%')), // CHANGED: was wp('1.2%')
    left: scaleSize(wp('1%')), // CHANGED: was wp('1.2%')
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('1.3%'), // CHANGED: was wp('1.5%')
    paddingVertical: hp('0.25%'), // CHANGED: was hp('0.3%')
    borderRadius: scaleSize(wp('1%')), // CHANGED: was wp('1.2%')
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
  // CHANGED: Smaller icons
  heartIcon: {
    width: isTablet ? scaleSize(wp('2%')) : scaleSize(wp('2.2%')), // CHANGED: was 2.2-2.4%
    height: isTablet ? scaleSize(wp('2%')) : scaleSize(wp('2.2%')),
  },
  // CHANGED: Tighter title spacing
  productTitle: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(11), // CHANGED: was 12 - smaller font
    color: COLORS.textDark,
    marginBottom: hp('0.2%'), // CHANGED: was hp('0.3%')
    marginTop: hp('0.3%'), // CHANGED: was hp('0.4%')
  },
  // CHANGED: Even tighter price row
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.15%'), // CHANGED: was hp('0.2%')
  },
  // CHANGED: Tighter price gap
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('0.6%'), // CHANGED: was wp('0.8%')
    flex: 1,
  },
  // CHANGED: Smaller price fonts
  productPrice: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(10), // CHANGED: was 11
    color: '#111',
  },
  oldPrice: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(8), // CHANGED: was 9
    color: '#666',
    textDecorationLine: 'line-through',
  },
  // CHANGED: Smaller plus button
  plusBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('50%'),
    padding: scaleSize(wp('1%')), // CHANGED: was wp('1.2%')
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scaleSize(wp('4.8%')), // CHANGED: was wp('5.5%')
    minHeight: scaleSize(wp('4.8%')),
  },
  // CHANGED: Smaller plus icon
  plusIcon: {
    width: isTablet ? scaleSize(wp('1.8%')) : scaleSize(wp('2%')), // CHANGED: was 2-2.2%
    height: isTablet ? scaleSize(wp('1.8%')) : scaleSize(wp('2%')),
    tintColor: '#fff',
  },
  // CHANGED: Tighter delivery gap
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('0.5%'), // CHANGED: was wp('0.6%')
  },
  // CHANGED: Smaller info icon
  infoIcon: {
    width: isTablet ? scaleSize(wp('1.6%')) : scaleSize(wp('1.8%')), // CHANGED: was 1.8-2%
    height: isTablet ? scaleSize(wp('1.6%')) : scaleSize(wp('1.8%')),
    tintColor: COLORS.primary,
  },
  // CHANGED: Smaller delivery font
  infoTxt: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(9), // CHANGED: was 10
    color: COLORS.textLight,
  },
  // CHANGED: Smaller star icon
  starIcon: {
    width: isTablet ? scaleSize(wp('1.6%')) : scaleSize(wp('1.8%')), // CHANGED: was 1.8-2%
    height: isTablet ? scaleSize(wp('1.6%')) : scaleSize(wp('1.8%')),
    marginRight: wp('0.5%'), // CHANGED: was wp('0.6%')
    tintColor: '#fff',
  },
  // CHANGED: Smaller rating text
  ratingText: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(8), // CHANGED: was 9
    color: '#fff',
  },
});

export default BesRatedBurger;

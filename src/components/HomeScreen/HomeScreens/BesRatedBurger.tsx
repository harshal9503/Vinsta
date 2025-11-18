import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../../theme/colors';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

// Font Helpers (universal font family & weight helpers)
const getFontFamily = (weight = 'Regular') => {
  if (Platform.OS === 'ios') {
    return 'Figtree';
  } else {
    const fontMap: Record<string, string> = {
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

const getFontWeight = (weight = 'Regular') => {
  if (Platform.OS === 'android') return undefined;
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

const getTextStyle = (weight = 'Regular') => ({
  fontFamily: getFontFamily(weight),
  ...(Platform.OS === 'ios' && { fontWeight: getFontWeight(weight) }),
  includeFontPadding: false,
  textAlignVertical: 'center',
});

const BesRatedBurger = ({ getCurrentProducts, handleProductPress }) => {
  // Maintain liked state ids here
  const [likedIds, setLikedIds] = useState<number[]>([]);

  // Heart press handler with vibration and toggle liked state
  const handleHeartPressWithVibration = (id: number) => {
    Vibration.vibrate(50);
    setLikedIds(prev =>
      prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]
    );
  };

  return (
    <FlatList
      data={getCurrentProducts()}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      scrollEnabled={false}
      contentContainerStyle={styles.productGrid}
      columnWrapperStyle={styles.productRow}
      renderItem={({ item }) => {
        const isLiked = likedIds.includes(item.id);
        return (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleProductPress(item)}
            activeOpacity={0.8}
          >
            <View style={styles.imageContainer}>
              <Image
                source={item.img}
                style={styles.productImg}
                resizeMode="cover"
              />

              {/* Heart button with background and icon toggle */}
              <TouchableOpacity
                style={[
                  styles.productHeartWrapper,
                  isLiked ? styles.heartWrapperFilled : styles.heartWrapperBack,
                ]}
                activeOpacity={0.7}
                onPress={e => {
                  e.stopPropagation();
                  handleHeartPressWithVibration(item.id);
                }}
              >
                <Image
                  source={
                    isLiked
                      ? require('../../../assets/heartfill.png')
                      : require('../../../assets/heart.png')
                  }
                  style={[
                    styles.heartIcon,
                    isLiked ? styles.heartIconFilled : styles.heartIconWhite,
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
              <Text style={styles.infoTxt}>{item.deliveryTime}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
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
    width: isTablet ? wp('45%') : wp('43%'),
    borderRadius: wp('4%'),
    padding: wp('3%'),
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
    borderRadius: wp('3%'),
  },
  productHeartWrapper: {
    position: 'absolute',
    top: wp('3%'),
    right: wp('3%'),
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
  heartWrapperBack: {
    backgroundColor: COLORS.primary,
  },
  heartWrapperFilled: {
    backgroundColor: '#fff',
  },
  heartIcon: {
    width: isTablet ? wp('4%') : wp('4%'),
    height: isTablet ? wp('4%') : wp('4%'),
  },
  heartIconWhite: {
    tintColor: '#fff',
  },
  heartIconFilled: {
    tintColor: undefined,
  },
  productRatingBadge: {
    position: 'absolute',
    bottom: wp('3%'),
    left: wp('3%'),
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
    width: isTablet ? wp('3%') : wp('3%'),
    height: isTablet ? wp('3%') : wp('3%'),
    tintColor: '#fff',
    marginRight: wp('1%'),
  },
  ratingText: {
    ...getTextStyle('SemiBold'),
    fontSize: wp('3.2%'),
    color: '#fff',
  },
  productTitle: {
    ...getTextStyle('Bold'),
    fontSize: wp('4.5%'),
    color: COLORS.textDark,
    marginBottom: hp('0.5%'),
    marginTop: hp('1%'),
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
  },
  productPrice: {
    ...getTextStyle('Bold'),
    fontSize: wp('4%'),
    color: '#111',
  },
  oldPrice: {
    ...getTextStyle('Regular'),
    fontSize: wp('3.2%'),
    color: '#666',
    textDecorationLine: 'line-through',
  },
  plusBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('50%'),
    padding: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: wp('8%'),
    minHeight: wp('8%'),
  },
  plusIcon: {
    width: isTablet ? wp('3%') : wp('3.5%'),
    height: isTablet ? wp('3%') : wp('3.5%'),
    tintColor: '#fff',
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1%'),
  },
  infoIcon: {
    width: isTablet ? wp('3%') : wp('3%'),
    height: isTablet ? wp('3%') : wp('3%'),
    tintColor: COLORS.primary,
  },
  infoTxt: {
    ...getTextStyle('Regular'),
    fontSize: wp('3%'),
    color: COLORS.textLight,
    marginRight: wp('2%'),
  },
});

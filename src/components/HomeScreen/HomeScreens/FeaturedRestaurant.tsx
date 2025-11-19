import React, { useState, useContext } from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Vibration } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
  if (Platform.OS === 'android') {
      return undefined;
  }

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

const getTextStyle = (weight = 'Regular') => {
  return {
      fontFamily: getFontFamily(weight),
      ...(Platform.OS === 'ios' && { fontWeight: getFontWeight(weight) }),
      includeFontPadding: false,
      textAlignVertical: 'center',
  };
};

const FeaturedRestaurant = ({ getCurrentRestaurants, handleRestaurantPress }) => {
  const { theme } = useContext(ThemeContext);
  
  // Keep liked restaurants ids
  const [likedIds, setLikedIds] = useState([]);

  const handleHeartPressWithVibration = (id) => {
    Vibration.vibrate(50);
    setLikedIds(prev =>
      prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.restaurantScrollContent}
      bounces={false}
    >
      {getCurrentRestaurants().map(restaurant => {
        const isLiked = likedIds.includes(restaurant.id);
        return (
          <TouchableOpacity
            key={restaurant.id}
            style={[styles.restaurantCard, { backgroundColor: theme.cardBackground }]}
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
                style={[styles.iconWrapper, isLiked ? styles.heartWrapperFilled : styles.heartWrapperBack]}
                activeOpacity={0.7}
                onPress={(e) => {
                  e.stopPropagation();
                  handleHeartPressWithVibration(restaurant.id);
                }}
              >
                <Image
                  source={
                    isLiked
                      ? require('../../../assets/heartfill.png')
                      : require('../../../assets/heart.png')
                  }
                  style={[styles.heartIcon, isLiked ? styles.heartIconFilled : styles.heartIconWhite]}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <View style={styles.ratingBadge}>
                <Image
                  source={require('../../../assets/star.png')}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
              </View>
            </View>

            <Text style={[styles.restaurantTitle, { color: theme.text }]}>{restaurant.name}</Text>

            <View style={styles.restaurantInfoRow}>
              <Image
                source={require('../../../assets/bike.png')}
                style={[styles.infoIcon, { tintColor: theme.primary }]}
                resizeMode="contain"
              />
              <Text style={[styles.infoTxt, { color: theme.textLight }]}>free delivery</Text>

              <Image
                source={require('../../../assets/clock.png')}
                style={[styles.infoIcon, { tintColor: theme.primary }]}
                resizeMode="contain"
              />
              <Text style={[styles.infoTxt, { color: theme.textLight }]}>{restaurant.deliveryTime}</Text>
            </View>

            <View style={styles.tagsContainer}>
              {restaurant.tags.map((tag, index) => (
                <Text key={index} style={[styles.restaurantTags, { backgroundColor: theme.tagBackground, color: theme.primary }]}>
                  {tag}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FeaturedRestaurant;

const styles = StyleSheet.create({
  restaurantScrollContent: {
    paddingHorizontal: wp('1%'),
    paddingBottom: hp('1%'),
  },
  restaurantCard: {
    width: isTablet ? scaleSize(wp('48%')) : scaleSize(wp('55%')),
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
  heartWrapperBack: {
    backgroundColor: COLORS.primary,
  },
  heartWrapperFilled: {
    backgroundColor: '#fff',
  },
  heartIcon: {
    width: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4%')),
    height: isTablet ? scaleSize(wp('3.5%')) : scaleSize(wp('4%')),
  },
  heartIconWhite: {
    tintColor: '#fff',
  },
  heartIconFilled: {
    tintColor: undefined,
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
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(11),
    color: '#fff',
  },
  restaurantTitle: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(18),
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
  },
  infoTxt: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(12),
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
    paddingHorizontal: wp('2.5%'),
    paddingVertical: isIOS ? hp('0.3%') : hp('0.25%'),
    borderRadius: scaleSize(wp('5%')),
  },
});

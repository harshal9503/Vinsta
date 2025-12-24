import React, { useContext, useState, useEffect, useRef } from 'react';
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
import { useNavigation } from '@react-navigation/native';
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

// Static content matching the design in the screenshot
const OfferSlider = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  const handleFlatDealsPress = () => {
    navigation.navigate('todayOfferView');
  };

  const handleAllOffersPress = () => {
    navigation.navigate('todayOfferView');
  };

  return (
    <View style={styles.row}>
      {/* LEFT CARD – MIN ₹100 OFF / Flat Deals */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.cardLeft}
        onPress={handleFlatDealsPress}
      >
        <View>
          <Text style={styles.leftTitleTop}>MIN ₹100 OFF</Text>
          <Text style={styles.leftTitleBottom}>Flat Deals</Text>
        </View>

        <Image
          source={require('../../../assets/todayoffer.png')}
          style={styles.leftIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* RIGHT CARD – ALL OFFERS / 60% off and more */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.cardRight}
        onPress={handleAllOffersPress}
      >
        <View>
          <Text style={styles.rightTitleTop}>ALL OFFERS</Text>
          <Text style={styles.rightTitleBottom}>60% off and more</Text>
        </View>

        <Image
          source={require('../../../assets/burger.png')} // use your current icon
          style={styles.rightIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.5%'),
  },

  // COMMON CARD BASE
  cardBase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1.4%'),
    borderRadius: wp('5%'),
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },

  cardLeft: {
    // light pink gradient feel via solid + opacity
    backgroundColor: '#FFE6F4',
    marginRight: wp('2%'),
    borderRadius: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1.4%'),
    flex: 1,
  },

  cardRight: {
    backgroundColor: '#E7FFF4',
    marginLeft: wp('2%'),
    borderRadius: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1.4%'),
    flex: 1,
  },

  leftTitleTop: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(13),
    color: '#E1007B', // strong pink
  },
  leftTitleBottom: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(11),
    color: '#C30063',
    marginTop: hp('0.2%'),
  },

  rightTitleTop: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(13),
    color: '#008A4A', // strong green
  },
  rightTitleBottom: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(11),
    color: '#00713A',
    marginTop: hp('0.2%'),
  },

  leftIcon: {
    width: wp('10%'),
    height: wp('10%'),
    marginLeft: wp('2.5%'),
  },
  rightIcon: {
    width: wp('10%'),
    height: wp('10%'),
    marginLeft: wp('2.5%'),
  },
});

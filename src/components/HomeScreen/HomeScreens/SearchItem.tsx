import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
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
const SearchItem = ({ onOpenFilter, hasActiveFilters }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.searchContainer}>

      <TouchableOpacity
        style={styles.searchBarContainer}
        onPress={() => navigation.navigate('Search')}
        activeOpacity={0.8}
      >
        <Image
          source={require('../../../assets/search.png')}
          style={styles.searchIcon}
        />
        <Text style={styles.searchPlaceholder}>
          Find for food or restaurant...
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filterBtn}
        activeOpacity={0.8}
        onPress={onOpenFilter}
      >
        <Image
          source={require('../../../assets/filter.png')}
          style={styles.filterIcon}
        />

        {hasActiveFilters() && <View style={styles.filterDot} />}
      </TouchableOpacity>

    </View>
  );
};

export default SearchItem

const styles = StyleSheet.create({
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('1%'),
      },
      searchBarContainer: {
        backgroundColor: '#fff',
        borderRadius: scaleSize(wp('3%')),
        paddingVertical: isIOS ? hp('1.8%') : hp('1.5%'),
        paddingHorizontal: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: wp('3%'),
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          android: {
            elevation: 3,
          },
        }),
      },
      searchIcon: {
        width: isTablet ? scaleSize(wp('4%')) : scaleSize(wp('5%')),
        height: isTablet ? scaleSize(wp('4%')) : scaleSize(wp('5%')),
        resizeMode: 'contain',
        marginRight: wp('2%'),
        tintColor: '#999',
      },
      searchPlaceholder: {
        ...getTextStyle('Regular'),
        fontSize: fontScale(14),
        flex: 1,
        color: '#999',
      },
      filterBtn: {
        backgroundColor: '#fff',
        borderRadius: scaleSize(wp('3%')),
        padding: scaleSize(wp('3%')),
        justifyContent: 'center',
        alignItems: 'center',
        width: isTablet ? scaleSize(wp('11%')) : scaleSize(wp('13%')),
        height: isTablet ? scaleSize(wp('11%')) : scaleSize(wp('13%')),
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          android: {
            elevation: 3,
          },
        }),
      },
      filterIcon: {
        width: isTablet ? scaleSize(wp('5%')) : scaleSize(wp('6%')),
        height: isTablet ? scaleSize(wp('5%')) : scaleSize(wp('6%')),
        resizeMode: 'contain',
      },
      filterDot: {
        position: 'absolute',
        top: scaleSize(wp('2%')),
        right: scaleSize(wp('2%')),
        width: scaleSize(wp('0%')),
        height: scaleSize(wp('0%')),
        borderRadius: scaleSize(wp('1%')),
        backgroundColor: 'red',
      },
})
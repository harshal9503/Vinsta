import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';
const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;
const isSmallScreen = width < 380;
const screenRatio = width / height;
const isIOS = Platform.OS === 'ios';

const categories = [
    { name: 'Burger', img: require('../../../assets/burger.png') },
    { name: 'Mexican', img: require('../../../assets/burger.png') },
    { name: 'Asian', img: require('../../../assets/burger.png') },
    { name: 'Donut', img: require('../../../assets/donut.png') },
];    

// iOS-specific font scaling
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

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState('Burger');
    const { theme } = useContext(ThemeContext);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categorySliderContent}
            bounces={false}
        >
            {categories.map(cat => (
                <TouchableOpacity
                    key={cat.name}
                    style={[
                        styles.categoryBtn,
                        { backgroundColor: theme.cardBackground },
                        selectedCategory === cat.name && [styles.categoryBtnActive, { backgroundColor: COLORS.primary }],
                    ]}
                    onPress={() => setSelectedCategory(cat.name)}
                    activeOpacity={0.8}
                >
                    <Image
                        source={cat.img}
                        style={[
                            styles.categoryIcon,
                            selectedCategory === cat.name && styles.categoryIconActive
                        ]}
                        resizeMode="contain"
                    />
                    <Text
                        style={[
                            styles.categoryTxt,
                            { color: theme.text },
                            selectedCategory === cat.name && [styles.categoryTxtActive, { color: theme.buttonText }],
                        ]}
                    >
                        {cat.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Categories

const styles = StyleSheet.create({
    categorySliderContent: {
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('1%'),
    },
    categoryBtn: {
        borderRadius: wp('50%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp('3%'),
        paddingVertical: isIOS ? hp('1.3%') : hp('1.1%'),
        paddingHorizontal: wp('4%'),
        flexDirection: 'row',
        minWidth: isTablet ? scaleSize(wp('18%')) : scaleSize(wp('22%')),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    categoryBtnActive: {
        // backgroundColor is now handled dynamically with theme
    },
    categoryIcon: {
        width: isTablet ? scaleSize(wp('4.5%')) : scaleSize(wp('5.5%')),
        height: isTablet ? scaleSize(wp('4.5%')) : scaleSize(wp('5.5%')),
        marginRight: wp('2%'),
        tintColor: COLORS.primary,
    },
    categoryIconActive: {
        tintColor: COLORS.secondary,
    },
    categoryTxt: {
        ...getTextStyle('Medium'),
        fontSize: fontScale(14),
    },
    categoryTxtActive: {
        ...getTextStyle('SemiBold'),
    },
})
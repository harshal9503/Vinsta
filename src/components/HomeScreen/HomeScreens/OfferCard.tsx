import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { COLORS } from '../../../theme/colors'
import { useNavigation } from '@react-navigation/native';
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

const OfferCard = () => {
      const navigation = useNavigation<any>();
    const handleViewOffers = () => {
    navigation.navigate('todayOfferView');
  };

    return (
        <View style={styles.offerCard}>
            <View style={styles.offerContent}>
                <Text style={styles.offerHeader}>Free Delivery</Text>
                <Text style={styles.offerSubTxt}>
                    Enjoy exclusive discount on tasty{'\n'}food today!
                </Text>
                <TouchableOpacity
                    style={styles.offerButton}
                    onPress={handleViewOffers}
                    activeOpacity={0.8}
                >
                    <Text style={styles.offerBtnText}>VIEW OFFER'S</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.offerImageWrap}>
                {/* <Image
                    source={require('../../../assets/todayoffer.png')}
                    style={styles.offerImage}
                    resizeMode="contain"
                /> */}
            </View>
        </View>
    )
}

export default OfferCard

const styles = StyleSheet.create({
    offerCard: {
        borderRadius: scaleSize(wp('4%')),
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: scaleSize(wp('4%')),
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
    offerContent: {
        flex: 1,
        marginRight: wp('2%'),
    },
    offerHeader: {
        ...getTextStyle('Bold'),
        fontSize: fontScale(20),
        color: 'black',
        marginBottom: hp('0.5%'),
    },
    offerSubTxt: {
        ...getTextStyle('Regular'),
        fontSize: fontScale(13),
        color: COLORS.textLight,
        marginBottom: hp('1.5%'),
        lineHeight: hp('2%'),
    },
    offerButton: {
        backgroundColor: COLORS.primary,
        borderRadius: scaleSize(wp('2%')),
        paddingVertical: isIOS ? hp('1.2%') : hp('1%'),
        paddingHorizontal: wp('4%'),
        alignSelf: 'flex-start',
    },
    offerBtnText: {
        ...getTextStyle('Bold'),
        fontSize: fontScale(13),
        color: COLORS.secondary,
        letterSpacing: 0.3,
    },
    offerImageWrap: {
        width: isTablet ? scaleSize(wp('25%')) : scaleSize(wp('30%')),
        height: isTablet ? scaleSize(wp('25%')) : scaleSize(wp('30%')),
        justifyContent: 'center',
        alignItems: 'center',
    },
    offerImage: {
        width: '100%',
        height: '100%',
    },
})
import { Animated, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { COLORS } from '../../../theme/colors'
import { useNavigation } from '@react-navigation/native';
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

const TitleRow = ({ isVegMode, toggleVegMode }) => {
    const toggleAnim = useState(new Animated.Value(0))[0];
    const switchWidth = isTablet ? scaleSize(wp('14%')) : scaleSize(wp('17%'));
    const switchHeight = isTablet ? hp('3.5%') : hp('4%');
    const circleSize = isTablet ? hp('2.8%') : hp('3.2%');
    const padding = wp('0.8%');
    const maxTranslateX = switchWidth - circleSize - padding * 2;

    const translateX = toggleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [padding, maxTranslateX],
    });

    const toggleBgColor = toggleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['green', 'red'],
    });

    const toggleSwitch = () => {
        Animated.timing(toggleAnim, {
            toValue: isVegMode ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();

        toggleVegMode();
    };
    
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.titleRow}>
            <Text style={[styles.headerTitle, { color: theme.background }]}>
                What you{'\n'}Going eat for today ?
            </Text>
            <View style={styles.vegContainer}>
                <TouchableOpacity
                    style={[
                        styles.switchOuter,
                        { backgroundColor: theme.background },
                        {
                            width: switchWidth,
                            height: switchHeight,
                        },
                    ]}
                    onPress={toggleSwitch}
                    activeOpacity={0.8}
                >
                    <View style={[styles.switchBackground, { backgroundColor: theme.switchBackground }]} />

                    <Animated.View
                        style={[
                            styles.switchCircle,
                            {
                                width: circleSize,
                                height: circleSize,
                                borderRadius: circleSize / 2,
                                transform: [{ translateX }],
                                backgroundColor: toggleBgColor,
                            },
                        ]}
                    />

                    <View style={styles.switchLabelsContainer}>
                        <Text
                            style={[
                                styles.switchTextLeft,
                                {
                                    color: isVegMode ? theme.buttonText : theme.text,
                                },
                            ]}
                        >
                            OFF
                        </Text>
                        <Text
                            style={[
                                styles.switchTextRight,
                                {
                                    color: !isVegMode ? theme.buttonText : theme.text,
                                },
                            ]}
                        >
                            ON
                        </Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.vegModeTxt, { color: theme.background }]}>
                    {isVegMode ? 'Veg Mode' : 'Non-Veg Mode'}
                </Text>
            </View>
        </View>
    )
}

export default TitleRow

const styles = StyleSheet.create({
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: hp('2%'),
    },
    headerTitle: {
        ...getTextStyle('Bold'),
        fontSize: fontScale(24),
        lineHeight: isTablet ? hp('3.2%') : hp('3.6%'),
        flex: 1,
    },
    vegContainer: {
        alignItems: 'center',
        marginLeft: wp('2%'),
    },
    switchOuter: {
        borderRadius: hp('2.25%'),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
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
    switchBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: hp('2.25%'),
    },
    switchCircle: {
        position: 'absolute',
        left: 0,
        top: '50%',
        marginTop: -(isTablet ? hp('2.8%') : hp('3.2%')) / 2,
        zIndex: 2,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    switchLabelsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('2.5%'),
        zIndex: 1,
    },
    switchTextLeft: {
        ...getTextStyle('SemiBold'),
        fontSize: fontScale(10),
    },
    switchTextRight: {
        ...getTextStyle('SemiBold'),
        fontSize: fontScale(10),
    },
    vegModeTxt: {
        ...getTextStyle('Bold'),
        fontSize: fontScale(12),
        marginTop: hp('0.6%'),
    },
})
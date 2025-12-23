import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const categories = [
  { name: 'Burger', img: require('../../../assets/burger.png') },
  { name: 'Mexican', img: require('../../../assets/mexican1.png') },
  { name: 'Asian', img: require('../../../assets/asian.png') },
  { name: 'Burgerr', img: require('../../../assets/burger.png') },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Burger');
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categorySlider}
      contentContainerStyle={styles.categorySliderContent}
      bounces={false}
    >
      {categories.map(cat => {
        const selected = selectedCategory === cat.name;

        return (
          <TouchableOpacity
            key={cat.name}
            style={[
              styles.categoryBtn,

              // 🔶 Selected button (active)
              selected && styles.categoryBtnActive,

              // 🌙 Dark + Light Mode for UNSELECTED buttons
              !selected
                ? isDarkMode || theme.mode === 'dark'
                  ? {
                      backgroundColor: theme.cardBackground ?? '#1E1E1E',
                      borderColor:
                        theme.borderColor ?? 'rgba(255,255,255,0.06)',
                      borderWidth: 1,
                    }
                  : {
                      backgroundColor: '#FFFFFF',
                      borderWidth: 0,
                    }
                : null,
            ]}
            onPress={() => setSelectedCategory(cat.name)}
            activeOpacity={0.8}
          >
            {selected ? (
              <View style={styles.selectedIconCircle}>
                <Image
                  source={cat.img}
                  style={[
                    styles.categoryIconSelected,
                    cat.name === 'Donut' && styles.donutIcon,
                  ]}
                />
              </View>
            ) : (
              <Image
                source={cat.img}
                style={[
                  styles.categoryIcon,
                  cat.name === 'Donut' && styles.donutIcon,
                ]}
              />
            )}

            <Text
              style={[
                styles.categoryTxt,
                selected
                  ? { color: '#FFF' } // active text
                  : { color: COLORS.primary }, // normal text
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categorySlider: {
    paddingVertical: hp('0.3%'), // ✅ COMPACT: Reduced vertical padding
    marginVertical: hp('0.3%'), // ✅ COMPACT: Reduced margin
    marginLeft: wp('1%'),
  },
  categorySliderContent: {
    paddingRight: wp('4%'), // ✅ COMPACT: Reduced right padding
  },
  categoryBtn: {
    backgroundColor: '#fff',
    borderRadius: wp('15%'), // ✅ COMPACT: Smaller border radius
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: wp('2.5%'), // ✅ COMPACT: Reduced margin
    paddingVertical: hp('0.8%'), // ✅ COMPACT: Reduced padding
    paddingHorizontal: wp('0%'),
    flexDirection: 'row',
    height: hp('5%'), // ✅ COMPACT: Smaller height (was 6.5%)
    minWidth: wp('22%'), // ✅ COMPACT: Smaller width (was 28%)

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 }, // ✅ COMPACT: Reduced shadow
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // 🔶 ACTIVE button style
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
  },

  selectedIconCircle: {
    backgroundColor: '#fff',
    borderRadius: wp('40%'), // ✅ COMPACT: Smaller circle
    width: wp('8.5%'), // ✅ COMPACT: Smaller (was 11%)
    height: wp('8.5%'), // ✅ COMPACT: Smaller (was 11%)
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('1.2%'), // ✅ COMPACT: Reduced margins
    marginRight: wp('1.8%'), // ✅ COMPACT: Reduced margins
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.8 },
        shadowOpacity: 0.12,
        shadowRadius: 1.2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  categoryIcon: {
    width: wp('8.5%'), // ✅ COMPACT: Smaller (was 11%)
    height: wp('8.5%'), // ✅ COMPACT: Smaller (was 11%)
    marginLeft: wp('3.2%'), // ✅ COMPACT: Adjusted for smaller container
    marginRight: wp('1.8%'),
  },
  categoryIconSelected: {
    width: wp('7%'), // ✅ COMPACT: Smaller (was 9%)
    height: wp('7%'), // ✅ COMPACT: Smaller (was 9%)
  },

  categoryTxt: {
    color: COLORS.primary,
    fontSize: hp('1.4%'), // ✅ COMPACT: Smaller text (was 1.8%)
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
    letterSpacing: 0.15, // ✅ COMPACT: Slightly reduced
    flex: 1,
    textAlign: 'center',
    marginRight: wp('1.5%'), // ✅ COMPACT: Reduced margin
  },

  donutIcon: {
    width: wp('8%'), // ✅ COMPACT: Adjusted for donut
    height: wp('8%'),
    marginLeft: wp('3.4%'),
  },
});

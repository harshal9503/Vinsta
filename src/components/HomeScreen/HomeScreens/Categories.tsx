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
                ? (isDarkMode || theme.mode === 'dark'
                    ? {
                        backgroundColor: theme.cardBackground ?? '#1E1E1E',
                        borderColor: theme.borderColor ?? 'rgba(255,255,255,0.06)',
                        borderWidth: 1,
                      }
                    : {
                        backgroundColor: '#FFFFFF',
                        borderWidth: 0,
                      })
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
    paddingVertical: hp('0.5%'),
    marginVertical: hp('0.5%'),
    marginLeft: wp('1%'),
  },
  categorySliderContent: {
    paddingRight: wp('5.5%'),
  },
  categoryBtn: {
    backgroundColor: '#fff',
    borderRadius: wp('20%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: wp('3%'),
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('0%'),
    flexDirection: 'row',
    height: hp('6.5%'),
    minWidth: wp('28%'),

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
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
    borderRadius: wp('50%'),
    width: wp('11%'),
    height: wp('11%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('1.5%'),
    marginRight: wp('2.5%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  categoryIcon: {
    width: wp('11%'),
    height: wp('11%'),
    marginLeft: wp('4%'),
    marginRight: wp('2.5%'),
  },
  categoryIconSelected: {
    width: wp('9%'),
    height: wp('9%'),
  },

  categoryTxt: {
    color: COLORS.primary,
    fontSize: hp('1.8%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
    letterSpacing: 0.2,
    flex: 1,
    textAlign: 'center',
    marginRight: wp('3%'),
  },

  donutIcon: {
    width: wp('10%'),
    height: wp('10%'),
    marginLeft: wp('4.2%'),
  },
});

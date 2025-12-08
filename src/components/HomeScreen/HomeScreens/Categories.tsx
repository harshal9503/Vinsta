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
  const { theme } = useContext(ThemeContext);

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
            style={[styles.categoryBtn, selected && styles.categoryBtnActive]}
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
              style={[styles.categoryTxt, selected && styles.categoryTxtActive]}
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
    paddingVertical: hp('0.5%'), // CHANGED: Increased vertical padding
    marginVertical: hp('0.5%'), // CHANGED: Increased vertical margin
    marginLeft: wp('1%'), // CHANGED: Changed from wp('1%') to wp('5.5%') for proper left margin
  },
  categorySliderContent: {
    paddingRight: wp('5.5%'),
  },
  categoryBtn: {
    backgroundColor: '#fff',
    borderRadius: wp('20%'), // CHANGED: Changed from wp('50%') to wp('20%') for less rounded corners
    alignItems: 'center',
    justifyContent: 'flex-start', // CHANGED: Changed from 'center' to 'flex-start' to align items to left
    marginRight: wp('3%'),
    paddingVertical: hp('1.2%'), // CHANGED: Increased vertical padding
    paddingHorizontal: wp('0%'), // CHANGED: Changed from wp('3%') to wp('0%') - remove horizontal padding
    flexDirection: 'row',
    height: hp('6.5%'), // CHANGED: Changed from minHeight to fixed height for consistent size
    minWidth: wp('28%'), // CHANGED: Added minWidth for better button sizing
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
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
  },
  selectedIconCircle: {
    backgroundColor: '#fff',
    borderRadius: wp('50%'),
    width: wp('11%'), // CHANGED: Increased width
    height: wp('11%'), // CHANGED: Increased height
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('1.5%'), // CHANGED: Added marginLeft to move icon more left
    marginRight: wp('2.5%'), // CHANGED: Increased marginRight
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
    width: wp('11%'), // CHANGED: Increased width
    height: wp('11%'), // CHANGED: Increased height
    marginLeft: wp('4%'), // CHANGED: Changed from wp('3%') to wp('4%') - moved icon more left
    marginRight: wp('2.5%'), // CHANGED: Added marginRight for spacing
  },
  categoryIconSelected: {
    width: wp('9%'), // CHANGED: Increased width
    height: wp('9%'), // CHANGED: Increased height
  },
  categoryTxt: {
    color: COLORS.primary,
    fontSize: hp('1.8%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
    letterSpacing: 0.2,
    flex: 1, // CHANGED: Added flex: 1 to make text take available space
    textAlign: 'center', // CHANGED: Center text horizontally
    marginRight: wp('3%'), // CHANGED: Added right margin for balance
  },
  categoryTxtActive: {
    color: COLORS.secondary,
  },
  donutIcon: {
    width: wp('10%'),
    height: wp('10%'),
    marginLeft: wp('4.2%'), // CHANGED: Slightly more left margin for donut
  },
});

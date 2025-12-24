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
  { name: 'All', img: require('../../../assets/ct1.png') },
  { name: 'Veg Meal', img: require('../../../assets/ct2.png') },
  { name: 'Thali', img: require('../../../assets/ct4.png') },
  { name: 'Pizza', img: require('../../../assets/ct3.png') },
  { name: 'Burger', img: require('../../../assets/ct2.png') },
  { name: 'Mexican', img: require('../../../assets/ct3.png') },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[
        styles.categorySlider,
        isDarkMode || theme.mode === 'dark' 
          ? { backgroundColor: theme.backgroundColor || '#000' }
          : { backgroundColor: '#FFF' }
      ]}
      contentContainerStyle={styles.categorySliderContent}
      bounces={false}
    >
      {categories.map((cat, index) => {
        const selected = selectedCategory === cat.name;
        
        return (
          <TouchableOpacity
            key={cat.name}
            style={[
              styles.categoryItem,
              index > 0 && { marginLeft: wp('3.5%') }
            ]}
            onPress={() => setSelectedCategory(cat.name)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryContent}>
              <Image
                source={cat.img}
                style={styles.categoryIcon}
                resizeMode="contain"
              />
              
              <Text style={[
                styles.categoryText,
                selected 
                  ? { color: COLORS.primary }
                  : { color: isDarkMode || theme.mode === 'dark' ? '#AAA' : '#666' }
              ]}>
                {cat.name}
              </Text>
              
              {selected && (
                <View style={styles.selectedIndicator} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categorySlider: {
    paddingVertical: hp('1%'),
  },
  categorySliderContent: {
    paddingHorizontal: wp('3%'),
    alignItems: 'center',
    paddingVertical: hp('0.5%'),
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: wp('18%'),
  },
  categoryContent: {
    alignItems: 'center',
    position: 'relative',
    paddingBottom: hp('0.6%'),
  },
  categoryIcon: {
    width: wp('12%'),
    height: wp('12%'),
    marginBottom: hp('0.8%'),
  },
  categoryText: {
    fontSize: hp('1.4%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-SemiBold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? '600' : '600',
    textAlign: 'center',
    marginBottom: hp('0.3%'),
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 0,
    width: wp('6%'),
    height: hp('0.25%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('0.25%'),
  },
});
// components/BestInBurger/index.tsx
import React, { useContext } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';
import { vibrate } from '../../../../utils/vibrationHelper';
import { ThemeContext } from '../../../../theme/ThemeContext';

const BestInBurger = ({
  foodItems,
  likedItems,
  heartScales,
  plusScales,
  handleHeartPress,
  handlePlusPress,
  handleFoodItemPress,
}) => {

  const { theme } = useContext(ThemeContext);
  const isDark = theme.mode === 'dark';

  const handleHeartPressWithVibration = (id: number) => {
    vibrate(40);
    handleHeartPress(id);
  };

  const handlePlusPressWithVibration = (id: number) => {
    vibrate(30);
    handlePlusPress(id);
  };

 return (
  <View style={styles.grid}>
    {foodItems.map((f) => {
      const isLiked = likedItems.includes(f.id);

      return (
        <View
          key={`best-${f.id}`}
          style={[
            styles.foodCard,
            { backgroundColor: theme.cardBackground }
          ]}
        >
          {/* HEART BUTTON */}
          <TouchableOpacity
            style={[
              styles.productHeartWrapper,
              { backgroundColor: isLiked ? '#ffffffdd' : '#ffffff33' }
            ]}
            onPress={() => handleHeartPressWithVibration(f.id)}
            activeOpacity={0.7}
          >
            <Animated.Image
              source={
                isLiked
                  ? require('../../../../assets/heartfill.png')
                  : require('../../../../assets/heart.png')
              }
              style={[
                styles.heartIcon,
                { tintColor: isLiked ? COLORS.primary : '#fff' },
                { transform: [{ scale: heartScales[f.id] || 1 }] }
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* IMAGE */}
          <TouchableOpacity activeOpacity={0.9} onPress={() => handleFoodItemPress(f)}>
            <Image source={f.img} style={styles.foodImg} resizeMode="cover" />

            {/* RATING BADGE */}
            <View style={styles.productRatingBadge}>
              <Image
                source={require('../../../../assets/star.png')}
                style={styles.starIcon}
                resizeMode="contain"
              />
              <Text style={styles.ratingText}>4.4</Text>
            </View>
          </TouchableOpacity>

          {/* FOOD INFO */}
          <View style={styles.foodInfo}>
            <Text
              style={[
                styles.foodName,
                { color: theme.text }
              ]}
            >
              {f.name}
            </Text>

            {/* PRICE ROW */}
            <View style={styles.priceRow}>
              <Text
                style={[
                  styles.price,
                  { color: theme.text }
                ]}
              >
                ₹ {f.price.toFixed(2)}
              </Text>

              <Text
                style={[
                  styles.oldPrice,
                  { color: isDark ? '#ff6b6b' : '#FA463D' }
                ]}
              >
                ₹ {f.oldPrice.toFixed(2)}
              </Text>

              <TouchableOpacity
                onPress={() => handlePlusPressWithVibration(f.id)}
                style={styles.plusBtn}
              >
                <Animated.Image
                  source={require('../../../../assets/plus.png')}
                  style={[
                    styles.plusIcon,
                    { transform: [{ scale: plusScales[f.id] || 1 }] }
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* TIME ROW */}
            <View style={styles.timeRow}>
              <Image
                source={require('../../../../assets/clockk.png')}
                style={[
                  styles.clockIcon,
                  { tintColor: isDark ? theme.text : COLORS.primary }
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.timeText,
                  {
                    color: theme.text ? theme.text : '#666',
                    fontWeight: 'bold'
                  }
                ]}
              >
                {f.time}
              </Text>
            </View>
          </View>

        </View>
      );
    })}
  </View>
);
}

export default BestInBurger;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: wp('5.5%'),
    marginTop: hp('0.7%'),
  },

  foodCard: {
    width: wp('44%'),
    borderRadius: wp('4.5%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
    overflow: 'hidden',
    position: 'relative',
  },

  productHeartWrapper: {
    position: 'absolute',
    right: wp('3%'),
    top: hp('1.2%'),
    borderRadius: wp('5%'),
    padding: wp('2%'),
    zIndex: 8,
  },

  heartIcon: {
    width: wp('4%'),
    height: wp('4%'),
  },

  foodImg: {
    width: '100%',
    height: hp('13%'),
    borderTopLeftRadius: wp('4.5%'),
    borderTopRightRadius: wp('4.5%'),
  },

  productRatingBadge: {
    position: 'absolute',
    bottom: hp('1%'),
    right: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },

  starIcon: {
    width: wp('3%'),
    height: wp('3%'),
    marginRight: wp('1%'),
    tintColor: '#fff',
  },

  ratingText: {
    color: '#fff',
    fontSize: hp('1.3%'),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  foodInfo: {
    padding: wp('2.5%'),
    paddingTop: hp('0.8%'),
  },

  foodName: {
    fontSize: hp('1.6%'),
    marginBottom: hp('0.3%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('0.2%'),
  },

  price: {
    fontSize: hp('1.6%'),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  oldPrice: {
    fontSize: hp('1.3%'),
    textDecorationLine: 'line-through',
    marginLeft: wp('1%'),
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },

  plusBtn: {
    backgroundColor: COLORS.primary,
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('2%'),
  },

  plusIcon: {
    width: wp('4%'),
    height: wp('4%'),
    tintColor: '#fff',
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.6%'),
    gap: wp('1.8%'),
  },

  clockIcon: {
    width: wp('4%'),
    height: wp('4%'),
  },

  timeText: {
    fontSize: hp('1.3%'),
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
});

// components/BestInBurger/index.tsx
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import { COLORS } from '../../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';
import { vibrate } from '../../../../utils/vibrationHelper'; // <-- vibration import


const BestInBurger = ({
  foodItems,
  likedItems,
  heartScales,
  plusScales,
  handleHeartPress,
  handlePlusPress,
  handleFoodItemPress,
}) => {

  const handleHeartPressWithVibration = (id: number) => {
    vibrate(50);
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
          <View key={`best-${f.id}`} style={styles.foodCard}>

            {/* Heart Icon with bg color condition and vibration */}
            <TouchableOpacity
              style={[
                styles.heartWrapper,
                isLiked ? styles.heartWrapperFilled : styles.heartWrapperBack,
              ]}
              onPress={() => handleHeartPressWithVibration(f.id)}
            >
              <Animated.Image
                source={
                  isLiked
                    ? require('../../../../assets/heartfill.png')
                    : require('../../../../assets/heart.png')
                }
                style={[
                  styles.heartIconSmall,
                  isLiked && styles.heartIconFilled,
                  { transform: [{ scale: heartScales[f.id] || 1 }] },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Food Image */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleFoodItemPress(f)}>
              <Image source={f.img} style={styles.foodImg} resizeMode="cover" />

              {/* Rating Badge */}
              <View style={styles.foodRatingBadge}>
                <Image
                  source={require('../../../../assets/star.png')}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: hp('1.3%'),
                    fontFamily: getFontFamily('SemiBold'),
                    fontWeight: getFontWeight('SemiBold'),
                  }}
                >
                  4.4
                </Text>
              </View>
            </TouchableOpacity>

            {/* Food Info */}
            <View style={styles.foodInfo}>
              <Text
                style={{
                  fontSize: hp('1.6%'),
                  color: '#222',
                  marginBottom: hp('0.3%'),
                  fontFamily: getFontFamily('Bold'),
                  fontWeight: getFontWeight('Bold'),
                }}
              >
                {f.name}
              </Text>

              {/* Price Row */}
              <View style={styles.priceRow}>
                <Text
                  style={{
                    fontSize: hp('1.6%'),
                    color: '#222',
                    fontFamily: getFontFamily('SemiBold'),
                    fontWeight: getFontWeight('SemiBold'),
                  }}
                >
                  ₹ {f.price.toFixed(2)}
                </Text>

                <Text
                  style={{
                    fontSize: hp('1.3%'),
                    color: '#FA463D',
                    textDecorationLine: 'line-through',
                    marginLeft: wp('1%'),
                    fontFamily: getFontFamily('Regular'),
                    fontWeight: getFontWeight('Regular'),
                  }}
                >
                  ₹ {f.oldPrice.toFixed(2)}
                </Text>

                <TouchableOpacity
                  onPress={() => handlePlusPressWithVibration(f.id)}
                  style={styles.plusBtn}
                >
                  <Animated.Image
                    source={require('../../../../assets/plus.png')}
                    style={[styles.plusIcon, { transform: [{ scale: plusScales[f.id] || 1 }] }]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              {/* Time Row */}
              <View style={styles.timeRow}>
                <Image source={require('../../../../assets/clockk.png')} style={styles.clockIcon} resizeMode="contain" />
                <Text
                  style={{
                    fontSize: hp('1.3%'),
                    color: '#666',
                    fontFamily: getFontFamily('Medium'),
                    fontWeight: getFontWeight('Medium'),
                  }}
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
};


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
    backgroundColor: '#fff',
    borderRadius: wp('4.5%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  heartWrapper: {
    position: 'absolute',
    right: wp('3%'),
    top: hp('1.2%'),
    borderRadius: wp('5%'),
    padding: wp('1.8%'),
    zIndex: 8,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  heartWrapperBack: {
    backgroundColor: 'rgba(0,0,0,0.25)', // same as RecommendedFood
  },
  heartWrapperFilled: {
    backgroundColor: '#fff',
  },
  heartIconSmall: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    tintColor: '#fff',
  },
  heartIconFilled: {
    tintColor: undefined,
  },
  foodImg: {
    width: '100%',
    height: hp('13%'),
    borderTopLeftRadius: wp('4.5%'),
    borderTopRightRadius: wp('4.5%'),
  },
  foodRatingBadge: {
    position: 'absolute',
    bottom: hp('1%'),
    right: wp('3%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('1.5%'),
    paddingVertical: hp('0.4%'),
  },
  starIcon: {
    width: wp('3%'),
    height: wp('3%'),
    tintColor: '#fff',
    marginRight: wp('1%'),
  },
  foodInfo: {
    padding: wp('2.5%'),
    paddingTop: hp('0.8%'),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('0.2%'),
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
    tintColor: COLORS.primary,
  },
});

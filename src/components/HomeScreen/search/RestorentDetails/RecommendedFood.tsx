<<<<<<< HEAD
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../theme/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const RecommendedFood = ({
  foodItems,
  likedItems,
  heartScales,
  plusScales,
  handleHeartPress,
  handlePlusPress,
  handleFoodItemPress
}) => {
  return (
    <View style={styles.grid}>
      {foodItems.map(f => (
        <View key={f.id} style={styles.foodCard}>
          
          {/* Heart Icon */}
          <TouchableOpacity
            style={[styles.heartWrapper, styles.heartWrapperBack]}
            onPress={() => handleHeartPress(f.id)}
          >
            <Animated.Image
              source={
                likedItems.includes(f.id)
                  ? require('../../../../assets/heartfill.png')
                  : require('../../../../assets/heart.png')
              }
              style={[
                styles.heartIconSmall,
                { transform: [{ scale: heartScales[f.id] || 1 }] },
              ]}
            />
          </TouchableOpacity>

          {/* Food Image */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleFoodItemPress(f)}
          >
            <Image source={f.img} style={styles.foodImg} />
            <View style={styles.foodRatingBadge}>
              <Image
                source={require('../../../../assets/star.png')}
                style={styles.starIcon}
              />
              <Text style={styles.ratingText}>4.4</Text>
            </View>
          </TouchableOpacity>

          {/* Food Info */}
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>{f.name}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>₹ {f.price.toFixed(2)}</Text>
              <Text style={styles.oldPrice}>₹ {f.oldPrice.toFixed(2)}</Text>

              <TouchableOpacity onPress={() => handlePlusPress(f.id)} style={styles.plusBtn}>
                <Animated.Image
                  source={require('../../../../assets/plus.png')}
                  style={[
                    styles.plusIcon,
                    { transform: [{ scale: plusScales[f.id] || 1 }] },
                  ]}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.timeRow}>
              <Image
                source={require('../../../../assets/clock.png')}
                style={styles.clockIcon}
              />
              <Text style={styles.timeText}>{f.time}</Text>
            </View>

          </View>
        </View>
      ))}
    </View>
  )
}

const styles=StyleSheet.create({
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
    backgroundColor: COLORS.primary,
    borderRadius: wp('5%'),
    padding: wp('1.8%'),
    zIndex: 8,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  heartWrapperBack: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heartIconSmall: {
    width: wp('3.8%'),
    height: wp('3.8%'),
    tintColor: '#fff',
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
  ratingText: {
    color: '#fff',
    fontSize: hp('1.3%'),
    fontWeight: '600',
  },

  foodInfo: {
    padding: wp('2.5%'),
    paddingTop: hp('0.8%'),
  },
  foodName: {
    fontWeight: '700',
    color: '#222',
    fontSize: hp('1.6%'),
    marginBottom: hp('0.3%'),
    fontFamily: 'Figtree-Bold'
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('0.2%'),
  },
  price: {
    fontWeight: '600',
    color: '#222',
    fontSize: hp('1.6%'),
    fontFamily: "Figtree-SemiBold"
  },
  oldPrice: {
    fontSize: hp('1.3%'),
    color: '#FA463D',
    textDecorationLine: 'line-through',
    marginLeft: wp('1%'),
    fontFamily: "Figtree-Regular"

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
    width: wp('3.5%'),
    height: wp('3.5%'),
    tintColor: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.6%'),
    gap: wp('1.8%'),
  },
  clockIcon: {
    width: wp('3.2%'),
    height: wp('3.2%'),
    tintColor: COLORS.primary,
  },
  timeText: {
    fontSize: hp('1.3%'),
    color: '#666',
    fontWeight: '600',
    fontFamily: 'Figtree-Regular'
  },
})

export default RecommendedFood
=======
// RecommendedFood.tsx
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../theme/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper'
import { vibrate } from '../../../../utils/vibrationHelper'  // <-- IMPORT HERE

const RecommendedFood = ({
  foodItems,
  likedItems,
  heartScales,
  plusScales,
  handleHeartPress,
  handlePlusPress,
  handleFoodItemPress
}) => {
  
  const handleHeartPressWithVibration = (id: number) => {
    vibrate(50);  // <--- ADDED VIBRATION
    handleHeartPress(id);
  };

  const handlePlusPressWithVibration = (id: number) => {
    vibrate(30);  // <--- ADDED VIBRATION
    handlePlusPress(id);
  };

  return (
    <View style={styles.grid}>
      {foodItems.map(f => {
        const isLiked = likedItems.includes(f.id);
        return (
          <View key={f.id} style={styles.foodCard}>

            {/* Heart Icon */}
            <TouchableOpacity
              style={[
                styles.heartWrapper,
                isLiked ? styles.heartWrapperFilled : styles.heartWrapperBack
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
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleFoodItemPress(f)}
            >
              <Image
                source={f.img}
                style={styles.foodImg}
                resizeMode="cover"
              />
              <View style={styles.foodRatingBadge}>
                <Image
                  source={require('../../../../assets/star.png')}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>4.4</Text>
              </View>
            </TouchableOpacity>

            {/* Food Info */}
            <View style={styles.foodInfo}>
              <Text 
                style={[
                  styles.foodName,
                  {
                    fontFamily: getFontFamily('Bold'),
                    fontWeight: getFontWeight('Bold'),
                  }
                ]}
              >
                {f.name}
              </Text>

              <View style={styles.priceRow}>
                <Text 
                  style={[
                    styles.price,
                    {
                      fontFamily: getFontFamily('SemiBold'),
                      fontWeight: getFontWeight('SemiBold'),
                    }
                  ]}
                >
                  ₹ {f.price.toFixed(2)}
                </Text>
                <Text 
                  style={[
                    styles.oldPrice,
                    {
                      fontFamily: getFontFamily('Regular'),
                      fontWeight: getFontWeight('Regular'),
                    }
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
                      { transform: [{ scale: plusScales[f.id] || 1 }] },
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.timeRow}>
                <Image
                  source={require('../../../../assets/clock.png')}
                  style={styles.clockIcon}
                  resizeMode="contain"
                />
                <Text 
                  style={[
                    styles.timeText,
                    {
                      fontFamily: getFontFamily('Regular'),
                      fontWeight: getFontWeight('Regular'),
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
  )
}

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
    backgroundColor: 'rgba(0,0,0,0.25)',
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
  ratingText: {
    color: '#fff',
    fontSize: hp('1.3%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-SemiBold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '600',
  },

  foodInfo: {
    padding: wp('2.5%'),
    paddingTop: hp('0.8%'),
  },
  foodName: {
    color: '#222',
    fontSize: hp('1.6%'),
    marginBottom: hp('0.3%'),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('0.2%'),
  },
  price: {
    color: '#222',
    fontSize: hp('1.6%'),
  },
  oldPrice: {
    fontSize: hp('1.3%'),
    color: '#FA463D',
    textDecorationLine: 'line-through',
    marginLeft: wp('1%'),
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
  timeText: {
    fontSize: hp('1.3%'),
    color: '#666',
  },
})

export default RecommendedFood
>>>>>>> 460b2df956993f87fd35ef53b672de5e94e56796

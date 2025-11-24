import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
  Modal,
  Pressable,
  Platform,
  Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const FoodDetails = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedCheese, setSelectedCheese] = useState([]);
  const [cookingRequest, setCookingRequest] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [heartScale] = useState(new Animated.Value(1));
  const [plusScale] = useState(new Animated.Value(1));
  const [popupScale] = useState(new Animated.Value(0));
  const [headerHeight] = useState(new Animated.Value(hp('30%')));

  // Food item data
  const foodItem = {
    id: 1,
    name: 'Spicy Paneer Burger',
    price: 250.0,
    oldPrice: 280.0,
    time: '10-15 mins',
    img: require('../../../assets/b1.png'),
    description:
      'A flavorful burger with a spiced paneer patty, fresh veggies, and creamy mint mayo in a toasted bun. Perfect for those craving a hearty and satisfying meal.',
    restaurant: 'Foodicated Cafe',
    isVeg: true,
    rating: 4.4,
  };

  const handleHeartPress = () => {
    // Vibration effect
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      Vibration.vibrate(50);
    }

    // Heart scale animation
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    
    setLiked(!liked);
  };

  const showAddedToCartPopup = () => {
    setShowPopup(true);
    Animated.spring(popupScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto hide after 2 seconds
    setTimeout(() => {
      hidePopup();
    }, 2000);
  };

  const hidePopup = () => {
    Animated.timing(popupScale, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowPopup(false);
    });
  };

  const toggleCheeseSelection = cheese => {
    setSelectedCheese(prev => {
      const currentSelection = Array.isArray(prev) ? prev : [];
      if (currentSelection.includes(cheese)) {
        return currentSelection.filter(c => c !== cheese);
      } else {
        if (currentSelection.length < 2) {
          return [...currentSelection, cheese];
        }
        return currentSelection;
      }
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const getTotalPrice = () => {
    let basePrice = foodItem.price;
    const cheeseSelection = Array.isArray(selectedCheese) ? selectedCheese : [];

    cheeseSelection.forEach(cheese => {
      if (cheese === 'Single Cheese Slice') {
        basePrice += 25.0;
      } else if (cheese === 'Double Cheese Slice') {
        basePrice += 39.0;
      }
    });

    return basePrice * quantity;
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      food: foodItem,
      cheese: selectedCheese,
      quantity,
      cookingRequest,
      totalPrice: getTotalPrice(),
    });

    // Show popup instead of navigating
    showAddedToCartPopup();
  };

  const isCheeseSelected = cheese => {
    return Array.isArray(selectedCheese) && selectedCheese.includes(cheese);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Added to Cart Popup */}
      <Modal
        visible={showPopup}
        transparent
        animationType="none"
        onRequestClose={hidePopup}
      >
        <View style={styles.popupOverlay}>
          <Animated.View
            style={[
              styles.popupContainer,
              {
                transform: [{ scale: popupScale }],
                opacity: popupScale,
              },
            ]}
          >
            <View style={styles.popupContent}>
              <Image
                source={require('../../../assets/sucess.png')}
                style={styles.successIcon}
                resizeMode="contain"
              />
              <Text style={styles.popupTitle}>Added to Cart!</Text>
              <Text style={styles.popupSubtitle}>
                {foodItem.name} has been added to your cart
              </Text>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Header Image */}
      <Animated.View
        style={[styles.headerImageContainer, { height: headerHeight }]}
      >
        <Image
          source={foodItem.img}
          style={styles.headerImage}
          resizeMode="cover"
        />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Heart Button */}
        <TouchableOpacity
          style={[
            styles.heartBtn,
            liked ? styles.heartBtnFilled : styles.heartBtnUnfilled,
          ]}
          onPress={handleHeartPress}
        >
          <Animated.Image
            source={
              liked
                ? require('../../../assets/heartfill.png')
                : require('../../../assets/heart.png')
            }
            style={[
              styles.heartIcon,
              liked ? styles.heartIconFilled : styles.heartIconUnfilled,
              { transform: [{ scale: heartScale }] },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Image
            source={require('../../../assets/star.png')}
            style={styles.starIcon}
            resizeMode="contain"
          />
          <Text style={styles.ratingText}>{foodItem.rating}</Text>
        </View>
      </Animated.View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Badge Row */}
        <View style={styles.badgeRow}>
          <Image
            source={
              foodItem.isVeg
                ? require('../../../assets/veg.png')
                : require('../../../assets/nonveg.png')
            }
            style={styles.vegBadge}
            resizeMode="contain"
          />
          <View style={styles.spicyTag}>
            <Image
              source={require('../../../assets/spicy.png')}
              style={styles.spicyIcon}
              resizeMode="contain"
            />
            <Text style={styles.spicyText}>Spicy</Text>
          </View>
        </View>

        {/* Food Name */}
        <Text style={styles.foodName}>{foodItem.name}</Text>

        {/* Restaurant Name */}
        <Text style={styles.restaurantName}>{foodItem.restaurant}</Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{foodItem.price.toFixed(2)}</Text>
            <Text style={styles.oldPrice}>₹{foodItem.oldPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.timeRow}>
            <Image
              source={require('../../../assets/clock.png')}
              style={styles.clockIcon}
              resizeMode="contain"
            />
            <Text style={styles.timeText}>{foodItem.time}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{foodItem.description}</Text>

        {/* Extra Cheese Section */}
        <Text style={styles.sectionTitle}>Extra Cheese</Text>
        <Text style={styles.sectionSubtitle}>Select up to 2 options</Text>

        {/* Cheese Options */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => toggleCheeseSelection('Single Cheese Slice')}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <Image
              source={require('../../../assets/veg.png')}
              style={styles.optionVegIcon}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Single Cheese Slice</Text>
          </View>
          <View style={styles.optionRight}>
            <Text style={styles.optionPrice}>₹25.00</Text>
            {isCheeseSelected('Single Cheese Slice') ? (
              <Image
                source={require('../../../assets/tick.png')}
                style={styles.tickIcon}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.uncheckedCircle} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => toggleCheeseSelection('Double Cheese Slice')}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <Image
              source={require('../../../assets/veg.png')}
              style={styles.optionVegIcon}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Double Cheese Slice</Text>
          </View>
          <View style={styles.optionRight}>
            <Text style={styles.optionPrice}>₹39.00</Text>
            {isCheeseSelected('Double Cheese Slice') ? (
              <Image
                source={require('../../../assets/tick.png')}
                style={styles.tickIcon}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.uncheckedCircle} />
            )}
          </View>
        </TouchableOpacity>

        {/* Cooking Request */}
        <Text style={styles.cookingRequestTitle}>
          Add a cooking request (optional)
        </Text>
        <TextInput
          style={styles.cookingInput}
          placeholder="e.g. don't make it too spicy"
          placeholderTextColor="#999"
          value={cookingRequest}
          onChangeText={setCookingRequest}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        {/* Extra spacing for bottom bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        {/* Quantity Control */}
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={decrementQuantity}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.quantityBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={incrementQuantity}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <View style={styles.addToCartContent}>
            <Image
              source={require('../../../assets/bag.png')}
              style={styles.bagIcon}
              resizeMode="contain"
            />
            <Text style={styles.addToCartText}>ADD TO CART</Text>
            <Text style={styles.totalPrice}>₹{getTotalPrice().toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerImageContainer: {
    position: 'relative',
    width: '100%',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp('6%') : hp('4%'),
    left: wp('4%'),
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: wp('50%'),
    padding: wp('3%'),
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: wp('5.5%'),
    height: wp('5.5%'),
    tintColor: '#fff',
  },
  heartBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp('6%') : hp('4%'),
    right: wp('4%'),
    borderRadius: wp('50%'),
    padding: wp('2%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartBtnUnfilled: {
    backgroundColor: COLORS.primary,
  },
  heartBtnFilled: {
    backgroundColor: '#fff',
  },
  heartIcon: {
    width: wp('3.4%'),
    height: wp('3.4%'),
  },
  heartIconUnfilled: {
    tintColor: '#fff',
  },
  heartIconFilled: {
    tintColor: undefined, // No tint color for filled heart
  },
  ratingBadge: {
    position: 'absolute',
    bottom: hp('2%'),
    right: wp('4%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.8%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  starIcon: {
    width: wp('4%'),
    height: wp('4%'),
    tintColor: '#fff',
    marginRight: wp('1.5%'),
  },
  ratingText: {
    color: '#fff',
    fontSize: hp('1.5%'),
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('15%'),
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.2%'),
  },
  vegBadge: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    marginRight: wp('2.5%'),
  },
  spicyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F3',
    borderColor: '#FFE0C8',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
  },
  spicyIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginRight: wp('1.5%'),
  },
  spicyText: {
    color: '#F99C38',
    fontSize: hp('1.4%'),
    fontWeight: '600',
  },
  foodName: {
    fontSize: hp('2.9%'),
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('0.6%'),
    lineHeight: hp('3%'),
  },
  restaurantName: {
    fontSize: hp('1.7%'),
    fontWeight: '500',
    color: '#666',
    marginBottom: hp('1.8%'),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: hp('2.4%'),
    fontWeight: '700',
    color: '#000',
    marginRight: wp('2.5%'),
  },
  oldPrice: {
    fontSize: hp('1.7%'),
    color: '#FA463D',
    textDecorationLine: 'line-through',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: wp('2.5%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.7%'),
  },
  clockIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    tintColor: COLORS.primary,
    marginRight: wp('1.5%'),
  },
  timeText: {
    fontSize: hp('1.4%'),
    color: '#666',
    fontWeight: '600',
  },
  description: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: '#555',
    lineHeight: hp('2.3%'),
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontSize: hp('2.1%'),
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('0.6%'),
  },
  sectionSubtitle: {
    fontSize: hp('1.5%'),
    fontWeight: '400',
    color: '#888',
    marginBottom: hp('2%'),
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.8%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionVegIcon: {
    width: wp('4%'),
    height: wp('4%'),
    marginRight: wp('3%'),
  },
  optionText: {
    fontSize: hp('1.7%'),
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionPrice: {
    fontSize: hp('1.7%'),
    fontWeight: '700',
    color: '#000',
    marginRight: wp('3.5%'),
  },
  tickIcon: {
    width: wp('5%'),
    height: wp('5%'),
  },
  uncheckedCircle: {
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: '#CCC',
  },
  cookingRequestTitle: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
    color: '#000',
    marginTop: hp('3%'),
    marginBottom: hp('1.5%'),
  },
  cookingInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: wp('3.5%'),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.8%'),
    fontSize: hp('1.5%'),
    color: '#000',
    minHeight: hp('11%'),
    textAlignVertical: 'top',
  },
  bottomSpacing: {
    height: hp('3%'),
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? hp('2%') : hp('2%'),
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F3',
    borderColor: '#FFE0C8',
    borderWidth: 1.5,
    borderRadius: wp('3%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
  },
  quantityBtn: {
    paddingHorizontal: wp('2.5%'),
  },
  quantityBtnText: {
    fontSize: hp('2.8%'),
    fontWeight: '700',
    color: COLORS.primary,
    lineHeight: hp('2.8%'),
  },
  quantityText: {
    fontSize: hp('2.2%'),
    fontWeight: '700',
    color: '#000',
    marginHorizontal: wp('4%'),
    minWidth: wp('6%'),
    textAlign: 'center',
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: wp('3%'),
    marginLeft: wp('3%'),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addToCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('3.5%'),
  },
  bagIcon: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: '#fff',
  },
  addToCartText: {
    fontSize: hp('1.6%'),
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
    flex: 1,
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: hp('1.6%'),
    fontWeight: '700',
    color: '#fff',
  },

  // Popup Styles
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderRadius: wp('5%'),
    padding: wp('6%'),
    marginHorizontal: wp('10%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  popupContent: {
    alignItems: 'center',
  },
  successIcon: {
    width: wp('15%'),
    height: wp('15%'),
    marginBottom: hp('2%'),
  },
  popupTitle: {
    fontSize: hp('2.2%'),
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  popupSubtitle: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
    color: '#666',
    textAlign: 'center',
    lineHeight: hp('2.2%'),
  },
});

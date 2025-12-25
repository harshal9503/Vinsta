import React, { useContext, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Animated,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;
const isSmallScreen = width < 380;
const screenRatio = width / height;
const isIOS = Platform.OS === 'ios';

const fontScale = (size) => {
  if (isIOS) {
    return isTablet ? size * 0.85 : size * 0.95;
  }
  return isTablet ? size * 0.85 : size;
};

const scaleSize = (size) => {
  if (isIOS) {
    return isTablet ? size * 0.9 : size * 1.02;
  }
  return size;
};

const getFontFamily = (weight = 'Regular') => {
  if (Platform.OS === 'ios') {
    return 'Figtree';
  } else {
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
      Thin: 'Figtree-Thin',
      ExtraLight: 'Figtree-ExtraLight',
      Light: 'Figtree-Light',
      Regular: 'Figtree-Regular',
      Medium: 'Figtree-Medium',
      SemiBold: 'Figtree-SemiBold',
      Bold: 'Figtree-Bold',
      ExtraBold: 'Figtree-ExtraBold',
      Black: 'Figtree-Black',
    };
    return fontMap[weight] || 'Figtree-Regular';
  }
};

const getFontWeight = (weight = 'Regular') => {
  if (Platform.OS === 'android') {
    return undefined;
  }

  const weightMap = {
    Thin: '100',
    ExtraLight: '200',
    Light: '300',
    Regular: '400',
    Medium: '500',
    SemiBold: '600',
    Bold: '700',
    ExtraBold: '800',
    Black: '900',
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

const getTextStyle = (weight = 'Regular') => {
  return {
    fontFamily: getFontFamily(weight),
    ...(Platform.OS === 'ios' && { fontWeight: getFontWeight(weight) }),
    includeFontPadding: false,
    textAlignVertical: 'center',
  };
};

const FILTER_TAG_COLORS = {
  background: '#FFF9F3',
  border: '#FFE0C8',
  text: '#F99C38',
};

const BesRatedBurger = ({
  getCurrentProducts,
  handleProductPress,
  toggleFavorite,
  isVegMode,
}) => {
  const { theme } = useContext(ThemeContext);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [selectedCheese, setSelectedCheese] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cookingRequest, setCookingRequest] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupScale] = useState(new Animated.Value(0));

  const getCurrentProductsWithMore = () => {
    const currentProducts = getCurrentProducts();
    
    const additionalProducts = [
      {
        id: 5,
        name: 'Paneer Burger',
        price: '₹50.50',
        img: require('../../../assets/b1.png'),
        oldPrice: '₹55.50',
        rating: 4.2,
        deliveryTime: '12-17 mins',
        isFavorite: false,
      },
      {
        id: 6,
        name: 'Cheese Lover',
        price: '₹48.50',
        img: require('../../../assets/b2.png'),
        oldPrice: '₹53.50',
        rating: 4.3,
        deliveryTime: '15-20 mins',
        isFavorite: false,
      },
      {
        id: 7,
        name: 'Spicy Veg Burger',
        price: '₹47.50',
        img: require('../../../assets/b3.png'),
        oldPrice: '₹52.50',
        rating: 4.5,
        deliveryTime: '10-15 mins',
        isFavorite: false,
      },
      {
        id: 8,
        name: 'Classic Veg Burger',
        price: '₹42.50',
        img: require('../../../assets/b1.png'),
        oldPrice: '₹47.50',
        rating: 4.0,
        deliveryTime: '8-12 mins',
        isFavorite: false,
      },
      {
        id: 9,
        name: 'Mushroom Burger',
        price: '₹49.50',
        img: require('../../../assets/b2.png'),
        oldPrice: '₹54.50',
        rating: 4.1,
        deliveryTime: '13-18 mins',
        isFavorite: false,
      },
      {
        id: 10,
        name: 'Double Cheese',
        price: '₹52.50',
        img: require('../../../assets/b3.png'),
        oldPrice: '₹57.50',
        rating: 4.4,
        deliveryTime: '11-16 mins',
        isFavorite: false,
      },
    ];

    return [...currentProducts, ...additionalProducts];
  };

  const allProducts = getCurrentProductsWithMore();

  const handleFoodItemPress = (item) => {
    const foodItem = {
      id: item.id,
      name: item.name,
      price: parseFloat(item.price.replace('₹', '')),
      oldPrice: parseFloat(item.oldPrice.replace('₹', '')),
      time: item.deliveryTime,
      img: item.img,
      description: 'A flavorful burger with fresh veggies, creamy sauces, and the perfect blend of spices in a toasted bun. Perfect for those craving a hearty and satisfying meal.',
      restaurant: 'Bistro Excellence',
      isVeg: true,
      rating: parseFloat(item.rating),
    };
    
    setSelectedFood(foodItem);
    setQuantity(1);
    setSelectedCheese([]);
    setCookingRequest('');
    setFoodModalVisible(true);
  };

  const toggleCheeseSelection = (cheese) => {
    setSelectedCheese(prev => {
      if (prev.includes(cheese)) {
        return prev.filter(c => c !== cheese);
      } else {
        if (prev.length < 2) {
          return [...prev, cheese];
        }
        return prev;
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
    if (!selectedFood) return 0;
    let basePrice = selectedFood.price;

    selectedCheese.forEach(cheese => {
      if (cheese === 'Single Cheese Slice') {
        basePrice += 25.0;
      } else if (cheese === 'Double Cheese Slice') {
        basePrice += 39.0;
      }
    });

    return basePrice * quantity;
  };

  const showAddedToCartPopup = () => {
    setShowPopup(true);
    Animated.spring(popupScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

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

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      food: selectedFood,
      cheese: selectedCheese,
      quantity,
      cookingRequest,
      totalPrice: getTotalPrice(),
    });

    showAddedToCartPopup();
    setFoodModalVisible(false);
  };

  const renderProductCard = (item, index) => (
    <TouchableOpacity
      style={[
        styles.productCard,
        { backgroundColor: theme.cardBackground },
      ]}
      onPress={() => handleFoodItemPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={item.img}
          style={styles.productImg}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={[
            styles.productHeartWrapper,
            {
              backgroundColor: item.isFavorite
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(255, 255, 255, 0.3)',
            },
          ]}
          activeOpacity={0.7}
          onPress={() => toggleFavorite(item.id, isVegMode)}
        >
          <Image
            source={
              item.isFavorite
                ? require('../../../assets/heartfill.png')
                : require('../../../assets/heart.png')
            }
            style={[
              styles.heartIcon,
              { tintColor: item.isFavorite ? COLORS.primary : '#fff' },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.productRatingBadge}>
          <Image
            source={require('../../../assets/star.png')}
            style={styles.starIcon}
            resizeMode="contain"
          />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <Text
        style={[styles.productTitle, { color: theme.text }]}
        numberOfLines={1}
      >
        {item.name}
      </Text>

      <View style={styles.priceRow}>
        <View style={styles.priceContainer}>
          <Text style={[styles.productPrice, { color: theme.text }]}>
            {item.price}
          </Text>
          <Text style={styles.oldPrice}>{item.oldPrice}</Text>
        </View>

        <TouchableOpacity style={styles.plusBtn} activeOpacity={0.7}>
          <Image
            source={require('../../../assets/plus.png')}
            style={styles.plusIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.deliveryTimeRow}>
        <Image
          source={require('../../../assets/clock.png')}
          style={styles.infoIcon}
          resizeMode="contain"
        />
        <Text style={[styles.infoTxt, { color: theme.text }]}>
          {item.deliveryTime}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
                {selectedFood?.name} has been added to your cart
              </Text>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Food Detail Modal */}
      <Modal
        visible={foodModalVisible}
        animationType="slide"
        transparent
        statusBarTranslucent
        onRequestClose={() => setFoodModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <Pressable style={modalStyles.backdrop} onPress={() => setFoodModalVisible(false)} />

          <View style={modalStyles.container}>
            {/* CLOSE BUTTON */}
            <TouchableOpacity style={modalStyles.closeBtn} onPress={() => setFoodModalVisible(false)}>
              <Image
                source={require('../../../assets/close.png')}
                style={modalStyles.closeIcon}
              />
            </TouchableOpacity>

            <View style={modalStyles.modal}>
              {selectedFood && (
                <>
                  {/* IMAGE */}
                  <Image source={selectedFood.img} style={modalStyles.image} />

                  {/* RATING */}
                  <View style={modalStyles.rating}>
                    <Image
                      source={require('../../../assets/star.png')}
                      style={modalStyles.star}
                    />
                    <Text style={modalStyles.ratingText}>{selectedFood.rating}</Text>
                  </View>

                  {/* CONTENT */}
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={modalStyles.scrollContent}
                  >
                    <View style={modalStyles.tags}>
                      <Image
                        source={
                          selectedFood.isVeg
                            ? require('../../../assets/veg.png')
                            : require('../../../assets/nonveg.png')
                        }
                        style={modalStyles.veg}
                      />
                      <View style={modalStyles.spicy}>
                        <Image
                          source={require('../../../assets/spicy.png')}
                          style={modalStyles.spicyIcon}
                        />
                        <Text style={modalStyles.spicyText}>Spicy</Text>
                      </View>
                    </View>

                    <Text style={modalStyles.name}>{selectedFood.name}</Text>
                    <Text style={modalStyles.restaurant}>{selectedFood.restaurant}</Text>
                    <Text style={modalStyles.desc}>{selectedFood.description}</Text>

                    <Text style={modalStyles.section}>Extra Cheese</Text>
                    <Text style={modalStyles.sub}>Select up to 2 option</Text>

                    {[
                      { label: 'Single Cheese Slice', price: '₹25.00' },
                      { label: 'Double Cheese Slice', price: '₹39.00' },
                    ].map(item => (
                      <TouchableOpacity
                        key={item.label}
                        style={modalStyles.option}
                        onPress={() => toggleCheeseSelection(item.label)}
                      >
                        <View style={modalStyles.optionLeft}>
                          <Image
                            source={require('../../../assets/veg.png')}
                            style={modalStyles.optionVeg}
                          />
                          <Text style={modalStyles.optionText}>{item.label}</Text>
                        </View>

                        <View style={modalStyles.optionRight}>
                          <Text style={modalStyles.optionPrice}>{item.price}</Text>
                          {selectedCheese.includes(item.label) ? (
                            <Image
                              source={require('../../../assets/tick.png')}
                              style={modalStyles.tick}
                            />
                          ) : (
                            <View style={modalStyles.unchecked} />
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}

                    <Text style={modalStyles.section}>Add a cooking request (optional)</Text>

                    <TextInput
                      style={modalStyles.input}
                      placeholder="e.g. don't make it too spicy"
                      placeholderTextColor="#999"
                      value={cookingRequest}
                      onChangeText={setCookingRequest}
                      multiline
                    />
                  </ScrollView>

                  {/* BOTTOM ACTION BAR */}
                  <View style={modalStyles.bottomWrapper}>
                    <View style={modalStyles.bottom}>
                      <View style={modalStyles.qty}>
                        <TouchableOpacity onPress={decrementQuantity}>
                          <Text style={modalStyles.qtyBtn}>-</Text>
                        </TouchableOpacity>

                        <Text style={modalStyles.qtyText}>{quantity}</Text>

                        <TouchableOpacity onPress={incrementQuantity}>
                          <Text style={modalStyles.qtyBtn}>+</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity style={modalStyles.cart} onPress={handleAddToCart}>
                        <Image
                          source={require('../../../assets/bag.png')}
                          style={modalStyles.bag}
                        />
                        <Text style={modalStyles.cartText}>ADD TO CART</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={allProducts}
        keyExtractor={(item) => `product-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item, index }) => renderProductCard(item, index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('2%'),
  },
  scrollContent: {
    paddingVertical: hp('1%'),
  },
  productCard: {
    backgroundColor: COLORS.secondary,
    width: wp('34%'),
    borderRadius: scaleSize(wp('2.8%')),
    padding: scaleSize(wp('1.4%')),
    marginRight: wp('2.2%'),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.cardShadow || '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  imageContainer: {
    position: 'relative',
    marginBottom: hp('0.25%'),
  },
  productImg: {
    width: '100%',
    height: wp('21%'),
    borderRadius: scaleSize(wp('2%')),
  },
  productHeartWrapper: {
    position: 'absolute',
    top: scaleSize(wp('1.1%')),
    right: scaleSize(wp('1.1%')),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: scaleSize(wp('2.4%')),
    padding: scaleSize(wp('0.9%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0.8 },
        shadowRadius: 1.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  productRatingBadge: {
    position: 'absolute',
    bottom: scaleSize(wp('1.1%')),
    left: scaleSize(wp('1.1%')),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('1.4%'),
    paddingVertical: hp('0.3%'),
    borderRadius: scaleSize(wp('1.1%')),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 0.8 },
        shadowRadius: 1.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  heartIcon: {
    width: isTablet ? scaleSize(wp('2.3%')) : scaleSize(wp('2.5%')),
    height: isTablet ? scaleSize(wp('2.3%')) : scaleSize(wp('2.5%')),
  },
  productTitle: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(14),
    color: COLORS.textDark,
    marginBottom: hp('0.25%'),
    marginTop: hp('0.35%'),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.18%'),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('0.8%'),
    flex: 1,
  },
  productPrice: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(13),
    color: '#111',
  },
  oldPrice: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(11),
    color: '#666',
    textDecorationLine: 'line-through',
  },
  plusBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('50%'),
    padding: scaleSize(wp('1.2%')),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scaleSize(wp('5.5%')),
    minHeight: scaleSize(wp('5.5%')),
  },
  plusIcon: {
    width: isTablet ? scaleSize(wp('2.1%')) : scaleSize(wp('2.3%')),
    height: isTablet ? scaleSize(wp('2.1%')) : scaleSize(wp('2.3%')),
    tintColor: '#fff',
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('0.7%'),
  },
  infoIcon: {
    width: isTablet ? scaleSize(wp('1.9%')) : scaleSize(wp('2.1%')),
    height: isTablet ? scaleSize(wp('1.9%')) : scaleSize(wp('2.1%')),
    tintColor: COLORS.primary,
  },
  infoTxt: {
    ...getTextStyle('Regular'),
    fontSize: fontScale(11),
    color: COLORS.textLight,
  },
  starIcon: {
    width: isTablet ? scaleSize(wp('1.9%')) : scaleSize(wp('2.1%')),
    height: isTablet ? scaleSize(wp('1.9%')) : scaleSize(wp('2.1%')),
    marginRight: wp('0.6%'),
    tintColor: '#fff',
  },
  ratingText: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(10),
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

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  backdrop: { flex: 1 },
  container: { justifyContent: 'flex-end' },

  modal: {
    height: hp('82%'),
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: hp('22%'),
    resizeMode: 'cover',
  },

  closeBtn: {
    position: 'absolute',
    top: -wp('6%'),
    alignSelf: 'center',
    zIndex: 10,
    backgroundColor: '#fff',
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeIcon: {
    width: wp('7%'),
    height: wp('7%'),
    tintColor: COLORS.primary,
  },

  rating: {
    position: 'absolute',
    right: wp('5%'),
    top: hp('24%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
  },

  star: { width: wp('3%'), height: wp('3%'), tintColor: '#fff' },
  ratingText: { color: '#fff', marginLeft: wp('1%'), fontWeight: '700' },

  scrollContent: {
    padding: wp('5%'),
    paddingBottom: hp('3%'),
  },

  tags: { flexDirection: 'row', alignItems: 'center', marginBottom: hp('1%') },
  veg: { width: wp('4%'), height: wp('4%'), marginRight: wp('2%') },

  spicy: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: FILTER_TAG_COLORS.border,
    backgroundColor: FILTER_TAG_COLORS.background,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.3%'),
  },

  spicyIcon: { width: wp('3%'), height: wp('3%'), marginRight: wp('1%') },
  spicyText: { color: FILTER_TAG_COLORS.text, fontWeight: '600' },

  name: { fontSize: hp('2.4%'), fontWeight: '700' },
  restaurant: { color: '#666', marginBottom: hp('1%') },
  desc: { color: '#555', marginBottom: hp('2%') },

  section: { fontSize: hp('1.9%'), fontWeight: '700', marginTop: hp('1%') },
  sub: { color: '#888', marginBottom: hp('1%') },

  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionVeg: { width: wp('4%'), height: wp('4%'), marginRight: wp('2%') },
  optionText: { fontWeight: '600' },
  optionRight: { flexDirection: 'row', alignItems: 'center' },
  optionPrice: { marginRight: wp('3%'), fontWeight: '700' },

  tick: { width: wp('5%'), height: wp('5%') },
  unchecked: {
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: '#ccc',
  },

  input: {
    marginTop: hp('1%'),
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    height: hp('10%'),
    textAlignVertical: 'top',
  },

  /* WHITE CONTAINER */
  bottomWrapper: {
    backgroundColor: '#fff',
    paddingBottom: hp('2%'),
  },

  bottom: {
    flexDirection: 'row',
    marginHorizontal: wp('4%'),
    marginTop: hp('1%'),
    alignItems: 'center',
  },

  qty: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE0C8',
    backgroundColor: '#FFF9F3',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('3%'),
    height: hp('6%'),
  },

  qtyBtn: { fontSize: hp('2.6%'), color: COLORS.primary, fontWeight: '700' },
  qtyText: { marginHorizontal: wp('4%'), fontWeight: '700' },

  cart: {
    flex: 1,
    marginLeft: wp('4%'),
    height: hp('6%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bag: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: '#fff',
    marginRight: wp('2%'),
  },

  cartText: { color: '#fff', fontWeight: '700' },
});

export default BesRatedBurger;

// FoodDetailModal.jsx

import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FILTER_TAG_COLORS = {
  background: '#FFF9F3',
  border: '#FFE0C8',
  text: '#F99C38',
};

const FoodDetailModal = ({
  foodModalVisible,
  setFoodModalVisible,
  selectedFood,
  selectedCheese,
  toggleCheeseSelection,
  quantity,
  incrementQuantity,
  decrementQuantity,
  cookingRequest,
  setCookingRequest,
  handleAddToCart,
}) => {
  return (
    <Modal
      visible={foodModalVisible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={() => setFoodModalVisible(false)}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={() => setFoodModalVisible(false)} />

        <View style={styles.container}>
          {/* CLOSE */}
          <TouchableOpacity style={styles.closeBtn} onPress={() => setFoodModalVisible(false)}>
            <Image
              source={require('../../../../assets/close.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>

          <View style={styles.modal}>
            {selectedFood && (
              <>
                {/* IMAGE */}
                <Image source={selectedFood.img} style={styles.image} />

                {/* RATING */}
                <View style={styles.rating}>
                  <Image
                    source={require('../../../../assets/star.png')}
                    style={styles.star}
                  />
                  <Text style={styles.ratingText}>4.4</Text>
                </View>

                {/* CONTENT */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContent}
                >
                  <View style={styles.tags}>
                    <Image
                      source={
                        selectedFood.isVeg
                          ? require('../../../../assets/veg.png')
                          : require('../../../../assets/nonveg.png')
                      }
                      style={styles.veg}
                    />
                    <View style={styles.spicy}>
                      <Image
                        source={require('../../../../assets/spicy.png')}
                        style={styles.spicyIcon}
                      />
                      <Text style={styles.spicyText}>Spicy</Text>
                    </View>
                  </View>

                  <Text style={styles.name}>{selectedFood.name}</Text>
                  <Text style={styles.restaurant}>{selectedFood.restaurant}</Text>
                  <Text style={styles.desc}>{selectedFood.description}</Text>

                  <Text style={styles.section}>Extra Cheese</Text>
                  <Text style={styles.sub}>Select up to 2 option</Text>

                  {[
                    { label: 'Single Cheese Slice', price: '₹25.00' },
                    { label: 'Double Cheese Slice', price: '₹39.00' },
                  ].map(item => (
                    <TouchableOpacity
                      key={item.label}
                      style={styles.option}
                      onPress={() => toggleCheeseSelection(item.label)}
                    >
                      <View style={styles.optionLeft}>
                        <Image
                          source={require('../../../../assets/veg.png')}
                          style={styles.optionVeg}
                        />
                        <Text style={styles.optionText}>{item.label}</Text>
                      </View>

                      <View style={styles.optionRight}>
                        <Text style={styles.optionPrice}>{item.price}</Text>
                        {selectedCheese.includes(item.label) ? (
                          <Image
                            source={require('../../../../assets/tick.png')}
                            style={styles.tick}
                          />
                        ) : (
                          <View style={styles.unchecked} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}

                  <Text style={styles.section}>Add a cooking request (optional)</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="e.g. don't make it too spicy"
                    placeholderTextColor="#999"
                    value={cookingRequest}
                    onChangeText={setCookingRequest}
                    multiline
                  />
                </ScrollView>

                {/* BOTTOM WHITE CONTAINER */}
                <View style={styles.bottomWrapper}>
                  <View style={styles.bottom}>
                    <View style={styles.qty}>
                      <TouchableOpacity onPress={decrementQuantity}>
                        <Text style={styles.qtyBtn}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.qtyText}>{quantity}</Text>

                      <TouchableOpacity onPress={incrementQuantity}>
                        <Text style={styles.qtyBtn}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.cart} onPress={handleAddToCart}>
                      <Image
                        source={require('../../../../assets/bag.png')}
                        style={styles.bag}
                      />
                      <Text style={styles.cartText}>ADD TO CART</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FoodDetailModal;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
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












// import {
//   Image,
//   Modal,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React from 'react';
// import { ThemeContext } from "../../../../theme/ThemeContext";
// import { useContext } from "react";
// import { COLORS } from '../../../../theme/colors';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper'; // Fixed import path

// const FILTER_TAG_COLORS = {
//   background: '#FFF9F3',
//   border: '#FFE0C8',
//   text: '#F99C38',
// };

// const FoodDetailModal = ({
//   foodModalVisible,
//   setFoodModalVisible,
//   selectedFood,
//   selectedCheese,
//   toggleCheeseSelection,
//   quantity,
//   incrementQuantity,
//   decrementQuantity,
//   cookingRequest,
//   setCookingRequest,
//   handleAddToCart,
// }) => {
//   const { theme } = useContext(ThemeContext);
//   return (
//     <Modal
//       visible={foodModalVisible}
//       animationType="slide"
//       transparent
//       onRequestClose={() => setFoodModalVisible(false)}
//     >
//       <View
//         style={[
//           styles.foodModalOverlay,
//           { backgroundColor: theme.background }
//         ]}
//       >
//         <Pressable
//           style={styles.foodModalBackdrop}
//           onPress={() => setFoodModalVisible(false)}
//         />

//         <View style={styles.foodModalContentWrapper}>
//           {/* Close Button */}
//           <TouchableOpacity
//             style={styles.modalCloseBtn}
//             onPress={() => setFoodModalVisible(false)}
//             activeOpacity={0.8}
//           >
//             <Image
//               source={require("../../../../assets/close.png")}
//               style={styles.modalCloseIcon}
//             />
//           </TouchableOpacity>

//           <View
//             style={[
//               styles.foodModalContent,
//               { backgroundColor: theme.cardBackground }
//             ]}
//           >
//             {selectedFood && (
//               <>
//                 {/* Header */}
//                 <View style={[
//                   styles.modalHeader,
//                   { backgroundColor: theme.background }
//                 ]}>
//                   <Image
//                     source={selectedFood.img}
//                     style={styles.modalFoodImage}
//                   />

//                   {/* Rating Badge */}
//                   <View
//                     style={[
//                       styles.modalRatingBadge,
//                       { backgroundColor: theme.cardBackground }
//                     ]}
//                   >
//                     <Image
//                       source={require("../../../../assets/star.png")}
//                       style={styles.modalStarIcon}
//                     />
//                     <Text
//                       style={[
//                         styles.modalRatingText,
//                         { color: theme.text }
//                       ]}
//                     >
//                       4.4
//                     </Text>
//                   </View>
//                 </View>

//                 {/* Scroll Content */}
//                 <ScrollView
//                   style={[
//                     styles.modalScrollContent,
//                     { backgroundColor: theme.background }
//                   ]}
//                   contentContainerStyle={[
//                     styles.modalScrollContentContainer,
//                     { backgroundColor: theme.background }
//                   ]}
//                   showsVerticalScrollIndicator={false}
//                 >
//                   {/* Badge Row */}
//                   <View
//                     style={[
//                       styles.modalBadgeRow,
//                       { backgroundColor: theme.cardBackground }
//                     ]}
//                   >
//                     <Image
//                       source={
//                         selectedFood.isVeg
//                           ? require("../../../../assets/veg.png")
//                           : require("../../../../assets/nonveg.png")
//                       }
//                       style={styles.modalVegBadge}
//                     />

//                     <View style={styles.modalSpicyTag}>
//                       <Image
//                         source={require("../../../../assets/spicy.png")}
//                         style={styles.modalSpicyIcon}
//                       />
//                       <Text
//                         style={[
//                           styles.modalSpicyText,
//                           { color: theme.text }
//                         ]}
//                       >
//                         Spicy
//                       </Text>
//                     </View>
//                   </View>

//                   {/* Food Name */}
//                   <Text style={[styles.modalFoodName, { color: theme.text }]}>
//                     {selectedFood.name}
//                   </Text>

//                   {/* Restaurant */}
//                   <Text
//                     style={[
//                       styles.modalRestaurantName,
//                       { color: theme.textSecondary }
//                     ]}
//                   >
//                     {selectedFood.restaurant}
//                   </Text>

//                   {/* Description */}
//                   <Text
//                     style={[
//                       styles.modalDescription,
//                       { color: theme.textSecondary }
//                     ]}
//                   >
//                     {selectedFood.description}
//                   </Text>

//                   {/* Extra Cheese */}
//                   <Text style={[styles.modalSectionTitle, { color: theme.text }]}>
//                     Extra Cheese
//                   </Text>

//                   <Text
//                     style={[
//                       styles.modalSectionSubtitle,
//                       { color: theme.textSecondary }
//                     ]}
//                   >
//                     Select up to 2 option
//                   </Text>

//                   {/* Cheese Option 1 */}
//                   <TouchableOpacity
//                     style={[
//                       styles.modalOptionRow,
//                       { backgroundColor: theme.cardBackground }
//                     ]}
//                     onPress={() => toggleCheeseSelection("Single Cheese Slice")}
//                     activeOpacity={0.7}
//                   >
//                     <View style={styles.modalOptionLeft}>
//                       <Image
//                         source={require("../../../../assets/veg.png")}
//                         style={styles.modalOptionVegIcon}
//                       />
//                       <Text
//                         style={[
//                           styles.modalOptionText,
//                           { color: theme.text }
//                         ]}
//                       >
//                         Single Cheese Slice
//                       </Text>
//                     </View>

//                     <View style={styles.modalOptionRight}>
//                       <Text
//                         style={[
//                           styles.modalOptionPrice,
//                           { color: theme.text }
//                         ]}
//                       >
//                         ₹25.00
//                       </Text>

//                       {selectedCheese.includes("Single Cheese Slice") ? (
//                         <Image
//                           source={require("../../../../assets/tick.png")}
//                           style={styles.modalTickIcon}
//                         />
//                       ) : (
//                         <View
//                           style={[
//                             styles.modalUncheckedCircle,
//                             { borderColor: theme.borderColor }
//                           ]}
//                         />
//                       )}
//                     </View>
//                   </TouchableOpacity>

//                   {/* Cheese Option 2 */}
//                   <TouchableOpacity
//                     style={[
//                       styles.modalOptionRow,
//                       { backgroundColor: theme.cardBackground }
//                     ]}
//                     onPress={() => toggleCheeseSelection("Double Cheese Slice")}
//                   >
//                     <View style={styles.modalOptionLeft}>
//                       <Image
//                         source={require("../../../../assets/veg.png")}
//                         style={styles.modalOptionVegIcon}
//                       />
//                       <Text
//                         style={[
//                           styles.modalOptionText,
//                           { color: theme.text }
//                         ]}
//                       >
//                         Double Cheese Slice
//                       </Text>
//                     </View>

//                     <View style={styles.modalOptionRight}>
//                       <Text
//                         style={[
//                           styles.modalOptionPrice,
//                           { color: theme.text }
//                         ]}
//                       >
//                         ₹39.00
//                       </Text>

//                       {selectedCheese.includes("Double Cheese Slice") ? (
//                         <Image
//                           source={require("../../../../assets/tick.png")}
//                           style={styles.modalTickIcon}
//                         />
//                       ) : (
//                         <View
//                           style={[
//                             styles.modalUncheckedCircle,
//                             { borderColor: theme.borderColor }
//                           ]}
//                         />
//                       )}
//                     </View>
//                   </TouchableOpacity>

//                   {/* Cooking Request */}
//                   <Text
//                     style={[
//                       styles.modalCookingRequestTitle,
//                       { color: theme.text }
//                     ]}
//                   >
//                     Add a cooking request (optional)
//                   </Text>

//                   <TextInput
//                     style={[
//                       styles.modalCookingInput,
//                       {
//                         backgroundColor: theme.cardBackground,
//                         color: theme.text,
//                         borderColor: theme.borderColor
//                       }
//                     ]}
//                     placeholder="e.g. don't make it too spicy"
//                     placeholderTextColor={theme.textSecondary}
//                     value={cookingRequest}
//                     onChangeText={setCookingRequest}
//                     multiline
//                   />
//                 </ScrollView>

//                 {/* BOTTOM BAR */}
//                 <View
//                   style={[
//                     styles.modalBottomBar,
//                     { backgroundColor: theme.cardBackground }
//                   ]}
//                 >
//                   {/* Quantity */}
//                   <View style={styles.quantityControl}>
//                     <TouchableOpacity
//                       style={styles.quantityBtn}
//                       onPress={decrementQuantity}
//                     >
//                       <Text
//                         style={[
//                           styles.quantityBtnText,
//                           { color: theme.text }
//                         ]}
//                       >
//                         -
//                       </Text>
//                     </TouchableOpacity>

//                     <Text style={[styles.quantityText, { color: theme.text }]}>
//                       {quantity}
//                     </Text>

//                     <TouchableOpacity
//                       style={styles.quantityBtn}
//                       onPress={incrementQuantity}
//                     >
//                       <Text
//                         style={[
//                           styles.quantityBtnText,
//                           { color: theme.text }
//                         ]}
//                       >
//                         +
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   {/* Add Cart */}
//                   <TouchableOpacity
//                     style={styles.addToCartBtn}
//                     onPress={handleAddToCart}
//                   >
//                     <Image
//                       source={require("../../../../assets/bag.png")}
//                       style={styles.bagIcon}
//                     />
//                     <Text
//                       style={[
//                         styles.addToCartText,
//                         { color: theme.text }
//                       ]}
//                     >
//                       ADD TO CART
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }
// export default FoodDetailModal;

// const styles = StyleSheet.create({
//   foodModalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   foodModalBackdrop: {
//     flex: 1,
//   },
//   foodModalContentWrapper: {
//     position: 'relative',
//   },
//   // Core: Modal Container with rounded top and platform-responsive height
//   foodModalContent: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: wp('6%'),
//     borderTopRightRadius: wp('6%'),
//     height: Platform.OS === 'ios' ? hp('82%') : hp('80%'),
//     paddingBottom: Platform.OS === 'ios' ? hp('2%') : 0,
//     overflow: 'visible', // enable overflow for close btn
//   },
//   modalHeader: {
//     position: 'relative',
//   },
//   modalFoodImage: {
//     width: '100%',
//     height: Platform.OS === 'ios' ? hp('22%') : hp('20%'),
//     borderTopLeftRadius: wp('6%'),
//     borderTopRightRadius: wp('6%'),
//     resizeMode: 'cover',
//   },
//   // Responsive Close Button: Half inside/half outside the modal top edge
//   modalCloseBtn: {
//     position: 'absolute',
//     top:
//       Platform.OS === 'ios' ? hp('2%') - wp('6%') / 2 : hp('2%') - wp('6%') / 2, // Experimentally fine for both
//     alignSelf: 'center',
//     zIndex: 999,
//     backgroundColor: '#fff',
//     borderRadius: wp('10%'),
//     width: wp('13%'),
//     height: wp('13%'),
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.25,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     justifyContent: 'center',
//     alignItems: 'center',
//     transform: [
//       { translateY: -(wp('13%') / 2) }, // Half height upward for overlap
//     ],
//   },
//   modalCloseIcon: {
//     width: wp('8%'),
//     height: wp('8%'),
//     tintColor: COLORS.primary,
//     resizeMode: 'contain',
//   },
//   modalRatingBadge: {
//     position: 'absolute',
//     bottom: hp('1.5%'),
//     right: wp('5%'),
//     backgroundColor: COLORS.primary,
//     borderRadius: wp('2.5%'),
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: wp('2.5%'),
//     paddingVertical: hp('0.6%'),
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   modalStarIcon: {
//     width: wp('3.2%'),
//     height: wp('3.2%'),
//     tintColor: '#fff',
//     marginRight: wp('1%'),
//     resizeMode: 'contain',
//   },
//   modalRatingText: {
//     color: '#fff',
//     fontSize: hp('1.5%'),
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '700',
//   },
//   modalScrollContent: {
//     flex: 1,
//     marginTop: wp('2%'),
//   },
//   modalScrollContentContainer: {
//     paddingHorizontal: wp('5%'),
//     paddingTop: hp('1%'),
//     paddingBottom: hp('3%'),
//   },
//   modalBadgeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('1%'),
//   },
//   modalVegBadge: {
//     width: wp('4.5%'),
//     height: wp('4.5%'),
//     marginRight: wp('2%'),
//     resizeMode: 'contain',
//   },
//   modalSpicyTag: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: FILTER_TAG_COLORS.background,
//     borderColor: FILTER_TAG_COLORS.border,
//     borderWidth: 1,
//     borderRadius: wp('2%'),
//     paddingHorizontal: wp('2.5%'),
//     paddingVertical: hp('0.5%'),
//   },
//   modalSpicyIcon: {
//     width: wp('3%'),
//     height: wp('3%'),
//     marginRight: wp('1%'),
//     resizeMode: 'contain',
//   },
//   modalSpicyText: {
//     color: FILTER_TAG_COLORS.text,
//     fontSize: hp('1.4%'),
//     fontFamily: Platform.OS === 'android' ? 'Figtree-SemiBold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '600',
//   },
//   modalFoodName: {
//     fontSize: hp('2.4%'),
//     color: '#000',
//     marginBottom: hp('0.5%'),
//     lineHeight: hp('2.8%'),
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '700',
//   },
//   modalRestaurantName: {
//     fontSize: hp('1.6%'),
//     color: '#666',
//     marginBottom: hp('1.2%'),
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Medium' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '500',
//   },
//   modalDescription: {
//     fontSize: hp('1.6%'),
//     color: '#555',
//     lineHeight: hp('2.3%'),
//     marginBottom: hp('2%'),
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Regular' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '400',
//   },
//   modalSectionTitle: {
//     fontSize: hp('1.9%'),
//     color: '#000',
//     marginBottom: hp('0.4%'),
//     marginTop: hp('0.5%'),
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '700',
//   },
//   modalSectionSubtitle: {
//     fontSize: hp('1.5%'),
//     color: '#888',
//     marginBottom: hp('1.2%'),
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Regular' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '400',
//   },
//   modalOptionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: hp('1.6%'),
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   modalOptionLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   modalOptionVegIcon: {
//     width: wp('4%'),
//     height: wp('4%'),
//     marginRight: wp('2.5%'),
//     resizeMode: 'contain',
//   },
//   modalOptionText: {
//     fontSize: hp('1.65%'),
//     color: '#000',
//     fontFamily: Platform.OS === 'android' ? 'Figtree-SemiBold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '600',
//   },
//   modalOptionRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   modalOptionPrice: {
//     fontSize: hp('1.65%'),
//     color: '#000',
//     marginRight: wp('3%'),
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '700',
//   },
//   modalTickIcon: {
//     width: wp('5%'),
//     height: wp('5%'),
//     resizeMode: 'contain',
//   },
//   modalUncheckedCircle: {
//     width: wp('5%'),
//     height: wp('5%'),
//     borderRadius: wp('2.5%'),
//     borderWidth: 2,
//     borderColor: '#CCC',
//   },
//   modalCookingRequestTitle: {
//     fontSize: hp('1.7%'),
//     color: '#000',
//     marginTop: hp('2%'),
//     marginBottom: hp('1%'),
//     fontFamily: Platform.OS === 'android' ? 'Figtree-SemiBold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '600',
//   },
//   modalCookingInput: {
//     backgroundColor: '#F8F8F8',
//     borderRadius: wp('3%'),
//     borderWidth: 1,
//     borderColor: '#E8E8E8',
//     paddingHorizontal: wp('4%'),
//     paddingVertical: Platform.OS === 'ios' ? hp('1.5%') : hp('1.2%'),
//     fontSize: hp('1.55%'),
//     color: '#000',
//     height: Platform.OS === 'ios' ? hp('10%') : hp('11%'),
//     textAlignVertical: 'top',
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Regular' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '400',
//   },
//   modalBottomBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp('5%'),
//     paddingVertical: Platform.OS === 'ios' ? hp('1.8%') : hp('2%'),
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     backgroundColor: '#fff',
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF9F3',
//     borderColor: '#FFE0C8',
//     borderWidth: 1.5,
//     borderRadius: wp('3%'),
//     paddingHorizontal: wp('2%'),
//     paddingVertical: hp('1%'),
//   },
//   quantityBtn: {
//     paddingHorizontal: wp('3%'),
//     paddingVertical: hp('0.2%'),
//   },
//   quantityBtnText: {
//     fontSize: hp('2.8%'),
//     color: COLORS.primary,
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '700',
//   },
//   quantityText: {
//     fontSize: hp('2.1%'),
//     color: '#000',
//     marginHorizontal: wp('4%'),
//     minWidth: wp('7%'),
//     textAlign: 'center',
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '700',
//   },
//   addToCartBtn: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.primary,
//     borderRadius: wp('3%'),
//     paddingVertical: Platform.OS === 'ios' ? hp('1.8%') : hp('1.9%'),
//     marginLeft: wp('4%'),
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   bagIcon: {
//     width: wp('5%'),
//     height: wp('5%'),
//     tintColor: '#fff',
//     marginRight: wp('2%'),
//     resizeMode: 'contain',
//   },
//   addToCartText: {
//     fontSize: hp('1.85%'),
//     color: '#fff',
//     letterSpacing: 0.5,
//     fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
//     fontWeight: Platform.OS === 'android' ? undefined : '700',
//   },
// });

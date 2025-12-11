import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Linking,
  Alert,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../theme/ThemeContext';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const OrderDetail = () => {
  const navigation = useNavigation<any>();
  const { theme, isDarkMode } = useContext(ThemeContext);

  const [ratingModal, setRatingModal] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hasRated, setHasRated] = useState(false);
  const [previousRating, setPreviousRating] = useState({
    stars: 0,
    review: '',
  });

  const handleCall = () => {
    const phoneNumber =
      Platform.OS === 'android'
        ? 'tel:+911234567890'
        : 'telprompt:+911234567890';
    Linking.openURL(phoneNumber).catch(() =>
      Alert.alert('Error', 'Could not open phone dialer.'),
    );
  };

  const handleReorder = () => {
    navigation.navigate('Payment');
  };

  const handleStarPress = (star: number) => {
    // 🔥 NEW — Reset if same star pressed (matching reference)
    if (selectedStars === star) {
      setSelectedStars(0);
    } else {
      setSelectedStars(star);
    }
  };

  const handleSubmitReview = () => {
    if (selectedStars === 0) {
      Alert.alert('Rating required', 'Please select at least one star.');
      return;
    }
    setRatingModal(false);
    setHasRated(true);
    setPreviousRating({ stars: selectedStars, review: reviewText });
  };

  const handleRatePress = () => {
    if (hasRated) {
      setSelectedStars(previousRating.stars);
      setReviewText(previousRating.review);
    } else {
      setSelectedStars(0);
      setReviewText('');
    }
    setRatingModal(true);
  };

  const handleCancelRating = () => {
    if (hasRated) {
      setSelectedStars(previousRating.stars);
      setReviewText(previousRating.review);
    } else {
      setSelectedStars(0);
      setReviewText('');
    }
    setRatingModal(false);
  };

  const handleRemoveRating = () => {
    Alert.alert(
      'Remove Rating',
      'Are you sure you want to remove your rating?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setHasRated(false);
            setSelectedStars(0);
            setReviewText('');
            setPreviousRating({ stars: 0, review: '' });
            setRatingModal(false);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />

      {/* ===== Header ===== */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.borderColor,
          },
          Platform.OS === 'ios'
            ? styles.headerIosMargin
            : styles.headerAndroidMargin,
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Order Detail
        </Text>

        <View style={{ width: 22 }} />
      </View>

      {/* ===== ScrollView ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70, paddingHorizontal: 20 }}
      >
        {/* ===== MAIN ORDER CARD ===== */}
        <View style={[styles.mainCard, { backgroundColor: theme.cardBackground }]}>
          <Image
            source={require('../../assets/b1.png')}
            style={styles.foodImage}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={styles.rowBetween}>
              <Text style={[styles.orderId, { color: '#E63946' }]}>
                #8256396
              </Text>
            </View>
            <Text style={[styles.foodName, { color: theme.text }]}>
              Masala Poha
            </Text>
            <View style={styles.rowBetween}>
              <Text style={[styles.orderInfo, { color: theme.textSecondary }]}>
                22 Sep. 9:00 - 3 Items
              </Text>
              <Text style={[styles.deliveredText, { color: '#28A745' }]}>
                Delivered
              </Text>
            </View>
          </View>
        </View>

        {/* ===== DETAILS ===== */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Details
          </Text>
          <Text style={[styles.addressText, { color: theme.textSecondary }]}>
            6591 Elgin St. Celina, Delaware 10299
          </Text>
        </View>

        {/* ===== AGENT INFO ===== */}
        <View
          style={[
            styles.agentSection,
            { backgroundColor: theme.cardBackground, borderRadius: 12, padding: 16 },
          ]}
        >
          <Image
            source={require('../../assets/user.png')}
            style={styles.agentImg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[styles.agentId, { color: theme.textSecondary }]}>
              ID: DKS-501F9
            </Text>
            <Text style={[styles.agentName, { color: theme.text }]}>
              Mann Sharma
            </Text>
          </View>
          <TouchableOpacity style={styles.callBtnWhite} onPress={handleCall}>
            <View style={styles.callIconContainer}>
              <Image
                source={require('../../assets/call.png')}
                style={[styles.callIconWhite, { tintColor: '#F97316' }]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* ===== ORDERED FOOD ===== */}
        <Text
          style={[styles.ordersFoodTitle, { color: theme.text, marginTop: 24 }]}
        >
          Orders Food
        </Text>

        {[
          {
            img: require('../../assets/b2.png'),
            name: 'Spicy Paneer Burger',
            cafe: 'Residuated Cafe',
            qty: 2,
            price: '₹ 100.00',
          },
          {
            img: require('../../assets/b3.png'),
            name: 'Spicy Paneer Burger',
            cafe: 'Residuated Cafe',
            qty: 2,
            price: '₹ 100.00',
          },
        ].map((item, index) => (
          <View
            key={index}
            style={[styles.foodCard, { backgroundColor: theme.cardBackground }]}
          >
            <Image source={item.img} style={styles.foodThumb} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.foodTitle, { color: theme.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.cafeName, { color: theme.textSecondary }]}>
                {item.cafe}
              </Text>
              <View style={styles.rowBetween}>
                <Text style={[styles.foodPrice, { color: theme.text }]}>
                  {item.price}
                </Text>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    style={[
                      styles.qtyBtn,
                      {
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                      },
                    ]}
                    onPress={() => { }}
                  >
                    <Text style={[styles.qtyText, { color: COLORS.primary }]}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.qtyNumber,
                      {
                        color: theme.text,
                        backgroundColor: theme.cardBackground,
                      }
                    ]}
                  >
                    {item.qty < 10 ? `0${item.qty}` : item.qty}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.qtyBtn,
                      {
                        backgroundColor: COLORS.primary,
                        borderWidth: 1,
                        borderColor: COLORS.primary,
                      },
                    ]}
                    onPress={() => { }}
                  >
                    <Text style={[styles.qtyText, { color: '#fff' }]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* ===== TOTAL SECTION ===== */}
        <View
          style={[
            styles.totalSection,
            {
              backgroundColor: theme.cardBackground,
              borderRadius: 12,
              padding: 16,
              marginTop: 24,
            },
          ]}
        >
          <View style={styles.rowBetween}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>
              Total
            </Text>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.totalItems, { color: theme.textSecondary }]}>
                (3 items)
              </Text>
              <Text style={[styles.totalAmount, { color: theme.text }]}>
                ₹ 200.00
              </Text>
            </View>
          </View>

          {/* ===== BUTTONS ===== */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[
                styles.rateBtn,
                { borderColor: '#F97316', backgroundColor: '#fff' },
              ]}
              onPress={handleRatePress}
            >
              <Text style={[styles.rateText, { color: '#F97316' }]}>
                {hasRated ? 'RATED' : 'RATE'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.reorderBtn, { backgroundColor: '#F97316' }]}
              onPress={handleReorder}
            >
              <Text style={[styles.reorderText, { color: '#fff' }]}>
                RE-ORDER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ===== RATING MODAL — 🔥 COMPLETELY UPDATED TO MATCH REFERENCE ===== */}
      <Modal visible={ratingModal} transparent animationType="slide">
        <View
          style={[
            styles.modalOverlay,]}>
          <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
            {/* HEADER */}
            <View style={[styles.modalHeader, { backgroundColor: theme.card }]}>
              <TouchableOpacity
                onPress={handleCancelRating}
                style={{ padding: 6 }}
              >
                <Image
                  source={require('../../assets/back.png')}
                  style={[styles.modalBackIcon, { tintColor: theme.text }]}
                />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {hasRated ? 'Edit Review' : 'Leave a Review'}
              </Text>
            </View>

            {/* REVIEW CARD */}
            <View
              style={[styles.reviewCard, {
                backgroundColor: theme.cardBackground,
                borderRadius: 10,
              }]}>
              {/* IMAGE */}
              <Image
                source={require('../../assets/b1.png')}
                style={styles.foodImg}
              />

              {/* TEXT BLOCK */}
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.orderId}>#8256396</Text>
                <Text style={[styles.orderTitle, { color: theme.text }]}>
                  Masala Poha
                </Text>
                <Text style={styles.orderMeta}>22 Sep, 9.00 • 3 Items</Text>

                {/* DELIVERY STATUS LEFT */}
                <View style={styles.statusRow}>
                  <Text style={styles.deliveryLeft}>Delivery Status</Text>
                </View>
              </View>

              {/* PRICE + DELIVERED RIGHT */}
              <View style={styles.priceBlock}>
                <Text style={[styles.price, { color: theme.text }]}>₹ 200.00</Text>
                <Text style={styles.deliveryRight}>Delivered</Text>
              </View>
            </View>

            {/* TEXT */}
            <Text style={[styles.howText, { color: theme.text }]}>
              {hasRated ? 'How was your order?' : 'How is your order?'}
            </Text>
            <Text style={styles.subHowText}>
              {hasRated
                ? 'Update your rating or review...'
                : 'Please give your rating & also your review...'}
            </Text>

            {/* STARS */}
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                  style={{ padding: 4 }}
                >
                  <Image
                    source={
                      selectedStars >= star
                        ? require('../../assets/starfill.png')
                        : require('../../assets/star1.png')
                    }
                    style={[
                      styles.starRatingIcon,
                      { tintColor: theme.text }
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* INPUT */}
            <TextInput
              style={styles.inputBox}
              placeholder="Write your review..."
              placeholderTextColor="#999"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
            />

            {/* BUTTONS */}
            <View style={styles.modalBtnRow}>
              {hasRated && (
                <TouchableOpacity
                  style={styles.modalRemoveBtn}
                  onPress={handleRemoveRating}
                >
                  <Text style={styles.removeText}>Remove Rating</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={handleCancelRating}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSubmitBtn}
                onPress={handleSubmitReview}
                disabled={selectedStars === 0}
              >
                <Text
                  style={[
                    styles.trackText,
                    { opacity: selectedStars === 0 ? 0.5 : 1 },
                  ]}
                >
                  {hasRated ? 'Update' : 'Submit'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: { flex: 1 },

  /** HEADER **/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerIosMargin: {
    marginTop: 10,
  },
  headerAndroidMargin: {
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
  },
  backIcon: { width: 22, height: 22, resizeMode: 'contain' },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Figtree-Bold',
  },

  /** MAIN CARD **/
  mainCard: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 14,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  foodImage: { width: 70, height: 70, borderRadius: 12 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: width * 0.035,
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },
  deliveredText: {
    fontSize: width * 0.035,
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },
  foodName: {
    fontSize: width * 0.04,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    marginTop: 4,
  },
  orderInfo: {
    fontSize: width * 0.033,
    fontWeight: '500',
    fontFamily: 'Figtree-Medium',
  },

  /** DETAILS **/
  section: { marginTop: 20 },
  sectionTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  addressText: {
    fontSize: width * 0.033,
    marginTop: 5,
    lineHeight: 18,
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },

  /** AGENT **/
  agentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 2 },
    }),
  },
  agentImg: { width: 55, height: 55, borderRadius: 27.5 },
  agentId: {
    fontSize: width * 0.032,
    fontFamily: 'Figtree-Regular',
    fontWeight: '400',
  },
  agentName: {
    fontSize: width * 0.038,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    marginTop: 2,
  },
  callBtnWhite: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F97316',
  },
  callIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIconWhite: { width: 18, height: 18, resizeMode: 'contain' },

  /** FOOD LIST **/
  ordersFoodTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
    marginTop: 25,
    fontFamily: 'Figtree-Bold',
  },

  foodCard: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 12,
    marginTop: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 2 },
    }),
  },
  foodThumb: { width: 60, height: 60, borderRadius: 10 },
  foodTitle: {
    fontSize: width * 0.038,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  cafeName: {
    fontSize: width * 0.032,
    marginBottom: 8,
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  foodPrice: {
    fontSize: width * 0.038,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  /** Quantity Selector **/
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Figtree-Bold',
    fontWeight: '700',
  },
  qtyNumber: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },

  /** TOTAL **/
  totalSection: {
    marginTop: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 2 },
    }),
  },
  totalLabel: {
    fontSize: width * 0.04,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
  },
  totalItems: {
    fontSize: width * 0.032,
    color: '#777',
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: width * 0.045,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },

  /** BUTTONS **/
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rateBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F97316',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  rateText: {
    color: '#F97316',
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold',
    fontSize: width * 0.038,
  },
  reorderBtn: {
    flex: 1,
    backgroundColor: '#F97316',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reorderText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: width * 0.038,
    fontFamily: 'Figtree-Bold',
  },

  /** 🔥 MODAL STYLES — COMPLETELY UPDATED TO MATCH REFERENCE ***/
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.40)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalBackIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    marginRight: 26,
    color: '#000',
    fontFamily: 'Figtree-Bold',
    fontWeight: '700',
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  foodImg: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  orderId: {
    color: COLORS.primary,
    fontSize: 13,
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  orderTitle: {
    fontSize: 15,
    color: '#000',
    marginTop: 2,
    fontFamily: 'Figtree-Bold',
    fontWeight: '700',
  },
  orderMeta: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  statusRow: {
    marginTop: 6,
  },
  deliveryLeft: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  priceBlock: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'Figtree-Bold',
    fontWeight: '700',
  },
  deliveryRight: {
    marginTop: 8,
    color: 'green',
    fontSize: 12,
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  howText: {
    fontSize: 16,
    marginTop: 22,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Figtree-SemiBold',
    fontWeight: '600',
  },
  subHowText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
    marginBottom: 10,
  },
  starRatingIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    height: 90,
    marginTop: 16,
    textAlignVertical: 'top',
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalRemoveBtn: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff4444',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalCancelBtn: {
    flex: 1,
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalSubmitBtn: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  removeText: {
    color: '#ff4444',
    fontWeight: '600',
    fontFamily: 'Figtree-Bold',
  },
  cancelText: {
    color: '#000',
    fontFamily: 'Figtree-Bold',
    fontWeight: '700',
  },
  trackText: {
    color: '#fff',
    fontFamily: 'Figtree-Bold',
    fontWeight: '700',
  },
});

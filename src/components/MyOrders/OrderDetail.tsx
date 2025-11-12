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
  const { theme } = useContext(ThemeContext);

  const [ratingModal, setRatingModal] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hasRated, setHasRated] = useState(false);
  const [previousRating, setPreviousRating] = useState({ stars: 0, review: '' });

  const handleCall = () => {
    const phoneNumber =
      Platform.OS === 'android'
        ? 'tel:+911234567890'
        : 'telprompt:+911234567890';
    Linking.openURL(phoneNumber).catch(() =>
      Alert.alert('Error', 'Could not open phone dialer.')
    );
  };

  const handleReorder = () => {
    navigation.navigate('Payment');
  };

  const handleStarPress = (index: number) => {
    setSelectedStars(index);
  };

  const handleSubmitReview = () => {
    if (selectedStars === 0) {
      Alert.alert('Rating required', 'Please select at least one star.');
      return;
    }
    setRatingModal(false);
    setHasRated(true);
    setPreviousRating({ stars: selectedStars, review: reviewText });
    // Don't reset selectedStars and reviewText here to keep the values for future edits
  };

  const handleRatePress = () => {
    if (hasRated) {
      // If already rated, open modal with previous rating pre-filled
      setSelectedStars(previousRating.stars);
      setReviewText(previousRating.review);
      setRatingModal(true);
    } else {
      // First time rating
      setSelectedStars(0);
      setReviewText('');
      setRatingModal(true);
    }
  };

  const handleCancelRating = () => {
    // Restore previous rating if user cancels after editing
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
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />

      {/* ===== Header ===== */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.background, borderBottomColor: theme.borderColor },
          Platform.OS === 'ios' ? styles.headerIosMargin : styles.headerAndroidMargin,
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>Order Detail</Text>

        {/* Spacer to balance layout */}
        <View style={{ width: 22 }} />
      </View>

      {/* ===== ScrollView ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70, paddingHorizontal: 20 }}
      >
        {/* ===== MAIN ORDER CARD ===== */}
        <View style={[styles.mainCard, { backgroundColor: theme.cardBackground }]}>
          <Image source={require('../../assets/b1.png')} style={styles.foodImage} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={styles.rowBetween}>
              <Text style={[styles.orderId, { color: '#E63946' }]}>#265896</Text>
              <Text style={[styles.deliveredText, { color: '#28A745' }]}>Delivered</Text>
            </View>
            <Text style={[styles.foodName, { color: theme.text }]}>Masala Poha</Text>
            <Text style={[styles.orderInfo, { color: theme.textSecondary }]}>22 Sep, 9.00 &bull; 3 Items</Text>
          </View>
        </View>

        {/* ===== DETAILS ===== */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Details</Text>
          <Text style={[styles.addressText, { color: theme.textSecondary }]}>
            6391 Elgin St. Celina, Delaware 10299
          </Text>
        </View>

        {/* ===== AGENT INFO ===== */}
        <View style={styles.agentSection}>
          <Image source={require('../../assets/user.png')} style={styles.agentImg} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[styles.agentId, { color: theme.textSecondary }]}>ID: DKS-501F9</Text>
            <Text style={[styles.agentName, { color: theme.text }]}>Mann Sharma</Text>
          </View>
          <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
            <Image
              source={require('../../assets/call.png')}
              style={styles.callIcon}
            />
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* ===== ORDERED FOOD ===== */}
        <Text style={[styles.ordersFoodTitle, { color: theme.text }]}>Orders Food</Text>

        {[
          {
            img: require('../../assets/b2.png'),
            name: 'Spicy Paneer Burger',
            cafe: 'Foodicated Cafe',
            qty: '02',
            price: '₹ 100.00',
          },
          {
            img: require('../../assets/b3.png'),
            name: 'Spicy Paneer Burger',
            cafe: 'Foodicated Cafe',
            qty: '02',
            price: '₹ 100.00',
          },
        ].map((item, index) => (
          <View
            key={index}
            style={[styles.foodCard, { backgroundColor: theme.cardBackground }]}
          >
            <Image source={item.img} style={styles.foodThumb} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.foodTitle, { color: theme.text }]}>{item.name}</Text>
              <Text style={[styles.cafeName, { color: theme.textSecondary }]}>{item.cafe}</Text>
              <View style={styles.rowBetween}>
                <Text style={[styles.foodPrice, { color: theme.text }]}>{item.price}</Text>
                <View style={styles.qtyBox}>
                  <TouchableOpacity style={styles.qtyBtn}>
                    <Text style={[styles.qtySign, { color: '#F97316' }]}>−</Text>
                  </TouchableOpacity>
                  <Text style={[styles.qtyText, { color: theme.text }]}>{item.qty}</Text>
                  <TouchableOpacity style={styles.qtyBtn}>
                    <Text style={[styles.qtySign, { color: '#F97316' }]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* ===== TOTAL SECTION ===== */}
        <View style={styles.totalSection}>
          <View style={styles.rowBetween}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.totalItems, { color: theme.textSecondary }]}>(3 items)</Text>
              <Text style={[styles.totalAmount, { color: theme.text }]}>₹ 580.00</Text>
            </View>
          </View>

          {/* ===== BUTTONS ===== */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.rateBtn, { borderColor: '#F97316', backgroundColor: '#fff' }]}
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
              <Text style={[styles.reorderText, { color: '#fff' }]}>RE-ORDER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ===== RATING MODAL ===== */}
      <Modal visible={ratingModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { maxHeight: height * 0.9 }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleCancelRating}>
                <Image source={require('../../assets/back.png')} style={styles.modalBackIcon} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {hasRated ? 'Edit Review' : 'Leave a Review'}
              </Text>
            </View>

            <View style={[styles.reviewCard, { backgroundColor: '#f8f8f8' }]}>
              <Image source={require('../../assets/b1.png')} style={styles.modalFoodImg} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.modalOrderId}>#265896</Text>
                <Text style={styles.modalOrderTitle}>Masala Poha</Text>
                <Text style={styles.modalOrderMeta}>
                  {'22 Sep, 9.00 • 3 Items '}
                  <Text style={{ color: 'green' }}>Delivered</Text>
                </Text>
              </View>
              <Text style={styles.modalPrice}>₹ 580.00</Text>
            </View>

            <Text style={styles.howText}>
              {hasRated ? 'How was your order?' : 'How is your order?'}
            </Text>
            <Text style={styles.subHowText}>
              {hasRated 
                ? 'Update your rating or review...' 
                : 'Please give your rating & also your review...'
              }
            </Text>

            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                  <Image
                    source={
                      selectedStars >= star
                        ? require('../../assets/starfill.png')
                        : require('../../assets/star1.png')
                    }
                    style={styles.starRatingIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.inputBox}
              placeholder="Write your review..."
              value={reviewText}
              onChangeText={setReviewText}
              placeholderTextColor={'#999'}
              multiline
            />

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
                <Text style={[styles.trackText, { opacity: selectedStars === 0 ? 0.5 : 1 }]}>
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

  // Specific marginTop for iOS (10), for Android calculated 0.7 * statusbar height (~25)
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
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  orderId: { fontSize: width * 0.035, fontWeight: '700' },
  deliveredText: { fontSize: width * 0.035, fontWeight: '600' },
  foodName: { fontSize: width * 0.04, fontWeight: '700' },
  orderInfo: { fontSize: width * 0.033, marginTop: 2 },

  /** DETAILS **/
  section: { marginTop: 20 },
  sectionTitle: { fontSize: width * 0.04, fontWeight: '700' },
  addressText: { fontSize: width * 0.033, marginTop: 5, lineHeight: 18 },

  /** AGENT **/
  agentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  agentImg: { width: 55, height: 55, borderRadius: 27.5 },
  agentId: { fontSize: width * 0.032 },
  agentName: { fontSize: width * 0.038, fontWeight: '700' },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F97316',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  callIcon: { width: 16, height: 16, tintColor: '#fff', marginRight: 5 },
  callText: { color: '#fff', fontWeight: '700', fontSize: width * 0.034 },

  /** FOOD LIST **/
  ordersFoodTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
    marginTop: 25,
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
  foodTitle: { fontSize: width * 0.038, fontWeight: '700' },
  cafeName: { fontSize: width * 0.032, marginBottom: 8 },
  foodPrice: { fontSize: width * 0.038, fontWeight: '700' },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  qtyBtn: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  qtySign: { fontSize: 16, color: '#F97316', fontWeight: '700' },
  qtyText: { fontSize: width * 0.034, fontWeight: '700', marginHorizontal: 5 },

  /** TOTAL **/
  totalSection: { marginHorizontal: 20, marginTop: 25 },
  totalLabel: { fontSize: width * 0.04, fontWeight: '700' },
  totalItems: { fontSize: width * 0.032, color: '#777' },
  totalAmount: { fontSize: width * 0.045, fontWeight: '700' },

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
  rateText: { color: '#F97316', fontWeight: '700', fontSize: width * 0.038 },
  reorderBtn: {
    flex: 1,
    backgroundColor: '#F97316',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reorderText: { color: '#fff', fontWeight: '700', fontSize: width * 0.038 },

  /** MODAL STYLES **/
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalBackIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginLeft: 12,
    textAlign: 'center',
    flex: 1,
  },

  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  modalFoodImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  modalOrderId: {
    color: '#E63946',
    fontWeight: '700',
    fontSize: 13,
  },
  modalOrderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  modalOrderMeta: {
    fontSize: 12,
    color: '#666',
  },
  modalPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  howText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  subHowText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },

  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  starRatingIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 6,
    resizeMode: 'contain',
  },

  inputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 10,
    marginTop: 16,
    height: 80,
    textAlignVertical: 'top',
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    flexWrap: 'wrap',
  },
  modalRemoveBtn: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff4444',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalCancelBtn: {
    flex: 1,
    marginRight: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalSubmitBtn: {
    flex: 1,
    marginLeft: 6,
    backgroundColor: '#F97316',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  removeText: {
    color: '#ff4444',
    fontWeight: '600',
  },
  cancelText: {
    color: '#000',
    fontWeight: '600',
  },
  trackText: {
    color: '#fff',
    fontWeight: '600',
  },
});
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import { COLORS } from '../../../theme/colors';

const RatingModal = ({
  visible,
  onClose,
  selectedStars,
  onStarPress,
  reviewText,
  setReviewText,
  onSubmit,
}) => {
  /* ⭐ RESET IF SAME STAR PRESSED ⭐ */
  const handleStarPress = star => {
    if (selectedStars === star) {
      onStarPress(0); // reset rating
    } else {
      onStarPress(star);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* HEADER */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={{ padding: 6 }}>
              <Image
                source={require('../../../assets/back.png')}
                style={styles.modalBackIcon}
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Leave a Review</Text>
          </View>

          {/* REVIEW CARD */}
          <View style={styles.reviewCard}>
            {/* IMAGE */}
            <Image
              source={require('../../../assets/poha.png')}
              style={styles.foodImg}
            />

            {/* TEXT BLOCK */}
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.orderId}>#265896</Text>

              <Text style={styles.orderTitle}>Masala Poha</Text>

              <Text style={styles.orderMeta}>22 Sep, 9.00 • 3 Items</Text>

              {/* DELIVERY STATUS LEFT */}
              <View style={styles.statusRow}>
                <Text style={styles.deliveryLeft}>Delivery Status</Text>
              </View>
            </View>

            {/* PRICE + DELIVERED RIGHT */}
            <View style={styles.priceBlock}>
              <Text style={styles.price}>₹ 50.00</Text>

              <Text style={styles.deliveryRight}>Delivered</Text>
            </View>
          </View>

          {/* TEXT */}
          <Text style={styles.howText}>How is your order?</Text>
          <Text style={styles.subHowText}>
            Please give your rating & also your review...
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
                      ? require('../../../assets/starfill.png')
                      : require('../../../assets/star1.png')
                  }
                  style={styles.starRatingIcon}
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
            <TouchableOpacity style={styles.modalCancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalSubmitBtn} onPress={onSubmit}>
              <Text style={styles.trackText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RatingModal;

/* ====================== STYLES ====================== */

const styles = StyleSheet.create({
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

  modalBackIcon: { width: 20, height: 20, tintColor: '#000' },

  modalTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    marginRight: 26,
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  foodImg: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },

  orderId: {
    color: COLORS.primary,
    fontSize: 13,
    fontFamily: getFontFamily('SemiBold'),
  },

  orderTitle: {
    fontSize: 15,
    color: '#000',
    marginTop: 2,
    fontFamily: getFontFamily('Bold'),
  },

  orderMeta: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    fontFamily: getFontFamily('Medium'),
  },

  statusRow: {
    marginTop: 6,
  },

  deliveryLeft: {
    color: '#666',
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
  },

  priceBlock: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  price: {
    color: '#000',
    fontSize: 15,
    fontFamily: getFontFamily('Bold'),
  },

  deliveryRight: {
    marginTop: 8,
    color: 'green',
    fontSize: 12,
    fontFamily: getFontFamily('SemiBold'),
  },

  howText: {
    fontSize: 16,
    marginTop: 22,
    textAlign: 'center',
    color: '#000',
    fontFamily: getFontFamily('SemiBold'),
  },

  subHowText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: getFontFamily('Medium'),
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
    fontFamily: getFontFamily('Medium'),
  },

  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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

  cancelText: {
    color: '#000',
    fontFamily: getFontFamily('Bold'),
  },

  trackText: {
    color: '#fff',
    fontFamily: getFontFamily('Bold'),
  },
});

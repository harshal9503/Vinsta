

import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import React, { useContext } from 'react';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';

const RatingModal = ({
  visible,
  onClose,
  selectedStars,
  onStarPress,
  reviewText,
  setReviewText,
  onSubmit
}) => {

  const { theme } = useContext(ThemeContext);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>

        <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>

          {/* Header */}
          <View style={[styles.modalHeader, { backgroundColor: theme.card }]}>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require('../../../assets/back.png')}
                style={[styles.modalBackIcon, { tintColor: theme.text }]}
              />
            </TouchableOpacity>

            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Leave a Review
            </Text>
          </View>

          {/* Food Card */}
          <View style={[styles.reviewCard, { backgroundColor: theme.card }]}>
            <Image
              source={require('../../../assets/poha.png')}
              style={styles.foodImg}
            />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.orderId, { color: '#f0a417ff' }]}>#265896</Text>


              <Text style={[styles.orderTitle, { color: theme.text }]}>
                Masala Poha
              </Text>

              <Text style={[styles.orderMeta, { color: theme.mode === 'dark' ? '#CCCCCC' : '#6C6C6C' }]}>
                22 Sep, 9.00 • 3 Items{' '}
                <Text style={{ color: '#00A651' }}>Delivered</Text>
              </Text>

            </View>

            <Text style={[styles.price, { color: theme.text }]}>₹ 50.00</Text>
          </View>

          {/* Rating Title */}
          <Text style={[styles.howText, { color: theme.text }]}>
            How is your order?
          </Text>

          <Text style={[styles.subHowText,
          { color: theme.mode === 'dark' ? '#CCCCCC' : '#9e9c9cff' }]}>
            Please give your rating & also your review...
          </Text>


          {/* Stars */}
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => onStarPress(star)}>
                <Image
                  source={
                    selectedStars >= star
                      ? require('../../../assets/starfill.png')
                      : require('../../../assets/star1.png')
                  }
                  style={[
                    styles.starRatingIcon,
                    { tintColor: theme.text }
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Review Input */}
          <TextInput
            style={[
              styles.inputBox,
              {
                backgroundColor:
                  theme.mode === 'dark' ? '#1E1E1E' : theme.card, 
                color:
                  theme.mode === 'dark' ? '#FFFFFF' : theme.text,  
                borderColor:
                  theme.mode === 'dark' ? '#FFFFFF55' : '#D0D0D0', 
              }
            ]}
            placeholder="Write your review..."
            placeholderTextColor={theme.mode === 'dark' ? '#AAAAAA' : '#888888'}
            value={reviewText}
            onChangeText={setReviewText}
            multiline
          />

          {/* Buttons */}
          <View style={styles.modalBtnRow}>

            <TouchableOpacity
              style={[
                styles.modalCancelBtn,
                {
                  backgroundColor: theme.card,   
                  borderColor: '#808080',        
                }
              ]}
              onPress={onClose}
            >
              <Text style={[styles.cancelText, { color: theme.text }]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalSubmitBtn,
                { backgroundColor: COLORS.primary }
              ]}
              onPress={onSubmit}
            >
              <Text style={[styles.trackText]}>Submit</Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </Modal>
  );
};

export default RatingModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  modalHeader: { flexDirection: 'row', alignItems: 'center', paddingBottom: 10 },
  modalBackIcon: { width: 20, height: 20 },

  modalTitle: {
    fontSize: 18,
    marginLeft: 12,
    textAlign: 'center',
    flex: 1,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 10,
    borderRadius: 10,
  },

  howText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  subHowText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
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
    borderRadius: 12,
    padding: 10,
    marginTop: 16,
    height: 80,
    textAlignVertical: 'top',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  modalCancelBtn: {
    flex: 1,
    marginRight: 6,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },

  modalSubmitBtn: {
    flex: 1,
    marginLeft: 6,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },

  trackText: {
    color: '#fff',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  cancelText: {
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  foodImg: { width: 50, height: 50, borderRadius: 8 },

  orderId: {
    fontSize: 13,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  orderTitle: {
    fontSize: 15,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  orderMeta: {
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  price: {
    fontSize: 15,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  }
});

import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import { COLORS } from '../../../theme/colors';


const RatingModal = ({
  visible,
  onClose,
  selectedStars,
  onStarPress,
  reviewText,
  setReviewText,
  onSubmit
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>

          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require('../../../assets/back.png')}
                style={styles.modalBackIcon}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Leave a Review</Text>
          </View>

          {/* Card */}
          <View style={styles.reviewCard}>
            <Image
              source={require('../../../assets/poha.png')}
              style={styles.foodImg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.orderId}>#265896</Text>
              <Text style={styles.orderTitle}>Masala Poha</Text>
              <Text style={styles.orderMeta}>
                22 Sep, 9.00 • 3 Items{' '}
                <Text style={{ color: 'green' }}>Delivered</Text>
              </Text>
            </View>
            <Text style={styles.price}>₹ 50.00</Text>
          </View>

          {/* Rating */}
          <Text style={styles.howText}>How is your order?</Text>
          <Text style={styles.subHowText}>
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
                  style={styles.starRatingIcon}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Review input */}
          <TextInput
            style={styles.inputBox}
            placeholder="Write your review..."
            value={reviewText}
            onChangeText={setReviewText}
            placeholderTextColor={'#999'}
          />

          {/* Buttons */}
          <View style={styles.modalBtnRow}>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSubmitBtn}
              onPress={onSubmit}
            >
              <Text style={styles.trackText}>Submit</Text>
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
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
      },
      modalHeader: { flexDirection: 'row', alignItems: 'center' },
      modalBackIcon: { width: 20, height: 20, tintColor: '#000' },
      modalTitle: {
        fontSize: 18,
        color: '#000',
        marginLeft: 12,
        textAlign: 'center',
        flex: 1,
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
      },
    
      reviewCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        marginTop: 16,
        padding: 10,
        borderRadius: 10,
      },
      howText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: getFontFamily('SemiBold'),
        fontWeight: getFontWeight('SemiBold'),
      },
      subHowText: {
        fontSize: 13,
        color: '#666',
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
        borderColor: '#ddd',
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
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
      },
    
      card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
      },
      cardImg: { width: '100%', height: 180, resizeMode: 'cover' },
      cardContent: { padding: 14 },
      ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 6,
      },
      starIconSmall: { width: 12, height: 12, tintColor: '#fff', marginRight: 6 },
      ratingText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: getFontFamily('SemiBold'),
        fontWeight: getFontWeight('SemiBold'),
      },
      title: {
        fontSize: 16,
        color: '#000',
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
      },
      locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
      locIcon: { width: 12, height: 12, marginRight: 6, resizeMode: 'contain' },
      location: {
        fontSize: 13,
        color: '#555',
        flex: 1,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
      },
      heartBtn: {
        backgroundColor: '#777',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
      },
      heartIcon: { width: 14, height: 14, resizeMode: 'contain' },
      infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6 },
      subInfo: {
        color: '#777',
        fontSize: 13,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
      },
      metaIcon: { width: 13, height: 13, marginHorizontal: 4, resizeMode: 'contain' },
      metaText: {
        color: '#555',
        fontSize: 12,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
      },
    
      emptyText: {
        textAlign: 'center',
        color: '#777',
        fontSize: 15,
        marginTop: 60,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
      },
        foodImg: { width: 50, height: 50, borderRadius: 8 },
        orderTopRow: { flexDirection: 'row', alignItems: 'center' },
          orderId: {
            color: COLORS.primary,
            fontSize: 13,
            fontFamily: getFontFamily('SemiBold'),
            fontWeight: getFontWeight('SemiBold'),
          },
          orderTitle: {
            fontSize: 15,
            color: '#000',
            fontFamily: getFontFamily('Bold'),
            fontWeight: getFontWeight('Bold'),
          },
          orderMeta: {
            color: '#666',
            fontSize: 12,
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
          price: {
            fontSize: 15,
            color: '#000',
            fontFamily: getFontFamily('Bold'),
            fontWeight: getFontWeight('Bold'),
          },
        
          orderBottomRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          },
          estimateText: {
            fontSize: 12,
            color: '#666',
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
          nowText: {
            fontSize: 12,
            color: '#666',
            textAlign: 'right',
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
          time: {
            fontSize: 14,
            color: '#000',
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
          statusText: {
            color: '#000',
            fontSize: 13,
            textAlign: 'right',
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
        
          buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          },
          cancelBtn: {
            flex: 1,
            marginRight: 6,
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
            paddingVertical: 10,
            alignItems: 'center',
          },
          trackBtn: {
            flex: 1,
            marginLeft: 6,
            backgroundColor: COLORS.primary,
            borderRadius: 8,
            paddingVertical: 10,
            alignItems: 'center',
          },
          cancelText: {
            color: '#000',
            fontFamily: getFontFamily('Bold'),
            fontWeight: getFontWeight('Bold'),
          },
          trackText: {
            color: '#fff',
            fontFamily: getFontFamily('Bold'),
            fontWeight: getFontWeight('Bold'),
          },
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import { COLORS } from '../../../theme/colors';


const RatingModal = ({
  visible,
  onClose,
  selectedStars,
  onStarPress,
  reviewText,
  setReviewText,
  onSubmit
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>

          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require('../../../assets/back.png')}
                style={styles.modalBackIcon}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Leave a Review</Text>
          </View>

          {/* Card */}
          <View style={styles.reviewCard}>
            <Image
              source={require('../../../assets/poha.png')}
              style={styles.foodImg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.orderId}>#265896</Text>
              <Text style={styles.orderTitle}>Masala Poha</Text>
              <Text style={styles.orderMeta}>
                22 Sep, 9.00 • 3 Items{' '}
                <Text style={{ color: 'green' }}>Delivered</Text>
              </Text>
            </View>
            <Text style={styles.price}>₹ 50.00</Text>
          </View>

          {/* Rating */}
          <Text style={styles.howText}>How is your order?</Text>
          <Text style={styles.subHowText}>
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
                  style={styles.starRatingIcon}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Review input */}
          <TextInput
            style={styles.inputBox}
            placeholder="Write your review..."
            value={reviewText}
            onChangeText={setReviewText}
            placeholderTextColor={'#999'}
          />

          {/* Buttons */}
          <View style={styles.modalBtnRow}>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSubmitBtn}
              onPress={onSubmit}
            >
              <Text style={styles.trackText}>Submit</Text>
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
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
      },
      modalHeader: { flexDirection: 'row', alignItems: 'center' },
      modalBackIcon: { width: 20, height: 20, tintColor: '#000' },
      modalTitle: {
        fontSize: 18,
        color: '#000',
        marginLeft: 12,
        textAlign: 'center',
        flex: 1,
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
      },
    
      reviewCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        marginTop: 16,
        padding: 10,
        borderRadius: 10,
      },
      howText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: getFontFamily('SemiBold'),
        fontWeight: getFontWeight('SemiBold'),
      },
      subHowText: {
        fontSize: 13,
        color: '#666',
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
        borderColor: '#ddd',
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
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
      },
    
      card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
      },
      cardImg: { width: '100%', height: 180, resizeMode: 'cover' },
      cardContent: { padding: 14 },
      ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 6,
      },
      starIconSmall: { width: 12, height: 12, tintColor: '#fff', marginRight: 6 },
      ratingText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: getFontFamily('SemiBold'),
        fontWeight: getFontWeight('SemiBold'),
      },
      title: {
        fontSize: 16,
        color: '#000',
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
      },
      locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
      locIcon: { width: 12, height: 12, marginRight: 6, resizeMode: 'contain' },
      location: {
        fontSize: 13,
        color: '#555',
        flex: 1,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
      },
      heartBtn: {
        backgroundColor: '#777',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
      },
      heartIcon: { width: 14, height: 14, resizeMode: 'contain' },
      infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6 },
      subInfo: {
        color: '#777',
        fontSize: 13,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
      },
      metaIcon: { width: 13, height: 13, marginHorizontal: 4, resizeMode: 'contain' },
      metaText: {
        color: '#555',
        fontSize: 12,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
      },
    
      emptyText: {
        textAlign: 'center',
        color: '#777',
        fontSize: 15,
        marginTop: 60,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
      },
        foodImg: { width: 50, height: 50, borderRadius: 8 },
        orderTopRow: { flexDirection: 'row', alignItems: 'center' },
          orderId: {
            color: COLORS.primary,
            fontSize: 13,
            fontFamily: getFontFamily('SemiBold'),
            fontWeight: getFontWeight('SemiBold'),
          },
          orderTitle: {
            fontSize: 15,
            color: '#000',
            fontFamily: getFontFamily('Bold'),
            fontWeight: getFontWeight('Bold'),
          },
          orderMeta: {
            color: '#666',
            fontSize: 12,
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
          price: {
            fontSize: 15,
            color: '#000',
            fontFamily: getFontFamily('Bold'),
            fontWeight: getFontWeight('Bold'),
          },
        
          orderBottomRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          },
          estimateText: {
            fontSize: 12,
            color: '#666',
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
          nowText: {
            fontSize: 12,
            color: '#666',
            textAlign: 'right',
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
          time: {
            fontSize: 14,
            color: '#000',
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
          statusText: {
            color: '#000',
            fontSize: 13,
            textAlign: 'right',
            fontFamily: getFontFamily('Medium'),
            fontWeight: getFontWeight('Medium'),
          },
        
          buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          },
          cancelBtn: {
            flex: 1,
            marginRight: 6,
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
            paddingVertical: 10,
            alignItems: 'center',
          },
          trackBtn: {
            flex: 1,
            marginLeft: 6,
            backgroundColor: COLORS.primary,
            borderRadius: 8,
            paddingVertical: 10,
            alignItems: 'center',
          },
          cancelText: {
            color: '#000',
            fontFamily: getFontFamily('Bold'),
            fontWeight: getFontWeight('Bold'),
          },
          trackText: {
            color: '#fff',
            fontFamily: getFontFamily('Bold'),
            fontWeight: getFontWeight('Bold'),
          },
})
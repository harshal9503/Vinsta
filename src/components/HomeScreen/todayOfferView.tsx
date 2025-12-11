import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';
import { ThemeContext } from '../../theme/ThemeContext';

import { getFontFamily, getFontWeight } from '../../utils/fontHelper';
import { lightTheme } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const TodayOfferView = () => {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState('');

  const offers = [
    {
      id: 1,
      title: 'Free Delivery',
      subtitle: 'On orders above $50',
      description:
        'Enjoy free delivery on all orders above $50. Valid for today only!',
      discount: 'FREE',
      couponCode: 'FREESHIP50',
      img: require('../../assets/b1.png'),
      color: COLORS.primary,
    },
    {
      id: 2,
      title: '50% Off',
      subtitle: 'On selected items',
      description: 'Get 50% discount on selected burgers and beverages.',
      discount: '50% OFF',
      couponCode: 'HALFOFF',
      img: require('../../assets/b2.png'),
      color: COLORS.primary,
    },
    {
      id: 3,
      title: 'Buy 1 Get 1',
      subtitle: 'Pizza special',
      description: 'Buy any large pizza and get another one absolutely free!',
      discount: 'BOGO',
      couponCode: 'BUY1GET1',
      img: require('../../assets/b3.png'),
      color: COLORS.primary,
    },
    {
      id: 4,
      title: '30% Off',
      subtitle: 'First order discount',
      description:
        'New users get 30% off on their first order. Use code: WELCOME30',
      discount: '30% OFF',
      couponCode: 'WELCOME30',
      img: require('../../assets/r1.png'),
      color: COLORS.primary,
    },
    {
      id: 5,
      title: 'Combo Deal',
      subtitle: 'Burger + Fries + Drink',
      description:
        'Get our special combo at just $15.99. Save $8 on this deal!',
      discount: '$8 OFF',
      couponCode: 'COMBO8',
      img: require('../../assets/r2.png'),
      color: COLORS.primary,
    },
  ];

  const handleClaimOffer = (couponCode: string) => {
    setSelectedCoupon(couponCode);
    setModalVisible(true);
  };

  const copyToClipboard = () => {
    Alert.alert(
      'Copied!',
      `Coupon code "${selectedCoupon}" copied to clipboard`,
    );
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Today's Offers
        </Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {offers.map(offer => (
          <View
            key={offer.id}
            style={[
              styles.offerCard,
              {
                backgroundColor: theme.cardBackground,
                shadowColor: theme.mode === 'dark' ? 'transparent' : '#000',
              },
            ]}
          >
            <View
              style={[styles.discountBadge, { backgroundColor: offer.color }]}
            >
              <Text style={styles.discountText}>{offer.discount}</Text>
            </View>

            <View style={styles.offerContent}>
              <View style={styles.offerText}>
                <Text style={[styles.offerTitle, { color: theme.text }]}>
                  {offer.title}
                </Text>
                <Text
                  style={[styles.offerSubtitle, { color: theme.textSecondary }]}
                >
                  {offer.subtitle}
                </Text>
                <Text
                  style={[
                    styles.offerDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  {offer.description}
                </Text>

                <View style={styles.validityRow}>
                  <Image
                    source={require('../../assets/clockk.png')}
                    style={[styles.clockIcon, { tintColor: COLORS.primary }]}
                  />
                  <Text
                    style={[
                      styles.validityText,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Valid till midnight
                  </Text>
                </View>

                <TouchableOpacity
                  style={[styles.claimBtn, { backgroundColor: offer.color }]}
                  activeOpacity={0.8}
                  onPress={() => handleClaimOffer(offer.couponCode)}
                >
                  <Text style={styles.claimBtnText}>Claim Offer</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.offerImageContainer}>
                <Image source={offer.img} style={styles.offerImage} />
              </View>
            </View>
          </View>
        ))}

        {/* Terms */}
        <View
          style={[styles.termsCard, { backgroundColor: theme.cardBackground }]}
        >
          <Text style={[styles.termsTitle, { color: theme.text }]}>
            Terms & Conditions
          </Text>
          <Text style={[styles.termsText, { color: theme.textSecondary }]}>
            • Offers are valid for today only{'\n'}• Cannot be combined with
            other offers{'\n'}• Minimum order value may apply{'\n'}• Valid for
            dine-in and delivery orders{'\n'}• Restaurant reserves the right to
            modify offers
          </Text>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <Text style={[styles.modalTitle, { color: COLORS.primary }]}>
              Your Coupon Code
            </Text>

            <View
              style={[
                styles.couponContainer,
                {
                  backgroundColor: theme.mode === 'dark' ? '#333' : '#f8f9fa',
                  borderColor: COLORS.primary,
                },
              ]}
            >
              <Text style={[styles.couponCode, { color: COLORS.primary }]}>
                {selectedCoupon}
              </Text>
            </View>

            <Text
              style={[styles.modalDescription, { color: theme.textSecondary }]}
            >
              Use this code at checkout to apply your discount
            </Text>

            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyToClipboard}
            >
              <Image
                source={require('../../assets/copy.png')}
                style={styles.copyIcon}
              />
              <Text style={styles.copyButtonText}>Copy Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.closeButton, { borderColor: theme.textSecondary }]}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={[styles.closeButtonText, { color: theme.textSecondary }]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodayOfferView;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backIcon: { width: 22, height: 22 },
  headerTitle: {
    fontSize: width * 0.045,
    fontFamily: getFontFamily('Bold'),
  },

  offerCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    paddingBottom: 10,
  },

  discountBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomLeftRadius: 10,
  },

  discountText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: getFontFamily('Bold'),
  },

  offerContent: { flexDirection: 'row', padding: 16 },

  offerText: { flex: 1, paddingRight: 12 },

  offerTitle: {
    fontSize: 20,
    marginBottom: 4,
    fontFamily: getFontFamily('Bold'),
  },

  offerSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: getFontFamily('Medium'),
  },

  offerDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
    fontFamily: getFontFamily('Regular'),
  },

  validityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },

  clockIcon: { width: 14, height: 14, marginRight: 6 },

  validityText: { fontSize: 12, fontFamily: getFontFamily('Regular') },

  claimBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  claimBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
  },

  offerImageContainer: {
    width: 100,
    height: 100,
  },

  offerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  termsCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
  },

  termsTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: getFontFamily('Bold'),
  },

  termsText: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: getFontFamily('Medium'),
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '90%',
    borderRadius: 20,
    padding: 24,
  },

  modalTitle: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: getFontFamily('Bold'),
  },

  couponContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: 20,
  },

  couponCode: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: getFontFamily('Bold'),
    letterSpacing: 2,
  },

  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: getFontFamily('Medium'),
  },

  copyButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    marginBottom: 10,
  },

  copyIcon: { width: 20, height: 20, tintColor: '#fff', marginRight: 10 },

  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
  },

  closeButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },

  closeButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: getFontFamily('Medium'),
  },
});

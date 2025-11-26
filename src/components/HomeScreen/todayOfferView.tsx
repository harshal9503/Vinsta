import React, { useContext, useState } from 'react';
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
import { getFontFamily, getFontWeight } from '../../utils/fontHelper';
import { ThemeContext } from '../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const TodayOfferView = () => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState('');

  const offers = [
    {
      id: 1,
      title: 'Free Delivery',
      subtitle: 'On orders above $50',
      description: 'Enjoy free delivery on all orders above $50. Valid for today only!',
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
      description: 'New users get 30% off on their first order. Use code: WELCOME30',
      discount: '30% OFF',
      couponCode: 'WELCOME30',
      img: require('../../assets/r1.png'),
      color: COLORS.primary,
    },
    {
      id: 5,
      title: 'Combo Deal',
      subtitle: 'Burger + Fries + Drink',
      description: 'Get our special combo at just $15.99. Save $8 on this deal!',
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
    Alert.alert('Copied!', `Coupon code "${selectedCoupon}" copied to clipboard`);
    setModalVisible(false);
  };


  const {theme} = useContext(ThemeContext);
  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={[styles.backIcon,{tintColor : theme.text}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.text}]}>Today's Offers</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {offers.map((offer) => (
          <View key={offer.id} style={[styles.offerCard,{backgroundColor : theme.cardBackground}]}>
            <View style={[styles.discountBadge, { backgroundColor: offer.color }]}>
              <Text style={[styles.discountText,{color : theme.background}]}>{offer.discount}</Text>
            </View>

            <View style={styles.offerContent}>
              <View style={styles.offerText}>
                <Text style={[styles.offerTitle,{color : theme.text}]}>{offer.title}</Text>
                <Text style={[styles.offerSubtitle,{color : theme.textSecondary}]}>{offer.subtitle}</Text>
                <Text style={[styles.offerDescription,{color : theme.textSecondary}]}>{offer.description}</Text>

                <View style={styles.validityRow}>
                  <Image source={require('../../assets/clockk.png')} style={styles.clockIcon} />
                  <Text style={[styles.validityText,{color : theme.textSecondary}]}>Valid till midnight</Text>
                </View>

                <TouchableOpacity 
                  style={[styles.claimBtn, { backgroundColor: offer.color }]} 
                  activeOpacity={0.8}
                  onPress={() => handleClaimOffer(offer.couponCode)}
                >
                  <Text style={[styles.claimBtnText,{color : theme.background}]}>Claim Offer</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.offerImageContainer}>
                <Image source={offer.img} style={styles.offerImage} />
              </View>
            </View>
          </View>
        ))}

        {/* Terms & Conditions */}
        <View style={[styles.termsCard,{backgroundColor : theme.cardBackground}]}>
          <Text style={[styles.termsTitle,{color : theme.text}]}>Terms & Conditions</Text>
          <Text style={[styles.termsText,{color : theme.textSecondary}]}>
            • Offers are valid for today only{'\n'}
            • Cannot be combined with other offers{'\n'}
            • Minimum order value may apply{'\n'}
            • Valid for dine-in and delivery orders{'\n'}
            • Restaurant reserves the right to modify offers
          </Text>
        </View>
      </ScrollView>

      {/* Coupon Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Your Coupon Code</Text>
              
              <View style={styles.couponContainer}>
                <Text style={styles.couponCode}>{selectedCoupon}</Text>
              </View>
              
              <Text style={styles.modalDescription}>
                Use this code at checkout to apply your discount
              </Text>

              <TouchableOpacity 
                style={styles.copyButton} 
                onPress={copyToClipboard}
                activeOpacity={0.8}
              >
                <Image 
                  source={require('../../assets/copy.png')} 
                  style={styles.copyIcon} 
                />
                <Text style={styles.copyButtonText}>Copy Code</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodayOfferView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  offerCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomLeftRadius: 12,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  offerContent: {
    flexDirection: 'row',
    padding: 16,
  },
  offerText: {
    flex: 1,
    paddingRight: 12,
  },
  offerTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  offerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  offerDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 12,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  validityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clockIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.primary,
    marginRight: 6,
  },
  validityText: {
    fontSize: 12,
    color: '#999',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  claimBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  claimBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  offerImageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  termsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  termsTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  termsText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  // Modal Styles - Fixed for Android
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 350,
    margin: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 22,
    color: COLORS.primary,
    marginBottom: 20,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    textAlign: 'center',
  },
  couponContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    marginBottom: 20,
    width: '100%',
  },
  couponCode: {
    fontSize: 24,
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    letterSpacing: 2,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    lineHeight: 20,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    marginBottom: 12,
  },
  copyIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginRight: 8,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
});
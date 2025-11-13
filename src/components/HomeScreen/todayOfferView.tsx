import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';
import font from '../../assets/fonts';

const { width, height } = Dimensions.get('window');

const TodayOfferView = () => {
  const navigation = useNavigation<any>();
  
  const offers = [
    {
      id: 1,
      title: 'Free Delivery',
      subtitle: 'On orders above $50',
      description: 'Enjoy free delivery on all orders above $50. Valid for today only!',
      discount: 'FREE',
      img: require('../../assets/offers.png'),
      color: '#FF6B6B',
    },
    {
      id: 2,
      title: '50% Off',
      subtitle: 'On selected items',
      description: 'Get 50% discount on selected burgers and beverages.',
      discount: '50% OFF',
      img: require('../../assets/offers.png'),
      color: '#4ECDC4',
    },
    {
      id: 3,
      title: 'Buy 1 Get 1',
      subtitle: 'Pizza special',
      description: 'Buy any large pizza and get another one absolutely free!',
      discount: 'BOGO',
      img: require('../../assets/offers.png'),
      color: '#45B7D1',
    },
    {
      id: 4,
      title: '30% Off',
      subtitle: 'First order discount',
      description: 'New users get 30% off on their first order. Use code: WELCOME30',
      discount: '30% OFF',
      img: require('../../assets/offers.png'),
      color: '#F39C12',
    },
    {
      id: 5,
      title: 'Combo Deal',
      subtitle: 'Burger + Fries + Drink',
      description: 'Get our special combo at just $15.99. Save $8 on this deal!',
      discount: '$8 OFF',
      img: require('../../assets/offers.png'),
      color: '#E74C3C',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Offers</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {offers.map(offer => (
          <TouchableOpacity key={offer.id} style={styles.offerCard} activeOpacity={0.9}>
            <View style={[styles.discountBadge, { backgroundColor: offer.color }]}>
              <Text style={styles.discountText}>{offer.discount}</Text>
            </View>
            
            <View style={styles.offerContent}>
              <View style={styles.offerText}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
                
                <View style={styles.validityRow}>
                  <Image source={require('../../assets/clock.png')} style={styles.clockIcon} />
                  <Text style={styles.validityText}>Valid till midnight</Text>
                </View>
                
                <TouchableOpacity style={[styles.claimBtn, { backgroundColor: offer.color }]} activeOpacity={0.8}>
                  <Text style={styles.claimBtnText}>Claim Offer</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.offerImageContainer}>
                <Image source={offer.img} style={styles.offerImage} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Terms & Conditions */}
        <View style={styles.termsCard}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          <Text style={styles.termsText}>
            • Offers are valid for today only{'\n'}
            • Cannot be combined with other offers{'\n'}
            • Minimum order value may apply{'\n'}
            • Valid for dine-in and delivery orders{'\n'}
            • Restaurant reserves the right to modify offers
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TodayOfferView;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
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
    tintColor: '#000' 
  },
  headerTitle: { 
    fontSize: width * 0.045, 
    fontWeight: '700', 
    color: '#000', 
    fontFamily : 'Figtree-Bold'
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
    fontWeight: '700',
    fontFamily : 'Figtree-Bold'
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
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
    fontFamily : 'Figtree-Bold'
  },
  offerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontFamily : 'Figtree-Medium',
    fontWeight : '500'
  },
  offerDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 12,
    fontFamily : 'Figtree-Medium',
    fontWeight : '500'
  },
  validityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clockIcon: {
    width: 14,
    height: 14,
    tintColor: '#999',
    marginRight: 6,
  },
  validityText: {
    fontSize: 12,
    color: '#999',
    fontFamily : 'Figtree-Regular'
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
    fontWeight: '600',
    fontFamily : 'Figtree-Medium'
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
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    fontFamily : 'Figtree-Bold'
  },
  termsText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    fontFamily : 'Figtree-Medium'
  },
});

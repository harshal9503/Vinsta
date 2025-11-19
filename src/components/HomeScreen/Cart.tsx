import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';
import font from '../../assets/fonts';

const { width, height } = Dimensions.get('window');

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Cheese Burger',
      subtext: 'Bistro Excellence',
      price: 100,
      quantity: 2,
      img: require('../../assets/b1.png'),
    },
    {
      id: 2,
      name: 'Cheese Burger',
      subtext: 'Bistro Excellence',
      price: 100,
      quantity: 2,
      img: require('../../assets/b2.png'),
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState({
    label: 'Home',
    address:
      '320 Koregaon park lane to, 4 opposite to B.M.W. showroom, Indore M.P.',
  });

  const updateQuantity = (id: number, increase: boolean) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: increase
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const productPrice = 200;
  const totalTax = 50;
  const deliveryCharge = 50;
  const total = productPrice + totalTax + deliveryCharge;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        {/* CART ITEMS */}
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartCard}>
            <Image source={item.img} style={styles.foodImg} />

            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodSub}>{item.subtext}</Text>
              <Text style={styles.foodPrice}>₹ {item.price.toFixed(2)}</Text>

              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, false)}
                  style={[
                    styles.qtyBtn,
                    {
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: COLORS.primary,
                    },
                  ]}
                >
                  <Text style={[styles.qtyText, { color: COLORS.primary }]}>
                    -
                  </Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>
                  {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                </Text>

                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, true)}
                  style={[styles.qtyBtn, { backgroundColor: COLORS.primary }]}
                >
                  <Text style={[styles.qtyText, { color: '#fff' }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Image
                source={require('../../assets/delete.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* DELIVERY SECTION */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryHeader}>
            <Image
              source={require('../../assets/location.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.deliveryTitle}>Delivery to.</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChangeLocation', {
                  onSelectAddress: (address: any) =>
                    setSelectedAddress(address),
                })
              }
              style={styles.changeButton}
            >
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.addressText}>* {selectedAddress.address}</Text>

          {/* PRICING */}
          <View style={{ marginTop: 15 }}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Product price</Text>
              <Text style={styles.priceValue}>₹ {productPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Total Tax</Text>
              <Text style={styles.priceValue}>₹ {totalTax.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Charge's</Text>
              <Text style={styles.priceValue}>
                ₹ {deliveryCharge.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>₹ {total.toFixed(2)}</Text>
          </View>

          <TextInput
            placeholder="Promo code or voucher"
            placeholderTextColor="#BDBDBD"
            style={styles.input}
          />

          <TouchableOpacity style={styles.couponBtn}>
            <Text style={styles.couponText}>Apply Coupen Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Payment')}
            style={styles.checkoutBtn}
          >
            <Text style={styles.checkoutText}>Check-out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backIcon: { width: 22, height: 22, tintColor: '#000' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000',fontFamily : 'Figtree-Bold' },

  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    padding: 12,
  },
  foodImg: { width: 80, height: 80, borderRadius: 10, resizeMode: 'cover' },
  foodName: { fontSize: 16, fontWeight: '700', color: '#000', fontFamily : 'Figtree-Bold' },
  foodSub: { fontSize: 13, color: '#777', marginBottom: 5 ,fontFamily : 'Figtree-SemiBold',fontWeight  : '600'},
  foodPrice: { fontSize: 15, fontWeight: '700', color: '#000',fontFamily : 'Figtree-Bold' },
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
  qtyText: { fontSize: 16, fontWeight: '700' },
  qtyNumber: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontFamily : 'Figtree-SemiBold'
  },
  deleteIcon: { width: 20, height: 20, tintColor: '#FF6B6B' },

  deliveryCard: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  locationIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.primary,
    marginRight: 6,
  },
  deliveryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    flex: 1,
    fontFamily : 'Figtree-Bold'
  },
  changeButton: {
    marginLeft: 'auto',
  },
  changeText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily : 'Figtree-Bold'
  },
  addressText: { fontSize: 13, color: '#555', marginTop: 4, lineHeight: 18,fontFamily : 'Figtree-Medium',fontWeight : '500' },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceLabel: { fontSize: 14, color: '#000',fontFamily : 'Figtree-SemiBold',fontWeight : '600' },
  priceValue: { fontSize: 14, fontWeight: '600', color: '#000',fontFamily : 'Figtree-SemiBold' },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 10 },

  subtotalLabel: { fontSize: 16, fontWeight: '700', color: '#000',fontFamily : 'Figtree-Bold' },
  subtotalValue: { fontSize: 16, fontWeight: '700', color: COLORS.primary,fontFamily : 'Figtree-Bold' },

  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    marginTop: 10,
    color: '#000',
    fontFamily : 'Figtree-Regular',
    fontWeight : '400'
  },
  couponBtn: {
    marginTop: 10,
    backgroundColor: '#FFF3E0',
    paddingVertical: 12,
    borderRadius: 10,
  },
  couponText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    fontFamily : 'Figtree-SemiBold'
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 14,
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    fontFamily : 'Figtree-Bold'
  },
});


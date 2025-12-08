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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';

import { COLORS } from '../../theme/colors';
import { getFontFamily, getFontWeight } from '../../utils/fontHelper';

const { width, height } = Dimensions.get('window');

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme.mode === "dark";
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
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <StatusBar
        barStyle={theme.cardBackground === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[
              styles.backIcon,
              { tintColor: theme.text }, // theme.text will be white in dark, black in light
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: theme.text }, // auto white in dark, black in light
          ]}
        >
          My Cart
        </Text>

        <View style={{ width: 20 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        {/* CART ITEMS */}
        {cartItems.map(item => (
          <View
            key={item.id}
            style={[
              styles.cartCard,
              {
                backgroundColor: theme.background,
                borderColor: theme.borderColor,
                borderWidth: 1,   // REQUIRED
              },
            ]}
          >


            <Image source={item.img} style={styles.foodImg} />

            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text
                style={[
                  styles.foodName,
                  { color: theme.text },   // auto white in dark, black in light
                ]}
              >
                {item.name}
              </Text>

              <Text style={styles.foodSub}>{item.subtext}</Text>
              <Text
                style={[
                  styles.foodPrice,
                  { color: theme.text },  // auto white in dark, black in light
                ]}
              >
                ₹ {item.price.toFixed(2)}
              </Text>


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
                  <Text style={[styles.qtyText, { color: COLORS.primary }]}>-</Text>
                </TouchableOpacity>

                <Text
                  style={[
                    styles.qtyNumber,
                    { color: theme.text }, // white in dark mode, black in light mode
                  ]}
                >
                  {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                </Text>


                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, true)}
                  style={[
                    styles.qtyBtn,
                    {
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: COLORS.primary,
                    },
                  ]}
                >
                  <Text style={[styles.qtyText, { color: COLORS.primary }]}>+</Text>
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
        <View
          style={[
            styles.deliveryCard,
            {
              backgroundColor: theme.background,
              borderColor: theme.borderColor,
              borderWidth: 1,
            },
          ]}
        >

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
              <Text style={[styles.priceLabel, { color: theme.text }]}>
                Product price
              </Text>
              <Text style={[styles.priceValue, { color: theme.text }]}>
                ₹ {productPrice.toFixed(2)}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.text }]}>
                Total Tax
              </Text>
              <Text style={[styles.priceValue, { color: theme.text }]}>
                ₹ {totalTax.toFixed(2)}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.text }]}>
                Delivery Charge's
              </Text>
              <Text style={[styles.priceValue, { color: theme.text }]}>
                ₹ {deliveryCharge.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={[styles.subtotalLabel, { color: theme.text }]}>
              Subtotal
            </Text>

            <Text style={styles.subtotalValue}>₹ {total.toFixed(2)}</Text>
          </View>

          <TextInput
            placeholder="Promo code or voucher"
            placeholderTextColor={theme.textSecondary}
            style={[
              styles.input,
              {
                color: theme.text,
                backgroundColor: theme.card,
                borderColor: theme.borderColor,
                borderWidth: 1,
              },
            ]}
          />

          <TouchableOpacity
            style={[
              styles.couponBtn,
              {
                backgroundColor: theme.mode === 'dark' ? '#555555' : theme.primary, // grey in dark, orange in light
                borderColor: theme.borderColor,
                borderWidth: 1,
              },
            ]}
          >
            <Text
              style={[
                styles.couponText,
                { color: theme.text }, // text white in both modes
              ]}
            >
              Apply Coupon Code
            </Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#000'
  },
  headerTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

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
  foodImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  foodName: {
    fontSize: 18,
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  foodSub: {
    fontSize: 13,
    color: '#777',
    marginBottom: 5,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  foodPrice: {
    fontSize: 15,
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
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
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  qtyNumber: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#000',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#FF6B6B'
  },

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
    color: COLORS.primary,
    flex: 1,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  changeButton: {
    marginLeft: 'auto',
  },
  changeText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  addressText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
    lineHeight: 18,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#000',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  priceValue: {
    fontSize: 14,
    color: '#000',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10
  },

  subtotalLabel: {
    fontSize: 16,
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  subtotalValue: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    marginTop: 10,
    color: '#000',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
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
    fontSize: 14,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
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
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});
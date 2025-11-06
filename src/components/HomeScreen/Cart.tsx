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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const Cart = () => {
  const navigation = useNavigation<any>();
  
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: 'Cheese Burger', 
      price: 45.50, 
      quantity: 2, 
      img: require('../../assets/b1.png') 
    },
    { 
      id: 2, 
      name: 'Veggie Delight', 
      price: 60.00, 
      quantity: 1, 
      img: require('../../assets/b2.png') 
    },
    { 
      id: 3, 
      name: 'Crispy Fries', 
      price: 30.00, 
      quantity: 3, 
      img: require('../../assets/b3.png') 
    },
  ]);

  const updateQuantity = (id: number, increment: boolean) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Cart Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map(item => (
              <View key={item.id} style={styles.cartItemCard}>
                <Image source={item.img} style={styles.itemImage} />
                
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  
                  <View style={styles.quantityRow}>
                    <TouchableOpacity 
                      style={styles.quantityBtn}
                      onPress={() => updateQuantity(item.id, false)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.quantityBtnText}>-</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    
                    <TouchableOpacity 
                      style={styles.quantityBtn}
                      onPress={() => updateQuantity(item.id, true)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.quantityBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.removeBtn}
                  onPress={() => removeItem(item.id)}
                  activeOpacity={0.7}
                >
                  <Image source={require('../../assets/delete.png')} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            ))}

            {/* Order Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Items ({getTotalItems()})</Text>
                <Text style={styles.summaryValue}>${getTotalPrice().toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>$5.00</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>${(getTotalPrice() * 0.1).toFixed(2)}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${(getTotalPrice() + 5 + (getTotalPrice() * 0.1)).toFixed(2)}</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyCart}>
            <Image source={require('../../assets/emptycart.png')} style={styles.emptyCartImage} />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtext}>Add some delicious items to get started!</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Checkout Button */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity 
            style={styles.checkoutBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={styles.checkoutBtnText}>
              Proceed to Checkout • ${(getTotalPrice() + 5 + (getTotalPrice() * 0.1)).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.secondary 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backIcon: { 
    width: 22, 
    height: 22, 
    tintColor: '#000' 
  },
  headerTitle: { 
    fontSize: width * 0.045, 
    fontWeight: '700', 
    color: '#000' 
  },
  cartItemCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBtn: {
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  removeBtn: {
    padding: 8,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#ff4444',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.2,
  },
  emptyCartImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

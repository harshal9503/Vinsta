import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import { ThemeContext } from '../../../theme/ThemeContext';

const PastOrders = ({ order, navigateToOrderDetail, openRatingModal }) => {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        styles.orderCard,
        { backgroundColor: theme.cardBackground }
      ]}
      onPress={() => navigateToOrderDetail(order)}
      activeOpacity={0.7}
    >
      <View style={styles.orderTopRow}>
        <Image source={order.img} style={styles.foodImg} />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[styles.orderId, { color: COLORS.primary }]}>
            {order.id}
          </Text>

          <Text style={[styles.orderTitle, { color: theme.text }]}>
            {order.title}
          </Text>

          <Text style={[styles.orderMeta, { color: theme.textSecondary }]}>
            {order.date} • {order.items}{' '}
            <Text style={{ color: 'green' }}>• Delivered</Text>
          </Text>
        </View>

        <Text style={[styles.price, { color: theme.text }]}>
          ₹ {order.price.toFixed(2)}
        </Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.cancelBtn,
            {
              backgroundColor: theme.cardBackground,
              borderColor: isDarkMode ? '#444' : '#ddd'
            }
          ]}
          onPress={(e) => {
            e.stopPropagation();
            openRatingModal();
          }}
        >
          <Text style={[styles.cancelText, { color: theme.text }]}>
            Rate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.trackBtn,
            { backgroundColor: COLORS.primary }
          ]}
          onPress={(e) => {
            e.stopPropagation();
            navigateToOrderDetail(order);
          }}
        >
          <Text style={styles.trackText}>Re-Order</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PastOrders;

const styles = StyleSheet.create({
  orderCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 14,
    elevation: 3,
    padding: 14,
  },
  foodImg: { width: 50, height: 50, borderRadius: 8 },
  orderTopRow: { flexDirection: 'row', alignItems: 'center' },

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
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  cancelBtn: {
    flex: 1,
    marginRight: 6,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  trackBtn: {
    flex: 1,
    marginLeft: 6,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },

  cancelText: {
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  trackText: {
    color: '#fff',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});

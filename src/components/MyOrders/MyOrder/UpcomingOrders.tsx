import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import { ThemeContext } from '../../../theme/ThemeContext';

const UpcomingOrders = ({ order }) => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.orderCard,
        { backgroundColor: theme.cardBackground },
      ]}
    >
      {/* TOP ROW */}
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
            {order.date} • {order.items}
          </Text>
        </View>

        <Text style={[styles.price, { color: theme.text }]}>
          ₹ {order.price.toFixed(2)}
        </Text>
      </View>

      {/* ESTIMATE ROW */}
      <View style={styles.orderBottomRow}>
        <View>
          <Text style={[styles.estimateText, { color: theme.textSecondary }]}>
            Estimate Arrival
          </Text>
          <Text style={[styles.time, { color: theme.text }]}>
            {order.time}
          </Text>
        </View>

        <View>
          <Text style={[styles.nowText, { color: theme.textSecondary }]}>
            Now
          </Text>
          <Text style={[styles.statusText, { color: theme.text }]}>
            {order.status}
          </Text>
        </View>
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonRow}>
        {/* CANCEL BUTTON */}
        <TouchableOpacity
          style={[
            styles.cancelBtn,
            {
              backgroundColor: theme.cardBackground,
              borderColor: isDarkMode ? '#444' : '#ddd',
            },
          ]}
          onPress={() => navigation.navigate('CancelOrder')}
        >
          <Text style={[styles.cancelText, { color: theme.text }]}>
            CANCEL
          </Text>
        </TouchableOpacity>

        {/* TRACK ORDER */}
        <TouchableOpacity
          style={[
            styles.trackBtn,
            { backgroundColor: COLORS.primary },
          ]}
          onPress={() => navigation.navigate('TrackOrder')}
        >
          <Text style={styles.trackText}>TRACK ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpcomingOrders;

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

  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  estimateText: {
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  nowText: {
    fontSize: 12,
    textAlign: 'right',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  time: {
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  statusText: {
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

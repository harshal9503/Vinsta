import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../theme/colors'
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';


const PastOrders = ({ order, navigateToOrderDetail, openRatingModal }) => {
  return (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigateToOrderDetail(order)}
      activeOpacity={0.7}
    >
      <View style={styles.orderTopRow}>
        <Image source={order.img} style={styles.foodImg} />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderTitle}>{order.title}</Text>
          <Text style={styles.orderMeta}>
            {order.date} • {order.items}{' '}
            <Text style={{ color: 'green' }}>• Delivered</Text>
          </Text>
        </View>

        <Text style={styles.price}>₹ {order.price.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={(e) => {
            e.stopPropagation();
            openRatingModal();
          }}
        >
          <Text style={styles.cancelText}>Rate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.trackBtn}
          onPress={(e) => {
            e.stopPropagation();
            navigateToOrderDetail(order);
          }}
        >
          <Text style={styles.trackText}>Re-Order</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}


export default PastOrders

const styles = StyleSheet.create({
     orderCard: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 14,
        elevation: 3,
        padding: 14,
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
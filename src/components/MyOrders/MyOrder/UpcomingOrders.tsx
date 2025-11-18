import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const UpcomingOrders = ({ order }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderTopRow}>
        <Image source={order.img} style={styles.foodImg} />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderTitle}>{order.title}</Text>
          <Text style={styles.orderMeta}>
            {order.date} • {order.items}
          </Text>
        </View>

        <Text style={styles.price}>₹ {order.price.toFixed(2)}</Text>
      </View>

      <View style={styles.orderBottomRow}>
        <View>
          <Text style={styles.estimateText}>Estimate Arrival</Text>
          <Text style={styles.time}>{order.time}</Text>
        </View>
        <View>
          <Text style={styles.nowText}>Now</Text>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.navigate('CancelOrder')}
        >
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.trackBtn}
          onPress={() => navigation.navigate('TrackOrder')}
        >
          <Text style={styles.trackText}>TRACK ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UpcomingOrders

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

import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native'
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../../../theme/colors';

const { width, height } = Dimensions.get('window');

const PlanDetails = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  // Sample data
  const planData = {
    id: '265896',
    price: '50.00',
    day: 'Monday',
    currentOrder: {
      title: 'Masala Poha',
      date: '23 Sep, 9:00 am',
      ingredients: '3 ingredient',
      image: require('../../../../assets/poha.png'),
    },
    status: 'This order is already delivered',
    upcomingOrders: [
      {
        id: '265896',
        price: '50.00',
        day: 'Tuesday',
        title: 'Masala Idil',
        date: '24 Sep, 9:00 am',
        ingredients: '3 ingredient',
        image: require('../../../../assets/poha.png'),
      },
      {
        id: '265896',
        price: '50.00',
        day: 'Wednesday',
        title: 'Double Egg Ornlete',
        date: '24 Sep, 9:00 am',
        ingredients: '3 ingredient',
        image: require('../../../../assets/poha.png'),
      },
      {
        id: '265896',
        price: '50.00',
        day: 'Thursday',
        title: 'Masala Dosa',
        date: '24 Sep, 9:00 am',
        ingredients: '3 ingredient',
        image: require('../../../../assets/poha.png'),
      }
    ]
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]} // Icon color changes in dark mode
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Break-fast plan
        </Text>
        <View style={{ width: width * 0.06 }} />
      </View>




      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Year Month */}
        <View style={styles.yearMonthContainer}>
          <Image source={require('../../../../assets/calender.png')} style={{ width: wp('5%'), height: wp('5%') }} />
          <Text style={[styles.yearMonthText, { color: theme?.text ?? (theme?.mode === 'dark' ? '#FFFFFF' : '#000000') }]}>
            {planData.day}
          </Text>

        </View>
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: wp('3%'),
            marginBottom: hp('3%')
          }}
        >


          <View style={styles.currentOrderCard}>
            <View style={styles.orderImageContainer}>
              <Image source={planData.currentOrder.image} style={styles.orderImage} />
            </View>
            <View style={styles.orderInfo}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.primary }}>#{planData.id}</Text>
                <Text style={{ color: theme.text }}>
                  ₹ {planData.price}
                </Text>

              </View>
              <Text
                style={[
                  styles.orderTitle,
                  { color: theme.text }
                ]}
              >
                {planData.currentOrder.title}
              </Text>

              <Text style={styles.orderDetails}>
                {planData.currentOrder.date} - {planData.currentOrder.ingredients}
              </Text>
            </View>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.skipBtn}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{planData.status}</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Orders */}
        <View style={styles.upcomingContainer}>
          {planData.upcomingOrders.map((order, index) => (
            <View key={index}>
              {/* Day Header with Percentage */}
              <View style={styles.dayHeader}>
                <Image source={require('../../../../assets/calender.png')} style={{ width: wp('5%'), height: wp('5%') }} />
                <Text
                  style={[
                    styles.dayText,
                    { color: theme.mode === 'dark' ? '#FFFFFF' : theme.text }
                  ]}
                >
                  {order.day}
                </Text>

              </View>

              {/* Order Item */}
              <View
                style={{
                  backgroundColor: theme.cardBackground,
                  borderRadius: wp('3%'),
                  padding: wp('4%'),
                  marginBottom: hp('2%'),
                  borderColor: theme.borderColor,
                  borderWidth: 1
                }}
              >

                <View style={styles.upcomingOrderCard}>
                  <View style={styles.orderImageContainer}>
                    <Image source={order.image} style={styles.orderImage} />
                  </View>
                  <View style={styles.orderInfo}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: COLORS.primary }}>#{planData.id}</Text>
                      <Text style={{ color: theme.text }}>
                        ₹ {planData.price}
                      </Text>

                    </View>
                    <Text
                      style={[
                        styles.upcomingOrderTitle,
                        { color: theme.text }
                      ]}
                    >
                      {order.title}
                    </Text>

                    <Text style={styles.upcomingOrderDetails}>
                      {order.date} - {order.ingredients}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonSection}>
                  <TouchableOpacity style={[styles.skipBtn, { backgroundColor: '#fff' }]}>
                    <Text style={styles.skipText}>Skip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.changeBtn, { backgroundColor: COLORS.primary }]}>
                    <Text style={styles.changeText}>Change</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Separator Line */}
              {index < planData.upcomingOrders.length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))}
        </View>
        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('5%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#FFFFFF',
    paddingBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: wp('1.5%')
  },
  backIcon: {
    width: wp('6%'),
    height: wp('6%')
  },
  headerTitle: {
    fontSize: wp('5%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    textAlign: 'center',
    flex: 1
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: wp('5%'),
  },
  // Year Month Styles
  yearMonthContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    flexDirection: 'row',
    gap: wp('3%')
  },
  yearMonthText: {
    fontSize: wp('4.5%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  // Current Order Card Styles
  currentOrderCard: {
    flexDirection: 'row',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  orderImageContainer: {
    marginRight: wp('3%'),
  },
  orderImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('2%'),
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: wp('4.2%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: hp('0.5%'),
  },
  orderDetails: {
    fontSize: wp('3.5%'),
    color: '#666',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  buttonSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%')
  },
  skipBtn: {
    backgroundColor: '#EDEDED',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    width: '48%',
    borderRadius: wp('2%')
  },
  skipText: {
    fontSize: wp('3.8%'),
    color: '#9796A1',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    alignSelf: 'center',
  },
  changeBtn: {
    backgroundColor: '#C4C4C4',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    width: '48%',
    borderRadius: wp('2%')
  },
  changeText: {
    fontSize: wp('3.8%'),
    color: '#FFFFFF',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    alignSelf: 'center',
  },
  // Step Container
  stepContainer: {
    marginBottom: hp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: wp('4%'),
    paddingHorizontal: wp('3%')
  },
  stepLabel: {
    fontSize: wp('4%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: hp('1%'),
  },
  statusContainer: {
    borderRadius: wp('2%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: wp('3.5%'),
    color: '#9796A1',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  // Upcoming Orders Styles
  upcomingContainer: {
    marginBottom: hp('3%'),
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
    marginTop: hp('1%'),
    gap: wp('3%')
  },
  dayText: {
    fontSize: wp('4%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  percentageText: {
    fontSize: wp('3.5%'),
    color: '#4CAF50',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  upcomingOrderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%')
  },
  upcomingOrderTitle: {
    fontSize: wp('4%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: hp('0.5%'),
  },
  upcomingOrderDetails: {
    fontSize: wp('3.5%'),
    color: '#666',
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  separator: {
    height: 4,
    backgroundColor: '#F4F4F4',
    marginVertical: hp('2%'),
    width: '110%',
    alignSelf: 'center'
  },
  shipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  shipLabel: {
    fontSize: wp('4%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  changeButton: {
    backgroundColor: '#E87C23',
    borderRadius: wp('3%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
  },
  changeButtonText: {
    fontSize: wp('3.8%'),
    color: '#FFFFFF',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    textAlign: 'center',
  },
  bottomSpacing: {
    height: hp('5%'),
  },
})

export default PlanDetails
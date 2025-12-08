import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import UpcomingOrders from './UpcomingOrders';
import PastOrders from './PastOrders';
import { ThemeContext } from '../../../theme/ThemeContext';

const MyOrdersTab = ({
  orderTab,
  setOrderTab,
  upcomingOrders,
  pastOrders,
  navigation,
  navigateToOrderDetail,
  setRatingModal,
}) => {

  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <>
      {/* SUB TABS CONTAINER */}
      <View
        style={[
          styles.tabRowOuter,
          {
            // backgroundColor: isDarkMode ? '#333' : '#f8f0e8',
              backgroundColor: isDarkMode ? '#121212' : '#fff',
              borderColor:theme.borderColor
          },
        ]}
      >
        <View
          style={[
            styles.tabRow,
            {
              backgroundColor: isDarkMode ? '#121212' : '#fff',
              
            },
          ]}
        >
          {/* UPCOMING TAB */}
          <TouchableOpacity
            style={[
              styles.tabBtn,
              orderTab === 'Upcoming' && { backgroundColor: COLORS.primary },
            ]}
            onPress={() => setOrderTab('Upcoming')}
          >
            <Text
              style={[
                styles.tabText,
                { color: isDarkMode ? theme.text : theme.text },
                orderTab === 'Upcoming' && { color: '#fff' },
              ]}
            >
              Upcoming Order
            </Text>
          </TouchableOpacity>

          {/* PAST TAB */}
          <TouchableOpacity
            style={[
              styles.tabBtn,
              orderTab === 'Past' && { backgroundColor: COLORS.primary },
            ]}
            onPress={() => setOrderTab('Past')}
          >
            <Text
              style={[
                styles.tabText,
                { color: isDarkMode ? theme.text : theme.text },
                orderTab === 'Past' && { color: '#fff' },
              ]}
            >
              Past Orders
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ORDERS LIST */}
      {orderTab === 'Upcoming'
        ? upcomingOrders.map((o) => <UpcomingOrders key={o.id} order={o} />)
        : pastOrders.map((o) => (
            <PastOrders
              key={o.id}
              order={o}
              navigateToOrderDetail={navigateToOrderDetail}
              openRatingModal={() => setRatingModal(true)}
            />
          ))}
    </>
  );
};

export default MyOrdersTab;

const styles = StyleSheet.create({
  tabRowOuter: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 10,
    marginTop: 20,
    padding: 3,
  },
  tabRow: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  tabText: {
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
});

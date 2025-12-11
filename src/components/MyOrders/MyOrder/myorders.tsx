import React, { useState, useContext } from 'react';
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
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import MyOrdersTab from './MyOrdersTab';
import MySubscription from './MySubscription';
import RatingModal from './RatingModal';
import { ThemeContext } from '../../../theme/ThemeContext';   // ✅ ADD THIS

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#E67E22',
};

const MyOrders = () => {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);   // ✅ DARK MODE THEME CONTEXT

  const [mainTab, setMainTab] = useState<'Orders' | 'Subscription'>('Orders');
  const [orderTab, setOrderTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [subTab, setSubTab] = useState<'Active' | 'Previous'>('Active');
  const [ratingModal, setRatingModal] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const upcomingOrders = [
    {
      id: '#265896',
      title: 'Masala Poha',
      price: 50.0,
      date: '22 Sep, 9.00',
      items: '3 Items',
      status: 'Food on the way',
      time: '25 min',
      img: require('../../../assets/poha.png'),

    },
  ];

  const pastOrders = [
    {
      id: '#265896',
      title: 'Masala Poha',
      price: 50.0,
      date: '22 Sep, 9.00',
      items: '3 Items',
      status: 'Delivered',
      img: require('../../../assets/poha.png'),

    },
    {
      id: '#265897',
      title: 'Masala Poha',
      price: 50.0,
      date: '22 Sep, 9.00',
      items: '3 Items',
      status: 'Delivered',
      img: require('../../../assets/poha.png'),


    },
  ];

  const activeSubs = [
    {
      id: 1,
      title: 'Weekly Plan',
      restaurant: 'Bistro Excellence',
      price: '₹400 / week',
      duration: '22 - 29 Sep 2025',
      daysLeft: "6 Day's left",
      img: require('../../../assets/thali.png'),
      tintColor: theme.text,
    },
    {
      id: 2,
      title: 'Monthly Plan',
      restaurant: 'Bistro Excellence',
      price: '₹4900 / month',
      duration: '22 Sep - 21 Oct 2025',
      daysLeft: "21 Day's left",
      img: require('../../../assets/thali.png'),
      tintColor: theme.text,
    },
  ];

  const previousSubs = [
    {
      id: 1,
      title: 'Weekly Plan',
      restaurant: 'Bistro Excellence',
      price: '₹400 / week',
      duration: '22 - 29 Sep 2025',
      daysLeft: "0 Day's left",
      img: require('../../../assets/poha.png'),
      tintColor: theme.text,
    },
  ];

  const handleStarPress = (index: number) => setSelectedStars(index);
  const handleSubmitReview = () => {
    setRatingModal(false);
    setSelectedStars(0);
    setReviewText('');
  };

  const navigateToOrderDetail = (order: any) => {
    navigation.navigate('OrderDetail', {
      orderId: order.id,
      orderTitle: order.title,
      orderPrice: order.price,
      orderDate: order.date,
      orderItems: order.items,
      orderStatus: order.status,
      orderImage: order.img,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>  {/* ✅ DARK BG */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}   // ✅ DARK STATUS BAR
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}    // ✅ DARK ICON
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>My Orders</Text>

        <View style={{ width: 25 }} />
      </View>

      {/* MAIN TABS */}
      <View style={styles.mainTabs}>
        <TouchableOpacity style={styles.mainTab} onPress={() => setMainTab('Orders')}>
          <Text
            style={[
              styles.mainTabText,
              { color: mainTab === 'Orders' ? COLORS.primary : theme.text },
              // ✅ DARK TEXT
            ]}
          >
            My Order's
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainTab} onPress={() => setMainTab('Subscription')}>
          <Text
            style={[
              styles.mainTabText,
              { color: mainTab === 'Subscription' ? COLORS.primary : theme.text },
            ]}
          >
            My Subscription's
          </Text>
        </TouchableOpacity>
      </View>

      {/* SLIDER */}
      <View style={[styles.slider, { backgroundColor: theme.border }]}>
        <View
          style={[
            styles.sliderIndicator,
            {
              left: mainTab === 'Orders' ? 0 : width / 2,
              backgroundColor: COLORS.primary,
            },
          ]}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {mainTab === 'Orders' ? (
          <MyOrdersTab
            orderTab={orderTab}
            setOrderTab={setOrderTab}
            upcomingOrders={upcomingOrders}
            pastOrders={pastOrders}
            navigation={navigation}
            navigateToOrderDetail={navigateToOrderDetail}
            setRatingModal={setRatingModal}
          />
        ) : (
          <MySubscription
            subTab={subTab}
            setSubTab={setSubTab}
            activeSubs={activeSubs}
            previousSubs={previousSubs}
            setRatingModal={setRatingModal}
          />
        )}
      </ScrollView>

      <RatingModal
        visible={ratingModal}
        onClose={() => setRatingModal(false)}
        selectedStars={selectedStars}
        onStarPress={handleStarPress}
        reviewText={reviewText}
        setReviewText={setReviewText}
        onSubmit={handleSubmitReview}
      />
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingHorizontal: 20,
  },

  backIcon: { width: 22, height: 22 },

  headerTitle: {
    fontSize: 18,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  mainTab: { flex: 1 },

  mainTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  mainTabText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  slider: {
    height: 3,
    width: '100%',
    marginTop: 10,
  },

  sliderIndicator: {
    position: 'absolute',
    top: 0,
    width: width / 2,
    height: 3,
  },
});

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
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import MyOrdersTab from './MyOrdersTab';
import MySubscription from './MySubscription';
import RatingModal from './RatingModal';

const { width, height } = Dimensions.get('window');
const COLORS = {
  primary: '#E67E22',
  gray: '#999',
  lightGray: '#eee',
};

const MyOrders = () => {
  const navigation = useNavigation<any>();
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
    },
    {
      id: 2,
      title: 'Monthly Plan',
      restaurant: 'Bistro Excellence',
      price: '₹4900 / month',
      duration: '22 Sep - 21 Oct 2025',
      daysLeft: "21 Day's left",
      img: require('../../../assets/thali.png'),
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
    },
  ];

  const handleStarPress = (index: number) => setSelectedStars(index);
  const handleSubmitReview = () => {
    setRatingModal(false);
    setSelectedStars(0);
    setReviewText('');
  };

  // Navigate to OrderDetail with order data
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 25 }} />
      </View>

      {/* MAIN TAB SWITCH */}
      <View style={styles.mainTabs}>
        <TouchableOpacity
          style={styles.mainTab}
          onPress={() => setMainTab('Orders')}
        >
          <Text
            style={[
              styles.mainTabText,
              mainTab === 'Orders' && styles.mainTabTextActive,
            ]}
          >
            My Order's
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainTab}
          onPress={() => setMainTab('Subscription')}
        >
          <Text
            style={[
              styles.mainTabText,
              mainTab === 'Subscription' && styles.mainTabTextActive,
            ]}
          >
            My Subscription's
          </Text>
        </TouchableOpacity>
      </View>

      {/* SLIDER BAR FULL WIDTH */}
      <View style={styles.slider}>
        <View
          style={[
            styles.sliderIndicator,
            {
              left: mainTab === 'Orders' ? 0 : width / 2,
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
      {/* RATING MODAL */}
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
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingHorizontal: 20,
  },
  backIcon: { width: 22, height: 22, tintColor: '#000' },
  headerTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  mainTab: { flex: 1 },
  mainTabs: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  mainTabText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  mainTabTextActive: { color: COLORS.primary },

  slider: {
    height: 3,
    width: '100%',
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  sliderIndicator: {
    position: 'absolute',
    top: 0,
    width: width / 2,
    height: 3,
    backgroundColor: COLORS.primary,
  },
});
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
      img: require('../../assets/poha.png'),
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
      img: require('../../assets/poha.png'),
    },
    {
      id: '#265897',
      title: 'Masala Poha',
      price: 50.0,
      date: '22 Sep, 9.00',
      items: '3 Items',
      status: 'Delivered',
      img: require('../../assets/poha.png'),
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
      img: require('../../assets/thali.png'),
    },
    {
      id: 2,
      title: 'Monthly Plan',
      restaurant: 'Bistro Excellence',
      price: '₹4900 / month',
      duration: '22 Sep - 21 Oct 2025',
      daysLeft: "21 Day's left",
      img: require('../../assets/thali.png'),
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
      img: require('../../assets/poha.png'),
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
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
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
          <>
            {/* SUB TABS CONTAINER */}
            <View style={styles.tabRowOuter}>
              <View style={styles.tabRow}>
                <TouchableOpacity
                  style={[
                    styles.tabBtn,
                    orderTab === 'Upcoming' && styles.activeTab,
                    orderTab === 'Upcoming' && styles.activeTabSides,
                  ]}
                  onPress={() => setOrderTab('Upcoming')}
                >
                  <Text
                    style={[
                      styles.tabText,
                      orderTab === 'Upcoming' && styles.activeTabText,
                    ]}
                  >
                    Upcoming Order
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabBtn,
                    orderTab === 'Past' && styles.activeTab,
                    orderTab === 'Past' && styles.activeTabSides,
                  ]}
                  onPress={() => setOrderTab('Past')}
                >
                  <Text
                    style={[
                      styles.tabText,
                      orderTab === 'Past' && styles.activeTabText,
                    ]}
                  >
                    Past Orders
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ORDERS */}
            {orderTab === 'Upcoming'
              ? upcomingOrders.map((o) => (
                  <View key={o.id} style={styles.orderCard}>
                    <View style={styles.orderTopRow}>
                      <Image source={o.img} style={styles.foodImg} />
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.orderId}>{o.id}</Text>
                        <Text style={styles.orderTitle}>{o.title}</Text>
                        <Text style={styles.orderMeta}>
                          {o.date} • {o.items}
                        </Text>
                      </View>
                      <Text style={styles.price}>₹ {o.price.toFixed(2)}</Text>
                    </View>

                    <View style={styles.orderBottomRow}>
                      <View>
                        <Text style={styles.estimateText}>Estimate Arrival</Text>
                        <Text style={styles.time}>{o.time}</Text>
                      </View>
                      <View>
                        <Text style={styles.nowText}>Now</Text>
                        <Text style={styles.statusText}>{o.status}</Text>
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
                ))
              : pastOrders.map((o) => (
                  <TouchableOpacity 
                    key={o.id} 
                    style={styles.orderCard}
                    onPress={() => navigateToOrderDetail(o)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.orderTopRow}>
                      <Image source={o.img} style={styles.foodImg} />
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.orderId}>{o.id}</Text>
                        <Text style={styles.orderTitle}>{o.title}</Text>
                        <Text style={styles.orderMeta}>
                          {o.date} • {o.items}{' '}
                          <Text style={{ color: 'green' }}>• Delivered</Text>
                        </Text>
                      </View>
                      <Text style={styles.price}>₹ {o.price.toFixed(2)}</Text>
                    </View>

                    <View style={styles.buttonRow}>
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={(e) => {
                          e.stopPropagation();
                          setRatingModal(true);
                        }}
                      >
                        <Text style={styles.cancelText}>Rate</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.trackBtn}
                        onPress={(e) => {
                          e.stopPropagation();
                          navigateToOrderDetail(o);
                        }}
                      >
                        <Text style={styles.trackText}>Re-Order</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
          </>
        ) : (
          <>
            {/* SUBSCRIPTION SECTION */}
            <View style={styles.tabRowOuter}>
              <View style={styles.tabRow}>
                <TouchableOpacity
                  style={[
                    styles.tabBtn,
                    subTab === 'Active' && styles.activeTab,
                    subTab === 'Active' && styles.activeTabSides,
                  ]}
                  onPress={() => setSubTab('Active')}
                >
                  <Text
                    style={[
                      styles.tabText,
                      subTab === 'Active' && styles.activeTabText,
                    ]}
                  >
                    Active
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabBtn,
                    subTab === 'Previous' && styles.activeTab,
                    subTab === 'Previous' && styles.activeTabSides,
                  ]}
                  onPress={() => setSubTab('Previous')}
                >
                  <Text
                    style={[
                      styles.tabText,
                      subTab === 'Previous' && styles.activeTabText,
                    ]}
                  >
                    Previous
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.activeHeader}>
              <Image
                source={require('../../assets/p1.png')}
                style={styles.plusIcon}
              />
              <Text style={styles.activeTitle}>
                {subTab === 'Active'
                  ? `My active subscription's`
                  : `Previous subscription's`}
              </Text>
            </View>

            {(subTab === 'Active' ? activeSubs : previousSubs).map((s) => (
              <View key={s.id} style={styles.subCard}>
                <View style={styles.subTopRow}>
                  <Image source={s.img} style={styles.subImg} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.daysLeft}>{s.daysLeft}</Text>
                    <Text style={styles.subTitle}>{s.title}</Text>
                    <Text style={styles.subMeta}>{s.restaurant}</Text>
                    <Text style={styles.subPrice}>{s.price}</Text>
                    <Text style={styles.subDuration}>{s.duration}</Text>
                  </View>
                </View>

                <View style={styles.mealRow}>
                  {['Breakfast', 'Lunch', 'Dinner'].map((m, idx) => (
                    <View style={styles.mealGroup} key={m}>
                      <Image
                        source={require('../../assets/tick.png')}
                        style={styles.tick}
                      />
                      <Text style={styles.mealText}>{m}</Text>
                      {idx < 2 && (
                        <Image
                          source={require('../../assets/rightarrow.png')}
                          style={styles.arrowIcon}
                        />
                      )}
                    </View>
                  ))}
                </View>

                {subTab === 'Previous' && (
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={() => setRatingModal(true)}
                    >
                      <Text style={styles.cancelText}>Rate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.trackBtn}>
                      <Text style={styles.trackText}>Re subscribe</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}

            {subTab === 'Active' && (
              <View style={styles.bottomNoteRow}>
                <Text style={styles.cancelNote}>
                  Subscription plan cannot be cancelled
                </Text>
                <TouchableOpacity>
                  <Text style={styles.addText}>+ Add More</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* RATING MODAL */}
      <Modal visible={ratingModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setRatingModal(false)}>
                <Image
                  source={require('../../assets/back.png')}
                  style={styles.modalBackIcon}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Leave a Review</Text>
            </View>

            <View style={styles.reviewCard}>
              <Image
                source={require('../../assets/poha.png')}
                style={styles.foodImg}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.orderId}>#265896</Text>
                <Text style={styles.orderTitle}>Masala Poha</Text>
                <Text style={styles.orderMeta}>
                  22 Sep, 9.00 • 3 Items{' '}
                  <Text style={{ color: 'green' }}>Delivered</Text>
                </Text>
              </View>
              <Text style={styles.price}>₹ 50.00</Text>
            </View>

            <Text style={styles.howText}>How is your order?</Text>
            <Text style={styles.subHowText}>
              Please give your rating &amp; also your review...
            </Text>

            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                >
                  <Image
                    source={
                      selectedStars >= star
                        ? require('../../assets/starfill.png')
                        : require('../../assets/star1.png')
                    }
                    style={styles.starRatingIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.inputBox}
              placeholder="Write your review..."
              value={reviewText}
              onChangeText={setReviewText}
              placeholderTextColor={'#999'}
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setRatingModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSubmitBtn}
                onPress={handleSubmitReview}
              >
                <Text style={styles.trackText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  mainTab: { flex: 1 },
  mainTabs: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  mainTabText: { fontSize: 16, color: '#aaa', fontWeight: '600', textAlign: 'center' },
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

  tabRowOuter: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: 'transparent',
    borderRadius: 10,
    elevation: 0,
    marginTop: 20,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    elevation: 0,
  },
  activeTabText: { color: '#fff' },
  activeTabSides: {
    borderRadius: 10,
  },
  tabText: { fontSize: 14, fontWeight: '600', color: '#000' },

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
  orderId: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  orderTitle: { fontSize: 15, fontWeight: '700', color: '#000' },
  orderMeta: { color: '#666', fontSize: 12 },
  price: { fontSize: 15, fontWeight: '600', color: '#000' },

  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  estimateText: { fontSize: 12, color: '#666' },
  nowText: { fontSize: 12, color: '#666', textAlign: 'right' },
  time: { fontSize: 14, fontWeight: '700', color: '#000' },
  statusText: { color: '#000', fontSize: 13, textAlign: 'right' },

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
  cancelText: { color: '#000', fontWeight: '600' },
  trackText: { color: '#fff', fontWeight: '600' },

  activeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  plusIcon: { width: 20, height: 20 },
  activeTitle: { marginLeft: 8, fontSize: 16, fontWeight: '700', color: '#000' },

  subCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 14,
    elevation: 3,
    padding: 14,
  },
  subTopRow: { flexDirection: 'row', alignItems: 'center' },
  subImg: { width: 70, height: 70, borderRadius: 10 },
  daysLeft: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  subTitle: { fontSize: 15, fontWeight: '700', color: '#000' },
  subMeta: { color: '#666', fontSize: 12 },
  subPrice: { color: '#000', fontWeight: '600', fontSize: 13 },
  subDuration: { fontSize: 12, color: '#888' },

  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  mealGroup: { flexDirection: 'row', alignItems: 'center' },
  tick: { width: 16, height: 16, marginRight: 4 },
  mealText: { fontSize: 13, color: '#E87C23', fontWeight: '600' },
  arrowIcon: { width: 5, height: 8, marginLeft: 6 },

  bottomNoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  cancelNote: { color: '#EA001B', fontSize: 13 },
  addText: { color: '#259E29', fontWeight: '700', fontSize: 13 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center' },
  modalBackIcon: { width: 20, height: 20, tintColor: '#000' },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginLeft: 12,
    textAlign: 'center',
    flex: 1,
  },

  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginTop: 16,
    padding: 10,
    borderRadius: 10,
  },
  howText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  subHowText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },

  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  starRatingIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 6,
    resizeMode: 'contain',
  },

  inputBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 10,
    marginTop: 16,
    height: 80,
    textAlignVertical: 'top',
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  modalCancelBtn: {
    flex: 1,
    marginRight: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalSubmitBtn: {
    flex: 1,
    marginLeft: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImg: { width: '100%', height: 180, resizeMode: 'cover' },
  cardContent: { padding: 14 },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  starIconSmall: { width: 12, height: 12, tintColor: '#fff', marginRight: 6 },
  ratingText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  title: { fontSize: 16, fontWeight: '700', color: '#000' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  locIcon: { width: 12, height: 12, marginRight: 6, resizeMode: 'contain' },
  location: { fontSize: 13, color: '#555', flex: 1 },
  heartBtn: {
    backgroundColor: '#777',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  heartIcon: { width: 14, height: 14, resizeMode: 'contain' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6 },
  subInfo: { color: '#777', fontSize: 13 },
  metaIcon: { width: 13, height: 13, marginHorizontal: 4, resizeMode: 'contain' },
  metaText: { color: '#555', fontSize: 12 },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 15,
    marginTop: 60,
  },
});

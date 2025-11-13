import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';
import font from '../../assets/fonts';


const { width, height } = Dimensions.get('window');
const MAP_HEIGHT = height * 0.32;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

const ICONS = {
  location: require('../../assets/location.png'),
  drop: require('../../assets/drop.png'),
  boy: require('../../assets/boy.png'),
  tick: require('../../assets/tick.png'),
  '1st': require('../../assets/1st.png'),
  '2nd': require('../../assets/2nd.png'),
  '3rd': require('../../assets/3rd.png'),
  '4th': require('../../assets/4th.png'),
};

const deliverySteps = [
  { step: '1st', showTick: true },
  { step: '2nd', showTick: true },
  { step: '3rd', showTick: false },
  { step: '4th', showTick: false },
];

const TrackOrder = () => {
  const navigation = useNavigation();

  // Responsive calculations
  const headerTop = STATUS_BAR_HEIGHT + 10;
  const markerSize = width * 0.08;
  const boyIconSize = width * 0.15;
  const lineWidth = width * 0.015;
  const horizontalLineLength = width * 0.18;

  const handleCall = () => {
    const phoneNumber = '+911234567890';
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      console.log('Error making phone call:', err);
    });
  };

  const handleMessage = () => {
    navigation.navigate('chat');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

      {/* Fixed Map Area with proper status bar handling */}
      <View style={styles.fixedMapArea}>
        <View style={styles.statusBarOverlay} />
        <Image source={require('../../assets/mapbg.png')} style={styles.mapBg} />

        {/* HEADER */}
        <View style={[styles.header, { top: headerTop }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Track Order</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* ZIG-ZAG PROGRESS LINE */}
        <View style={styles.absFill}>
          <View
            style={[
              styles.zigzagLine,
              {
                top: MAP_HEIGHT * 0.3,
                left: width / 2 - lineWidth / 2,
                height: MAP_HEIGHT * 0.26,
                width: lineWidth,
              },
            ]}
          />
          <View
            style={[
              styles.zigzagLine,
              {
                top: MAP_HEIGHT * 0.56,
                left: width / 2 - horizontalLineLength,
                height: lineWidth,
                width: horizontalLineLength,
              },
            ]}
          />
          <View
            style={[
              styles.zigzagLine,
              {
                top: MAP_HEIGHT * 0.56,
                left: width / 2 - horizontalLineLength,
                height: MAP_HEIGHT * 0.26,
                width: lineWidth,
              },
            ]}
          />
        </View>

        {/* ICONS ON LINE */}
        <View style={[styles.absFill, { alignItems: 'center' }]}>
          {/* Pickup */}
          <View style={[
            styles.mapMarkerContainer,
            { top: MAP_HEIGHT * 0.26, left: width / 2 - markerSize / 2 }
          ]}>
            <Image
              source={ICONS.location}
              style={[
                styles.mapMarker,
                {
                  width: markerSize,
                  height: markerSize,
                  tintColor: '#E63946',
                },
              ]}
            />
          </View>
          {/* Boy */}
          <Image
            source={ICONS.boy}
            style={[
              styles.boyIcon,
              {
                top: MAP_HEIGHT * 0.48,
                left: width / 2 - boyIconSize / 2,
                width: boyIconSize,
                height: boyIconSize,
              },
            ]}
          />
          {/* Drop */}
          <View
            style={[
              styles.mapMarkerContainer,
              {
                top: MAP_HEIGHT * 0.75,
                left: width / 2 - horizontalLineLength - markerSize / 2,
              },
            ]}
          >
            <Image
              source={ICONS.drop}
              style={[
                styles.mapMarkerDrop,
                {
                  width: markerSize * 0.8,
                  height: markerSize * 0.8,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* SCROLLABLE SECTION (Starts below fixed MAP) */}
      <ScrollView
        style={styles.scrollSection}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ORDER CARD */}
        <View style={styles.orderCard}>
          <Image source={require('../../assets/poha.png')} style={styles.foodImg} />
          <View style={styles.orderInfoContainer}>
            <View style={styles.rowBetween}>
              <Text style={styles.orderId}>#265896</Text>
              <Text style={styles.price}>₹ 50.00</Text>
            </View>
            <Text style={styles.foodName}>Masala Poha</Text>
            <Text style={styles.orderInfo}>22 Sep, 9.00 • 3 Items</Text>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.estimateLabel}>Estimate Arrival</Text>
                <Text style={styles.estimateTime}>25 min</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.estimateLabel}>Now</Text>
                <Text style={styles.foodStatus}>Food on the way</Text>
              </View>
            </View>
          </View>
        </View>

        {/* DELIVERY STATUS ICONS */}
        <View style={styles.deliveryIconsRow}>
          {deliverySteps.map((item, idx) => (
            <React.Fragment key={item.step}>
              <View style={styles.deliveryStepContainer}>
                <Image
                  source={ICONS[item.step]}
                  style={[
                    styles.deliveryIcon,
                    {
                      tintColor: item.showTick ? '#259E29' : '#9E9E9E',
                    },
                  ]}
                />
                {item.showTick ? (
                  <View style={styles.tickWrap}>
                    <Image source={ICONS.tick} style={styles.tickIcon} />
                  </View>
                ) : (
                  <View style={styles.tickPlaceholder} />
                )}
              </View>
              {/* Show connector line except after the last icon */}
              {idx !== deliverySteps.length - 1 && <View style={styles.connectorLine} />}
            </React.Fragment>
          ))}
        </View>

        <Text style={styles.deliveryText}>Packet In Delivery</Text>

        {/* ORDER STATUS DETAILS */}
        <View style={styles.statusSection}>
          <Text style={styles.statusTitle}>Order Status Details</Text>
          {[
            { title: 'Order placed', time: '10.40 a.m.', date: '12 Aug', done: true },
            { title: 'Restaurant confirmed', time: '10.42 a.m.', date: '12 Aug', done: true },
            { title: 'Preparing food', time: '10.45 a.m.', date: '12 Aug', done: false },
            { title: 'Order Picked', time: '10.50 a.m.', date: '12 Aug', done: false },
            { title: 'Out for delivery', time: '10.52 a.m.', date: '12 Aug', done: false },
          ].map((item, index) => (
            <View key={index} style={styles.statusRow}>
              <View style={styles.statusLeft}>
                <View style={[styles.circle, { backgroundColor: item.done ? '#259E29' : '#C7C7C7' }]} />
                {index < 4 && (
                  <View
                    style={[
                      styles.dottedLine,
                      { borderColor: item.done ? '#259E29' : '#C7C7C7' },
                    ]}
                  />
                )}
              </View>
              <View style={styles.statusContent}>
                <Text style={styles.statusText}>{item.title}</Text>
                <Text style={styles.statusTime}>{item.time}</Text>
              </View>
              <Text style={styles.statusDate}>{item.date}</Text>
            </View>
          ))}
        </View>

        {/* DELIVERY AGENT SECTION */}
        <View style={styles.agentSection}>
          <Image source={require('../../assets/user.png')} style={styles.agentImg} />
          <View style={styles.agentInfo}>
            <Text style={styles.agentId}>ID: DKS-501F9</Text>
            <Text style={styles.agentName}>Mann Sharma</Text>
          </View>
          <View style={styles.actionBtns}>
            <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
              <Image source={require('../../assets/call.png')} style={styles.callIcon} />
              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.msgBtn} onPress={handleMessage}>
              <Image source={require('../../assets/message.png')} style={styles.msgIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  absFill: { ...StyleSheet.absoluteFillObject, zIndex: 2 },
  fixedMapArea: {
    width: '100%',
    height: MAP_HEIGHT,
    position: 'relative',
    backgroundColor: '#eee',
    zIndex: 9,
    overflow: 'hidden',
  },
  statusBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 11,
  },
  mapBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  header: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  backIcon: { width: 22, height: 22, tintColor: '#000' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' ,fontFamily :'Figtree-Bold'},

  // ZIG-ZAG LINE
  zigzagLine: {
    position: 'absolute',
    backgroundColor: '#E63946',
    borderRadius: 2,
    zIndex: 5,
  },

  // Map Markers
  mapMarkerContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  mapMarker: {
    resizeMode: 'contain',
  },
  mapMarkerDrop: {
    resizeMode: 'contain',
  },
  boyIcon: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#fff',
    zIndex: 11,
    borderWidth: 2,
    borderColor: '#E63946',
    resizeMode: 'contain',
  },

  // Scroll area
  scrollSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    zIndex: 8,
  },
  scrollContent: {
    paddingBottom: 50,
    paddingTop: 10,
  },

  orderCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  orderInfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  foodImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  orderId: {
    color: '#E63946',
    fontWeight: '500',
    fontSize: 13,
    fontFamily : 'Figtree-Medium'
  },
  price: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
    fontFamily : 'Figtree-Bold'
  },
  foodName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    marginTop: 2,
    fontFamily : 'Figtree-SemiBold'
  },
  orderInfo: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
    fontFamily : 'Figtree-Medium',
    fontWeight : '500'
  },
  estimateLabel: {
    fontSize: 12,
    color: '#777',
    fontFamily : 'Figtree-Medium',
    fontWeight : '500'
  },
  estimateTime: {
    color: '#259E29',
   
    fontSize: 14,
    fontFamily : 'Figtree-SemiBold',
    fontWeight : '600'
  },
  foodStatus: {
    fontSize: 13,
    color: '#000',
    fontFamily : 'Figtree-SemiBold',
    fontWeight : '600'
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // DELIVERY STATUS ICONS ROW
  deliveryIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginHorizontal: 22,
  },
  deliveryStepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  tickWrap: {
    marginTop: 5,
    width: 22,
    height: 22,
    backgroundColor: '#259E29',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2,
    elevation: 2,
  },
  tickPlaceholder: {
    marginTop: 5,
    width: 22,
    height: 22,
  },
  tickIcon: {
    width: 12,
    height: 12,
    tintColor: '#fff',
  },
  connectorLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 8,
  },

  deliveryText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    marginTop: 10,
    fontSize: 14,
    fontFamily : 'Figtree-SemiBold'
  },

  statusSection: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
    fontFamily : 'Figtree-SemiBold'
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  statusLeft: {
    alignItems: 'center',
    marginRight: 15,
    width: 16,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  dottedLine: {
    height: 28,
    borderLeftWidth: 2,
    borderStyle: 'dotted',
    marginTop: 2,
  },
  statusContent: { flex: 1 },
  statusText: { color: '#000', fontWeight: '600', fontSize: 14 ,fontFamily : 'Figtree-SemiBold' },
  statusTime: { color: '#777', fontSize: 12,fontFamily : 'Figtree-Medium',fontWeight : '500' },
  statusDate: { color: '#777', fontSize: 12,fontFamily : 'Figtree-Medium',fontWeight : '500' },

  agentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
  },
  agentInfo: {
    flex: 1,
    marginLeft: 10,
  },
  agentImg: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  agentId: { fontSize: 12, color: '#777' ,fontFamily : 'Figtree-Regular',fontWeight : '400'},
  agentName: { fontSize: 15, color: '#000',fontFamily : 'Figtree-SemiBold',fontWeight : '600' },

  actionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  callIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
    marginRight: 5,
  },
  callText: {
    color: '#fff',
    fontSize: 13,
    fontFamily : 'Figtree-SemiBold',fontWeight : '600'
  },
  msgBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.primary,
  },
});

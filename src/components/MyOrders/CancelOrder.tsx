import React, { useState, useRef, useEffect, useContext } from 'react';
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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../theme/ThemeContext';
import font from '../../assets/fonts';

const { width, height } = Dimensions.get('window');
const MAP_HEIGHT = height * 0.32;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;
const CIRCLE_SIZE = Math.min(74, width * 0.18);
const PRIMARY_COLOR = '#FF8303';

const IMAGES = {
  mapbg: require('../../assets/mapbg.png'),
  location: require('../../assets/location.png'),
  greendrop: require('../../assets/greendrop.png'),
  boy: require('../../assets/boy.png'),
  c1: require('../../assets/c1.png'),
  bikee: require('../../assets/bike2.png'),
  o1: require('../../assets/o1.png'),
  h1: require('../../assets/h1.png'),
  h2: require('../../assets/h2.png'),
  tick: require('../../assets/tick.png'),
  back: require('../../assets/back.png'),
};

const CancelOrder = () => {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useContext(ThemeContext);

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showCanceledPopup, setShowCanceledPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(59);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handlePressCancel = () => setShowCancelPopup(true);

  const handleConfirmCancel = () => {
    setShowCancelPopup(false);
    setShowCanceledPopup(true);
    setTimeout(() => {
      setShowCanceledPopup(false);
      navigation.goBack();
    }, 1500);
  };

  const handleKeepOrder = () => navigation.goBack();

  const renderTime = () => {
    const mm = `0${Math.floor(timeLeft / 60)}`;
    const ss = timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60;
    return `${mm}:${ss}`;
  };

  const markerSize = Math.min(34, width * 0.085);
  const startX = width * 0.5 - markerSize / 2;
  const startY = MAP_HEIGHT * 0.32;
  const verticalLength = MAP_HEIGHT * 0.18;
  const horizontalLength = width * 0.27;
  const vertical1Y = startY + verticalLength;
  const horizontalRightX = startX + horizontalLength;
  const vertical2Y = vertical1Y + verticalLength;
  const leftY = vertical2Y;
  const boyX = startX + horizontalLength / 2;
  const boyY = vertical1Y + verticalLength / 2;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
      />

      <View style={[styles.fixedMapArea, { height: MAP_HEIGHT }]}>
        <Image source={IMAGES.mapbg} style={styles.mapBg} />
        <View style={[styles.header, { top: STATUS_BAR_HEIGHT + 6 }]}>
          <TouchableOpacity onPress={navigation.goBack} style={styles.backBtn}>
            <Image
              source={IMAGES.back}
              style={[styles.backIcon, { tintColor: theme.text }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Cancel Order</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.absFill}>
          <Image
            source={IMAGES.location}
            style={[
              styles.markerIcon,
              {
                width: markerSize,
                height: markerSize,
                position: 'absolute',
                top: startY,
                left: startX,
                tintColor: '#259E29',
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: startY + markerSize / 2,
                left: startX + markerSize / 2 - 2,
                height: verticalLength,
                width: 4,
                backgroundColor: PRIMARY_COLOR,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: vertical1Y + markerSize / 2,
                left: startX + markerSize / 2,
                height: 4,
                width: horizontalLength,
                backgroundColor: PRIMARY_COLOR,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: vertical1Y + markerSize / 2,
                left: horizontalRightX + markerSize / 2 - 2,
                height: verticalLength,
                width: 4,
                backgroundColor: PRIMARY_COLOR,
              },
            ]}
          />
          <View
            style={[
              styles.routeLine,
              {
                position: 'absolute',
                top: vertical2Y + markerSize / 2,
                left: startX + markerSize / 2,
                height: 4,
                width: horizontalLength,
                backgroundColor: PRIMARY_COLOR,
              },
            ]}
          />
          <Image
            source={IMAGES.boy}
            style={[
              styles.boyIcon,
              {
                width: Math.min(44, width * 0.12),
                height: Math.min(44, width * 0.12),
                borderRadius: Math.min(22, (width * 0.12) / 2),
                position: 'absolute',
                top: boyY,
                left: boyX,
                backgroundColor: theme.cardBackground,
                borderColor: PRIMARY_COLOR,
              },
            ]}
          />
          <Image
            source={IMAGES.greendrop}
            style={[
              styles.markerIcon,
              {
                width: markerSize,
                height: markerSize,
                position: 'absolute',
                top: leftY,
                left: startX,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.timerCircleWrap}>
        <View
          style={[
            styles.circleBorder,
            {
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              borderColor: PRIMARY_COLOR,
              backgroundColor: theme.cardBackground,
            },
          ]}
        >
          <Image
  source={IMAGES.c1}
  style={[
    styles.clockIcon,
    { 
      width: CIRCLE_SIZE * 0.52, 
      height: CIRCLE_SIZE * 0.52,
      tintColor: theme.text 
    },
  ]}
/>

        </View>
        <Text style={[styles.timeLeftText, { color: theme.text }]}>{renderTime()}</Text>
        <Text style={[styles.timeSubtext, { color: theme.textSecondary }]}>Time left</Text>
      </View>

      <View style={[styles.horizontalLine, { borderBottomColor: isDarkMode ? '#444' : '#e3e3e3' }]} />

      <ScrollView
        style={[styles.scrollArea, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.orderPreparingSimple}>
          <Image
            source={IMAGES.bikee}
            style={[
              styles.bikeImg,
              { width: Math.min(38, width * 0.1), height: Math.min(38, width * 0.1) },
            ]}
          />
          <Text style={[styles.orderPrepText, { color: theme.text }]}>Your order is preparing</Text>
        </View>

        <View style={[styles.blockCardFullWidth, { backgroundColor: theme.cardBackground, borderColor: isDarkMode ? '#555' : '#e3e3e3' }]}>
          <View style={[styles.row, styles.timingRow]}>
            <View style={styles.o1Box}>
              <Image
                source={IMAGES.o1}
                style={[styles.o1Img, { width: Math.min(36, width * 0.09), height: Math.min(36, width * 0.09) }]}
              />
            </View>
            <View style={{ marginLeft: 10, flexShrink: 1 }}>
              <Text style={[styles.timeText, { color: theme.text }]}>5.52 p.m.</Text>
              <Text style={[styles.timingLabel, { color: theme.textSecondary }]}>Order timing</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.cancelNote, { color: '#F44336' }]}>
          Please note: This order can only be cancelled within 5 minutes of placement.
        </Text>

        <View style={styles.addressWrap}>
  <View style={styles.row}>
    <Image 
      source={IMAGES.h1} 
      style={[
        styles.addressIcon, 
        { 
          width: Math.min(20, width * 0.05), 
          height: Math.min(20, width * 0.05),
          tintColor: theme.textSecondary // dynamically color icon for dark/light mode
        }
      ]} 
    />
    <Text style={[styles.addressLabel, { color: theme.textSecondary }]}>
      From :- <Text style={[styles.addressValue, { color: theme.text }]}>Rahat baker’s , f5 sector</Text>
    </Text>
  </View>
  <View style={[styles.row, { marginTop: 15 }]}>
    <Image 
      source={IMAGES.h2} 
      style={[
        styles.addressIcon, 
        { 
          width: Math.min(20, width * 0.05), 
          height: Math.min(20, width * 0.05),
          tintColor: theme.textSecondary // dynamic color
        }
      ]} 
    />
    <Text style={[styles.addressLabel, { color: theme.textSecondary }]}>
      To :- <Text style={[styles.addressValue, { color: theme.text }]}>Behria sector 8, building 6,B Apart 37 D</Text>
    </Text>
  </View>
</View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={[styles.cancelBtn, { backgroundColor: isDarkMode ? '#333' : '#f3f3f3' }]} onPress={handlePressCancel}>
            <Text style={[styles.cancelBtnText, { color: theme.text }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keepBtn} onPress={handleKeepOrder}>
            <Text style={styles.keepBtnText}>Keep Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Cancel popup */}
      <Modal transparent visible={showCancelPopup} animationType="fade">
        <View style={[styles.popupOverlay, { backgroundColor: 'rgba(0,0,0,0.22)' }]}>
          <View style={[styles.popupBox, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.popupTitle, { color: theme.text }]}>Are you sure want to cancel?</Text>
            <View style={styles.popupBtnRow}>
              <TouchableOpacity style={styles.popupBtn} onPress={handleConfirmCancel}>
                <Text style={styles.popupBtnText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.popupBtn, { backgroundColor: '#aaa' }]} onPress={() => setShowCancelPopup(false)}>
                <Text style={styles.popupBtnText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Canceled popup */}
      <Modal transparent visible={showCanceledPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox, { backgroundColor: theme.cardBackground }]}>
            <Image source={IMAGES.tick} style={styles.tickIconLarge} />
            <Text style={[styles.popupTitle, { color: theme.text }]}>Order Canceled</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CancelOrder;

const styles = StyleSheet.create({
  container: { flex: 1 },
  fixedMapArea: {
    width: '100%',
    backgroundColor: '#f5f4f9',
    position: 'relative',
  },
  mapBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  header: {
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  backBtn: { padding: 8, borderRadius: 100 },
  backIcon: { width: 26, height: 26 },
  headerTitle: { fontSize: 20, fontWeight: '700', letterSpacing: 0.1, fontFamily: 'Figtree-Bold' },
  absFill: { ...StyleSheet.absoluteFillObject },
  markerIcon: { resizeMode: 'contain' },
  boyIcon: {
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 4,
  },
  routeLine: { borderRadius: 2 },
  timerCircleWrap: { alignItems: 'center', marginTop: -CIRCLE_SIZE * 0.32, marginBottom: 16, zIndex: 22 },
  circleBorder: { borderWidth: 3.5, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', marginBottom: 7 },
  clockIcon: { resizeMode: 'contain' },
  timeLeftText: { fontWeight: '700', marginTop: -2, fontFamily: 'Figtree-Bold' },
  timeSubtext: { fontWeight: '600', marginTop: 0, fontFamily: 'Figtree-Medium' },
  horizontalLine: { borderBottomWidth: 1, marginHorizontal: 20, marginBottom: 10 },
  scrollArea: { flex: 1, borderTopLeftRadius: 18, borderTopRightRadius: 18, marginTop: -10 },
  orderPreparingSimple: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, marginTop: 20 },
  bikeImg: { resizeMode: 'contain', marginRight: 10 },
  orderPrepText: { fontWeight: '700', fontFamily: 'Figtree-Bold' },
  timingRow: { alignItems: 'center' },
  blockCardFullWidth: { flexDirection: 'row', alignItems: 'center', borderRadius: 15, padding: 15, marginVertical: 20, elevation: 2, marginHorizontal: 20 },
  o1Box: { padding: 8, justifyContent: 'center', alignItems: 'center' },
  o1Img: { resizeMode: 'contain' },
  timeText: { fontWeight: '600', fontFamily: 'Figtree-SemiBold' },
  timingLabel: { marginTop: 1, fontFamily: 'Figtree-Medium', fontWeight: '500' },
  cancelNote: { marginHorizontal: 25, marginVertical: 13, fontWeight: '500', fontFamily: 'Figtree-Medium' },
  addressWrap: { marginHorizontal: 20, marginTop: 8 },
  addressIcon: { resizeMode: 'contain', marginRight: 5 },
  addressLabel: { fontWeight: '500', fontFamily: 'Figtree-Medium' },
  addressValue: { fontWeight: '500', fontFamily: 'Figtree-Medium' },
  row: { flexDirection: 'row', alignItems: 'center' },
  btnRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 35 },
  cancelBtn: { flex: 1, paddingVertical: 15, alignItems: 'center', borderRadius: 10, marginRight: 9 },
  cancelBtnText: { fontWeight: '600', fontFamily: 'Figtree-SemiBold' },
  keepBtn: { flex: 1, backgroundColor: PRIMARY_COLOR, paddingVertical: 15, alignItems: 'center', borderRadius: 10, marginLeft: 9 },
  keepBtnText: { color: '#fff', fontWeight: '600', fontFamily: 'Figtree-SemiBold' },
  popupOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  popupBox: { borderRadius: 16, padding: 25, width: width * 0.76, alignItems: 'center', elevation: 5 },
  popupTitle: { fontWeight: '700', fontSize: 17, marginBottom: 15, fontFamily: 'Figtree-Bold' },
  popupBtnRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  popupBtn: { flex: 1, marginHorizontal: 6, paddingVertical: 11, backgroundColor: PRIMARY_COLOR, alignItems: 'center', borderRadius: 9 },
  popupBtnText: { color: '#fff', fontWeight: '700', fontSize: 16, fontFamily: 'Figtree-Bold' },
  tickIconLarge: { width: 40, height: 40, resizeMode: 'contain', marginBottom: 12 },
});

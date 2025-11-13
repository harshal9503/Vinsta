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
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const Favourite = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'Food' | 'Restaurant'>('Food');
  const [heartScales] = useState<{ [key: number]: Animated.Value }>({});

  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Bistro Excellence', img: require('../../assets/r1.png') },
    { id: 2, name: 'Memo San', img: require('../../assets/r2.png') },
    { id: 3, name: 'Elite Ember', img: require('../../assets/r3.png') },
  ]);

  const [foodItems, setFoodItems] = useState([
    { id: 1, name: 'Cheese Burger', price: 45.5, oldPrice: 50.0, time: '10-15 mins', img: require('../../assets/b1.png') },
    { id: 2, name: 'Veggie Delight', price: 60.0, oldPrice: 70.0, time: '12-18 mins', img: require('../../assets/b2.png') },
    { id: 3, name: 'Crispy Fries', price: 30.0, oldPrice: 35.0, time: '8-10 mins', img: require('../../assets/b3.png') },
    { id: 4, name: 'Chicken Roll', price: 55.0, oldPrice: 60.0, time: '10-12 mins', img: require('../../assets/b1.png') },
    { id: 5, name: 'Paneer Wrap', price: 50.0, oldPrice: 55.0, time: '12-15 mins', img: require('../../assets/b2.png') },
    { id: 6, name: 'Tandoori Wings', price: 75.0, oldPrice: 80.0, time: '15-20 mins', img: require('../../assets/b3.png') },
  ]);

  const handleHeartPress = (id: number, type: 'Food' | 'Restaurant') => {
    if (!heartScales[id]) heartScales[id] = new Animated.Value(1);

    Animated.sequence([
      Animated.timing(heartScales[id], { toValue: 1.3, duration: 120, useNativeDriver: true }),
      Animated.timing(heartScales[id], { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start(() => {
      if (type === 'Food') {
        setFoodItems(prev => prev.filter(item => item.id !== id));
      } else {
        setRestaurants(prev => prev.filter(item => item.id !== id));
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favourite</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabRowOuter}>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'Food' && styles.activeTab,
              activeTab === 'Food' && styles.activeTabShadow,
            ]}
            onPress={() => setActiveTab('Food')}
            activeOpacity={0.9}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'Food' && styles.activeTabText,
            ]}>
              Food Items
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'Restaurant' && styles.activeTab,
              activeTab === 'Restaurant' && styles.activeTabShadow,
            ]}
            onPress={() => setActiveTab('Restaurant')}
            activeOpacity={0.9}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'Restaurant' && styles.activeTabText
            ]}>
              Restaurants
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {activeTab === 'Food' ? (
          <View style={styles.grid}>
            {foodItems.length > 0 ? (
              foodItems.map(f => (
                <TouchableOpacity
                  key={f.id}
                  style={styles.foodCard}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('fooddetails')}
                >
                  <Image source={f.img} style={styles.foodImg} />
                  <Animated.View
                    style={[styles.foodHeartWrapper, { transform: [{ scale: heartScales[f.id] || 1 }] }]}
                  >
                    <TouchableOpacity
                      style={styles.heartBtn}
                      onPress={() => handleHeartPress(f.id, 'Food')}
                      activeOpacity={0.7}
                    >
                      <Image source={require('../../assets/heartfill.png')} style={styles.heartIcon} />
                    </TouchableOpacity>
                  </Animated.View>

                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{f.name}</Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.price}>$ {f.price.toFixed(2)}</Text>
                      <Text style={styles.oldPrice}>$ {f.oldPrice.toFixed(2)}</Text>
                    </View>
                    <View style={styles.timeRow}>
                      <Image source={require('../../assets/clock.png')} style={styles.clockIcon} />
                      <Text style={styles.timeText}>{f.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No favourite food items.</Text>
            )}
          </View>
        ) : (
          <>
            {restaurants.length > 0 ? (
              restaurants.map(r => (
                <TouchableOpacity
                  key={r.id}
                  style={styles.card}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('restaurentDetails')}
                >
                  <Image source={r.img} style={styles.cardImg} />
                  <View style={styles.cardContent}>
                    <View style={styles.ratingBadge}>
                      <Image source={require('../../assets/star.png')} style={styles.starIcon} />
                      <Text style={styles.ratingText}>4.4</Text>
                    </View>
                    <Text style={styles.title}>{r.name}</Text>
                    <View style={styles.locationRow}>
                      <Image source={require('../../assets/location1.png')} style={styles.locIcon} />
                      <Text style={styles.location}>Near MC College, Barpeta Town</Text>
                      <Animated.View style={{ transform: [{ scale: heartScales[r.id] || 1 }] }}>
                        <TouchableOpacity
                          style={styles.heartBtn}
                          onPress={() => handleHeartPress(r.id, 'Restaurant')}
                          activeOpacity={0.7}
                        >
                          <Image source={require('../../assets/heartfill.png')} style={styles.heartIcon} />
                        </TouchableOpacity>
                      </Animated.View>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.subInfo}>FAST FOOD</Text>
                      <Image source={require('../../assets/meter.png')} style={styles.metaIcon} />
                      <Text style={styles.metaText}>590.0 m</Text>
                      <Image source={require('../../assets/clockk.png')} style={styles.metaIcon} />
                      <Text style={styles.metaText}>25 min</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No favourite restaurants.</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backIcon: { width: 22, height: 22, tintColor: '#000' },
  headerTitle: {
    fontSize: width * 0.045,
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },

  // Tabs
  tabRowOuter: {
    marginHorizontal: 20,
    marginBottom: 14,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#f3f3f3',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  tabText: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'Figtree-SemiBold',
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  activeTabText: {
    color: '#fff',
    fontFamily: 'Figtree-Bold',
  },

  // Food Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  foodCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  foodImg: { width: '100%', height: 140, resizeMode: 'cover' },
  foodHeartWrapper: { position: 'absolute', top: 10, right: 10 },
  foodInfo: { padding: 10 },
  foodName: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Figtree-SemiBold',
    marginVertical: 4,
  },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 14, color: '#000', fontFamily: 'Figtree-Regular' },
  oldPrice: {
    fontSize: 13,
    color: 'red',
    textDecorationLine: 'line-through',
    fontFamily: 'Figtree-Regular',
  },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  clockIcon: { width: 12, height: 12, marginRight: 6, resizeMode: 'contain' },
  timeText: { fontSize: 12, color: '#555', fontFamily: 'Figtree-Regular' },

  // Restaurants
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
  starIcon: { width: 12, height: 12, tintColor: '#fff', marginRight: 6 },
  ratingText: { color: '#fff', fontSize: 12, fontFamily: 'Figtree-Medium' },
  title: { fontSize: 16, color: '#000', fontFamily: 'Figtree-Bold' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  locIcon: { width: 12, height: 12, marginRight: 6, resizeMode: 'contain' },
  location: { fontSize: 13, color: '#555', flex: 1, fontFamily: 'Figtree-Regular' },
  heartBtn: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  heartIcon: { width: 14, height: 14, resizeMode: 'contain' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6 },
  subInfo: { color: '#777', fontSize: 13, fontFamily: 'Figtree-Medium' },
  metaIcon: { width: 13, height: 13, marginHorizontal: 4, resizeMode: 'contain' },
  metaText: { color: '#555', fontSize: 12, fontFamily: 'Figtree-Regular' },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 15,
    marginTop: 60,
    fontFamily: 'Figtree-Regular',
  },
});

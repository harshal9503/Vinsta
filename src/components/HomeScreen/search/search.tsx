import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { vibrate } from '../../../utils/vibrationHelper';

const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'Restaurant' | 'Food'>(
    'Restaurant',
  );
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [heartScales] = useState<{ [key: number]: Animated.Value }>({});
  const [plusScales] = useState<{ [key: number]: Animated.Value }>({});

  const restaurants = [
    {
      id: 1,
      name: 'Bistro Excellence',
      img: require('../../../assets/r1.png'),
    },
    { id: 2, name: 'Memo San', img: require('../../../assets/r2.png') },
    { id: 3, name: 'Elite Ember', img: require('../../../assets/r3.png') },
  ];

  const foodItems = [
    {
      id: 1,
      name: 'Cheese Burger',
      price: 45.5,
      oldPrice: 50.0,
      time: '10-15 mins',
      img: require('../../../assets/b1.png'),
    },
    {
      id: 2,
      name: 'Veggie Delight',
      price: 60.0,
      oldPrice: 70.0,
      time: '12-18 mins',
      img: require('../../../assets/b2.png'),
    },
    {
      id: 3,
      name: 'Crispy Fries',
      price: 30.0,
      oldPrice: 35.0,
      time: '8-10 mins',
      img: require('../../../assets/b3.png'),
    },
    {
      id: 4,
      name: 'Chicken Roll',
      price: 55.0,
      oldPrice: 60.0,
      time: '10-12 mins',
      img: require('../../../assets/b1.png'),
    },
    {
      id: 5,
      name: 'Paneer Wrap',
      price: 50.0,
      oldPrice: 55.0,
      time: '12-15 mins',
      img: require('../../../assets/b2.png'),
    },
    {
      id: 6,
      name: 'Tandoori Wings',
      price: 75.0,
      oldPrice: 80.0,
      time: '15-20 mins',
      img: require('../../../assets/b3.png'),
    },
  ];

  const handleHeartPress = (id: number) => {
    // Vibration effect using vibrationHelper - same as FoodDetails
    vibrate(40);

    if (!heartScales[id]) heartScales[id] = new Animated.Value(1);
    Animated.sequence([
      Animated.timing(heartScales[id], {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(heartScales[id], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    setLikedItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const handlePlusPress = (id: number) => {
    // Vibration effect for plus button as well
    vibrate(40);

    if (!plusScales[id]) plusScales[id] = new Animated.Value(1);
    Animated.sequence([
      Animated.timing(plusScales[id], {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(plusScales[id], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    setAddedItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Food</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* ===== SEARCH BAR + FILTER ===== */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchRow}>
          <Image
            source={require('../../../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Find for food or restaurant..."
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.filterContainer} activeOpacity={0.8}>
          <Image
            source={require('../../../assets/filter1.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      {/* ===== TOGGLE TABS ===== */}
      <View style={styles.tabRowOuter}>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'Restaurant' && styles.activeTab,
              activeTab === 'Restaurant' && styles.activeTabSides,
            ]}
            onPress={() => setActiveTab('Restaurant')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Restaurant' && styles.activeTabText,
              ]}
            >
              Restaurant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'Food' && styles.activeTab,
              activeTab === 'Food' && styles.activeTabSides,
            ]}
            onPress={() => setActiveTab('Food')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Food' && styles.activeTabText,
              ]}
            >
              Food Item
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== RESTAURANTS / FOOD ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {activeTab === 'Restaurant' ? (
          restaurants.map(r => (
            <TouchableOpacity
              key={r.id}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('restaurentDetails')}
            >
              <View style={styles.cardImageContainer}>
                <Image source={r.img} style={styles.cardImg} />

                {/* Heart Button for Restaurant - Same exact style as FoodDetails */}
                <TouchableOpacity
                  style={[
                    styles.productHeartWrapper,
                    {
                      backgroundColor: likedItems.includes(r.id)
                        ? 'rgba(255, 255, 255, 0.9)'
                        : 'rgba(255, 255, 255, 0.3)',
                      position: 'absolute',
                      top: 10,
                      right: 10,
                    },
                  ]}
                  onPress={() => handleHeartPress(r.id)}
                  activeOpacity={0.7}
                >
                  <Animated.Image
                    source={
                      likedItems.includes(r.id)
                        ? require('../../../assets/heartfill.png')
                        : require('../../../assets/heart.png')
                    }
                    style={[
                      styles.heartIcon,
                      {
                        tintColor: likedItems.includes(r.id)
                          ? COLORS.primary
                          : '#fff',
                      },
                      { transform: [{ scale: heartScales[r.id] || 1 }] },
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* Rating Badge */}
                <View style={styles.productRatingBadge}>
                  <Image
                    source={require('../../../assets/star.png')}
                    style={styles.starIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.ratingText}>4.4</Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.title}>{r.name}</Text>

                <View style={styles.locationRow}>
                  <Image
                    source={require('../../../assets/location1.png')}
                    style={styles.locIcon}
                  />
                  <Text style={styles.location}>
                    Near MC College, Barpeta Town
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.subInfo}>FAST FOOD</Text>
                  <Image
                    source={require('../../../assets/meter.png')}
                    style={styles.metaIcon}
                  />
                  <Text style={styles.metaText}>590.0 m</Text>
                  <Image
                    source={require('../../../assets/clockk.png')}
                    style={styles.metaIcon}
                  />
                  <Text style={styles.metaText}>25 min</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.grid}>
            {foodItems.map(f => (
              <TouchableOpacity
                key={f.id}
                style={styles.foodCard}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('fooddetails')}
              >
                <View style={styles.foodImageContainer}>
                  <Image source={f.img} style={styles.foodImg} />

                  {/* Heart Button for Food - Same exact style as FoodDetails */}
                  <TouchableOpacity
                    style={[
                      styles.productHeartWrapper,
                      {
                        backgroundColor: likedItems.includes(f.id)
                          ? 'rgba(255, 255, 255, 0.9)'
                          : 'rgba(255, 255, 255, 0.3)',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      },
                    ]}
                    onPress={() => handleHeartPress(f.id)}
                    activeOpacity={0.7}
                  >
                    <Animated.Image
                      source={
                        likedItems.includes(f.id)
                          ? require('../../../assets/heartfill.png')
                          : require('../../../assets/heart.png')
                      }
                      style={[
                        styles.heartIcon,
                        {
                          tintColor: likedItems.includes(f.id)
                            ? COLORS.primary
                            : '#fff',
                        },
                        { transform: [{ scale: heartScales[f.id] || 1 }] },
                      ]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  {/* Rating Badge */}
                  <View style={styles.productRatingBadge}>
                    <Image
                      source={require('../../../assets/star.png')}
                      style={styles.starIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.ratingText}>4.4</Text>
                  </View>
                </View>

                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{f.name}</Text>

                  <View style={styles.priceRow}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>₹ {f.price.toFixed(2)}</Text>
                      <Text style={styles.oldPrice}>
                        ₹ {f.oldPrice.toFixed(2)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handlePlusPress(f.id)}
                      activeOpacity={0.8}
                      style={styles.plusBtn}
                    >
                      <Animated.Image
                        source={require('../../../assets/plus.png')}
                        style={[
                          styles.plusIcon,
                          { transform: [{ scale: plusScales[f.id] || 1 }] },
                        ]}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.timeRow}>
                    <Image
                      source={require('../../../assets/clock.png')}
                      style={styles.clockIcon}
                    />
                    <Text style={styles.timeText}>{f.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

// =================== STYLES ===================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },

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
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },

  /** SEARCH **/
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 14,
  },
  searchRow: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#999',
    marginRight: 8,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  filterContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  filterIcon: { width: 22, height: 22, resizeMode: 'contain' },

  /** TABS OUTER for shadow/rounded effect **/
  tabRowOuter: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: 'transparent',
    borderRadius: 10,
    elevation: 0,
  },
  /** TABS INNER with curve and elevation **/
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
    paddingVertical: 12,
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
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
  },

  /** RESTAURANT CARD **/
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 14,
  },
  // Heart wrapper styles - Exact same as FoodDetails component
  productHeartWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  heartIcon: {
    width: 14,
    height: 14,
  },
  // Rating badge styles - Same as FoodDetails
  productRatingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  starIcon: {
    width: 12,
    height: 12,
    tintColor: '#fff',
    marginRight: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Figtree-Bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-Bold',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locIcon: {
    width: 12,
    height: 12,
    marginRight: 6,
    resizeMode: 'contain',
    tintColor: '#555',
  },
  location: {
    fontSize: 13,
    color: '#555',
    flex: 1,
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subInfo: {
    color: '#777',
    fontSize: 13,
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
  },
  metaIcon: {
    width: 13,
    height: 13,
    marginHorizontal: 2,
    resizeMode: 'contain',
    tintColor: '#555',
  },
  metaText: {
    color: '#555',
    fontSize: 12,
    fontFamily: 'Figtree-Medium',
    fontWeight: '500',
    marginRight: 6,
  },

  /** FOOD GRID **/
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
    position: 'relative',
  },
  foodImageContainer: {
    position: 'relative',
  },
  foodImg: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  foodInfo: {
    padding: 10,
  },
  foodName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
    fontFamily: 'Figtree-Bold',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Figtree-SemiBold',
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 13,
    color: 'red',
    textDecorationLine: 'line-through',
    fontFamily: 'Figtree-Regular',
  },
  plusBtn: {
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  plusIcon: {
    width: 14,
    height: 14,
    tintColor: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: 12,
    height: 12,
    marginRight: 6,
    resizeMode: 'contain',
    tintColor: '#555',
  },
  timeText: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'Figtree-Regular',
  },
});

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
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const FILTER_TAG_COLORS = {
  background: '#FFF9F3',
  border: '#FFE0C8',
  text: '#F99C38',
};

const RestaurentDetails: React.FC = () => {
  const navigation = useNavigation<any>();
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [heartScales] = useState<{ [key: number]: Animated.Value }>({});
  const [plusScales] = useState<{ [key: number]: Animated.Value }>({});
  const [activeCategory, setActiveCategory] = useState('Burger');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>(['Spicy']);

  const categories = [
    { name: 'Burger', img: require('../../../assets/burger.png') },
    { name: 'Maxican', img: require('../../../assets/mexican1.png') },
    { name: 'Asian', img: require('../../../assets/asian.png') },
  ];

  const foodItems = [
    { id: 1, name: 'Cheese Burger', price: 45.5, oldPrice: 50.0, time: '10-15 mins', img: require('../../../assets/b1.png') },
    { id: 2, name: 'Cheese Burger', price: 45.5, oldPrice: 50.0, time: '10-15 mins', img: require('../../../assets/b2.png') },
    { id: 3, name: 'Cheese Burger', price: 45.5, oldPrice: 50.0, time: '10-15 mins', img: require('../../../assets/b3.png') },
    { id: 4, name: 'Cheese Burger', price: 45.5, oldPrice: 50.0, time: '10-15 mins', img: require('../../../assets/b1.png') },
  ];

  const handleHeartPress = (id: number) => {
    if (!heartScales[id]) heartScales[id] = new Animated.Value(1);
    Animated.sequence([
      Animated.timing(heartScales[id], { toValue: 1.3, duration: 120, useNativeDriver: true }),
      Animated.timing(heartScales[id], { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handlePlusPress = (id: number) => {
    if (!plusScales[id]) plusScales[id] = new Animated.Value(1);
    Animated.sequence([
      Animated.timing(plusScales[id], { toValue: 1.3, duration: 120, useNativeDriver: true }),
      Animated.timing(plusScales[id], { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    setAddedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleFilter = (filterName: string) => {
    setFilters((prev) => {
      if (prev.includes(filterName)) {
        return prev.filter(f => f !== filterName);
      } else {
        return [...prev, filterName];
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* CATEGORY DROPDOWN MODAL */}
      <Modal
        visible={dropdownVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setDropdownVisible(false)}>
          <View style={styles.dropdownMenu}>
            {categories.map(c => (
              <TouchableOpacity
                key={c.name}
                style={styles.dropdownItem}
                onPress={() => {
                  setActiveCategory(c.name);
                  setDropdownVisible(false);
                }}
              >
                <Image source={c.img} style={styles.dropdownIcon} />
                <Text style={[
                  styles.dropdownText,
                  activeCategory === c.name ? { color: COLORS.primary, fontWeight: '700' } : undefined
                ]}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== HEADER IMAGE & ICONS ===== */}
        <View style={styles.headerImgBox}>
          <Image source={require('../../../assets/r1.png')} style={styles.headerImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Bistro Excellence</Text>
            <TouchableOpacity style={styles.headerHeartBtn}>
              <Image source={require('../../../assets/heart.png')} style={styles.heartIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== RESTAURANT BADGE ===== */}
        <View style={styles.curvedSection}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoCircle}>
              <Image source={require('../../../assets/be.png')} style={styles.logo} />
            </View>
          </View>
          <TouchableOpacity style={styles.mapWrapper}>
            <Image source={require('../../../assets/map.png')} style={styles.mapIcon} />
          </TouchableOpacity>
          <Text style={styles.resName}>Bistro Excellence</Text>
          <View style={styles.locationRow}>
            <Image source={require('../../../assets/location1.png')} style={styles.locIcon} />
            <Text style={styles.locationText}>Near MC College, Barpeta Town</Text>
          </View>
          <View style={styles.statsRow}>
            <Image source={require('../../../assets/leaf.png')} style={styles.statIcon} />
            <Text style={styles.statText}>590.0 m</Text>
            <Image source={require('../../../assets/clockk.png')} style={styles.statIcon} />
            <Text style={styles.statText}>25 min</Text>
            <Image source={require('../../../assets/order.png')} style={styles.statIcon} />
            <Text style={styles.statText}>5000+ Order</Text>
          </View>
        </View>

        {/* ===== SEARCH BAR ===== */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchRow}>
            <Image source={require('../../../assets/search.png')} style={styles.searchIcon} />
            <TextInput placeholder="search" placeholderTextColor="#999" style={styles.input} />
          </View>
          <TouchableOpacity style={styles.searchFilterContainer}>
            <Image source={require('../../../assets/menu.png')} style={styles.searchFilterIcon} />
          </TouchableOpacity>
        </View>

        {/* ===== CATEGORY BAR ===== */}
        <View style={styles.categoryHeader}>
          <Image source={require('../../../assets/leaf.png')} style={styles.leafIcon} />
          <Text style={styles.availText}>Available Fast Food</Text>
          <Image source={require('../../../assets/veg.png')} style={styles.vegIcon} />
          <TouchableOpacity onPress={() => setDropdownVisible(true)}>
            <Image source={require('../../../assets/dropdown.png')} style={styles.dropIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySlider}>
          {categories.map((cat) => {
            const selected = activeCategory === cat.name;
            return (
              <TouchableOpacity
                key={cat.name}
                style={[
                  styles.categoryBtn,
                  selected && styles.categoryBtnActive,
                ]}
                onPress={() => setActiveCategory(cat.name)}
              >
                {selected ? (
                  <View style={styles.selectedIconCircle}>
                    <Image source={cat.img} style={styles.categoryIconSelected} />
                  </View>
                ) : (
                  <Image source={cat.img} style={styles.categoryIcon} />
                )}
                <Text
                  style={[
                    styles.categoryTxt,
                    selected && styles.categoryTxtActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ===== FILTER TAGS ===== */}
        <View style={styles.filtersBox}>
          <View style={styles.filterTag}>
            <Image source={require('../../../assets/filter3.png')} style={styles.filterTagIcon} />
            <Text style={styles.filterTagText}>Filter (1)</Text>
          </View>

          <TouchableOpacity
            style={styles.filterTag}
            onPress={() => toggleFilter('Spicy')}
            activeOpacity={0.7}
          >
            <Image source={require('../../../assets/spicy.png')} style={styles.filterTagIcon} />
            <Text style={styles.filterTagText}>Spicy</Text>
            {filters.includes('Spicy') && (
              <Image
                source={require('../../../assets/close.png')}
                style={[styles.closeIcon]}
              />
            )}
          </TouchableOpacity>

          <View style={styles.filterTag}>
            <Image source={require('../../../assets/popular.png')} style={styles.filterTagIcon} />
            <Text style={styles.filterTagText}>Offer's</Text>
          </View>
          <View style={styles.filterTag}>
            <Image source={require('../../../assets/vegan.png')} style={styles.filterTagIcon} />
            <Text style={styles.filterTagText}>Vegan</Text>
          </View>
        </View>

        {/* ===== RECOMMENDATION HEADER ===== */}
        <View style={styles.recommendHeaderRow}>
          <Image source={require('../../../assets/leaf.png')} style={styles.recommendHeaderIcon} />
          <Text style={styles.recommendHeaderText}>Recommendation for you.</Text>
        </View>

        {/* FOOD GRID (Recommendation) */}
        <View style={styles.grid}>
          {foodItems.map((f) => (
            <View key={f.id} style={styles.foodCard}>
              <TouchableOpacity
                style={[styles.heartWrapper, styles.heartWrapperBack]}
                onPress={() => handleHeartPress(f.id)}
              >
                <Animated.Image
                  source={
                    likedItems.includes(f.id)
                      ? require('../../../assets/heartfill.png')
                      : require('../../../assets/heart.png')
                  }
                  style={[
                    styles.heartIconSmall,
                    { transform: [{ scale: heartScales[f.id] || 1 }] },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('FoodItem')}>
                <Image source={f.img} style={styles.foodImg} />
                <View style={styles.foodRatingBadge}>
                  <Image source={require('../../../assets/star.png')} style={styles.starIcon} />
                  <Text style={styles.ratingText}>4.4</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{f.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>$ {f.price.toFixed(2)}</Text>
                  <Text style={styles.oldPrice}>$ {f.oldPrice.toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => handlePlusPress(f.id)} style={styles.plusBtn}>
                    <Animated.Image source={require('../../../assets/plus.png')}
                      style={[
                        styles.plusIcon,
                        { transform: [{ scale: plusScales[f.id] || 1 }] },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.timeRow}>
                  <Image source={require('../../../assets/clock.png')} style={styles.clockIcon} />
                  <Text style={styles.timeText}>{f.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ===== BEST IN BURGER ===== */}
        <View style={styles.bestBurgerHeaderRow}>
          <Image source={require('../../../assets/popular.png')} style={styles.bestBurgerHeaderIcon} />
          <Text style={styles.bestBurgerHeaderText}>Best In Burger.</Text>
        </View>
        <View style={styles.grid}>
          {foodItems.map((f) => (
            <View key={`best-${f.id}`} style={styles.foodCard}>
              <TouchableOpacity
                style={styles.heartWrapper}
                onPress={() => handleHeartPress(f.id)}
              >
                <Animated.Image
                  source={
                    likedItems.includes(f.id)
                      ? require('../../../assets/heartfill.png')
                      : require('../../../assets/heart.png')
                  }
                  style={[
                    styles.heartIconSmall,
                    { transform: [{ scale: heartScales[f.id] || 1 }] },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('FoodItem')}>
                <Image source={f.img} style={styles.foodImg} />
                <View style={styles.foodRatingBadge}>
                  <Image source={require('../../../assets/star.png')} style={styles.starIcon} />
                  <Text style={styles.ratingText}>4.4</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{f.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>$ {f.price.toFixed(2)}</Text>
                  <Text style={styles.oldPrice}>$ {f.oldPrice.toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => handlePlusPress(f.id)} style={styles.plusBtn}>
                    <Animated.Image source={require('../../../assets/plus.png')}
                      style={[
                        styles.plusIcon,
                        { transform: [{ scale: plusScales[f.id] || 1 }] },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.timeRow}>
                  <Image source={require('../../../assets/clockk.png')} style={styles.clockIcon} />
                  <Text style={styles.timeText}>{f.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurentDetails;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF' 
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('2%'),
  },
  headerImgBox: { 
    position: 'relative' 
  },
  headerImage: { 
    width: '100%', 
    height: hp('24%'), 
    borderBottomLeftRadius: wp('6%'), 
    borderBottomRightRadius: wp('6%') 
  },
  headerOverlay: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    height: hp('24%'), 
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent: 'space-between',
    paddingTop: hp('6%'), 
    paddingHorizontal: wp('5%'), 
    zIndex: 9,
  },
  headerTitle: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: hp('6.5%'),
    textAlign: 'center', 
    color: '#fff', 
    fontSize: hp('2.2%'), 
    fontWeight: '700', 
    letterSpacing: 0.6,
    textShadowColor: '#000', 
    textShadowRadius: 4,
  },
  backBtn: { 
    zIndex: 2, 
    backgroundColor: 'rgba(0,0,0,0.25)', 
    borderRadius: wp('50%'), 
    padding: wp('1.5%') 
  },
  backIcon: { 
    width: wp('5.5%'), 
    height: wp('5.5%'), 
    tintColor: '#fff' 
  },
  headerHeartBtn: {
    backgroundColor: COLORS.primary, 
    borderRadius: wp('6%'), 
    padding: wp('2%'),
    elevation: 2, 
    shadowColor: "#000", 
    shadowOpacity: 0.09, 
    shadowRadius: 8,
  },
  heartIcon: { 
    width: wp('4.5%'), 
    height: wp('4.5%'), 
    tintColor: '#fff' 
  },

  curvedSection: {
    backgroundColor: '#fff', 
    borderTopLeftRadius: wp('8%'), 
    borderTopRightRadius: wp('8%'),
    marginTop: hp('-2.2%'), 
    alignItems: 'center', 
    paddingVertical: hp('2%'), 
    paddingBottom: hp('1.2%'),
    shadowColor: "#000", 
    shadowOpacity: 0.04, 
    shadowRadius: 8, 
    elevation: 4,
  },

  logoWrapper: { 
    marginTop: hp('-3.8%'), 
    marginBottom: hp('1%'), 
    alignSelf: 'center' 
  },
  logoCircle: {
    backgroundColor: '#FFDB56', 
    borderRadius: wp('7%'), 
    padding: wp('3.5%'),
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 3,
  },
  logo: { 
    width: wp('11%'), 
    height: wp('11%'), 
    resizeMode: 'contain' 
  },
  mapWrapper: { 
    position: 'absolute', 
    top: hp('1.3%'), 
    right: wp('4%'), 
    zIndex: 2 
  },
  mapIcon: { 
    width: wp('6%'), 
    height: wp('6%') 
  },
  resName: { 
    fontSize: hp('2%'), 
    fontWeight: '700', 
    color: '#222', 
    marginTop: hp('0.5%') 
  },
  locationRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: hp('0.6%'), 
    marginBottom: hp('0.3%') 
  },
  locIcon: { 
    width: wp('3.5%'), 
    height: wp('3.5%'), 
    marginRight: wp('1.5%') 
  },
  locationText: { 
    color: '#888', 
    fontSize: hp('1.5%'), 
    fontWeight: '500' 
  },
  statsRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: hp('0.6%'), 
    justifyContent: 'center', 
    gap: wp('3%') 
  },
  statIcon: { 
    width: wp('3.2%'), 
    height: wp('3.2%'), 
    marginRight: wp('0.8%') 
  },
  statText: { 
    fontSize: hp('1.4%'), 
    color: '#222', 
    fontWeight: '400', 
    marginRight: wp('2.5%') 
  },

  searchWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: wp('5.5%'), 
    marginTop: hp('1.6%'), 
    marginBottom: hp('0.4%') 
  },
  searchRow: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FAFAFA',
    borderRadius: wp('3.5%'), 
    paddingHorizontal: wp('3.5%'), 
    height: hp('5.5%'), 
    elevation: 1,
  },
  searchIcon: { 
    width: wp('4.5%'), 
    height: wp('4.5%'), 
    tintColor: '#999', 
    marginRight: wp('1.8%') 
  },
  input: { 
    flex: 1, 
    paddingVertical: hp('1%'), 
    fontSize: hp('1.8%'), 
    color: '#111' 
  },
  searchFilterContainer: { 
    backgroundColor: COLORS.primary, 
    marginLeft: wp('3%'), 
    padding: wp('2.5%'), 
    borderRadius: wp('3.5%'), 
    elevation: 2 
  },
  searchFilterIcon: { 
    width: wp('5.5%'), 
    height: wp('5.5%'), 
    tintColor: '#fff' 
  },

  categoryHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: wp('5.5%'), 
    marginTop: hp('1.3%') 
  },
  leafIcon: { 
    width: wp('3.5%'), 
    height: wp('3.5%'), 
    marginRight: wp('1.8%') 
  },
  availText: { 
    fontWeight: '600', 
    color: '#000', 
    fontSize: hp('1.8%') 
  },
  vegIcon: { 
    width: wp('3.5%'), 
    height: wp('3.5%'), 
    marginHorizontal: wp('1.8%') 
  },
  dropIcon: { 
    width: wp('2.5%'), 
    height: wp('2.5%'), 
    resizeMode: 'contain', 
    tintColor: '#999' 
  },

  categorySlider: { 
    paddingVertical: hp('1.2%'), 
    marginVertical: hp('0.3%'), 
    marginLeft: wp('5.5%') 
  },
  categoryBtn: {
    backgroundColor: '#fff',
    borderRadius: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
    paddingVertical: hp('0.3%'),
    paddingHorizontal: wp('3%'),
    flexDirection: 'row',
    minHeight: hp('5%'),
  },
  categoryBtnActive: {
    backgroundColor: COLORS.primary,
  },
  selectedIconCircle: {
    backgroundColor: '#fff',
    borderRadius: wp('50%'),
    width: wp('10%'),
    height: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2%'),
  },
  categoryIcon: { 
    width: wp('10%'), 
    height: wp('10%'), 
    marginRight: wp('2%') 
  },
  categoryIconSelected: { 
    width: wp('8%'), 
    height: wp('8%') 
  },
  categoryTxt: { 
    color: COLORS.primary, 
    fontWeight: '600', 
    fontSize: hp('1.7%') 
  },
  categoryTxtActive: { 
    color: COLORS.secondary 
  },

  filtersBox: { 
    flexDirection: 'row', 
    marginVertical: hp('0.3%'), 
    marginHorizontal: wp('5.5%'), 
    gap: wp('2.5%'),
    flexWrap: 'wrap' 
  },
  filterTag: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: FILTER_TAG_COLORS.background,
    borderColor: FILTER_TAG_COLORS.border, 
    borderWidth: 1.1, 
    borderRadius: wp('2%'), 
    paddingHorizontal: wp('3.5%'), 
    paddingVertical: hp('0.8%'), 
    marginBottom: hp('0.5%'),
  },
  filterTagIcon: { 
    width: wp('3.5%'), 
    height: wp('3.5%'), 
    marginRight: wp('1%') 
  },
  filterTagText: { 
    color: '#000', 
    fontWeight: '600', 
    fontSize: hp('1.5%') 
  },
  closeIcon: {
    width: wp('3%'),
    height: wp('3%'),
    marginLeft: wp('1.5%'),
    tintColor: '#000',
  },

  recommendHeaderRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: wp('5.5%'), 
    marginTop: hp('1.8%'), 
    marginBottom: hp('0.2%') 
  },
  recommendHeaderIcon: { 
    width: wp('3.5%'), 
    height: wp('3.5%'), 
    marginRight: wp('1.5%') 
  },
  recommendHeaderText: { 
    fontWeight: '700', 
    color: '#222', 
    fontSize: hp('1.8%') 
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: wp('5.5%'),
    marginTop: hp('0.7%'),
  },
  foodCard: {
    width: wp('44%'),
    backgroundColor: '#fff',
    borderRadius: wp('4.5%'),
    marginBottom: hp('2%'),
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  heartWrapper: {
    position: 'absolute', 
    right: wp('3%'), 
    top: hp('1.2%'), 
    backgroundColor: COLORS.primary,
    borderRadius: wp('5%'), 
    padding: wp('1.8%'), 
    zIndex: 8, 
    shadowColor: "#000", 
    shadowOpacity: 0.09, 
    shadowRadius: 5, 
    elevation: 2,
  },
  heartWrapperBack: {
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heartIconSmall: { 
    width: wp('3.8%'), 
    height: wp('3.8%'), 
    tintColor: '#fff' 
  },
  foodImg: { 
    width: '100%', 
    height: hp('13%'), 
    borderTopLeftRadius: wp('4.5%'), 
    borderTopRightRadius: wp('4.5%') 
  },
  foodRatingBadge: {
    position: 'absolute', 
    bottom: hp('1%'), 
    right: wp('3%'), 
    backgroundColor: COLORS.primary,
    borderRadius: wp('2.5%'), 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: wp('1.5%'), 
    paddingVertical: hp('0.4%'),
  },
  starIcon: { 
    width: wp('3%'), 
    height: wp('3%'), 
    tintColor: '#fff', 
    marginRight: wp('1%') 
  },
  ratingText: { 
    color: '#fff', 
    fontSize: hp('1.3%'), 
    fontWeight: '600' 
  },

  foodInfo: { 
    padding: wp('2.5%'), 
    paddingTop: hp('0.8%') 
  },
  foodName: { 
    fontWeight: '700', 
    color: '#222', 
    fontSize: hp('1.6%'), 
    marginBottom: hp('0.3%') 
  },
  priceRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: hp('0.2%') 
  },
  price: { 
    fontWeight: '700', 
    color: '#222', 
    fontSize: hp('1.6%') 
  },
  oldPrice: { 
    fontSize: hp('1.3%'), 
    color: '#FA463D', 
    textDecorationLine: 'line-through', 
    marginLeft: wp('1%') 
  },
  plusBtn: {
    backgroundColor: COLORS.primary, 
    width: wp('7%'), 
    height: wp('7%'), 
    borderRadius: wp('2%'),
    alignItems: 'center', 
    justifyContent: 'center', 
    marginLeft: wp('2%'),
  },
  plusIcon: { 
    width: wp('3.5%'), 
    height: wp('3.5%'), 
    tintColor: '#fff' 
  },
  timeRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: hp('0.6%'), 
    gap: wp('1.8%') 
  },
  clockIcon: { 
    width: wp('3.2%'), 
    height: wp('3.2%'), 
    tintColor: COLORS.primary 
  },
  timeText: { 
    fontSize: hp('1.3%'), 
    color: '#666', 
    fontWeight: '600' 
  },

  bestBurgerHeaderRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: wp('5.5%'), 
    marginBottom: hp('0.7%'), 
    marginTop: hp('1.7%') 
  },
  bestBurgerHeaderIcon: { 
    width: wp('4%'), 
    height: wp('4%'), 
    marginRight: wp('1.8%') 
  },
  bestBurgerHeaderText: { 
    fontWeight: '700', 
    color: '#222', 
    fontSize: hp('1.7%') 
  },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.08)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  dropdownMenu: { 
    backgroundColor: '#fff', 
    borderRadius: wp('3%'), 
    paddingVertical: hp('1%'), 
    paddingHorizontal: wp('6%'), 
    elevation: 5,
    minWidth: wp('40%'),
  },
  dropdownItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: hp('1%') 
  },
  dropdownIcon: { 
    width: wp('4.8%'), 
    height: wp('4.8%'), 
    marginRight: wp('3.5%') 
  },
  dropdownText: { 
    fontSize: hp('1.8%'), 
    fontWeight: '600', 
    color: '#232323' 
  },
});
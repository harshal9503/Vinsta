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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts'

const { width, height } = Dimensions.get('window');

const MenuScreen = () => {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<'Veg' | 'NonVeg'>('Veg');

  const vegItems = [
    {
      id: 1,
      name: 'Fast food',
      price: 23,
      img: require('../../../assets/b1.png'),
    },
    {
      id: 2,
      name: 'Colddrink',
      price: 13,
      img: require('../../../assets/b2.png'),
    },
    {
      id: 3,
      name: 'Paneer',
      price: 33,
      img: require('../../../assets/b3.png'),
    },
    { id: 4, name: 'Dal', price: 25, img: require('../../../assets/r1.png') },
    { id: 5, name: 'Roti', price: 28, img: require('../../../assets/r2.png') },
    { id: 6, name: 'Salad', price: 21, img: require('../../../assets/r3.png') },
    { id: 7, name: 'Pizza', price: 13, img: require('../../../assets/b1.png') },
    {
      id: 8,
      name: 'Icecream',
      price: 23,
      img: require('../../../assets/b2.png'),
    },
    {
      id: 9,
      name: `Vegie's`,
      price: 33,
      img: require('../../../assets/b3.png'),
    },
  ];

  const nonVegItems = [
    // {
    //   id: 1,
    //   name: 'Chicken Curry',
    //   price: 45,
    //   img: require('../../../assets/r1.png'),
    // },
    // {
    //   id: 2,
    //   name: 'Mutton Biryani',
    //   price: 60,
    //   img: require('../../../assets/r2.png'),
    // },
    // { id: 3, name: 'Fish Fry', price: 50, img: require('../../../assets/r3.png') },
  ];

  const data = tab === 'Veg' ? vegItems : nonVegItems;

  // Empty State Component
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../../../assets/emptycart.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>
        {tab === 'NonVeg'
          ? "Non-veg option is not available here you can explore from veg option's."
          : "Veg option is not available here you can explore from non-veg option's."}
      </Text>
    </View>
  );

  const handleMenuItemPress = (item: any) => {
    navigation.navigate('restaurentDetails', {
      selectedItem: item.name,
      foodType: tab,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
        <View style={{ width: width * 0.06 }} />
      </View>

      {/* TABS WITH CURVE */}
      <View style={styles.tabRowOuter}>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tab === 'Veg' && styles.tabActive,
              tab === 'Veg' && { backgroundColor: '#259E29' },
            ]}
            onPress={() => setTab('Veg')}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.tabText, tab === 'Veg' && styles.tabTextActive]}
            >
              Veg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tab === 'NonVeg' && styles.tabActive,
              tab === 'NonVeg' && { backgroundColor: '#FE0505' },
            ]}
            onPress={() => setTab('NonVeg')}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.tabText, tab === 'NonVeg' && styles.tabTextActive]}
            >
              Non-Veg
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MENU LIST OR EMPTY STATE */}
      {data.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: height * 0.08 }}
        >
          {data.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.menuRow}
                activeOpacity={0.7}
                onPress={() => handleMenuItemPress(item)}
              >
                <View style={styles.menuLeft}>
                  <Image source={item.img} style={styles.foodImg} />
                  <Text style={styles.foodName}>{item.name}</Text>
                </View>
                <View style={styles.menuRight}>
                  <Text style={styles.foodPrice}>₹ {item.price}</Text>
                  <Image
                    source={require('../../../assets/rightarrow.png')}
                    style={styles.rightArrow}
                  />
                </View>
              </TouchableOpacity>
              {index === 0 && <View style={styles.divider} />}
            </View>
          ))}
        </ScrollView>
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: height * 0.012,
    paddingHorizontal: width * 0.05,
  },
  backIcon: {
    width: width * 0.055,
    height: width * 0.055,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Figtree-SemiBold'
  },

  // TABS WITH CURVE (Same as SearchScreen)
  tabRowOuter: {
    marginHorizontal: width * 0.05,
    marginTop: height * 0.01,
    marginBottom: height * 0.018,
    backgroundColor: 'transparent',
    borderRadius: 10,
    elevation: 0,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: height * 0.014,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabActive: {
    borderRadius: 10,
    elevation: 0,
  },
  tabText: {
    fontSize: width * 0.038,
    fontWeight: '700',
    color: '#777',
    fontFamily: 'Figtree-Bold',
  },
  tabTextActive: {
    color: '#fff',
  },

  // MENU ITEMS
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.012,
    paddingVertical: height * 0.005,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  foodImg: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 8,
    marginRight: width * 0.025,
  },
  foodName: {
    fontSize: width * 0.04,
    color: '#000',
    fontWeight: '600',
    flex: 1,
    fontFamily: 'Figtree-SemiBold'
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodPrice: {
    fontSize: width * 0.037,
    color: '#000',
    marginRight: width * 0.02,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold'
  },
  rightArrow: {
    width: width * 0.018,
    height: width * 0.03,
    tintColor: '#999',
  },

  divider: {
    height: 1,
    backgroundColor: '#E87C23',
    width: '85%',
    alignSelf: 'center',
    marginVertical: height * 0.006,
  },

  // EMPTY STATE
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
    paddingBottom: height * 0.1,
  },
  emptyImage: {
    width: width * 0.9,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: height * 0.03,
  },
  emptyText: {
    fontSize: width * 0.042,
    color: '#666',
    textAlign: 'center',
    lineHeight: width * 0.06,
    fontWeight: '600',
    fontFamily : 'Figtree-SemiBold'

  },
});

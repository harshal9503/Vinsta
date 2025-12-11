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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../theme/colors';
import { ThemeContext } from '../../../../theme/ThemeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';
import { vibrate } from '../../../../utils/vibrationHelper';

const { width, height } = Dimensions.get('window');

type Restaurant = {
  id: number;
  name: string;
  image: any;
  rating: number;
  address: string;
  type: string;
  distance: string;
  time: string;
};

const AddMoreSubscription = () => {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext); // Using ThemeContext
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const restaurants: Restaurant[] = [
    { id: 1, name: 'Bistro Excellence', image: require('../../../../assets/r1.png'), rating: 4.4, address: 'Near MC College, Barpeta Town', type: 'FAST FOOD', distance: '590.0 m', time: '25 min' },
    { id: 2, name: 'Bistro Excellence', image: require('../../../../assets/r2.png'), rating: 4.4, address: 'Near MC College, Barpeta Town', type: 'FAST FOOD', distance: '590.0 m', time: '25 min' },
    { id: 3, name: 'Bistro Excellence', image: require('../../../../assets/r3.png'), rating: 4.4, address: 'Near MC College, Barpeta Town', type: 'FAST FOOD', distance: '590.0 m', time: '25 min' },
  ];

  const handleHeartPressWithVibration = (id: number) => {
    vibrate(40);
    setLikedIds(prev => prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]);
  };

  const handleViewMenuPress = (restaurant: Restaurant) => {
    navigation.navigate('ViewMenu', { restaurant });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>Add Subscription</Text>
        <View style={{ width: wp('6%') }} />
      </View>

      {/* Subtitle */}
      <View style={styles.subtitleContainer}>
        <Image
          source={require('../../../../assets/location3.png')}
          style={styles.locationIcon}
          resizeMode="contain"
        />
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Nearby restaurant's for subscription</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {restaurants.map(item => {
          const isLiked = likedIds.includes(item.id);
          const { isDarkMode } = useContext(ThemeContext);
          return (
            <View
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
                  // black for dark, white for light
                  shadowColor: isDarkMode ? 'transparent' : '#000',
                },
              ]}
            >


              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />

                {/* Heart Icon */}
                <TouchableOpacity
                  style={[
                    styles.productHeartWrapper,
                    {
                      backgroundColor: isLiked ? 'rgba(255, 255, 255, 0.9)' :
                        'rgba(242, 234, 234, 0.3)'
                    }
                  ]}
                  activeOpacity={0.7}
                  onPress={() => handleHeartPressWithVibration(item.id)}
                >
                  <Image
                    source={isLiked
                      ? require('../../../../assets/heartfill.png')
                      : require('../../../../assets/heart.png')}
                    style={[
                      styles.heartIcon,
                      { tintColor: isLiked ? COLORS.primary : '#fff' }
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.contentBox, { backgroundColor: theme.card }]}>
                <View style={styles.rowBetween}>
                  <Text style={[styles.title, { color: theme.text }]}>{item.name}</Text>

                  <View style={styles.productRatingBadge}>
                    <Image
                      source={require('../../../../assets/star.png')}
                      style={styles.starIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <Image
                    source={require('../../../../assets/location1.png')}
                    style={styles.smallIcon}
                    resizeMode="contain"
                  />
                  <Text style={[styles.address, { color: theme.textSecondary }]}>{item.address}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={[styles.tag, { color: theme.text }]}>{item.type}</Text>

                  <View style={styles.infoItem}>
                    <Image
                      source={require('../../../../assets/location1.png')}
                      style={styles.iconSmallGreen}
                      resizeMode="contain"
                    />
                    <Text style={[styles.infoText, { color: theme.text }]}>{item.distance}</Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Image
                      source={require('../../../../assets/clock.png')}
                      style={styles.iconSmallGreen}
                      resizeMode="contain"
                    />
                    <Text style={[styles.infoText, { color: theme.text }]}>{item.time}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.menuButton, { backgroundColor: COLORS.primary }]}
                  activeOpacity={0.9}
                  onPress={() => handleViewMenuPress(item)}
                >
                  <Text style={styles.menuText}>View Menu</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AddMoreSubscription;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: hp('6%'),
    paddingBottom: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  backButton: { padding: wp('1%') },
  backIcon: { width: wp('6%'), height: wp('6%') },
  headerTitle: { fontSize: wp('5%'), fontFamily: getFontFamily('Bold'), fontWeight: getFontWeight('Bold'), marginTop: hp('0.5%') },

  subtitleContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp('5%'), paddingVertical: hp('1%') },
  locationIcon: { width: wp('5%'), height: wp('5%') },
  subtitle: { marginLeft: wp('2%'), fontSize: wp('3.6%'), fontFamily: getFontFamily('SemiBold'), fontWeight: getFontWeight('SemiBold') },

  scrollContent: { paddingBottom: hp('4%'), paddingTop: hp('1%') },

  card: {
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    borderRadius: wp('4%'),
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.15,
    shadowRadius: 4,
  },

  imageContainer: { position: 'relative', width: '100%', height: hp('20%') },
  image: { width: '100%', height: '100%' },

  productHeartWrapper: {
    position: 'absolute',
    top: hp('1.5%'),
    right: wp('4%'),
    borderRadius: wp('5%'),
    padding: wp('2%'),
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 1 }, shadowRadius: 2 },
      android: { elevation: 3 },
    }),
  },
  heartIcon: { width: wp('4%'), height: wp('4%') },

  contentBox: { paddingHorizontal: wp('4%'), paddingVertical: hp('1.5%') },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp('0.8%') },
  title: { fontSize: wp('5.2%'), flex: 1, marginRight: wp('2%'), fontFamily: getFontFamily('Bold'), fontWeight: getFontWeight('Bold') },

  productRatingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: wp('2.5%'), paddingVertical: hp('0.5%'), borderRadius: wp('3%') },
  starIcon: { width: wp('3%'), height: wp('3%'), marginRight: wp('1%'), tintColor: '#FFFFFF' },
  ratingText: { color: '#FFFFFF', fontSize: wp('3%'), fontFamily: getFontFamily('SemiBold'), fontWeight: getFontWeight('SemiBold') },

  row: { flexDirection: 'row', alignItems: 'center', marginVertical: hp('0.5%') },
  smallIcon: { width: wp('3.5%'), height: wp('3.5%') },
  address: { marginLeft: wp('1.5%'), fontFamily: getFontFamily('Medium'), fontWeight: getFontWeight('Medium'), fontSize: wp('3.2%'), flex: 1 },

  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%'), marginBottom: hp('1%'), justifyContent: 'space-between' },
  tag: { fontFamily: getFontFamily('Medium'), fontWeight: getFontWeight('Medium'), fontSize: wp('3.2%') },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  iconSmallGreen: { width: wp('3.2%'), height: wp('3.2%'), tintColor: '#259E29' },
  infoText: { fontSize: wp('3.1%'), marginLeft: wp('1%'), fontFamily: getFontFamily('Medium'), fontWeight: getFontWeight('Medium') },

  menuButton: { marginTop: hp('1%'), borderRadius: wp('3%'), paddingVertical: hp('1.3%'), alignItems: 'center' },
  menuText: { color: '#FFFFFF', fontSize: wp('3.8%'), fontFamily: getFontFamily('Bold'), fontWeight: getFontWeight('Bold') },
});

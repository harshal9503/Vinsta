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
  Platform,
  Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';

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
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Bistro Excellence',
      image: require('../../../../assets/r1.png'),
      rating: 4.4,
      address: 'Near MC College, Barpeta Town',
      type: 'FAST FOOD',
      distance: '590.0 m',
      time: '25 min',
    },
    {
      id: 2,
      name: 'Bistro Excellence',
      image: require('../../../../assets/r2.png'),
      rating: 4.4,
      address: 'Near MC College, Barpeta Town',
      type: 'FAST FOOD',
      distance: '590.0 m',
      time: '25 min',
    },
    {
      id: 3,
      name: 'Bistro Excellence',
      image: require('../../../../assets/r3.png'),
      rating: 4.4,
      address: 'Near MC College, Barpeta Town',
      type: 'FAST FOOD',
      distance: '590.0 m',
      time: '25 min',
    },
  ];

  const handleHeartPressWithVibration = (id: number) => {
    Vibration.vibrate(50);
    setLikedIds(prev =>
      prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id],
    );
  };

  const handleViewMenuPress = (restaurant: Restaurant) => {
    navigation.navigate('ViewMenu', { restaurant });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../../../assets/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Subscription</Text>

        {/* Spacer for right side */}
        <View style={{ width: wp('6%') }} />
      </View>

      {/* Subtitle */}
      <View style={styles.subtitleContainer}>
        <Image
          source={require('../../../../assets/location3.png')}
          style={styles.locationIcon}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Nearby restaurant’s for subscription</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {restaurants.map(item => {
          const isLiked = likedIds.includes(item.id);
          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />

                {/* Heart Icon over image */}
                <TouchableOpacity
                  style={[
                    styles.heartBtn,
                    isLiked ? styles.heartBtnFilled : styles.heartBtnBack,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => handleHeartPressWithVibration(item.id)}
                >
                  <Image
                    source={
                      isLiked
                        ? require('../../../../assets/heartfill.png')
                        : require('../../../../assets/heart.png')
                    }
                    style={[
                      styles.heartIcon,
                      !isLiked && styles.heartIconWhite,
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.contentBox}>
                <View style={styles.rowBetween}>
                  <Text style={styles.title}>{item.name}</Text>

                  {/* Rating positioned inside content */}
                  <View style={styles.ratingContainer}>
                    <Image
                      source={require('../../../../assets/star.png')}
                      style={styles.starIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>

                {/* Address */}
                <View style={styles.row}>
                  <Image
                    source={require('../../../../assets/location1.png')}
                    style={styles.smallIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.address}>{item.address}</Text>
                </View>

                {/* Info Row */}
                <View style={styles.infoRow}>
                  <Text style={styles.tag}>{item.type}</Text>

                  <View style={styles.infoItem}>
                    <Image
                      source={require('../../../../assets/location1.png')}
                      style={styles.iconSmallGreen}
                      resizeMode="contain"
                    />
                    <Text style={styles.infoText}>{item.distance}</Text>
                  </View>

                  <View style={styles.infoItem}>
                    <Image
                      source={require('../../../../assets/clock.png')}
                      style={styles.iconSmallGreen}
                      resizeMode="contain"
                    />
                    <Text style={styles.infoText}>{item.time}</Text>
                  </View>
                </View>

                {/* Button */}
                <TouchableOpacity
                  style={styles.menuButton}
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: hp('6%'),
    paddingBottom: hp('1%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: wp('1%'),
  },
  backIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  headerTitle: {
    fontSize: wp('5%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginTop: hp('0.5%'), // align top with back icon
  },

  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  },
  locationIcon: {
    width: wp('5%'),
    height: wp('5%'),
  },
  subtitle: {
    marginLeft: wp('2%'),
    fontSize: wp('3.6%'),
    color: '#000',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  scrollContent: {
    paddingBottom: hp('4%'),
    paddingTop: hp('1%'),
  },

  /* CARD */
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    borderRadius: wp('4%'),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.15,
    shadowRadius: 4,
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    height: hp('20%'),
  },

  image: {
    width: '100%',
    height: '100%',
  },

  heartBtn: {
    position: 'absolute',
    top: hp('1.5%'),
    right: wp('4%'),
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  heartBtnBack: {
    backgroundColor: COLORS.primary,
  },
  heartBtnFilled: {
    backgroundColor: '#FFFFFF',
  },
  heartIcon: {
    width: wp('4.5%'),
    height: wp('4.5%'),
  },
  heartIconWhite: {
    tintColor: '#FFFFFF',
  },

  contentBox: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: '#FFFFFF',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.8%'),
  },

  title: {
    fontSize: wp('5.2%'),
    color: '#000',
    flex: 1,
    marginRight: wp('2%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%'),
  },
  starIcon: {
    width: wp('3%'),
    height: wp('3%'),
    marginRight: wp('1%'),
    tintColor: '#FFFFFF',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: wp('3%'),
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.5%'),
  },

  smallIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
  },

  address: {
    color: '#555',
    marginLeft: wp('1.5%'),
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    fontSize: wp('3.2%'),
    flex: 1,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5%'),
    marginBottom: hp('1%'),
    justifyContent: 'space-between',
  },

  tag: {
    color: '#000',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    fontSize: wp('3.2%'),
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconSmallGreen: {
    width: wp('3.2%'),
    height: wp('3.2%'),
    tintColor: '#259E29',
  },

  infoText: {
    fontSize: wp('3.1%'),
    color: '#000',
    marginLeft: wp('1%'),
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  menuButton: {
    marginTop: hp('1%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('3%'),
    paddingVertical: hp('1.3%'),
    alignItems: 'center',
  },

  menuText: {
    color: '#FFFFFF',
    fontSize: wp('3.8%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});

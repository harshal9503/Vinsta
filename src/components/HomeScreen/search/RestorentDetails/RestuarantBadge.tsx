import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';

const RestuarantBadge = () => {
  return (
    <View style={styles.curvedSection}>
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../../../../assets/be.png')}
            style={styles.logo}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.mapWrapper}>
        <Image
          source={require('../../../../assets/map.png')}
          style={styles.mapIcon}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.resName,
          {
            fontFamily: getFontFamily('Bold'),
            fontWeight: getFontWeight('Bold'),
          },
        ]}
      >
        Bistro Excellence
      </Text>

      <View style={styles.locationRow}>
        <Image
          source={require('../../../../assets/location1.png')}
          style={styles.locIcon}
        />
        <Text
          style={[
            styles.locationText,
            {
              fontFamily: getFontFamily('Medium'),
              fontWeight: getFontWeight('Medium'),
            },
          ]}
        >
          Near MC College, Barpeta Town
        </Text>
      </View>

      <View style={styles.statsRow}>
        <Image
          source={require('../../../../assets/leaf.png')}
          style={styles.statIcon}
        />
        <Text
          style={[
            styles.statText,
            {
              fontFamily: getFontFamily('Medium'),
              fontWeight: getFontWeight('Medium'),
            },
          ]}
        >
          590.0 m
        </Text>

        <Image
          source={require('../../../../assets/clockk.png')}
          style={styles.statIcon}
        />
        <Text
          style={[
            styles.statText,
            {
              fontFamily: getFontFamily('Medium'),
              fontWeight: getFontWeight('Medium'),
            },
          ]}
        >
          25 min
        </Text>

        <Image
          source={require('../../../../assets/order.png')}
          style={styles.statIcon}
        />
        <Text
          style={[
            styles.statText,
            {
              fontFamily: getFontFamily('Medium'),
              fontWeight: getFontWeight('Medium'),
            },
          ]}
        >
          5000+ Order
        </Text>
      </View>
    </View>
  );
};

export default RestuarantBadge;

const styles = StyleSheet.create({
  curvedSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    marginTop: hp('-2.2%'),
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingBottom: hp('1.2%'),
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 4,
  },

  logoWrapper: {
    marginTop: hp('-3.8%'),
    marginBottom: hp('1%'),
    alignSelf: 'center',
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
    resizeMode: 'contain',
  },

  mapWrapper: {
    position: 'absolute',
    top: hp('1.3%'),
    right: wp('4%'),
    zIndex: 2,
  },

  mapIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },

  resName: {
    fontSize: hp('3%'),
    color: '#222',
    marginTop: hp('0%'),
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.6%'),
    marginBottom: hp('0.3%'),
  },

  locIcon: {
    width: wp('3.5%'),
    height: wp('3.5%'),
    marginRight: wp('1.5%'),
  },

  locationText: {
    color: '#888',
    fontSize: hp('1.5%'),
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.6%'),
    justifyContent: 'center',
    gap: wp('3%'),
  },

  statIcon: {
    width: wp('3.2%'),
    height: wp('3.2%'),
    marginRight: wp('0.8%'),
  },

  statText: {
    fontSize: hp('1.4%'),
    color: '#222',
    marginRight: wp('2.5%'),
  },
});
// File: screens/Onboarding1.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const Onboarding1 = ({ navigation }: any) => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.secondary }}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Onboarding1.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Quick Food Delivery</Text>
        <Text style={styles.description}>
          Craving something tasty? Vinsta brings your favorite meals from top
          restaurants straight to your door—quick, fresh, and hassle-free, so
          you can enjoy great food anytime, anywhere.
        </Text>
      </View>

      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Onboarding2')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.07, // more top margin
  },
  imageContainer: {
    width: width * 0.9,
    height: height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.05,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: width * 0.08,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  title: {
    fontSize: width * 0.065,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: width * 0.04,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 22,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.03,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.010,
    paddingHorizontal: width * 0.10, // smaller width
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginRight: width * 0.08,
    marginTop: height * 0.04,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: COLORS.secondary,
    fontSize: width * 0.048,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Onboarding1;

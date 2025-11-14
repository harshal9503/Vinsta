// src/screens/SplashScreen.js

import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { COLORS } from '../theme/colors';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); //Home SignIn
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Splash.png')}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;

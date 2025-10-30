import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Home</Text>
    {/* Add home content here */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default HomeScreen;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const MyOrder = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.orderTitle}>Order #12345</Text>
          <Text style={styles.text}>Status: Delivered</Text>
          <Text style={styles.text}>Date: 25 Oct 2025</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.orderTitle}>Order #67890</Text>
          <Text style={styles.text}>Status: In Transit</Text>
          <Text style={styles.text}>Date: 27 Oct 2025</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  orderTitle: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  text: {
    fontSize: width * 0.037,
    color: '#333',
  },
});

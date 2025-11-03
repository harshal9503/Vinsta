import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const Subscription = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Subscription</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Active Plan</Text>
          <Text style={styles.text}>Premium Membership</Text>
          <Text style={styles.text}>Valid until: 30 Nov 2025</Text>
        </View>

        <TouchableOpacity style={styles.renewButton}>
          <Text style={styles.renewButtonText}>Renew Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Subscription;

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
    marginBottom: 20,
    elevation: 3,
  },
  title: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 5,
  },
  text: {
    fontSize: width * 0.037,
    color: '#333',
  },
  renewButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  renewButtonText: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
});

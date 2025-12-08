import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';
import { ThemeContext } from '../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const MyOrder = () => {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        translucent
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>
          My Orders
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.orderTitle, { color: theme.text }]}>
            Order #12345
          </Text>
          <Text style={[styles.text, { color: theme.textSecondary }]}>
            Status: Delivered
          </Text>
          <Text style={[styles.text, { color: theme.textSecondary }]}>
            Date: 25 Oct 2025
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.orderTitle, { color: theme.text }]}>
            Order #67890
          </Text>
          <Text style={[styles.text, { color: theme.textSecondary }]}>
            Status: In Transit
          </Text>
          <Text style={[styles.text, { color: theme.textSecondary }]}>
            Date: 27 Oct 2025
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 22,
    height: 22,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontFamily: 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  orderTitle: {
    fontSize: width * 0.04,
    marginBottom: 4,
    fontFamily: 'Figtree-SemiBold',
  },
  text: {
    fontSize: width * 0.037,
    fontFamily: 'Figtree-Regular',
  },
});

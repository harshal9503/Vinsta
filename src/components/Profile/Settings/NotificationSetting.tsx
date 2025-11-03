import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
const { width, height } = Dimensions.get('window');

const NotificationSetting = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
<Image source={require('../../../assets/back.png')} style={styles.backIcon} />        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Setting</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Manage your notifications and alerts.</Text>
      </View>
    </View>
  );
};

export default NotificationSetting;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backIcon: { width: 22, height: 22, resizeMode: 'contain', tintColor: COLORS.text },
  headerTitle: { fontSize: width * 0.045, fontWeight: '700', color: COLORS.text },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  text: { fontSize: width * 0.04, color: COLORS.gray, textAlign: 'center' },
});

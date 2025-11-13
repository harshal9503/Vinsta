import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';

const { width, height } = Dimensions.get('window');

const SoundAndVoice = () => {
  const navigation = useNavigation<any>();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [notificationSound, setNotificationSound] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const soundOptions = [
    {
      id: 1,
      title: 'App Sounds',
      description: 'Enable sounds for app interactions',
      value: soundEnabled,
      onValueChange: setSoundEnabled,
    },
    {
      id: 2,
      title: 'Voice Guidance',
      description: 'Get voice guidance for navigation',
      value: voiceGuidance,
      onValueChange: setVoiceGuidance,
    },
    {
      id: 3,
      title: 'Notification Sound',
      description: 'Play sound for notifications',
      value: notificationSound,
      onValueChange: setNotificationSound,
    },
    {
      id: 4,
      title: 'Haptic Feedback',
      description: 'Vibrate on touch interactions',
      value: hapticFeedback,
      onValueChange: setHapticFeedback,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sound & Voice</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Audio Settings</Text>
        <Text style={styles.sectionDescription}>
          Customize your app's sound and voice preferences
        </Text>

        {soundOptions.map((item) => (
          <View key={item.id} style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingDescription}>{item.description}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor={item.value ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        ))}

        {/* Volume Control */}
        {/* <View style={styles.volumeSection}>
          <Text style={styles.volumeTitle}>Volume Level</Text>
          <View style={styles.volumeSlider}>
            <View style={[styles.volumeFill, { width: '70%' }]} />
          </View>
          <Text style={styles.volumeText}>70%</Text>
        </View> */}

        {/* Test Sound Button */}
        {/* <TouchableOpacity style={styles.testButton}>
          <Text style={styles.testButtonText}>Test Sound</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',
    fontFamily : 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    fontFamily : 'Figtree-Bold',
  },
  sectionDescription: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: 25,
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingLeft: {
    flex: 1,
  },
  settingTitle: {
    fontSize: width * 0.038,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    fontFamily : 'Figtree-SemiBold',
  },
  settingDescription: {
    fontSize: width * 0.03,
    color: '#666',
    fontFamily : 'Figtree-Regular',
    fontWeight  :'400'
  },
  volumeSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  volumeTitle: {
    fontSize: width * 0.038,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    fontFamily : 'Figtree-SemiBold',
  },
  volumeSlider: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 8,
  },
  volumeFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  volumeText: {
    fontSize: width * 0.032,
    color: '#666',
    textAlign: 'right',
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
  testButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  testButtonText: {
    color: COLORS.secondary,
    fontSize: width * 0.038,
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
});

export default SoundAndVoice;
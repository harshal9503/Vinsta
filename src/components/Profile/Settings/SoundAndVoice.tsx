import React, { useContext, useState } from 'react';
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
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const SoundAndVoice = () => {
  const navigation = useNavigation<any>();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [notificationSound, setNotificationSound] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const {theme} = useContext(ThemeContext);

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
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor : theme.text}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.textSecondary}]}>Sound & Voice</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle,{color : theme.textSecondary}]}>Audio Settings</Text>
        <Text style={[styles.sectionDescription,{color : theme.textSecondary}]}>
          Customize your app's sound and voice preferences
        </Text>

        {soundOptions.map((item) => (
          <View key={item.id} style={[styles.settingRow,{backgroundColor :theme.background}]}>
            <View style={styles.settingLeft}>
              <Text style={[styles.settingTitle,{color : theme.textSecondary}]}>{item.title}</Text>
              <Text style={[styles.settingDescription,{color : theme.textSecondary}]}>{item.description}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor={item.value ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        ))}
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
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#616161',
    fontFamily : 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#616161',
    marginBottom: 8,
    fontFamily : 'Figtree-Bold',
  },
  sectionDescription: {
    fontSize: width * 0.035,
    color: '#616161',
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
    color: '#616161',
    marginBottom: 4,
    fontFamily : 'Figtree-SemiBold',
  },
  settingDescription: {
    fontSize: width * 0.03,
    color: '#616161',
    fontFamily : 'Figtree-Regular',
    fontWeight  :'400'
  },
});

export default SoundAndVoice;
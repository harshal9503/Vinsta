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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { ThemeContext } from '../../../theme/ThemeContext';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

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
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor : theme.text}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : theme.text}]}>Sound & Voice</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle,{color : theme.text}]}>Audio Settings</Text>
        <Text style={[styles.sectionDescription,{color : theme.text}]}>
          Customize your app's sound and voice preferences
        </Text>

        {soundOptions.map((item) => (
          <View key={item.id} style={[styles.settingRow,{backgroundColor :theme.cardBackground}]}>
            <View style={styles.settingLeft}>
              <Text style={[styles.settingTitle,{color : theme.text}]}>{item.title}</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? height * 0.07 : height * 0.07,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: width * 0.035,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
    marginBottom: 25,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  settingLeft: {
    flex: 1,
  },
  settingTitle: {
    fontSize: width * 0.038,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: width * 0.03,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
});

export default SoundAndVoice;
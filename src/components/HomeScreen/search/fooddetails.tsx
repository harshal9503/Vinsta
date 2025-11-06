import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const Settings = () => {
  const navigation = useNavigation<any>();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupAction, setPopupAction] = useState<null | (() => void)>(null);

  const openPopup = (message: string, onConfirm: () => void) => {
    setPopupMessage(message);
    setPopupAction(() => onConfirm);
    setShowPopup(true);
  };

  const settingsOptions = [
    { id: 1, label: 'Account Setting', icon: require('../../assets/ac.png') },
    {
      id: 2,
      label: 'Sound’s and voice',
      icon: require('../../assets/sound.png'),
    },
    { id: 3, label: 'Language', icon: require('../../assets/language.png') },
    {
      id: 4,
      label: 'Notification Setting',
      icon: require('../../assets/notisetting.png'),
    },
    {
      id: 5,
      label: 'Account management',
      icon: require('../../assets/acmanage.png'),
    },
    { id: 6, label: 'About us', icon: require('../../assets/aboutus.png') },
    { id: 7, label: 'Share app', icon: require('../../assets/share1.png') },
  ];

const fooddetails = () => {
  return (
    <View>
      <Text>fooddetails</Text>
    </View>
  )
}

export default fooddetails

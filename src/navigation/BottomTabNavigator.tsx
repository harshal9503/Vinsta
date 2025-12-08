// ==============================================
// FILE: navigation/BottomTabNavigator.tsx
// ==============================================

import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../components/HomeScreen/HomeScreens/HomeScreen';
import MyOrders from '../components/MyOrders/MyOrder/myorders';
import Wishlist from '../components/Wishlist/wishlist';
import Notification from '../components/Notification/notification';
import Profile from '../components/Profile/profile';
import { ThemeContext } from '../theme/ThemeContext';

import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ routeName, color, size }) => {
  let iconSource;

  switch (routeName) {
    case 'Home':
      iconSource = require('../assets/home.png');
      break;
    case 'My Orders':
      iconSource = require('../assets/myorders.png');
      break;
    case 'Wishlist':
      iconSource = require('../assets/wishlist1.png');
      break;
    case 'Notification':
      iconSource = require('../assets/notification.png');
      break;
    case 'Profile':
      iconSource = require('../assets/profile.png');
      break;
  }

  return (
    <Image
      source={iconSource}
      style={{
        width: size * 1.1, // 🔥 larger icons
        height: size * 1.1, // 🔥 larger icons
        tintColor: color, // 🔥 Icons keep their tint color (same as before)
      }}
      resizeMode="contain"
    />
  );
};

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);

  const getScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => (
      <TabBarIcon routeName={route.name} color={color} size={size} />
    ),

    // 🔥 FIXED — Text colors updated
    tabBarLabelStyle: {
      fontSize: 12,
      marginBottom: 6,
      fontFamily: 'Figtree-Bold',
      includeFontPadding: false,
      letterSpacing: 0.2,
      fontWeight: Platform.OS === 'ios' ? '600' : undefined,
    },

    // 🔥 FIXED — Active text color = primary (same as before)
    // 🔥 FIXED — Inactive text color = #999999 (NEW - gray color as requested)
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: '#999999', // 🔥 CHANGED — Fixed gray color #999999 for unselected tabs

    tabBarStyle: {
      backgroundColor: theme.background,
      height: 80 + insets.bottom * 0.3,
      paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
      paddingTop: 10,
    },

    headerShown: false,
  });

  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Orders" component={MyOrders} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

// ==============================================
// FILE: navigation/BottomTabNavigator.tsx
// ==============================================

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 🔥 UPDATED — ensures correct bottom spacing

import HomeScreen from '../components/HomeScreen/HomeScreens/HomeScreen';
import MyOrders from '../components/MyOrders/myorders';
import Wishlist from '../components/Wishlist/wishlist';
import Notification from '../components/Notification/notification';
import Profile from '../components/Profile/profile';

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
        width: size * 1.1,   // 🔥 UPDATED — larger icons
        height: size * 1.1,  // 🔥 UPDATED — larger icons
        tintColor: color,
      }}
      resizeMode="contain"
    />
  );
};

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets(); // 🔥 UPDATED — fix for Android nav keys

  const getScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => (
      <TabBarIcon routeName={route.name} color={color} size={size} />
    ),

    tabBarLabelStyle: {
      fontSize: 12,                // 🔥 UPDATED — increased text size
      marginBottom: 6,                // 🔥 UPDATED — better spacing
      fontFamily: 'Figtree-Bold',
      includeFontPadding: false,
      letterSpacing: 0.2,
      fontWeight: Platform.OS === 'ios' ? '600' : undefined,
    },

    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: '#000000d3',

    tabBarStyle: {
      backgroundColor: COLORS.secondary,

      height: 80 + insets.bottom * 0.3,   // 🔥 UPDATED — taller bar + safe-area support
      paddingBottom: insets.bottom > 0 ? insets.bottom : 12, // 🔥 UPDATED — floats above nav keys
      paddingTop: 10,                      // 🔥 UPDATED — better spacing
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

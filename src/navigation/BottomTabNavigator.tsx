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
        width: size * 1.1,
        height: size * 1.1,
        tintColor: color, // 🔥 icon color theme-based (provided below)
      }}
      resizeMode="contain"
    />
  );
};

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext); // 🔥 USING THEME

  const getScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => (
      <TabBarIcon routeName={route.name} color={color} size={size} />
    ),

    tabBarLabelStyle:({})=> ({
      fontSize: 12,
      marginBottom: 6,
      fontFamily: 'Figtree-Bold',
      fontWeight : '700',
      includeFontPadding: false,
      letterSpacing: 0.2,
      fontWeight: Platform.OS === 'ios' ? '600' : undefined,
      color: color, // 🔥 LABEL TEXT COLOR
    }),

    tabBarActiveTintColor: COLORS.primary, // 🔥 ACTIVE TAB COLOR
    tabBarInactiveTintColor: theme.text ?? '#8c8c8c', // 🔥 INACTIVE TAB COLOR

    tabBarStyle: {
      backgroundColor: theme.background, // 🔥 BACKGROUND THEME BASED
      height: 80 + insets.bottom * 0.3,
      paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
      paddingTop: 10,
      borderTopWidth: 0,
      // elevation: 12,
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

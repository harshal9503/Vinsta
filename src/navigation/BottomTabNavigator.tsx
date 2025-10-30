import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../components/HomeScreen/HomeScreen';
import MyOrders from '../components/MyOrders/myorders';
import Wishlist from '../components/Wishlist/wishlist';
import Notification from '../components/Notification/notification';
import Profile from '../components/Profile/profile';
import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
  routeName: string;
  color: string;
  size: number;
};

const TabBarIcon = ({ routeName, color, size }: TabBarIconProps) => {
  let iconSource: any;

  switch (routeName) {
    case 'Home':
      iconSource = require('../assets/home.png');
      break;
    case 'My Orders':
      iconSource = require('../assets/myorders.png');
      break;
    case 'Wishlist':
      iconSource = require('../assets/wishlist.png');
      break;
    case 'Notification':
      iconSource = require('../assets/notification.png');
      break;
    case 'Profile':
      iconSource = require('../assets/profile.png');
      break;
    default:
      iconSource = null;
  }

  return iconSource ? (
    <Image
      source={iconSource}
      style={{
        width: size * 0.85, // Slightly smaller icons
        height: size * 0.85,
        tintColor: color,
      }}
      resizeMode="contain"
    />
  ) : null;
};


import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { RouteProp, ParamListBase } from '@react-navigation/native';

const getScreenOptions = ({ route }: { route: RouteProp<ParamListBase, string> }): BottomTabNavigationOptions => ({
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <TabBarIcon
      routeName={route.name}
      color={color}
      size={size}
    />
  ),
  tabBarActiveTintColor: COLORS.primary,
  tabBarInactiveTintColor: '#616161',
  tabBarStyle: { backgroundColor: COLORS.secondary },
  headerShown: false,
  tabBarLabelStyle: { fontSize: 12, marginBottom: 3 },
});

const BottomTabNavigator = () => {
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

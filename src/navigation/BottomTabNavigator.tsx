import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../components/HomeScreen/HomeScreen';
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
        resizeMode: 'contain',
      }}
    />
  ) : null;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <TabBarIcon
            routeName={route.name}
            color={color as string}
            size={size as number}
          />
        ),
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#616161',
        tabBarStyle: { backgroundColor: COLORS.secondary },
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12, marginBottom: 3 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Orders" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={HomeScreen} />
      <Tab.Screen name="Notification" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

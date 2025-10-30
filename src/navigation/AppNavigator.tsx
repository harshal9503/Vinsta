// This file will contain navigation setup for the app
// Placeholder for navigation structure
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../AuthScreens/SplashScreen';
import Onboarding1 from '../AuthScreens/Onboarding1';
import Onboarding2 from '../AuthScreens/Onboarding2';
import Onboarding3 from '../AuthScreens/Onboarding3';
import SignInScreen from '../AuthScreens/SignInScreen';
import OtpVerificationScreen from '../AuthScreens/OtpVerificationScreen';
import WelcomeScreen from '../AuthScreens/WelcomeScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();


const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
  <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

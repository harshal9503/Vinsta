import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import all components with proper PascalCase naming
import SplashScreen from '../AuthScreens/SplashScreen';
import Onboarding1 from '../AuthScreens/Onboarding1';
import Onboarding2 from '../AuthScreens/Onboarding2';
import Onboarding3 from '../AuthScreens/Onboarding3';
import SignInScreen from '../AuthScreens/SignInScreen';
import OtpVerificationScreen from '../AuthScreens/OtpVerificationScreen';
import WelcomeScreen from '../AuthScreens/WelcomeScreen';
import BottomTabNavigator from './BottomTabNavigator';

// Profile components
import ProfileEdit from '../components/Profile/profileEdit';
import Favourite from '../components/Profile/favourite';
import MyOffer from '../components/Profile/myOffer';
import Refer from '../components/Profile/refer';
import Support from '../components/Profile/support';
import Settings from '../components/Profile/Settings/settings';
import Help from '../components/Profile/help';
import Address from '../components/Profile/address';
import MyOrder from '../components/Profile/myOrder';
import Subscription from '../components/Profile/subscription';
import Wallet from '../components/Profile/wallet';

// Settings components
import AccountManagement from '../components/Profile/Settings/AccountManagement';
import AccountSetting from '../components/Profile/Settings/AccountSetting';
import SoundAndVoice from '../components/Profile/Settings/SoundAndVoice';   
import Language from '../components/Profile/Settings/Language';
import NotificationSetting from '../components/Profile/Settings/NotificationSetting';
import ShareApp from '../components/Profile/Settings/ShareApp';
import AboutUs from '../components/Profile/Settings/AboutUs';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      {/* Auth Screens */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      
      {/* Profile Screens */}
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="Favourite" component={Favourite} />
      <Stack.Screen name="MyOffer" component={MyOffer} />
      <Stack.Screen name="Refer" component={Refer} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="Wallet" component={Wallet} />
      
      {/* Settings Screens */}
      <Stack.Screen name="AccountManagement" component={AccountManagement} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="SoundAndVoice" component={SoundAndVoice} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="NotificationSetting" component={NotificationSetting} />
      <Stack.Screen name="ShareApp" component={ShareApp} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      
      {/* Main App */}
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Auth Screens
import SplashScreen from '../AuthScreens/SplashScreen';
import Onboarding1 from '../AuthScreens/Onboarding1';
import Onboarding2 from '../AuthScreens/Onboarding2';
import Onboarding3 from '../AuthScreens/Onboarding3';
import SignInScreen from '../AuthScreens/SignInScreen';
import OtpVerificationScreen from '../AuthScreens/OtpVerificationScreen';
import WelcomeScreen from '../AuthScreens/WelcomeScreen';
import BottomTabNavigator from './BottomTabNavigator';

// Profile
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
import Wallet from '../components/Profile/Wallet/wallet';

// Settings
import AccountManagement from '../components/Profile/Settings/AccountManagement';
import AccountSetting from '../components/Profile/Settings/AccountSetting';
import SoundAndVoice from '../components/Profile/Settings/SoundAndVoice';
import Language from '../components/Profile/Settings/Language';
import NotificationSetting from '../components/Profile/Settings/NotificationSetting';
import ShareApp from '../components/Profile/Settings/ShareApp';
import AboutUs from '../components/Profile/Settings/AboutUs';

// Home
import Search from '../components/HomeScreen/search/search';
import restaurentDetails from '../components/HomeScreen/search/RestorentDetails/restaurentDetails';
import fooddetails from '../components/HomeScreen/search/fooddetails';
import todayOfferView from '../components/HomeScreen/todayOfferView';
import featuredRestrorents from '../components/HomeScreen/featuredRestrorents';
import bestBurger from '../components/HomeScreen/bestBurger';
import Cart from '../components/HomeScreen/Cart';
import DarkMode from '../components/Profile/DarkMode';
import PrivacyPolicy from '../components/Profile/Settings/PrivacyPolicy';
import TermsConditions from '../components/Profile/Settings/TermsConditions';
import MenuScreen from '../components/HomeScreen/search/MenuScreen';
import ChangeLocation from '../components/HomeScreen/ChangeLocation';
import PaymentScreen from '../Payment/PaymentScreen';
import PaymentSuccess from '../Payment/PaymentSuccess';
import TrackOrder from '../components/MyOrders/TrackOrder';
import chat from '../components/MyOrders/chat';
import OrderDetail from '../components/MyOrders/OrderDetail';
import CancelOrder from '../components/MyOrders/CancelOrder';
import TopUp from '../components/Profile/Wallet/TopUp';
import TransactionHistory from '../components/Profile/Wallet/TransactionHistory';
import EReceipt from '../components/Profile/Wallet/EReceipt';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
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
      <Stack.Screen name="DarkMode" component={DarkMode} />
      <Stack.Screen name="ChangeLocation" component={ChangeLocation} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen name="chat" component={chat} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="CancelOrder" component={CancelOrder} />
      <Stack.Screen name="TopUp" component={TopUp} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      <Stack.Screen name="EReceipt" component={EReceipt} />

      {/* Settings Screens */}
      <Stack.Screen name="AccountManagement" component={AccountManagement} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="SoundAndVoice" component={SoundAndVoice} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
      <Stack.Screen name="ShareApp" component={ShareApp} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      {/* Home */}
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="restaurentDetails" component={restaurentDetails} />
      <Stack.Screen name="fooddetails" component={fooddetails} />
      <Stack.Screen name="todayOfferView" component={todayOfferView} />
      <Stack.Screen
        name="featuredRestrorents"
        component={featuredRestrorents}
      />
      <Stack.Screen name="bestBurger" component={bestBurger} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />

      {/* Main App */}
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

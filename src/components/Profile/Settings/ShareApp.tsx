import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import font from '../../../assets/fonts';
import { ThemeContext } from '../../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const ShareApp = () => {
  const navigation = useNavigation<any>();
  const {theme} = useContext(ThemeContext);

  const shareOptions = [
    {
      id: 1,
      name: 'WhatsApp',
      icon: require('../../../assets/whatsapp.png'),
    },
    {
      id: 2,
      name: 'Facebook',
      icon: require('../../../assets/facebook.png'),
    },
    {
      id: 3,
      name: 'Instagram',
      icon: require('../../../assets/instagram.png'),
    },
    {
      id: 4,
      name: 'Twitter',
      icon: require('../../../assets/twitter.png'),
    },
    {
      id: 5,
      name: 'Email',
      icon: require('../../../assets/email.png'),
    },
    {
      id: 6,
      name: 'Telegram',
      icon: require('../../../assets/telegram.png'),
    },
  ];

  const shareMessage = `Check out this amazing app! Download it now and enjoy great food delivery service. \n\nDownload Link: https://yourapp.com/download`;

  const handleShare = async (platform: string) => {
    try {
      await Share.share({
        message: shareMessage,
        title: `Share on ${platform}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share the app');
    }
  };

  const referralCode = 'APP2024FRIEND';

  const copyToClipboard = (text: string) => {
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const firstRowOptions = shareOptions.slice(0, 3);
  const secondRowOptions = shareOptions.slice(3);

  return (
    <View style={[styles.container,{backgroundColor : theme.background}]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.header,{backgroundColor : theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={[styles.backIcon,{tintColor : '#000000'}]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{color : '#616161'}]}>Share App</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image 
            source={require('../../../assets/Splash.png')} 
            style={styles.heroImage} 
          />
          <Text style={[styles.heroTitle,{color : '#616161'}]}>Share the Love!</Text>
          <Text style={[styles.heroDescription,{color : '#616161'}]}>
            Share this app with your friends and family and help them discover amazing food delivery service.
          </Text>
        </View>

        {/* Referral Code */}
        <View style={[styles.referralSection,{backgroundColor  :theme.background}]}>
          <Text style={[styles.referralTitle,{color : '#616161'}]}>Your Referral Code</Text>
          <TouchableOpacity 
            style={styles.referralCodeBox}
            onPress={() => copyToClipboard(referralCode)}
          >
            <Text style={styles.referralCode}>{referralCode}</Text>
            <Image 
              source={require('../../../assets/copy.png')} 
              style={[styles.copyIcon,{tintColor:COLORS.text}]} 
            />
          </TouchableOpacity>
          <Text style={[styles.referralNote,{color : '#616161'}]}>
            Share this code with your friends for special rewards!
          </Text>
        </View>

        {/* Share Options */}
        <View style={styles.shareSection}>
          <Text style={[styles.shareTitle,{color : '#616161'}]}>Share Via</Text>
          
          {/* First Row - 3 icons */}
          <View style={styles.shareRow}>
            {firstRowOptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.shareOption}
                onPress={() => handleShare(item.name)}
              >
                <View style={styles.shareIconContainer}>
                  <Image source={item.icon} style={styles.shareIcon} />
                </View>
                <Text style={[styles.shareOptionText,{color : '#616161'}]}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Second Row - 2 icons centered */}
          <View style={styles.shareRow}>
            {secondRowOptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.shareOption}
                onPress={() => handleShare(item.name)}
              >
                <View style={styles.shareIconContainer}>
                  <Image source={item.icon} style={styles.shareIcon} />
                </View>
                <Text style={[styles.shareOptionText,{color : '#616161'}]}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Benefits */}
        <View style={[styles.benefitsSection,{backgroundColor  :theme.background}]}>
          <Text style={[styles.benefitsTitle,{color : '#616161'}]}>Referral Benefits</Text>
          <View style={[styles.benefitsList,{backgroundColor  :theme.background}]}>
            <View style={styles.benefitItem}>
              <Image source={require('../../../assets/tick.png')} style={[styles.benefitIcon,{tintColor:COLORS.text}]} />
              <View style={styles.benefitText}>
                <Text style={[styles.benefitTitle,{color : '#616161'}]}>Get $10 Credit</Text>
                <Text style={[styles.benefitDescription,{color : '#616161'}]}>
                  Receive $10 credit when your friend signs up
                </Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Image source={require('../../../assets/tick.png')} style={[styles.benefitIcon,{tintColor:COLORS.text}]} />
              <View style={styles.benefitText}>
                <Text style={[styles.benefitTitle,{color : '#616161'}]}>Friend Gets 20% Off</Text>
                <Text style={[styles.benefitDescription,{color : '#616161'}]}>
                  Your friend gets 20% off on their first order
                </Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Image source={require('../../../assets/tick.png')} style={[styles.benefitIcon,{tintColor:COLORS.text}]} />
              <View style={styles.benefitText}>
                <Text style={[styles.benefitTitle,{color : '#616161'}]}>Exclusive Rewards</Text>
                <Text style={[styles.benefitDescription,{color : '#616161'}]}>
                  Unlock special rewards for multiple referrals
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={[styles.statsSection,{backgroundColor  :theme.background}]}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={[styles.statLabel,{color : '#616161'}]}>Friends Joined</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>$50</Text>
            <Text style={[styles.statLabel,{color : '#616161'}]}>Total Credit Earned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={[styles.statLabel,{color : '#616161'}]}>Available Rewards</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#616161',
    fontFamily : 'Figtree-Bold',
  },
  content: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heroImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: '#616161',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily : 'Figtree-Bold',
  },
  heroDescription: {
    fontSize: width * 0.035,
    color: '#616161',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
  referralSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  referralTitle: {
    fontSize: width * 0.038,
    color: '#616161',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
  referralCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f7ff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 12,
  },
  referralCode: {
    fontSize: width * 0.04,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  copyIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: COLORS.text,
  },
  referralNote: {
    fontSize: width * 0.032,
    color: '#616161',
    textAlign: 'center',
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
  shareSection: {
    marginBottom: 25,
  },
  shareTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
    color: '#616161',
    marginBottom: 16,
    fontFamily : 'Figtree-Bold',
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  shareOption: {
    width: width * 0.28,
    alignItems: 'center',
  },
  shareIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  shareIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  shareOptionText: {
    fontSize: width * 0.032,
    color: '#616161',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily : 'Figtree-Medium',
  },
  benefitsSection: {
    marginBottom: 25,
  },
  benefitsTitle: {
    fontSize: width * 0.04,
    fontWeight: '700',
    color: '#616161',
    marginBottom: 16,
    fontFamily : 'Figtree-Bold',
  },
  benefitsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  benefitIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
    tintColor: COLORS.text,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: width * 0.035,
    color: '#616161',
    marginBottom: 4,
    fontFamily : 'Figtree-SemiBold',
    fontWeight  :'600'
  },
  benefitDescription: {
    fontSize: width * 0.032,
    color: '#616161',
    fontFamily : 'Figtree-Regular',
    fontWeight  :'400'
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: width * 0.05,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
    fontFamily : 'Figtree-Bold',
  },
  statLabel: {
    fontSize: width * 0.028,
    color: '#616161',
    textAlign: 'center',
    fontFamily : 'Figtree-Medium',
    fontWeight  :'500'
  },
});

export default ShareApp;
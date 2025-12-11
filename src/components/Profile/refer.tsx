import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import { COLORS } from '../../theme/colors';
import { ThemeContext } from '../../theme/ThemeContext';
import { getFontFamily, getFontWeight } from '../../utils/fontHelper';

const { width, height } = Dimensions.get('window');

const Refer = () => {
  const navigation = useNavigation<any>();
  const [showPopup, setShowPopup] = useState(false);
  const [invitationCode] = useState('XYJLHG');
  const { theme } = useContext(ThemeContext);

  const handleCopy = () => {
    Clipboard.setString(invitationCode);
    Alert.alert('Copied!', 'Invitation code copied to clipboard');
  };

  const handleShare = async () => {
    try {
      await Share.open({
        message: `Join me on this app! Use my referral code: ${invitationCode}`,
      });
    } catch (err) {
      console.log('Share error:', err);
    }
  };

  const handleInvite = () => {
    Alert.alert('WhatsApp', 'Invite via WhatsApp clicked');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={[styles.backIcon, { tintColor: theme.text }]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textSecondary }]}>Refer to earn</Text>
        <View style={{ width: 22 }} /> {/* Spacer for centering */}
      </View>

      {/* ===== ScrollView ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* ===== Invite Section ===== */}
        <View style={[styles.cardContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Invitation Code</Text>

          {/* Code Box */}
          <View style={styles.codeBox}>
            <Text style={[styles.codeText, { color: theme.textSecondary }]}>{invitationCode}</Text>
            <TouchableOpacity onPress={handleCopy}>
              <Image
                source={require('../../assets/copy.png')}
                style={[styles.iconSmall, { tintColor: COLORS.text }]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}>
              <Image
                source={require('../../assets/share.png')}
                style={[styles.iconSmall, { marginLeft: 10, tintColor: COLORS.text }]}
              />
            </TouchableOpacity>
          </View>

          {/* Invite Button */}
          <TouchableOpacity style={styles.inviteBtn} onPress={handleInvite}>
            <Image
              source={require('../../assets/whatsapp.png')}
              style={styles.whatsappIcon}
            />
            <Text style={[styles.inviteText, { color: theme.background }]}>Invite via whatsapp</Text>
          </TouchableOpacity>

          {/* Info Row */}
          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              How to invite friend's and win award
            </Text>
            <TouchableOpacity onPress={() => setShowPopup(true)}>
              <Image
                source={require('../../assets/questionmark.png')}
                style={[styles.infoIcon, { tintColor: COLORS.primary }]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== Rewards Section ===== */}
        <View style={styles.rewardSection}>
          <TouchableOpacity style={[styles.rewardCard, { backgroundColor: theme.cardBackground }]}>
            <Image
              source={require('../../assets/earned.png')}
              style={styles.rewardIcon}
            />
            <Text style={[styles.rewardText, { color: theme.textSecondary }]}>Earned Reward's</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rewardCard, { backgroundColor: theme.cardBackground }]}>
            <Image
              source={require('../../assets/earned.png')}
              style={styles.rewardIcon}
            />
            <Text style={[styles.rewardText, { color: theme.textSecondary }]}>Track Referral's</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ===== Popup Modal ===== */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={[styles.popupBox, { backgroundColor: theme.background }]}>
            <Text style={[styles.popupTitle, { color: theme.textSecondary }]}>How Referrals Work</Text>
            <Text style={[styles.popupContent, { color: theme.textSecondary }]}>
              {'1. Share your code with friends.\n'}
              {'2. They install the app using your code.\n'}
              {'3. You earn exciting rewards after their first purchase!\n\n'}
              {'Start inviting now and win amazing bonuses 🎁'}
            </Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={[styles.popupButtonText, { color: theme.background }]}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Refer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  /** HEADER **/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.07,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: width * 0.045,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  /** INVITE CARD **/
  cardContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 14,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  label: {
    fontSize: width * 0.037,
    marginBottom: 8,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  codeText: {
    fontSize: width * 0.04,
    letterSpacing: 1,
    flex: 1,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  iconSmall: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  /** INVITE BUTTON **/
  inviteBtn: {
    flexDirection: 'row',
    backgroundColor: '#f57c00',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  whatsappIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  inviteText: {
    color: '#fff',
    fontSize: width * 0.038,
    textTransform: 'capitalize',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  /** INFO **/
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  infoText: {
    flex: 1,
    fontSize: width * 0.033,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  infoIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 8,
  },

  /** REWARD SECTION **/
  rewardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 15,
  },
  rewardCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 2 },
    }),
  },
  rewardIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  rewardText: {
    fontSize: width * 0.036,
    marginTop: 6,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },

  /** POPUP **/
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupBox: {
    width: width * 0.8,
    backgroundColor: COLORS.secondary,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: width * 0.045,
    marginBottom: 10,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  popupContent: {
    fontSize: width * 0.035,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: getFontFamily('Regular'),
    fontWeight: getFontWeight('Regular'),
  },
  popupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  popupButtonText: {
    color: COLORS.secondary,
    fontSize: width * 0.04,
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
});
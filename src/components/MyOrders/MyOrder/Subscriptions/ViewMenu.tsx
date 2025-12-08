import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ThemeContext } from '../../../../theme/ThemeContext'; // import your ThemeContext

const { width, height } = Dimensions.get('window');

const ViewMenu = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode } = useContext(ThemeContext); // get dark mode state

  const plans = [
    { id: 1, title: 'Break - Fast', icon: require('../../../../assets/breakfast.png') },
    { id: 2, title: 'Lunch', icon: require('../../../../assets/lunch.png') },
    { id: 3, title: 'Dinner', icon: require('../../../../assets/dinner.png') },
  ];

  const [selected, setSelected] = useState<number[]>([]);

  const togglePlan = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(x => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleNext = () => {
    navigation.navigate('MenuItems'); 
  };

  const checkBoxSize = 20;
  const checkBoxProps =
    Platform.OS === 'ios'
      ? {
          onCheckColor: COLORS.secondary,
          onFillColor: COLORS.primary,
          onTintColor: COLORS.primary,
          tintColor: COLORS.primary,
          boxType: 'square',
          lineWidth: 1.2,
          animationDuration: 0.1,
          style: { width: checkBoxSize, height: checkBoxSize },
        }
      : {
          tintColors: { true: COLORS.primary, false: COLORS.primary },
          style: { width: checkBoxSize, height: checkBoxSize },
        };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }]}>
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
          <Image source={require('../../../../assets/back.png')} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Meal Selection</Text>

        <View style={{ width: width * 0.06 }} />
      </View>

      {/* SUBTITLE */}
      <View style={styles.subtitleRow}>
        <Image source={require('../../../../assets/check.png')} style={styles.greenCheck} />
        <Text style={[styles.subtitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          Select your subscription plan for
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {plans.map(item => {
          const isSelected = selected.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.planCard,
                {
                  backgroundColor: isDarkMode ? '#303030ff' : '#FFFFFF',
                   // card bg dark/light
                  shadowColor: isDarkMode ? 'transparent' : '#000',
                },
              ]}
              onPress={() => togglePlan(item.id)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF' }, // icon bg dark/light
                ]}
              >
                <Image source={item.icon} style={styles.planIcon} />
              </View>

              <Text style={[styles.planTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>{item.title}</Text>

              <CheckBox value={isSelected} onValueChange={() => togglePlan(item.id)} {...checkBoxProps} />
            </TouchableOpacity>
          );
        })}

        {/* NEXT BUTTON */}
        <TouchableOpacity style={styles.menuButton} onPress={handleNext} activeOpacity={0.9}>
          <Text style={styles.menuText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ViewMenu;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: height * 0.01,
    paddingHorizontal: width * 0.05,
  },
  backButton: { padding: width * 0.015 },
  backIcon: { width: width * 0.06, height: width * 0.06 },
  headerTitle: { fontSize: width * 0.05, fontFamily: getFontFamily('Bold'), fontWeight: getFontWeight('Bold'), marginTop: height * 0.005 },

  subtitleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: width * 0.05, marginTop: height * 0.02, marginBottom: height * 0.025 },
  greenCheck: { width: width * 0.05, height: width * 0.05 },
  subtitle: { marginLeft: width * 0.02, fontSize: width * 0.036, fontFamily: getFontFamily('SemiBold'), fontWeight: getFontWeight('SemiBold') },

  scrollContent: { paddingBottom: height * 0.04, paddingHorizontal: width * 0.05 },

  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.3,
    shadowRadius: 4,
  },

  iconWrapper: { padding: 12, borderRadius: 50, elevation: 3 },

  planIcon: { width: 36, height: 36, resizeMode: 'contain' },

  planTitle: { flex: 1, marginLeft: 16, fontSize: width * 0.045, fontFamily: getFontFamily('Medium'), fontWeight: getFontWeight('Medium') },

  menuButton: { marginTop: hp('1%'), backgroundColor: COLORS.primary, borderRadius: wp('3%'), paddingVertical: hp('1.5%'), alignItems: 'center' },

  menuText: { color: '#FFFFFF', fontSize: wp('3.8%'), fontFamily: getFontFamily('Bold'), fontWeight: getFontWeight('Bold') },
});

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';
const { width, height } = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { COLORS } from '../../../../theme/colors';

const SelectPlan = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(26);
  const mealPlans = [
    {
      id: 1,
      durationLabel: "7 Day’s Plan",
      planType: "Weekly Plan",
      vendor: "Bistro Excellence",
      price: "₹ 400 / week",
      description: "Based on previous selection",
      dateRange: "22 - 29 Sep 2025",
      image: require("../../../../assets/meal2.png"),
    },

    {
      id: 2,
      durationLabel: "30 Day’s Plan",
      planType: "Monthly Plan",
      vendor: "Bistro Excellence",
      price: "₹ 4900 / month",
      description: "Based on previous selection",
      dateRange: "22 Sep - 21 Oct 2025",
      image: require("../../../../assets/meal1.png"),
    },
  ];

  // State for current month and year
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // September 2025 (month is 0-indexed)

  // Calendar data
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate dates for current month view
  const getDatesForMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    // Convert to Monday as first day (0 = Monday, 6 = Sunday)
    const mondayBasedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const dates = [];

    // Add empty days for the beginning of the month
    for (let i = 0; i < mondayBasedFirstDay; i++) {
      dates.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      dates.push(i);
    }

    return dates;
  };

  const dates = getDatesForMonth();


  // Navigation functions
  const handleNextPress = () => {
    navigation.navigate('PlanDetails');
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDate(null); // Reset selected date when month changes
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDate(null); // Reset selected date when month changes
  };

  const getDayName = (date) => {
    if (!date) return "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const d = new Date(year, month, date);
    return d.toLocaleDateString("en-US", { weekday: "short" });
  };


  // Check if date is in current month
  const isDateInCurrentMonth = (date) => {
    return date !== null;
  };
  const [liftAnim] = useState(new Animated.Value(0));
  const liftStyle = {
    transform: [
      {
        translateY: liftAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10], // Moves up slightly
        }),
      },
    ],
  };


  const animations = useMemo(
    () => dates.map(() => new Animated.Value(0)),
    [dates]
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vinsta Plus</Text>
        <View style={{ width: width * 0.06 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Heading */}
        <View style={styles.mainContent}>
          <View style={styles.heading}>
            <Image source={require('../../../../assets/select.png')} style={styles.select} />
            <Text style={styles.selectText}>Select Plan starting Date</Text>
          </View>
        </View>

        {/* Calendar Section */}
        <View style={styles.monthHeader}>
          <TouchableOpacity style={styles.navButton} onPress={goToPreviousMonth}>
            <Text style={styles.navIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthName}>{monthYear}</Text>
          <TouchableOpacity style={styles.navButton} onPress={goToNextMonth}>
            <Text style={styles.navIcon}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesScrollContent}
          >
            {dates.map((item, index) => {
              const isSelected = selectedDate === item;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (!item) return;

                    // Lower previous date
                    if (selectedDate !== null) {
                      const prevIndex = dates.indexOf(selectedDate);
                      Animated.spring(animations[prevIndex], {
                        toValue: 0,
                        useNativeDriver: true,
                      }).start();
                    }

                    // Set new selected date
                    setSelectedDate(item);

                    // Lift new selected date
                    Animated.spring(animations[index], {
                      toValue: 1,
                      useNativeDriver: true,
                    }).start();
                  }}
                  disabled={!item}
                  activeOpacity={0.8}
                  style={{ paddingVertical: hp("2%") }}
                >
                  <Animated.View
                    style={[
                      styles.dateWrapper,
                      isSelected && styles.selectedWrapper,
                      {
                        transform: [
                          {
                            translateY: animations[index].interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -10], // lift
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {/* Date Circle */}
                    <View
                      style={[
                        styles.dateCircle,
                        isSelected && styles.selectedDateCircle,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dateNumber,
                          isSelected && styles.selectedDateNumber,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>

                    {/* Day Label */}
                    <Text
                      style={[
                        styles.dayLabel,
                        isSelected && styles.selectedDayLabel,
                      ]}
                    >
                      {getDayName(item)}
                    </Text>

                    {/* Dot */}
                    {isSelected && <View style={styles.bottomDot} />}
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

        </View>

        <View style={styles.separator}></View>

        {/* Plan Selection Section */}
        <View style={styles.planSection}>
          <View style={[styles.heading, { marginBottom: hp('3%') }]}>
            <Image source={require('../../../../assets/select.png')} style={styles.select} />
            <Text style={styles.selectText}>Select Plan</Text>
          </View>
          <View style={styles.planCardsWrapper}>
            {mealPlans.map((plan) => (
              <View key={plan.id} style={styles.planCard}>

                <View style={styles.leftRightRow}>

                  {/* LEFT SIDE → Duration + Image */}
                  <View style={styles.leftSection}>
                    <Text style={styles.planTitle}>{plan.durationLabel}</Text>
                    <View
                      style={styles.imgBorder}
                    >
                      <Image
                        source={plan.image}
                        style={styles.foodImage}
                      />
                    </View>
                  </View>

                  {/* RIGHT SIDE → Plan Info */}
                  <View style={styles.planInfo}>
                    <Text style={styles.planType}>{plan.planType}</Text>
                    <Text style={styles.restaurantName}>{plan.vendor}</Text>
                    <Text style={styles.priceText}>{plan.price}</Text>
                    <Text style={styles.greySmall}>Based on previous selection</Text>
                    <Text style={styles.greySmall}>{plan.dateRange}</Text>
                  </View>

                </View>

                <View style={styles.mealsSection}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: wp('2%') }}>
                    <Image source={require('../../../../assets/checkbox.png')} style={{ width: wp('4%'), height: wp('4%'), tintColor: '#259E29' }} />
                    <Text style={styles.mealText}>BreakFast</Text>
                    <Image source={require('../../../../assets/Vector.png')} />
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: wp('2%') }}>
                    <Image source={require('../../../../assets/checkbox.png')} style={{ width: wp('4%'), height: wp('4%'), tintColor: '#259E29' }} />
                    <Text style={styles.mealText}>Lunch</Text>
                    <Image source={require('../../../../assets/Vector.png')} />
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: wp('2%') }}>
                    <Image source={require('../../../../assets/checkbox.png')} style={{ width: wp('4%'), height: wp('4%'), tintColor: '#259E29' }} />
                    <Text style={styles.mealText}>Dinner</Text>
                    <Image source={require('../../../../assets/Vector.png')} />
                  </View>
                </View>

              </View>

            ))}
          </View>
        </View>
      </ScrollView>
      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNextPress}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('5%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: wp('1.5%')
  },
  backIcon: {
    width: wp('6%'),
    height: wp('6%')
  },
  headerTitle: {
    fontSize: wp('5%'),
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    textAlign: 'center',
    flex: 1
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    marginBottom: hp('3%'),
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: wp('3%')
  },
  select: {
    width: wp('6%'),
    height: wp('6%'),
  },
  selectText: {
    fontSize: wp('4%'),
    color: '#000',
    fontFamily: getFontFamily('Regular'),
    fontWeight: '700',

  },
  // Calendar Styles
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2%'),
    width: '50%'
  },
  monthName: {
    fontSize: wp('4.2%'),
    fontWeight: '700',
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  navButton: {
    paddingHorizontal: wp('2%'),
  },
  navIcon: {
    fontSize: wp('6%'),
    color: '#000',
    fontWeight: '300',
  },
  calendarSection: {
  },

  datesScrollContent: {
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
  },

  dateWrapper: {
    marginRight: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: wp('2%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('10%'),
    borderWidth: 1,
    borderColor: '#cfcfcf',
    width: wp('14%'),
    position: 'relative',   // <-- IMPORTANT
  },

  selectedWrapper: {
    backgroundColor: '#EC7A1C',
    borderColor: '#EC7A1C',
    borderRadius: wp('8%'),
  },

  dateCircle: {
    width: wp('10%'),
    height: wp('10%'),
    // borderRadius: wp('5%'),
    // borderWidth: 1,
    // borderColor: '#cfcfcf',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedDateCircle: {
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: '50%'
  },

  dateNumber: {
    fontSize: wp('4%'),
    color: '#000',
    fontWeight: '600',
  },

  selectedDateNumber: {
    color: '#EC7A1C',
    fontWeight: '700',
  },

  dayLabel: {
    marginTop: wp('1%'),
    fontSize: wp('3%'),
    color: '#7e7e7e',
  },

  selectedDayLabel: {
    color: '#fff',
    fontWeight: '600',
  },

  bottomDot: {
    position: 'absolute',
    bottom: wp('-4%'),
    width: wp('2.2%'),
    height: wp('2.2%'),
    backgroundColor: COLORS.primary,  // Dot should be white
    borderRadius: wp('1.1%'),
    alignSelf: 'center',
  },

  separator: {
    backgroundColor: '#F4F4F4',
    height: 4,
    width: '100%',
    marginVertical: hp('3%')
  },

  // Plan Selection Styles
  planSection: {
    paddingHorizontal: wp('5%'),
    marginVertical: hp('3%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
    marginBottom: hp('2%'),
  },
  selectedPlan: {
    borderColor: '#E87C23',
    backgroundColor: '#FFF9F4',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  // Meal Types Styles

  mealTypeButton: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: wp('2%'),
    paddingVertical: hp('1.5%'),
    marginHorizontal: wp('1%'),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mealTypeText: {
    fontSize: wp('3.8%'),
    color: '#000',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  // Next Button
  nextButton: {
    backgroundColor: '#E87C23',
    borderRadius: wp('3%'),
    paddingVertical: hp('2%'),
    marginHorizontal: wp('5%'),
    marginBottom: hp('3%'),
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  nextButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  planCardsWrapper: {
    marginTop: hp('2%'),
  },

  planCard: {
    backgroundColor: '#faf4f0cc',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('2.5%'),
  },

  leftRightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: wp('10%')
  },

  leftSection: {
    alignItems: 'flex-start',
  },


  planTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#101010',
    marginBottom: hp('1%'),
  },

  planContentRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    gap: wp('7%')
  },

  foodImage: {
    height: '90%', // adjust size to fit nicely inside border
    width: '90%',
    borderRadius: (wp('26%') * 0.9) / 2, // optional: make image circular
    resizeMode: 'cover',
  },

  imgBorder: {
    borderColor: '#C9662A',
    borderWidth: 2,
    borderRadius: wp('26%') / 2, 
    height: wp('25%'),
    width: wp('25%'),
    padding: 0.1,
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  planInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  planType: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
    color: '#101010',
  },

  restaurantName: {
    fontSize: wp('3%'),
    color: '#777',
    marginTop: hp('1%'),
  },

  priceText: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#000',
    marginVertical: hp('1%'),
  },

  greySmall: {
    fontSize: wp('3%'),
    color: '#8E8E8E',
    marginBottom: hp('0.5%'),
  },
  mealText: {
    fontSize: wp('3%'),
    color: '#333',
    fontWeight: '500',
  },
  mealsSection: {
    flexDirection: 'row',
    gap: wp('4%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2%')
  }
});

export default SelectPlan;
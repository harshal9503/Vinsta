import { Dimensions, FlatList, Image, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { COLORS } from '../../../theme/colors';
const { width, height } = Dimensions.get('window');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ThemeContext } from '../../../theme/ThemeContext';

const isTablet = width >= 768;
const isSmallScreen = width < 380;
const screenRatio = width / height;
const isIOS = Platform.OS === 'ios';
const fontScale = size => {
  if (isIOS) {
    return isTablet ? size * 0.85 : size * 0.95;
  }
  return isTablet ? size * 0.85 : size;
};

// iOS-specific dimension scaling
const scaleSize = size => {
  if (isIOS) {
    return isTablet ? size * 0.9 : size * 1.02;
  }
  return size;
};

// ✅ UNIVERSAL Font family helper with proper iOS and Android support
const getFontFamily = (weight = 'Regular') => {
  if (Platform.OS === 'ios') {
    // iOS uses base font family name + fontWeight property
    return 'Figtree';
  } else {
    // Android needs specific font file names
    const fontMap = {
      '100': 'Figtree-Thin',
      '200': 'Figtree-ExtraLight',
      '300': 'Figtree-Light',
      '400': 'Figtree-Regular',
      '500': 'Figtree-Medium',
      '600': 'Figtree-SemiBold',
      '700': 'Figtree-Bold',
      '800': 'Figtree-ExtraBold',
      '900': 'Figtree-Black',
      'Thin': 'Figtree-Thin',
      'ExtraLight': 'Figtree-ExtraLight',
      'Light': 'Figtree-Light',
      'Regular': 'Figtree-Regular',
      'Medium': 'Figtree-Medium',
      'SemiBold': 'Figtree-SemiBold',
      'Bold': 'Figtree-Bold',
      'ExtraBold': 'Figtree-ExtraBold',
      'Black': 'Figtree-Black',
    };
    return fontMap[weight] || 'Figtree-Regular';
  }
};

// ✅ Get fontWeight for iOS (Android ignores this)
const getFontWeight = (weight = 'Regular') => {
  if (Platform.OS === 'android') {
    return undefined; // Android doesn't use fontWeight with custom fonts
  }

  // iOS fontWeight mapping
  const weightMap = {
    'Thin': '100',
    'ExtraLight': '200',
    'Light': '300',
    'Regular': '400',
    'Medium': '500',
    'SemiBold': '600',
    'Bold': '700',
    'ExtraBold': '800',
    'Black': '900',
    '100': '100',
    '200': '200',
    '300': '300',
    '400': '400',
    '500': '500',
    '600': '600',
    '700': '700',
    '800': '800',
    '900': '900',
  };
  return weightMap[weight] || '400';
};

// ✅ Complete font style helper
const getTextStyle = (weight = 'Regular') => {
  return {
    fontFamily: getFontFamily(weight),
    ...(Platform.OS === 'ios' && { fontWeight: getFontWeight(weight) }),
    includeFontPadding: false,
    textAlignVertical: 'center',
  };
};

const SearchModal = ({
  showFilterModal,
  setShowFilterModal,
  filterOptions,
  appliedFilters,
  setAppliedFilters,
  resetFilters,
  applyFilters
}) => {

  const { theme } = useContext(ThemeContext);
  return (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Sort & Filter</Text>
            <View
              style={{ height: 1, width: '85%', backgroundColor: theme.borderColor }}
            ></View>

            {/* Close icon outside header (overlapping) */}
            <TouchableOpacity
              onPress={() => setShowFilterModal(false)}
              style={[styles.closeButtonWrapper, { backgroundColor: theme.cardBackground }]}
            >
              <Image
                source={require('../../../assets/close1.png')}
                style={[styles.closeIcon, { tintColor: theme.text }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.modalScroll}
          >
            {/* Category Filter */}
            <View style={[styles.filterSection, { borderBottomColor: theme.borderColor }]}>
              <Text style={[styles.filterSectionTitle, { color: theme.text }]}>Category</Text>

              <FlatList
                data={filterOptions.category}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={{ paddingVertical: 6 }}
                renderItem={({ item }) => {
                  const isActive = appliedFilters.category === item;
                  return (
                    <TouchableOpacity
                      style={[
                        styles.filterOption,
                        { backgroundColor: theme.cardBackground },
                        isActive && styles.activeFilterOption,
                        { marginRight: 10 },
                      ]}
                      onPress={() =>
                        setAppliedFilters({
                          ...appliedFilters,
                          category: item,
                        })
                      }
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          { color: theme.text },
                          isActive && [styles.activeFilterOptionText, { color: theme.buttonText }],
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/* Price Range Filter */}
            <View style={[styles.filterSection, { borderBottomColor: theme.borderColor }]}>
              <Text style={[styles.filterLabel, { color: theme.text }]}>Price Range</Text>

              {/* Histogram visual (optional) */}
              <View style={styles.histogramContainer}>
                {[...Array(20)].map((_, i) => (
                  <View
                    key={i}
                    style={[styles.bar, { height: Math.random() * 60 + 10, backgroundColor: theme.borderColor }]}
                  />
                ))}
              </View>

              {/* Price Range Slider */}
              <MultiSlider
                values={appliedFilters.priceRange}
                onValuesChange={values =>
                  setAppliedFilters(prev => ({
                    ...prev,
                    priceRange: values,
                  }))
                }
                min={0}
                max={1000}
                step={10}
                sliderLength={300}
                selectedStyle={{ backgroundColor: COLORS.primary }}
                unselectedStyle={{ backgroundColor: theme.borderColor }}
                markerStyle={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  backgroundColor: COLORS.primary,
                }}
              />

              {/* ✅ Stick the prices right below the slider */}
              <View
                style={[styles.priceRangeRow, { marginTop: 0, paddingTop: 0 }]}
              >
                <Text style={[styles.priceRangeText, { color: theme.text }]}>
                  ${appliedFilters.priceRange[0]}
                </Text>
                <Text style={[styles.priceRangeText, { color: theme.text }]}>
                  ${appliedFilters.priceRange[1]}
                </Text>
              </View>
            </View>

            {/* Delivery Time Filter */}
            <View style={[styles.filterSection, { borderBottomColor: theme.borderColor }]}>
              <Text style={[styles.filterSectionTitle, { color: theme.text }]}>Sort By</Text>

              <FlatList
                data={filterOptions.sortBy}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={{ paddingVertical: 6 }}
                renderItem={({ item }) => {
                  const isActive = appliedFilters.sortBy === item;
                  return (
                    <TouchableOpacity
                      style={[
                        styles.filterOption,
                        { backgroundColor: theme.cardBackground },
                        isActive && styles.activeFilterOption,
                        { marginRight: 10 },
                      ]}
                      onPress={() =>
                        setAppliedFilters({ ...appliedFilters, sortBy: item })
                      }
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          { color: theme.text },
                          isActive && [styles.activeFilterOptionText, { color: theme.buttonText }],
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/* Rating Filter */}
            <View style={[styles.filterSection, { borderBottomColor: theme.borderColor }]}>
              <Text style={[styles.filterSectionTitle, { color: theme.text }]}>Rating</Text>
              <View style={styles.filterOptions}>
                {filterOptions.rating.map(option => {
                  const isActive = appliedFilters.rating === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        { backgroundColor: theme.cardBackground },
                        isActive && styles.activeFilterOption,
                      ]}
                      onPress={() =>
                        setAppliedFilters({
                          ...appliedFilters,
                          rating: option,
                        })
                      }
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <Image
                          source={require('../../../assets/star.png')}
                          style={{
                            width: 13,
                            height: 12,
                            resizeMode: 'contain',
                            tintColor: isActive ? theme.buttonText : COLORS.primary,
                          }}
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            { color: theme.text },
                            isActive && [styles.activeFilterOptionText, { color: theme.buttonText }],
                          ]}
                        >
                          {option}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          <View style={[styles.modalActions, { borderTopColor: theme.borderColor }]}>
            <TouchableOpacity style={[styles.resetBtn, { backgroundColor: theme.cardBackground }]} onPress={resetFilters}>
              <Text style={[styles.resetBtnText, { color: theme.text }]}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
              <Text style={[styles.applyBtnText, { color: theme.buttonText }]}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SearchModal

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    paddingTop: hp('3%'),
    maxHeight: hp('80%'),
  },
  modalHeader: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
  },
  modalTitle: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(18),
    marginBottom: 10,
  },
  closeButtonWrapper: {
    position: 'absolute',
    bottom: 70,
    left: '50%',
    width: 45,
    height: 45,
    borderRadius: 45,
    transform: [{ translateX: -22.5 }],
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalScroll: {
    flex: 1,
  },
  filterSection: {
    padding: wp('5%'),
    borderBottomWidth: 1,
  },
  filterLabel: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16),
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  histogramContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
    marginVertical: 5,
  },
  bar: {
    width: 6,
    marginHorizontal: 2,
    borderRadius: 3,
  },
  filterSectionTitle: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16),
    marginBottom: hp('1.5%'),
    alignSelf: 'flex-start'
  },
  filterOptions: {
    flexDirection: 'row',
    gap: wp('2%'),
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  filterOption: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    marginBottom: hp('1%'),
    alignItems: 'flex-start'
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
  },
  filterOptionText: {
    ...getTextStyle('Medium'),
    fontSize: fontScale(14),
  },
  activeFilterOptionText: {
    ...getTextStyle('Medium'),
  },
  priceRangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 0,
    paddingTop: 0,
  },
  priceRangeText: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(14),
  },
  modalActions: {
    flexDirection: 'row',
    padding: wp('5%'),
    gap: wp('3%'),
    borderTopWidth: 1,
  },
  resetBtn: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
  },
  resetBtnText: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16),
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
  },
  applyBtnText: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16),
  },
import { Dimensions, FlatList, Image, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { COLORS } from '../../../theme/colors';
const { width, height } = Dimensions.get('window');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ThemeContext } from '../../../theme/ThemeContext';

const isTablet = width >= 768;
const isSmallScreen = width < 380;
const screenRatio = width / height;
const isIOS = Platform.OS === 'ios';
const fontScale = size => {
  if (isIOS) {
    return isTablet ? size * 0.85 : size * 0.95;
  }
  return isTablet ? size * 0.85 : size;
};

// iOS-specific dimension scaling
const scaleSize = size => {
  if (isIOS) {
    return isTablet ? size * 0.9 : size * 1.02;
  }
  return size;
};

// ✅ UNIVERSAL Font family helper with proper iOS and Android support
const getFontFamily = (weight = 'Regular') => {
  if (Platform.OS === 'ios') {
    // iOS uses base font family name + fontWeight property
    return 'Figtree';
  } else {
    // Android needs specific font file names
    const fontMap = {
      '100': 'Figtree-Thin',
      '200': 'Figtree-ExtraLight',
      '300': 'Figtree-Light',
      '400': 'Figtree-Regular',
      '500': 'Figtree-Medium',
      '600': 'Figtree-SemiBold',
      '700': 'Figtree-Bold',
      '800': 'Figtree-ExtraBold',
      '900': 'Figtree-Black',
      'Thin': 'Figtree-Thin',
      'ExtraLight': 'Figtree-ExtraLight',
      'Light': 'Figtree-Light',
      'Regular': 'Figtree-Regular',
      'Medium': 'Figtree-Medium',
      'SemiBold': 'Figtree-SemiBold',
      'Bold': 'Figtree-Bold',
      'ExtraBold': 'Figtree-ExtraBold',
      'Black': 'Figtree-Black',
    };
    return fontMap[weight] || 'Figtree-Regular';
  }
};

// ✅ Get fontWeight for iOS (Android ignores this)
const getFontWeight = (weight = 'Regular') => {
  if (Platform.OS === 'android') {
    return undefined; // Android doesn't use fontWeight with custom fonts
  }

  // iOS fontWeight mapping
  const weightMap = {
    'Thin': '100',
    'ExtraLight': '200',
    'Light': '300',
    'Regular': '400',
    'Medium': '500',
    'SemiBold': '600',
    'Bold': '700',
    'ExtraBold': '800',
    'Black': '900',
    '100': '100',
    '200': '200',
    '300': '300',
    '400': '400',
    '500': '500',
    '600': '600',
    '700': '700',
    '800': '800',
    '900': '900',
  };
  return weightMap[weight] || '400';
};

// ✅ Complete font style helper
const getTextStyle = (weight = 'Regular') => {
  return {
    fontFamily: getFontFamily(weight),
    ...(Platform.OS === 'ios' && { fontWeight: getFontWeight(weight) }),
    includeFontPadding: false,
    textAlignVertical: 'center',
  };
};

const SearchModal = ({
  showFilterModal,
  setShowFilterModal,
  filterOptions,
  appliedFilters,
  setAppliedFilters,
  resetFilters,
  applyFilters
}) => {

  const { theme } = useContext(ThemeContext);
  return (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Sort & Filter</Text>
            <View
              style={{ height: 1, width: '85%', backgroundColor: theme.text }}
            ></View>

            {/* Close icon outside header (overlapping) */}
            <TouchableOpacity
              onPress={() => setShowFilterModal(false)}
              style={[styles.closeButtonWrapper,{backgroundColor:theme.cardBackground}]}
            >
              <Image
                source={require('../../../assets/close1.png')}
                style={[styles.closeIcon,{tintColor : theme.text}]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.modalScroll}
          >
            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle,{color  :theme.text}]}>Category</Text>

              <FlatList
                data={filterOptions.category}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={{ paddingVertical: 6 }}
                renderItem={({ item }) => {
                  const isActive = appliedFilters.category === item;
                  return (
                    <TouchableOpacity
                      style={[
                        styles.filterOption,{backgroundColor  :theme.cardBackground},
                        isActive && styles.activeFilterOption,
                        { marginRight: 10 },
                      ]}
                      onPress={() =>
                        setAppliedFilters({
                          ...appliedFilters,
                          category: item,
                        })
                      }
                    >
                      <Text
                        style={[
                          styles.filterOptionText,{color : theme.text},
                          isActive && styles.activeFilterOptionText,{color : theme.text}
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/* Price Range Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel,{color : theme.text}]}>Price Range</Text>

              {/* Histogram visual (optional) */}
              <View style={styles.histogramContainer}>
                {[...Array(20)].map((_, i) => (
                  <View
                    key={i}
                    style={[styles.bar, { height: Math.random() * 60 + 10 }]}
                  />
                ))}
              </View>

              {/* Price Range Slider */}
              <MultiSlider
                values={appliedFilters.priceRange}
                onValuesChange={values =>
                  setAppliedFilters(prev => ({
                    ...prev,
                    priceRange: values,
                  }))
                }
                min={0}
                max={1000}
                step={10}
                sliderLength={300}
                selectedStyle={{ backgroundColor: '#EB8B23' }}
                unselectedStyle={{ backgroundColor: '#ddd' }}
                markerStyle={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  backgroundColor: '#EB8B23',
                }}
              />

              {/* ✅ Stick the prices right below the slider */}
              <View
                style={[styles.priceRangeRow, { marginTop: 0, paddingTop: 0 }]}
              >
                <Text style={[styles.priceRangeText,{color : theme.text}]}>
                  ${appliedFilters.priceRange[0]}
                </Text>
                <Text style={[styles.priceRangeText,{color : theme.text}]}>
                  ${appliedFilters.priceRange[1]}
                </Text>
              </View>
            </View>

            {/* Delivery Time Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle,{color:theme.text}]}>Sort By</Text>

              <FlatList
                data={filterOptions.sortBy}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={{ paddingVertical: 6 }}
                renderItem={({ item }) => {
                  const isActive = appliedFilters.sortBy === item;
                  return (
                    <TouchableOpacity
                      style={[
                        styles.filterOption,{backgroundColor : theme.cardBackground},
                        isActive && styles.activeFilterOption,
                        { marginRight: 10 },
                      ]}
                      onPress={() =>
                        setAppliedFilters({ ...appliedFilters, sortBy: item })
                      }
                    >
                      <Text
                        style={[
                          styles.filterOptionText,{color : theme.text},
                          isActive && styles.activeFilterOptionText,{color : theme.text}
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/* Rating Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle,{color : theme.text}]}>Rating</Text>
              <View style={styles.filterOptions}>
                {filterOptions.rating.map(option => {
                  const isActive = appliedFilters.rating === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        {backgroundColor : theme.cardBackground},
                        isActive && styles.activeFilterOption,
                      ]}
                      onPress={() =>
                        setAppliedFilters({
                          ...appliedFilters,
                          rating: option,
                        })
                      }
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <Image
                          source={require('../../../assets/star.png')}
                          style={{
                            width: 13,
                            height: 12,
                            resizeMode: 'contain',
                            tintColor: isActive ? theme.background : COLORS.primary,
                          }}
                        />
                        <Text
                          style={[
                            styles.filterOptionText,{color : theme.text},
                            isActive && [styles.activeFilterOptionText,{color : theme.background}],
                          ]}
                        >
                          {option}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity style={[styles.resetBtn,{backgroundColor : theme.cardBackground}]} onPress={resetFilters}>
              <Text style={[styles.resetBtnText,{color : theme.text}]}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
              <Text style={[styles.applyBtnText,{color  : theme.background}]}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SearchModal

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    paddingTop: hp('3%'),
    maxHeight: hp('80%'),
  },
  modalHeader: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
  },
  modalTitle: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(18),
    color: '#000',
    marginBottom: 10,
  },
  closeButtonWrapper: {
    position: 'absolute',
    bottom: 70,
    left: '50%',
    width: 45,
    height: 45,
    borderRadius: 45,
    transform: [{ translateX: -22.5 }],
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
    resizeMode: 'contain',
  },
  modalScroll: {
    flex: 1,
  },
  filterSection: {
    padding: wp('5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
   },
  filterLabel: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16),
    color: '#000',
    marginBottom: 10,
    alignSelf : 'flex-start'
  },
  histogramContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
    marginVertical: 5,
  },
  bar: {
    width: 6,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2,
    borderRadius: 3,
  },
  filterSectionTitle: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16),
    color: '#000',
    marginBottom: hp('1.5%'),
    alignSelf : 'flex-start'
  },
  filterOptions: {
    flexDirection: 'row',
    //flexWrap: 'wrap',
    gap: wp('2%'),
    alignItems : 'flex-start',
    justifyContent : 'flex-start'
  },
  filterOption: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    marginBottom: hp('1%'),
    alignItems : 'flex-start'
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
  },
  filterOptionText: {
    ...getTextStyle('Medium'),
    fontSize: fontScale(14),
    color: '#666',
  },
  activeFilterOptionText: {
    ...getTextStyle('Medium'),
  },
  priceRangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 0,
    paddingTop: 0,
  },
  priceRangeText: {
    ...getTextStyle('SemiBold'),
    fontSize: fontScale(14),
    color: '#000',
  },
  modalActions: {
    flexDirection: 'row',
    padding: wp('5%'),
    gap: wp('3%'),
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  resetBtn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: hp('1.8%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
  },
  resetBtnText: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16),
    color: '#666',
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
  },
  applyBtnText: {
    ...getTextStyle('Bold'),
    fontSize: fontScale(16),
    color: '#fff',
  },
})
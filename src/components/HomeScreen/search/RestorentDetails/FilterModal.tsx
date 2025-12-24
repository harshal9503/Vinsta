import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
} from 'react-native';
import React, { useContext } from 'react';
import { COLORS } from '../../../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ThemeContext } from '../../../../theme/ThemeContext';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper';

const FilterModal = ({
  showFilterModal,
  setShowFilterModal,
  filterOptions,
  appliedFilters,
  setAppliedFilters,
  resetFilters,
  applyFilters,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View
  style={[
    styles.modalOverlay,
    {
      backgroundColor: theme.isDarkMode
        ? 'rgba(0,0,0,0.8)'
        : 'rgba(0,0,0,0.5)',
    },
  ]}
>
  <View
    style={[
      styles.modalContainer,
      {
        backgroundColor: theme.cardBackground, // white in light / dark grey in dark
      },
    ]}
  >

          {/* HEADER */}
          <View
            style={[
              styles.modalHeader,
              { backgroundColor: theme.card },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: theme.text },
              ]}
            >
              Filtering & Sorting
            </Text>

            <View
              style={{
                height: 2,
                width: '100%',
                backgroundColor: theme.border,
              }}
            />

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setShowFilterModal(false)}
              style={[
                styles.closeButtonWrapper,
                { backgroundColor: theme.background },
              ]}
            >
              <Image
                source={require('../../../../assets/close1.png')}
                style={[
                  styles.closeIcon1,
                  { tintColor: theme.text },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.modalScroll}
          >
            {/* Sort By */}
            <View
              style={[
                styles.filterSection,
                { borderBottomColor: theme.borderColor },
              ]}
            >
              <Text
                style={[
                  styles.filterSectionTitle,
                  { color: theme.text },
                ]}
              >
                Sort By
              </Text>

              <FlatList
                data={filterOptions.sortBy}
                horizontal
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                  const isActive = appliedFilters.sortBy === item;

                  return (
                    <TouchableOpacity
                      style={[
                        styles.filterOption,
                        {
                          backgroundColor: isActive
                            ? COLORS.primary
                            : theme.card2,
                        },
                      ]}
                      onPress={() =>
                        setAppliedFilters({
                          ...appliedFilters,
                          sortBy: item,
                        })
                      }
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          {
                            color: isActive
                              ? '#fff'
                              : theme.textSecondary,
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/* Top Picks */}
            <View
              style={[
                styles.filterSection,
                { borderBottomColor: theme.borderColor },
              ]}
            >
              <Text
                style={[
                  styles.filterSectionTitle,
                  { color: theme.text },
                ]}
              >
                Top Pick's
              </Text>

              <View style={styles.filterOptions}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../../../assets/leaf.png')}
                    style={[
                      styles.statIcon,
                    
                    ]}
                  />
                  <Text
                    style={[
                      styles.infoText,
                      { color: theme.text },
                    ]}
                  >
                    This restaurant is pure veg.
                  </Text>
                </View>

                {filterOptions.TopPicks.map((option) => {
                  const isActive = appliedFilters.TopPicks === option;

                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        {
                          backgroundColor: isActive
                            ? COLORS.primary
                            : theme.card2,
                        },
                      ]}
                      onPress={() =>
                        setAppliedFilters({
                          ...appliedFilters,
                          TopPicks: option,
                        })
                      }
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Image
                          source={require('../../../../assets/clockk.png')}
                          style={[
                            styles.iconSmall,
                            {
                              tintColor: isActive
                                ? '#fff'
                                : theme.text,
                            },
                          ]}
                          resizeMode="contain"
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            {
                              color: isActive
                                ? '#fff'
                                : theme.textSecondary,
                            },
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

            {/* Dietary Preference */}
            <View
              style={[
                styles.filterSection,
                { borderBottomColor: theme.borderColor },
              ]}
            >
              <Text
                style={[
                  styles.filterSectionTitle,
                  { color: theme.text },
                ]}
              >
                Dietary Preference
              </Text>

              <View style={styles.filterOptions}>
                {filterOptions.DietaryPrefrence.map((option) => {
                  const isActive = appliedFilters.DietaryPrefrence === option;

                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        {
                          backgroundColor: isActive
                            ? COLORS.primary
                            : theme.card2,
                        },
                      ]}
                      onPress={() =>
                        setAppliedFilters({
                          ...appliedFilters,
                          DietaryPrefrence: option,
                        })
                      }
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <Image
                          source={require('../../../../assets/spicy.png')}
                          style={[
                            styles.iconSmall,
                            {
                              tintColor: isActive
                                ? '#fff'
                                : theme.text,
                            },
                          ]}
                          resizeMode="contain"
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            {
                              color: isActive
                                ? '#fff'
                                : theme.textSecondary,
                            },
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

          {/* Bottom Buttons */}
          <View style={styles.modalActions}>
            <View
              style={{
                borderColor: theme.borderColor,
                borderWidth: 1,
                width: '100%',
                flexDirection: 'row',
                padding: 10,
                borderRadius: 12,
              }}
            >
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text
                  style={[
                    styles.resetBtnText,
                    { color: theme.textSecondary },
                  ]}
                >
                  Clear All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  statIcon: {
    width: wp('4%'),
    height: wp('4%'),
    marginRight: wp('1%'),
    resizeMode: 'contain',
  },

  closeIcon1: {
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: 'contain',
  },

  iconSmall: {
    width: wp('4%'),
    height: wp('4%'),
    resizeMode: 'contain',
  },

  modalContainer: {
    flex: 1,
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    paddingTop: hp('3%'),
    maxHeight: hp('77%'),
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
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
  },

  infoText: {
    fontSize: 16,
    fontFamily: Platform.OS === 'android' ? 'Figtree-Medium' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '500',
  },

  closeButtonWrapper: {
    position: 'absolute',
    bottom: 70,
    left: '50%',
    transform: [{ translateX: -25 }],
    borderRadius: 100,
    padding: 10,
    elevation: 5,
  },

  modalScroll: {
    flex: 1,
  },

  filterSection: {
    padding: wp('5%'),
    borderBottomWidth: 1,
  },

  filterSectionTitle: {
    fontSize: wp('4%'),
    marginBottom: hp('1.5%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
  },

  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2%'),
  },

  filterOption: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    marginBottom: hp('1%'),
  },

  filterOptionText: {
    fontSize: wp('3.5%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-Medium' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '500',
  },

  activeFilterOptionText: {
    color: '#fff',
  },

  modalActions: {
    flexDirection: 'row',
    padding: wp('7%'),
  },

  resetBtn: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },

  resetBtnText: {
    fontSize: wp('4%'),
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
  },

  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },

  applyBtnText: {
    fontSize: wp('4%'),
    color: '#fff',
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
  },
});

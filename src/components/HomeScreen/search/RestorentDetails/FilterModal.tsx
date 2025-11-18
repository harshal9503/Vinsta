<<<<<<< HEAD
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const FilterModal = ({
  showFilterModal,
  setShowFilterModal,
  filterOptions,
  appliedFilters,
  setAppliedFilters,
  resetFilters,
  applyFilters,
}) => {
  return (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* HEADER */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtering & Sorting</Text>
            <View style={{ height: 3, width: '100%', backgroundColor: '#dadada' }}></View>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setShowFilterModal(false)}
              style={styles.closeButtonWrapper}
            >
              <Image
                source={require('../../../../assets/close1.png')}
                style={styles.closeIcon1}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
            {/* Sort By */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>

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
                        isActive && styles.activeFilterOption,
                        { marginRight: 10 },
                      ]}
                      onPress={() => setAppliedFilters({ ...appliedFilters, sortBy: item })}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          isActive && styles.activeFilterOptionText,
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
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Top Pick's</Text>
              <View style={styles.filterOptions}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={require('../../../../assets/leaf.png')}
                    style={styles.statIcon}
                  />
                  <Text style={{ fontSize: 16, fontFamily: "Figtree-Medium", marginBottom: 10 }}>
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
                        isActive && styles.activeFilterOption,
                      ]}
                      onPress={() => setAppliedFilters({ ...appliedFilters, TopPicks: option })}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Image
                          source={require('../../../../assets/clockk.png')}
                          style={{
                            width: 13,
                            height: 12,
                            tintColor: isActive ? '#fff' : COLORS.primary,
                          }}
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            isActive && styles.activeFilterOptionText,
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
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Dietary Preference</Text>
              <View style={styles.filterOptions}>
                {filterOptions.DietaryPrefrence.map((option) => {
                  const isActive = appliedFilters.DietaryPrefrence === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.filterOption,
                        isActive && styles.activeFilterOption,
                      ]}
                      onPress={() =>
                        setAppliedFilters({ ...appliedFilters, DietaryPrefrence: option })
                      }
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Image
                          source={require('../../../../assets/spicy.png')}
                          style={{
                            width: 13,
                            height: 12,
                            tintColor: isActive ? '#fff' : COLORS.primary,
                          }}
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            isActive && styles.activeFilterOptionText,
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
                borderColor: '#dadada',
                borderWidth: 1,
                width: '100%',
                flexDirection: 'row',
                padding: 10,
                borderRadius: 12,
              }}
            >
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetBtnText}>Clear All</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
   statIcon: {
    width: wp('3.2%'),
    height: wp('3.2%'),
    marginRight: wp('0.8%'),
  },
   closeIcon1: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    paddingTop: hp('3%'),
    maxHeight: hp('77%'),
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
    fontSize: 18,
    fontFamily: 'Figtree-Bold',
    color: '#000',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 20
  },

  closeButtonWrapper: {
    position: 'absolute',
    bottom: 70,           // moves it half outside header
    right: 160,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    elevation: 5,       // shadow on Android
    shadowColor: '#000', // shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
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
    fontFamily: 'Figtree-Bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
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
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('1.5%'),
    fontFamily: 'Figtree-Bold'
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2%'),
  },
  filterOption: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    marginBottom: hp('1%'),
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
  },
  filterOptionText: {
    fontSize: wp('3.5%'),
    color: '#666',
    fontWeight: '500',
    fontFamily: 'Figtree-Medium'
  },
  activeFilterOptionText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Figtree-Medium'
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
    fontWeight: '600',
    color: '#666',
    fontFamily: 'Figtree-Bold'
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
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Figtree-Bold'
  },
});
=======
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
import React from 'react';
import { COLORS } from '../../../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper'; // Fixed import path

const FilterModal = ({
  showFilterModal,
  setShowFilterModal,
  filterOptions,
  appliedFilters,
  setAppliedFilters,
  resetFilters,
  applyFilters,
}) => {
  return (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* HEADER */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtering & Sorting</Text>
            <View style={{ height: 3, width: '100%', backgroundColor: '#dadada' }} />

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setShowFilterModal(false)}
              style={styles.closeButtonWrapper}
            >
              <Image
                source={require('../../../../assets/close1.png')}
                style={styles.closeIcon1}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
            {/* Sort By */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>

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
                        isActive && styles.activeFilterOption,
                        { marginRight: 10 },
                      ]}
                      onPress={() => setAppliedFilters({ ...appliedFilters, sortBy: item })}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          isActive && styles.activeFilterOptionText,
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
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Top Pick's</Text>
              <View style={styles.filterOptions}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Image source={require('../../../../assets/leaf.png')} style={styles.statIcon} />
                  <Text style={[styles.infoText, { marginBottom: 0 }]}>
                    This restaurant is pure veg.
                  </Text>
                </View>

                {filterOptions.TopPicks.map((option) => {
                  const isActive = appliedFilters.TopPicks === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[styles.filterOption, isActive && styles.activeFilterOption]}
                      onPress={() => setAppliedFilters({ ...appliedFilters, TopPicks: option })}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Image
                          source={require('../../../../assets/clockk.png')}
                          style={[
                            styles.iconSmall,
                            { tintColor: isActive ? '' : COLORS.primary },
                          ]}
                          resizeMode="contain"
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            isActive && styles.activeFilterOptionText,
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
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Dietary Preference</Text>
              <View style={styles.filterOptions}>
                {filterOptions.DietaryPrefrence.map((option) => {
                  const isActive = appliedFilters.DietaryPrefrence === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[styles.filterOption, isActive && styles.activeFilterOption]}
                      onPress={() =>
                        setAppliedFilters({ ...appliedFilters, DietaryPrefrence: option })
                      }
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Image
                          source={require('../../../../assets/spicy.png')}
                          style={[
                            styles.iconSmall,
                            { tintColor: isActive ? '' : COLORS.primary },
                          ]}
                          resizeMode="contain"
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            isActive && styles.activeFilterOptionText,
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
                borderColor: '#dadada',
                borderWidth: 1,
                width: '100%',
                flexDirection: 'row',
                padding: 10,
                borderRadius: 12,
              }}
            >
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetBtnText}>Clear All</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  statIcon: {
    width: wp('4%'), // Slightly increased for better visibility
    height: wp('4%'),
    marginRight: wp('1%'),
    resizeMode: 'contain',
  },
  closeIcon1: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: '#000',
    resizeMode: 'contain',
  },
  iconSmall: {
    width: wp('4%'), // Adjusted for consistent icon sizing
    height: wp('4%'),
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('6%'),
    borderTopRightRadius: wp('6%'),
    paddingTop: hp('3%'),
    maxHeight: hp('77%'),
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
    fontSize: 18,
    color: '#000',
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
    transform: [{ translateX: -25 }], // half of button width (adjust if needed)
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
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
    fontSize: wp('4%'),
    color: '#000',
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
    backgroundColor: '#f0f0f0',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    marginBottom: hp('1%'),
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
  },
  filterOptionText: {
    fontSize: wp('3.5%'),
    color: '#666',
    fontFamily: Platform.OS === 'android' ? 'Figtree-Medium' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '500',
  },
  activeFilterOptionText: {
    color: '#fff',
    fontFamily: Platform.OS === 'android' ? 'Figtree-Medium' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '500',
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
    color: '#666',
    fontFamily: Platform.OS === 'android' ? 'Figtree-Bold' : 'Figtree',
    fontWeight: Platform.OS === 'android' ? undefined : '700',
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
    fontWeight: Platform.OS === 'android' ? undefined : '700',
  },
});
>>>>>>> 460b2df956993f87fd35ef53b672de5e94e56796

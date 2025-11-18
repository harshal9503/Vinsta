import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { getFontFamily, getFontWeight } from '../../../../utils/fontHelper' // Fixed import path

const FILTER_TAG_COLORS = {
    background: '#FFF9F3',
    border: '#FFE0C8',
    text: '#F99C38',
};

const FilterTags = ({
  setShowFilterModal,
  hasActiveFilters,
  toggleFilter,
  filters,
}) => {
  return (
    <View style={styles.filtersWrapper}>
      <TouchableOpacity onPress={() => setShowFilterModal(true)}>
        <View style={styles.filterTagFixed}>
          <Image
            source={require('../../../../assets/filter3.png')}
            style={styles.filterTagIcon}
          />
          {hasActiveFilters() && <View style={styles.filterDot} />}
          <Text style={styles.filterTagText}>Filter (1)</Text>
        </View>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScrollView}
        contentContainerStyle={styles.filterScrollContent}
      >
        <TouchableOpacity
          style={styles.filterTag}
          onPress={() => toggleFilter('Spicy')}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../../../assets/spicy.png')}
            style={styles.filterTagIcon}
          />
          <Text style={styles.filterTagText}>Spicy</Text>

          {filters.includes('Spicy') && (
            <Image
              source={require('../../../../assets/close.png')}
              style={[styles.closeIcon]}
            />
          )}
        </TouchableOpacity>

        <View style={styles.filterTag}>
          <Image
            source={require('../../../../assets/popular.png')}
            style={styles.filterTagIcon}
          />
          <Text style={styles.filterTagText}>Offer's</Text>
        </View>

        <View style={styles.filterTag}>
          <Image
            source={require('../../../../assets/vegan.png')}
            style={styles.filterTagIcon}
          />
          <Text style={styles.filterTagText}>Vegan</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default FilterTags

const styles = StyleSheet.create({
   filtersWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: hp('0.3%'),
      marginHorizontal: wp('5.5%'),
    },
     closeIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginLeft: wp('1.5%'),
    tintColor: '#000',
  },

    filterTagFixed: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: FILTER_TAG_COLORS.background,
      borderColor: FILTER_TAG_COLORS.border,
      borderWidth: 1.1,
      borderRadius: wp('2%'),
      paddingHorizontal: wp('3.5%'),
      paddingVertical: hp('0.8%'),
      marginRight: wp('2.5%'),
    },
    filterScrollView: {
      flex: 1,
    },
    filterScrollContent: {
      alignItems: 'center',
      gap: wp('2.5%'),
    },
    filterTag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: FILTER_TAG_COLORS.background,
      borderColor: FILTER_TAG_COLORS.border,
      borderWidth: 1.1,
      borderRadius: wp('2%'),
      paddingHorizontal: wp('3.5%'),
      paddingVertical: hp('0.8%'),
    },
    filterTagIcon: {
      width: wp('3.5%'),
      height: wp('3.5%'),
      marginRight: wp('1%'),
    },
    filterTagText: {
      color: '#000',
      fontSize: hp('1.5%'),
      // FIXED: Platform-specific font handling
      fontFamily: Platform.OS === 'android' ? 'Figtree-Medium' : 'Figtree',
      fontWeight: Platform.OS === 'android' ? undefined : '500',
    },
})

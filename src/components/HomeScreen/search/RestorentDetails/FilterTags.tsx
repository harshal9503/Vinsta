import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../../../theme/ThemeContext';
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
   const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.filtersWrapper}>
      {/* FILTER BUTTON */}
      <TouchableOpacity onPress={() => setShowFilterModal(true)}>
        <View
          style={[
            styles.filterTagFixed,
            { backgroundColor: theme.card, borderColor: theme.borderColor },
          ]}
        >
          <Image
            source={require('../../../../assets/filter3.png')}
            style={[styles.filterTagIcon, { tintColor: theme.text }]}
          />

          {hasActiveFilters() && (
            <View
              style={[
                styles.filterDot,
                { backgroundColor: theme.primary || '#FF3B30' },
              ]}
            />
          )}

          <Text style={[styles.filterTagText, { color: theme.text }]}>
            Filter (1)
          </Text>
        </View>
      </TouchableOpacity>

      {/* SCROLLABLE FILTERS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScrollView}
        contentContainerStyle={styles.filterScrollContent}
      >
        {/* SPICY TAG */}
        <TouchableOpacity
          style={[
            styles.filterTag,
            { backgroundColor: theme.background, borderColor: theme.borderColor },
          ]}
          onPress={() => toggleFilter('Spicy')}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../../../assets/spicy.png')}
            style={[styles.filterTagIcon,]}
          />

          <Text style={[styles.filterTagText, { color: theme.text }]}>
            Spicy
          </Text>

          {filters.includes('Spicy') && (
            <Image
              source={require('../../../../assets/close.png')}
              style={[styles.closeIcon, { tintColor: theme.text }]}
            />
          )}
        </TouchableOpacity>

        {/* OFFER TAG */}
        <View
          style={[
            styles.filterTag,
            { backgroundColor: theme.background, borderColor: theme.borderColor },
          ]}
        >
          <Image
            source={require('../../../../assets/popular.png')}
            style={[styles.filterTagIcon, ]}
          />
          <Text style={[styles.filterTagText, { color: theme.text }]}>
            Offer's
          </Text>
        </View>

        {/* VEGAN TAG */}
        <View
          style={[
            styles.filterTag,
            { backgroundColor: theme.Background, borderColor: theme.borderColor },
          ]}
        >
          <Image
            source={require('../../../../assets/vegan.png')}
            style={[styles.filterTagIcon,]}
          />
          <Text style={[styles.filterTagText, { color: theme.text }]}>
            Vegan
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default FilterTags;

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

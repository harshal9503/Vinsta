import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
const ActiveOrders = ({ sub, isPrevious, openRatingModal }) => {
  return (
    <>
      <View key={sub.id} style={styles.subTopRow}>
        <Image source={sub.img} style={styles.subImg} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.daysLeft}>{sub.daysLeft}</Text>
          <Text style={styles.subTitle}>{sub.title}</Text>
          <Text style={styles.subMeta}>{sub.restaurant}</Text>
          <Text style={styles.subPrice}>{sub.price}</Text>
          <Text style={styles.subDuration}>{sub.duration}</Text>
        </View>
      </View>

      <View style={styles.mealRow}>
        {['Breakfast', 'Lunch', 'Dinner'].map((m, idx) => (
          <View style={styles.mealGroup} key={m}>
            <Image
              source={require('../../../assets/tick.png')}
              style={styles.tick}
            />
            <Text style={styles.mealText}>{m}</Text>
            {idx < 2 && (
              <Image
                source={require('../../../assets/rightarrow.png')}
                style={styles.arrowIcon}
              />
            )}
          </View>
        ))}
      </View>
    </>
  );
};

export default ActiveOrders;

const styles = StyleSheet.create({
  subCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 14,
    elevation: 3,
    padding: 14,
  },
  subTopRow: { flexDirection: 'row', alignItems: 'center' },
  subImg: { width: 150, height: 150, borderRadius: 10 },
  daysLeft: {
    color: COLORS.primary,
    fontSize: 13,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  subTitle: {
    fontSize: 15,
    color: '#000',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  subMeta: {
    color: '#666',
    fontSize: 12,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  subPrice: {
    color: '#000',
    fontSize: 13,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  subDuration: {
    fontSize: 12,
    color: '#888',
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },

  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  mealGroup: { flexDirection: 'row', alignItems: 'center' },
  tick: { width: 16, height: 16, marginRight: 4 },
  mealText: {
    fontSize: 13,
    color: '#E87C23',
    fontFamily: getFontFamily('SemiBold'),
    fontWeight: getFontWeight('SemiBold'),
  },
  arrowIcon: { width: 5, height: 8, marginLeft: 6 },
  bottomNoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  cancelNote: {
    color: '#EA001B',
    fontSize: 13,
    fontFamily: getFontFamily('Medium'),
    fontWeight: getFontWeight('Medium'),
  },
  addText: {
    color: '#259E29',
    fontSize: 13,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    alignItems: 'center',
  },
  trackBtn: {
    flex: 1,
    marginLeft: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#000',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
  trackText: {
    color: '#fff',
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});

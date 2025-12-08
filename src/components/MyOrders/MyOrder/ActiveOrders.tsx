import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../theme/ThemeContext';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const ActiveOrders = ({ sub }) => {
    const { theme } = useContext(ThemeContext) || { mode: 'light' }; 
    const textPrimary = theme.mode === 'dark' ? '#FFFFFF' : '#000000';   // Title, Price
    const textLight = theme.mode === 'dark' ? '#FFFFFF' : '#888888';     // Duration

    return (
        <>
            <View key={sub.id} style={styles.subTopRow}>
                <Image source={sub.img} style={styles.subImg} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[styles.daysLeft, { color: COLORS.primary }]}>{sub.daysLeft}</Text>
                    <Text style={[styles.subTitle, {color:theme.text }]}>{sub.title}</Text>
                    <Text style={[styles.subMeta, { color: '#666' }]}>{sub.restaurant}</Text>
                    <Text style={[styles.subPrice, { color:theme.text }]}>{sub.price}</Text>
                    <Text style={[styles.subDuration, { color: textLight }]}>{sub.duration}</Text>
                </View>
            </View>

            <View style={styles.mealRow}>
                {['Breakfast', 'Lunch', 'Dinner'].map((m, idx) => (
                    <View style={styles.mealGroup} key={m}>
                        <Image source={require('../../../assets/tick.png')} style={styles.tick} />
                        <Text style={styles.mealText}>{m}</Text>
                        {idx < 2 && <Image source={require('../../../assets/rightarrow.png')} style={styles.arrowIcon} />}
                    </View>
                ))}
            </View>
        </>
    );
};

export default ActiveOrders;

const styles = StyleSheet.create({
    subTopRow: { flexDirection: 'row', alignItems: 'center' },
    subImg: { width: 70, height: 70, borderRadius: 10 },
    daysLeft: { fontSize: 13, fontFamily: getFontFamily('Bold'), fontWeight: getFontWeight('Bold'), color: COLORS.primary },
    subTitle: { fontSize: 15, fontFamily: getFontFamily('Medium'), fontWeight: getFontWeight('Medium') },
    subMeta: { fontSize: 12, fontFamily: getFontFamily('Medium'), fontWeight: getFontWeight('Medium'), color: '#666' },
    subPrice: { fontSize: 13, fontFamily: getFontFamily('Medium'), fontWeight: getFontWeight('Medium') },
    subDuration: { fontSize: 12, fontFamily: getFontFamily('Medium'), fontWeight: getFontWeight('Medium') },
    mealRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
    mealGroup: { flexDirection: 'row', alignItems: 'center' },
    tick: { width: 16, height: 16, marginRight: 4 },
    mealText: { fontSize: 13, fontFamily: getFontFamily('SemiBold'), fontWeight: getFontWeight('SemiBold'), color: '#E87C23' },
    arrowIcon: { width: 5, height: 8, marginLeft: 6 },
});

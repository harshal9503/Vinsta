import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../../theme/ThemeContext';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const ActiveBottom = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.bottomNoteRow}>
            <Text
                style={[
                    styles.cancelNote,
                    { color: theme.mode === 'dark' ? '#FF5555' : '#EA001B' }
                ]}
            >
                Subscription plan cannot be cancelled
            </Text>

            <TouchableOpacity>
                <Text
                    style={[
                        styles.addText,
                        { color: theme.mode === 'dark' ? '#00D46E' : '#259E29' }
                    ]}
                >
                    + Add More
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ActiveBottom

const styles = StyleSheet.create({
    bottomNoteRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10,
    },
    cancelNote: {
        fontSize: 13,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
    },
    addText: {
        fontSize: 13,
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
    },
})


import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { COLORS } from '../../../theme/colors'
import { ThemeContext } from '../../../theme/ThemeContext'
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper'

const PreviousOrder = ({ onRatePress, onResubscribePress }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity
                style={[
                    styles.cancelBtn,
                    { 
                        backgroundColor: theme.mode === 'dark' ? '#1E1E1E' : '#fff',
                        borderColor: theme.mode === 'dark' ? '#555' : '#ddd'
                    }
                ]}
                onPress={onRatePress}
            >
                <Text
                    style={[
                        styles.cancelText,
                        { color: theme.mode === 'dark' ? '#fff' : '#000' }
                    ]}
                >
                    Rate
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[
                    styles.trackBtn,
                    { backgroundColor: theme.mode === 'dark' ? COLORS.primary : COLORS.primary }
                ]}
                onPress={onResubscribePress}
            >
                <Text style={styles.trackText}>Re subscribe</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PreviousOrder

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelBtn: {
        flex: 1,
        marginRight: 6,
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    trackBtn: {
        flex: 1,
        marginLeft: 6,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    cancelText: {
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
    },
    trackText: {
        color: '#fff',
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
    },
})

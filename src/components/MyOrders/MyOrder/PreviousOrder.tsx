
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../theme/colors'
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper'

const PreviousOrder = ({ onRatePress, onResubscribePress }) => {
    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onRatePress}
            >
                <Text style={styles.cancelText}>Rate</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.trackBtn}
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

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../theme/colors'
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper'

const PreviousOrder = ({ onRatePress, onResubscribePress }) => {
    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onRatePress}
            >
                <Text style={styles.cancelText}>Rate</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.trackBtn}
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
})
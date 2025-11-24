import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ActiveBottom = () => {
    return (
        <View style={styles.bottomNoteRow}>
            <Text style={styles.cancelNote}>
                Subscription plan cannot be cancelled
            </Text>

            <TouchableOpacity>
                <Text style={styles.addText}>+ Add More</Text>
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
})
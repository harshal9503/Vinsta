import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const VegNonVegModal = ({
    visible,
    onClose,
    vegNonVegFilter,
    setVegNonVegFilter,
}) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalOverlay} onPress={onClose}>
                <View style={styles.vegDropdownMenu}>

                    {/* Veg */}
                    <TouchableOpacity
                        style={styles.vegDropdownItem}
                        onPress={() => {
                            setVegNonVegFilter('Veg');
                            onClose();
                        }}
                    >
                        <Image
                            source={require('../../../../assets/veg.png')}
                            style={styles.vegDropdownIcon}
                        />
                        <Text
                            style={[
                                styles.vegDropdownText,
                                vegNonVegFilter === 'Veg' && { color: '#259E29', fontWeight: '700' },
                            ]}
                        >
                            Veg
                        </Text>
                    </TouchableOpacity>

                    {/* Non Veg */}
                    <TouchableOpacity
                        style={styles.vegDropdownItem}
                        onPress={() => {
                            setVegNonVegFilter('NonVeg');
                            onClose();
                        }}
                    >
                        <Image
                            source={require('../../../../assets/nonveg.png')}
                            style={styles.vegDropdownIcon}
                        />
                        <Text
                            style={[
                                styles.vegDropdownText,
                                vegNonVegFilter === 'NonVeg' && { color: '#FE0505', fontWeight: '700' },
                            ]}
                        >
                            Non-Veg
                        </Text>
                    </TouchableOpacity>

                </View>
            </Pressable>
        </Modal>
    );
};

export default VegNonVegModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'flex-end',
        width: '100%',
    },
    dropdownMenu: {
        backgroundColor: '#fff',
        borderRadius: wp('3%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('6%'),
        elevation: 5,
        minWidth: wp('40%'),
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1%'),
    },
    dropdownIcon: {
        width: wp('4.8%'),
        height: wp('4.8%'),
        marginRight: wp('3.5%'),
    },
    dropdownText: {
        fontSize: hp('1.8%'),
        fontWeight: '600',
        color: '#232323',
    },

    vegDropdownMenu: {
        backgroundColor: '#fff',
        width: '100%',        // 🌟 FULL WIDTH
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        borderRadius: 0,      // dropdown bar jaisa look
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        marginTop: hp('12%'),
    },
    vegDropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1.3%'),
    },
    vegDropdownIcon: {
        width: wp('4.8%'),
        height: wp('4.8%'),
        marginRight: wp('3.5%'),
    },

    vegDropdownText: {
        fontSize: hp('1.9%'),
        fontWeight: '500',
        color: '#2D2D2D',
    },

})
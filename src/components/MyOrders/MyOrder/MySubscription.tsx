import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import ActiveOrders from './ActiveOrders';
import PreviousOrder from './PreviousOrder';
import { useNavigation } from '@react-navigation/native';

const MySubscription = ({
    subTab,
    setSubTab,
    activeSubs,
    previousSubs,
    setRatingModal,
}) => {
    const navigation = useNavigation();
    return (
        <>
            {/* SUBSCRIPTION SECTION */}
            <View style={styles.tabRowOuter}>
                <View style={styles.tabRow}>
                    <TouchableOpacity
                        style={[
                            styles.tabBtn,
                            subTab === 'Active' && styles.activeTab,
                            subTab === 'Active' && styles.activeTabSides,
                        ]}
                        onPress={() => setSubTab('Active')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                subTab === 'Active' && styles.activeTabText,
                            ]}
                        >
                            Active
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabBtn,
                            subTab === 'Previous' && styles.activeTab,
                            subTab === 'Previous' && styles.activeTabSides,
                        ]}
                        onPress={() => setSubTab('Previous')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                subTab === 'Previous' && styles.activeTabText,
                            ]}
                        >
                            Previous
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.activeHeader}>
                <Image
                    source={require('../../../assets/p1.png')}
                    style={styles.plusIcon}
                />
                <Text style={styles.activeTitle}>
                    {subTab === 'Active'
                        ? "My active subscription's"
                        : "Previous subscription's"}
                </Text>
            </View>

            {(subTab === 'Active' ? activeSubs : previousSubs).map((s) => (
                <View key={s.id} style={styles.subCard}>
                    <ActiveOrders sub={s}
                        isPrevious={false}
                        openRatingModal={() => setRatingModal(true)}
                    />
                    {subTab === 'Previous' && (
                        <PreviousOrder
                            onRatePress={() => setRatingModal(true)}
                            onResubscribePress={() => navigation.navigate('ReSubscribeScreen')}
                        />
                    )}
                </View>
            ))}

            {subTab === 'Active' && (
                <View style={styles.bottomNoteRow}>
                    <Text style={styles.cancelNote}>
                        Subscription plan cannot be cancelled
                    </Text>

                    <TouchableOpacity>
                        <Text style={styles.addText}>+ Add More</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    )
}

export default MySubscription

const styles = StyleSheet.create({
    tabRowOuter: {
        marginHorizontal: 20,
        marginBottom: 14,
        backgroundColor: 'transparent',
        borderRadius: 10,
        elevation: 0,
        marginTop: 20,
    },
    tabRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
    },
    tabBtn: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: 'transparent',
    },
    activeTab: {
        backgroundColor: COLORS.primary,
        elevation: 0,
    },
    activeTabText: { color: '#fff' },
    activeTabSides: {
        borderRadius: 10,
    },
    tabText: {
        fontSize: 14,
        color: '#000',
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
    },

    orderCard: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 14,
        elevation: 3,
        padding: 14,
    },
    foodImg: { width: 50, height: 50, borderRadius: 8 },
    orderTopRow: { flexDirection: 'row', alignItems: 'center' },
    orderId: {
        color: COLORS.primary,
        fontSize: 13,
        fontFamily: getFontFamily('SemiBold'),
        fontWeight: getFontWeight('SemiBold'),
    },
    orderTitle: {
        fontSize: 15,
        color: '#000',
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
    },
    orderMeta: {
        color: '#666',
        fontSize: 12,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
    },
    price: {
        fontSize: 15,
        color: '#000',
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
    },

    orderBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    estimateText: {
        fontSize: 12,
        color: '#666',
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
    },
    nowText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
    },
    time: {
        fontSize: 14,
        color: '#000',
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
    },
    statusText: {
        color: '#000',
        fontSize: 13,
        textAlign: 'right',
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
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
    activeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    plusIcon: { width: 20, height: 20 },
    activeTitle: {
        marginLeft: 8,
        fontSize: 16,
        color: '#000',
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
    },

    subCard: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 14,
        elevation: 3,
        padding: 14,
    },
    subTopRow: { flexDirection: 'row', alignItems: 'center' },
    subImg: { width: 70, height: 70, borderRadius: 10 },
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
});
